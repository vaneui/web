import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { docIncludes } from './includes';

// Shared git-history helpers for docs pages. Used by the sitemap (lastModified)
// and the [slug] route (TechArticle datePublished/dateModified + OG article
// times). The modified date also covers the files a page includes. Runs at
// build time during static generation; falls back to the build timestamp when
// git history is unavailable (e.g. a shallow checkout).

// Resolve the on-disk markdown file backing a docs page. Mirrors the resolution
// order in the [slug] route: data/<section>/<slug>.md first, then a legacy
// mdPath.
export function docFilePath(sectionSlug: string, pageSlug: string, mdPath?: string): string {
  const base = path.join(process.cwd(), 'app/docs/data', sectionSlug);
  return mdPath ? path.join(base, mdPath) : path.join(base, `${pageSlug}.md`);
}

// Memoize per file+kind so generateMetadata and the page component don't each
// spawn git for the same doc during a single build process.
const dateCache = new Map<string, Date>();

function gitLines(args: string[]): string[] {
  try {
    const out = execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out ? out.split('\n').filter(Boolean) : [];
  } catch {
    return [];
  }
}

// Last commit date for a file, so freshness reflects real content changes
// rather than the build timestamp.
export function lastGitDate(filePath: string, fallback: Date): Date {
  const key = `last:${filePath}`;
  const cached = dateCache.get(key);
  if (cached) return cached;
  const lines = gitLines(['log', '-1', '--format=%cI', '--', filePath]);
  const value = lines[0] ? new Date(lines[0]) : fallback;
  dateCache.set(key, value);
  return value;
}

// First commit date for a file (when the doc was created), following renames so
// the .md-first migration does not reset every page's creation date.
export function firstGitDate(filePath: string, fallback: Date): Date {
  const key = `first:${filePath}`;
  const cached = dateCache.get(key);
  if (cached) return cached;
  const lines = gitLines(['log', '--follow', '--format=%cI', '--', filePath]);
  const oldest = lines[lines.length - 1];
  const value = oldest ? new Date(oldest) : fallback;
  dateCache.set(key, value);
  return value;
}

/**
 * The latest `dateOf(file)` among a docs page file and every file it includes.
 * lastModifiedDate passes git commit dates; tests pass a stub.
 */
export function modifiedDateWithIncludes(
  filePath: string,
  dateOf: (file: string) => Date,
  dataDir?: string,
): Date {
  const dates = [filePath, ...docIncludes(filePath, { dataDir })].map(dateOf);
  return dates.reduce((latest, date) => (date.getTime() > latest.getTime() ? date : latest));
}

// Last modified date of a docs page: the latest commit date among the page file
// and the files it includes, so editing a shared partial refreshes each page
// that pulls it in. A file without history counts as `fallback`, as in
// lastGitDate, whose per-file memo means a partial shared by many pages runs
// git once.
export function lastModifiedDate(filePath: string, fallback: Date): Date {
  const key = `modified:${filePath}`;
  const cached = dateCache.get(key);
  if (cached) return cached;
  const value = modifiedDateWithIncludes(filePath, (file) => lastGitDate(file, fallback));
  dateCache.set(key, value);
  return value;
}
