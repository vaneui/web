import type { Metadata } from 'next';
import { Col, PageTitle, Text } from '@vaneui/ui';
import { BASE_OPEN_GRAPH } from '../constants';
import { JsonLd } from '../components/JsonLd';
import { BlocksShell } from './BlocksShell';
import { BlocksGallery } from './BlocksGallery';
import { blocksIndexGraph } from './structuredData';

const title = 'Responsive React UI Blocks for Tailwind CSS v4 | VaneUI';
const description =
  'Copy-paste React UI blocks built with VaneUI and Tailwind CSS v4: landing page, pricing, sign-in, app shell, settings, inbox, dashboard and data table.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/blocks',
  },
  openGraph: {
    ...BASE_OPEN_GRAPH,
    type: 'website',
    url: '/blocks',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export default function BlocksPage() {
  return (
    <BlocksShell>
      <JsonLd data={blocksIndexGraph({ name: 'VaneUI blocks', description })}/>
      <Col xl wFull>
        <Col>
          <PageTitle>Responsive React UI Blocks</PageTitle>
          <Text lg secondary className="max-w-[60ch]">
            Page sections built from VaneUI components, ready to copy into your project. Preview each one at
            390, 768, 1024 and 1280px, in light and dark.
          </Text>
        </Col>
        <BlocksGallery/>
      </Col>
    </BlocksShell>
  );
}
