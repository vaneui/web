/**
 * Generates both /public/llms.txt (compact TOC, per llmstxt.org) and
 * /public/llms-full.txt (full content of every doc page).
 *
 * Source of truth: `docsSectionsMeta` for structure + descriptions, and the
 * per-page markdown bodies at `app/docs/data/<section>/<slug>.md`.
 *
 * llms.txt is intentionally human-readable and AI-friendly:
 *   - Single H1 + summary blockquote (the llmstxt.org canonical shape)
 *   - "About" section with package name, install snippet, key API hook
 *   - Per-section H2 blocks with `- [Title](URL): description` lists
 *   - Reference at the bottom to llms-full.txt
 *
 * llms-full.txt mirrors that structure but inlines each page's actual
 * markdown body (stripped of frontmatter). Component pages, which use
 * `componentKey` instead of `mdPath`, are read directly from
 * `app/docs/data/<section>/<slug>.md` matching the route's behavior.
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { docsSectionsMeta, type DocPageMeta, type DocSectionMeta } from '../app/docs/docsMetadata';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const DATA_DIR = resolve(ROOT, 'app/docs/data');
const OUTPUT_INDEX = resolve(ROOT, 'public/llms.txt');
const OUTPUT_FULL = resolve(ROOT, 'public/llms-full.txt');
const BASE_URL = 'https://vaneui.com';
const PACKAGE_NAME = '@vaneui/ui';

// Hand-curated intro that lands in llms.txt right after the summary.
// Updated alongside major API changes so AI clients have an at-a-glance
// orientation without having to crawl every page first.
const ABOUT_BLOCK = `## About

VaneUI is a React component library that uses a **boolean props API**: instead of
\`<Button appearance="primary" size="lg" variant="filled">\` you write
\`<Button primary lg filled>\`. Props are organized into mutually exclusive
categories (size, appearance, variant, shape, padding, etc.); only one value
per category is active at a time.

- Package: \`${PACKAGE_NAME}\`
- Install: \`npm install ${PACKAGE_NAME}\`
- Peer deps: \`react ^16.8\` and \`tailwindcss ^4\`
- Status: 0.9.0 alpha (published under \`@alpha\` dist-tag; \`@latest\` is older)

Every component supports the same boolean prop categories where they apply.
Components default to sensible values (Button is \`sm\` + \`primary\` + \`outline\`;
Card is \`md\` + \`primary\` + \`outline\` + \`rounded\`; Typography defaults to
\`inherit\` appearance and \`md\` size; Row/Col/Stack default to \`md\` + \`outline\`)
so most JSX is brief.

Components that render an \`<a>\` when given \`href\` include: Button, IconButton,
Badge, Card, Chip, Code, Row, Col, Stack, Link, NavLink. All of these
auto-render a keyboard focus-visible outline in their interactive form
(always-on for NavLink, MenuItem, Link; conditional on \`href\` for the others;
opt out with \`noFocusVisible\`).

For complete documentation of every page in a single document, see
[\`llms-full.txt\`](${BASE_URL}/llms-full.txt).
`;

const FULL_INTRO = `# VaneUI Documentation

> Complete documentation for the VaneUI React component library (\`${PACKAGE_NAME}\`, v0.9.0). This file
> contains the full text of every doc page concatenated, so a single ingestion
> step gives an LLM the entire documentation set.

- Repository: https://github.com/vaneui/vaneui
- Documentation: https://vaneui.com
- Package: \`${PACKAGE_NAME}\`

The first sections below cover orientation (Getting Started) and theme
customization. After those, every component has its own page with examples,
props, and conventions.
`;

const COMPACT_INTRO = `# VaneUI

> React component library powered by Tailwind CSS v4. Boolean-props API,
> mutually-exclusive prop categories, ThemeProvider for global defaults and
> overrides, native focus-visible outline on interactive components.

- Package: \`${PACKAGE_NAME}\`
- Repository: https://github.com/vaneui/vaneui
- Documentation: https://vaneui.com
- llms-full.txt: ${BASE_URL}/llms-full.txt
`;

/** Strip leading YAML frontmatter (between leading `---` markers) from a doc body. */
function stripFrontmatter(md: string): string {
  if (!md.startsWith('---')) return md;
  const closeIdx = md.indexOf('\n---', 3);
  if (closeIdx === -1) return md;
  const after = md.slice(closeIdx + 4);
  // Trim only a single leading newline so visible body content stays put.
  return after.startsWith('\n') ? after.slice(1) : after;
}

