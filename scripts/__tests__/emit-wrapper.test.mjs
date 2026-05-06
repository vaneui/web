import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emitWrapper } from '../lib/emit-wrapper.mjs';

// Stand-in symbol tables sufficient for these unit tests. The real loader is
// covered by load-symbol-tables.test.mjs; here we just need predictable
// resolution buckets.
const symbolTables = {
  '@vaneui/ui': new Set(['Button', 'Row', 'Foo']),
  'react-feather': new Set(['GitHub', 'ExternalLink']),
  react: new Set(['useState', 'useEffect', 'Fragment']),
};

test('1. simple JSX expression — wraps in return and emits @vaneui/ui import', () => {
  const out = emitWrapper({
    slug: 'button',
    idx: 0,
    body: '<Button primary>X</Button>',
    identifiers: ['Button'],
    symbolTables,
    mdSourcePath: 'app/docs/data/basic-components/button.md',
    mdLine: 10,
  });

  assert.match(out, /^\/\/ @vane-source: app\/docs\/data\/basic-components\/button\.md:10\n/);
  assert.match(out, /\n'use client';\n/);
  assert.match(out, /\nimport \* as React from 'react';\n/);
  assert.match(out, /\nimport \{ Button \} from '@vaneui\/ui';\n/);
  assert.match(out, /export default function Demo\(\) \{[\s\S]*return \(/);
  assert.match(out, /<Button primary>X<\/Button>/);
  assert.match(out, /\);\n\}/);
});

test('2. JSX with react-feather icon — both packages imported in correct order', () => {
  const out = emitWrapper({
    slug: 'row-icon',
    idx: 0,
    body: '<Row><GitHub size={16}/></Row>',
    identifiers: ['Row', 'GitHub'],
    symbolTables,
    mdSourcePath: 'app/docs/data/layout-components/row.md',
    mdLine: 5,
  });

  // Both imports present.
  assert.match(out, /import \{ GitHub \} from 'react-feather';/);
  assert.match(out, /import \{ Row \} from '@vaneui\/ui';/);

  // react-feather must appear before @vaneui/ui.
  const featherIdx = out.indexOf("from 'react-feather'");
  const vaneuiIdx = out.indexOf("from '@vaneui/ui'");
  assert.ok(featherIdx > -1 && vaneuiIdx > -1);
  assert.ok(
    featherIdx < vaneuiIdx,
    `react-feather (${featherIdx}) must appear before @vaneui/ui (${vaneuiIdx})`,
  );

  // React namespace must precede both named imports.
  const reactIdx = out.indexOf("import * as React from 'react'");
  assert.ok(reactIdx > -1);
  assert.ok(reactIdx < featherIdx);
});

test('3. multi-statement body with useState — emitted verbatim, no return wrapper', () => {
  const body =
    'const [n,setN] = useState(0); return <button onClick={() => setN(n+1)}>{n}</button>;';
  const out = emitWrapper({
    slug: 'counter',
    idx: 0,
    body,
    identifiers: ['useState'],
    symbolTables,
    mdSourcePath: 'app/docs/data/basic-components/counter.md',
    mdLine: 1,
  });

  // useState must be imported from 'react' (bucketed before any named import line).
  assert.match(out, /import \{ useState \} from 'react';/);

  // The original body is dropped in verbatim — no `return (` synthesised.
  assert.match(out, /const \[n,setN\] = useState\(0\);/);
  assert.match(out, /return <button onClick=\{\(\) => setN\(n\+1\)\}>\{n\}<\/button>;/);
  // The synthesised "// author must include a return statement" comment must be present.
  assert.match(out, /\/\/ author must include a return statement/);
  // No `return (` synthesised by the emitter (only the author's own `return <button...`).
  assert.ok(
    !/return \(\n/.test(out),
    'should not synthesise a parenthesised return wrapper for multi-statement bodies',
  );
});

test('4. setup block prepending — setup lives inside Demo() body, before return', () => {
  const out = emitWrapper({
    slug: 'foo',
    idx: 0,
    body: '<Foo {...x}/>',
    identifiers: ['Foo'],
    symbolTables,
    mdSourcePath: 'app/docs/data/basic-components/foo.md',
    mdLine: 7,
    setupBody: 'const x = { primary: true };',
  });

  // Setup must appear inside the function, BEFORE `return (`.
  const fnStart = out.indexOf('export default function Demo()');
  const setupIdx = out.indexOf('const x = { primary: true };');
  const returnIdx = out.indexOf('return (');

  assert.ok(fnStart > -1, 'function declaration must be present');
  assert.ok(setupIdx > fnStart, 'setup must appear after function start');
  assert.ok(returnIdx > setupIdx, 'return must appear after setup');

  // Setup must NOT appear at module top level (i.e. before the function).
  assert.ok(
    setupIdx > fnStart,
    `setup line at ${setupIdx} must come after fn start at ${fnStart}`,
  );

  // Body still wrapped in a return.
  assert.match(out, /<Foo \{\.\.\.x\}\/>/);
});

test('5. @vane-source header is the first line', () => {
  const out = emitWrapper({
    slug: 'button',
    idx: 0,
    body: '<Button>x</Button>',
    identifiers: ['Button'],
    symbolTables,
    mdSourcePath: 'app/docs/data/basic-components/button.md',
    mdLine: 42,
  });

  const firstLine = out.split('\n')[0];
  assert.equal(firstLine, '// @vane-source: app/docs/data/basic-components/button.md:42');

  // Second line is the directive.
  const secondLine = out.split('\n')[1];
  assert.equal(secondLine, "'use client';");
});

test('6. empty identifiers — only React namespace import, no named imports', () => {
  const out = emitWrapper({
    slug: 'plain',
    idx: 0,
    body: '<div>plain</div>',
    identifiers: [],
    symbolTables,
    mdSourcePath: 'app/docs/data/misc/plain.md',
    mdLine: 1,
  });

  assert.match(out, /import \* as React from 'react';/);

  // No `import { ... } from '...'` named imports anywhere.
  assert.ok(
    !/import \{[^}]+\} from /.test(out),
    'no named imports should be emitted when there are no resolvable identifiers',
  );

  // Body still wrapped in a return.
  assert.match(out, /return \(\n\s*<div>plain<\/div>\n\s*\);/);
});

