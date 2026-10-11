// Parity test: the page route and the examples build must see the same fences
// in a page, or a live demo pairs with the wrong wrapper, and every demo fence
// Markdoc renders must find its extractor entry, or it never goes live. Run with:
//   npx tsx --test lib/docs/__tests__/fenceParity.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import Markdoc from '@markdoc/markdoc';

import { docsDataDir, expandDocIncludes } from '../includes.mjs';
import { extractFences, type ExtractedFence } from '../extractFences';
import { fenceKey } from '../fenceBody.mjs';
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
write('_partials/step.md', [
  'Run it:',
  '',
  '```tsx demo id="step"',
  '<Stack>',
  '\t<Button>Step</Button>',
  '</Stack>',
  '```',
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
  '1. Step one',
  '',
  '   {% include "../_partials/step.md" %}',
  '',
  '2. Step two',
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
    // Without the indentation of the list item the partial is included in, as Markdoc renders it
    ['2', 'demo', '<Row>\n  <Button>Inner</Button>\n</Row>'],
    ['inner', 'demo', '<Button>Inner 2</Button>'],
    [null, 'inline', 'const illustrative = true;'],
    ['4', 'hide', '<Button>Hidden</Button>'],
    ['step', 'demo', '<Stack>\n    <Button>Step</Button>\n</Stack>'],
  ]);
});

test('every tsx demo fence Markdoc renders finds its extractor entry, as DocsMarkdown pairs them', () => {
  // The page route renders this body with <Md>, which parses it with Markdoc
  const { body } = parseFrontmatter(expandDocIncludes(readFileSync(page, 'utf8'), page, { dataDir }));

  // DocsMarkdown queues the extractor's entries by key, in document order...
  const queues = new Map<string, ExtractedFence[]>();
  for (const fence of extractFences(body).fences) {
    const key = fenceKey(fence.body);
    queues.set(key, [...(queues.get(key) ?? []), fence]);
  }

  // ...and each tsx/jsx fence Markdoc emits takes the next entry with its content's key
  const lines = body.split('\n');
  const demos: Array<{ opener: string; paired: ExtractedFence | undefined }> = [];
  for (const node of Markdoc.parse(body).walk()) {
    if (node.type !== 'fence') continue;
    const { content, language } = node.attributes as { content: string; language: string };
    if (language !== 'tsx' && language !== 'jsx') continue;
    const paired = queues.get(fenceKey(content))?.shift();
    const opener = lines[node.lines[0]].trim();
    if (opener.split(/\s+/).includes('demo')) demos.push({ opener, paired });
    else assert.ok(paired, `no extractor entry for the fence at line ${node.lines[0] + 1}`);
  }

  for (const { opener, paired } of demos) assert.equal(paired?.kind, 'demo', `${opener} found no demo entry`);
  // In a list item, under an indented include, nested and with a tab in the partial
  assert.deepEqual(demos.map((d) => d.paired?.id), ['0', 'outer', '2', 'inner', 'step']);
});
