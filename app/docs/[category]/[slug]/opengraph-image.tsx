import { ImageResponse } from 'next/og';
import { docsSections } from '../../docsSections';

// Per-page social card. Co-locating this route makes Next.js emit the
// og:image / twitter:image meta automatically, replacing the single shared
// og-default.png with a card that names the actual page. Uses the default
// system font (no font-buffer fetch) to keep generation simple and fast.
export const alt = 'VaneUI documentation';
export const size = { width: 1200, height: 630 };
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

  const pageName = page?.name ?? slug;
  const categoryName = section?.name ?? category;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#ffffff',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand + category */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 40, fontWeight: 800, color: '#0a0a0a', letterSpacing: -1 }}>
            VaneUI
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            {categoryName}
          </div>
        </div>

        {/* Page name */}
        <div
          style={{
            display: 'flex',
            fontSize: 110,
            fontWeight: 800,
            color: '#0a0a0a',
            lineHeight: 1.05,
            letterSpacing: -3,
          }}
        >
          {pageName}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 28, color: '#6b7280' }}>
            React component library powered by Tailwind CSS
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: '#0a0a0a' }}>vaneui.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
