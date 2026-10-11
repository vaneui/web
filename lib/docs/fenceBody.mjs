// @ts-check

// Fence body normalization shared by the page route (DocsMarkdown.tsx pairs
// each fence Markdoc renders with its extractor entry by `fenceKey`), both
// fence extractors (lib/docs/extractFences.ts, scripts/lib/extract-fences.mjs)
// and the examples build's fence locator (scripts/lib/doc-pages.mjs). Plain
// ESM with JSDoc types, so the client bundle, `tsx` and plain `node` scripts
// all import it.

/** Tab stop for leading tabs, as `@vaneui/md/include` and CommonMark use. */
const TAB_STOP = 4;

/**
 * `line` with the tabs in its leading whitespace expanded to spaces (tab stop
 * 4, counted from the start of `line`).
 *
 * @param {string} line
 * @returns {string}
 */
export function expandLeadingTabs(line) {
  let column = 0;
  let index = 0;
  for (; index < line.length; index++) {
    if (line[index] === ' ') column++;
    else if (line[index] === '\t') column += TAB_STOP - (column % TAB_STOP);
    else break;
  }
  return line.slice(0, index).includes('\t') ? ' '.repeat(column) + line.slice(index) : line;
}

/**
 * The column at which `line`'s first non-blank character starts, with tabs
 * advancing to the next multiple of 4.
 *
 * @param {string} line
 * @returns {number}
 */
function indentWidth(line) {
  let column = 0;
  for (const char of line) {
    if (char === ' ') column++;
    else if (char === '\t') column += TAB_STOP - (column % TAB_STOP);
    else break;
  }
  return column;
}

/**
 * `line` with its first `columns` columns of indentation removed the way
 * markdown-it strips a container's indentation from fence content: whitespace
 * is consumed up to that column, a tab that straddles it leaves the rest of
 * its width as spaces, and later tabs stay as written.
 *
 * @param {string} line
 * @param {number} columns
 * @returns {string}
 */
function stripColumns(line, columns) {
  let column = 0;
  let index = 0;
  for (; index < line.length && column < columns; index++) {
    if (line[index] === ' ') column++;
    else if (line[index] === '\t') column += TAB_STOP - (column % TAB_STOP);
    else break;
  }
  return ' '.repeat(Math.max(0, column - columns)) + line.slice(index);
}

/**
 * `text` with the indentation common to its non-blank lines removed, then the
 * leading tabs that remain expanded. Whitespace-only lines become empty.
 *
 * Markdoc strips the indentation of the container a fence sits in (a list
 * item, or an include tag indented under one) from the fence's content and
 * keeps the tabs after it, so the extractors dedent a fence body the same way
 * and `fenceKey` expands the tabs on both sides. `@vaneui/md/include` keeps
 * the tabs in an included fence and prefixes the include tag's indentation,
 * so `   \t<A/>` under `1. ` reads as `\t<A/>` in Markdoc and here alike.
 *
 * @param {string} text
 * @returns {string}
 */
export function dedent(text) {
  const lines = text.split('\n').map((line) => (/^[ \t]*$/.test(line) ? '' : line));
  const indents = lines.filter((line) => line !== '').map(indentWidth);
  const cut = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => expandLeadingTabs(stripColumns(line, cut))).join('\n');
}

/**
 * The key DocsMarkdown pairs fences by, applied to Markdoc's fence `content`
 * and to the extractor's `body` alike, so a fence pairs whatever container
 * indentation either side kept.
 *
 * CRLF is folded first: Markdoc normalizes line endings but the extractor may
 * read a raw file, so on a Windows checkout every key would otherwise differ by
 * its `\r` and lose every live preview. Trailing whitespace is trimmed last:
 * Markdoc's content always ends with `\n` (markdown-it's `getLines`), while
 * the extractors stop before the closing fence's newline.
 *
 * @param {string} body
 * @returns {string}
 */
export function fenceKey(body) {
  return dedent(body.replace(/\r\n?/g, '\n')).replace(/\s+$/, '');
}
