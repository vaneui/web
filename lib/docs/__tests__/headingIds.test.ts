// Every "On this page" link must land on a heading: the table of contents slugs
// the raw Markdown (extractMarkdownHeadings) while the page slugs the headings
// Markdoc renders (addHeadingIds, run by DocsMarkdown), so the two must agree.
// Run with:
//   npx tsx --test lib/docs/__tests__/headingIds.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'path';
import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Md } from '@vaneui/md';

import { docsSectionsMeta } from '../../../app/docs/docsMetadata';
import { addHeadingIds, extractMarkdownHeadings, inlineMarkdownToText } from '../../../app/utils/stringUtils';
import { parseFrontmatter } from '../frontmatter';
import { readPageMarkdown } from '../pageMarkdown';

const ROOT = resolve(__dirname, '../../..');

/** Heading ids and texts as the page renders them, through <Md> and DocsMarkdown's transform */
function renderedHeadings(md: string): Array<{ id: string; text: string }> {
  const html = renderToStaticMarkup(createElement(Md, {
    content: md,
    transform: (tree) => addHeadingIds(tree),
    config: {
      components: {
        // Only the headings matter here; fences would pull in the live demos
        MdFence: () => null,
        MdHeading: ({ id, children }: { id?: string; children?: ReactNode }) =>
          createElement('h2', { 'data-heading': '', id }, children),
      },
    },
  }));
  return [...html.matchAll(/<h2 data-heading=""(?: id="([^"]*)")?>(.*?)<\/h2>/g)]
    .map((m) => ({ id: m[1] ?? '', text: m[2].replace(/<[^>]+>/g, '') }));
}

test('every docs page: each table-of-contents link matches a rendered heading id', () => {
  let pages = 0;
  for (const section of docsSectionsMeta) {
    for (const page of section.pages) {
      const raw = readPageMarkdown(ROOT, section, page);
      if (!raw) continue;
      const { body } = parseFrontmatter(raw);
      const where = `/docs/${section.slug}/${page.slug}`;
      const toc = extractMarkdownHeadings(body);
      const rendered = renderedHeadings(body);
      assert.deepEqual(toc.map((h) => h.id), rendered.map((h) => h.id), `${where}: TOC ids differ from rendered ids`);
      for (const h of toc) assert.ok(!h.title.includes('`'), `${where}: TOC label "${h.title}" shows backticks`);
      pages += 1;
    }
  }
  assert.ok(pages > 40, `expected every docs page, checked ${pages}`);
});

test('a heading with inline code keeps the code in its id and loses the backticks in its label', () => {
  const md = '## Uncontrolled with `defaultOpen`\n\n### `Button`\n\n```tsx\n## not a heading\n```\n\n## Uncontrolled with `defaultOpen`\n';
  assert.deepEqual(extractMarkdownHeadings(md), [
    { title: 'Uncontrolled with defaultOpen', id: 'uncontrolled-with-defaultopen', level: 1 },
    { title: 'Button', id: 'button', level: 2 },
    { title: 'Uncontrolled with defaultOpen', id: 'uncontrolled-with-defaultopen-2', level: 1 },
  ]);
  assert.deepEqual(renderedHeadings(md).map((h) => h.id), [
    'uncontrolled-with-defaultopen',
    'button',
    'uncontrolled-with-defaultopen-2',
  ]);
});

test('inlineMarkdownToText drops markup and keeps the text', () => {
  assert.equal(inlineMarkdownToText('How `inheritAppearance` expands'), 'How inheritAppearance expands');
  assert.equal(inlineMarkdownToText('See [Row](/docs/row), **bold** and *em*'), 'See Row, bold and em');
  assert.equal(inlineMarkdownToText('Manual target="_blank"'), 'Manual target="_blank"');
});
