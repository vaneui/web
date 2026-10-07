'use client';

import React from 'react';
import Link from 'next/link';
import { Grid4, Col, Row, Stack, Text, PageTitle, IconButton, ThemeProvider } from '@vaneui/ui';
import { ArrowUpRight } from 'react-feather';
import { GALLERY_TILES } from './demos';
import { Reveal } from './Reveal';
import { Brackets, FrameRow, SectionHead } from './frame';

// Placement on the 4-column grid: Forms 2x2, Data 2x1, the rest 1x1, then the count cell 2x1
const LAYOUT: Record<string, { cell: string; demo: string; label: string; canvas?: boolean; compact?: boolean }> = {
  'Forms': { cell: 'col-span-2 row-span-2 max-tablet:row-span-1 max-mobile:col-span-1', demo: 'max-w-[22rem]', label: 'Forms', canvas: true },
  'Data': { cell: 'col-span-2 max-mobile:col-span-1', demo: '', label: 'Data' },
  'Feedback and overlays': { cell: '', demo: '', label: 'Feedback', compact: true },
  'Settings': { cell: '', demo: '', label: 'Settings' },
  'Navigation': { cell: '', demo: 'max-w-[16rem]', label: 'Navigation' },
  'Choices': { cell: '', demo: '', label: 'Choices' },
};
const ORDER = ['Forms', 'Data', 'Feedback and overlays', 'Settings', 'Navigation', 'Choices'];

export function ComponentsBento() {
  const tiles = ORDER.map(name => GALLERY_TILES.find(t => t.name === name)!);

  return (
    <FrameRow id="components" label="Components">
      <SectionHead index="01" eyebrow="Components" title="40+ components that fit together">
        Forms, data, feedback and overlays share one size scale and one set of colors. Every tile below is the
        real component, so try it.
      </SectionHead>

      <Grid4 noGap borderT className="lp-grid max-tablet:grid-cols-2 max-mobile:grid-cols-1">
        {tiles.map((tile, i) => {
          const l = LAYOUT[tile.name];
          return (
            <Col key={tile.name} noGap className={`lp-cell ${l.cell}`}>
              <Brackets/>
              <Stack xl flexNoWrap flex1 itemsCenter justifyCenter relative className="py-10 max-mobile:py-8">
                {l.canvas && <div aria-hidden="true" className="lp-dots"/>}
                <Reveal delay={i * 50} className={`relative w-full ${l.demo}`}>
                  {l.compact
                    ? <ThemeProvider themeDefaults={{ alert: { sm: true } }}>{tile.demo}</ThemeProvider>
                    : tile.demo}
                </Reveal>
              </Stack>
              <Row justifyBetween borderT className="px-8 py-3 max-tablet:px-6 max-mobile:px-4">
                <Col noGap>
                  <Text xs fontMono uppercase trackingWider>{l.label}</Text>
                  <Text xs tertiary>{tile.parts}</Text>
                </Col>
                <IconButton xs ghost secondary tag={Link} href={tile.href} aria-label={`${tile.name} docs`}>
                  <ArrowUpRight aria-hidden="true" className="lp-nudge"/>
                </IconButton>
              </Row>
            </Col>
          );
        })}

        {/* The count cell links to the full list */}
        <Stack xl flexNoWrap justifyBetween tag={Link} href="/docs" className="lp-cell col-span-2 max-mobile:col-span-1 min-h-56">
          <Brackets/>
          <Row justifyBetween itemsStart>
            <Text xs fontMono uppercase trackingWider tertiary>Catalog</Text>
            <ArrowUpRight aria-hidden="true" className="lp-nudge size-5"/>
          </Row>
          <Reveal delay={tiles.length * 50}>
            <Row lg itemsEnd justifyBetween mobileStack className="max-mobile:items-start">
              <PageTitle tag="p" xl trackingTighter>40+</PageTitle>
              <Col xs className="max-w-[30ch]">
                <Text sm fontMedium>Browse every component</Text>
                <Text sm tertiary>Buttons, inputs, overlays, tables and layout, each with live examples and a props table.</Text>
              </Col>
            </Row>
          </Reveal>
        </Stack>
      </Grid4>
    </FrameRow>
  );
}
