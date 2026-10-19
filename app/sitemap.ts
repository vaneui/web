import type { MetadataRoute } from 'next';
import { docsSections } from './docs/docsSections';
import { docPageDates, lastPathsDate } from '../lib/docs/gitDate';

const BASE_URL = 'https://vaneui.com';

/** A sitemap entry with lastModified only when the date is known: no date beats a wrong one */
function entry(url: string, lastModified: Date | undefined): MetadataRoute.Sitemap[number] {
  return lastModified ? { url, lastModified } : { url };
}

// Auto-derived from docsSections so new pages appear in the sitemap without
// manual edits. Each date is the last commit to the files behind the page, never
// the build time. Google ignores changefreq and priority, so they are left out.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    entry(BASE_URL, lastPathsDate(['app/page.tsx', 'app/landing'])),
    entry(`${BASE_URL}/docs`, lastPathsDate(['app/docs/page.tsx', 'app/docs/DocsIndex.tsx', 'app/docs/docsMetadata.ts'])),
    entry(`${BASE_URL}/playground`, lastPathsDate(['app/playground'])),
  ];

  const docPages: MetadataRoute.Sitemap = docsSections.flatMap(section =>
    section.pages.map(page =>
      entry(`${BASE_URL}/docs/${section.slug}/${page.slug}`, docPageDates(section.slug, page).modified)),
  );

  return [...staticPages, ...docPages];
}
