// Docs page discovery and include expansion for the examples build.
//
// Pages are the .md files under app/docs/data. Files and directories whose
// name starts with `_` (e.g. `_partials/`) are partials: shared snippets pages
// pull in with `{% include "../_partials/x.md" %}`, never pages themselves.
// A partial's fences are extracted as part of every page that includes it.
//
// The TS readers (page route, raw .md route, search, llms.txt) expand includes
// through lib/docs/includes.ts with the same root (the data directory), so the
// wrappers built here pair with the fences DocsMarkdown sees. Keep the two in
// sync.

import fs from 'node:fs/promises';
import path from 'node:path';
import { resolveIncludes } from '@vaneui/md/include';

import { extractFences } from './extract-fences.mjs';

/**
 * True for a partial's file or directory name.
 *
 * @param {string} name
 */
export function isPartialName(name) {
  return name.startsWith('_');
}

/**
 * Recursively collect the page .md files under `dir` (absolute paths),
 * skipping partials.
 *
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
export async function findPageFiles(dir) {
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
    if (isPartialName(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findPageFiles(full)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push(full);
    }
  }
  return out;
}

/**
 * Expand include tags in a page's source. Throws an IncludeError naming the
 * file and line for a missing, cyclic or out-of-root include.
 *
 * @param {string} source  the page's raw markdown
 * @param {string} filePath  absolute path the source was read from
 * @param {string} dataDir  include root (app/docs/data)
 * @returns {{ source: string, includes: string[] }} expanded text (LF line
 *   endings) and the absolute paths of the included files, each once
 */
export function expandPage(source, filePath, dataDir) {
  /** @type {Set<string>} */
  const includes = new Set();
  const expanded = resolveIncludes(source, {
    filePath,
    root: dataDir,
    onInclude: (file) => includes.add(file),
  });
  return { source: expanded, includes: [...includes] };
}

/**
 * Build a lookup from a fence of an expanded page to where it was written, so
 * a wrapper's `@vane-source` header (and check-examples diagnostics) point at
 * the page or the partial that holds it rather than at a line of the expanded
 * text. Matches kind and body against each file's own fences, page first; the
 * lookup returns null when no file holds the fence verbatim (for example an
 * include indented inside a list item).
 *
 * @param {Array<{ path: string, source: string }>} files  the page, then its includes
 * @returns {(fence: { kind: string, body: string }) => { path: string, line: number } | null}
 */
export function fenceLocator(files) {
  const owned = files.map((file) => ({
    path: file.path,
    fences: extractFences(file.source.replace(/\r\n?/g, '\n')).fences,
  }));
  return (fence) => {
    for (const file of owned) {
      const match = file.fences.find((f) => f.kind === fence.kind && f.body === fence.body);
      if (match) return { path: file.path, line: match.line };
    }
    return null;
  };
}
