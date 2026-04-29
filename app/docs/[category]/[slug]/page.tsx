import { DocsPageContent } from "../../DocsPageContent";
import React from "react";
import { Metadata } from "next";
import { docsSections } from "../../docsSections";
import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';
import { parseFrontmatter } from "../../../../lib/docs/frontmatter";
import type { DocPageFrontmatter, DocsPage } from "../../types";

interface DocsPageProps {
  params: Promise<{ category: string, slug: string }>
}

export async function generateMetadata({params}: DocsPageProps): Promise<Metadata> {
  const {category, slug} = await params
  const docsCategory = docsSections.find(c => c.slug === category);
  const docsPage = docsCategory?.pages.find(page => page.slug === slug);

  return {
    title: `VaneUI | ${docsPage?.name || slug} | ${docsCategory?.name || category}`,
    description: `${docsPage?.description || docsCategory?.description || category}`,
  }
}

// Tracks slugs we've already warned about (per server boot) so we only log
// each conflict once. Mutating the Set's contents (not the binding itself)
// keeps the react-hooks/globals lint rule happy.
const mdTsxConflictWarned = new Set<string>();

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
    const conflictKey = `${docsSection.slug}/${docsPage.slug}`;
    if (
      docsPage.parts && docsPage.parts.length > 0 &&
      !mdTsxConflictWarned.has(conflictKey)
    ) {
      mdTsxConflictWarned.add(conflictKey);
      console.warn(
        `[docs] Both .md and TSX parts exist for ${conflictKey}; preferring .md.`,
      );
    }
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

  return (
    <DocsPageContent
      pageData={enrichedPage}
      section={docsSection}
      md={md}
    />
  );
}
