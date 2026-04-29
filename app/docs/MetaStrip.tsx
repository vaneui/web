'use client'

import React, { useState } from 'react';
import { Row, Code, Link, Button, Text } from '@vaneui/ui';
import { AlertCircle, Check, Copy, Edit2, GitHub } from 'react-feather';
import { DocPageFrontmatter } from './types';

interface MetaStripProps {
  frontmatter: DocPageFrontmatter;
  slug: string;
  category: string;
}

type CopyMdStatus = 'idle' | 'copying' | 'copied' | 'error';

const EDIT_BASE_URL = 'https://github.com/vaneui/web/blob/main/app/docs/data';

export function MetaStrip({ frontmatter, slug, category }: MetaStripProps) {
  const [copiedImport, setCopiedImport] = useState(false);
  const [mdStatus, setMdStatus] = useState<CopyMdStatus>('idle');

  const { importPath, sourceUrl } = frontmatter;
  const editUrl = `${EDIT_BASE_URL}/${category}/${slug}.md`;

  const handleCopyImport = () => {
    if (!importPath) return;
    navigator.clipboard.writeText(importPath).then(() => {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 1000);
    });
  };

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

  const mdIcon =
    mdStatus === 'copied' ? <Check className="size-3.5" aria-hidden="true"/> :
    mdStatus === 'error' ? <AlertCircle className="size-3.5" aria-hidden="true"/> :
    <Copy className="size-3.5" aria-hidden="true"/>;

  const mdLabel =
    mdStatus === 'copying' ? 'Copying...' :
    mdStatus === 'copied' ? 'Copied!' :
    mdStatus === 'error' ? 'Failed' :
    'Copy as Markdown';

  return (
    <Row noGap flexWrap className="mt-2 gap-x-4 gap-y-2">
      {importPath && (
        <Row gap xs itemsCenter>
          <Text sm secondary>Import</Text>
          <Code
            xs
            className="cursor-pointer"
            onClick={handleCopyImport}
            title={copiedImport ? 'Copied!' : 'Click to copy'}
          >
            {importPath}
          </Code>
          {copiedImport ? (
            <Check className="size-3 text-success" aria-hidden="true"/>
          ) : (
            <Copy className="size-3" aria-hidden="true"/>
          )}
        </Row>
      )}

      {sourceUrl && (
        <Link href={sourceUrl} external secondary noUnderline sm>
          <Row gap xs itemsCenter>
            <GitHub className="size-3.5" aria-hidden="true"/>
            <Text sm>Source</Text>
          </Row>
        </Link>
      )}

      <Link href={editUrl} external secondary noUnderline sm>
        <Row gap xs itemsCenter>
          <Edit2 className="size-3.5" aria-hidden="true"/>
          <Text sm>Edit this page</Text>
        </Row>
      </Link>

      <Button
        xs
        secondary
        noShadow
        noRing
        noBorder
        onClick={handleCopyMarkdown}
        disabled={mdStatus === 'copying'}
        aria-label="Copy page as Markdown"
      >
        {mdIcon}
        {mdLabel}
      </Button>
    </Row>
  );
}
