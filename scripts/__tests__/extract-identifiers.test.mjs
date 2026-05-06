import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractFreeIdentifiers } from '../lib/extract-identifiers.mjs';

test('simple JSX element returns its tag', () => {
  assert.deepEqual(extractFreeIdentifiers('<Button/>'), ['Button']);
});

test('arrow params shadow free identifiers; PropertyAccess + JsxAttribute names skipped', () => {
  const body = '<Row>{items.map((item) => <Mark key={item.id}>{item.label}</Mark>)}</Row>';
  // - Row, Mark: JSX tag names (free).
  // - items: free (used outside lambda).
  // - item: lambda parameter, shadowed.
  // - key: JsxAttribute.name, skipped.
  // - id, label: PropertyAccess.name, skipped.
  assert.deepEqual(extractFreeIdentifiers(body), ['Mark', 'Row', 'items']);
});

test('computed property name expression is collected; lambda param shadows', () => {
  // Inside the lambda, `key` is the parameter -> shadowed even when used as a
  // computed key. Collected: AppearanceKey (type ref), arr (free).
  const body = 'arr.map((key: AppearanceKey) => ({...{[key]: true}}))';
  const out = extractFreeIdentifiers(body);
  assert.ok(!out.includes('key'), `key should be shadowed: ${JSON.stringify(out)}`);
  assert.ok(out.includes('arr'), `arr should be free: ${JSON.stringify(out)}`);
  assert.ok(out.includes('AppearanceKey'), `type ref should be free: ${JSON.stringify(out)}`);
});

test('computed property name expression IS collected when not shadowed', () => {
  const body = '({[key]: true})';
  assert.deepEqual(extractFreeIdentifiers(body), ['key']);
});

test('deeper namespaced tag <Mark.Group.Item> collects only Mark', () => {
  assert.deepEqual(extractFreeIdentifiers('<Mark.Group.Item/>'), ['Mark']);
});

test('React hooks (useState, useEffect) are present in result', () => {
  const body = 'const [n, setN] = useState(0); useEffect(() => {}, []); n';
  const out = extractFreeIdentifiers(body);
  assert.ok(out.includes('useState'), `useState missing: ${JSON.stringify(out)}`);
  assert.ok(out.includes('useEffect'), `useEffect missing: ${JSON.stringify(out)}`);
  // n and setN are declared by destructuring, so should not appear.
  assert.ok(!out.includes('n'), `n should be locally declared: ${JSON.stringify(out)}`);
  assert.ok(!out.includes('setN'), `setN should be locally declared: ${JSON.stringify(out)}`);
});

test('JSX with string attribute value: <Foo bar="baz" /> -> only Foo', () => {
  assert.deepEqual(extractFreeIdentifiers('<Foo bar="baz" />'), ['Foo']);
});

test('object literal { foo: bar } -> only bar', () => {
  assert.deepEqual(extractFreeIdentifiers('({ foo: bar })'), ['bar']);
});

test('shorthand property { foo } collects foo as a reference', () => {
  assert.deepEqual(extractFreeIdentifiers('({ foo })'), ['foo']);
});

test('result is deduplicated and alphabetically sorted', () => {
  const body = '<Z/><A/><M/><A/>';
  assert.deepEqual(extractFreeIdentifiers(body), ['A', 'M', 'Z']);
});

test('intrinsic JSX (lowercase tag) is not collected', () => {
  assert.deepEqual(extractFreeIdentifiers('<div><span>{x}</span></div>'), ['x']);
});

test('let/const declarations in a block scope shadow', () => {
  const body = '{ const Button = makeBtn(); <Button/> }';
  // Button is locally declared inside the block, NOT free.
  // makeBtn IS free.
  const out = extractFreeIdentifiers(body);
  assert.ok(!out.includes('Button'), `Button should be local: ${JSON.stringify(out)}`);
  assert.ok(out.includes('makeBtn'), `makeBtn should be free: ${JSON.stringify(out)}`);
});

test('function declaration name is declared in enclosing scope', () => {
  const body = 'function helper(x) { return x + global; } <Foo onClick={helper}/>';
  const out = extractFreeIdentifiers(body);
  assert.ok(!out.includes('helper'), `helper is declared: ${JSON.stringify(out)}`);
  assert.ok(!out.includes('x'), `x is a param: ${JSON.stringify(out)}`);
  assert.ok(out.includes('global'), `global is free: ${JSON.stringify(out)}`);
  assert.ok(out.includes('Foo'), `Foo is free: ${JSON.stringify(out)}`);
  assert.ok(!out.includes('onClick'), `onClick is JsxAttribute.name: ${JSON.stringify(out)}`);
});

test('destructuring param: ({ a: b }) => b -- a is the source key, b is the binding', () => {
  const body = '(({ a: b }) => b)(obj)';
  const out = extractFreeIdentifiers(body);
  assert.ok(!out.includes('a'), `a is BindingElement.propertyName: ${JSON.stringify(out)}`);
  assert.ok(!out.includes('b'), `b is the local binding: ${JSON.stringify(out)}`);
  assert.ok(out.includes('obj'), `obj is free: ${JSON.stringify(out)}`);
});

test('empty body returns empty array', () => {
  assert.deepEqual(extractFreeIdentifiers(''), []);
});

// --- scope-tracking regression tests ---

test('for-loop let var does not leak; `n` is free', () => {
  assert.deepEqual(extractFreeIdentifiers('for (let i = 0; i < n; i++) i'), ['n']);
});

test('for-of let var does not leak; `items` is free', () => {
  assert.deepEqual(extractFreeIdentifiers('for (const x of items) x'), ['items']);
});

test('for-in let var does not leak; `obj` is free', () => {
  assert.deepEqual(extractFreeIdentifiers('for (const k in obj) k'), ['obj']);
});

test('catch clause variable does not leak', () => {
  assert.deepEqual(extractFreeIdentifiers('try { x } catch (e) { e }'), ['x']);
});

test('class declaration name is hoisted in enclosing scope', () => {
  assert.deepEqual(extractFreeIdentifiers('class Foo {} new Foo()'), []);
});

test('class expression self-name is scoped to its body', () => {
  assert.deepEqual(
    extractFreeIdentifiers('const x = class Inner { m() { return Inner; } }'),
    [],
  );
});

test('binding pattern default initializer is walked (arrow param)', () => {
  assert.deepEqual(extractFreeIdentifiers('(({ a = defaultVal }) => a)()'), ['defaultVal']);
});

test('binding pattern default initializer is walked (variable decl)', () => {
  assert.deepEqual(extractFreeIdentifiers('const { a, b = ext } = src'), ['ext', 'src']);
});

test('var declarations are function-scoped, not block-scoped', () => {
  assert.deepEqual(extractFreeIdentifiers('function f() { { var x = 1; } x }'), []);
});

test('function-expression name does NOT leak to outer scope', () => {
  assert.deepEqual(extractFreeIdentifiers('(function inner() {}); inner'), ['inner']);
});
