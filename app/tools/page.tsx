import type { Metadata } from 'next';
import { BASE_OPEN_GRAPH } from '../constants';
import { JsonLd } from '../components/JsonLd';
import { SITE_URL, collectionGraph } from '../../lib/seo/structuredData';
import { ToolsHub } from './ToolsHub';
import { TOOLS, toolHref } from './tools';

const title = 'Free Color and Markdown Tools for UI Developers | VaneUI';
const description =
  'Free browser tools for UI work: an OKLCH theme generator, an OKLCH converter, a light and dark contrast checker and a Markdown editor with JSX export.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/tools' },
  openGraph: { ...BASE_OPEN_GRAPH, type: 'website', url: '/tools', title, description },
  twitter: { card: 'summary_large_image', title, description },
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={collectionGraph({
        path: '/tools',
        name: 'Free tools',
        description,
        items: TOOLS.map(t => ({ name: t.name, url: `${SITE_URL}${toolHref(t.slug)}` })),
      })}/>
      <ToolsHub/>
    </>
  );
}
