import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { docIncludes } from './includes.mjs';

// Shared date helpers for docs pages. Used by the sitemap (lastModified) and
// the [slug] route (TechArticle datePublished/dateModified + OG article times).
// The modified date also covers the files a page includes. Runs at build time
// during static generation.
//
// A date is a real commit date or nothing. In a shallow clone (Vercel clones
// shallow by default) `git log` reports the boundary commit's date for every
// file older than it, so while the history is shallow every git date is left
// out instead of shipping a wrong one. `npm run build` first tries to fetch the
// full history (ensureFullHistory, run by scripts/git-history.ts in prebuild).

/** Runs git with the given arguments and returns its stdout lines, or [] when git fails */
export type GitRunner = (args: string[], options?: { timeout?: number }) => string[];

const runGit: GitRunner = (args, options) => {
  try {
    const out = execFileSync('git', args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: options?.timeout,
      // a fetch that needs credentials fails instead of waiting on a prompt
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
    }).trim();
    return out ? out.split('\n').filter(Boolean) : [];
  } catch {
    return [];
  }
};

function isShallowRepository(git: GitRunner): boolean {
  return git(['rev-parse', '--is-shallow-repository'])[0] === 'true';
}

// The repo is public, so the fallback fetch needs no credentials
const PUBLIC_REMOTE = 'https://github.com/vaneui/web.git';
const FETCH_TIMEOUT_MS = 60_000;

/**
 * Fetches the full git history when the checkout is shallow, trying the
 * clone's origin and then the public repo. Never throws: when both fetches
 * fail, the build goes on and the page dates are left out.
 */
export function ensureFullHistory(git: GitRunner = runGit): 'full' | 'unshallowed' | 'shallow' {
  if (!isShallowRepository(git)) return 'full';
  for (const remote of ['origin', PUBLIC_REMOTE]) {
    git(['fetch', '--quiet', '--unshallow', '--no-tags', remote], { timeout: FETCH_TIMEOUT_MS });
    if (!isShallowRepository(git)) return 'unshallowed';
  }
  return 'shallow';
}

/**
 * The latest `dateOf(file)` among a docs page file and every file it includes,
 * skipping files without a date. lastModifiedDate passes git commit dates;
 * tests pass a stub.
 */
export function modifiedDateWithIncludes(
  filePath: string,
  dateOf: (file: string) => Date | undefined,
  dataDir?: string,
): Date | undefined {
  const dates = [filePath, ...docIncludes(filePath, { dataDir })]
    .map(dateOf)
    .filter((date): date is Date => date !== undefined);
  if (dates.length === 0) return undefined;
  return dates.reduce((latest, date) => (date.getTime() > latest.getTime() ? date : latest));
}

/** Git date lookups over one runner, memoized per file so a build process runs git once per question */
export function createGitDates(git: GitRunner = runGit) {
  const cache = new Map<string, Date | undefined>();
  let shallow: boolean | undefined;

  function memo(key: string, compute: () => Date | undefined): Date | undefined {
    if (!cache.has(key)) cache.set(key, compute());
    return cache.get(key);
  }

  /** The commit dates git prints for `args`, or [] while the history is shallow */
  function commitDates(args: string[]): Date[] {
    shallow ??= isShallowRepository(git);
    if (shallow) return [];
    return git(args).map(line => new Date(line)).filter(date => !Number.isNaN(date.getTime()));
  }

  /** Last commit date for a file, so freshness reflects real content changes */
  function lastGitDate(filePath: string): Date | undefined {
    return memo(`last:${filePath}`, () => commitDates(['log', '-1', '--format=%cI', '--', filePath])[0]);
  }

  /**
   * First commit date for a file (when the doc was created), following renames
   * so the .md-first migration does not reset every page's creation date.
   */
  function firstGitDate(filePath: string): Date | undefined {
    return memo(`first:${filePath}`, () => commitDates(['log', '--follow', '--format=%cI', '--', filePath]).at(-1));
  }

  /**
   * Last modified date of a docs page: the latest commit date among the page
   * file and the files it includes, so editing a shared partial refreshes each
   * page that pulls it in.
   */
  function lastModifiedDate(filePath: string): Date | undefined {
    return memo(`modified:${filePath}`, () => modifiedDateWithIncludes(filePath, lastGitDate));
  }

  /** Last commit date touching any of the paths (files or directories, relative to the repo root) */
  function lastPathsDate(paths: string[]): Date | undefined {
    return memo(`paths:${paths.join('\n')}`, () => commitDates(['log', '-1', '--format=%cI', '--', ...paths])[0]);
  }

  return { lastGitDate, firstGitDate, lastModifiedDate, lastPathsDate };
}

export const { lastGitDate, firstGitDate, lastModifiedDate, lastPathsDate } = createGitDates();

// Resolve the on-disk markdown file backing a docs page. Mirrors the resolution
// order in the [slug] route: data/<section>/<slug>.md first, then a legacy
// mdPath.
export function docFilePath(sectionSlug: string, pageSlug: string, mdPath?: string): string {
  const base = path.join(process.cwd(), 'app/docs/data', sectionSlug);
  return mdPath ? path.join(base, mdPath) : path.join(base, `${pageSlug}.md`);
}

/**
 * The first and latest release dates in a changelog that puts each date on its
 * own line under the version heading, as `@vaneui/ui`'s CHANGELOG.md does:
 * a line holding only `2026-10-10` in backticks.
 */
export function changelogDates(markdown: string): { first?: Date; last?: Date } {
  const dates = [...markdown.matchAll(/^`(\d{4}-\d{2}-\d{2})`\s*$/gm)]
    .map(match => new Date(`${match[1]}T00:00:00Z`))
    .filter(date => !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());
  return { first: dates[0], last: dates.at(-1) };
}

/** Release dates of a docs page whose markdown is a package's changelog (packageMdPath) */
function packageMdDates(packageMdPath: string): { first?: Date; last?: Date } {
  try {
    return changelogDates(readFileSync(path.join(process.cwd(), 'node_modules', packageMdPath), 'utf8'));
  } catch {
    return {};
  }
}

/**
 * Published and modified dates of a docs page. A page backed by a package's
 * changelog uses its first and latest release dates; any other page uses git.
 * A date is undefined when it is not known.
 */
export function docPageDates(
  sectionSlug: string,
  page: { slug: string; mdPath?: string; packageMdPath?: string },
): { published?: Date; modified?: Date } {
  if (page.packageMdPath) {
    const { first, last } = packageMdDates(page.packageMdPath);
    return { published: first, modified: last };
  }
  const filePath = docFilePath(sectionSlug, page.slug, page.mdPath);
  return { published: firstGitDate(filePath), modified: lastModifiedDate(filePath) };
}
