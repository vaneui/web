import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from '../../components/og';
import { PageCard } from '../../components/ogPage';
import { BLOCKS, findBlock } from '../blocks';

// Per-block social card, so a shared block link names the block instead of the gallery

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return BLOCKS.map(block => ({ slug: block.slug }));
}

export function generateImageMetadata({ params }: { params: Params }) {
  const block = findBlock(params.slug);
  // No image for a slug that is not a block: Next answers 404, as for the block page
  if (!block) return [];
  return [{
    id: 'card',
    alt: `${block.name}: a responsive React block built with VaneUI`,
    size: OG_SIZE,
    contentType: 'image/png',
  }];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const block = findBlock(slug);
  if (!block) return new Response('Not Found', { status: 404 });
  return new ImageResponse(
    <PageCard eyebrow={`${block.category} block`} name={block.name}
              description={block.description} right="vaneui.com/blocks"/>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
