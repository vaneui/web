import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { DocPageMeta, DocSectionMeta } from '../../app/docs/docsMetadata';
import { expandDocIncludes } from './includes.mjs';

/**
 * Read a docs page's markdown in the route's order: component file, package file, then mdPath.
 * `root` is the repository root. Files under app/docs/data have their includes expanded, as in
 * the route. The page renders its own title, so a package file's leading H1 is dropped, as in
 * the route. Returns null when the page has no markdown source.
 */
export function readPageMarkdown(root: string, section: DocSectionMeta, page: DocPageMeta): string | null {
  const dataDir = resolve(root, 'app/docs/data');
  const candidates = [
    resolve(dataDir, section.slug, `${page.slug}.md`),
    ...(page.packageMdPath ? [resolve(root, 'node_modules', page.packageMdPath)] : []),
    ...(page.mdPath ? [resolve(dataDir, section.slug, page.mdPath)] : []),
  ];
  for (const path of candidates) {
    let md: string;
    try {
      md = readFileSync(path, 'utf-8');
    } catch {
      continue; // try next candidate
    }
    // Outside the try: a broken include must fail loudly, not fall through to the next candidate
    return path.startsWith(dataDir)
      ? expandDocIncludes(md, path, { dataDir })
      : md.replace(/\r\n/g, '\n').replace(/^\s*#\s+.*\n/, '');
  }
  return null;
}
