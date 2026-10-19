import type { Metadata } from 'next';
import DocsIndex from './DocsIndex';
import { BASE_OPEN_GRAPH } from '../constants';

// This page is a server component so it can own its metadata. The interactive
// grid lives in the DocsIndex client component. Without a dedicated metadata
// export the docs hub inherited the root layout's homepage title, description,
// and canonical ('/') — telling crawlers this page was a duplicate of the
// homepage.
const title = 'Documentation: React Components for Tailwind CSS v4 | VaneUI';
const description =
  'VaneUI documentation: installation, 40+ React components, layout, typography and theming guides for Tailwind CSS v4, each with live examples and a props table.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: 'website',
    url: '/docs',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function DocsPage() {
  return <DocsIndex />;
}
