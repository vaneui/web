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
  const docsPage = docsCategory?.pages.find(c => c.name.toLowerCase() === slug.toLowerCase());

  return {
    title: `VaneUI | ${docsPage?.name || slug} | ${docsCategory?.name || category}`,
    description: `${docsPage?.description || docsCategory?.description || category}`,
  }
}

export default async function Page({params}: DocsPageProps) {
  const {category, slug} = await params

  const docsCategory = docsSections.find(c => c.slug === category);

  if (!docsCategory)
    return notFound();

  const docsPage = docsCategory.pages.find(c => c.name.toLowerCase() === slug.toLowerCase());

  if (!docsPage) {
    return (
      <div>
        Element {slug} not found
      </div>
    );
  }

  let md = "";
  // If the page has an mdPath, read the markdown file
  if (docsPage.mdPath) {
    try {
      const filePath = path.join(process.cwd(), "./app/docs/data/", docsCategory.slug, docsPage.mdPath);
      md = await fs.readFile(filePath, 'utf8');
    } catch (error) {
      console.error(`Error reading markdown file: ${docsPage.mdPath}`, error);
      md = "";
    }
  }

  return (
    <DocsPageContent
      category={docsCategory.name}
      pageTitle={docsPage.name}
      description={docsPage.description}
      examples={docsPage.examples || []}
      md={md}
    />
  );
}
