// Rendered markup of the site's own UI: the docs page parts, the code sample and the 404 page.
// What only a browser shows (page width, copied text, focus rings) is checked by hand with
// Playwright; these tests pin the markup those checks depend on.
// Run with:
//   npx tsx --test lib/docs/__tests__/siteUi.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import Module from 'node:module';
import { createElement, type ReactElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AppRouterContext, type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';

import { DocsMarkdown } from '../../../app/docs/DocsMarkdown';
import { CodeBlock } from '../../../app/components/CodeBlock';
import { MetaStrip } from '../../../app/docs/MetaStrip';
import { DocsPropsTable } from '../../../app/docs/DocsPropsTable';
import { goBack, GO_BACK_FALLBACK } from '../../../app/not-found-actions';

// The layouts import their stylesheets, which Node cannot load: they read as empty modules here.
// Modules that do are imported inside their test, after this hook is in place.
(Module as unknown as { _extensions: Record<string, (m: { exports: unknown }) => void> })
  ._extensions['.css'] = (m) => { m.exports = {}; };

const router = {
  push() {}, replace() {}, back() {}, forward() {}, refresh() {}, prefetch() {},
} as unknown as AppRouterInstance;

/** Static markup of an element rendered as the App Router would at `pathname` */
function renderAt(element: ReactElement, pathname: string): string {
  return renderToStaticMarkup(createElement(AppRouterContext.Provider, { value: router },
    createElement(PathnameContext.Provider, { value: pathname }, element)));
}

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

test('the docs sidebar does not wrap, so its links stay inside the 16rem column', async () => {
  const { default: DocsLayout } = await import('../../../app/docs/layout');
  const html = renderAt(createElement(DocsLayout, null, 'page'), '/docs/guides/color-contrast-light-dark');
  const nav = html.match(/<nav\b[^>]*aria-label="Documentation"[^>]*>/)?.[0];
  assert.ok(nav, 'the sidebar nav is rendered');
  const classes = nav.match(/class="([^"]*)"/)![1].split(/\s+/);
  // A wrapping column flex sizes its line to the widest link, past the column, so no ellipsis showed
  assert.ok(classes.includes('flex-nowrap'), `sidebar classes: ${classes.join(' ')}`);
  assert.ok(!classes.includes('flex-wrap'), 'the sidebar must not wrap');
});

test('the import button in the page header wraps a long import', () => {
  const importPath = 'import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, Caption } from "@vaneui/ui"';
  const html = renderToStaticMarkup(createElement(MetaStrip, {
    frontmatter: { componentKey: 'table', importPath }, slug: 'table', category: 'layout-components',
  }));
  const button = html.match(/<button\b[^>]*aria-label="Copy import statement"[^>]*>/)?.[0];
  assert.ok(button, 'the import button is rendered');
  const classes = button.match(/class="([^"]*)"/)![1].split(/\s+/);
  // On one line, the Table import made the button 583px wide on a 390px phone
  assert.ok(classes.includes('whitespace-normal'), `import button classes: ${classes.join(' ')}`);
  assert.ok(!classes.includes('whitespace-nowrap'), 'the import must be able to wrap');
});

test('Go Back on the 404 returns to the previous page, or goes to the docs when the tab has none', () => {
  const calls: string[] = [];
  const history = (length: number) => ({ length, back: () => { calls.push('back'); } });
  const navigate = (href: string) => { calls.push(href); };

  goBack(history(3), navigate);
  assert.deepEqual(calls, ['back']);

  // A dead link opened in a new tab: history.back() would do nothing
  calls.length = 0;
  goBack(history(1), navigate);
  assert.deepEqual(calls, [GO_BACK_FALLBACK]);
  assert.equal(GO_BACK_FALLBACK, '/docs');
});

test('the 404 page has the site header and footer, and its message is in <main> at the skip link target', async () => {
  const { default: NotFound } = await import('../../../app/not-found');
  const html = renderAt(createElement(NotFound), '/no-such-page');
  assert.match(html, /<header\b/);
  assert.match(html, /<footer\b/);
  const main = html.match(/<main\b[^>]*>(.*)<\/main>/s);
  assert.ok(main, 'the 404 page has a <main> landmark');
  assert.match(main[0], /^<main\b[^>]*\bid="main-content"/, 'the skip link target is the main region');
  assert.match(main[1], /<h1\b[^>]*>404<\/h1>/, 'the message is inside <main>');
  assert.match(html, /href="#main-content"/, 'the skip link is there');
});

test('the props table summary holds no link; the Common Props link is in the details body', () => {
  const html = renderToStaticMarkup(createElement(DocsPropsTable, { node: 'button' }));
  const details = html.match(/<details\b[^>]*>(.*)<\/details>/s)?.[1];
  assert.ok(details, 'the common props are in a <details>');
  const summary = details.match(/<summary\b[^>]*>(.*?)<\/summary>/s)?.[1] ?? '';
  // A summary is a button: a link inside it is nested interactive content (axe nested-interactive)
  assert.doesNotMatch(summary, /<(a|button|input|select|textarea)\b/, 'no interactive element in the summary');
  assert.match(details.slice(details.indexOf('</summary>')), /<a\b[^>]*href="\/docs\/reference\/common-props"/);
});
