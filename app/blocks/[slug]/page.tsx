import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { promises as fs } from 'fs';
import path from 'path';
import { Code, Col, PageTitle, Text, Title } from '@vaneui/ui';
import { BASE_OPEN_GRAPH } from '../../constants';
import { JsonLd } from '../../components/JsonLd';
import { CodeBlock } from '../../components/CodeBlock';
import { Eyebrow } from '../../landing/frame';
import { BLOCKS, blockHref, findBlock } from '../blocks';
import { BlocksShell } from '../BlocksShell';
import { componentDocsHref } from '../componentDocs';
import { blockPageGraph } from '../structuredData';
import { BlockFacts, BlockPager, BlocksBackLink, InlineLink } from './BlockAside';
import { BlockPreview } from './BlockPreview';

interface BlockPageProps {
  params: Promise<{ slug: string }>;
}

// Every block is pre-rendered; any other slug is a 404 without rendering
export const dynamicParams = false;

export function generateStaticParams(): { slug: string }[] {
  return BLOCKS.map(block => ({ slug: block.slug }));
}

// The block's sentence plus the action, within the ~160 characters a search snippet shows
const metaDescription = (description: string) => `${description} Copy the React code.`;

export async function generateMetadata({ params }: BlockPageProps): Promise<Metadata> {
  const { slug } = await params;
  const block = findBlock(slug);
  if (!block) return {};
  const url = blockHref(block.slug);
  const description = metaDescription(block.description);
  // The og:image comes from the co-located opengraph-image route
  return {
    title: block.seoTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      ...BASE_OPEN_GRAPH,
      type: 'website',
      url,
      title: block.seoTitle,
      description,
    },
    twitter: {
      card: 'summary_large_image',
      title: block.seoTitle,
      description,
    },
  };
}

// An event handler in the code means a server component cannot render it as it is
const EVENT_HANDLER = /\son([A-Z]\w*)=\{/;

export default async function BlockPage({ params }: BlockPageProps) {
  const { slug } = await params;
  const block = findBlock(slug);
  if (!block) notFound();

  // Read at build time from the file the preview renders, so the code shown is the code that runs
  const source = await fs.readFile(path.join(process.cwd(), 'app/blocks/library', `${block.slug}.tsx`), 'utf8');
  const handler = source.match(EVENT_HANDLER)?.[0].trim().replace(/=\{$/, '');

  const index = BLOCKS.indexOf(block);
  const prev = BLOCKS[(index - 1 + BLOCKS.length) % BLOCKS.length];
  const next = BLOCKS[(index + 1) % BLOCKS.length];
  const components = block.components.map(name => ({ name, href: componentDocsHref(name) }));

  return (
    <BlocksShell>
      <JsonLd data={blockPageGraph(block)}/>
      <Col xl wFull>
        <Col>
          <BlocksBackLink/>
          <Eyebrow index={String(index + 1).padStart(2, '0')}>{block.category}</Eyebrow>
          <PageTitle>{block.name}</PageTitle>
          <Text secondary className="max-w-[70ch]">{block.description}</Text>
        </Col>

        <BlockPreview slug={block.slug} name={block.name}/>

        <Col>
          <Col sm>
            <Title tag="h2">Copy the code</Title>
            <Text sm tertiary>
              One file with one component and its sample data. It needs <Code>@vaneui/ui</Code> and its stylesheet,
              set up as in the <InlineLink href="/docs/getting-started/installation">installation guide</InlineLink>.
              {handler && <> It passes an <Code>{handler}</Code> handler, so in the Next.js App Router add{' '}
                <Code>&quot;use client&quot;</Code> at the top of its file.</>}
            </Text>
          </Col>
          <CodeBlock code={source} language="tsx" fileName={`${block.slug}.tsx`}/>
        </Col>

        <BlockFacts components={components} adapts={block.adapts}/>
        <BlockPager prev={prev} next={next}/>
      </Col>
    </BlocksShell>
  );
}
