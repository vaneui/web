import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadSymbolTables, REACT_BUILTINS } from '../lib/load-symbol-tables.mjs';

const tables = loadSymbolTables();

test('returns three Set instances keyed by package name', () => {
  assert.ok(tables['@vaneui/ui'] instanceof Set, '@vaneui/ui should be a Set');
  assert.ok(tables['react-feather'] instanceof Set, 'react-feather should be a Set');
  assert.ok(tables['react'] instanceof Set, 'react should be a Set');
});

test('@vaneui/ui table includes core value exports (recurses through export *)', () => {
  const vaneui = tables['@vaneui/ui'];
  // Top-level named re-exports.
  assert.ok(vaneui.has('Button'), 'Button should be present');
  assert.ok(vaneui.has('Card'), 'Card should be present');
  assert.ok(vaneui.has('Row'), 'Row should be present');
  assert.ok(vaneui.has('ComponentKeys'), 'ComponentKeys should be present');
  assert.ok(vaneui.has('defaultTheme'), 'defaultTheme should be present');
});

test('@vaneui/ui table filters type-only re-exports', () => {
  const vaneui = tables['@vaneui/ui'];
  // `ComponentKey` is exported as `type ComponentKey` inside an
  // `export { ... }` declaration in the root index.d.ts, so it must be
  // filtered out at the specifier level.
  assert.ok(!vaneui.has('ComponentKey'), 'ComponentKey (type) must NOT be present');
  // `OverlayProps` is exported via a whole-declaration `export type { ... }`
  // and must be filtered out at the declaration level.
  assert.ok(!vaneui.has('OverlayProps'), 'OverlayProps (type) must NOT be present');
  // `ButtonProps` is type-only (interface).
  assert.ok(!vaneui.has('ButtonProps'), 'ButtonProps (type) must NOT be present');
});

test('react table contains hooks and core utilities', () => {
  const react = tables['react'];
  assert.ok(react.has('useState'));
  assert.ok(react.has('useEffect'));
  assert.ok(react.has('useMemo'));
  assert.ok(react.has('Fragment'));
  assert.ok(react.has('forwardRef'));
});

test('REACT_BUILTINS is exported as a Set for inspection', () => {
  assert.ok(REACT_BUILTINS instanceof Set);
  assert.ok(REACT_BUILTINS.has('useState'));
  assert.ok(REACT_BUILTINS.has('Fragment'));
});

test('react-feather table contains expected icon names', () => {
  const feather = tables['react-feather'];
  assert.ok(feather.has('ExternalLink'), 'ExternalLink icon should be present');
  assert.ok(feather.has('GitHub'), 'GitHub icon should be present');
  assert.ok(feather.has('Home'), 'Home icon should be present');
});

test('symbol tables contain a non-trivial number of entries', () => {
  // Sanity check: confirms recursion actually fired and we're not just
  // returning the 30-ish lines of the root index.d.ts.
  assert.ok(tables['@vaneui/ui'].size >= 30, `expected >= 30 vaneui exports, got ${tables['@vaneui/ui'].size}`);
  assert.ok(tables['react-feather'].size >= 100, `expected >= 100 feather icons, got ${tables['react-feather'].size}`);
});
