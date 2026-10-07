'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  PageTitle, Text, Row, Stack, Button, Badge, Title, Card, Chip, Divider, ThemeProvider, Img, Label, Switch,
} from '@vaneui/ui';
import { ArrowRight } from 'react-feather';
import { CodeBlock } from '../components/CodeBlock';
import { ANNOUNCEMENT, CARD_CODE, INSTALL, PRODUCT, dog } from './content';
import { Reveal } from './Reveal';
import { FrameRow, InstallBox } from './frame';
import { inkCodeTheme } from './codeTheme';

type Box = { x: number; y: number; w: number; h: number };
type Geometry = { card: Box; img: Box; chip: Box; adopt: Box; more: Box; code: Box };

const GUTTER = 36; // distance from the card edge to the label column

function boxOf(el: Element | null, origin: DOMRect): Box | null {
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left - origin.left, y: r.top - origin.top, w: r.width, h: r.height };
}

/** Thin accent leader lines that name the props producing each part of the card */
function Redlines({ g }: { g: Geometry }) {
  const { card, img, chip, adopt, more, code } = g;
  // once everything has drawn, drop the animations so the final state is plain static markup
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 3600);
    return () => clearTimeout(t);
  }, []);
  const left = card.x - GUTTER;
  const right = card.x + card.w + GUTTER;
  const bottom = card.y + card.h;

  const dimY = card.y - 26;
  const imgY = img.y + 44;
  const cardY = bottom - 30;
  const chipY = chip.y + chip.h / 2;
  const moreY = more.y + more.h / 2;
  // runs through the middle of the gap between the card and the code panel
  const adoptY = (bottom + code.y) / 2;

  const leads: { key: string; d: string; dot: [number, number]; label: string; at: [number, number]; side: 'l' | 'r' }[] = [
    { key: 'card', d: `M${card.x} ${cardY}H${left}`, dot: [card.x, cardY], label: 'Card sm row', at: [left, cardY], side: 'l' },
    { key: 'img', d: `M${img.x + 30} ${imgY}H${left}`, dot: [img.x + 30, imgY], label: 'Img sm sharp', at: [left, imgY], side: 'l' },
    { key: 'chip', d: `M${chip.x + chip.w} ${chipY}H${right}`, dot: [chip.x + chip.w, chipY], label: 'Chip sm fontBold', at: [right, chipY], side: 'r' },
    { key: 'more', d: `M${more.x + more.w} ${moreY}H${right}`, dot: [more.x + more.w, moreY], label: 'Button secondary', at: [right, moreY], side: 'r' },
    { key: 'adopt', d: `M${adopt.x + adopt.w / 2} ${adopt.y + adopt.h}V${adoptY}H${right}`, dot: [adopt.x + adopt.w / 2, adopt.y + adopt.h], label: 'Button filled', at: [right, adoptY], side: 'r' },
  ];

  const start = 450;
  const step = 260;
  const width = Math.round(card.w);

  return (
    <div aria-hidden="true" data-drawn={drawn} className="lp-anno max-tablet:hidden">
      <svg width="100%" height="100%">
        {/* dimension line with end ticks */}
        <path className="lp-lead" pathLength={1} style={{ '--d': `${start}ms` } as React.CSSProperties}
              d={`M${card.x} ${dimY}H${card.x + card.w}`}/>
        <path className="lp-lead" pathLength={1} style={{ '--d': `${start}ms` } as React.CSSProperties}
              d={`M${card.x} ${dimY - 5}V${dimY + 5}M${card.x + card.w} ${dimY - 5}V${dimY + 5}`}/>
        {leads.map((l, i) => (
          <g key={l.key}>
            <path className="lp-lead" pathLength={1} d={l.d}
                  style={{ '--d': `${start + step * (i + 1)}ms` } as React.CSSProperties}/>
            <circle className="lp-lead-dot" cx={l.dot[0]} cy={l.dot[1]} r={3}
                    style={{ '--d': `${start + step * (i + 1)}ms` } as React.CSSProperties}/>
          </g>
        ))}
      </svg>

      <div className="lp-anno-pos" style={{ left: card.x + card.w / 2, top: dimY, transform: 'translate(-50%, -50%)' }}>
        <div className="lp-lead-label" style={{ '--d': `${start + 300}ms` } as React.CSSProperties}>
          <Chip xs fontMono accent>{width}px</Chip>
        </div>
      </div>
      {leads.map((l, i) => (
        <div key={l.key} className="lp-anno-pos"
             style={{ left: l.at[0], top: l.at[1], transform: l.side === 'l' ? 'translate(-100%, -50%)' : 'translate(0, -50%)' }}>
          <div className="lp-lead-label" style={{ '--d': `${start + step * (i + 1) + 380}ms` } as React.CSSProperties}>
            <Chip xs fontMono accent>{l.label}</Chip>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [redlines, setRedlines] = useState(true);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const wrap = cardRef.current;
    if (!stage || !wrap) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) { setGeo(null); return; }
    const o = stage.getBoundingClientRect();
    const q = (k: string) => wrap.querySelector(`[data-anno="${k}"]`);
    const card = boxOf(q('card'), o);
    const img = boxOf(q('img'), o);
    const chip = boxOf(q('chip'), o);
    const adopt = boxOf(q('adopt'), o);
    const more = boxOf(q('more'), o);
    const code = boxOf(stage.querySelector('.lp-code'), o);
    if (card && img && chip && adopt && more && code) setGeo({ card, img, chip, adopt, more, code });
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    // fires once on observe, then on every resize of the stage
    const ro = new ResizeObserver(() => measure());
    ro.observe(stage);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, [measure]);

  const card =
    <Card sm row mobileStack noPadding noGap overflowHidden data-anno="card">
      <Img sm sharp src={dog.image} alt="" width={188} height={188} className="max-mobile:w-full" data-anno="img"/>
      <Stack sm>
        <Row justifyBetween>
          <Title tag="p">{dog.name}</Title>
          <Chip sm fontBold data-anno="chip">{dog.gender}</Chip>
        </Row>
        <Divider />
        <Text sm>{dog.description}</Text>
        <Row sm mobileStack justifyEnd>
          <Button filled className="max-mobile:w-full" data-anno="adopt">Adopt</Button>
          <Button secondary className="max-mobile:w-full" data-anno="more">Learn more</Button>
        </Row>
      </Stack>
    </Card>;

  return (
    <>
      {/* Headline block */}
      <FrameRow top={false} label="Introduction">
        <Stack lg flexNoWrap itemsCenter className="pt-16 pb-14 max-tablet:pt-14 max-mobile:pt-12 max-mobile:pb-12">
          <Reveal>
            <Button pill fontNormal tag={Link} href={ANNOUNCEMENT.href} className="pl-1.5 max-w-full">
              <Badge xs accent filled>{ANNOUNCEMENT.tag}</Badge>
              <Text tag="span" inheritSize truncate>{ANNOUNCEMENT.text}</Text>
              <ArrowRight aria-hidden="true"/>
            </Button>
          </Reveal>
          <Reveal delay={60}>
            <PageTitle lg textCenter trackingTight>
              Deliver clean UI <br className="max-mobile:hidden"/>without complex code
            </PageTitle>
          </Reveal>
          <Reveal delay={120}>
            <Text lg tertiary textCenter className="max-w-[54ch]">{PRODUCT.description}</Text>
          </Reveal>
          <Reveal delay={180} className="max-mobile:w-full">
            <Row mobileStack itemsStretch>
              <Button md filled pill tag={Link} href="/docs/getting-started/installation" className="max-mobile:w-full">
                Get started <ArrowRight aria-hidden="true"/>
              </Button>
              <InstallBox command={INSTALL}/>
            </Row>
          </Reveal>
        </Stack>
      </FrameRow>

      {/* Stage: the live card over the code that builds it, with redlines */}
      <FrameRow label="Live example: a card and the code that builds it">
        <div ref={stageRef} className="relative">
          <div aria-hidden="true" className="lp-dots"/>
          {/* Figure caption and the redline switch */}
          <Row justifyBetween absolute className="inset-x-0 top-0 z-40 px-8 pt-6 max-tablet:px-6 max-mobile:px-4">
            <Row xs>
              <span aria-hidden="true" className="lp-sq"/>
              <Text xs fontMono uppercase trackingWidest tertiary>Fig. 01: live render</Text>
            </Row>
            <Label xs row itemsCenter tabletHide>
              <Switch xs checked={redlines} onChange={e => setRedlines(e.target.checked)}/>
              <Text tag="span" fontMono inheritSize>Redlines</Text>
            </Label>
          </Row>
          <Stack xl flexNoWrap itemsCenter relative className="pt-20 pb-16 max-tablet:pt-16 max-mobile:pt-14 max-mobile:pb-10">
            <div ref={cardRef} className="relative z-20 w-[36rem] max-w-full max-mobile:max-w-80">
              <div className="lp-card-shadow">
                <ThemeProvider mergeStrategy="replace">
                  {card}
                </ThemeProvider>
              </div>
              {/* design-tool selection box */}
              <div aria-hidden="true" hidden={!redlines} className="lp-select max-tablet:hidden">
                <span className="lp-handle lp-handle--tl"/>
                <span className="lp-handle lp-handle--tr"/>
                <span className="lp-handle lp-handle--bl"/>
                <span className="lp-handle lp-handle--br"/>
              </div>
            </div>
            {/* lg:mt-4 widens the gap below the card to 48px, so the Adopt redline runs clear of both */}
            <CodeBlock className="lp-code relative z-0 w-[38rem] max-w-full lg:mt-4 shadow-xl"
                       fileName="DogCard.tsx" language="tsx" code={CARD_CODE} prismTheme={inkCodeTheme}/>
          </Stack>
          {geo && redlines && <Redlines g={geo}/>}
        </div>
      </FrameRow>
    </>
  );
}
