// Pure fence extractor for markdown sources used by the docs build pipeline.
// Walks ```tsx / ```jsx fences and classifies each by info-string flags.
//
// Result shape:
//   {
//     setup?: string,                                                          // body of first `setup` fence, if any
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
 * @returns {{ setup: string | undefined, fences: Array<{ id: string | null, kind: 'demo'|'hide'|'inline', body: string, line: number }> }}
 */
export function extractFences(mdSource) {
  const result = { setup: undefined, fences: [] };
  if (!mdSource) return result;

  FENCE_RE.lastIndex = 0;
  let match;
  // Track the running index of `demo`/`hide` fences so the default id stays
  // stable (matches the file naming used by build-examples.mjs).
  let extractedIdx = 0;
  while ((match = FENCE_RE.exec(mdSource)) !== null) {
    const [, , info, body] = match;
    const { language, flag, id } = parseInfoString(info);

    if (language !== 'tsx' && language !== 'jsx') continue;

    if (flag === 'setup') {
      if (result.setup === undefined) result.setup = body;
      continue;
    }

    const line = (mdSource.slice(0, match.index).match(/\n/g) || []).length + 1;

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
