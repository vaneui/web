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
  return [{
    id: 'card',
    alt: `${block?.name ?? params.slug}: a responsive React block built with VaneUI`,
    size: OG_SIZE,
    contentType: 'image/png',
  }];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const block = findBlock(slug);
  return new ImageResponse(
    <PageCard eyebrow={block ? `${block.category} block` : 'Block'} name={block?.name ?? slug}
              description={block?.description ?? ''} right="vaneui.com/blocks"/>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
