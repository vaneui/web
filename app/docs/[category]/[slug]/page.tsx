import { DocsPageLayout } from "../../DocsPageLayout";
import { DocsPageComponentContent } from "../../DocsPageComponentContent";
import React from "react";
import { Metadata } from "next";
import { docsSections } from "../../docsSections";
import { notFound } from "next/navigation";

interface DocsPageProps {
  params: Promise<{ category: string, slug: string }>
}

export async function generateMetadata({params}: DocsPageProps): Promise<Metadata> {
  const {category, slug} = await params
  const docsCategory = docsSections.find(c => c.slug === category);
  const element = docsCategory?.components.find(c => c.name.toLowerCase() === slug.toLowerCase());

  return {
    title: `${element?.name || slug} | ${docsCategory?.name || category}`,
    description: `${element?.description || docsCategory?.description || category}`,
  }
}

export default async function Page({params}: DocsPageProps) {
  const {category, slug} = await params

  const docsCategory = docsSections.find(c => c.slug === category);

  if (!docsCategory)
    return notFound();

  const element = docsCategory.components.find(c => c.name.toLowerCase() === slug.toLowerCase());

  return (
    <DocsPageLayout>
      {element !== undefined ?
        <DocsPageComponentContent
          pageTitle={element.name}
          description={element.description}
          propCategories={[]}
          examples={element.examples || []}
        />
        :
        <div>
          Element ${slug} not found
        </div>
      }
    </DocsPageLayout>
  );
}
