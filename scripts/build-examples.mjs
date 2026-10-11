#!/usr/bin/env node
// Orchestrator that composes Tasks 2-5 (extract-fences, extract-identifiers,
// load-symbol-tables, emit-wrapper) into a runnable build step.
//
// Walks app/docs/data/**/*.md, extracts every demo/hide fence, emits a
// per-fence wrapper TSX into app/docs/.generated/examples/, and writes a
// registry barrel that lazy-loads each wrapper via next/dynamic.
//
// Pages have their `{% include %}` tags expanded first (lib/docs/includes.mjs,
// through scripts/lib/doc-pages.mjs), so fences from an included file get
// wrappers keyed by the including page, matching what DocsMarkdown pairs at
// runtime. Partials (`_`-prefixed files and directories) are not pages and are
// skipped; one that no page includes gets a warning, since its demos are never
// type-checked. A `tsx setup` fence in an included file, a tsx/jsx demo, hide
// or setup fence inside a blockquote (fence extraction skips blockquotes) and
// two fences with the same wrapper key fail the build, naming the files and lines.
//
// The .generated/ directory is gitignored — every run wipes and rebuilds it.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { extractFences } from './lib/extract-fences.mjs';
import { extractFreeIdentifiers } from './lib/extract-identifiers.mjs';
import { loadSymbolTables } from './lib/load-symbol-tables.mjs';
import { emitWrapper } from './lib/emit-wrapper.mjs';
import {
  describeOrigin,
  expandPage,
  findPageFiles,
  findPartialFiles,
  locateFences,
  rejectPartialSetup,
  rejectQuotedFences,
  unreferencedPartials,
  wrapperKeyChecker,
} from './lib/doc-pages.mjs';
import { displayPath } from '../lib/docs/includes.mjs';

const __filename = fileURLToPath(import.meta.url);
// scripts/build-examples.mjs -> repo root is one level up.
const REPO_ROOT = path.resolve(__filename, '..', '..');
const DATA_DIR = path.join(REPO_ROOT, 'app', 'docs', 'data');
const OUT_DIR = path.join(REPO_ROOT, 'app', 'docs', '.generated', 'examples');

/**
 * Convert an arbitrary string into a filesystem-safe slug fragment. Keeps
 * alphanumerics, dash, and underscore; collapses everything else into `-`.
 */
function safeSlug(s) {
  return String(s).replace(/[^A-Za-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '');
}

/**
 * Reset the output directory so each run is hermetic.
 */
async function resetOutDir() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await fs.mkdir(OUT_DIR, { recursive: true });
}

async function main() {
  await resetOutDir();

  const symbolTables = loadSymbolTables();
  const mdFiles = await findPageFiles(DATA_DIR);

  /** @type {string[]} */
  const registryKeys = [];
  const claimKey = wrapperKeyChecker();
  /** @type {Set<string>} */
  const included = new Set();
  let wrapperCount = 0;
  let mdWithFences = 0;

  for (const mdAbs of mdFiles) {
    const rawSource = await fs.readFile(mdAbs, 'utf8');
    const { source: mdSource, includes } = expandPage(rawSource, mdAbs, DATA_DIR);
    for (const file of includes) included.add(file);
    // The setup comes from the expanded page, so only the page may hold one.
    rejectPartialSetup(includes);
    // A demo fence in a blockquote (say, from `> {% include %}`) is never extracted.
    rejectQuotedFences({ path: mdAbs, source: rawSource }, mdSource, DATA_DIR);
    const { setup, fences } = extractFences(mdSource);
    if (fences.length === 0) continue;
    mdWithFences += 1;

    const slug = safeSlug(path.basename(mdAbs, '.md'));

    // Inline fences (illustrative-only) are tracked by extractFences for
    // runtime fence-index pairing, but skipped here — only `demo`/`hide` get
    // wrappers and registry entries.
    const extractable = fences.filter((f) => f.kind !== 'inline');
    // Fence lines in the expanded text are off once a page includes a file, so
    // locate each fence in the page or partial that holds it.
    const origins = locateFences({ path: mdAbs, source: rawSource }, extractable, DATA_DIR);

    for (let i = 0; i < extractable.length; i += 1) {
      const fence = extractable[i];
      // Identifiers used in the fence may be DECLARED in the setup block. Run
      // the extractor over the concatenation so setup-declared names don't get
      // mistakenly flagged as free.
      const combined = setup ? `${setup}\n${fence.body}` : fence.body;
      const identifiers = extractFreeIdentifiers(combined);

      const origin = origins[i];
      const fenceId = safeSlug(fence.id);
      const fileSlug = `${slug}-${fenceId}`;
      claimKey(fileSlug, describeOrigin(origin, mdAbs));

      const wrapper = emitWrapper({
        slug,
        idx: i,
        body: fence.body,
        identifiers,
        symbolTables,
        // Forward slashes in the @vane-source header regardless of platform.
        mdSourcePath: path.relative(REPO_ROOT, origin.path).split(path.sep).join('/'),
        mdLine: origin.line,
        setupBody: setup,
      });

      const outPath = path.join(OUT_DIR, `${fileSlug}.tsx`);
      await fs.writeFile(outPath, wrapper, 'utf8');
      registryKeys.push(fileSlug);
      wrapperCount += 1;
    }
  }

  // Stable registry order — sort to keep diffs deterministic.
  registryKeys.sort();
  const registry = renderRegistry(registryKeys);
  await fs.writeFile(path.join(OUT_DIR, 'registry.ts'), registry, 'utf8');

  console.log(`Built ${wrapperCount} wrappers from ${mdWithFences} markdown files`);

  for (const file of unreferencedPartials(await findPartialFiles(DATA_DIR), included)) {
    console.warn(`Warning: ${displayPath(file)} is not included by any page, so its demos are never type-checked.`);
  }
}

/**
 * Render the registry barrel. Static imports — `next/dynamic` was tried first
 * but caused a hydration mismatch: the SSR pass renders the wrapper synchronously
 * while the client's dynamic chunk hasn't loaded yet, so React hydrates to the
 * fallback (just the CodeBlock) and then can't recover. With static imports the
 * wrapper renders identically on server and client. Next.js still code-splits
 * per-route so this doesn't materially inflate any single page bundle.
 *
 * @param {string[]} keys
 */
function renderRegistry(keys) {
  const header =
    "// AUTO-GENERATED by scripts/build-examples.mjs — do not edit.\n" +
    "import type { ComponentType } from 'react';\n";

  if (keys.length === 0) {
    return (
      header +
      "\nexport const examples: Record<string, ComponentType> = {};\n"
    );
  }

  const imports = keys
    .map((k) => `import ${toIdent(k)} from ${JSON.stringify(`./${k}`)};`)
    .join('\n');
  const entries = keys
    .map((k) => `  ${JSON.stringify(k)}: ${toIdent(k)},`)
    .join('\n');
  return (
    header +
    imports +
    '\n\nexport const examples: Record<string, ComponentType> = {\n' +
    entries +
    '\n};\n'
  );
}

/**
 * Convert a registry key like "button-basic-usage" into a valid JS identifier
 * `Example_button_basic_usage` (kebab → underscore, prefixed for clarity).
 *
 * @param {string} key
 */
function toIdent(key) {
  return 'Example_' + key.replace(/[^a-zA-Z0-9_]/g, '_');
}

main().catch((err) => {
  console.error(err && err.stack ? err.stack : err);
  process.exit(1);
});
