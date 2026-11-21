/**
 * Schema.org structured data for vaneui.com, built as one JSON-LD `@graph` per page.
 *
 * Every page starts with the site nodes (Organization and WebSite). The home page adds the
 * library (SoftwareSourceCode) and a Product with its free offer, the playground repeats the
 * Product, the docs hub lists its pages, and each docs page is an Article with its
 * breadcrumb. Nodes point at each other by `@id`, so each entity is described once per page.
 *
 * Docs pages use Article, not its TechArticle subtype: AI readiness audits match the Article
 * type exactly and report TechArticle pages as missing it, and search engines treat the two
 * the same.
 */

import { PRODUCT } from '../../app/constants';

export const SITE_URL = 'https://vaneui.com';
const SITE_NAME = PRODUCT.title;
const SITE_DESCRIPTION = PRODUCT.description;
const CONTACT_EMAIL = PRODUCT.email;
const REPOSITORY_URL = 'https://github.com/vaneui/vaneui';
const PACKAGE_URL = 'https://www.npmjs.com/package/@vaneui/ui';
/** The site's social card, also used as the library and product image */
const HOME_IMAGE = `${SITE_URL}/opengraph-image`;

/** Stable node ids: the same entity has the same `@id` on every page */
export const IDS = {
  organization: `${SITE_URL}/#organization`,
  logo: `${SITE_URL}/#logo`,
  website: `${SITE_URL}/#website`,
  software: `${SITE_URL}/#software`,
  product: `${SITE_URL}/#product`,
} as const;

export type JsonLdNode = Record<string, unknown>;
export interface JsonLdGraph {
  '@context': 'https://schema.org';
  '@graph': JsonLdNode[];
}

const ref = (id: string) => ({ '@id': id });

const ORGANIZATION: JsonLdNode = {
  '@type': 'Organization',
  '@id': IDS.organization,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  logo: {
    '@type': 'ImageObject',
    '@id': IDS.logo,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
    caption: SITE_NAME,
  },
  image: ref(IDS.logo),
  email: CONTACT_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: CONTACT_EMAIL,
    contactType: 'customer support',
    availableLanguage: 'en',
  },
  // The organization's own profiles, so engines tie the site to the GitHub org and npm scope
  sameAs: ['https://github.com/vaneui', 'https://www.npmjs.com/org/vaneui'],
};

const WEBSITE: JsonLdNode = {
  '@type': 'WebSite',
  '@id': IDS.website,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: 'en',
  publisher: ref(IDS.organization),
};

/** The library as code: repository, languages, license and the current release */
function softwareNode(version: string): JsonLdNode {
  return {
    '@type': 'SoftwareSourceCode',
    '@id': IDS.software,
    name: SITE_NAME,
    alternateName: '@vaneui/ui',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    codeRepository: REPOSITORY_URL,
    programmingLanguage: ['TypeScript', 'JavaScript'],
    runtimePlatform: 'React',
    license: 'https://opensource.org/licenses/MIT',
    version,
    image: HOME_IMAGE,
    keywords: ['React', 'Tailwind CSS', 'component library', 'UI components', 'TypeScript', 'design system'],
    sameAs: [REPOSITORY_URL, PACKAGE_URL],
    author: ref(IDS.organization),
    publisher: ref(IDS.organization),
  };
}

/** The library as a product: free, installed from npm */
const PRODUCT_NODE: JsonLdNode = {
  '@type': 'Product',
  '@id': IDS.product,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: HOME_IMAGE,
  category: 'React component library',
  brand: { '@type': 'Brand', name: SITE_NAME },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    url: PACKAGE_URL,
  },
};

/** Site nodes first, then the page's own */
function graph(...nodes: JsonLdNode[]): JsonLdGraph {
  return { '@context': 'https://schema.org', '@graph': [ORGANIZATION, WEBSITE, ...nodes] };
}

/** Home page: the site, the library and the product */
export function homeGraph(args: { version: string }): JsonLdGraph {
  return graph(softwareNode(args.version), PRODUCT_NODE);
}

/** Playground: a page for trying the product in the browser */
export function playgroundGraph(args: { name: string; description: string }): JsonLdGraph {
  const url = `${SITE_URL}/playground`;
  return graph(
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: args.name,
      description: args.description,
      inLanguage: 'en',
      isPartOf: ref(IDS.website),
      about: ref(IDS.product),
    },
    PRODUCT_NODE,
  );
}

/** Docs hub: a collection page whose main entity is the list of every docs page */
export function docsIndexGraph(args: {
  name: string;
  description: string;
  pages: { name: string; url: string }[];
}): JsonLdGraph {
  const url = `${SITE_URL}/docs`;
  return graph({
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: 'en',
    isPartOf: ref(IDS.website),
    about: { '@type': 'SoftwareSourceCode', '@id': IDS.software, name: SITE_NAME },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: args.pages.length,
      itemListElement: args.pages.map((page, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: page.name,
        url: page.url,
      })),
    },
  });
}

/**
 * Docs page: the breadcrumb (VaneUI > Documentation > Page; /docs/<category> has no page of
 * its own, so the category is the Article's articleSection instead) and the Article.
 */
export function docsPageGraph(args: {
  category: string;
  slug: string;
  pageName: string;
  description: string;
  articleSection: string;
  /** Absolute URL of the page's social card */
  image: string;
  datePublished?: string;
  dateModified?: string;
}): JsonLdGraph {
  const url = `${SITE_URL}/docs/${args.category}/${args.slug}`;
  return graph(
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Documentation', item: `${SITE_URL}/docs` },
        { '@type': 'ListItem', position: 3, name: args.pageName, item: url },
      ],
    },
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: args.pageName,
      name: args.pageName,
      description: args.description,
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      image: args.image,
      articleSection: args.articleSection,
      ...(args.datePublished ? { datePublished: args.datePublished } : {}),
      ...(args.dateModified ? { dateModified: args.dateModified } : {}),
      author: ref(IDS.organization),
      publisher: ref(IDS.organization),
      inLanguage: 'en',
      isPartOf: ref(IDS.website),
      about: { '@type': 'SoftwareSourceCode', '@id': IDS.software, name: SITE_NAME },
    },
  );
}

/** JSON for a `<script type="application/ld+json">` body: `<` is escaped so text can never close the tag */
export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/**
 * A free tool: a WebApplication that runs in the browser at no cost, with its breadcrumb
 * (VaneUI > Free tools > Tool).
 */
export function toolGraph(args: { path: string; name: string; description: string; category: string }): JsonLdGraph {
  const url = `${SITE_URL}${args.path}`;
  return graph(
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: SITE_NAME, item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Free tools', item: `${SITE_URL}/tools` },
        { '@type': 'ListItem', position: 3, name: args.name, item: url },
      ],
    },
    {
      '@type': 'WebApplication',
      '@id': `${url}#app`,
      name: args.name,
      description: args.description,
      url,
      applicationCategory: 'DeveloperApplication',
      applicationSubCategory: args.category,
      operatingSystem: 'Any (runs in the browser)',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      inLanguage: 'en',
      isPartOf: ref(IDS.website),
      publisher: ref(IDS.organization),
    },
  );
}

/** A hub page (free tools, blocks): a collection page listing its items */
export function collectionGraph(args: {
  path: string;
  name: string;
  description: string;
  items: { name: string; url: string }[];
}): JsonLdGraph {
  const url = `${SITE_URL}${args.path}`;
  return graph({
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: 'en',
    isPartOf: ref(IDS.website),
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: args.items.length,
      itemListElement: args.items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        url: item.url,
      })),
    },
  });
}
