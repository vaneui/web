import type { MetadataRoute } from 'next';
import { docsSections } from './docs/docsSections';
import { docFilePath, lastGitDate } from '../lib/docs/gitDate';

const BASE_URL = 'https://vaneui.com';

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
    {
      url: `${BASE_URL}/playground`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
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
