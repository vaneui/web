// Rendered markup of the site's own UI: the docs page parts, the code sample, the 404 page and
// the landing page's install box.
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
import { NavLink } from '@vaneui/ui';

import { DocsMarkdown } from '../../../app/docs/DocsMarkdown';
import { CodeBlock } from '../../../app/components/CodeBlock';
import { MetaStrip } from '../../../app/docs/MetaStrip';
import { DocsPropsTable } from '../../../app/docs/DocsPropsTable';
import { OnThisPage, TocAnchor } from '../../../app/docs/OnThisPage';
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

test('only the page link says aria-current="page": the TOC entry in view is a location', () => {
  const html = renderToStaticMarkup(createElement(NavLink, { href: '#sizes', tag: TocAnchor, active: true }, 'Sizes'));
  assert.match(html, /<a\b[^>]*aria-current="location"/);
  assert.match(html, /\bdata-active="true"/, 'the entry keeps its active style');
  const idle = renderToStaticMarkup(createElement(NavLink, { href: '#sizes', tag: TocAnchor }, 'Sizes'));
  assert.doesNotMatch(idle, /aria-current/);
});

test('a header nav cell is the current page only on its own page, and the current section below it', async () => {
  const { LandingHeader } = await import('../../../app/landing/LandingHeader');
  const currents = (pathname: string) => [...renderAt(createElement(LandingHeader), pathname)
    .matchAll(/<a\b[^>]*>/g)]
    .map((m) => m[0])
    .filter((a) => a.includes('aria-current'))
    .map((a) => `${a.match(/aria-current="([^"]*)"/)![1]} ${a.match(/href="([^"]*)"/)![1]}`);
  assert.deepEqual(currents('/docs/basic-components/button'), ['true /docs']);
  assert.deepEqual(currents('/docs'), ['page /docs']);
  assert.deepEqual(currents('/docs/reference/changelog'), ['page /docs/reference/changelog']);
  assert.deepEqual(currents('/playground'), ['page /playground']);
});

test('the "On this page" scroller leaves room for its links\' focus ring', () => {
  const html = renderToStaticMarkup(createElement(OnThisPage, {
    sections: [{ title: 'Button', id: 'button', level: 0 }, { title: 'Sizes', id: 'sizes', level: 1 }],
  }));
  const scroller = html.match(/<div\b[^>]*class="([^"]*\boverflow-y-auto\b[^"]*)"/)?.[1].split(/\s+/);
  assert.ok(scroller, 'the TOC scroller is rendered');
  // The links are as wide as the scroller, which clips at its padding edge: the 2px ring at a 2px
  // offset needs at least 4px of padding on every side, and as much scroll padding at top and bottom
  const spacing = (prefixes: string[]) => Math.max(0, ...scroller
    .map((c) => c.match(/^(-?)([a-z-]+)-(\d+(?:\.\d+)?)$/))
    .filter((m): m is RegExpMatchArray => !!m && !m[1] && prefixes.includes(m[2]))
    .map((m) => Number(m[3]) * 4));
  assert.ok(spacing(['p', 'px']) >= 4, `inline padding: ${scroller.join(' ')}`);
  assert.ok(spacing(['p', 'py']) >= 4, `block padding: ${scroller.join(' ')}`);
  assert.ok(spacing(['scroll-p', 'scroll-py']) >= 4, `scroll padding: ${scroller.join(' ')}`);
});

/** The attributes of the opening tag of the element nearest before `marker` whose tag is `tag` */
function openingTagBefore(html: string, marker: string, tag: string): string {
  const at = html.indexOf(marker);
  assert.ok(at !== -1, `no ${marker} in the markup`);
  const start = html.lastIndexOf(`<${tag} `, at);
  assert.ok(start !== -1, `no <${tag}> before ${marker}`);
  return html.slice(start, html.indexOf('>', start) + 1);
}

const attr = (openingTag: string, name: string): string | undefined =>
  openingTag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

test('the install box is as tall as the Get started button next to it, at every width', async () => {
  const { Hero } = await import('../../../app/landing/Hero');
  const html = renderAt(createElement(Hero), '/');
  const button = openingTagBefore(html, 'Get started', 'a');
  const copy = openingTagBefore(html, 'aria-label="Copy install command"', 'button');
  // The box was a padded, bordered Stack around an xs copy button: 42px tall next to the
  // 37px md Button (34px on a phone, where the Stack's padding shrinks). Now nothing but its
  // copy button sets its height, and that button takes the size of the Button.
  assert.equal(attr(copy, 'data-size'), attr(button, 'data-size'));
  const box = openingTagBefore(html, 'aria-label="Copy install command"', 'div');
  const classes = (attr(box, 'class') ?? '').split(/\s+/);
  assert.ok(classes.includes('rounded-full'), `not the install box: ${classes.join(' ')}`);
  const height = classes.filter((c) => /(^|:)(p|py|pt|pb)-/.test(c) || /(^|:)border-\[length/.test(c));
  assert.deepEqual(height, [], 'vertical padding or a border would make the box taller than its copy button');
});
