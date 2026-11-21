// Server-side pieces every tool page shares: its metadata, structured data and social card.
import React from 'react';
import type { Metadata } from 'next';
import { ImageResponse } from 'next/og';
import { BASE_OPEN_GRAPH } from '../constants';
import { JsonLd } from '../components/JsonLd';
import { OG_SIZE, ogFonts } from '../components/og';
import { PageCard } from '../components/ogPage';
import { toolGraph } from '../../lib/seo/structuredData';
import { getTool, toolHref } from './tools';

export function toolMetadata(slug: string): Metadata {
  const tool = getTool(slug);
  const url = toolHref(slug);
  return {
    title: tool.seoTitle,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: { ...BASE_OPEN_GRAPH, type: 'website', url, title: tool.seoTitle, description: tool.description },
    twitter: { card: 'summary_large_image', title: tool.seoTitle, description: tool.description },
  };
}

export function ToolJsonLd({ slug }: { slug: string }) {
  const tool = getTool(slug);
  return <JsonLd data={toolGraph({ path: toolHref(slug), name: tool.name, description: tool.description, category: tool.category })}/>;
}

export async function toolOgImage(slug: string) {
  const tool = getTool(slug);
  return new ImageResponse(
    <PageCard eyebrow="Free tool" name={tool.name} description={tool.summary} right={`vaneui.com${toolHref(slug)}`}/>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
