import { ImageResponse } from 'next/og';
import { docsSections } from '../../docsSections';
import { OG_SIZE, ogFonts } from '../../../components/og';
import { PageCard } from '../../../components/ogPage';

// Per-page social card. Co-locating this route makes Next.js emit the og:image meta for every
// docs page, replacing the site-wide card with one that names the actual page.
export const alt = 'VaneUI documentation';
export const size = OG_SIZE;
export const contentType = 'image/png';

// Pre-render one card per docs URL at build time (mirrors the page route).
export function generateStaticParams(): { category: string; slug: string }[] {
  return docsSections.flatMap(section =>
    section.pages.map(page => ({ category: section.slug, slug: page.slug })),
  );
}

export default async function Image(
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  const { category, slug } = await params;
  const section = docsSections.find(c => c.slug === category);
  const page = section?.pages.find(p => p.slug === slug);

  return new ImageResponse(
    <PageCard eyebrow={section?.name ?? category} name={page?.name ?? slug} description={page?.description ?? ''} right="vaneui.com/docs"/>,
    { ...size, fonts: await ogFonts() },
  );
}
