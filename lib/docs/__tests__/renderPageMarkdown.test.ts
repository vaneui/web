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

const section: DocSectionMeta = { name: 'Guide', slug: 'guide', description: 'Test section.', pages: [] };
const widget: DocPageMeta = {
  slug: 'widget',
  name: 'Widget',
  description: 'Widget does a thing.',
  componentKey: 'button',
};
const notes: DocPageMeta = { slug: 'notes', name: 'Notes', description: 'Notes page.', mdPath: 'notes.md' };

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

  assert.equal(findDocsPage('basic-components', 'nope'), undefined);
  assert.equal(findDocsPage('_partials', 'shared'), undefined);
});
