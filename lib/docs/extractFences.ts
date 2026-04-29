// Runtime port of `scripts/lib/extract-fences.mjs`. Kept in lockstep with the
// build-time version — both implementations MUST classify a given markdown
// source identically. The build script runs at compile time to emit per-fence
// wrapper TSX files; the runtime version runs in the browser inside
// DocsMarkdown.tsx to pair every Markdoc-emitted fence with its build-time
// wrapper key (so `<MdFence>` knows whether to render `<LivePreview>`).
//
// See `scripts/lib/extract-fences.mjs` for the rules — keep behavior aligned.

export type FenceKind = 'demo' | 'hide' | 'inline';

export interface ExtractedFence {
  /** Explicit id="..." attribute, or default index for demo/hide; null for inline. */
  id: string | null;
  kind: FenceKind;
  body: string;
  /** 1-based line number of the opening ``` in the source. */
  line: number;
}

export interface ExtractedFences {
  setup: string | undefined;
  fences: ExtractedFence[];
}

const FENCE_RE = /^([ \t]*)```([^\n]*)\n([\s\S]*?)\n[ \t]*```/gm;

interface ParsedInfo {
  language: string;
  flag: 'setup' | 'demo' | 'hide' | undefined;
  id: string | undefined;
}

function parseInfoString(info: string): ParsedInfo {
  const trimmed = info.trim();
  if (!trimmed) return { language: '', flag: undefined, id: undefined };

  const tokens = trimmed.split(/\s+/);
  const language = tokens[0];

  let flag: ParsedInfo['flag'];
  for (const token of tokens.slice(1)) {
    if (token === 'setup' || token === 'demo' || token === 'hide') {
      flag = token;
      break;
    }
  }

  let id: string | undefined;
  const idMatch = trimmed.match(/\bid="([^"]*)"/);
  if (idMatch) id = idMatch[1];

  return { language, flag, id };
}

export function extractFences(mdSource: string): ExtractedFences {
  const result: ExtractedFences = { setup: undefined, fences: [] };
  if (!mdSource) return result;

  FENCE_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
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

    // Untagged tsx/jsx fence — illustrative source. Recorded so runtime
    // renderers can pair Markdoc fence invocations with extractor entries by
    // index, but build-examples.mjs filters these out (no wrapper emitted).
    result.fences.push({
      id: null,
      kind: 'inline',
      body,
      line,
    });
  }

  return result;
}
