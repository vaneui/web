// Wrapper emitter for the docs build pipeline.
//
// Given a fence body plus a precomputed list of free identifiers and the
// loaded symbol tables, produces the contents of a per-fence TSX wrapper
// file. The wrapper is a complete, self-contained client component module:
//
//   // @vane-source: <md>:<line>
//   'use client';
//   import * as React from 'react';
//   import { ... } from 'react';            // omitted if empty
//   import { ... } from 'react-feather';    // omitted if empty
//   import { ... } from '@vaneui/ui';       // omitted if empty
//   export default function Demo() {
//     // setup (verbatim, if provided)
//     return (
//       <BODY>
//     );
//   }
//
// Body-shape detection: parse the fence body as TSX. If the source file has
// exactly one top-level statement and that statement is an ExpressionStatement
// whose expression is a JSX element / fragment / self-closing element (or a
// ParenthesizedExpression around any of those), the body is treated as a
// single JSX expression and wrapped in `return (<BODY>);`. Otherwise the body
// is dropped into the function body verbatim and the author is responsible
// for writing their own `return`.
//
// Identifier resolution buckets identifiers by package using the symbol
// tables. Identifiers not found in any table are silently dropped — tsc on
// the generated wrapper will catch the resulting "Cannot find name" error
// and the failure points clearly at the offending fence.

import ts from 'typescript';

/**
 * @param {ts.Expression} expr
 * @returns {boolean}
 */
function isJsxLike(expr) {
  if (
    ts.isJsxElement(expr) ||
    ts.isJsxFragment(expr) ||
    ts.isJsxSelfClosingElement(expr)
  ) {
    return true;
  }
  if (ts.isParenthesizedExpression(expr)) {
    return isJsxLike(expr.expression);
  }
  return false;
}

/**
 * Determine whether the fence body is a single JSX expression that should be
 * wrapped in `return (...)`. Returns `true` if and only if the parsed source
 * file contains exactly one statement, that statement is an
 * ExpressionStatement, and its expression is JSX-like (element, fragment,
 * self-closing element, or parenthesized form thereof).
 *
 * @param {string} body
 * @returns {boolean}
 */
function isSingleJsxExpression(body) {
  const sf = ts.createSourceFile(
    'demo.tsx',
    body,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    ts.ScriptKind.TSX,
  );

  const statements = sf.statements;
  if (statements.length !== 1) return false;
  const only = statements[0];
  if (!ts.isExpressionStatement(only)) return false;
  return isJsxLike(only.expression);
}

/**
 * Bucket free identifiers into their owning packages using the symbol tables.
 * Resolution priority: react -> @vaneui/ui -> react-feather. VaneUI wins over
 * react-feather for the four colliding names (Code, Link, List, Menu) because
 * those are first-class VaneUI components used throughout the docs; the icon
 * counterparts are rarely needed and can be aliased via setup if required.
 * Identifiers not found in any table are silently dropped. The literal name
 * `React` is also dropped from the `react` bucket because we always emit
 * `import * as React from 'react'` unconditionally.
 *
 * @param {string[]} identifiers
 * @param {{ '@vaneui/ui': Set<string>, 'react-feather': Set<string>, 'react': Set<string> }} symbolTables
 */
function bucketIdentifiers(identifiers, symbolTables) {
  /** @type {{ react: string[], 'react-feather': string[], '@vaneui/ui': string[] }} */
  const buckets = { react: [], 'react-feather': [], '@vaneui/ui': [] };

  for (const id of identifiers) {
    if (symbolTables.react.has(id)) {
      if (id !== 'React') buckets.react.push(id);
      continue;
    }
    if (symbolTables['@vaneui/ui'].has(id)) {
      buckets['@vaneui/ui'].push(id);
      continue;
    }
    if (symbolTables['react-feather'].has(id)) {
      buckets['react-feather'].push(id);
      continue;
    }
    // Drop silently — tsc will fail on the wrapper if the identifier was
    // actually needed, which is the desired behaviour.
  }

  for (const key of Object.keys(buckets)) {
    buckets[key] = [...new Set(buckets[key])].sort();
  }

  return buckets;
}

