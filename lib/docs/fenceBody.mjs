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
 * 4), as `@vaneui/md/include` does when it indents an included line.
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
 * `text` with the indentation common to its non-blank lines removed, after
 * expanding leading tabs. Whitespace-only lines become empty.
 *
 * Markdoc strips the indentation of the container a fence sits in (a list
 * item, or an include tag indented under one) from the fence's content, so
 * the extractors dedent a fence body the same way.
 *
 * @param {string} text
 * @returns {string}
 */
export function dedent(text) {
  const lines = text.split('\n').map((line) => (/^[ \t]*$/.test(line) ? '' : expandLeadingTabs(line)));
  const indents = lines.filter((line) => line !== '').map((line) => /^ */.exec(line)?.[0].length ?? 0);
  const cut = indents.length > 0 ? Math.min(...indents) : 0;
  return lines.map((line) => line.slice(cut)).join('\n');
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
