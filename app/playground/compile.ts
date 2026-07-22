import type { ComponentType } from 'react';
import { transform } from 'sucrase';
import { scope } from './scope';

// new Function params must be valid, non-reserved identifiers. Namespace spreads
// can surface keys like `default`, which would make the generated function throw.
const IDENT = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
const RESERVED = new Set(['default', 'import', 'export', 'return', 'function', 'class', 'new', 'delete', 'typeof', 'void', 'in', 'this', 'super', 'yield', 'await', 'enum', 'let', 'const', 'var']);

const scopeKeys = Object.keys(scope).filter((k) => IDENT.test(k) && !RESERVED.has(k));
const scopeValues = scopeKeys.map((k) => scope[k]);

export type CompileResult =
  | { ok: true; Component: ComponentType }
  | { ok: false; error: string };

// The snippet is the *body* of a component: it may declare hooks/helpers and
// must `return` an element. Sucrase strips JSX + TS (classic runtime so JSX
// compiles to React.createElement, which is in scope), then the body runs
// inside a fresh function on every render so hooks fire during React's render.
export function compile(code: string): CompileResult {
  try {
    const { code: js } = transform(code, {
      transforms: ['jsx', 'typescript'],
      jsxRuntime: 'classic',
      production: true,
    });
    const factory = new Function(...scopeKeys, js) as (...args: unknown[]) => unknown;
    const Component = (() => factory(...scopeValues)) as ComponentType;
    return { ok: true, Component };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
