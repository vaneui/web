// The scheduled update workflow must run the unit tests before it builds and
// pushes a new @vaneui release: lib/docs/includes.mjs rewraps the library's
// include error messages, and only the tests notice when their format changes.
// It must also stay inside the major package.json is on: the push deploys, so
// a new major is upgraded by hand.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const workflow = fs.readFileSync(new URL('../../.github/workflows/update-vaneui.yml', import.meta.url), 'utf8');

/** The steps of the workflow's job: the `if` and `run` lines of each */
function steps(text) {
  return text.split(/\n(?= {6}- name: )/).slice(1).map((step) => ({
    if: /\n {8}if: (.*)/.exec(step)?.[1],
    run: /\n {8}run: (.*)/.exec(step)?.[1],
  }));
}

test('the update workflow runs the unit tests before it builds and pushes an update', () => {
  const list = steps(workflow);
  const tests = list.findIndex((step) => step.run === 'npm test');
  const build = list.findIndex((step) => step.run === 'npm run build');
  assert.notEqual(build, -1, 'no `npm run build` step');
  assert.notEqual(tests, -1, 'no `npm test` step');
  assert.ok(tests < build, '`npm test` runs after the build');
  assert.equal(list[tests].if, list[build].if);
});

/** The shell script of the step that installs the packages (`id: diff`), without its YAML indentation */
function updateScript() {
  const step = workflow.split(/\n(?= {6}- name: )/).find((text) => /\n {8}id: diff\n/.test(text));
  assert.ok(step, 'no step with `id: diff`');
  const body = /\n {8}run: \|\n((?: {10}.*\n| *\n)+)/.exec(step)?.[1];
  assert.ok(body, 'the update step has no multi-line `run`');
  return body.replace(/^ {10}/gm, '');
}

// Stands in for npm: logs each call, `install` writes the versions the registry would resolve
// into node_modules, and `view <name> version` prints the registry's latest version.
const FAKE_NPM = `#!/usr/bin/env node
const fs = require('node:fs');
const fake = JSON.parse(process.env.FAKE_NPM);
const args = process.argv.slice(2);
fs.appendFileSync(process.env.FAKE_NPM_LOG, args.join(' ') + '\\n');
if (args[0] === 'install') {
  for (const [name, version] of Object.entries(fake.resolved)) {
    fs.writeFileSync('node_modules/' + name + '/package.json', JSON.stringify({ name, version }));
  }
} else if (args[0] === 'view') {
  if (fake.latest === null) process.exit(1);
  console.log(fake.latest[args[1]]);
}
`;

/**
 * Run the update step in a scratch project, as GitHub runs it (`bash -e -o pipefail`).
 * `ranges` are the package.json ranges, `installed` the versions in node_modules before the
 * step, `resolved` what the install leaves there, and `latest` the registry's newest versions
 * (null: the registry cannot be reached).
 */
function runUpdate(t, { ranges, installed, resolved = installed, latest = resolved }) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'update-step-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ dependencies: ranges }));
  for (const [name, version] of Object.entries(installed)) {
    fs.mkdirSync(path.join(dir, 'node_modules', name), { recursive: true });
    fs.writeFileSync(path.join(dir, 'node_modules', name, 'package.json'), JSON.stringify({ name, version }));
  }
  const bin = path.join(dir, 'bin');
  fs.mkdirSync(bin);
  fs.writeFileSync(path.join(bin, 'npm'), FAKE_NPM, { mode: 0o755 });
  const log = path.join(dir, 'npm.log');
  const output = path.join(dir, 'github-output');
  fs.writeFileSync(log, '');
  fs.writeFileSync(output, '');

  const result = spawnSync('bash', ['--noprofile', '--norc', '-e', '-o', 'pipefail', '-c', updateScript()], {
    cwd: dir,
    encoding: 'utf8',
    env: {
      ...process.env,
      PATH: [bin, path.dirname(process.execPath), process.env.PATH].join(path.delimiter),
      GITHUB_OUTPUT: output,
      FAKE_NPM: JSON.stringify({ resolved, latest }),
      FAKE_NPM_LOG: log,
    },
  });
  if (result.error?.code === 'ENOENT') {
    t.skip('bash is not installed');
    return null;
  }
  return {
    status: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    npm: fs.readFileSync(log, 'utf8').trim().split('\n').filter(Boolean),
    outputs: Object.fromEntries(fs.readFileSync(output, 'utf8').trim().split('\n').filter(Boolean).map((line) => line.split('='))),
  };
}

test('the update installs the newest release of the major package.json is on, not a new major', (t) => {
  const run = runUpdate(t, {
    ranges: { '@vaneui/ui': '^1.5.0', '@vaneui/md': '^1.3.0' },
    installed: { '@vaneui/ui': '1.5.0', '@vaneui/md': '1.3.0' },
    resolved: { '@vaneui/ui': '1.6.2', '@vaneui/md': '1.3.0' },
    latest: { '@vaneui/ui': '2.0.0', '@vaneui/md': '1.3.0' },
  });
  if (!run) return;
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.npm[0], 'install @vaneui/ui@^1 @vaneui/md@^1');
  assert.ok(run.npm.every((call) => !call.includes('@latest')), run.npm.join(' | '));
  assert.deepEqual(run.outputs, { changed: 'true', ui: '1.6.2', md: '1.3.0' });
  // The log says a newer major is out, for the package that has one only
  assert.match(run.stdout, /@vaneui\/ui 2\.0\.0 is a new major\. This job stays on \^1\b/);
  assert.doesNotMatch(run.stdout, /@vaneui\/md \S+ is a new major/);
});

test('the major comes from the range in package.json, whatever its operator', (t) => {
  const run = runUpdate(t, {
    ranges: { '@vaneui/ui': '~2.4.1', '@vaneui/md': '>=0.9.0 <1' },
    installed: { '@vaneui/ui': '2.4.1', '@vaneui/md': '0.9.3' },
  });
  if (!run) return;
  assert.equal(run.status, 0, run.stderr);
  assert.equal(run.npm[0], 'install @vaneui/ui@^2 @vaneui/md@^0');
  assert.deepEqual(run.outputs, { changed: 'false' });
  assert.doesNotMatch(run.stdout, /is a new major/);
});

test('the update still runs when the registry cannot be asked for the latest version', (t) => {
  const run = runUpdate(t, {
    ranges: { '@vaneui/ui': '^1.5.0', '@vaneui/md': '^1.3.0' },
    installed: { '@vaneui/ui': '1.5.0', '@vaneui/md': '1.3.0' },
    resolved: { '@vaneui/ui': '1.5.1', '@vaneui/md': '1.3.0' },
    latest: null,
  });
  if (!run) return;
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(run.outputs, { changed: 'true', ui: '1.5.1', md: '1.3.0' });
  assert.doesNotMatch(run.stdout, /is a new major/);
});

test('a range with no version stops the step before anything is installed', (t) => {
  const run = runUpdate(t, {
    ranges: { '@vaneui/ui': 'latest', '@vaneui/md': '^1.3.0' },
    installed: { '@vaneui/ui': '1.5.0', '@vaneui/md': '1.3.0' },
  });
  if (!run) return;
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /package\.json has no version range for @vaneui\/ui/);
  assert.deepEqual(run.npm, []);
  assert.deepEqual(run.outputs, {});
});
