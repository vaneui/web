import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractFences } from '../lib/extract-fences.mjs';

test('extracts setup + demos + hide with correct order, body, line', () => {
  const md = [
    '# Title',
    '',
    '```tsx setup',
    'const X = 1;',
    '```',
    '',
    'Body 1.',
    '',
    '```tsx demo',
    '<Foo/>',
    '```',
    '',
    '```tsx demo id="named"',
    '<Bar/>',
    '```',
    '',
    '```tsx hide',
    '<Baz/>',
    '```',
    '',
    '```ts',          // ts is NOT tsx/jsx — must be filtered out
    'const skip = 1;',
    '```',
    '',
  ].join('\n');

  const out = extractFences(md);

  assert.equal(out.setup, 'const X = 1;');
  assert.equal(out.fences.length, 3);
  assert.deepEqual(
    out.fences.map((f) => ({ id: f.id, kind: f.kind, body: f.body })),
    [
      { id: '0', kind: 'demo', body: '<Foo/>' },
      { id: 'named', kind: 'demo', body: '<Bar/>' },
      { id: '2', kind: 'hide', body: '<Baz/>' },
    ],
  );

  // line is 1-based; first demo fence opener is on line 9
  assert.equal(typeof out.fences[0].line, 'number');
  assert.equal(out.fences[0].line, 9);
  assert.ok(out.fences[1].line > out.fences[0].line);
  assert.ok(out.fences[2].line > out.fences[1].line);
});

test('empty source returns empty result', () => {
  const out = extractFences('');
  assert.equal(out.setup, undefined);
  assert.deepEqual(out.fences, []);
});

test('single demo fence with no setup', () => {
  const md = [
    'Some prose.',
    '',
    '```jsx demo',
    '<Only/>',
    '```',
    '',
  ].join('\n');

  const out = extractFences(md);
  assert.equal(out.setup, undefined);
  assert.equal(out.fences.length, 1);
  assert.equal(out.fences[0].id, '0');
  assert.equal(out.fences[0].kind, 'demo');
  assert.equal(out.fences[0].body, '<Only/>');
  assert.equal(out.fences[0].line, 3);
});

test('fence with no flag defaults to demo', () => {
  const md = ['```tsx', '<NoFlag/>', '```', ''].join('\n');
  const out = extractFences(md);
  assert.equal(out.fences.length, 1);
  assert.equal(out.fences[0].kind, 'demo');
  assert.equal(out.fences[0].id, '0');
});

test('only the first setup fence is hoisted; subsequent setups are dropped', () => {
  const md = [
    '```tsx setup',
    'const a = 1;',
    '```',
    '',
    '```tsx setup',
    'const b = 2;',
    '```',
    '',
    '```tsx demo',
    '<X/>',
    '```',
    '',
  ].join('\n');

  const out = extractFences(md);
  assert.equal(out.setup, 'const a = 1;');
  assert.equal(out.fences.length, 1);
  assert.equal(out.fences[0].body, '<X/>');
});
