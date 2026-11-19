// The Button the landing's prop demo opens in the playground. Run with:
//   npx tsx --test lib/playground/__tests__/propsSnippet.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { parseDemoProps, propsHref, propsSnippet, toggleProp, withoutProps } from '../propsSnippet';

test('toggleProp turns a prop on and off', () => {
  assert.deepEqual(toggleProp([], 'filled'), ['filled']);
  assert.deepEqual(toggleProp(['filled', 'pill'], 'pill'), ['filled']);
});

test('toggleProp keeps one prop per group and the code order', () => {
  assert.deepEqual(toggleProp(['filled', 'pill', 'lg'], 'sharp'), ['filled', 'sharp', 'lg']);
  assert.deepEqual(toggleProp(['filled', 'lg'], 'ghost'), ['ghost', 'lg']);
  assert.deepEqual(toggleProp(['lg'], 'filled'), ['filled', 'lg']);
});

test('propsSnippet writes the props on the Button and leaves the rest of the code alone', () => {
  const code = propsSnippet(['filled', 'pill', 'lg']);
  assert.match(code, /<Button filled pill lg>Save changes<\/Button>/);
  assert.match(code, /<Button secondary>Cancel<\/Button>/);
  assert.match(code, /^return \($/m);
  assert.match(propsSnippet([]), /<Button>Save changes<\/Button>/);
});

test('propsHref and parseDemoProps round-trip', () => {
  assert.equal(propsHref(['filled', 'pill']), '/playground?props=filled,pill');
  assert.equal(propsHref([]), '/playground?props=');
  const search = new URL(propsHref(['filled', 'sharp', 'lg']), 'https://vaneui.com').search;
  assert.deepEqual(parseDemoProps(search), ['filled', 'sharp', 'lg']);
});

test('parseDemoProps is null without the parameter and keeps an empty list', () => {
  assert.equal(parseDemoProps(''), null);
  assert.equal(parseDemoProps('?reset'), null);
  assert.deepEqual(parseDemoProps('?props='), []);
});

test('parseDemoProps keeps known props only, so a link cannot inject code', () => {
  assert.deepEqual(parseDemoProps('?props=filled,onClick,%3Cscript%3E,lg'), ['filled', 'lg']);
  assert.deepEqual(parseDemoProps('?props=' + encodeURIComponent('pill>{alert(1)}<Button')), []);
  const code = propsSnippet(parseDemoProps('?props=lg,' + encodeURIComponent('}); alert(1); ({')) ?? []);
  assert.doesNotMatch(code, /alert/);
});

test('parseDemoProps drops repeats and a second prop from the same group', () => {
  assert.deepEqual(parseDemoProps('?props=lg,pill,sharp,lg'), ['pill', 'lg']);
  assert.deepEqual(parseDemoProps('?props=ghost,filled'), ['ghost']);
  assert.deepEqual(parseDemoProps('?props=%20filled%20,pill'), ['filled', 'pill']);
});

test('withoutProps drops only the props parameter', () => {
  assert.equal(withoutProps('https://vaneui.com/playground?props=filled'), '/playground');
  assert.equal(withoutProps('https://vaneui.com/playground?props=lg&theme=dark#preview'), '/playground?theme=dark#preview');
  assert.equal(withoutProps('/playground?theme=dark'), '/playground?theme=dark');
});
