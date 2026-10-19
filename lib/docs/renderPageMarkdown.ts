import * as VaneUI from '@vaneui/ui';
import type { ComponentKey } from '@vaneui/ui';
import { docsSectionsMeta, type DocPageMeta, type DocSectionMeta } from '../../app/docs/docsMetadata';
import { getPropTableRows, type PropRow } from '../../app/docs/propTableRows';
import { extractFences } from './extractFences';
import { parseFrontmatter } from './frontmatter';
import { docsMarkdownUrl, docsPageUrl } from './markdownUrls';
import { readPageMarkdown } from './pageMarkdown';

// The one Markdown renderer for a docs page: the public `.md` route
// (/docs/<category>/<slug>.md) and llms-full.txt both print pages with it.
// The page body comes from readPageMarkdown, so includes are expanded through
// lib/docs/includes.mjs, and the props come from the data the site's props
// table uses (getPropTableRows).

export const PACKAGE_NAME = '@vaneui/ui';

const COMMON_PROPS_URL = docsMarkdownUrl('reference', 'common-props');

/** Runtime exports of the installed @vaneui/ui. Type-only names never appear here. */
const VANEUI_EXPORTS = new Set(Object.keys(VaneUI));

export interface PageMarkdownOptions {
  /**
   * How the props print. `table` (default) repeats the page's props table with
   * descriptions; `list` is one line per category, for the all-in-one llms-full.txt.
   */
  props?: 'table' | 'list';
}

/** The docs section and page for a URL's category and slug, if the page exists. */
export function findDocsPage(category: string, slug: string): { section: DocSectionMeta; page: DocPageMeta } | undefined {
  const section = docsSectionsMeta.find((s) => s.slug === category);
  const page = section?.pages.find((p) => p.slug === slug);
  return section && page ? { section, page } : undefined;
}

const IMPORT_RE = /import\s+(?:type\s+)?([\w$\s{},*]+?)\s+from\s+['"]([^'"]+)['"]/g;

/** Local names an import clause binds: `A`, `{ B, C as D }`, `* as E`. */
function importedNames(clause: string): string[] {
  return clause
    .replace(/[{}]/g, ',')
    .split(',')
    .map((part) => part.trim().split(/\s+as\s+/).pop()?.replace(/^\*\s*/, '').trim() ?? '')
    .filter((name) => /^[A-Za-z_$][\w$]*$/.test(name) && name !== 'type');
}

/** Names `import { ... } from "@vaneui/ui"` lists, in order. */
function namesInImportPath(importPath: string | undefined): string[] {
  if (!importPath) return [];
  const names: string[] = [];
  for (const [, clause, from] of importPath.matchAll(IMPORT_RE)) {
    if (from === PACKAGE_NAME) names.push(...importedNames(clause));
  }
  return names;
}

/**
 * @vaneui/ui exports a page's code examples use: JSX tags and names imported
 * from the package or its subpaths that are real exports of the package root.
 * A name a fence imports from elsewhere (`import Link from 'next/link'`) or
 * declares itself does not count in that fence.
 */
export function vaneuiNamesInExamples(body: string): string[] {
  const { setup, fences } = extractFences(body);
  const names = new Set<string>();
  for (const code of [setup ?? '', ...fences.map((f) => f.body)]) {
    const local = new Set<string>();
    for (const [, clause, from] of code.matchAll(IMPORT_RE)) {
      const fromVaneUI = from === PACKAGE_NAME || from.startsWith(`${PACKAGE_NAME}/`);
      for (const name of importedNames(clause)) {
        if (fromVaneUI) {
          if (VANEUI_EXPORTS.has(name)) names.add(name);
        } else {
          local.add(name);
        }
      }
    }
    for (const [, name] of code.matchAll(/\b(?:const|let|var|function|class)\s+([A-Z][\w$]*)/g)) local.add(name);
    for (const [, tag] of code.matchAll(/<([A-Z][\w$]*)/g)) {
      if (VANEUI_EXPORTS.has(tag) && !local.has(tag)) names.add(tag);
    }
  }
  return [...names];
}

