// Parity test: the page route and the examples build must see the same fences
// in a page, or a live demo pairs with the wrong wrapper. Run with:
//   npx tsx --test lib/docs/__tests__/fenceParity.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { docsDataDir, expandDocIncludes } from '../includes.mjs';
import { extractFences } from '../extractFences';
import { parseFrontmatter } from '../frontmatter';
import { expandPage } from '../../../scripts/lib/doc-pages.mjs';
import { extractFences as extractBuildFences } from '../../../scripts/lib/extract-fences.mjs';

const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-parity-')));
const dataDir = docsDataDir(root);
after(() => rmSync(root, { recursive: true, force: true }));

/** Write a fixture file with a byte order mark and CRLF line endings */
function write(file: string, lines: string[]): string {
  const abs = path.join(dataDir, file);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, '\uFEFF' + lines.join('\r\n'));
  return abs;
}

write('_partials/nested/inner.md', [
  '```tsx demo',
  '<Row>',
  '  <Button>Inner</Button>',
  '</Row>',
  '```',
  '',
  '```tsx demo id="inner"',
  '<Button>Inner 2</Button>',
  '```',
  '',
]);
write('_partials/outer.md', [
  '---',
  'title: Not a page',
  '---',
  '',
  '## Outer',
  '',
  '```tsx demo id="outer"',
  '<Button>Outer</Button>',
  '```',
  '',
  '- In a list item',
  '',
  '  {% include "./nested/inner.md" %}',
  '',
]);
const page = write('guide/page.md', [
  '---',
  'componentKey: button',
  '---',
  '',
  '## Own',
  '',
  '```tsx demo',
  '<Button>Own</Button>',
  '```',
  '',
  '{% include "../_partials/outer.md" %}',
  '',
  '```tsx',
  'const illustrative = true;',
  '```',
  '',
  '```tsx hide',
  '<Button>Hidden</Button>',
  '```',
  '',
]);

test('the page route and the examples build extract the same fences from a page with includes', () => {
  const raw = readFileSync(page, 'utf8');
  assert.ok(raw.startsWith('\uFEFF---\r\n'));

  // Page route: expand, split off the frontmatter, extract (lib/docs/extractFences.ts)
  const { frontmatter, body } = parseFrontmatter(expandDocIncludes(raw, page, { dataDir }));
  const pageFences = extractFences(body).fences.map((f) => [f.id, f.kind, f.body]);

  // Examples build: expand, extract the whole text (scripts/lib/extract-fences.mjs)
  const buildFences = extractBuildFences(expandPage(raw, page, dataDir).source).fences.map((f) => [f.id, f.kind, f.body]);

  assert.deepEqual(frontmatter, { componentKey: 'button' });
  assert.deepEqual(pageFences, buildFences);
  assert.deepEqual(pageFences, [
    ['0', 'demo', '<Button>Own</Button>'],
    ['outer', 'demo', '<Button>Outer</Button>'],
    ['2', 'demo', '  <Row>\n    <Button>Inner</Button>\n  </Row>'],
    ['inner', 'demo', '  <Button>Inner 2</Button>'],
    [null, 'inline', 'const illustrative = true;'],
    ['4', 'hide', '<Button>Hidden</Button>'],
  ]);
});
