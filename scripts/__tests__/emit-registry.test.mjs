// The demo registry is split per docs page: a page's wrappers are bundled into
// one module of their own, and the registry only holds a lazy loader per page.
// A single barrel of static imports shipped every demo to every docs page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';

import {
  PAGES_DIR,
  groupByPage,
  renderPageRegistry,
  renderRegistry,
  toIdent,
} from '../lib/emit-registry.mjs';

/** The module specifiers a source file imports statically, and the ones it imports with `import()` */
function imports(source, fileName) {
  const sf = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const diagnostics = sf.parseDiagnostics.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
  /** @type {string[]} */
  const statics = [];
  /** @type {string[]} */
  const dynamics = [];
  const visit = (node) => {
    if (ts.isImportDeclaration(node)) statics.push(node.moduleSpecifier.text);
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      dynamics.push(node.arguments[0].text);
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return { statics, dynamics, diagnostics };
}

const wrappers = [
  { slug: 'card', key: 'card-footer' },
  { slug: 'button', key: 'button-1' },
  { slug: 'card', key: 'card-0' },
  { slug: 'button', key: 'button-0' },
  { slug: 'button', key: 'button-with-icon' },
];

test('wrappers are grouped by page, with pages and keys in a stable order', () => {
  const pages = groupByPage(wrappers);
  assert.deepEqual([...pages], [
    ['button', ['button-0', 'button-1', 'button-with-icon']],
    ['card', ['card-0', 'card-footer']],
  ]);
  assert.deepEqual([...groupByPage([])], []);
});

test('a page module imports the wrappers of its own page and nothing else from the examples', () => {
  const pages = groupByPage(wrappers);
  const source = renderPageRegistry(pages.get('button'));
  const { statics, dynamics, diagnostics } = imports(source, 'button.tsx');

  assert.deepEqual(diagnostics, []);
  assert.deepEqual(dynamics, []);
  // One level up: the page modules live in PAGES_DIR below the wrappers
  assert.deepEqual(statics, ['react', '../button-0', '../button-1', '../button-with-icon']);
  assert.ok(!source.includes('card-'), 'another page\'s wrapper leaked into the module');

  // The default export renders a wrapper by its key
  assert.match(source, /^'use client';$/m);
  assert.match(source, /export default function PageDemos\(/);
  for (const key of pages.get('button')) {
    assert.ok(source.includes(`${JSON.stringify(key)}: ${toIdent(key)},`), `${key} is not in the map`);
  }
});

test('the registry holds one dynamic loader per page and no static wrapper import', () => {
  const pages = groupByPage(wrappers);
  const source = renderRegistry([...pages.keys()]);
  const { statics, dynamics, diagnostics } = imports(source, 'registry.ts');

  assert.deepEqual(diagnostics, []);
  // A static import here would put that page's demos in every docs page's JavaScript
  assert.deepEqual(statics, ['next/dynamic', 'react']);
  assert.deepEqual(dynamics, [`./${PAGES_DIR}/button`, `./${PAGES_DIR}/card`]);
  assert.ok(source.includes(`"button": dynamic(() => import("./${PAGES_DIR}/button")),`));
  assert.ok(source.includes(`"card": dynamic(() => import("./${PAGES_DIR}/card")),`));
});

test('the page modules live in a private folder, so a slug like "icon" or "page" never becomes a route', () => {
  // app/**/icon.tsx is the icon metadata route and app/**/page.tsx a page; the
  // App Router skips folders whose name starts with an underscore.
  assert.ok(PAGES_DIR.startsWith('_'));
  assert.ok(!PAGES_DIR.includes('/'));
});

test('the registry of a site with no demos is an empty map', () => {
  const source = renderRegistry([]);
  const { dynamics, diagnostics } = imports(source, 'registry.ts');
  assert.deepEqual(diagnostics, []);
  assert.deepEqual(dynamics, []);
  assert.match(source, /export const pageDemos: Record<string, ComponentType<PageDemosProps>> = \{\};/);
});

test('wrapper keys become valid identifiers', () => {
  assert.equal(toIdent('button-with-icon'), 'Example_button_with_icon');
  assert.equal(toIdent('grid-2.col'), 'Example_grid_2_col');
});
