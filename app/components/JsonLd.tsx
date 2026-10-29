import React from 'react';
import { PRODUCT } from '../constants';

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
  email: PRODUCT.email,
  contactPoint: {
    '@type': 'ContactPoint',
    email: PRODUCT.email,
    contactType: 'customer support',
    availableLanguage: 'en',
  },
} as const;

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'VaneUI',
  alternateName: '@vaneui/ui',
  url: 'https://vaneui.com',
  description: PRODUCT.description,
  publisher: ORGANIZATION_SCHEMA,
  inLanguage: 'en',
} as const;

export const SOFTWARE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareSourceCode',
  name: '@vaneui/ui',
  alternateName: 'VaneUI',
  description: PRODUCT.description,
  url: 'https://vaneui.com',
  codeRepository: 'https://github.com/vaneui/vaneui',
  programmingLanguage: ['TypeScript', 'JavaScript'],
  runtimePlatform: 'React',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  license: 'https://opensource.org/licenses/MIT',
  author: ORGANIZATION_SCHEMA,
  keywords: 'react, ui, components, tailwind, tailwindcss, typescript, design system',
} as const;

/**
 * BreadcrumbList for docs pages: VaneUI > Documentation > Page. The category
 * has no page of its own (/docs/<category> is a 404), so it is not a level;
 * the TechArticle's articleSection names it.
 */
export function buildBreadcrumbSchema(args: {
  category: string;
  slug: string;
  pageName: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'VaneUI', item: 'https://vaneui.com' },
      { '@type': 'ListItem', position: 2, name: 'Documentation', item: 'https://vaneui.com/docs' },
      { '@type': 'ListItem', position: 3, name: args.pageName, item: `https://vaneui.com/docs/${args.category}/${args.slug}` },
    ],
  };
}

/** TechArticle schema for docs content (component refs, guides, etc.). */
export function buildTechArticleSchema(args: {
  pageName: string;
  description: string;
  url: string;
  articleSection: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: args.pageName,
    name: args.pageName,
    description: args.description,
    url: args.url,
    articleSection: args.articleSection,
    ...(args.datePublished ? { datePublished: args.datePublished } : {}),
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    author: ORGANIZATION_SCHEMA,
    publisher: ORGANIZATION_SCHEMA,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'VaneUI', url: 'https://vaneui.com' },
  };
}
