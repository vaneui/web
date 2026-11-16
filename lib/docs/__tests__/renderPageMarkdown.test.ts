// Unit tests for the docs page Markdown renderer behind /docs/<category>/<slug>.md
// and llms-full.txt, using Node's built-in test runner. Run with:
//   npx tsx --test lib/docs/__tests__/renderPageMarkdown.test.ts

import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { mkdirSync, mkdtempSync, realpathSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { docsDataDir } from '../includes.mjs';
import { docsMarkdownPath, docsMarkdownUrl, docsPageUrl } from '../markdownUrls';
import {
  combinedImportLine,
  findDocsPage,
  propsMarkdown,
  renderPageMarkdown,
  vaneuiNamesInExamples,
} from '../renderPageMarkdown';
import { getPropTableRows } from '../../../app/docs/propTableRows';
import type { DocPageMeta, DocSectionMeta } from '../../../app/docs/docsMetadata';

const repoRoot = path.resolve(__dirname, '../../..');

// A repository root with an app/docs/data tree, as the renderer expects
const root = realpathSync(mkdtempSync(path.join(tmpdir(), 'docs-render-')));
const dataDir = docsDataDir(root);
after(() => rmSync(root, { recursive: true, force: true }));

function write(file: string, lines: string[]): void {
  const abs = path.join(dataDir, file);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, lines.join('\n'));
}

write('_partials/shared.md', [
  '## Shared section',
  '',
  'Text from the partial.',
  '',
  '```tsx demo',
  '<Row>',
  '  <Badge>New</Badge>',
  '</Row>',
  '```',
]);
write('guide/widget.md', [
  '---',
  'componentKey: button',
  'importPath: \'import { Button } from "@vaneui/ui"\'',
  '---',
  '',
  '## Basic usage',
  '',
  '```tsx demo',
  '<Button primary>Save</Button>',
  '```',
  '',
  '{% include "../_partials/shared.md" %}',
  '',
  '```tsx',
  "import Link from 'next/link';",
  "import { useTheme } from '@vaneui/ui/theme';",
  '',
  'function MyCard() {',
  '  return <Link href="/docs">Docs</Link>;',
  '}',
  '',
  '<MyCard />',
  '```',
  '',
]);
write('guide/notes.md', ['Plain guide with no examples.', '']);
write('guide/parts.md', [
  '---',
  'componentKey: card',
  'propsTables: Parts=card, CardHeader=card.header',
  '---',
  '',
  'A page that documents a component and one of its parts.',
  '',
]);

const section: DocSectionMeta = { name: 'Guide', slug: 'guide', description: 'Test section.', pages: [] };
const widget: DocPageMeta = {
  slug: 'widget',
  name: 'Widget',
  description: 'Widget does a thing.',
  componentKey: 'button',
};
const notes: DocPageMeta = { slug: 'notes', name: 'Notes', description: 'Notes page.', mdPath: 'notes.md' };
const parts: DocPageMeta = { slug: 'parts', name: 'Parts', description: 'Parts page.', componentKey: 'card' };

/** The text of one `## heading` section of a rendered page, up to the next `## ` heading */
function sectionOf(md: string, heading: string): string {
  const start = md.indexOf(`\n## ${heading}\n`);
  assert.notEqual(start, -1, `no "## ${heading}" section`);
  const end = md.indexOf('\n## ', start + 1);
  return md.slice(start, end === -1 ? undefined : end);
}

const tableRow = (row: { prop: string; category: string; isDefault: boolean }) =>
  `| \`${row.prop}\` | ${row.category} | ${row.isDefault ? 'yes' : ''} |`;

test('URLs: the Markdown copy is the page URL plus .md', () => {
  assert.equal(docsPageUrl('basic-components', 'button'), 'https://vaneui.com/docs/basic-components/button');
  assert.equal(docsMarkdownUrl('basic-components', 'button'), 'https://vaneui.com/docs/basic-components/button.md');
  assert.equal(docsMarkdownPath('basic-components', 'icon-button'), '/docs/basic-components/icon-button.md');
});

test('renderPageMarkdown: title, description and source come first', () => {
  const md = renderPageMarkdown(root, section, widget);
  const head = md.split('\n').slice(0, 7);
  assert.deepEqual(head, [
    '# Widget',
    '',
    '> Widget does a thing.',
    '',
    'Source: https://vaneui.com/docs/guide/widget',
    '',
    'Import: `import { Button, Badge, Row, useTheme } from "@vaneui/ui"`',
  ]);
});

