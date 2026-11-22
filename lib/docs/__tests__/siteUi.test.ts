// Rendered markup of the site's own UI: the docs page parts, the code sample and the 404 page.
// What only a browser shows (page width, copied text, focus rings) is checked by hand with
// Playwright; these tests pin the markup those checks depend on.
// Run with:
//   npx tsx --test lib/docs/__tests__/siteUi.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { DocsMarkdown } from '../../../app/docs/DocsMarkdown';
import { CodeBlock } from '../../../app/components/CodeBlock';

/** The class list of the first element matching `tag` (and containing `text`, when given) */
function classOf(html: string, tag: string, text = ''): string[] {
  const re = new RegExp(`<${tag}\\b[^>]*class="([^"]*)"[^>]*>(?:(?!</${tag}>).)*${text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 's');
  const m = html.match(re);
  assert.ok(m, `no <${tag}> containing "${text}" in the markup`);
  return m[1].split(/\s+/);
}

test('inline code in docs Markdown wraps with the prose', () => {
  const html = renderToStaticMarkup(createElement(DocsMarkdown, {
    md: 'Set `themeDefaults={{ input: { md: true }, textarea: { md: true } }}` on the provider.\n',
  }));
  const classes = classOf(html, 'code', 'themeDefaults');
  assert.ok(classes.includes('whitespace-normal'), `inline code classes: ${classes.join(' ')}`);
  assert.ok(!classes.includes('whitespace-nowrap'), 'inline code must not keep its text on one line');
});

test('a code sample is block lines of inline tokens, so a copied selection keeps the code as written', () => {
  const code = '<Row flexWrap>\n  <Button accent>accent</Button>\n\n</Row>';
  const html = renderToStaticMarkup(createElement(CodeBlock, { code, language: 'tsx' }));
  const inner = html.match(/<code[^>]*>(.*)<\/code>/s)?.[1] ?? '';
  const lines = [...inner.matchAll(/<div class="token-line"[^>]*>(.*?)<\/div>/gs)].map((m) => m[1]);
  // A flex line made each token a block of its own, and the browser copied one token per line
  assert.ok(!/class="[^"]*\b(inline-)?flex\b/.test(inner), 'no line or token is a flex container');
  const text = lines.map((l) => l.replace(/<[^>]+>/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/^\n$/, ''));
  assert.deepEqual(text, ['<Row flexWrap>', '  <Button accent>accent</Button>', '', '</Row>']);
});