test('7. identifier not in any symbol table — dropped silently', () => {
  const out = emitWrapper({
    slug: 'unknown',
    idx: 0,
    body: '<Foo/>',
    identifiers: ['Foo'],
    // Empty tables — Foo is not anywhere.
    symbolTables: {
      '@vaneui/ui': new Set(),
      'react-feather': new Set(),
      react: new Set(),
    },
    mdSourcePath: 'app/docs/data/misc/unknown.md',
    mdLine: 1,
  });

  // No named import for Foo — but the emitter must NOT throw.
  assert.ok(
    !/import \{[^}]*Foo[^}]*\} from /.test(out),
    'Foo must be silently dropped when not in any symbol table',
  );

  // The body still appears in the wrapper unchanged.
  assert.match(out, /<Foo\/>/);
});

// --- bonus checks called out in the spec ---

test('8. JSX fragment body — wrapped as a single JSX expression', () => {
  const out = emitWrapper({
    slug: 'frag',
    idx: 0,
    body: '<><Button>a</Button><Button>b</Button></>',
    identifiers: ['Button'],
    symbolTables,
    mdSourcePath: 'app/docs/data/misc/frag.md',
    mdLine: 1,
  });

  // Single JSX fragment must trigger the `return (...)` wrap.
  assert.match(out, /return \(\n/);
  assert.ok(
    !/\/\/ author must include a return statement/.test(out),
    'fragment is a single JSX expression — author-return comment must NOT be emitted',
  );
});

test('9. parenthesized JSX expression — wrapped as a single JSX expression', () => {
  const out = emitWrapper({
    slug: 'paren',
    idx: 0,
    body: '(<Button>x</Button>)',
    identifiers: ['Button'],
    symbolTables,
    mdSourcePath: 'app/docs/data/misc/paren.md',
    mdLine: 1,
  });

  assert.match(out, /return \(\n/);
  assert.ok(!/\/\/ author must include a return statement/.test(out));
});

test('10. React identifier itself — never emitted as a named import', () => {
  const out = emitWrapper({
    slug: 'react-ref',
    idx: 0,
    body: '<Button>{React.version}</Button>',
    identifiers: ['Button', 'React'],
    symbolTables: {
      '@vaneui/ui': new Set(['Button']),
      'react-feather': new Set(),
      react: new Set(['React']),
    },
    mdSourcePath: 'app/docs/data/misc/react-ref.md',
    mdLine: 1,
  });

  // React must NOT be in a named import line.
  assert.ok(
    !/import \{[^}]*React[^}]*\} from 'react'/.test(out),
    'React must never appear as a named import',
  );
  // The unconditional namespace import must still be there.
  assert.match(out, /import \* as React from 'react';/);
});

test('11. identifiers within each bucket are sorted alphabetically', () => {
  const out = emitWrapper({
    slug: 'sorted',
    idx: 0,
    body: '<Row><Button>x</Button><Foo/></Row>',
    identifiers: ['Row', 'Button', 'Foo'],
    symbolTables,
    mdSourcePath: 'app/docs/data/misc/sorted.md',
    mdLine: 1,
  });

  // All three are @vaneui/ui — must appear sorted: Button, Foo, Row.
  assert.match(out, /import \{ Button, Foo, Row \} from '@vaneui\/ui';/);
});
