// Which props tables a docs page shows: the `propsTables` frontmatter key and the
// `componentKey` default. Run with:
//   npx tsx --test lib/docs/__tests__/propsTables.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';

import { defaultTheme } from '@vaneui/ui';
import { docsSectionsMeta } from '../../../app/docs/docsMetadata';
import { resolveThemeNode } from '../../../app/docs/propTableRows';
import { parseFrontmatter } from '../frontmatter';
import { readPageMarkdown } from '../pageMarkdown';
import { pagePropsTables, parsePropsTables, propsTableTitle } from '../propsTables';

const repoRoot = path.resolve(__dirname, '../../..');

test('parsePropsTables reads Name=theme.node entries in order', () => {
  assert.deepEqual(parsePropsTables('Menu=menu.popup, MenuItem=menu.item'), [
    { name: 'Menu', node: 'menu.popup' },
    { name: 'MenuItem', node: 'menu.item' },
  ]);
  assert.deepEqual(parsePropsTables('  List = list ,ListItem=listItem,  '), [
    { name: 'List', node: 'list' },
    { name: 'ListItem', node: 'listItem' },
  ]);
  assert.deepEqual(parsePropsTables(''), []);
});

test('parsePropsTables rejects an entry that is not Name=theme.node', () => {
  for (const value of ['menu.popup', 'Menu=', '=menu.popup', 'Menu=menu=item', 'Menu Item=menu.item', 'Menu=menu..item', 'Menu=menu.']) {
    assert.throws(() => parsePropsTables(value), /is not "Name=theme\.node"/, value);
  }
});

test('a page without propsTables gets one table for its component, named after the page', () => {
  assert.deepEqual(pagePropsTables({ slug: 'icon-button', name: 'IconButton', componentKey: 'iconButton' }), [
    { name: 'IconButton', node: 'iconButton' },
  ]);
  // The key can come from the page's frontmatter
  assert.deepEqual(pagePropsTables({ slug: 'badge', name: 'Badge' }, { componentKey: 'badge' }), [
    { name: 'Badge', node: 'badge' },
  ]);
  assert.deepEqual(pagePropsTables({ slug: 'theming', name: 'Theming' }), []);
});

test('a secondary component gets its own table after the page component', () => {
  const page = { slug: 'list', name: 'List', componentKey: 'list', secondaryComponentKey: 'listItem' };
  assert.deepEqual(pagePropsTables({ ...page, secondaryComponentName: 'ListItem' }), [
    { name: 'List', node: 'list' },
    { name: 'ListItem', node: 'listItem' },
  ]);
  assert.deepEqual(pagePropsTables(page)[1], { name: 'listItem', node: 'listItem' });
});

test('propsTables in the frontmatter replaces the default tables', () => {
  const page = { slug: 'menu', name: 'Menu', componentKey: 'menu', secondaryComponentKey: 'listItem' };
  assert.deepEqual(pagePropsTables(page, { componentKey: 'menu', propsTables: 'Menu=menu.popup, MenuItem=menu.item' }), [
    { name: 'Menu', node: 'menu.popup' },
    { name: 'MenuItem', node: 'menu.item' },
  ]);
  // An empty list turns the tables off
  assert.deepEqual(pagePropsTables(page, { propsTables: '' }), []);
});

test('a bad list fails with the page slug in the message', () => {
  const page = { slug: 'menu', name: 'Menu', componentKey: 'menu' };
  assert.throws(() => pagePropsTables(page, { propsTables: 'Menu=menu.popupp' }), /^Error: Docs page "menu": "menu\.popupp" is not a theme node/);
  assert.throws(() => pagePropsTables(page, { propsTables: 'Menu' }), /^Error: Docs page "menu": propsTables entry "Menu" is not "Name=theme\.node"/);
  assert.throws(
    () => pagePropsTables(page, { propsTables: 'Menu=menu.popup, Menu=menu.item' }),
    /^Error: Docs page "menu": two props tables are named "Menu"/,
  );
  assert.throws(() => pagePropsTables({ slug: 'widget', name: 'Widget', componentKey: 'widget' }), /^Error: Docs page "widget": "widget" is not a theme node/);
});

test('propsTableTitle is the heading the page renders', () => {
  assert.equal(propsTableTitle({ name: 'MenuItem', node: 'menu.item' }), 'MenuItem Props');
});

test('real pages: every page lists tables that resolve, and Menu has one per part', () => {
  let tables = 0;
  for (const section of docsSectionsMeta) {
    for (const page of section.pages) {
      const { frontmatter } = parseFrontmatter(readPageMarkdown(repoRoot, section, page) ?? '');
      tables += pagePropsTables(page, frontmatter).length;
    }
  }
  assert.ok(tables > 40, `${tables} tables`);

  const section = docsSectionsMeta.find((s) => s.slug === 'overlay-components');
  const menu = section?.pages.find((p) => p.slug === 'menu');
  assert.ok(section && menu);
  const { frontmatter } = parseFrontmatter(readPageMarkdown(repoRoot, section, menu) ?? '');
  const byName = new Map(pagePropsTables(menu, frontmatter).map((t) => [t.name, resolveThemeNode(t.node)]));
  // "Menu Props" documents the popup; the items have a table under their own name
  assert.equal(byName.get('Menu'), defaultTheme.menu.popup);
  assert.equal(byName.get('MenuItem'), defaultTheme.menu.item);
});
