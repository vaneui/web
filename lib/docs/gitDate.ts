import { execFileSync } from 'node:child_process';
import path from 'node:path';

// Shared git-history helpers for docs pages. Used by the sitemap (lastModified)
// and the [slug] route (TechArticle datePublished/dateModified + OG article
// times). Runs at build time during static generation; falls back to the build
// timestamp when git history is unavailable (e.g. a shallow checkout).

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
