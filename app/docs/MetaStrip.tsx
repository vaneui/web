'use client'

import React, { useState } from 'react';
import { Row, Button } from '@vaneui/ui';
import { AlertCircle, Check, Copy, Edit2, GitHub, ExternalLink } from 'react-feather';
import { DocPageFrontmatter } from './types';

interface MetaStripProps {
  frontmatter: DocPageFrontmatter;
  slug: string;
  category: string;
}

type CopyStatus = 'idle' | 'copying' | 'copied' | 'error';

const VANEUI_REPO = 'https://github.com/vaneui/vaneui/blob/main';
const WEB_REPO = 'https://github.com/vaneui/web/blob/main';

// Components that live under src/components/ui/typography/<key>/ instead of
// the flat src/components/ui/<key>/ layout. Keep this list in sync with
// vaneui's repo structure when new typography components ship.
const TYPOGRAPHY_KEYS = new Set([
  'blockquote', 'link', 'list', 'listItem',
  'pageTitle', 'sectionTitle', 'text', 'title',
]);

/**
 * Compute the GitHub source URL for a component from its componentKey.
 * The frontmatter `sourceUrl` field is intentionally ignored — the
 * migration script populated it with a flat path that doesn't match
 * vaneui's actual nested layout, and authors shouldn't have to edit
 * the URL when files move.
 */
function deriveSourceUrl(frontmatter: DocPageFrontmatter): string | undefined {
  const key = frontmatter.componentKey;
  if (!key) return undefined;
  const pascal = key.charAt(0).toUpperCase() + key.slice(1);
  const subdir = TYPOGRAPHY_KEYS.has(key) ? `typography/${key}` : key;
  return `${VANEUI_REPO}/src/components/ui/${subdir}/${pascal}.tsx`;
}

export function MetaStrip({ frontmatter, slug, category }: MetaStripProps) {
  const [importStatus, setImportStatus] = useState<CopyStatus>('idle');
  const [mdStatus, setMdStatus] = useState<CopyStatus>('idle');

  const { importPath } = frontmatter;
  const sourceUrl = deriveSourceUrl(frontmatter);
  const editUrl = `${WEB_REPO}/app/docs/data/${category}/${slug}.md`;

  function handleCopyImport() {
    if (!importPath) return;
    setImportStatus('copying');
    navigator.clipboard.writeText(importPath).then(
      () => {
        setImportStatus('copied');
        setTimeout(() => setImportStatus('idle'), 1500);
      },
      () => {
        setImportStatus('error');
        setTimeout(() => setImportStatus('idle'), 2000);
      },
    );
  }

  async function handleCopyMarkdown() {
    setMdStatus('copying');
    try {
      const res = await fetch(`/api/docs/${category}/${slug}`);
      if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
      const md = await res.text();
      await navigator.clipboard.writeText(md);
      setMdStatus('copied');
      setTimeout(() => setMdStatus('idle'), 1500);
    } catch (err) {
      console.error('Copy failed:', err);
      setMdStatus('error');
      setTimeout(() => setMdStatus('idle'), 2000);
    }
  }

  function copyIcon(status: CopyStatus) {
    if (status === 'copied') return <Check className="size-3.5 text-success" aria-hidden="true" />;
    if (status === 'error') return <AlertCircle className="size-3.5" aria-hidden="true" />;
    return <Copy className="size-3.5" aria-hidden="true" />;
  }

  function copyLabel(status: CopyStatus, idleLabel: string, copiedLabel: string) {
    if (status === 'copying') return 'Copying…';
    if (status === 'copied') return copiedLabel;
    if (status === 'error') return 'Failed';
    return idleLabel;
  }

  return (
    <Row justifyBetween flexWrap>
      {importPath && (
        <Button
          xs
          secondary
          noShadow
          mono
          onClick={handleCopyImport}
          title={importStatus === 'copied' ? 'Copied!' : `Click to copy: ${importPath}`}
          aria-label="Copy import statement"
        >
          {copyIcon(importStatus)}
          {importPath}
        </Button>
      )}

      <Row justifyEnd flexWrap>
        {sourceUrl && (
          <Button
            xs
            secondary
            noShadow
            href={sourceUrl}
            tag="a"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
          >
            <GitHub className="size-3.5" aria-hidden="true" />
            Source
            <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
          </Button>
        )}

        <Button
          xs
          secondary
          noShadow
          href={editUrl}
          tag="a"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Edit this page on GitHub"
        >
          <Edit2 className="size-3.5" aria-hidden="true" />
          Edit this page
          <ExternalLink className="size-3 opacity-60" aria-hidden="true" />
        </Button>

        <Button
          xs
          secondary
          noShadow
          onClick={handleCopyMarkdown}
          disabled={mdStatus === 'copying'}
          aria-label="Copy page as Markdown"
        >
          {copyIcon(mdStatus)}
          {copyLabel(mdStatus, 'Copy as Markdown', 'Copied!')}
        </Button>
      </Row>
    </Row>
  );
}