/**
 * One `import { ... } from "@vaneui/ui"` line for a page: the components its
 * frontmatter `importPath` names first, then the other exports its examples
 * use, alphabetically. Null when there are none.
 */
export function combinedImportLine(importPath: string | undefined, body: string): string | null {
  const primary = namesInImportPath(importPath);
  const others = vaneuiNamesInExamples(body)
    .filter((name) => !primary.includes(name))
    .sort((a, b) => a.localeCompare(b));
  const names = [...primary, ...others];
  return names.length ? `import { ${names.join(', ')} } from "${PACKAGE_NAME}"` : null;
}

/** Escape a table cell: pipes split cells and newlines end the row. */
function cell(text: string): string {
  return text.replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
}

/** Rows grouped by category name, categories sorted as on the page, props in library order. */
function byCategory(rows: PropRow[]): Array<[string, PropRow[]]> {
  const groups = new Map<string, PropRow[]>();
  for (const row of rows) groups.set(row.category, [...(groups.get(row.category) ?? []), row]);
  return [...groups].sort(([a], [b]) => a.localeCompare(b));
}

/**
 * A component's props as a Markdown section, from the rows behind the page's
 * props table. Component-specific props print in full; the layout and utility
 * categories the page folds away are named, with a link to Common Props.
 * Empty when the component has no props.
 */
export function propsMarkdown(heading: string, key: ComponentKey, style: 'table' | 'list' = 'table'): string {
  const rows = getPropTableRows(key);
  const own = byCategory(rows.filter((r) => !r.isCommon));
  const common = byCategory(rows.filter((r) => r.isCommon)).map(([category]) => category);
  if (own.length === 0 && common.length === 0) return '';

  const blocks = [`## ${heading}`];
  if (own.length > 0 && style === 'table') {
    const table = ['| Prop | Category | Default | Description |', '| --- | --- | --- | --- |'];
    for (const [category, props] of own) {
      for (const row of props) {
        table.push(`| \`${row.prop}\` | ${cell(category)} | ${row.isDefault ? 'yes' : ''} | ${cell(row.description)} |`);
      }
    }
    blocks.push(table.join('\n'));
  } else if (own.length > 0) {
    const label = (r: PropRow) => (r.isDefault ? `\`${r.prop}\` (default)` : `\`${r.prop}\``);
    blocks.push(own.map(([category, props]) => `- ${category}: ${props.map(label).join(', ')}`).join('\n'));
  }
  if (common.length > 0) {
    blocks.push(`Layout and utility props (${common.join(', ')}) are listed on [Common Props](${COMMON_PROPS_URL}).`);
  }
  return blocks.join('\n\n');
}

/**
 * A docs page as Markdown: `# Name`, the description, the page URL, one import
 * line for the @vaneui/ui exports the page uses, the body with includes
 * expanded and frontmatter removed, and the props of the page's components.
 * `root` is the repository root.
 */
export function renderPageMarkdown(
  root: string,
  section: DocSectionMeta,
  page: DocPageMeta,
  options: PageMarkdownOptions = {},
): string {
  const md = readPageMarkdown(root, section, page);
  const { frontmatter, body } = parseFrontmatter(md ?? '');
  // Blocks join with one blank line; the body is kept as written, blank lines in code included
  const blocks = [`# ${page.name}`, `> ${page.description}`, `Source: ${docsPageUrl(section.slug, page.slug)}`];

  // A package file (the changelog) has no examples of its own to import for
  const importLine = page.packageMdPath ? null : combinedImportLine(frontmatter.importPath, body);
  if (importLine) blocks.push(`Import: \`${importLine}\``);

  blocks.push(md ? body.trim() : 'For interactive examples, visit the source URL above.');

  const componentKey = page.componentKey ?? (frontmatter.componentKey as ComponentKey | undefined);
  if (componentKey) blocks.push(propsMarkdown('Props', componentKey, options.props));
  if (page.secondaryComponentKey) {
    const name = page.secondaryComponentName ?? page.secondaryComponentKey;
    blocks.push(propsMarkdown(`${name} props`, page.secondaryComponentKey, options.props));
  }
  return blocks.filter(Boolean).join('\n\n') + '\n';
}
