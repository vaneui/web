'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { Chip, Col, Grid3, Link, Row, Stack, Text, Title } from '@vaneui/ui';
import { Brackets } from '../landing/frame';
import { BLOCK_CATEGORIES, BLOCKS, blockHref, type BlockCategory, type BlockMeta } from './blocks';
import { BlockThumb } from './BlockThumb';

type Filter = BlockCategory | 'All';
const FILTERS: Filter[] = ['All', ...BLOCK_CATEGORIES];

// How many component names a card lists before "and N more"
const USES_SHOWN = 4;

function usesLine(components: string[]) {
  const shown = components.slice(0, USES_SHOWN).join(', ');
  const more = components.length - USES_SHOWN;
  return more > 0 ? `Uses ${shown} and ${more} more` : `Uses ${shown}`;
}

/** One gallery cell: the live thumbnail, then the name (a link that covers the whole cell) */
function BlockCard({ block }: { block: BlockMeta }) {
  return (
    <Stack xl flexNoWrap primary relative>
      <Brackets/>
      <BlockThumb slug={block.slug}/>
      <Col xs>
        <Row justifyBetween itemsBaseline>
          <Title sm tag="h2">
            {/* The ::after stretches the link over the cell, so the thumbnail opens the page too */}
            <Link tag={NextLink} href={blockHref(block.slug)} primary noUnderline
                  className="after:absolute after:inset-0 after:content-['']">
              {block.name}
            </Link>
          </Title>
          <Text xs fontMono uppercase trackingWider tertiary>{block.category}</Text>
        </Row>
        <Text sm tertiary>{block.description}</Text>
        <Text xs secondary>{usesLine(block.components)}</Text>
      </Col>
    </Stack>
  );
}

/** Category filter chips over the grid of block cards */
export function BlocksGallery() {
  const [filter, setFilter] = useState<Filter>('All');
  const shown = filter === 'All' ? BLOCKS : BLOCKS.filter(b => b.category === filter);
  const count = (f: Filter) => (f === 'All' ? BLOCKS : BLOCKS.filter(b => b.category === f)).length;

  return (
    <Col lg wFull>
      <Row xs flexWrap role="group" aria-label="Filter blocks by category">
        {FILTERS.map(f => {
          const active = f === filter;
          return (
            <Chip key={f} tag="button" cursorPointer aria-pressed={active} primary={active} filled={active}
                  onClick={() => setFilter(f)}>
              {f} <Text tag="span" xs fontMono inheritColor className="opacity-60">{count(f)}</Text>
            </Chip>
          );
        })}
      </Row>
      {/* Screen readers hear the new count after a filter is chosen */}
      <span role="status" className="sr-only">
        {filter === 'All' ? `All ${shown.length} blocks` : `${shown.length} ${filter} blocks`}
      </span>
      <Grid3 divided>
        {shown.map(block => <BlockCard key={block.slug} block={block}/>)}
      </Grid3>
    </Col>
  );
}
