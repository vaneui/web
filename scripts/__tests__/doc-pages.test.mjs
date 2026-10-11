import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { IncludeError } from '@vaneui/md/include';

import {
  describeOrigin,
  expandPage,
  findPageFiles,
  findPartialFiles,
  isPartialName,
  locateFences,
  rejectPartialSetup,
  unreferencedPartials,
  wrapperKeyChecker,
} from '../lib/doc-pages.mjs';
import { extractFences } from '../lib/extract-fences.mjs';

const dataDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'doc-pages-')));
after(() => fs.rmSync(dataDir, { recursive: true, force: true }));

function write(file, lines) {
  const abs = path.join(dataDir, file);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, lines.join('\n'));
  return abs;
}

const button = write('basic/button.md', [
  '---',
  'componentKey: button',
  '---',
  '',
  '## Sizes',
  '',
  '```tsx demo',
  '<Button lg>Own</Button>',
  '```',
  '',
  '{% include "../_partials/install-note.md" %}',
  '',
  '```tsx demo id="after"',
  '<Button>After</Button>',
  '```',
]);
const card = write('layout/card.md', ['## Card', '']);
const note = write('_partials/install-note.md', [
  '---',
  'title: Not a page',
  '---',
  '',
  '## Shared install note',
  '',
  '```tsx demo',
  '<Button>Shared</Button>',
  '```',
]);
write('_partials/nested/deep.md', ['```tsx demo', '<Button>Deep</Button>', '```']);
write('basic/_local-note.md', ['Local partial.']);
write('basic/notes.txt', ['Not markdown.']);

test('isPartialName matches underscore-prefixed names only', () => {
  assert.equal(isPartialName('_partials'), true);
  assert.equal(isPartialName('_note.md'), true);
  assert.equal(isPartialName('button.md'), false);
  assert.equal(isPartialName('icon_button.md'), false);
});

test('findPageFiles skips partial files and directories at any depth', async () => {
  const pages = (await findPageFiles(dataDir)).sort();
  assert.deepEqual(pages, [button, card]);
});

test('findPageFiles returns nothing for a missing directory', async () => {
  assert.deepEqual(await findPageFiles(path.join(dataDir, 'nope')), []);
});

test('expandPage inlines partials and lists them, so their demos belong to the page', () => {
  const raw = fs.readFileSync(button, 'utf8');
  const { source, includes } = expandPage(raw, button, dataDir);
  assert.deepEqual(includes, [note]);
  assert.ok(source.startsWith('---\ncomponentKey: button\n---\n'));
  assert.ok(!source.includes('title: Not a page'));
  assert.ok(source.includes('## Shared install note'));

  // Ids are what build-examples keys wrappers by (`${slug}-${id}`) and DocsMarkdown pairs at runtime
  const demos = extractFences(source).fences.filter((f) => f.kind === 'demo');
  assert.deepEqual(demos.map((f) => [f.id, f.body]), [
    ['0', '<Button lg>Own</Button>'],
    ['1', '<Button>Shared</Button>'],
    ['after', '<Button>After</Button>'],
  ]);
});

test('expandPage throws an IncludeError naming the file and line', () => {
  const broken = path.join(dataDir, 'basic', 'broken.md');
  assert.throws(
    () => expandPage('## Broken\n\n{% include "../_partials/missing.md" %}\n', broken, dataDir),
    (error) => error instanceof IncludeError
      && error.message === `${broken}:3: Include "../_partials/missing.md" not found`
      && error.cause.message === 'Include "../_partials/missing.md" not found (in basic/broken.md:3)',
  );
});

/** Expand a page and locate its demo/hide fences, as build-examples does */
function locate(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const fences = extractFences(expandPage(raw, file, dataDir).source).fences.filter((f) => f.kind !== 'inline');
  return { fences, origins: locateFences({ path: file, source: raw }, fences, dataDir) };
}

