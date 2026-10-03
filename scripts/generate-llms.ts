/**
 * Generates /public/llms.txt (compact index, per llmstxt.org) and /public/llms-full.txt
 * (every doc page inlined) from docsSectionsMeta, the page markdown and the installed @vaneui/ui.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ComponentKey } from '@vaneui/ui';
import { docsSectionsMeta, type DocPageMeta, type DocSectionMeta } from '../app/docs/docsMetadata';
import { getPropTableRows } from '../app/docs/propTableRows';
import { parseFrontmatter } from '../lib/docs/frontmatter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const DATA_DIR = resolve(ROOT, 'app/docs/data');
const OUTPUT_INDEX = resolve(ROOT, 'public/llms.txt');
const OUTPUT_FULL = resolve(ROOT, 'public/llms-full.txt');
const BASE_URL = 'https://vaneui.com';
const PACKAGE_NAME = '@vaneui/ui';
const COMMON_PROPS_URL = `${BASE_URL}/docs/reference/common-props`;

// Read from the installed package so version and peer deps follow `npm update`.
const pkg = JSON.parse(
  readFileSync(resolve(ROOT, 'node_modules', PACKAGE_NAME, 'package.json'), 'utf-8'),
) as { version: string; peerDependencies?: Record<string, string> };
const peerDeps = Object.entries(pkg.peerDependencies ?? {})
  .map(([name, range]) => `\`${name} ${range}\``)
  .join(', ');

const CORE_CATEGORIES = new Set(['size', 'appearance', 'variant', 'shape']);

function coreDefaults(key: ComponentKey): string {
  return getPropTableRows(key)
    .filter((r) => r.isDefault && CORE_CATEGORIES.has(r.categoryKey))
    .map((r) => `\`${r.prop}\``)
    .join(' + ');
}

// llms.txt allows no headings between the summary and the H2 file lists.
const COMPACT_INTRO = `# VaneUI

> React component library built on Tailwind CSS v4 with a boolean props API: you write
> \`<Button primary lg filled>\` instead of \`appearance="primary" size="lg" variant="filled"\`.
> Current release: \`${PACKAGE_NAME}\` ${pkg.version}.

Props are grouped into mutually exclusive categories (size, appearance, variant, shape,
padding and more), and only one value per category is active at a time. \`ThemeProvider\`
sets application-wide defaults, extra classes and theme overrides.

- Package: \`${PACKAGE_NAME}\` ${pkg.version} (\`npm install ${PACKAGE_NAME}\`)
- Peer dependencies: ${peerDeps}
- CSS with Tailwind CSS v4: \`@import "tailwindcss"\`, \`@import "@vaneui/ui/tokens"\`, \`@import "@vaneui/ui/vars"\` and \`@source "../node_modules/@vaneui/ui"\`
- CSS without Tailwind: \`@import "@vaneui/ui/css"\`
- Repository: https://github.com/vaneui/vaneui
- Documentation: ${BASE_URL}
- All docs in one file: ${BASE_URL}/llms-full.txt
- MCP server for AI agents (docs and per-component props): \`claude mcp add vaneui -- npx -y @vaneui/mcp\`

Defaults keep JSX short: Button is ${coreDefaults('button')}; Card is ${coreDefaults('card')}; Text is ${coreDefaults('text')}; Row is ${coreDefaults('row')}.

Button, IconButton, Badge, Chip, Code, Card, Row, Col, Stack, NavLink, MenuItem, Text, Title,
SectionTitle and PageTitle render an \`<a>\` when given \`href\`; Link always does. Button,
IconButton, NavLink, MenuItem, Link and the form controls show a keyboard focus-visible outline
by default. Badge, Code, Card, Row, Col and Stack add it when given \`href\`, and Chip also when
it has \`onClick\` or \`tag="button"\`. \`noFocusVisible\` opts out.
`;

const FULL_INTRO = `# VaneUI Documentation

> Complete documentation for the VaneUI React component library (\`${PACKAGE_NAME}\` ${pkg.version}),
> every doc page concatenated into one file. Component pages end with their props, grouped by
> category with defaults marked, generated from the installed package.

- Repository: https://github.com/vaneui/vaneui
- Documentation: ${BASE_URL}
- Package: \`${PACKAGE_NAME}\` ${pkg.version}
- Index: ${BASE_URL}/llms.txt

Sections follow the site navigation: ${docsSectionsMeta.map((s) => s.name).join(', ')}.
`;

/** Read a page's markdown in the route's order: component file, package file, then mdPath. */
function readPageMarkdown(section: DocSectionMeta, page: DocPageMeta): string | null {
  const candidates = [
    resolve(DATA_DIR, section.slug, `${page.slug}.md`),
    ...(page.packageMdPath ? [resolve(ROOT, 'node_modules', page.packageMdPath)] : []),
    ...(page.mdPath ? [resolve(DATA_DIR, section.slug, page.mdPath)] : []),
  ];
  for (const path of candidates) {
    try {
      const md = readFileSync(path, 'utf-8').replace(/\r\n/g, '\n');
      // The page renders its own title, so a package file's leading H1 is dropped (as in the route).
      return path.startsWith(DATA_DIR) ? md : md.replace(/^\s*#\s+.*\n/, '');
    } catch {
      // try next candidate
    }
  }
  return null;
}

function pageUrl(section: DocSectionMeta, page: DocPageMeta): string {
  return `${BASE_URL}/docs/${section.slug}/${page.slug}`;
}

/** Compact TOC entry: `- [Title](url): description` */
function tocEntry(section: DocSectionMeta, page: DocPageMeta): string {
  return `- [${page.name}](${pageUrl(section, page)}): ${page.description}`;
}

/** Component-specific props grouped by category, mirroring the page's props table. */
function propsBlock(title: string, key: ComponentKey): string[] {
  const groups = new Map<string, string[]>();
  for (const row of getPropTableRows(key)) {
    if (row.isCommon) continue;
    const props = groups.get(row.category) ?? [];
    props.push(row.isDefault ? `\`${row.prop}\` (default)` : `\`${row.prop}\``);
    groups.set(row.category, props);
  }
  if (groups.size === 0) return [];
  const lines = ['', `## ${title}`, ''];
  for (const [category, props] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push(`- ${category}: ${props.join(', ')}`);
  }
  lines.push('', `Layout and utility props are listed on [Common Props](${COMMON_PROPS_URL}).`);
  return lines;
}

/** Full entry: divider header + markdown body + generated props (or fallback description). */
function fullEntry(section: DocSectionMeta, page: DocPageMeta): string[] {
  const md = readPageMarkdown(section, page);
  const { frontmatter, body } = parseFrontmatter(md ?? '');
  const out: string[] = ['---', `Title: ${page.name}`, `URL: ${pageUrl(section, page)}`];
  if (frontmatter.importPath) out.push(`Import: ${frontmatter.importPath}`);
  out.push('---', '');
  if (md) {
    out.push(body.trim());
  } else {
    out.push(page.description, '', 'For full interactive examples and props documentation, visit the URL above.');
  }
  if (page.componentKey) out.push(...propsBlock('Props', page.componentKey));
  if (page.secondaryComponentKey) {
    const name = page.secondaryComponentName ?? page.secondaryComponentKey;
    out.push(...propsBlock(`${name} props`, page.secondaryComponentKey));
  }
  return out;
}

function generateCompact(): string {
  const lines: string[] = [COMPACT_INTRO.trimEnd(), ''];
  for (const section of docsSectionsMeta) {
    lines.push(`## ${section.name}`, '');
    for (const page of section.pages) {
      lines.push(tocEntry(section, page));
    }
    lines.push('');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function generateFull(): string {
  const lines: string[] = [FULL_INTRO.trimEnd(), ''];
  for (const section of docsSectionsMeta) {
    lines.push(`## ${section.name}`, '', section.description, '');
    for (const page of section.pages) {
      lines.push(...fullEntry(section, page), '');
    }
  }
  return lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trimEnd() + '\n';
}

const indexOutput = generateCompact();
const fullOutput = generateFull();

writeFileSync(OUTPUT_INDEX, indexOutput, 'utf-8');
writeFileSync(OUTPUT_FULL, fullOutput, 'utf-8');

const totalPages = docsSectionsMeta.reduce((sum, s) => sum + s.pages.length, 0);
let pagesWithBody = 0;
for (const section of docsSectionsMeta) {
  for (const page of section.pages) {
    if (readPageMarkdown(section, page)) pagesWithBody += 1;
  }
}
const stubPages = totalPages - pagesWithBody;
console.log(`Generated llms.txt for ${PACKAGE_NAME} ${pkg.version}: ${totalPages} TOC entries (${indexOutput.length.toLocaleString()} bytes)`);
console.log(`Generated llms-full.txt: ${pagesWithBody}/${totalPages} pages with full markdown content (${fullOutput.length.toLocaleString()} bytes)`);
if (stubPages > 0) {
  console.log(`Note: ${stubPages} pages have no source .md file; they fall back to description only.`);
}
console.log(`Output: ${OUTPUT_INDEX}`);
console.log(`Output: ${OUTPUT_FULL}`);
