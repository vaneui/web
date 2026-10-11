// Docs page discovery and include handling for the examples build.
//
// Pages are the .md files under app/docs/data. Files and directories whose
// name starts with `_` (e.g. `_partials/`) are partials: shared snippets pages
// pull in with `{% include "../_partials/x.md" %}`, never pages themselves.
// A partial's fences are extracted as part of every page that includes it.
//
// Includes are expanded by lib/docs/includes.mjs, the same helper the page
// route, the raw .md route, search and llms.txt use, so the wrappers built here
// pair with the fences DocsMarkdown sees.

import fs from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';

import {
  displayPath,
  expandDocIncludes,
  includeTagLines,
  isPartialName,
} from '../../lib/docs/includes.mjs';
import { fenceKey } from '../../lib/docs/fenceBody.mjs';
import { extractFences, quotedFences } from './extract-fences.mjs';

export { isPartialName };

/**
 * Recursively collect the .md files under `dir` (absolute paths), each marked
 * as a partial when its name or a parent directory's name starts with `_`.
 *
 * @param {string} dir
 * @param {boolean} [inPartial]
 * @returns {Promise<Array<{ file: string, partial: boolean }>>}
 */
async function findMarkdownFiles(dir, inPartial = false) {
  /** @type {Array<{ file: string, partial: boolean }>} */
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
    const partial = inPartial || isPartialName(entry.name);
    if (entry.isDirectory()) {
      out.push(...(await findMarkdownFiles(full, partial)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      out.push({ file: full, partial });
    }
  }
  return out;
}

/**
 * The page .md files under `dir` (absolute paths), skipping partials.
 *
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
export async function findPageFiles(dir) {
  return (await findMarkdownFiles(dir)).filter((f) => !f.partial).map((f) => f.file);
}

/**
 * The partial .md files under `dir` (absolute paths).
 *
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
export async function findPartialFiles(dir) {
  return (await findMarkdownFiles(dir)).filter((f) => f.partial).map((f) => f.file);
}

/**
 * The partials no page includes, directly or through another partial. Their
 * demos never reach a wrapper, so they are never type-checked.
 *
 * @param {string[]} partials  absolute paths, from findPartialFiles
 * @param {Iterable<string>} included  absolute paths of every file the pages include
 * @returns {string[]}
 */
export function unreferencedPartials(partials, included) {
  const seen = new Set(included);
  return partials.filter((file) => !seen.has(file));
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
  const expanded = expandDocIncludes(source, filePath, {
    dataDir,
    onInclude: (file) => includes.add(file),
  });
  return { source: expanded, includes: [...includes] };
}

/**
 * Text as the include expansion sees it: no byte order mark, LF line endings.
 *
 * @param {string} text
 */
function normalizeSource(text) {
  return text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
}

/**
 * A file's text as the include expansion sees it.
 *
 * @param {string} file
 */
function readSource(file) {
  return normalizeSource(readFileSync(file, 'utf8'));
}

/**
 * Throw when an included file has a `tsx setup` fence. The setup of a page
 * comes from its expanded text, so a partial's setup would become the setup of
 * every page that includes it, or be dropped when the page has its own.
 *
 * @param {string[]} files  absolute paths of the included files
 */
export function rejectPartialSetup(files) {
  for (const file of files) {
    const { setupLine } = extractFences(readSource(file));
    if (setupLine !== undefined) {
      throw new Error(
        `${displayPath(file)}:${setupLine}: an included file cannot have a \`tsx setup\` fence. ` +
          'Put the setup in each page that includes it.',
      );
    }
  }
}

/**
 * @typedef {object} FenceOrigin
 * @property {string} path  absolute path of the file that holds the fence
 * @property {number} line  1-based line of the fence's opening in that file
 * @property {number} [includedAt]  for a fence from an included file, the line
 *   of the page's include tag it came through
 */

/**
 * The include tags written in a file (not in the files it includes): each
 * tag's line, the file it includes and the number of lines it expands to.
 * Expanding the tag line on its own gives both.
 *
 * @param {string[]} lines  the file's lines, LF line endings
 * @param {string} filePath  absolute path of the file
 * @param {string} dataDir  include root (app/docs/data)
 * @returns {Array<{ tagLine: number, file: string, length: number }>}
 */
function includeTags(lines, filePath, dataDir) {
  return includeTagLines(lines.join('\n'), filePath, { dataDir }).map((tagLine) => {
    /** @type {string[]} */
    const files = [];
    const text = expandDocIncludes(lines[tagLine - 1], filePath, { dataDir, onInclude: (file) => files.push(file) });
    return { tagLine, file: files[0], length: text === '' ? 0 : text.split('\n').length };
  });
}

/**
 * The blocks of expanded lines the include tags in a page produce, in order:
 * the tag's page line, the file it includes and the expanded lines it fills
 * (`start` to `end`, end exclusive).
 *
 * @param {string[]} lines  the page's lines, LF line endings
 * @param {string} pagePath
 * @param {string} dataDir
 */
function includeBlocks(lines, pagePath, dataDir) {
  const blocks = [];
  let shift = 0; // expanded line minus page line, past the blocks so far
  for (const { tagLine, file, length } of includeTags(lines, pagePath, dataDir)) {
    blocks.push({ tagLine, file, start: tagLine + shift, end: tagLine + shift + length });
    shift += length - 1;
  }
  return blocks;
}

/**
 * The page line of an expanded line outside every include block.
 *
 * @param {Array<{ start: number, end: number }>} blocks  from includeBlocks
 * @param {number} line
 */
function pageLineOf(blocks, line) {
  const before = blocks.filter((b) => b.end <= line);
  return line - before.reduce((sum, b) => sum + (b.end - b.start) - 1, 0);
}

/**
 * What fences are matched by: kind and body, the body normalized as
 * DocsMarkdown pairs fences (`fenceKey`: line endings, leading tabs, common
 * indentation and trailing whitespace), so a fence under an indented include
 * (inside a list item, say) matches the partial it came from.
 *
 * @param {{ kind: string, body: string }} fence
 */
function matchKey(fence) {
  return `${fence.kind}\n${fenceKey(fence.body)}`;
}

/**
 * Where each fence of an expanded page was written, so a wrapper's
 * `@vane-source` header (and so check-examples diagnostics) point at the page
 * or partial that holds it rather than at a line of the expanded text.
 *
 * A fence outside every include maps back to its own page line. A fence inside
 * the text an include tag produced matches the fences that tag brings in (the
 * included file's own and, through its include tags, those of the files it
 * includes), in document order, by kind and body: the Nth identical fence gets
 * the Nth match, so duplicates and a partial included twice each find their
 * own fence. When nothing matches, the fence points at the include tag in the
 * page.
 *
 * @param {{ path: string, source: string }} page  the page file and its raw text
 * @param {Array<{ kind: string, body: string, line: number }>} fences  fences of
 *   the expanded page (from extractFences), in document order
 * @param {string} dataDir  include root (app/docs/data)
 * @returns {FenceOrigin[]}
 */
export function locateFences(page, fences, dataDir) {
  const lines = normalizeSource(page.source).split('\n');
  const blocks = includeBlocks(lines, page.path, dataDir).map((block) => ({ ...block, used: new Map() }));

  /** @type {Map<string, Array<{ path: string, line: number, key: string }>>} */
  const brought = new Map();
  /**
   * The fences `file` brings into a page, in document order: its own, and in
   * place of each of its include tags the fences of the file that tag includes.
   *
   * @param {string} file
   * @param {string[]} stack  files being expanded, so a cycle stops
   * @returns {Array<{ path: string, line: number, key: string }>}
   */
  const fencesBrought = (file, stack) => {
    let list = brought.get(file);
    if (list) return list;
    const source = readSource(file);
    const items = extractFences(source).fences.map((f) => ({
      line: f.line,
      fences: [{ path: file, line: f.line, key: matchKey(f) }],
    }));
    for (const tag of includeTags(source.split('\n'), file, dataDir)) {
      if (!stack.includes(tag.file)) items.push({ line: tag.tagLine, fences: fencesBrought(tag.file, [...stack, tag.file]) });
    }
    list = items.sort((a, b) => a.line - b.line).flatMap((item) => item.fences);
    brought.set(file, list);
    return list;
  };

  return fences.map((fence) => {
    const block = blocks.find((b) => fence.line >= b.start && fence.line < b.end);
    if (!block) return { path: page.path, line: pageLineOf(blocks, fence.line) };
    const key = matchKey(fence);
    const nth = block.used.get(key) ?? 0;
    block.used.set(key, nth + 1);
    const match = fencesBrought(block.file, [page.path, block.file]).filter((f) => f.key === key)[nth];
    return match ? { path: match.path, line: match.line, includedAt: block.tagLine } : { path: page.path, line: block.tagLine };
  });
}

/**
 * Throw when the expanded page has a tsx/jsx demo, hide or setup fence inside a
 * blockquote. Fence extraction skips blockquotes, so such a fence would get no
 * wrapper, type check or live preview, and nothing would say so. The message
 * names the page line: the fence's own, or the include tag that brings it in.
 *
 * @param {{ path: string, source: string }} page  the page file and its raw text
 * @param {string} expanded  the page's text with includes expanded (expandPage)
 * @param {string} dataDir  include root (app/docs/data)
 */
export function rejectQuotedFences(page, expanded, dataDir) {
  const [fence] = quotedFences(expanded);
  if (!fence) return;
  const lines = normalizeSource(page.source).split('\n');
  const blocks = includeBlocks(lines, page.path, dataDir);
  const block = blocks.find((b) => fence.line >= b.start && fence.line < b.end);
  const what = `\`${fence.language} ${fence.flag}\` fence`;
  const why = 'A fence inside a blockquote gets no wrapper, type check or live preview.';
  if (!block) {
    throw new Error(
      `${displayPath(page.path)}:${pageLineOf(blocks, fence.line)}: a ${what} is inside a blockquote. ${why} ` +
        'Move it out of the blockquote.',
    );
  }
  const tagInQuote = /^[ \t]*>/.test(lines[block.tagLine - 1]);
  throw new Error(
    `${displayPath(page.path)}:${block.tagLine}: this include puts a ${what} inside a blockquote. ${why} ` +
      (tagInQuote
        ? 'Include the partial outside the blockquote.'
        : 'Move it, or the include tag that brings it in, out of the blockquote in the included file.'),
  );
}

/**
 * A fence origin for messages: `app/docs/data/_partials/x.md:7 (included at
 * app/docs/data/basic/button.md:12)`.
 *
 * @param {FenceOrigin} origin
 * @param {string} pagePath
 */
export function describeOrigin(origin, pagePath) {
  const at = `${displayPath(origin.path)}:${origin.line}`;
  return origin.includedAt === undefined ? at : `${at} (included at ${displayPath(pagePath)}:${origin.includedAt})`;
}

/**
 * Track wrapper keys (`${slug}-${id}`) across every page. Two fences with the
 * same key would write the same wrapper twice (a partial with an explicit
 * `id="..."` included twice, or sharing an id with its page), so the returned
 * function throws naming the key and both fences.
 *
 * @returns {(key: string, location: string) => void}
 */
export function wrapperKeyChecker() {
  /** @type {Map<string, string>} */
  const seen = new Map();
  return (key, location) => {
    const first = seen.get(key);
    if (first !== undefined) {
      throw new Error(
        `Two demo fences share the wrapper key "${key}": ${first} and ${location}. ` +
          'Give them different id="..." values, or drop the explicit id: an included fence takes its id from ' +
          'the partial, so a partial included twice cannot give its copies different ones.',
      );
    }
    seen.set(key, location);
  };
}
