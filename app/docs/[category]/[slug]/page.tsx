import { DocsPageContent } from "../../DocsPageContent";
import React from "react";
import { Metadata } from "next";
import { docsSections } from "../../docsSections";
import { notFound } from "next/navigation";
import { promises as fs } from 'fs';
import path from 'path';

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
  // If the page has an mdPath, read the markdown file
  if (docsPage.mdPath) {
    try {
      const filePath = path.join(process.cwd(), "./app/docs/data/", docsSection.slug, docsPage.mdPath);
      md = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error(`Error reading markdown file: ${docsPage.mdPath}`, error);
      md = "";
    }
  }

  return (
    <DocsPageContent
      pageData={docsPage}
      section={docsSection}
      md={md}
    />
  );
}