test('renderPageMarkdown: includes are expanded and frontmatter is dropped', () => {
  const md = renderPageMarkdown(root, section, widget);
  assert.match(md, /## Shared section\n\nText from the partial\./);
  assert.doesNotMatch(md, /\{%\s*include/);
  assert.doesNotMatch(md, /componentKey:/);
  // The body is kept as written, blank lines in code included
  assert.match(md, /import \{ useTheme \} from '@vaneui\/ui\/theme';\n\nfunction MyCard\(\)/);
});

test('renderPageMarkdown: props section repeats the page props table', () => {
  const md = renderPageMarkdown(root, section, widget);
  assert.match(md, /\n## Props\n\n\| Prop \| Category \| Default \| Description \|\n\| --- \| --- \| --- \| --- \|\n/);
  // Every component-specific row of the site table appears, with its default marked
  const rows = getPropTableRows('button').filter((r) => !r.isCommon);
  for (const row of rows) {
    assert.ok(md.includes(`| \`${row.prop}\` | ${row.category} | ${row.isDefault ? 'yes' : ''} |`), row.prop);
  }
  assert.match(md, /Layout and utility props \(.*Gap.*\) are listed on \[Common Props\]\(https:\/\/vaneui\.com\/docs\/reference\/common-props\.md\)\./);
  assert.ok(md.endsWith('.md).\n'));
});

test('renderPageMarkdown: list style prints one line per category', () => {
  const md = renderPageMarkdown(root, section, widget, { props: 'list' });
  assert.match(md, /\n## Props\n\n- Appearance: `primary` \(default\), `accent`, /);
  assert.match(md, /\n- Size: `xs`, `sm` \(default\), `md`, `lg`, `xl`\n/);
  assert.doesNotMatch(md, /\| Prop \|/);
});

test('renderPageMarkdown: a guide without examples or component has no import line or props', () => {
  const md = renderPageMarkdown(root, section, notes);
  assert.equal(md, '# Notes\n\n> Notes page.\n\nSource: https://vaneui.com/docs/guide/notes\n\nPlain guide with no examples.\n');
});

test('vaneuiNamesInExamples: JSX tags and package imports, not names imported from elsewhere', () => {
  const body = [
    '```tsx',
    "import Link from 'next/link';",
    '<Card><Link href="/">Home</Link><Unknown /></Card>',
    '```',
    '',
    '```tsx',
    "import NextLink from 'next/link';",
    '<Link href="/" tag={NextLink}>VaneUI link</Link>',
    '```',
    '',
    '```css',
    '<Button>not code we scan</Button>',
    '```',
  ].join('\n');
  assert.deepEqual(vaneuiNamesInExamples(body).sort(), ['Card', 'Link']);
  assert.equal(combinedImportLine(undefined, '```tsx\n<Row />\n```'), 'import { Row } from "@vaneui/ui"');
  assert.equal(combinedImportLine(undefined, 'No code.'), null);
});

test('propsMarkdown: secondary components get their own heading', () => {
  assert.match(propsMarkdown('ListItem props', 'listItem'), /^## ListItem props\n\n/);
});

test('renderPageMarkdown: a page that lists its props tables prints one section per table', () => {
  const md = renderPageMarkdown(root, section, parts);
  // The table named after the page prints as "Props", a part under its own name, in the listed order
  assert.ok(md.indexOf('\n## Props\n') < md.indexOf('\n## CardHeader props\n'));
  assert.equal(md.match(/^## /gm)?.length, 2);
  for (const row of getPropTableRows('card').filter((r) => !r.isCommon)) {
    assert.ok(sectionOf(md, 'Props').includes(tableRow(row)), row.prop);
  }
  for (const row of getPropTableRows('card.header').filter((r) => !r.isCommon)) {
    assert.ok(sectionOf(md, 'CardHeader props').includes(tableRow(row)), row.prop);
  }

  const list = renderPageMarkdown(root, section, parts, { props: 'list' });
  assert.match(sectionOf(list, 'CardHeader props'), /\n- Size: /);
});

test('real pages: Button and the package-owned changelog', () => {
  const button = findDocsPage('basic-components', 'button');
  assert.ok(button);
  const md = renderPageMarkdown(repoRoot, button.section, button.page);
  assert.match(md, /^# Button\n\n> .+\n\nSource: https:\/\/vaneui\.com\/docs\/basic-components\/button\n\nImport: `import \{ Button, [^`]*Row[^`]* \} from "@vaneui\/ui"`\n/);
  assert.match(md, /\n## Props\n/);

  const changelog = findDocsPage('reference', 'changelog');
  assert.ok(changelog);
  const log = renderPageMarkdown(repoRoot, changelog.section, changelog.page);
  assert.match(log, /^# Changelog\n\n> .+\n\nSource: https:\/\/vaneui\.com\/docs\/reference\/changelog\n\n/);
  assert.doesNotMatch(log, /^Import:/m);
  assert.doesNotMatch(log, /^## \[?Unreleased\]?\n\n## /m, 'an empty Unreleased section is dropped');

  assert.equal(findDocsPage('basic-components', 'nope'), undefined);
  assert.equal(findDocsPage('_partials', 'shared'), undefined);
});

test('real pages: Menu prints the popup props as its own and the MenuItem props under their name', () => {
  const menu = findDocsPage('overlay-components', 'menu');
  assert.ok(menu);
  const md = renderPageMarkdown(repoRoot, menu.section, menu.page);
  const own = sectionOf(md, 'Props');
  const item = sectionOf(md, 'MenuItem props');
  // Menu spreads its props on the popup, so its defaults and its placement props are the popup's
  for (const row of getPropTableRows('menu.popup').filter((r) => !r.isCommon)) {
    assert.ok(own.includes(tableRow(row)), `Menu: ${row.prop}`);
  }
  assert.match(own, /\| `placeTop` \| Placement \|/);
  for (const row of getPropTableRows('menu.item').filter((r) => !r.isCommon)) {
    assert.ok(item.includes(tableRow(row)), `MenuItem: ${row.prop}`);
  }
  assert.doesNotMatch(item, /\| `placeTop` \|/);
});
