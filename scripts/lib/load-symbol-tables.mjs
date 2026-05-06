// Symbol-table loader for the docs build pipeline.
//
// Returns a record of three Sets — one per package — listing the *value*
// exports a fence body may legally reference:
//
//   { '@vaneui/ui': Set<string>, 'react-feather': Set<string>, 'react': Set<string> }
//
// `@vaneui/ui` and `react-feather` are parsed from their bundled .d.ts files
// using the TypeScript compiler API. Type-only re-exports are filtered out
// (an `export type { Foo }` declaration, or an individual `type Foo` specifier
// inside a non-type-only export). `export *` declarations are followed
// recursively so deep barrels resolve correctly.
//
// `react` is a hardcoded list — React's .d.ts is huge and most of it is types.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
// scripts/lib/load-symbol-tables.mjs -> repo root is two levels up.
const REPO_ROOT = path.resolve(__filename, '..', '..', '..');

const MAX_RECURSION_DEPTH = 5;

/**
 * Common React value exports we expect fences to reference. Anything missing
 * from this list will need to be added here rather than auto-discovered.
 */
export const REACT_BUILTINS = new Set([
  // Hooks
  'useState',
  'useEffect',
  'useMemo',
  'useCallback',
  'useRef',
  'useReducer',
  'useContext',
  'useLayoutEffect',
  'useImperativeHandle',
  'useDebugValue',
  'useId',
  'useTransition',
  'useDeferredValue',
  'useSyncExternalStore',
  'useInsertionEffect',
  'useActionState',
  'useFormStatus',
  'useOptimistic',
  'useFormState',
  // Other value exports
  'Fragment',
  'Suspense',
  'StrictMode',
  'Children',
  'cloneElement',
  'createContext',
  'forwardRef',
  'lazy',
  'memo',
  'startTransition',
]);

/**
 * Resolve a relative module specifier (e.g. `./components/ui/button`) against
 * the directory of an importing .d.ts file, returning the absolute path of
 * the target .d.ts file. Tries:
 *   1. `<spec>.d.ts`
 *   2. `<spec>/index.d.ts`
 * Returns null if neither exists.
 */
function resolveDtsModule(fromDir, specifier) {
  const base = path.resolve(fromDir, specifier);
  const candidates = [`${base}.d.ts`, path.join(base, 'index.d.ts')];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * Walk a single .d.ts file and union its value exports into `out`.
 * `visited` tracks files we've already processed (cycle / dup guard).
 */
function collectExportsFromDts(filePath, out, visited, depth) {
  if (depth > MAX_RECURSION_DEPTH) return;
  const resolved = path.resolve(filePath);
  if (visited.has(resolved)) return;
  visited.add(resolved);

  const source = fs.readFileSync(resolved, 'utf8');
  const sf = ts.createSourceFile(resolved, source, ts.ScriptTarget.Latest, /* setParentNodes */ false, ts.ScriptKind.TS);
  const fromDir = path.dirname(resolved);

  ts.forEachChild(sf, (node) => {
    // export { Foo, type Bar } from "./mod"   |  export { Foo } from "./mod"
    // export type { Foo } from "./mod"        |  export { Foo, Bar }
    if (ts.isExportDeclaration(node)) {
      // Whole declaration is `export type { ... }`  ->  skip everything.
      if (node.isTypeOnly) return;

      // `export * from "./mod"`  ->  recurse.
      if (!node.exportClause && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const target = resolveDtsModule(fromDir, node.moduleSpecifier.text);
        if (target) collectExportsFromDts(target, out, visited, depth + 1);
        return;
      }

      // `export { A, type B, C }` — possibly with a `from "./mod"` tail.
      if (node.exportClause && ts.isNamedExports(node.exportClause)) {
        for (const spec of node.exportClause.elements) {
          if (spec.isTypeOnly) continue;
          // `export { Foo as Bar }`  ->  the *outward* name is `Bar` (spec.name).
          out.add(spec.name.text);
        }
      }
      return;
    }

    // export declare const Foo: ...   |   export const Foo = ...
    if (ts.isVariableStatement(node)) {
      const isExported = (node.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (!isExported) return;
      for (const decl of node.declarationList.declarations) {
        if (ts.isIdentifier(decl.name)) out.add(decl.name.text);
      }
      return;
    }

    // export declare function foo(): void
    if (ts.isFunctionDeclaration(node)) {
      const isExported = (node.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (isExported && node.name) out.add(node.name.text);
      return;
    }

    // export declare class Foo {}
    if (ts.isClassDeclaration(node)) {
      const isExported = (node.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (isExported && node.name) out.add(node.name.text);
      return;
    }

    // export enum Foo { ... } — enums emit a value at runtime, treat as a value export.
    if (ts.isEnumDeclaration(node)) {
      const isExported = (node.modifiers ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (isExported && node.name) out.add(node.name.text);
      return;
    }

    // export interface Foo {} | export type Foo = ... — types only, skip.
    // (No-op.)
  });
}

/**
 * Resolve a package's primary .d.ts file via its package.json `types`/`typings`
 * field, falling back to `dist/index.d.ts` if neither field is present.
 */
function resolvePackageTypes(packageName) {
  const pkgDir = path.resolve(REPO_ROOT, 'node_modules', packageName);
  const pkgJsonPath = path.join(pkgDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    const typesField = pkg.types ?? pkg.typings;
    if (typesField) {
      const candidate = path.join(pkgDir, typesField);
      if (fs.existsSync(candidate)) return candidate;
    }
  }
  const fallback = path.join(pkgDir, 'dist', 'index.d.ts');
  if (fs.existsSync(fallback)) return fallback;
  throw new Error(`Could not locate .d.ts entry for package "${packageName}"`);
}

/**
 * @returns {{ '@vaneui/ui': Set<string>, 'react-feather': Set<string>, 'react': Set<string> }}
 */
export function loadSymbolTables() {
  const vaneui = new Set();
  collectExportsFromDts(resolvePackageTypes('@vaneui/ui'), vaneui, new Set(), 0);

  const feather = new Set();
  collectExportsFromDts(resolvePackageTypes('react-feather'), feather, new Set(), 0);

  return {
    '@vaneui/ui': vaneui,
    'react-feather': feather,
    react: new Set(REACT_BUILTINS),
  };
}
