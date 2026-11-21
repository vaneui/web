// Schema.org graphs for the blocks gallery and the block pages, in the shape of
// lib/seo/structuredData.ts: the site nodes first, then the page's own.
import { VERSION } from '../landing/content';
import { homeGraph, IDS, SITE_URL, type JsonLdGraph, type JsonLdNode } from '../../lib/seo/structuredData';
import { BLOCKS, blockHref, type BlockMeta } from './blocks';

// The Organization and WebSite nodes every page carries, taken from the home graph so they stay identical
const SITE_NODES = homeGraph({ version: VERSION })['@graph']
  .filter(node => node['@type'] === 'Organization' || node['@type'] === 'WebSite');

const graph = (...nodes: JsonLdNode[]): JsonLdGraph =>
  ({ '@context': 'https://schema.org', '@graph': [...SITE_NODES, ...nodes] });

const ABOUT = { '@type': 'SoftwareSourceCode', '@id': IDS.software, name: 'VaneUI' };

/** The gallery: a collection page whose main entity is the list of blocks */
export function blocksIndexGraph(args: { name: string; description: string }): JsonLdGraph {
  const url = `${SITE_URL}/blocks`;
  return graph({
    '@type': 'CollectionPage',
    '@id': `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: 'en',
    isPartOf: { '@id': IDS.website },
    about: ABOUT,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: BLOCKS.length,
      itemListElement: BLOCKS.map((block, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: block.name,
        url: `${SITE_URL}${blockHref(block.slug)}`,
      })),
    },
  });
}

/** A block page: the breadcrumb (VaneUI > Blocks > Block) and the page, whose main entity is the block's code */
export function blockPageGraph(block: BlockMeta): JsonLdGraph {
  const url = `${SITE_URL}${blockHref(block.slug)}`;
  return graph(
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'VaneUI', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blocks', item: `${SITE_URL}/blocks` },
        { '@type': 'ListItem', position: 3, name: block.name, item: url },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: block.seoTitle,
      description: block.description,
      inLanguage: 'en',
      isPartOf: { '@id': IDS.website },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntity: {
        '@type': 'SoftwareSourceCode',
        name: `${block.name} block`,
        description: block.description,
        programmingLanguage: 'TypeScript',
        runtimePlatform: 'React',
        license: 'https://opensource.org/licenses/MIT',
        isBasedOn: ABOUT,
      },
    },
  );
}
