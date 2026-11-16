// Unit tests for the per-page Schema.org graphs. Run with:
//   npx tsx --test lib/seo/__tests__/structuredData.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  IDS,
  SITE_URL,
  docsIndexGraph,
  docsPageGraph,
  homeGraph,
  playgroundGraph,
  serializeJsonLd,
  type JsonLdGraph,
  type JsonLdNode,
} from '../structuredData';

const home = homeGraph({ version: '9.9.9' });
const playground = playgroundGraph({ name: 'Playground', description: 'Try it.' });
const docsIndex = docsIndexGraph({
  name: 'VaneUI documentation',
  description: 'All docs.',
  pages: [
    { name: 'Button', url: `${SITE_URL}/docs/basic-components/button` },
    { name: 'Card', url: `${SITE_URL}/docs/layout-components/card` },
  ],
});
const docsPage = docsPageGraph({
  category: 'basic-components',
  slug: 'button',
  pageName: 'Button',
  description: 'A button.',
  articleSection: 'Basic Components',
  image: `${SITE_URL}/docs/basic-components/button/opengraph-image/card`,
  datePublished: '2025-01-01T00:00:00.000Z',
  dateModified: '2026-11-01T00:00:00.000Z',
});
const all: [string, JsonLdGraph][] = [
  ['home', home], ['playground', playground], ['docs index', docsIndex], ['docs page', docsPage],
];

const nodesOfType = (g: JsonLdGraph, type: string) => g['@graph'].filter(n => n['@type'] === type);
const only = (g: JsonLdGraph, type: string): JsonLdNode => {
  const nodes = nodesOfType(g, type);
  assert.equal(nodes.length, 1, `expected one ${type} node`);
  return nodes[0];
};

/** Every object anywhere in the value that has an @id */
function idObjects(value: unknown, out: JsonLdNode[] = []): JsonLdNode[] {
  if (Array.isArray(value)) value.forEach(v => idObjects(v, out));
  else if (value && typeof value === 'object') {
    const obj = value as JsonLdNode;
    if (typeof obj['@id'] === 'string') out.push(obj);
    Object.values(obj).forEach(v => idObjects(v, out));
  }
  return out;
}

test('every page starts with the full Organization and the WebSite', () => {
  for (const [name, g] of all) {
    assert.equal(g['@context'], 'https://schema.org', name);
    const org = only(g, 'Organization');
    assert.equal(org['@id'], IDS.organization);
    assert.equal(org.name, 'VaneUI');
    assert.equal(org.url, SITE_URL);
    assert.ok(typeof org.description === 'string' && org.description.length > 0, `${name}: description`);
    assert.deepEqual(org.sameAs, ['https://github.com/vaneui', 'https://www.npmjs.com/org/vaneui']);
    const logo = org.logo as JsonLdNode;
    assert.equal(logo.url, `${SITE_URL}/logo.png`);
    assert.equal(logo.width, 512);
    assert.equal(only(g, 'WebSite')['@id'], IDS.website);
  }
});

test('a reference made of only an @id points at a node of the same graph', () => {
  for (const [name, g] of all) {
    const defined = new Set(g['@graph'].map(n => n['@id']));
    const nested = idObjects(g['@graph']).filter(o => Object.keys(o).length > 1);
    nested.forEach(o => defined.add(o['@id']));
    for (const o of idObjects(g['@graph'])) {
      if (Object.keys(o).length === 1) assert.ok(defined.has(o['@id']), `${name}: dangling ${o['@id']}`);
    }
    const topIds = g['@graph'].map(n => n['@id']);
    assert.equal(new Set(topIds).size, topIds.length, `${name}: duplicate node ids`);
  }
});

test('home describes the library and a free product', () => {
  const software = only(home, 'SoftwareSourceCode');
  assert.equal(software.version, '9.9.9');
  assert.equal(software.codeRepository, 'https://github.com/vaneui/vaneui');
  // Not SoftwareSourceCode properties
  assert.ok(!('applicationCategory' in software));
  assert.ok(!('operatingSystem' in software));

  const product = only(home, 'Product');
  assert.equal(product['@id'], IDS.product);
  const offer = product.offers as JsonLdNode;
  assert.equal(offer['@type'], 'Offer');
  assert.equal(offer.price, '0');
  assert.equal(offer.priceCurrency, 'USD');
});

test('the playground carries the product and a page about it', () => {
  only(playground, 'Product');
  const page = only(playground, 'WebPage');
  assert.deepEqual(page.about, { '@id': IDS.product });
  assert.equal(page.url, `${SITE_URL}/playground`);
});

test('the docs hub lists its pages in order', () => {
  const page = only(docsIndex, 'CollectionPage');
  const list = page.mainEntity as JsonLdNode;
  assert.equal(list['@type'], 'ItemList');
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(list.itemListElement, [
    { '@type': 'ListItem', position: 1, name: 'Button', url: `${SITE_URL}/docs/basic-components/button` },
    { '@type': 'ListItem', position: 2, name: 'Card', url: `${SITE_URL}/docs/layout-components/card` },
  ]);
});

test('a docs page is an Article (not TechArticle) with breadcrumb, image and dates', () => {
  const url = `${SITE_URL}/docs/basic-components/button`;
  assert.equal(nodesOfType(docsPage, 'TechArticle').length, 0);
  const article = only(docsPage, 'Article');
  assert.equal(article['@id'], `${url}#article`);
  assert.equal(article.headline, 'Button');
  assert.equal(article.url, url);
  assert.deepEqual(article.mainEntityOfPage, { '@type': 'WebPage', '@id': url });
  assert.equal(article.image, `${url}/opengraph-image/card`);
  assert.equal(article.datePublished, '2025-01-01T00:00:00.000Z');
  assert.equal(article.dateModified, '2026-11-01T00:00:00.000Z');
  assert.equal(article.articleSection, 'Basic Components');
  assert.deepEqual(article.author, { '@id': IDS.organization });

  const crumbs = only(docsPage, 'BreadcrumbList').itemListElement as JsonLdNode[];
  assert.deepEqual(crumbs.map(c => c.item), [SITE_URL, `${SITE_URL}/docs`, url]);
});

test('unknown dates are left out, never filled in', () => {
  const g = docsPageGraph({
    category: 'c', slug: 's', pageName: 'P', description: 'D', articleSection: 'S', image: `${SITE_URL}/x`,
  });
  const article = only(g, 'Article');
  assert.ok(!('datePublished' in article));
  assert.ok(!('dateModified' in article));
});

test('serialized JSON-LD cannot close its script tag', () => {
  const json = serializeJsonLd(home);
  assert.ok(!json.includes('<'), 'no raw < in the output');
  assert.ok(json.includes('\\u003cButton'), 'the description keeps its <Button> as an escape');
  assert.deepEqual(JSON.parse(json), home);
});
