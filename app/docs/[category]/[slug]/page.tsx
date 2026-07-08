import { DocsPageContent } from "../../DocsPageContent";
import React from "react";
import { Metadata } from "next";
import { docsSections } from "../../docsSections";
import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';
import { parseFrontmatter } from "../../../../lib/docs/frontmatter";
import { docFilePath, firstGitDate, lastGitDate } from "../../../../lib/docs/gitDate";
import type { DocPageFrontmatter, DocsPage } from "../../types";
import { JsonLd, buildBreadcrumbSchema, buildTechArticleSchema } from "../../../components/JsonLd";

interface DocsPageProps {
  params: Promise<{ category: string, slug: string }>
}

// Pre-render every docs URL at build time. Without this the route is SSR'd
// on each request and `fs.readFile` runs every time.
export function generateStaticParams(): { category: string, slug: string }[] {
  return docsSections.flatMap(section =>
    section.pages.map(page => ({ category: section.slug, slug: page.slug }))
  );
}

export async function generateMetadata({params}: DocsPageProps): Promise<Metadata> {
  const {category, slug} = await params
  const docsCategory = docsSections.find(c => c.slug === category);
  const docsPage = docsCategory?.pages.find(page => page.slug === slug);

  const pageName = docsPage?.name || slug;
  const categoryName = docsCategory?.name || category;
  // Page name first, brand last — better CTR pattern and survives Google's
  // ~60-char truncation. Category in the middle adds context for
  // navigational queries (e.g. "VaneUI Button"). Fallback description avoids
  // leaking the raw slug into search snippets.
  const title = `${pageName} - ${categoryName} - VaneUI`;
  const description = docsPage?.description
    ?? docsCategory?.description
    ?? `${pageName} documentation for VaneUI, a React component library powered by Tailwind CSS.`;

  const url = `/docs/${category}/${slug}`;

  // Real content dates from git history so the article card exposes accurate
  // freshness (article:published_time / article:modified_time). Falls back to
  // build time when git history is unavailable.
  const buildTime = new Date();
  const filePath = docFilePath(category, slug, docsPage?.mdPath);
  const publishedTime = firstGitDate(filePath, buildTime).toISOString();
  const modifiedTime = lastGitDate(filePath, buildTime).toISOString();

  // Per-page Open Graph + Twitter. Without these, Next.js leaves every docs
  // page inheriting the root layout's homepage card (wrong title + url when a
  // deep link is shared or surfaced by an AI). The og:image is supplied by the
  // co-located opengraph-image route, so it is intentionally omitted here.
  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      url,
      siteName: 'VaneUI',
      title,
      description,
      publishedTime,
      modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

async function readIfExists(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf8');
  } catch (error: unknown) {
    if ((error as NodeJS.ErrnoException)?.code === 'ENOENT') return null;
    throw error;
  }
}

export default async function Page({params}: DocsPageProps) {
  const {category, slug} = await params

  const docsSection = docsSections.find(c => c.slug === category);

  if (!docsSection)
    return notFound();

  const docsPage = docsSection.pages.find(page => page.slug === slug);

  if (!docsPage) {
    return notFound();
  }

  let md = "";
  let frontmatter: DocPageFrontmatter | undefined;

  // Path 1: per-component MD file at app/docs/data/<category>/<slug>.md.
  // Prefer this over a TSX-array page when both exist.
  const componentMdPath = path.join(
    process.cwd(),
    'app/docs/data',
    docsSection.slug,
    `${docsPage.slug}.md`,
  );
  const componentMd = await readIfExists(componentMdPath);

  if (componentMd !== null) {
    const parsed = parseFrontmatter(componentMd);
    md = parsed.body;
    frontmatter = parsed.frontmatter as DocPageFrontmatter;
  } else if (docsPage.mdPath) {
    // Path 2: legacy markdown guide referenced by mdPath.
    try {
      const filePath = path.join(process.cwd(), './app/docs/data/', docsSection.slug, docsPage.mdPath);
      const raw = await fs.readFile(filePath, 'utf8');
      const parsed = parseFrontmatter(raw);
      md = parsed.body;
      frontmatter = parsed.frontmatter as DocPageFrontmatter;
    } catch (error) {
      console.error(`Error reading markdown file: ${docsPage.mdPath}`, error);
      md = "";
    }
  }

  // Plumb frontmatter (and any frontmatter-derived componentKey) into the page
  // data so DocsPageContent renders the existing prop-table for MD-first pages.
  const enrichedPage: DocsPage = {
    ...docsPage,
    frontmatter,
    componentKey: docsPage.componentKey
      ?? (frontmatter?.componentKey as DocsPage['componentKey'] | undefined),
  };

  const pageUrl = `https://vaneui.com/docs/${docsSection.slug}/${docsPage.slug}`;
  const buildTime = new Date();
  const filePath = docFilePath(docsSection.slug, docsPage.slug, docsPage.mdPath);
  const datePublished = firstGitDate(filePath, buildTime).toISOString();
  const dateModified = lastGitDate(filePath, buildTime).toISOString();
  const breadcrumb = buildBreadcrumbSchema({
    category: docsSection.slug,
    categoryName: docsSection.name,
    slug: docsPage.slug,
    pageName: docsPage.name,
  });
  const techArticle = buildTechArticleSchema({
    pageName: docsPage.name,
    description: docsPage.description,
    url: pageUrl,
    articleSection: docsSection.name,
    datePublished,
    dateModified,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={techArticle} />
      <DocsPageContent
        pageData={enrichedPage}
        section={docsSection}
        md={md}
      />
    </>
  );
}
