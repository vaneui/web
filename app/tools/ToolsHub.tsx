'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowUpRight } from 'react-feather';
import { Card, Chip, Col, Grid2, Link, PageTitle, Row, Text, Title } from '@vaneui/ui';
import { ToolsFrame } from './ToolShell';
import { TOOLS, toolHref } from './tools';

const MORE = [
  { href: '/blocks', name: 'UI Blocks', category: 'Code', summary: 'Landing, pricing, sign-in, dashboard and table sections to copy, previewed at four widths.' },
  { href: '/playground', name: 'Playground', category: 'Code', summary: 'Write React with VaneUI components and Tailwind CSS v4 and see it render as you type.' },
];

function ToolCard({ href, name, category, summary }: { href: string; name: string; category: string; summary: string }) {
  return (
    <Card tag={NextLink} href={href}>
      <Row justifyBetween>
        <Chip sm>{category}</Chip>
        <ArrowUpRight aria-hidden="true" className="lp-nudge size-4 shrink-0 opacity-50"/>
      </Row>
      <Title tag="h2">{name}</Title>
      <Text secondary>{summary}</Text>
    </Card>
  );
}

export function ToolsHub() {
  return (
    <ToolsFrame>
      <Col sm className="max-w-[64ch]">
        <PageTitle>Free Tools</PageTitle>
        <Text lg secondary>
          Color and Markdown tools for building interfaces. They run in your browser, need no sign-up, and
          export code you can paste into any React or CSS project.
        </Text>
      </Col>
      <Grid2>
        {TOOLS.map(t => (
          <ToolCard key={t.slug} href={toolHref(t.slug)} name={t.name} category={t.category} summary={t.summary}/>
        ))}
      </Grid2>
      <Grid2>
        {MORE.map(t => <ToolCard key={t.href} {...t}/>)}
      </Grid2>
      <Text sm secondary className="max-w-[64ch]">
        Every tool is built with VaneUI, the React component library this site documents. Its previews use
        the same components you get from <Link tag={NextLink} href="/docs/getting-started/installation">npm install @vaneui/ui</Link>.
      </Text>
    </ToolsFrame>
  );
}
