// Hand-rolled YAML frontmatter parser. Flat string-only — no nested keys, no
// arrays. If the source starts with `---\n`, lines up to the next `---\n` are
// parsed as `key: value` pairs (whitespace-trimmed values, surrounding single
// or double quotes stripped). Otherwise returns the original source as `body`.

export interface ParsedFrontmatter {
  frontmatter: Record<string, string>;
  body: string;
}

const DELIM = /^---\r?\n/;

export function parseFrontmatter(source: string): ParsedFrontmatter {
  if (!source || !DELIM.test(source)) {
    return { frontmatter: {}, body: source ?? '' };
  }

  // Strip the leading `---\n` (or `---\r\n`).
  const afterOpen = source.replace(DELIM, '');
  // Look for the closing `---\n` on its own line.
  const closeMatch = afterOpen.match(/\r?\n---\r?\n/);
  if (!closeMatch || closeMatch.index === undefined) {
    // No closing delimiter — treat as no frontmatter.
    return { frontmatter: {}, body: source };
  }

  const block = afterOpen.slice(0, closeMatch.index);
  const body = afterOpen.slice(closeMatch.index + closeMatch[0].length);

  const frontmatter: Record<string, string> = {};
  for (const rawLine of block.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    if (!key) continue;
    let value = line.slice(colon + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2)
    ) {
      value = value.slice(1, -1);
    }
    frontmatter[key] = value;
  }

  return { frontmatter, body };
}
