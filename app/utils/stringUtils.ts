import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";

export interface MarkdownHeading {
  title: string;
  id: string;
  level: number;
}

/**
 * Heading ids must be unique within a page, and repeated heading text is normal:
 * the changelog repeats "Added" and "Fixed" under every version. Returns a
 * stateful slugger that suffixes repeats (`added`, `added-2`, ...). Callers must
 * walk headings in document order, and the markdown body and its table of
 * contents must each use their own fresh slugger so the two agree.
 */
export function createHeadingSlugger(): (title: string) => string {
  const seen = new Map<string, number>();
  return (title: string) => {
    const base = toHtmlId(title);
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
}

export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  if (!markdown) return [];

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: MarkdownHeading[] = [];
  const slug = createHeadingSlugger();
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length - 1; // Convert to 0-based level (# = 0, ## = 1, etc.)
    const title = match[2].trim();
    const id = slug(title);

    headings.push({
      title,
      id,
      level
    });
  }

  return headings;
}

export function toHtmlId(title: string): string {
  const base = title
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Ensure it starts with a letter (nicer for CSS selectors)
  return /^[a-z]/.test(base) ? (base || 'x') : `id-${base || 'x'}`;
}

export function prepareComponentString(node: React.ReactNode): string {
  let nodeString = reactElementToJSXString(node,
    {
      maxInlineAttributesLineLength: 80,
    }
  );
  nodeString = inlineTags(nodeString);
  nodeString = nodeString.replaceAll(`{' '}`, ` `);
  return nodeString;
}

export function inlineTags(input: string): string {
  const lines = input.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Quick check: must be an opening tag on its own line
    if (trimmed.startsWith('<') &&
      !trimmed.startsWith('</') &&
      trimmed.endsWith('>')) {

      // Extract tag name (everything after '<' up to space or '>')
      const tagNameEnd = (() => {
        const spaceIdx = trimmed.indexOf(' ');
        const closeIdx = trimmed.indexOf('>');
        if (spaceIdx !== -1 && spaceIdx < closeIdx) return spaceIdx;
        return closeIdx;
      })();
      const tagName = trimmed.slice(1, tagNameEnd);

      // Peek at next two lines
      const nextLine   = lines[i + 1]?.trim();
      const thirdLine  = lines[i + 2]?.trim();

      // Check that middle is plain text and third is the matching closing tag
      if (
        nextLine     && !nextLine.startsWith('<') &&
        thirdLine    === `</${tagName}>`
      ) {
        // Preserve the original indentation
        const indentMatch = line.match(/^\s*/);
        const indent = indentMatch ? indentMatch[0] : '';

        // Combine into one line
        out.push(`${indent}${trimmed}${nextLine}${thirdLine}`);
        i += 3;
        continue;
      }
    }

    // Fallback: not a match, just copy the line
    out.push(line);
    i += 1;
  }

  return out.join('\n');
}