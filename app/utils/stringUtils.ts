import type { RenderableTreeNode, Tag } from '@markdoc/markdoc';

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

/**
 * Inline markdown to the text a reader sees: link and image text, code without
 * its backticks, no emphasis marks or escapes. A heading's table-of-contents label
 * and id come from this text, and so does its rendered id (`renderedText`).
 */
export function inlineMarkdownToText(line: string): string {
  return line
    .replace(/\{%[^%]*%\}/g, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/(`+)(.+?)\1/g, '$2')
    .replace(/(\*\*|__)(.+?)\1/g, '$2')
    .replace(/(^|[^\w*])\*(?!\s)([^*]+?)\*(?=[^\w*]|$)/g, '$1$2')
    .replace(/\\([\\`*_{}[\]()#+\-.!|<>])/g, '$1');
}

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const HEADING = /^\s{0,3}(#{1,6})\s+(.*?)(?:\s+#+)?\s*$/;

/** The page's markdown headings in order, for its table of contents. Code fences are skipped. */
export function extractMarkdownHeadings(markdown: string): MarkdownHeading[] {
  if (!markdown) return [];

  const headings: MarkdownHeading[] = [];
  const slug = createHeadingSlugger();
  let fence: string | null = null;

  for (const line of markdown.split('\n')) {
    const fenceMatch = line.match(FENCE);
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null;
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }
    const match = line.match(HEADING);
    if (!match) continue;
    const title = inlineMarkdownToText(match[2]).trim();
    if (!title) continue;
    headings.push({
      title,
      id: slug(title),
      level: match[1].length - 1, // 0-based level (# = 0, ## = 1, etc.)
    });
  }

  return headings;
}

function isTag(node: unknown): node is Tag {
  return typeof node === 'object' && node !== null && (node as { $$mdtype?: unknown }).$$mdtype === 'Tag';
}

/**
 * Text of a rendered Markdoc node. Inline code keeps its text in the `content`
 * attribute and has no children, so it is read from there; otherwise a heading
 * like "Uncontrolled with `defaultOpen`" would lose its code.
 */
export function renderedText(node: RenderableTreeNode | RenderableTreeNode[]): string {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(renderedText).join('');
  if (isTag(node)) {
    if (node.children.length) return renderedText(node.children);
    return typeof node.attributes.content === 'string' ? node.attributes.content : '';
  }
  return '';
}

/**
 * Give each heading in a rendered Markdoc tree an id slugged from its text,
 * unless it already has one, matching the ids `extractMarkdownHeadings` gives
 * the table of contents. Builds a fresh slugger on each call, so running it twice
 * over the same content gives the same ids.
 */
export function addHeadingIds<T extends RenderableTreeNode>(tree: T, name = 'MdHeading'): T {
  const slug = createHeadingSlugger();
  const walk = (node: RenderableTreeNode) => {
    if (Array.isArray(node)) {
      node.forEach(walk);
      return;
    }
    if (!isTag(node)) return;
    if (node.name === name && !node.attributes.id) {
      const text = renderedText(node.children).trim();
      if (text) node.attributes.id = slug(text);
    }
    node.children.forEach(walk);
  };
  walk(tree);
  return tree;
}

export function toHtmlId(title: string): string {
  const base = title
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Ensure it starts with a letter (nicer for CSS selectors)
  return /^[a-z]/.test(base) ? (base || 'x') : `id-${base || 'x'}`;
}
