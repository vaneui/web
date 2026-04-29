// Free-identifier extractor for fence bodies in the docs build pipeline.
// Parses a TSX fragment and returns a deduplicated, alphabetically sorted
// list of identifiers that are referenced but not declared locally.
//
// Excluded from collection:
//   - PropertyAccessExpression.name (`foo.bar` -> only `foo`).
//   - JsxAttribute.name (`<X foo="y"/>` -> not `foo`).
//   - PropertyAssignment.name (`{ foo: bar }` -> not `foo`).
//   - BindingElement.propertyName (`{ a: b } = obj` -> not `a`).
//   - JSX intrinsic tags (lowercase `<div>`).
//
// JSX tag names that are property-access chains collect only the leftmost
// segment: `<Foo.Bar.Baz/>` -> `Foo`.
//
// Computed property names (`{ [key]: ... }`) ARE collected — `key` is the
// expression of a ComputedPropertyName, not a key alias.

import ts from 'typescript';

/**
 * @param {string} body
 * @returns {string[]}
 */
export function extractFreeIdentifiers(body) {
  if (!body) return [];

  const sf = ts.createSourceFile(
    'fence.tsx',
    body,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );

  /** @type {Set<string>} */
  const free = new Set();
  /** @type {Array<Set<string>>} */
  const scopes = [new Set()];

  const declaredIn = (name) => scopes.some((s) => s.has(name));
  const declareHere = (name) => scopes[scopes.length - 1].add(name);

  function collectBindingNames(name) {
    if (ts.isIdentifier(name)) {
      declareHere(name.text);
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const el of name.elements) {
        if (ts.isOmittedExpression(el)) continue;
        // BindingElement.propertyName is the source key (don't declare it);
        // BindingElement.name is the local binding.
        collectBindingNames(el.name);
      }
    }
  }

  // Pre-pass for a Block / SourceFile: hoist function declarations and
  // var/let/const bindings into the current scope so that forward references
  // resolve correctly.
  function hoistDeclarations(stmts) {
    for (const node of stmts) {
      if (ts.isFunctionDeclaration(node) && node.name) {
        declareHere(node.name.text);
      } else if (ts.isVariableStatement(node)) {
        for (const decl of node.declarationList.declarations) {
          collectBindingNames(decl.name);
        }
      }
    }
  }

  function isJsxTagName(node) {
    const p = node.parent;
    return (
      p &&
      (p.kind === ts.SyntaxKind.JsxOpeningElement ||
        p.kind === ts.SyntaxKind.JsxClosingElement ||
        p.kind === ts.SyntaxKind.JsxSelfClosingElement) &&
      p.tagName === node
    );
  }

  function shouldSkipIdentifier(node) {
    const p = node.parent;
    if (!p) return false;
    if (ts.isPropertyAccessExpression(p) && p.name === node) return true;
    if (ts.isJsxAttribute(p) && p.name === node) return true;
    if (ts.isPropertyAssignment(p) && p.name === node) return true;
    if (ts.isBindingElement(p) && p.propertyName === node) return true;
    return false;
  }

  function recordJsxTagName(tagName) {
    // <Foo/> -> Identifier; <Foo.Bar.Baz/> -> PropertyAccessExpression chain.
    if (ts.isIdentifier(tagName)) {
      const name = tagName.text;
      // Lowercase first letter = intrinsic JSX (div, span, etc.) — not a binding.
      if (name[0] && name[0] === name[0].toLowerCase()) return;
      if (!declaredIn(name)) free.add(name);
      return;
    }
    if (ts.isPropertyAccessExpression(tagName)) {
      let cur = tagName;
      while (ts.isPropertyAccessExpression(cur)) cur = cur.expression;
      if (ts.isIdentifier(cur) && !declaredIn(cur.text)) free.add(cur.text);
    }
    // ThisExpression / other -> ignore.
  }

  function visit(node) {
    // Function-like nodes introduce a new scope.
    if (
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node)
    ) {
      scopes.push(new Set());
      // FunctionExpression's name is local; FunctionDeclaration's name is
      // already hoisted into the OUTER scope.
      if (ts.isFunctionExpression(node) && node.name) declareHere(node.name.text);
      for (const param of node.parameters) {
        collectBindingNames(param.name);
        if (param.initializer) visit(param.initializer);
        if (param.type) visit(param.type);
      }
      if (node.body) visit(node.body);
      scopes.pop();
      return;
    }

    if (ts.isBlock(node)) {
      scopes.push(new Set());
      hoistDeclarations(node.statements);
      ts.forEachChild(node, visit);
      scopes.pop();
      return;
    }

    if (ts.isSourceFile(node)) {
      hoistDeclarations(node.statements);
      ts.forEachChild(node, visit);
      return;
    }

    if (ts.isVariableDeclaration(node)) {
      // Binding already hoisted; walk only the initializer/type for refs.
      if (node.initializer) visit(node.initializer);
      if (node.type) visit(node.type);
      return;
    }

    // JSX element: handle tagName specially, then walk the rest.
    if (
      ts.isJsxOpeningElement(node) ||
      ts.isJsxClosingElement(node) ||
      ts.isJsxSelfClosingElement(node)
    ) {
      recordJsxTagName(node.tagName);
      ts.forEachChild(node, (child) => {
        if (child !== node.tagName) visit(child);
      });
      return;
    }

    if (ts.isIdentifier(node)) {
      if (shouldSkipIdentifier(node)) return;
      // JSX tag-name identifiers are handled by recordJsxTagName already.
      if (isJsxTagName(node)) return;
      if (!declaredIn(node.text)) free.add(node.text);
      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(sf);
  return [...free].sort();
}
