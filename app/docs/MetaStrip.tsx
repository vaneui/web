'use client'

import React, { useState } from 'react';
import { Row, Code, Link, Button, Text } from '@vaneui/ui';
import { Check, Copy, Edit2, GitHub, Cpu } from 'react-feather';
import { DocPageFrontmatter } from './types';

interface MetaStripProps {
  frontmatter: DocPageFrontmatter;
  slug: string;
  category: string;
}

const EDIT_BASE_URL = 'https://github.com/vaneui/vaneui-web/blob/main/app/docs/data';

export function MetaStrip({ frontmatter, slug, category }: MetaStripProps) {
  const [copiedImport, setCopiedImport] = useState(false);
  const [copiedMd, setCopiedMd] = useState(false);

  const { importPath, sourceUrl } = frontmatter;
  const editUrl = `${EDIT_BASE_URL}/${category}/${slug}.md`;
  const mcpUri = `vaneui://docs/${slug}`;

  const handleCopyImport = () => {
    if (!importPath) return;
    navigator.clipboard.writeText(importPath).then(() => {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 1000);
    });
  };

  const handleCopyMarkdown = () => {
    // Wired in Phase 7 (Task 17). For now, placeholder.
    navigator.clipboard.writeText('TODO').then(() => {
      setCopiedMd(true);
      setTimeout(() => setCopiedMd(false), 1000);
    });
  };

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
        aria-label="Copy page as Markdown"
      >
        {copiedMd ? <Check className="size-3.5" aria-hidden="true"/> : <Copy className="size-3.5" aria-hidden="true"/>}
        {copiedMd ? 'Copied!' : 'Copy as Markdown'}
      </Button>

      <Link href={mcpUri} secondary noUnderline sm>
        <Row gap xs itemsCenter>
          <Cpu className="size-3.5" aria-hidden="true"/>
          <Text sm>View on MCP</Text>
        </Row>
      </Link>
    </Row>
  );
}
