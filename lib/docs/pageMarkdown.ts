import { readFileSync } from 'fs';
import { resolve } from 'path';
import type { DocPageMeta, DocSectionMeta } from '../../app/docs/docsMetadata';

/**
 * Read a docs page's markdown in the route's order: component file, package file, then mdPath.
 * `root` is the repository root. The page renders its own title, so a package file's leading H1
 * is dropped, as in the route. Returns null when the page has no markdown source.
 */
export function readPageMarkdown(root: string, section: DocSectionMeta, page: DocPageMeta): string | null {
  const dataDir = resolve(root, 'app/docs/data');
  const candidates = [
    resolve(dataDir, section.slug, `${page.slug}.md`),
    ...(page.packageMdPath ? [resolve(root, 'node_modules', page.packageMdPath)] : []),
    ...(page.mdPath ? [resolve(dataDir, section.slug, page.mdPath)] : []),
  ];
  for (const path of candidates) {
    try {
      const md = readFileSync(path, 'utf-8').replace(/\r\n/g, '\n');
      return path.startsWith(dataDir) ? md : md.replace(/^\s*#\s+.*\n/, '');
    } catch {
      // try next candidate
    }
  }
  return null;
}
