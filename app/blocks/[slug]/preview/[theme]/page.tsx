import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Col } from '@vaneui/ui';
import { BLOCK_THEMES, BLOCKS, blockHref, findBlock, isBlockTheme } from '../../../blocks';
import { BlockRender } from '../../../BlockRender';

// The block alone, for the iframe on its page: no site header or footer, one theme per URL so the
// page is static (no search params).

interface PreviewPageProps {
  params: Promise<{ slug: string; theme: string }>;
}

export const dynamicParams = false;

export function generateStaticParams(): { slug: string; theme: string }[] {
  return BLOCKS.flatMap(block => BLOCK_THEMES.map(theme => ({ slug: block.slug, theme })));
}

export async function generateMetadata({ params }: PreviewPageProps): Promise<Metadata> {
  const { slug, theme } = await params;
  const block = findBlock(slug);
  if (!block) return {};
  return {
    title: `${block.name} Block Preview, ${theme === 'dark' ? 'Dark' : 'Light'} | VaneUI`,
    robots: { index: false },
    // The block page is the page to index
    alternates: { canonical: blockHref(block.slug) },
  };
}

/**
 * Runs while the page parses: the theme goes on <html> too, so menus that render in a portal and
 * the native controls follow it, and links do not navigate, so the preview stays on the block.
 */
const previewScript = (theme: string) => `
document.documentElement.dataset.theme = ${JSON.stringify(theme)};
document.addEventListener('click', function (event) {
  var link = event.target instanceof Element && event.target.closest('a[href]');
  if (link && link.getAttribute('href').charAt(0) !== '#') event.preventDefault();
}, true);`;

export default async function BlockPreviewPage({ params }: PreviewPageProps) {
  const { slug, theme } = await params;
  const block = findBlock(slug);
  if (!block || !isBlockTheme(theme)) notFound();

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: previewScript(theme) }}/>
      <Col noGap primary data-theme={theme} className="min-h-dvh">
        <BlockRender slug={block.slug}/>
      </Col>
    </>
  );
}
