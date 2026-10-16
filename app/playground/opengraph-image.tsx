import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from '../components/og';
import { PageCard } from '../components/ogPage';

export const alt = 'VaneUI playground';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    <PageCard
      eyebrow="Live editor"
      name="Playground"
      description="Write React and VaneUI component code and see it render live, side by side, in the browser."
      right="vaneui.com/playground"/>,
    { ...size, fonts: await ogFonts() },
  );
}
