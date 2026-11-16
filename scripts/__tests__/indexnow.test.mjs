// IndexNow submissions (scripts/indexnow.mjs and .github/workflows/indexnow.yml): after a deploy
// only new, changed and removed sitemap URLs are sent, and the state that tells them apart is
// saved only when the engines accepted the submission.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { diffPages, formatState, parseSitemap, parseState, payload } from '../indexnow.mjs';

const script = fileURLToPath(new URL('../indexnow.mjs', import.meta.url));
const workflow = fs.readFileSync(new URL('../../.github/workflows/indexnow.yml', import.meta.url), 'utf8');

/** A sitemap like the one Next.js writes for app/sitemap.ts */
function sitemap(entries) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
    entries.map(([loc, lastmod]) =>
      `<url>\n<loc>${loc}</loc>\n${lastmod ? `<lastmod>${lastmod}</lastmod>\n` : ''}</url>\n`).join('')
  }</urlset>\n`;
}

test('parseSitemap reads each URL with its lastmod, and none as empty', () => {
  const pages = parseSitemap(sitemap([
    ['https://vaneui.com', '2026-11-10T08:00:00.000Z'],
    ['https://vaneui.com/docs?a=1&amp;b=2', '2026-11-11T08:00:00.000Z'],
    ['https://vaneui.com/playground', undefined],
  ]));
  assert.deepEqual([...pages], [
    ['https://vaneui.com', '2026-11-10T08:00:00.000Z'],
    ['https://vaneui.com/docs?a=1&b=2', '2026-11-11T08:00:00.000Z'],
    ['https://vaneui.com/playground', ''],
  ]);
});

test('the saved state reads back as the same pages', () => {
  const pages = new Map([['https://vaneui.com/b', '2026-11-11'], ['https://vaneui.com/a', '']]);
  const text = formatState(pages);
  assert.equal(text, 'https://vaneui.com/a\t\nhttps://vaneui.com/b\t2026-11-11\n');
  assert.deepEqual(parseState(text), new Map([['https://vaneui.com/a', ''], ['https://vaneui.com/b', '2026-11-11']]));
});

test('diffPages finds new, changed and removed pages, and everything without a previous state', () => {
  const previous = new Map([['/a', '1'], ['/b', '1'], ['/gone', '1'], ['/nodate', '']]);
  const current = new Map([['/a', '1'], ['/b', '2'], ['/new', '1'], ['/nodate', '']]);
  assert.deepEqual(diffPages(previous, current), { added: ['/new'], changed: ['/b'], removed: ['/gone'] });
  assert.deepEqual(diffPages(null, current), { added: ['/a', '/b', '/new', '/nodate'], changed: [], removed: [] });
});

test('payload names the key file and refuses URLs of another host', () => {
  assert.deepEqual(payload({ host: 'vaneui.com', key: 'k1', urls: ['https://vaneui.com', 'https://vaneui.com/docs'] }), {
    host: 'vaneui.com',
    key: 'k1',
    keyLocation: 'https://vaneui.com/k1.txt',
    urlList: ['https://vaneui.com', 'https://vaneui.com/docs'],
  });
  assert.throws(() => payload({ host: 'vaneui.com', key: 'k1', urls: ['https://vaneui.com.evil.test/x'] }), /outside/);
});

// End to end: the script against a local server that serves the sitemap and records submissions
let server;
let base;
let currentSitemap = '';
let answer = 200;
const submissions = [];
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'indexnow-'));

before(async () => {
  server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/sitemap.xml') {
      res.writeHead(200, { 'Content-Type': 'application/xml' }).end(currentSitemap);
      return;
    }
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      submissions.push(JSON.parse(body));
      res.writeHead(answer).end(answer === 200 ? '' : 'rejected');
    });
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});
after(() => {
  server.close();
  fs.rmSync(dir, { recursive: true, force: true });
});

function run(state, ...args) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [script, ...args], {
      env: {
        ...process.env, HOST: 'vaneui.com', KEY: 'k1', STATE: state,
        SITEMAP_URL: `${base}/sitemap.xml`, INDEXNOW_ENDPOINT: `${base}/indexnow`,
      },
    });
    let out = '';
    child.stdout.on('data', (chunk) => { out += chunk; });
    child.stderr.on('data', (chunk) => { out += chunk; });
    child.on('close', (code) => resolve({ code, out }));
  });
}

test('a deploy submits only what changed since the last accepted submission', async () => {
  const state = path.join(dir, 'nested', 'sitemap.tsv');
  submissions.length = 0;

  // First run: no state, so every page goes, and the state is saved
  currentSitemap = sitemap([['https://vaneui.com', '1'], ['https://vaneui.com/docs', '1'], ['https://vaneui.com/old', '1']]);
  let result = await run(state);
  assert.equal(result.code, 0, result.out);
  assert.deepEqual(submissions.at(-1).urlList, ['https://vaneui.com', 'https://vaneui.com/docs', 'https://vaneui.com/old']);
  assert.equal(submissions.at(-1).keyLocation, 'https://vaneui.com/k1.txt');
  assert.ok(fs.existsSync(state));

  // Nothing changed: no request at all
  result = await run(state);
  assert.equal(submissions.length, 1, result.out);
  assert.match(result.out, /Nothing to submit/);

  // One page changed, one is new, one was removed
  currentSitemap = sitemap([['https://vaneui.com', '1'], ['https://vaneui.com/docs', '2'], ['https://vaneui.com/new', '1']]);
  result = await run(state);
  assert.deepEqual(submissions.at(-1).urlList,
    ['https://vaneui.com/new', 'https://vaneui.com/docs', 'https://vaneui.com/old'], result.out);

  // Rejected: a warning, exit 0, and the state stays, so the next run sends the change again
  currentSitemap = sitemap([['https://vaneui.com', '2'], ['https://vaneui.com/docs', '2'], ['https://vaneui.com/new', '1']]);
  answer = 500;
  result = await run(state);
  assert.equal(result.code, 0);
  assert.match(result.out, /::warning::IndexNow answered HTTP 500/);
  answer = 200;
  result = await run(state);
  assert.deepEqual(submissions.at(-1).urlList, ['https://vaneui.com'], result.out);

  // --all resubmits every page
  result = await run(state, '--all');
  assert.deepEqual(submissions.at(-1).urlList,
    ['https://vaneui.com', 'https://vaneui.com/docs', 'https://vaneui.com/new'], result.out);
});

test('an unreadable sitemap is a warning, not a failure, and submits nothing', async () => {
  submissions.length = 0;
  currentSitemap = '<urlset></urlset>';
  const result = await run(path.join(dir, 'empty.tsv'));
  assert.equal(result.code, 0);
  assert.match(result.out, /::warning::No URLs in /);
  assert.equal(submissions.length, 0);
});

/** The steps of the workflow's job, in order */
function steps() {
  return workflow.split(/\n(?= {6}- name: )/).slice(1).map((step) => ({
    name: /^ {6}- name: (.*)/.exec(step)?.[1],
    if: /\n {8}if: (.*)/.exec(step)?.[1],
    run: /\n {8}run: (.*)/.exec(step)?.[1],
    uses: /\n {8}uses: (.*)/.exec(step)?.[1],
    text: step,
  }));
}

test('the workflow runs after production deploys, read-only, one run at a time', () => {
  assert.match(workflow, /^ {2}deployment_status:$/m);
  assert.match(workflow, /github\.event\.deployment\.environment == 'Production'/);
  assert.match(workflow, /^permissions:\n {2}contents: read\n(?: {2}#.*\n)? {2}actions: read\n/m);
  assert.doesNotMatch(workflow, /:\s*write\b/);
  assert.match(workflow, /^ {2}cancel-in-progress: false$/m);
  assert.match(workflow, /\n {4}timeout-minutes: \d+\n/);
});

test('the workflow restores the last saved state, runs the script, then saves the state as an artifact', () => {
  // The Actions cache refuses deployment_status events ("not tied to a branch or tag ref"), so a
  // cache step would never restore or save anything and every deploy would resubmit every URL
  assert.doesNotMatch(workflow, /actions\/cache/);

  const list = steps();
  const restore = list.findIndex((step) => step.name === 'Restore the previous submission');
  const submit = list.findIndex((step) => step.run?.startsWith('node scripts/indexnow.mjs'));
  const save = list.findIndex((step) => step.uses?.startsWith('actions/upload-artifact@'));
  assert.ok(restore !== -1 && submit !== -1 && save !== -1, 'a step is missing');
  assert.ok(restore < submit && submit < save, 'steps out of order');

  const state = /\n {6}STATE: (\S+)\n/.exec(workflow)?.[1];
  assert.ok(state, 'no STATE');
  const name = /\n {10}name: (\S+)\n/.exec(list[save].text)?.[1];
  assert.ok(name, 'the artifact has no name');

  // Restore: the newest unexpired artifact of that name, unzipped next to STATE, best effort
  const text = list[restore].text;
  assert.ok(text.includes(`actions/artifacts?name=${name}&`), 'restores another artifact');
  assert.ok(text.includes('select(.expired | not)'), 'may pick an expired artifact');
  assert.ok(text.includes('-d "$(dirname "$STATE")"'), 'unzips somewhere else');
  assert.match(text, /\n {8}continue-on-error: true\n/);

  // Save: the state file itself, only when there is one, dot directory included
  assert.match(list[save].text, new RegExp(`\\n {10}path: ${state.replace(/[.]/g, '\\.')}\\n`));
  assert.ok(list[save].if?.includes(state), 'the save step does not check that the state exists');
  if (path.posix.dirname(state).split('/').some((part) => part.startsWith('.'))) {
    assert.match(list[save].text, /\n {10}include-hidden-files: true\n/);
  }

  for (const action of list.filter((step) => step.uses).map((step) => step.uses)) {
    assert.match(action, /@(v\d+(\.\d+){0,2}|[0-9a-f]{40})$/, action);
  }
});
