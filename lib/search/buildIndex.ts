/**
 * Builds the docs search index from docsSectionsMeta, the page markdown and the installed
 * @vaneui/ui props. Runs at build time (app/search-index.json/route.ts); reads the file system.
 */

import type { ComponentKey } from '@vaneui/ui';
import { docsSectionsMeta, type DocPageMeta } from '../../app/docs/docsMetadata';
import { getPropTableRows } from '../../app/docs/propTableRows';
import { createHeadingSlugger, toHtmlId } from '../../app/utils/stringUtils';
import { parseFrontmatter } from '../docs/frontmatter';
import { readPageMarkdown } from '../docs/pageMarkdown';
import type { SearchEntry, SearchIndex } from './types';

export interface MarkdownSection {
  level: number;
  title: string;
  /** Anchor id on the rendered page; empty when the heading has none */
  id: string;
  text: string;
}

/** Inline markdown to plain text: link and image text, code without backticks, no emphasis marks */
export function inlineToText(line: string): string {
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
const TABLE_RULE = /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/;
const THEMATIC_BREAK = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;

/**
 * Split page markdown (frontmatter already removed) into the intro before the first heading and
 * one section per heading. Code fences are skipped. Heading ids come from the same slugger the
 * rendered page uses (DocsMarkdown's headingAnchors), so `#id` links land on the heading.
 */
export function splitMarkdown(md: string): { intro: string; sections: MarkdownSection[] } {
  const slug = createHeadingSlugger();
  const headings: Omit<MarkdownSection, 'text'>[] = [];
  // Body lines before the first heading, then one list per heading
  const bodies: string[][] = [[]];
  let fence: string | null = null;

  for (const line of md.split('\n')) {
    const fenceMatch = line.match(FENCE);
    if (fence) {
      if (fenceMatch && fenceMatch[1][0] === fence[0] && fenceMatch[1].length >= fence.length) fence = null;
      continue;
    }
    if (fenceMatch) {
      fence = fenceMatch[1];
      continue;
    }
    const heading = line.match(HEADING);
    if (heading) {
      const title = inlineToText(heading[2]).trim();
      if (!title) continue;
      // The rendered id is built from the heading's text nodes, which leave out inline code
      // (`## Uncontrolled with \`defaultOpen\`` gets `#uncontrolled-with`); a code-only heading gets none
      const idText = inlineToText(heading[2].replace(/(`+).+?\1/g, ' ')).trim();
      headings.push({ level: heading[1].length, title, id: idText ? slug(idText) : '' });
      bodies.push([]);
      continue;
    }
    if (TABLE_RULE.test(line) || THEMATIC_BREAK.test(line) || /^\s*<!--.*-->\s*$/.test(line)) continue;
    bodies[bodies.length - 1].push(inlineToText(
      line
        .replace(/^\s*>\s?/, '')
        .replace(/^\s*([-*+]|\d+[.)])\s+/, '')
        .replace(/\|/g, ' '),
    ));
  }

  const join = (lines: string[]) => lines.join(' ').replace(/\s+/g, ' ').trim();
  return {
    intro: join(bodies[0]),
    sections: headings.map((h, i) => ({ ...h, text: join(bodies[i + 1]) })),
  };
}

/** Heading trail for each section: its own title after every open ancestor's */
function headingTrails(sections: MarkdownSection[]): string[][] {
  const stack: MarkdownSection[] = [];
  return sections.map((s) => {
    while (stack.length && stack[stack.length - 1].level >= s.level) stack.pop();
    stack.push(s);
    return stack.map((h) => h.title);
  });
}

/** Component keys of every page's props tables */
function documentedComponents(): ComponentKey[] {
  return docsSectionsMeta.flatMap((s) => s.pages.flatMap((p) => [p.componentKey, p.secondaryComponentKey]))
    .filter((k): k is ComponentKey => Boolean(k));
}

/**
 * Props that only some components take (`loading`, `tabletStack`, `textInput`). Size, appearance and
 * variant props are on nearly every component, so listing them would match every props table.
 */
function distinctiveProps(): Set<string> {
  const components = documentedComponents();
  const counts = new Map<string, number>();
  for (const key of components) {
    for (const row of getPropTableRows(key)) {
      if (!row.isCommon) counts.set(row.prop, (counts.get(row.prop) ?? 0) + 1);
    }
  }
  return new Set([...counts].filter(([, n]) => n <= components.length / 4).map(([prop]) => prop));
}

/** The props table section the page renders under its markdown, listing the props that set it apart */
function propsEntry(base: Omit<SearchEntry, 'path' | 'text'>, title: string, key: ComponentKey, distinct: Set<string>): SearchEntry {
  const props = getPropTableRows(key).filter((r) => !r.isCommon && distinct.has(r.prop)).map((r) => r.prop);
  return { ...base, url: `${base.url}#${toHtmlId(title)}`, path: [title], text: props.join(' ') };
}

function pageEntries(root: string, sectionIndex: number, page: DocPageMeta, distinct: Set<string>): SearchEntry[] {
  const section = docsSectionsMeta[sectionIndex];
  const url = `/docs/${section.slug}/${page.slug}`;
  // The changelog repeats "Added" and "Fixed" for every release; rank it under the guides
  const base = { url, page: page.name, section: sectionIndex, ...(page.packageMdPath ? { weight: 0.4 } : {}) };

  const md = readPageMarkdown(root, section, page);
  const { frontmatter, body } = parseFrontmatter(md ?? '');
  const { intro, sections } = splitMarkdown(body);
  const trails = headingTrails(sections);

  const entries: SearchEntry[] = [
    { ...base, path: [], text: [page.description, intro].filter(Boolean).join(' ') },
    ...sections.map((s, i) => ({ ...base, url: s.id ? `${url}#${s.id}` : url, path: trails[i], text: s.text })),
  ];

  const componentKey = page.componentKey ?? (frontmatter.componentKey as ComponentKey | undefined);
  if (componentKey) entries.push(propsEntry(base, `${page.name} Props`, componentKey, distinct));
  if (page.secondaryComponentKey) {
    const name = page.secondaryComponentName ?? page.secondaryComponentKey;
    entries.push(propsEntry(base, `${name} Props`, page.secondaryComponentKey, distinct));
  }
  return entries;
}

/** Every docs page, its headings and its props tables, in sidebar order */
export function buildSearchIndex(root: string): SearchIndex {
  const distinct = distinctiveProps();
  return {
    sections: docsSectionsMeta.map((s, i) => ({ name: s.name, index: String(i + 1).padStart(2, '0') })),
    entries: docsSectionsMeta.flatMap((section, i) => section.pages.flatMap((page) => pageEntries(root, i, page, distinct))),
  };
}
