// Pure fence extractor for markdown sources used by the docs build pipeline.
// Walks ```tsx / ```jsx fences and classifies each by info-string flags.
//
// Result shape:
//   {
//     setup?: string,                                                          // body of first `setup` fence, if any
//     setupLine?: number,                                                      // its line (build-only, for diagnostics)
//     fences: Array<{ id: string | null, kind: 'demo'|'hide'|'inline', body: string, line: number }>
//   }
//
// Rules:
//   - Only fences with language `tsx` or `jsx` are considered.
//   - The first fence flagged `setup` is hoisted to `setup` and excluded from `fences[]`.
//     Additional `setup` fences are silently ignored.
//   - `demo`   -> kind 'demo'   (extracted, typechecked, rendered live).
//   - `hide`   -> kind 'hide'   (extracted, typechecked, but not rendered in UI).
//   - untagged -> kind 'inline' (illustrative source: NOT extracted into a
//                                 wrapper, NOT live-rendered — but still
//                                 emitted in `fences[]` so runtime renderers
//                                 can pair every Markdoc-emitted fence with
//                                 the matching extractor entry by index).
//   - `id` is the explicit `id="..."` attribute when present; for `demo`/`hide`
//     fences without an explicit id, defaults to the 0-based index in `fences[]`,
//     stringified. For `inline` fences the id is always `null`.
//   - `line` is the 1-based line number of the opening ``` token.
//   - `body` (and `setup`) has the indentation common to its lines removed,
//     leading tabs expanded first (`dedent` in lib/docs/fenceBody.mjs), as
//     Markdoc strips a container's indentation (a list item, or an include tag
//     indented under one) from the fence content it renders.
//   - Fences inside a blockquote (opener prefixed by `>`) are not matched, so
//     they get no wrapper and no live preview. `quotedFences` (build-only, like
//     `setupLine`) lists the tsx/jsx demo, hide and setup ones, which
//     build-examples.mjs rejects.

import { dedent } from '../../lib/docs/fenceBody.mjs';

const FENCE_RE = /^([ \t]*)```([^\n]*)\n([\s\S]*?)\n[ \t]*```/gm;

/**
 * Parse a fence info string into { language, flag, id }.
 * Examples:
 *   "tsx demo id=\"basic\""  -> { language: 'tsx', flag: 'demo', id: 'basic' }
 *   "tsx setup"               -> { language: 'tsx', flag: 'setup', id: undefined }
 *   "tsx"                     -> { language: 'tsx', flag: undefined, id: undefined }
 */
function parseInfoString(info) {
  const trimmed = info.trim();
  if (!trimmed) return { language: '', flag: undefined, id: undefined };

  const tokens = trimmed.split(/\s+/);
  const language = tokens[0];

  let flag;
  for (const token of tokens.slice(1)) {
    if (token === 'setup' || token === 'demo' || token === 'hide') {
      flag = token;
      break;
    }
  }

  let id;
  const idMatch = trimmed.match(/\bid="([^"]*)"/);
  if (idMatch) id = idMatch[1];

  return { language, flag, id };
}

/**
 * @param {string} mdSource
 * @returns {{ setup: string | undefined, setupLine: number | undefined, fences: Array<{ id: string | null, kind: 'demo'|'hide'|'inline', body: string, line: number }> }}
 */
export function extractFences(mdSource) {
  const result = { setup: undefined, setupLine: undefined, fences: [] };
  if (!mdSource) return result;

  FENCE_RE.lastIndex = 0;
  let match;
  // Track the running index of `demo`/`hide` fences so the default id stays
  // stable (matches the file naming used by build-examples.mjs).
  let extractedIdx = 0;
  while ((match = FENCE_RE.exec(mdSource)) !== null) {
    const [, , info, rawBody] = match;
    const { language, flag, id } = parseInfoString(info);

    if (language !== 'tsx' && language !== 'jsx') continue;

    const line = (mdSource.slice(0, match.index).match(/\n/g) || []).length + 1;
    const body = dedent(rawBody);

    if (flag === 'setup') {
      if (result.setup === undefined) {
        result.setup = body;
        result.setupLine = line;
      }
      continue;
    }

    if (flag === 'demo' || flag === 'hide') {
      result.fences.push({
        id: id ?? String(extractedIdx),
        kind: flag,
        body,
        line,
      });
      extractedIdx += 1;
      continue;
    }

    // Untagged tsx/jsx fence (and any unknown flag) — illustrative source code.
    // Recorded in `fences[]` so runtime renderers can pair Markdoc fence
    // invocations with extractor entries by index, but NOT extracted into a
    // wrapper (build-examples.mjs filters by kind).
    result.fences.push({
      id: null,
      kind: 'inline',
      body,
      line,
    });
  }

  return result;
}

/**
 * Container markup before a fence opener: indentation, blockquote markers and
 * list markers (`-`, `*`, `+`, `1.`, `1)`), as `@vaneui/md/include` reads it.
 */
const CONTAINER_PREFIX = /^(?:[ \t]*(?:>|[-*+][ \t]|\d{1,9}[.)][ \t]))*[ \t]*/;

/**
 * `line` without its first `depth` blockquote markers; null when it has fewer.
 *
 * @param {string} line
 * @param {number} depth
 */
function stripQuoteMarkers(line, depth) {
  let index = 0;
  for (let n = 0; n < depth; n += 1) {
    while (line[index] === ' ' || line[index] === '\t') index += 1;
    if (line[index] !== '>') return null;
    index += 1;
  }
  return line.slice(index);
}

/**
 * The tsx/jsx `demo`, `hide` and `setup` fences inside a blockquote: their
 * opener line has `>` markers before the backticks (after any indentation or
 * list markers). extractFences does not match them, so they would silently get
 * no wrapper, type check or live preview. Lines inside other fenced code
 * blocks are code, not fences, and are skipped.
 *
 * @param {string} mdSource
 * @returns {Array<{ line: number, language: string, flag: 'setup'|'demo'|'hide' }>}
 */
export function quotedFences(mdSource) {
  /** @type {Array<{ line: number, language: string, flag: 'setup'|'demo'|'hide' }>} */
  const found = [];
  /** @type {{ char: string, length: number, quotes: number } | null} */
  let open = null;
  const lines = mdSource.split('\n');
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (open) {
      const inner = stripQuoteMarkers(line, open.quotes);
      if (inner !== null) {
        const closing = inner.trim();
        if (closing.length >= open.length && [...closing].every((c) => c === open?.char)) open = null;
        continue;
      }
      // The blockquote the fence opened in has ended, and the fence with it
      open = null;
    }
    const prefix = CONTAINER_PREFIX.exec(line)?.[0] ?? '';
    const opener = /^(`{3,}|~{3,})(.*)$/.exec(line.slice(prefix.length));
    if (!opener || (opener[1][0] === '`' && opener[2].includes('`'))) continue;
    const quotes = (prefix.match(/>/g) || []).length;
    open = { char: opener[1][0], length: opener[1].length, quotes };
    if (quotes === 0) continue;
    const { language, flag } = parseInfoString(opener[2]);
    if ((language === 'tsx' || language === 'jsx') && flag) found.push({ line: i + 1, language, flag });
  }
  return found;
}