/** Read the markdown body for a page, or null if no source file exists. */
function readPageMarkdown(section: DocSectionMeta, page: DocPageMeta): string | null {
  // Two conventions live side by side:
  //   1) Component pages: file is at app/docs/data/<section>/<slug>.md
  //   2) Guide pages: file is at app/docs/data/<section>/<mdPath>
  // Try componentKey-style first (matches the route's preference), then
  // mdPath, then give up.
  const candidates = [
    resolve(DATA_DIR, section.slug, `${page.slug}.md`),
    ...(page.mdPath ? [resolve(DATA_DIR, section.slug, page.mdPath)] : []),
  ];
  for (const path of candidates) {
    try {
      return readFileSync(path, 'utf-8');
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

/** Full entry: divider header + full markdown body (or fallback description). */
function fullEntry(section: DocSectionMeta, page: DocPageMeta): string[] {
  const out: string[] = [];
  out.push('---');
  out.push(`Title: ${page.name}`);
  out.push(`URL: ${pageUrl(section, page)}`);
  out.push('---');
  out.push('');
  const md = readPageMarkdown(section, page);
  if (md) {
    out.push(stripFrontmatter(md).trim());
  } else {
    // Should rarely happen now that the read tries both conventions, but
    // fall back to the curated description so we never emit a blank page.
    out.push(page.description);
    out.push('');
    out.push('For full interactive examples and props documentation, visit the URL above.');
  }
  return out;
}

function generateCompact(): string {
  const lines: string[] = [];
  lines.push(COMPACT_INTRO.trimEnd());
  lines.push('');
  lines.push(ABOUT_BLOCK.trimEnd());
  lines.push('');
  lines.push('## Docs');
  lines.push('');
  for (const section of docsSectionsMeta) {
    lines.push(`### ${section.name}`);
    for (const page of section.pages) {
      lines.push(tocEntry(section, page));
    }
    lines.push('');
  }
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

function generateFull(): string {
  const lines: string[] = [];
  lines.push(FULL_INTRO.trimEnd());
  lines.push('');
  for (const section of docsSectionsMeta) {
    lines.push(`## ${section.name}`);
    lines.push('');
    lines.push(section.description);
    lines.push('');
    for (const page of section.pages) {
      for (const line of fullEntry(section, page)) {
        lines.push(line);
      }
      lines.push('');
    }
  }
  return lines.join('\n').replace(/\n{4,}/g, '\n\n\n').trimEnd() + '\n';
}

const indexOutput = generateCompact();
const fullOutput = generateFull();

writeFileSync(OUTPUT_INDEX, indexOutput, 'utf-8');
writeFileSync(OUTPUT_FULL, fullOutput, 'utf-8');

// Report what landed.
const totalPages = docsSectionsMeta.reduce((sum, s) => sum + s.pages.length, 0);
let pagesWithBody = 0;
for (const section of docsSectionsMeta) {
  for (const page of section.pages) {
    if (readPageMarkdown(section, page)) pagesWithBody += 1;
  }
}
const stubPages = totalPages - pagesWithBody;
console.log(`Generated llms.txt: ${totalPages} TOC entries (${indexOutput.length.toLocaleString()} bytes)`);
console.log(`Generated llms-full.txt: ${pagesWithBody}/${totalPages} pages with full markdown content (${fullOutput.length.toLocaleString()} bytes)`);
if (stubPages > 0) {
  console.log(`Note: ${stubPages} pages have no source .md file; they fall back to description only.`);
}
console.log(`Output: ${OUTPUT_INDEX}`);
console.log(`Output: ${OUTPUT_FULL}`);
