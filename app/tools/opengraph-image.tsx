import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from '../components/og';
import { PageCard } from '../components/ogPage';

export const alt = 'VaneUI free tools';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <PageCard
      eyebrow="Free tools"
      name="Free Tools"
      description="Theme generator, OKLCH converter, contrast checker and Markdown editor. They run in the browser."
      right="vaneui.com/tools"/>,
    { ...size, fonts: await ogFonts() },
  );
}