test('locateFences points each fence at the page or partial that holds it', () => {
  const { fences, origins } = locate(button);
  assert.deepEqual(origins, [
    { path: button, line: 7 },
    { path: note, line: 7, includedAt: 11 },
    { path: button, line: 13 },
  ]);
  // The last demo sits lower in the expanded text than in the page file
  assert.notEqual(fences[2].line, 13);
});

const same = write('_partials/same.md', ['```tsx demo', '<Button>Same</Button>', '```']);

test('locateFences gives a fence in both the page and a partial its own location, whichever comes first', () => {
  const page = write('dups/page-and-partial.md', [
    '{% include "../_partials/same.md" %}',
    '',
    '```tsx demo',
    '<Button>Same</Button>',
    '```',
  ]);
  assert.deepEqual(locate(page).origins, [
    { path: same, line: 1, includedAt: 1 },
    { path: page, line: 3 },
  ]);
});

test('locateFences gives two identical fences in the page their own lines', () => {
  const page = write('dups/twice-in-page.md', [
    '```tsx demo',
    '<Button>Same</Button>',
    '```',
    '',
    '{% include "../_partials/install-note.md" %}',
    '',
    '```tsx demo',
    '<Button>Same</Button>',
    '```',
  ]);
  assert.deepEqual(locate(page).origins, [
    { path: page, line: 1 },
    { path: note, line: 7, includedAt: 5 },
    { path: page, line: 7 },
  ]);
});

test('locateFences reads a partial with a byte order mark and CRLF line endings', () => {
  const crlf = path.join(dataDir, '_partials/crlf.md');
  fs.writeFileSync(crlf, '\uFEFF```tsx demo\r\n<Button>CRLF</Button>\r\n```\r\n');
  const page = write('dups/crlf.md', ['## CRLF', '', '{% include "../_partials/crlf.md" %}']);
  assert.deepEqual(locate(page).origins, [{ path: crlf, line: 1, includedAt: 3 }]);

  // A setup fence on the first line still counts
  const setup = path.join(dataDir, '_partials/crlf-setup.md');
  fs.writeFileSync(setup, '\uFEFF```tsx setup\r\nconst a = 1;\r\n```\r\n');
  assert.throws(() => rejectPartialSetup([setup]), /crlf-setup\.md:1: /);
});

test('locateFences points both copies of a partial included twice at the partial', () => {
  const page = write('dups/partial-twice.md', [
    '## First',
    '',
    '{% include "../_partials/same.md" %}',
    '',
    '## Second',
    '',
    '{% include "../_partials/same.md" %}',
  ]);
  assert.deepEqual(locate(page).origins, [
    { path: same, line: 1, includedAt: 3 },
    { path: same, line: 1, includedAt: 7 },
  ]);
});

test('locateFences finds a fence under an indented include, nested includes too', () => {
  const nested = write('_partials/indented.md', [
    '---',
    'title: Shared',
    '---',
    '',
    '```tsx demo',
    '<Row>',
    '  <Button>Indented</Button>',
    '</Row>',
    '```',
    '',
    '{% include "./nested/deep.md" %}',
  ]);
  const deep = path.join(dataDir, '_partials/nested/deep.md');
  const page = write('dups/indented.md', [
    '- A list item',
    '',
    '  {% include "../_partials/indented.md" %}',
    '',
    '```tsx demo',
    '<Button>After</Button>',
    '```',
  ]);
  const { fences, origins } = locate(page);
  assert.equal(fences[0].body, '  <Row>\n    <Button>Indented</Button>\n  </Row>');
  assert.deepEqual(origins, [
    { path: nested, line: 5, includedAt: 3 },
    { path: deep, line: 1, includedAt: 3 },
    { path: page, line: 5 },
  ]);
});

test('locateFences falls back to the include tag in the page when no file holds the fence', () => {
  // The partial opens a fence the page closes, so neither file holds it whole
  write('_partials/open.md', ['```tsx demo', '<Button>Open</Button>']);
  const page = write('dups/fallback.md', [
    '{% include "../_partials/install-note.md" %}',
    '',
    'Text.',
    '',
    '{% include "../_partials/open.md" %}',
    '```',
  ]);
  const { fences, origins } = locate(page);
  assert.equal(fences[1].line, 9);
  assert.deepEqual(origins, [
    { path: note, line: 7, includedAt: 1 },
    { path: page, line: 5 },
  ]);
});

