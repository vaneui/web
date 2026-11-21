// Unit tests for the free tool and hub page graphs. Run with:
//   npx tsx --test lib/seo/__tests__/toolGraph.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { IDS, SITE_URL, collectionGraph, serializeJsonLd, toolGraph, type JsonLdNode } from '../structuredData';

const byType = (nodes: JsonLdNode[], type: string) => nodes.find(n => n['@type'] === type);

test('toolGraph describes a free WebApplication with its breadcrumb', () => {
  const g = toolGraph({ path: '/tools/theme-generator', name: 'Theme Generator', description: 'Make a theme.', category: 'Color' });
  const nodes = g['@graph'];
  assert.equal(nodes[0]['@id'], IDS.organization);
  const app = byType(nodes, 'WebApplication');
  assert.ok(app);
  assert.equal(app.url, `${SITE_URL}/tools/theme-generator`);
  assert.equal(app.isAccessibleForFree, true);
  assert.deepEqual(app.offers, { '@type': 'Offer', price: '0', priceCurrency: 'USD' });
  const crumbs = byType(nodes, 'BreadcrumbList')?.itemListElement as { item: string }[];
  assert.deepEqual(crumbs.map(c => c.item), [SITE_URL, `${SITE_URL}/tools`, `${SITE_URL}/tools/theme-generator`]);
  assert.ok(!serializeJsonLd(g).includes('<'));
});

test('collectionGraph lists its items in order', () => {
  const g = collectionGraph({
    path: '/tools',
    name: 'Free tools',
    description: 'Tools.',
    items: [{ name: 'A', url: `${SITE_URL}/a` }, { name: 'B', url: `${SITE_URL}/b` }],
  });
  const page = byType(g['@graph'], 'CollectionPage');
  assert.ok(page);
  const list = page.mainEntity as { numberOfItems: number; itemListElement: { position: number; name: string }[] };
  assert.equal(list.numberOfItems, 2);
  assert.deepEqual(list.itemListElement.map(i => [i.position, i.name]), [[1, 'A'], [2, 'B']]);
});
