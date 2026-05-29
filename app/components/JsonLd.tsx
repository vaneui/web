import React from 'react';

interface JsonLdProps {
  data: object | object[];
}

/**
 * Renders a Schema.org structured data block as a JSON-LD script tag.
 *
 * Place inside the document (server-rendered) so search engines and AI
 * crawlers can discover the structured context. Multiple JsonLd blocks
 * per page are fine — each one is independently parsed.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Shared schema constants

export const ORGANIZATION_SCHEMA = {
  '@type': 'Organization',
  name: 'VaneUI',
  url: 'https://vaneui.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://vaneui.com/logo.png',
  },
} as const;

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VaneUI',
  alternateName: '@vaneui/ui',
  url: 'https://vaneui.com',
  description: 'VaneUI is a React component library powered by Tailwind CSS. Designed for building beautiful and responsive user interfaces.',
  publisher: ORGANIZATION_SCHEMA,
  inLanguage: 'en',
} as const;

export const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: '@vaneui/ui',
  alternateName: 'VaneUI',
  description: 'VaneUI is a React component library powered by Tailwind CSS. Boolean props API, comprehensive theming.',
  url: 'https://vaneui.com',
  codeRepository: 'https://github.com/vaneui/vaneui',
  programmingLanguage: ['TypeScript', 'JavaScript'],
  runtimePlatform: 'React',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  license: 'https://opensource.org/licenses/MIT',
  author: ORGANIZATION_SCHEMA,
  keywords: 'react, ui, components, tailwind, tailwindcss, typescript, design system, headless',
} as const;

/** BreadcrumbList for docs pages: VaneUI > Documentation > Category > Page */
export function buildBreadcrumbSchema(args: {
  category: string;
  categoryName: string;
  slug: string;
  pageName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'VaneUI', item: 'https://vaneui.com' },
      { '@type': 'ListItem', position: 2, name: 'Documentation', item: 'https://vaneui.com/docs' },
      { '@type': 'ListItem', position: 3, name: args.categoryName, item: `https://vaneui.com/docs/${args.category}` },
      { '@type': 'ListItem', position: 4, name: args.pageName, item: `https://vaneui.com/docs/${args.category}/${args.slug}` },
    ],
  };
}

/** TechArticle schema for docs content (component refs, guides, etc.). */
export function buildTechArticleSchema(args: {
  pageName: string;
  description: string;
  url: string;
  articleSection: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: args.pageName,
    name: args.pageName,
    description: args.description,
    url: args.url,
    articleSection: args.articleSection,
    author: ORGANIZATION_SCHEMA,
    publisher: ORGANIZATION_SCHEMA,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'VaneUI', url: 'https://vaneui.com' },
  };
}
