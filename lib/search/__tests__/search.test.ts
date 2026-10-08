// Unit tests for the docs search index and query, using Node's built-in test runner. Run with:
//   npx tsx --test lib/search/__tests__/search.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'path';

import { buildSearchIndex, inlineToText, splitMarkdown } from '../buildIndex';
import { groupHits, highlight, prepareIndex, search, snippet } from '../query';
import type { SearchIndex } from '../types';

const ROOT = resolve(__dirname, '../../..');

test('inlineToText keeps link text and code, drops markup', () => {
  assert.equal(inlineToText('See [Row](/docs/row) and `<Button primary>`'), 'See Row and <Button primary>');
  assert.equal(inlineToText('**Bold** and *em* but snake_case_name stays'), 'Bold and em but snake_case_name stays');
});

test('splitMarkdown skips code fences and suffixes repeated heading ids', () => {
  const md = [
    'Intro with `code`.',
    '',
    '## Sizes',
    'Five sizes.',
    '```tsx',
    '## not a heading',
    '<Button lg/>',
    '```',
    '### Added',
    '- one',
    '### Added',
    '| Prop | Default |',
    '|------|---------|',
    '| `lg` | no |',
  ].join('\n');
  const { intro, sections } = splitMarkdown(md);
  assert.equal(intro, 'Intro with code.');
  assert.deepEqual(sections.map((s) => [s.level, s.title, s.id]), [
    [2, 'Sizes', 'sizes'],
    [3, 'Added', 'added'],
    [3, 'Added', 'added-2'],
  ]);
  assert.equal(sections[0].text, 'Five sizes.');
  assert.equal(sections[2].text, 'Prop Default lg no');
});

test('splitMarkdown ids leave out inline code, as the rendered headings do', () => {
  const { sections } = splitMarkdown('## Uncontrolled with `defaultOpen`\n## `Button`\n');
  assert.equal(sections[0].title, 'Uncontrolled with defaultOpen');
  assert.equal(sections[0].id, 'uncontrolled-with');
  assert.equal(sections[1].id, '');
});

const fixture: SearchIndex = {
  sections: [{ name: 'Basic Components', index: '02' }, { name: 'Customization', index: '07' }],
  entries: [
    { url: '/docs/b/button', page: 'Button', section: 0, path: [], text: 'Button triggers an action.' },
    { url: '/docs/b/button#sizes', page: 'Button', section: 0, path: ['Sizes'], text: 'Buttons come in five sizes.' },
    { url: '/docs/b/icon-button', page: 'IconButton', section: 0, path: [], text: 'A square icon-only button.' },
    { url: '/docs/c/dark-mode', page: 'Dark Mode', section: 1, path: [], text: 'Set data-theme="dark" on any element.' },
    { url: '/docs/c/row#items', page: 'Row', section: 0, path: ['Items'], text: 'Use itemsCenter to center items.' },
  ],
};
const index = prepareIndex(fixture);
const urls = (q: string) => search(index, q).map((h) => h.entry.url);

test('a page outranks its own headings and pages that only mention the name', () => {
  assert.deepEqual(urls('button').slice(0, 3), ['/docs/b/button', '/docs/b/icon-button', '/docs/b/button#sizes']);
});

test('every query word must match, and a heading match wins over body text', () => {
  assert.deepEqual(urls('button size'), ['/docs/b/button#sizes']);
  assert.deepEqual(urls('button nothing'), []);
});

test('camelCase props match whole and by part, ignoring case', () => {
  assert.deepEqual(urls('itemscenter'), ['/docs/c/row#items']);
  assert.deepEqual(urls('center'), ['/docs/c/row#items']);
});

test('highlight marks word starts, including camelCase parts', () => {
  assert.deepEqual(highlight('IconButton button', ['button']), [
    { text: 'Icon', hit: false },
    { text: 'Button', hit: true },
    { text: ' ', hit: false },
    { text: 'button', hit: true },
  ]);
});

test('snippet cuts long text at word boundaries around the first match', () => {
  const text = `${'lorem '.repeat(40)}needle ${'ipsum '.repeat(40)}`.trim();
  const segments = snippet(text, ['needle']);
  assert.equal(segments[0].text, '…');
  assert.equal(segments[segments.length - 1].text, '…');
  assert.ok(segments.some((s) => s.hit && s.text === 'needle'));
  assert.ok(segments.map((s) => s.text).join('').length < 150);
});

test('groupHits orders groups by their best hit', () => {
  const groups = groupHits(search(index, 'dark'), fixture.sections);
  assert.deepEqual(groups.map((g) => g.section.name), ['Customization']);
});

test('the built index covers every docs page with unique anchors per page', () => {
  const built = buildSearchIndex(ROOT);
  const pages = new Set(built.entries.filter((e) => e.path.length === 0).map((e) => e.url));
  assert.ok(pages.size > 40);
  const anchors = built.entries.map((e) => e.url).filter((u) => u.includes('#'));
  assert.equal(new Set(anchors).size, anchors.length);
});
