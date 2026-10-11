import { test, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { IncludeError } from '@vaneui/md/include';

import { expandPage, fenceLocator, findPageFiles, isPartialName } from '../lib/doc-pages.mjs';
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
      && error.message === 'Include "../_partials/missing.md" not found (in basic/broken.md:3)',
  );
});

test('fenceLocator points each fence at the page or partial that holds it', () => {
  const raw = fs.readFileSync(button, 'utf8');
  const { source, includes } = expandPage(raw, button, dataDir);
  const locate = fenceLocator([
    { path: button, source: raw },
    ...includes.map((file) => ({ path: file, source: fs.readFileSync(file, 'utf8') })),
  ]);
  const demos = extractFences(source).fences.filter((f) => f.kind === 'demo');
  assert.deepEqual(demos.map((f) => locate(f)), [
    { path: button, line: 7 },
    { path: note, line: 7 },
    { path: button, line: 13 },
  ]);
  // The last demo sits lower in the expanded text than in the page file
  assert.notEqual(demos[2].line, 13);
  assert.equal(locate({ kind: 'demo', body: '<Nowhere/>' }), null);
});
