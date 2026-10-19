// URLs of the docs pages and their Markdown versions. Pure (no Node APIs), so
// the client MetaStrip, the Markdown route and the llms.txt generator share it.

/** Public site origin. Markdown links are absolute so AI tools can fetch them. */
export const SITE_URL = 'https://vaneui.com';

/** Site-relative path of a docs page, e.g. `/docs/basic-components/button`. */
export function docsPagePath(category: string, slug: string): string {
  return `/docs/${category}/${slug}`;
}

/** Site-relative path of a docs page's Markdown version: the page path plus `.md`. */
export function docsMarkdownPath(category: string, slug: string): string {
  return `${docsPagePath(category, slug)}.md`;
}

/** Absolute URL of a docs page. */
export function docsPageUrl(category: string, slug: string): string {
  return `${SITE_URL}${docsPagePath(category, slug)}`;
}

/** Absolute URL of a docs page's Markdown version. */
export function docsMarkdownUrl(category: string, slug: string): string {
  return `${SITE_URL}${docsMarkdownPath(category, slug)}`;
}
