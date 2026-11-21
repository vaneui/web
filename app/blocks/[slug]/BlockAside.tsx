'use client';

// Client-side so `tag={Link}` works from the server page
import React from 'react';
import NextLink from 'next/link';
import { Card, Chip, Col, Grid2, Grid3, Link, List, ListItem, Row, Stack, Text, Title } from '@vaneui/ui';
import { ArrowLeft, ArrowRight } from 'react-feather';
import { MCP_COMMAND } from '../../landing/content';
import { Brackets, CopyButton } from '../../landing/frame';
import { blockHref, type BlockMeta } from '../blocks';

export interface ComponentLink {
  name: string;
  /** The component's docs page, when it has one */
  href?: string;
}

/** A link in running text, through the Next.js router */
export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link tag={NextLink} href={href}>{children}</Link>;
}

/** "All blocks" link above the page title */
export function BlocksBackLink() {
  return (
    <Link sm secondary noUnderline tag={NextLink} href="/blocks">
      <ArrowLeft aria-hidden="true" className="inline size-3.5 align-[-0.125em]"/> All blocks
    </Link>
  );
}

/** Components, how the block adapts, and the MCP command, as three hairline cells */
export function BlockFacts({ components, adapts }: { components: ComponentLink[]; adapts: string[] }) {
  return (
    <Grid3 divided className="max-tablet:grid-cols-1">
      <Stack xl flexNoWrap primary>
        <Title sm tag="h2">Components in this block</Title>
        <Row xs flexWrap tag="ul">
          {components.map(c => (
            <li key={c.name}>
              {c.href
                ? <Chip sm fontMono tag={NextLink} href={c.href}>{c.name}</Chip>
                : <Chip sm fontMono>{c.name}</Chip>}
            </li>
          ))}
        </Row>
      </Stack>

      <Stack xl flexNoWrap primary>
        <Title sm tag="h2">How it adapts</Title>
        <List sm>
          {adapts.map(line => <ListItem key={line}>{line}</ListItem>)}
        </List>
      </Stack>

      <Stack xl flexNoWrap primary>
        <Title sm tag="h2">Adapt it with your coding agent</Title>
        <Text sm tertiary>
          Add the VaneUI MCP server, and your agent reads the component docs and prop tables while it changes the
          block: the copy, the sample data or the layout.
        </Text>
        {/* The terminal stays dark in both themes, as on the landing */}
        <div data-theme="dark">
          <Card sm noPadding noGap>
            <Row justifyBetween itemsStart className="py-2 pr-2 pl-4">
              <Text sm fontMono className="min-w-0 py-1">
                <Text tag="span" fontMono tertiary inheritSize>{'$\u00a0'}</Text>{MCP_COMMAND}
              </Text>
              <CopyButton value={MCP_COMMAND} label="Copy MCP command"/>
            </Row>
          </Card>
        </div>
        <Text sm tertiary>
          Setup for other editors is in the{' '}
          <Link tag={NextLink} href="/docs/getting-started/ai-assistants">AI assistants guide</Link>.
        </Text>
      </Stack>
    </Grid3>
  );
}

/** Links to the blocks before and after this one */
export function BlockPager({ prev, next }: { prev: BlockMeta; next: BlockMeta }) {
  return (
    <Grid2 divided tag="nav" aria-label="More blocks">
      <Stack xl flexNoWrap primary relative tag={NextLink} href={blockHref(prev.slug)}>
        <Brackets/>
        <Row xs>
          <ArrowLeft aria-hidden="true" className="size-4 shrink-0 opacity-50"/>
          <Text xs fontMono uppercase trackingWider tertiary>Previous</Text>
        </Row>
        <Col noGap>
          <Text fontMedium>{prev.name}</Text>
          <Text sm tertiary>{prev.category}</Text>
        </Col>
      </Stack>
      <Stack xl flexNoWrap primary relative itemsEnd textRight tag={NextLink} href={blockHref(next.slug)}>
        <Brackets/>
        <Row xs>
          <Text xs fontMono uppercase trackingWider tertiary>Next</Text>
          <ArrowRight aria-hidden="true" className="size-4 shrink-0 opacity-50"/>
        </Row>
        <Col noGap itemsEnd>
          <Text fontMedium>{next.name}</Text>
          <Text sm tertiary>{next.category}</Text>
        </Col>
      </Stack>
    </Grid2>
  );
}