/**
 * Strip a leading run of blank lines and remove a uniform leading indent
 * shared by every non-blank line. Keeps the body readable when injected into
 * the function body of the wrapper.
 *
 * @param {string} src
 * @returns {string}
 */
function dedent(src) {
  const lines = src.replace(/^\n+/, '').replace(/\s+$/, '').split('\n');
  if (lines.length === 0) return '';
  let minIndent = Infinity;
  for (const line of lines) {
    if (line.trim() === '') continue;
    const m = line.match(/^[ \t]*/);
    const indent = m ? m[0].length : 0;
    if (indent < minIndent) minIndent = indent;
  }
  if (!isFinite(minIndent) || minIndent === 0) return lines.join('\n');
  return lines.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)).join('\n');
}

/**
 * Indent every line of `src` by `prefix`. Empty lines stay empty.
 *
 * @param {string} src
 * @param {string} prefix
 * @returns {string}
 */
function indent(src, prefix) {
  return src
    .split('\n')
    .map((l) => (l.length === 0 ? l : prefix + l))
    .join('\n');
}

/**
 * Emit a single named-imports line, or empty string if the bucket is empty.
 *
 * @param {string[]} names
 * @param {string} pkg
 * @returns {string}
 */
function importLine(names, pkg) {
  if (names.length === 0) return '';
  return `import { ${names.join(', ')} } from '${pkg}';\n`;
}

/**
 * @param {{
 *   slug: string,
 *   idx: number,
 *   body: string,
 *   identifiers: string[],
 *   symbolTables: { '@vaneui/ui': Set<string>, 'react-feather': Set<string>, 'react': Set<string> },
 *   mdSourcePath: string,
 *   mdLine: number,
 *   setupBody?: string,
 * }} opts
 * @returns {string}
 */
export function emitWrapper(opts) {
  const {
    body,
    identifiers,
    symbolTables,
    mdSourcePath,
    mdLine,
    setupBody,
  } = opts;

  const buckets = bucketIdentifiers(identifiers, symbolTables);
  const singleJsx = isSingleJsxExpression(body);

  const header = `// @vane-source: ${mdSourcePath}:${mdLine}\n`;
  const useClient = `'use client';\n`;
  const reactNs = `import * as React from 'react';\n`;

  // Order: react, react-feather, @vaneui/ui.
  const imports =
    importLine(buckets.react, 'react') +
    importLine(buckets['react-feather'], 'react-feather') +
    importLine(buckets['@vaneui/ui'], '@vaneui/ui');

  // Build function body.
  let fnBody = '';
  const dedentedSetup = setupBody ? dedent(setupBody) : '';
  const dedentedBody = dedent(body);

  if (singleJsx) {
    if (dedentedSetup) {
      fnBody += indent('// --- setup (from MD file) ---', '  ') + '\n';
      fnBody += indent(dedentedSetup, '  ') + '\n';
      fnBody += indent('// --- end setup ---', '  ') + '\n';
    }
    fnBody += '  return (\n';
    fnBody += indent(dedentedBody, '    ') + '\n';
    fnBody += '  );\n';
  } else {
    fnBody += '  // author must include a return statement\n';
    if (dedentedSetup) {
      fnBody += indent('// --- setup (from MD file) ---', '  ') + '\n';
      fnBody += indent(dedentedSetup, '  ') + '\n';
      fnBody += indent('// --- end setup ---', '  ') + '\n';
    }
    fnBody += indent(dedentedBody, '  ') + '\n';
  }

  const fn = `export default function Demo() {\n${fnBody}}\n`;

  return header + useClient + reactNs + imports + fn;
}
