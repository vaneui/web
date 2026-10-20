import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from '../components/og';
import { PageCard } from '../components/ogPage';

export const alt = 'VaneUI documentation: React components and theming guides, with live examples and prop tables';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <PageCard
      eyebrow="Components and guides"
      name="Documentation"
      description="Components, layout, typography and theming guides, with live examples and prop tables."
      right="vaneui.com/docs"/>,
    { ...size, fonts: await ogFonts() },
  );
}
