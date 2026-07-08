import type { Metadata } from 'next';
import DocsIndex from './DocsIndex';

// This page is a server component so it can own its metadata. The interactive
// grid lives in the DocsIndex client component. Without a dedicated metadata
// export the docs hub inherited the root layout's homepage title, description,
// and canonical ('/') — telling crawlers this page was a duplicate of the
// homepage.
const title = 'Documentation - VaneUI';
const description =
  'Browse VaneUI documentation: components, layout primitives, typography, and theming guides for the React component library powered by Tailwind CSS.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/docs',
  },
  openGraph: {
    type: 'website',
    url: '/docs',
    siteName: 'VaneUI',
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
