import type { MetadataRoute } from 'next';

// Allow all crawlers (including AI: GPTBot, Claude-User, PerplexityBot,
// Google-Extended) by default. Point them at the auto-generated sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://vaneui.com/sitemap.xml',
    host: 'https://vaneui.com',
  };
}
