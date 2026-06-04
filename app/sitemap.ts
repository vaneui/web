import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { docsSections } from './docs/docsSections';

const BASE_URL = 'https://vaneui.com';

// Resolve the on-disk markdown file backing a docs page so we can read its
// real last-edit date. Mirrors the resolution order in the [slug] route:
// data/<section>/<slug>.md first, then a legacy mdPath.
function docFilePath(sectionSlug: string, pageSlug: string, mdPath?: string): string {
  const base = path.join(process.cwd(), 'app/docs/data', sectionSlug);
  return mdPath ? path.join(base, mdPath) : path.join(base, `${pageSlug}.md`);
}

// Last git commit date for a file, so sitemap lastModified reflects real
// content changes rather than the build timestamp (which would mark every
// page as "changed" on every deploy). Falls back to build time when git
// history is unavailable (e.g. a shallow checkout that predates the file).
function lastGitDate(filePath: string, fallback: Date): Date {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', filePath], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return out ? new Date(out) : fallback;
  } catch {
    return fallback;
  }
}

// Auto-derived from docsSections so new pages appear in the sitemap
// without manual edits.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/docs`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const docPages: MetadataRoute.Sitemap = docsSections.flatMap(section =>
    section.pages.map(page => ({
      url: `${BASE_URL}/docs/${section.slug}/${page.slug}`,
      lastModified: lastGitDate(docFilePath(section.slug, page.slug, page.mdPath), now),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...docPages];
}
