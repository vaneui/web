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
  // Stack of indices into `scopes` representing function-or-source-file scopes.
  // `var` declarations hoist to the topmost of these, not the enclosing block.
  /** @type {Array<number>} */
  const fnScopeStack = [0];

  const declaredIn = (name) => scopes.some((s) => s.has(name));
  const declareHere = (name) => scopes[scopes.length - 1].add(name);
  const declareInFnScope = (name) => {
    const idx = fnScopeStack[fnScopeStack.length - 1];
    scopes[idx].add(name);
  };

  function collectBindingNames(name) {
    if (ts.isIdentifier(name)) {
      declareHere(name.text);
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const el of name.elements) {
        if (ts.isOmittedExpression(el)) continue;
        // Walk default initializer in CURRENT scope BEFORE declaring this
        // element's name so `let { x = x } = obj` resolves outer `x` rightly.
        if (el.initializer) visit(el.initializer);
        // BindingElement.propertyName is the source key (don't declare it);
        // BindingElement.name is the local binding.
        collectBindingNames(el.name);
      }
    }
  }

  // Pre-pass for a Block / SourceFile: hoist function/class declarations and
  // let/const bindings into the current scope; `var` bindings hoist to the
  // nearest enclosing function scope.
  function hoistDeclarations(stmts) {
    for (const node of stmts) {
      if (ts.isFunctionDeclaration(node) && node.name) {
        declareHere(node.name.text);
      } else if (ts.isClassDeclaration(node) && node.name) {
        declareHere(node.name.text);
      } else if (ts.isVariableStatement(node)) {
        const flags = node.declarationList.flags;
        const isLetOrConst = (flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) !== 0;
        for (const decl of node.declarationList.declarations) {
          if (isLetOrConst) {
            collectBindingNames(decl.name);
          } else {
            // `var`: declare in nearest function scope, not block.
            collectVarNames(decl.name);
          }
        }
      }
    }
  }

  // Like collectBindingNames, but declares names in the function scope and
  // still walks default initializers in the current scope.
  function collectVarNames(name) {
    if (ts.isIdentifier(name)) {
      declareInFnScope(name.text);
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const el of name.elements) {
        if (ts.isOmittedExpression(el)) continue;
        if (el.initializer) visit(el.initializer);
        collectVarNames(el.name);
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

  function pushFnScope() {
    scopes.push(new Set());
    fnScopeStack.push(scopes.length - 1);
  }

  function popFnScope() {
    scopes.pop();
    fnScopeStack.pop();
  }

  function visit(node) {
    // Function-like nodes introduce a new scope (and a new function scope).
    if (
      ts.isArrowFunction(node) ||
      ts.isFunctionExpression(node) ||
      ts.isFunctionDeclaration(node) ||
      ts.isMethodDeclaration(node)
    ) {
      pushFnScope();
      // FunctionExpression's name is local; FunctionDeclaration's name is
      // already hoisted into the OUTER scope.
      if (ts.isFunctionExpression(node) && node.name) declareHere(node.name.text);
      for (const param of node.parameters) {
        // collectBindingNames walks per-element default initializers BEFORE
        // declaring each binding name (so `({a = ext}) =>` collects `ext`).
        collectBindingNames(param.name);
        // The parameter's OWN default initializer (`function f(x = y)` or
        // `function f({a} = src)`) is walked here. By now the params declared
        // so far are in scope; bindings declared by this parameter shadow
        // their own initializer references — close enough to JS semantics.
        if (param.initializer) visit(param.initializer);
        if (param.type) visit(param.type);
      }
      if (node.body) visit(node.body);
      popFnScope();
      return;
    }

    // Class expression: pushes a scope for its self-name, then visits members.
    if (ts.isClassExpression(node)) {
      scopes.push(new Set());
      if (node.name) declareHere(node.name.text);
      ts.forEachChild(node, (child) => {
        if (child !== node.name) visit(child);
      });
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

    // for (init; cond; incr) body — block-scopes let/const init bindings.
    if (ts.isForStatement(node)) {
      scopes.push(new Set());
      if (node.initializer) {
        if (ts.isVariableDeclarationList(node.initializer)) {
          const flags = node.initializer.flags;
          const isLetOrConst = (flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) !== 0;
          for (const decl of node.initializer.declarations) {
            if (isLetOrConst) collectBindingNames(decl.name);
            else collectVarNames(decl.name);
            if (decl.initializer) visit(decl.initializer);
            if (decl.type) visit(decl.type);
          }
        } else {
          visit(node.initializer);
        }
      }
      if (node.condition) visit(node.condition);
      if (node.incrementor) visit(node.incrementor);
      if (node.statement) visit(node.statement);
      scopes.pop();
      return;
    }

    // for (x of items) / for (k in obj)
    if (ts.isForOfStatement(node) || ts.isForInStatement(node)) {
      scopes.push(new Set());
      if (ts.isVariableDeclarationList(node.initializer)) {
        const flags = node.initializer.flags;
        const isLetOrConst = (flags & (ts.NodeFlags.Let | ts.NodeFlags.Const)) !== 0;
        for (const decl of node.initializer.declarations) {
          if (isLetOrConst) collectBindingNames(decl.name);
          else collectVarNames(decl.name);
          if (decl.type) visit(decl.type);
          // for-of/for-in declarations cannot have initializers.
        }
      } else {
        // Plain expression LHS — walk it.
        visit(node.initializer);
      }
      visit(node.expression);
      if (node.statement) visit(node.statement);
      scopes.pop();
      return;
    }

    // catch (e) { ... } — catch variable lives in the catch clause scope.
    if (ts.isCatchClause(node)) {
      scopes.push(new Set());
      if (node.variableDeclaration?.name) {
        collectBindingNames(node.variableDeclaration.name);
      }
      if (node.block) visit(node.block);
      scopes.pop();
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
