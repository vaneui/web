import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from '../components/og';
import { PageCard } from '../components/ogPage';

export const alt = 'VaneUI blocks: responsive React page sections for Tailwind CSS v4';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <PageCard
      eyebrow="Copy-paste sections"
      name="Blocks"
      description="Landing, pricing, sign-in, app shell, settings, dashboard and data table blocks, previewed from 390 to 1280px."
      right="vaneui.com/blocks"/>,
    { ...size, fonts: await ogFonts() },
  );
}
