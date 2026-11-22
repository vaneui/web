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
