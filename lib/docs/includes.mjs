// @ts-check
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { IncludeError, resolveIncludes } from '@vaneui/md/include';

// Expands `{% include "x.md" %}` tags in docs markdown. This is the one include
// helper: every reader of a docs page's raw markdown (the page route and its
// table of contents, the raw .md route, search, llms.txt, the freshness dates)
// and the examples build (scripts/lib/doc-pages.mjs) go through it, so they all
// see the same expanded text. Plain ESM with JSDoc types, so the Next.js code
// and tsx import it as well as plain `node` scripts.
//
// Files and directories whose name starts with `_` (e.g. `_partials/`) are
// partials: shared snippets pages include, never pages themselves.

/**
 * @typedef {object} DocIncludeOptions
 * @property {string} [dataDir] Docs content root. Default: `docsDataDir()`.
 * @property {(absolutePath: string, fromPath: string) => void} [onInclude]
 *   Called with the absolute path of each included file, in document order.
 */

/**
 * The docs content root: includes must resolve inside it, and a leading `/` resolves from it.
 *
 * @param {string} [cwd]
 * @returns {string}
 */
export function docsDataDir(cwd = process.cwd()) {
  return path.join(cwd, 'app', 'docs', 'data');
}

/**
 * True for a partial's file or directory name.
 *
 * @param {string} name
 * @returns {boolean}
 */
export function isPartialName(name) {
  return name.startsWith('_');
}

const MISSING_FILE_CODES = new Set(['ENOENT', 'ENOTDIR', 'EISDIR', 'ENAMETOOLONG']);

/**
 * True for a read error that means "no such docs file", including a path that
 * is a directory, runs through a file or is too long (any URL can name one).
 *
 * @param {unknown} error
 * @returns {boolean}
 */
export function isMissingFileError(error) {
  return typeof error === 'object' && error !== null && 'code' in error
    && MISSING_FILE_CODES.has(String(error.code));
}

/**
 * `file` as messages show it: relative to `base` (the repository root when run
 * from an npm script) with `/` separators, so terminals and editors can open
 * it; absolute when it lies outside `base`.
 *
 * @param {string} file
 * @param {string} [base]
 * @returns {string}
 */
export function displayPath(file, base = process.cwd()) {
  const relative = path.relative(base, file);
  if (relative === '' || relative.startsWith('..') || path.isAbsolute(relative)) return file;
  return relative.split(path.sep).join('/');
}

/**
 * Expand include tags in `source`, read from the docs file `filePath`. Returns
 * LF line endings without a byte order mark. A missing, cyclic or out-of-root
 * include throws an `IncludeError` whose message starts with the tag's
 * location (`app/docs/data/guide/page.md:12: Include "x.md" not found`), so a
 * broken page fails the build instead of rendering an error. The library's own
 * error, with paths relative to the docs root, is its `cause`.
 *
 * @param {string} source
 * @param {string} filePath
 * @param {DocIncludeOptions} [options]
 * @returns {string}
 */
export function expandDocIncludes(source, filePath, options = {}) {
  try {
    return resolveIncludes(source.replace(/^\uFEFF/, ''), {
      filePath,
      root: options.dataDir ?? docsDataDir(),
      onInclude: options.onInclude,
    });
  } catch (error) {
    if (!(error instanceof IncludeError)) throw error;
    const message = error.message.replace(/ \(in [^()]*:\d+\)$/, '');
    throw new IncludeError(`${displayPath(error.from)}:${error.line}: ${message}`, {
      code: error.code,
      target: error.target,
      file: error.file,
      from: error.from,
      line: error.line,
      chain: error.chain,
      cause: error,
    });
  }
}

/**
 * Read a docs file with its includes expanded. Null when the file does not exist.
 *
 * @param {string} filePath
 * @param {DocIncludeOptions} [options]
 * @returns {string | null}
 */
export function readDocMarkdown(filePath, options = {}) {
  let source;
  try {
    source = readFileSync(filePath, 'utf8');
  } catch (error) {
    if (isMissingFileError(error)) return null;
    throw error;
  }
  return expandDocIncludes(source, filePath, options);
}

/**
 * Absolute paths of every file `filePath` includes, nested includes too, each
 * once in first-seen order. Empty when the file does not exist.
 *
 * @param {string} filePath
 * @param {Pick<DocIncludeOptions, 'dataDir'>} [options]
 * @returns {string[]}
 */
export function docIncludes(filePath, options = {}) {
  /** @type {Set<string>} */
  const files = new Set();
  readDocMarkdown(filePath, { ...options, onInclude: (file) => files.add(file) });
  return [...files];
}

/**
 * 1-based lines of the include tags written in `source` itself, not in the
 * files it includes. The library's own parser finds them (so a tag inside a
 * code fence is skipped, as in the expansion): every read fails on purpose and
 * `onError` notes the line of each tag. Nothing is read from disk.
 *
 * @param {string} source
 * @param {string} filePath
 * @param {Pick<DocIncludeOptions, 'dataDir'>} [options]
 * @returns {number[]}
 */
export function includeTagLines(source, filePath, options = {}) {
  /** @type {number[]} */
  const lines = [];
  resolveIncludes(source.replace(/^\uFEFF/, ''), {
    filePath,
    root: options.dataDir ?? docsDataDir(),
    readFile: () => {
      throw Object.assign(new Error('not read'), { code: 'ENOENT' });
    },
    onError: (error) => {
      lines.push(error.line);
      return '';
    },
  });
  return lines;
}
