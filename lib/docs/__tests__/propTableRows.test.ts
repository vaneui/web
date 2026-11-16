// The rows behind the docs props tables: which theme node a table documents. Run with:
//   npx tsx --test lib/docs/__tests__/propTableRows.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { ComponentCategories, ComponentKeys, defaultTheme } from '@vaneui/ui';
import { getPropTableRows, resolveThemeNode, type ThemeNode } from '../../../app/docs/propTableRows';

const theme = defaultTheme as unknown as Record<string, Record<string, ThemeNode> & ThemeNode>;

const propsOf = (node: string) => getPropTableRows(node).map((r) => r.prop);
const defaultsOf = (node: string) => getPropTableRows(node).filter((r) => r.isDefault).map((r) => r.prop);

/** The defaults a node sets among the props its own categories list, in table order */
function nodeDefaults(node: ThemeNode): string[] {
  const keys = ComponentKeys as Record<string, readonly string[]>;
  return node.categories.flatMap((category) => keys[category] ?? []).filter((prop) => node.defaults[prop] === true);
}

test('a component key documents its own theme node', () => {
  assert.equal(resolveThemeNode('badge'), theme.badge);
  assert.deepEqual(defaultsOf('badge'), nodeDefaults(theme.badge));
  assert.ok(defaultsOf('badge').length > 0);
});

test('a compound component documents the part that receives its props', () => {
  assert.equal(resolveThemeNode('button'), theme.button.main);
  assert.equal(resolveThemeNode('modal'), theme.modal.content);
  assert.equal(resolveThemeNode('navLink'), theme.navLink.root);
  assert.equal(resolveThemeNode('checkbox'), theme.checkbox.input);
  assert.equal(resolveThemeNode('menu'), theme.menu.popup);
});

test('Menu documents the popup its props are spread on, not its items', () => {
  assert.deepEqual(defaultsOf('menu'), nodeDefaults(theme.menu.popup));
  assert.notDeepEqual(defaultsOf('menu'), defaultsOf('menu.item'));
  // Menu is a popup: its table lists where it opens, which no item takes
  for (const prop of ComponentKeys.placement) {
    assert.ok(propsOf('menu').includes(prop), prop);
    assert.ok(!propsOf('menu.item').includes(prop), prop);
  }
  const placement = getPropTableRows('menu').filter((r) => r.categoryKey === 'placement' && r.isDefault);
  assert.equal(placement.length, 1, 'one placement is the default');
});

test('a dotted path documents one part', () => {
  assert.equal(resolveThemeNode('menu.item'), theme.menu.item);
  assert.equal(resolveThemeNode('menu.label'), theme.menu.label);
  assert.equal(resolveThemeNode('card.header'), theme.card.header);
  assert.deepEqual(defaultsOf('menu.item'), nodeDefaults(theme.menu.item));
  assert.deepEqual(defaultsOf('card.header'), nodeDefaults(theme.card.header));
  // A part has its own categories, not its parent's
  assert.deepEqual(
    [...new Set(getPropTableRows('card.header').map((r) => r.categoryKey))],
    theme.card.header.categories.filter((category) => (ComponentKeys as Record<string, readonly string[]>)[category]?.length),
  );
});

test('a table keeps every category the library lists for its component', () => {
  for (const [key, categories] of Object.entries(ComponentCategories)) {
    // The library files the MenuItem categories under `menu`; the Menu table is the popup's
    if (key === 'menu') continue;
    const listed = new Set(getPropTableRows(key).map((r) => r.categoryKey));
    for (const category of categories) {
      const hasProps = ((ComponentKeys as Record<string, readonly string[]>)[category] ?? []).length > 0;
      assert.ok(!hasProps || listed.has(category), `${key}: ${category}`);
    }
  }
});

test('layout and utility categories are marked common, the others are not', () => {
  const rows = getPropTableRows('row');
  assert.ok(rows.filter((r) => r.categoryKey === 'gap').every((r) => r.isCommon));
  assert.ok(rows.filter((r) => r.categoryKey === 'size').every((r) => !r.isCommon));
  assert.ok(rows.every((r) => r.category.length > 0));
});

test('a path that names no theme node throws and names the path', () => {
  for (const path of ['nope', 'menu.popupp', 'menu.item.defaults', 'constructor', 'menu.constructor', '']) {
    assert.throws(() => getPropTableRows(path), new RegExp(`^Error: "${path.replace(/\./g, '\\.')}" is not a theme node`), path);
  }
});
