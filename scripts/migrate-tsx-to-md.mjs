#!/usr/bin/env node
// One-shot migration script for Task 14 of the markdown-first docs refactor.
//
// Walks app/docs/data/**/*.tsx (the remaining `*Examples: DocsPagePart[]`
// files), parses each via the TypeScript AST, and emits a draft `.md` sibling.
// Authors then hand-edit the draft to fix any compilation issues before
// deleting the original TSX.
//
// Idempotent: skips any target `.md` that already exists. We never overwrite
// authored markdown.
//
// Usage:
//   node scripts/migrate-tsx-to-md.mjs            # migrate every TSX
//   node scripts/migrate-tsx-to-md.mjs <abs-tsx>  # migrate one file
//
// The pure transform `tsxToMarkdown(tsxSource, slug, name, description)` is
// exported so the test suite can exercise it without filesystem I/O.

import ts from 'typescript';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const DATA_DIR = path.join(REPO_ROOT, 'app', 'docs', 'data');

// ---------------------------------------------------------------------------
// AST extraction
// ---------------------------------------------------------------------------

// Find `export const <Name>Examples[: DocsPagePart[]] = [...]`.
function findExamplesArray(sourceFile) {
  for (const stmt of sourceFile.statements) {
    if (!ts.isVariableStatement(stmt)) continue;
    const isExport = stmt.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExport) continue;
    for (const decl of stmt.declarationList.declarations) {
      if (!decl.initializer || !ts.isArrayLiteralExpression(decl.initializer)) {
        continue;
      }
      const name = decl.name.getText(sourceFile);
      if (!name.endsWith('Examples')) continue;
      return decl.initializer;
    }
  }
  return null;
}

function stringLiteralValue(node) {
  if (!node) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }
  return null;
}

// Strip the common leading whitespace across lines so extracted JSX doesn't
// keep its deep indent inside a code fence. First line is left-trimmed.
function dedent(text) {
  if (!text) return '';
  const lines = text.split('\n');
  const firstLine = lines[0];
  const rest = lines.slice(1);
  const indents = rest
    .filter((l) => l.trim().length > 0)
    .map((l) => (l.match(/^ */) || [''])[0].length);
  const minIndent = indents.length ? Math.min(...indents) : 0;
  const out = [
    firstLine.trim(),
    ...rest.map((l) => (l.length >= minIndent ? l.slice(minIndent) : l)),
  ];
  return out.join('\n').replace(/\s+$/g, '');
}

function extractParts(arrayLit, sourceFile) {
  const parts = [];
  for (const el of arrayLit.elements) {
    if (!ts.isObjectLiteralExpression(el)) continue;
    const part = {
      title: null,
      md: null,
      componentText: null,
      code: undefined,
    };
    for (const prop of el.properties) {
      if (!ts.isPropertyAssignment(prop)) continue;
      const name = prop.name.getText(sourceFile);
      if (name === 'title') {
        part.title = stringLiteralValue(prop.initializer);
      } else if (name === 'md') {
        part.md = stringLiteralValue(prop.initializer);
      } else if (name === 'component') {
        // Unwrap `component: ( <JSX/> )` to just `<JSX/>` — the parens are
        // syntactic sugar to let the JSX start on its own line.
        let init = prop.initializer;
        while (ts.isParenthesizedExpression(init)) init = init.expression;
        part.componentText = dedent(init.getText(sourceFile));
      } else if (name === 'code') {
        const lit = stringLiteralValue(prop.initializer);
        // code field is present; value may be "" (explicitly hide code block).
        part.code = lit ?? '';
      }
    }
    if (part.title != null && part.md != null) parts.push(part);
  }
  return parts;
}

// ---------------------------------------------------------------------------
// Markdown rendering
// ---------------------------------------------------------------------------

function renderFrontmatter(slug, name) {
  return [
    '---',
    `componentKey: ${slug}`,
    `importPath: 'import { ${name} } from "@vaneui/ui"'`,
    `sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/${slug}.tsx`,
    'since: 0.9.0',
    '---',
  ].join('\n');
}

function renderPart(part) {
  const lines = [];
  lines.push(`## ${part.title}`);
  lines.push('');
  if (part.md) {
    lines.push(part.md);
    lines.push('');
  }
  // Prefer explicit `code` override when present and non-empty.
  if (typeof part.code === 'string' && part.code !== '') {
    lines.push('```tsx demo');
    lines.push(part.code);
    lines.push('```');
    lines.push('');
  } else if (
    part.code === undefined &&
    part.componentText &&
    part.componentText.trim().length > 0
  ) {
    lines.push('```tsx demo');
    lines.push(part.componentText);
    lines.push('```');
    lines.push('');
  }
  // If code === "" the prose already contains a fence — emit nothing extra.
  return lines.join('\n');
}

/**
 * Pure transform — no filesystem access. Exported for tests.
 *
 * @param {string} tsxSource  The full .tsx source to migrate.
 * @param {string} slug       componentKey value (camelCase, e.g. "iconButton")
 * @param {string} name       PascalCase component name (e.g. "IconButton")
 * @param {string} description Short prose intro from docsMetadata.
 * @returns {string} The rendered markdown source.
 */
