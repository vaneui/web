import { NextRequest } from 'next/server';
import { docsSectionsMeta } from '../../../../docs/docsMetadata';
import { findDocsPage, renderPageMarkdown } from '../../../../../lib/docs/renderPageMarkdown';

// A docs page as Markdown, public at /docs/<category>/<slug>.md (and for
// `Accept: text/markdown` on the page URL) through the rewrites in
// next.config.mjs, which also add the canonical Link header. Every page is
// rendered once at build time; any other path is a 404 without reaching the
// file system, which also keeps partials (`_`-prefixed files) from being served.
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams(): { category: string; slug: string }[] {
  return docsSectionsMeta.flatMap((section) =>
    section.pages.map((page) => ({ category: section.slug, slug: page.slug })),
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ category: string; slug: string }> }
) {
  const { category, slug } = await params;
  const found = findDocsPage(category, slug);
  if (!found) {
    return new Response('Not found', { status: 404 });
  }

  // Same expanded text the page renders. A broken include throws, which fails
  // the build rather than serving the tag.
  return new Response(renderPageMarkdown(process.cwd(), found.section, found.page), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  });
}
