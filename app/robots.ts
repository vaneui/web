import type { MetadataRoute } from 'next';

// Allow all crawlers (including AI: GPTBot, Claude-User, PerplexityBot,
// Google-Extended) by default. Point them at the auto-generated sitemap. No
// `host`: it emits a non-standard Host line that Google ignores.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://vaneui.com/sitemap.xml',
  };
}
