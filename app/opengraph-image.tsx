import { ImageResponse } from 'next/og';
import { OG_SIZE, ogFonts } from './components/og';
import { HomeCard, puppyDataUrl } from './components/ogHome';

// Social card for the landing. Next.js also uses it for twitter:image. Pages that set their own
// openGraph metadata don't inherit it, so the docs index, playground and docs pages have their own.
export const alt = 'VaneUI: Deliver clean UI without complex code. A card built from VaneUI components, labelled with the props that style it.';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(<HomeCard image={await puppyDataUrl()}/>, { ...size, fonts: await ogFonts() });
}