export function tsxToMarkdown(tsxSource, slug, name, description) {
  const sourceFile = ts.createSourceFile(
    `${slug}.tsx`,
    tsxSource,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    ts.ScriptKind.TSX,
  );
  const arrayLit = findExamplesArray(sourceFile);
  if (!arrayLit) {
    throw new Error(`No *Examples export found in TSX source for slug=${slug}`);
  }
  const parts = extractParts(arrayLit, sourceFile);
  if (parts.length === 0) {
    throw new Error(
      `No DocsPagePart entries extracted from TSX source for slug=${slug}`,
    );
  }

  const sections = [renderFrontmatter(slug, name), '', description, ''];
  for (const part of parts) sections.push(renderPart(part));

  return sections.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------------------------------------------------------------------------
// CLI runner
// ---------------------------------------------------------------------------

async function pathExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function loadDocsMetadata() {
  const metaPath = path.join(REPO_ROOT, 'app', 'docs', 'docsMetadata.ts');
  const source = await fs.readFile(metaPath, 'utf8');
  const sourceFile = ts.createSourceFile(
    metaPath,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  // Walk every ObjectLiteralExpression that declares a `componentKey` literal
  // and harvest the slug/name/description/componentKey fields.
  const entries = [];
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const obj = {};
      for (const p of node.properties) {
        if (!ts.isPropertyAssignment(p)) continue;
        const k = p.name.getText(sourceFile);
        const v = stringLiteralValue(p.initializer);
        if (v != null) obj[k] = v;
      }
      if (obj.componentKey && obj.slug && obj.name) {
        entries.push(obj);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return entries;
}

// Filenames that don't follow the slug/componentKey conventions.
const FILENAME_TO_COMPONENT_KEY = {
  'icon-component': 'icon',
};

function lookupMeta(metaEntries, tsxAbsPath) {
  // Match by URL slug derived from filename, then fallback to componentKey
  // matching the basename. e.g. iconbutton.tsx -> componentKey 'iconButton'.
  const baseName = path.basename(tsxAbsPath, '.tsx');

  // Hard-coded special cases first.
  if (FILENAME_TO_COMPONENT_KEY[baseName]) {
    const ck = FILENAME_TO_COMPONENT_KEY[baseName];
    const hit = metaEntries.find((e) => e.componentKey === ck);
    if (hit) return hit;
  }

  // Exact slug match (e.g. button, badge, grid2).
  let hit = metaEntries.find((e) => e.slug === baseName);
  // Filenames are lowercased; metadata slug may be hyphenated (icon-button,
  // page-title). Compare with hyphens stripped on both sides.
  if (!hit) {
    const alt = baseName.replace(/-/g, '');
    hit = metaEntries.find((e) => e.slug.replace(/-/g, '') === alt);
  }
  // Last resort: componentKey lowercased equals filename
  // (e.g. iconbutton -> iconButton, navlink -> navLink, pagetitle -> pageTitle).
  if (!hit) {
    hit = metaEntries.find((e) => e.componentKey.toLowerCase() === baseName);
  }
  return hit ?? null;
}

async function findTsxFiles(dir) {
  /** @type {string[]} */
  const out = [];
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return out;
    throw err;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findTsxFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
      out.push(full);
    }
  }
  return out;
}

async function migrateOne(tsxAbsPath, metaEntries) {
  const targetPath = tsxAbsPath.replace(/\.tsx$/, '.md');
  const rel = path.relative(REPO_ROOT, targetPath).split(path.sep).join('/');
  if (await pathExists(targetPath)) {
    console.log(`skipping ${rel}: target exists`);
    return { skipped: true };
  }
  const meta = lookupMeta(metaEntries, tsxAbsPath);
  if (!meta) {
    console.warn(
      `skipping ${rel}: no docsMetadata entry matches ${path.basename(tsxAbsPath)}`,
    );
    return { skipped: true, missingMeta: true };
  }
  const tsxSource = await fs.readFile(tsxAbsPath, 'utf8');
  const md = tsxToMarkdown(
    tsxSource,
    meta.componentKey,
    meta.name,
    meta.description,
  );
  await fs.writeFile(targetPath, md, 'utf8');
  console.log(`wrote ${rel}`);
  return { wrote: true };
}

async function main() {
  const args = process.argv.slice(2);
  const metaEntries = await loadDocsMetadata();
  const targets =
    args.length > 0 ? args.map((a) => path.resolve(a)) : await findTsxFiles(DATA_DIR);

  let wrote = 0;
  let skipped = 0;
  for (const tsxAbs of targets) {
    const result = await migrateOne(tsxAbs, metaEntries);
    if (result.wrote) wrote += 1;
    if (result.skipped) skipped += 1;
  }
  console.log(
    `[migrate-tsx-to-md] wrote ${wrote} markdown drafts, skipped ${skipped}`,
  );
}

// Only run main() when invoked directly (not when imported by tests).
const invokedScript = process.argv[1] ? path.resolve(process.argv[1]) : '';
if (invokedScript && fileURLToPath(import.meta.url) === invokedScript) {
  main().catch((err) => {
    console.error(err && err.stack ? err.stack : err);
    process.exit(1);
  });
}
