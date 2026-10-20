const SITE_URL = 'https://vaneui.com';

// A docs page URL. The slug pattern has no dot, so it never matches the `.md` URL.
const DOCS_PAGE = '/docs/:category([a-z0-9-]+)/:slug([a-z0-9-]+)';
// Rendered by app/api/docs/[category]/[slug]/route.ts, once per page at build time
const DOCS_MARKDOWN = '/api/docs/:category/:slug';
// Advertises llms.txt on every response (llmstxt.org)
const LLMS_LINK = '</llms.txt>; rel="describedby"';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Enable Turbopack (Next.js 16 default)
  turbopack: {},
  // Docs taxonomy change: form controls split out of basic-components, NavLink
  // absorbed it (navigation-components dissolved), ListItem merged into List.
  async redirects() {
    return [
      { source: '/docs/basic-components/input', destination: '/docs/form-components/input', permanent: true },
      { source: '/docs/basic-components/checkbox', destination: '/docs/form-components/checkbox', permanent: true },
      { source: '/docs/basic-components/label', destination: '/docs/form-components/label', permanent: true },
      { source: '/docs/navigation-components/navlink', destination: '/docs/basic-components/navlink', permanent: true },
      { source: '/docs/navigation-components', destination: '/docs/basic-components/navlink', permanent: true },
      { source: '/docs/typography-components/list-item', destination: '/docs/typography-components/list', permanent: true },
      { source: '/docs/layout-components/grid2', destination: '/docs/layout-components/grid', permanent: true },
      { source: '/docs/layout-components/grid3', destination: '/docs/layout-components/grid', permanent: true },
      { source: '/docs/layout-components/grid4', destination: '/docs/layout-components/grid', permanent: true },
      { source: '/docs/layout-components/grid5', destination: '/docs/layout-components/grid', permanent: true },
      { source: '/docs/layout-components/grid6', destination: '/docs/layout-components/grid', permanent: true },
    ];
  },
  // Every docs page as Markdown: at its URL plus `.md`, and at the page URL itself
  // for clients that ask for Markdown first (Claude Code, Cursor, Copilot send
  // `Accept: text/markdown, ...`). Browsers never send text/markdown, so they get HTML.
  async rewrites() {
    return {
      beforeFiles: [
        { source: `${DOCS_PAGE}.md`, destination: DOCS_MARKDOWN },
        {
          source: DOCS_PAGE,
          has: [{ type: 'header', key: 'accept', value: '(.*)text/markdown(.*)' }],
          destination: DOCS_MARKDOWN,
        },
      ],
    };
  },
  // For one key, the last matching entry wins, so the Markdown entries repeat the llms.txt link.
  async headers() {
    const canonicalPage = `<${SITE_URL}/docs/:category/:slug>; rel="canonical", ${LLMS_LINK}`;
    return [
      { source: '/:path((?!_next/).*)', headers: [{ key: 'Link', value: LLMS_LINK }] },
      // The page URL answers with HTML or Markdown depending on Accept, so caches must key on it.
      // (`next start` replaces Vary on rendered pages, so there only the Markdown answer carries it.)
      { source: DOCS_PAGE, headers: [{ key: 'Vary', value: 'Accept' }] },
      // The Markdown copies point search engines at the HTML page instead of being noindexed
      { source: `${DOCS_PAGE}.md`, headers: [{ key: 'Link', value: canonicalPage }] },
      { source: `/api${DOCS_PAGE}`, headers: [{ key: 'Link', value: canonicalPage }] },
      { source: '/search-index.json', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
};

export default nextConfig;