test('locateFences maps page lines past an include that adds nothing', () => {
  write('_partials/empty.md', ['---', 'title: Empty', '---', '', '']);
  const page = write('dups/empty-include.md', [
    '{% include "../_partials/empty.md" %}',
    '',
    '```tsx demo',
    '<Button>Mine</Button>',
    '```',
  ]);
  assert.deepEqual(locate(page).origins, [{ path: page, line: 3 }]);
});

test('rejectPartialSetup names the included file and line of a setup fence', () => {
  const setup = write('_partials/with-setup.md', [
    '## Shared',
    '',
    '```tsx setup',
    'const items = [1, 2];',
    '```',
  ]);
  assert.doesNotThrow(() => rejectPartialSetup([note, same]));
  assert.throws(() => rejectPartialSetup([note, setup]), (error) =>
    error.message.startsWith(`${setup}:3: an included file cannot have a \`tsx setup\` fence.`)
      && error.message.includes('Put the setup in each page that includes it.'));

  // build-examples checks the files each page includes
  const page = write('setup/page.md', ['{% include "../_partials/with-setup.md" %}']);
  const { includes } = expandPage(fs.readFileSync(page, 'utf8'), page, dataDir);
  assert.throws(() => rejectPartialSetup(includes), /with-setup\.md:3: /);
});

test('wrapperKeyChecker throws naming the key and both fences', () => {
  write('_partials/fixed-id.md', ['```tsx demo id="shared"', '<Button>Fixed</Button>', '```']);
  const page = write('ids/card.md', [
    '{% include "../_partials/fixed-id.md" %}',
    '',
    '{% include "../_partials/fixed-id.md" %}',
  ]);
  // build-examples keys each wrapper `${slug}-${id}` and claims it with the fence's origin
  const { fences, origins } = locate(page);
  const claim = wrapperKeyChecker();
  const partial = path.join(dataDir, '_partials/fixed-id.md');
  claim(`card-${fences[0].id}`, describeOrigin(origins[0], page));
  assert.throws(() => claim(`card-${fences[1].id}`, describeOrigin(origins[1], page)), (error) =>
    error.message.startsWith(
      `Two demo fences share the wrapper key "card-shared": ${partial}:1 (included at ${page}:1) and ${partial}:1 (included at ${page}:3).`,
    ));

  // A partial sharing an id with its page collides the same way
  const other = wrapperKeyChecker();
  other('card-shared', describeOrigin({ path: page, line: 9 }, page));
  assert.throws(() => other('card-shared', describeOrigin(origins[0], page)), (error) =>
    error.message.includes(`"card-shared": ${page}:9 and ${partial}:1 (included at ${page}:1).`));
  other('card-other', describeOrigin({ path: page, line: 12 }, page));
});

test('findPartialFiles and unreferencedPartials find the partials no page includes', async () => {
  const partials = await findPartialFiles(dataDir);
  assert.ok(partials.includes(note));
  assert.ok(partials.includes(path.join(dataDir, 'basic/_local-note.md')));
  assert.ok(partials.includes(path.join(dataDir, '_partials/nested/deep.md')));
  assert.ok(!partials.some((file) => file.endsWith('button.md') || file.endsWith('.txt')));

  const included = new Set();
  for (const page of await findPageFiles(dataDir)) {
    try {
      for (const file of expandPage(fs.readFileSync(page, 'utf8'), page, dataDir).includes) included.add(file);
    } catch {
      // fixtures that fail on purpose
    }
  }
  const unused = unreferencedPartials(partials, included);
  assert.ok(unused.includes(path.join(dataDir, 'basic/_local-note.md')));
  assert.ok(!unused.includes(note));
  assert.ok(!unused.includes(path.join(dataDir, '_partials/nested/deep.md')));
  assert.deepEqual(unreferencedPartials([note, same], [same]), [note]);
});
