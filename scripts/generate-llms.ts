/**
 * Generates /public/llms.txt (compact index, per llmstxt.org) and /public/llms-full.txt
 * (every doc page inlined) from docsSectionsMeta, the page markdown and the installed @vaneui/ui.
 * llms.txt links each page's Markdown version (/docs/<category>/<slug>.md), and llms-full.txt
 * prints every page with the same renderer that serves those files (lib/docs/renderPageMarkdown).
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { ComponentKey } from '@vaneui/ui';
import { PRODUCT } from '../app/constants';
import { docsSectionsMeta, type DocPageMeta, type DocSectionMeta } from '../app/docs/docsMetadata';
import { getPropTableRows } from '../app/docs/propTableRows';
import { docsMarkdownUrl, SITE_URL } from '../lib/docs/markdownUrls';
import { readPageMarkdown as readPageMarkdownFrom } from '../lib/docs/pageMarkdown';
import { PACKAGE_NAME, renderPageMarkdown } from '../lib/docs/renderPageMarkdown';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUTPUT_INDEX = resolve(ROOT, 'public/llms.txt');
const OUTPUT_FULL = resolve(ROOT, 'public/llms-full.txt');
const BASE_URL = SITE_URL;
// Pages llms.txt lists under `## Optional`, which agents may skip when context is short
const OPTIONAL_PAGES = new Set(['reference/changelog']);
const isOptional = (section: DocSectionMeta, page: DocPageMeta) => OPTIONAL_PAGES.has(`${section.slug}/${page.slug}`);

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

> VaneUI is a React component library built on Tailwind CSS v4 with a boolean props API: write \`<Button primary lg filled>\` instead of variant strings.
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
- Markdown for every docs page: add \`.md\` to its URL (${docsMarkdownUrl('basic-components', 'button')}), or request the page with \`Accept: text/markdown\`
- MCP server for AI agents (docs and per-component props): \`claude mcp add vaneui -- npx -y @vaneui/mcp\`
- Contact: ${PRODUCT.email}

Defaults keep JSX short: Button is ${coreDefaults('button')}; Card is ${coreDefaults('card')}; Text is ${coreDefaults('text')}; Row is ${coreDefaults('row')}.

Button, IconButton, Badge, Chip, Code, Card, Row, Col, Stack, NavLink, MenuItem, Text, Title,
SectionTitle and PageTitle render an \`<a>\` when given \`href\`; Link always does. Button,
IconButton, NavLink, MenuItem, Link and the form controls show a keyboard focus-visible outline
by default. Badge, Code, Card, Row, Col and Stack add it when given \`href\`, and Chip also when
it has \`onClick\` or \`tag="button"\`. \`noFocusVisible\` opts out.
`;

const FULL_INTRO = `# VaneUI Documentation

> Complete documentation for the VaneUI React component library (\`${PACKAGE_NAME}\` ${pkg.version}),
> every doc page concatenated into one file. Each page starts with \`# <page name>\`, its URL and
> one import line for the \`${PACKAGE_NAME}\` exports its examples use. Component pages end with
> their props, grouped by category with defaults marked, generated from the installed package.

- Repository: https://github.com/vaneui/vaneui
- Documentation: ${BASE_URL}
- Package: \`${PACKAGE_NAME}\` ${pkg.version}
- Index: ${BASE_URL}/llms.txt
- Contact: ${PRODUCT.email}

Pages follow the site navigation: ${docsSectionsMeta.map((s) => s.name).join(', ')}.
Each page is also available on its own as Markdown at its URL plus \`.md\`.
`;

const readPageMarkdown = (section: DocSectionMeta, page: DocPageMeta) => readPageMarkdownFrom(ROOT, section, page);

/** Compact TOC entry linking the page's Markdown version: `- [Title](url.md): description` */
function tocEntry(section: DocSectionMeta, page: DocPageMeta): string {
  return `- [${page.name}](${docsMarkdownUrl(section.slug, page.slug)}): ${page.description}`;
}

function generateCompact(): string {
  const lines: string[] = [COMPACT_INTRO.trimEnd(), ''];
  const optional: string[] = [];
  for (const section of docsSectionsMeta) {
    const pages = section.pages.filter((page) => !isOptional(section, page));
    optional.push(...section.pages.filter((page) => isOptional(section, page)).map((page) => tocEntry(section, page)));
    if (pages.length === 0) continue;
    lines.push(`## ${section.name}`, '');
    for (const page of pages) {
      lines.push(tocEntry(section, page));
    }
    lines.push('');
  }
  lines.push('## Optional', '', ...optional, `- [All docs in one file](${BASE_URL}/llms-full.txt): every page above concatenated, for bulk ingestion`);
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// Pages print one after another, each under its own `# <page name>`; the props print as one
// line per category to keep the file small (the .md files carry the full props tables).
function generateFull(): string {
  const parts = [FULL_INTRO.trimEnd()];
  for (const section of docsSectionsMeta) {
    for (const page of section.pages) {
      parts.push(renderPageMarkdown(ROOT, section, page, { props: 'list' }).trimEnd());
    }
  }
  return parts.join('\n\n') + '\n';
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
