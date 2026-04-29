// Pure fence extractor for markdown sources used by the docs build pipeline.
// Walks ```tsx / ```jsx fences and classifies each by info-string flags.
//
// Result shape:
//   {
//     setup?: string,                                    // body of first `setup` fence, if any
//     fences: Array<{ id: string, kind: 'demo'|'hide', body: string, line: number }>
//   }
//
// Rules:
//   - Only fences with language `tsx` or `jsx` are considered.
//   - The first fence flagged `setup` is hoisted to `setup` and excluded from `fences[]`.
//     Additional `setup` fences are silently ignored.
//   - `demo` (or no flag at all) -> kind 'demo'.
//   - `hide` -> kind 'hide'.
//   - `id` defaults to the 0-based index in `fences[]`, stringified.
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
 * @returns {{ setup: string | undefined, fences: Array<{ id: string, kind: 'demo'|'hide', body: string, line: number }> }}
 */
export function extractFences(mdSource) {
  const result = { setup: undefined, fences: [] };
  if (!mdSource) return result;

  FENCE_RE.lastIndex = 0;
  let match;
  while ((match = FENCE_RE.exec(mdSource)) !== null) {
    const [, , info, body] = match;
    const { language, flag, id } = parseInfoString(info);

    if (language !== 'tsx' && language !== 'jsx') continue;

    if (flag === 'setup') {
      if (result.setup === undefined) result.setup = body;
      continue;
    }

    const kind = flag === 'hide' ? 'hide' : 'demo';
    const idx = result.fences.length;
    const line = (mdSource.slice(0, match.index).match(/\n/g) || []).length + 1;

    result.fences.push({
      id: id ?? String(idx),
      kind,
      body,
      line,
    });
  }

  return result;
}
