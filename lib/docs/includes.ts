import { readFileSync } from 'node:fs';
import path from 'node:path';
import { resolveIncludes } from '@vaneui/md/include';

// Expands `{% include "x.md" %}` tags in docs markdown. Every reader of a docs
// page's raw markdown (the page route and its table of contents, the raw .md
// route, search, llms.txt and the freshness dates) goes through this module,
// so they all see the same expanded text. scripts/lib/doc-pages.mjs does the
// same for the examples build (plain ESM, so it calls @vaneui/md/include
// directly with the same root); keep the two in sync.
//
// Files and directories whose name starts with `_` (e.g. `_partials/`) are
// partials: shared snippets pages include, never pages themselves.

/** The docs content root: includes must resolve inside it, and a leading `/` resolves from it. */
export function docsDataDir(cwd: string = process.cwd()): string {
  return path.join(cwd, 'app', 'docs', 'data');
}

export interface DocIncludeOptions {
  /** Docs content root. Default: `docsDataDir()`. */
  dataDir?: string;
  /** Called with the absolute path of each included file, in document order. */
  onInclude?: (absolutePath: string, fromPath: string) => void;
}

/**
 * Expand include tags in `source`, read from the docs file `filePath`. A missing,
 * cyclic or out-of-root include throws an `IncludeError` whose message names the
 * file and line, so a broken page fails the build instead of rendering an error.
 */
export function expandDocIncludes(source: string, filePath: string, options: DocIncludeOptions = {}): string {
  return resolveIncludes(source, {
    filePath,
    root: options.dataDir ?? docsDataDir(),
    onInclude: options.onInclude,
  });
}

/** Read a docs file with its includes expanded. Null when the file does not exist. */
export function readDocMarkdown(filePath: string, options: DocIncludeOptions = {}): string | null {
  let source: string;
  try {
    source = readFileSync(filePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') return null;
    throw error;
  }
  return expandDocIncludes(source, filePath, options);
}

/**
 * Absolute paths of every file `filePath` includes, nested includes too, each
 * once in first-seen order. Empty when the file does not exist.
 */
export function docIncludes(filePath: string, options: Pick<DocIncludeOptions, 'dataDir'> = {}): string[] {
  const files = new Set<string>();
  readDocMarkdown(filePath, { ...options, onInclude: (file) => files.add(file) });
  return [...files];
}
