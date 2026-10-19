import { DocsPageContent } from "../../DocsPageContent";
import React from "react";
import { Metadata } from "next";
import { docsSections } from "../../docsSections";
import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';
import { parseFrontmatter } from "../../../../lib/docs/frontmatter";
import { docPageDates } from "../../../../lib/docs/gitDate";
import { expandDocIncludes, isMissingFileError } from "../../../../lib/docs/includes.mjs";
import type { DocPageFrontmatter, DocsPage } from "../../types";
import { JsonLd, buildBreadcrumbSchema, buildTechArticleSchema } from "../../../components/JsonLd";
import { BASE_OPEN_GRAPH } from "../../../constants";

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
  // Page name first, site name last, within Google's ~60-char cut. Component
  // titles name React and Tailwind CSS, the terms people search with; guides
  // carry their own seoTitle. The category stays in the breadcrumb and
  // articleSection. Fallback description avoids leaking the raw slug into
  // search snippets.
  const title = docsPage?.seoTitle
    ?? (docsPage?.componentKey
      ? `${pageName} Component for React + Tailwind CSS | VaneUI`
      : `${pageName} | VaneUI`);
  const description = docsPage?.description
    ?? docsCategory?.description
    ?? `${pageName} documentation for VaneUI, a React component library built on Tailwind CSS v4.`;

  const url = `/docs/${category}/${slug}`;

  // Real content dates so the article card exposes accurate freshness
  // (article:published_time / article:modified_time): git history, or the
  // release dates for the changelog. The modified time also covers the files
  // the page includes. A date that is not known (a shallow clone) is left out,
  // never replaced by the build time. Only for a known page: any other URL
  // renders the 404, so its slug never reaches the file system or git.
  const dates = docsCategory && docsPage ? docPageDates(docsCategory.slug, docsPage) : {};
  const publishedTime = dates.published?.toISOString();
  const modifiedTime = dates.modified?.toISOString();

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
      ...BASE_OPEN_GRAPH,
      type: 'article',
      url,
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
    if (isMissingFileError(error)) return null;
    throw error;
  }
}

/**
 * Read a docs page whose markdown is owned by an installed package (CHANGELOG.md).
 * Resolved from cwd, not `createRequire(import.meta.url)`: the bundler rewrites
 * import.meta.url into .next, so require.resolve fails at build time.
 */
async function readPackageMd(packageMdPath: string): Promise<string | null> {
  const file = path.join(process.cwd(), 'node_modules', packageMdPath);
  const raw = await readIfExists(file);
  if (raw === null) {
    console.error(`Could not read package markdown from ${file}`);
    return null;
  }
  // DocsPageContent renders the page title, so drop the file's own leading H1.
  return raw.replace(/^\s*#\s+.*\r?\n/, '');
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
  // Prefer this over a TSX-array page when both exist. Markdown from
  // app/docs/data has its includes expanded before anything reads it, so the
  // table of contents and the live demos cover included files too.
  const componentMdPath = path.join(
    process.cwd(),
    'app/docs/data',
    docsSection.slug,
    `${docsPage.slug}.md`,
  );
  const componentMd = await readIfExists(componentMdPath);

  if (componentMd !== null) {
    const parsed = parseFrontmatter(expandDocIncludes(componentMd, componentMdPath));
    md = parsed.body;
    frontmatter = parsed.frontmatter as DocPageFrontmatter;
  } else if (docsPage.packageMdPath) {
    // Path 3: markdown owned by an installed package (e.g. @vaneui/ui/CHANGELOG.md).
    md = (await readPackageMd(docsPage.packageMdPath)) ?? "";
  } else if (docsPage.mdPath) {
    // Path 2: legacy markdown guide referenced by mdPath.
    const filePath = path.join(process.cwd(), './app/docs/data/', docsSection.slug, docsPage.mdPath);
    let raw: string | null = null;
    try {
      raw = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error(`Error reading markdown file: ${docsPage.mdPath}`, error);
    }
    // Outside the try: a broken include must fail the build, not render an empty page
    if (raw !== null) {
      const parsed = parseFrontmatter(expandDocIncludes(raw, filePath));
      md = parsed.body;
      frontmatter = parsed.frontmatter as DocPageFrontmatter;
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
  const dates = docPageDates(docsSection.slug, docsPage);
  const datePublished = dates.published?.toISOString();
  const dateModified = dates.modified?.toISOString();
  const breadcrumb = buildBreadcrumbSchema({
    category: docsSection.slug,
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
