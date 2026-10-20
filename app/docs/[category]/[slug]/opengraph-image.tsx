import { ImageResponse } from 'next/og';
import { docsSections } from '../../docsSections';
import { OG_SIZE, ogFonts } from '../../../components/og';
import { PageCard } from '../../../components/ogPage';

// Per-page social card. Co-locating this route makes Next.js emit the og:image meta for every
// docs page, replacing the site-wide card with one that names the actual page.

type Params = { category: string; slug: string };

function findPage({ category, slug }: Params) {
  const section = docsSections.find(c => c.slug === category);
  return { section, page: section?.pages.find(p => p.slug === slug) };
}

// Pre-render one card per docs URL at build time (mirrors the page route).
export function generateStaticParams(): Params[] {
  return docsSections.flatMap(section =>
    section.pages.map(page => ({ category: section.slug, slug: page.slug })),
  );
}

// One card per page, with an alt text that names the page (og:image:alt)
export function generateImageMetadata({ params }: { params: Params }) {
  const { page } = findPage(params);
  const name = page?.name ?? params.slug;
  return [{
    id: 'card',
    alt: page?.componentKey ? `${name}: VaneUI React component docs` : `${name}: VaneUI docs`,
    size: OG_SIZE,
    contentType: 'image/png',
  }];
}

export default async function Image({ params }: { params: Promise<Params> }) {
  const resolved = await params;
  const { section, page } = findPage(resolved);

  return new ImageResponse(
    <PageCard eyebrow={section?.name ?? resolved.category} name={page?.name ?? resolved.slug} description={page?.description ?? ''} right="vaneui.com/docs"/>,
    { ...OG_SIZE, fonts: await ogFonts() },
  );
}
