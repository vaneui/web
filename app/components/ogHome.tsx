// The site-wide social card: the landing hero above its "Fig. 01" live card with redlines.
import React from 'react';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { C, Dots, Eyebrow, Frame, HEADER_H, Hairline, MONO, OG_SIZE, RAIL_L, RAIL_R } from './og';
import { dog } from '../landing/data/dog';

const STAGE_Y = 300;

// Card geometry, so the redlines can point at its parts
const W = 510;
const H = 188;
const X = (OG_SIZE.width - W) / 2;
const Y = 382;
const PAD = 16;
const ADOPT_W = 68;
const MORE_W = 104;
const BTN_H = 32;
const GUTTER = 36;
// first two sentences of the landing card's text
const CARD_TEXT = dog.description.split('. ').slice(0, 2).join('. ') + '.';

/** Small mono accent chip, like `Chip xs fontMono accent` on the landing */
function Tag({ children }: { children: string }) {
  return (
    <div style={{
      display: 'flex', fontFamily: MONO, fontSize: 13, lineHeight: 1, color: C.accent,
      background: C.accentBg, border: `1px solid ${C.accentLine}`, borderRadius: 3, padding: '3px 6px',
    }}>
      {children}
    </div>
  );
}

function HLine({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <div style={{ position: 'absolute', left: Math.min(x1, x2), top: y, width: Math.abs(x2 - x1), height: 1, background: C.mark }}/>;
}

function VLine({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return <div style={{ position: 'absolute', left: x, top: Math.min(y1, y2), width: 1, height: Math.abs(y2 - y1), background: C.mark }}/>;
}

function Dot({ x, y }: { x: number; y: number }) {
  return <div style={{ position: 'absolute', left: x - 3.5, top: y - 3.5, width: 8, height: 8, borderRadius: 4, background: C.white, border: `1px solid ${C.mark}` }}/>;
}

/** Label pinned at (x, y): right-aligned to x on the left side, left-aligned from x on the right */
function Label({ x, y, side, children }: { x: number; y: number; side: 'l' | 'r'; children: string }) {
  const box = 260;
  return (
    <div style={{
      position: 'absolute', top: y - 11, height: 22, width: box, display: 'flex', alignItems: 'center',
      left: side === 'l' ? x - box : x, justifyContent: side === 'l' ? 'flex-end' : 'flex-start',
    }}>
      <Tag>{children}</Tag>
    </div>
  );
}

function Handle({ x, y }: { x: number; y: number }) {
  return <div style={{ position: 'absolute', left: x - 4, top: y - 4, width: 8, height: 8, background: C.white, border: `1px solid ${C.mark}` }}/>;
}

function DogCard({ image }: { image: string }) {
  return (
    <div style={{
      position: 'absolute', left: X, top: Y, width: W, height: H, display: 'flex',
      background: C.white, border: `1px solid ${C.line}`, borderRadius: 16, overflow: 'hidden',
      boxShadow: '0 1px 2px rgba(0,0,0,0.04), 0 12px 24px -8px rgba(0,0,0,0.10), 0 32px 64px -24px rgba(0,0,0,0.18)',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element -- Satori draws plain img elements */}
      <img src={image} width={H} height={H} alt="" style={{ width: H, height: H, objectFit: 'cover' }}/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: PAD, gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 30 }}>
          <div style={{ fontSize: 23, fontWeight: 600, letterSpacing: -0.25, color: C.ink }}>{dog.name}</div>
          <div style={{
            display: 'flex', fontSize: 13, fontWeight: 600, color: C.ink, background: C.soft,
            border: `1px solid ${C.line}`, borderRadius: 6, padding: '1px 6px',
          }}>{dog.gender}</div>
        </div>
        <div style={{ display: 'flex', alignSelf: 'stretch', height: 1, borderTop: `1px solid ${C.line}` }}/>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: C.ink }}>{CARD_TEXT}</div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 'auto' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: ADOPT_W, height: BTN_H,
            borderRadius: 8, background: C.ink, color: C.white, fontSize: 15, fontWeight: 500,
          }}>Adopt</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: MORE_W, height: BTN_H,
            borderRadius: 8, border: `1px solid ${C.line}`, color: '#364153', fontSize: 15, fontWeight: 500,
          }}>Learn more</div>
        </div>
      </div>
    </div>
  );
}

/** Thin accent leader lines naming the props behind each part of the card, as in the hero */
function Redlines() {
  const left = X - GUTTER;
  const right = X + W + GUTTER;
  const bottom = Y + H;
  const dimY = Y - 26;
  const imgY = Y + 44;
  // higher than on the landing, so the domain badge X lays over the image corner doesn't cover it
  const cardY = bottom - 64;
  const chipY = Y + PAD + 15;
  const btnY = bottom - PAD - BTN_H / 2;
  const moreR = X + W - PAD;
  const adoptX = moreR - MORE_W - 8 - ADOPT_W / 2;
  const adoptY = bottom + 30;
  return (
    <>
      {/* dimension line with end ticks */}
      <HLine x1={X} x2={X + W} y={dimY}/>
      <VLine x={X} y1={dimY - 5} y2={dimY + 6}/>
      <VLine x={X + W} y1={dimY - 5} y2={dimY + 6}/>
      <div style={{ position: 'absolute', left: X, top: dimY - 11, width: W, height: 22, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', background: C.white }}><Tag>{`${W}px`}</Tag></div>
      </div>

      <HLine x1={X + 30} x2={left} y={imgY}/><Dot x={X + 30} y={imgY}/>
      <Label x={left} y={imgY} side="l">Img sm sharp</Label>

      <HLine x1={X} x2={left} y={cardY}/><Dot x={X} y={cardY}/>
      <Label x={left} y={cardY} side="l">Card sm row</Label>

      <HLine x1={moreR} x2={right} y={chipY}/><Dot x={moreR} y={chipY}/>
      <Label x={right} y={chipY} side="r">Chip sm fontBold</Label>

      <HLine x1={moreR} x2={right} y={btnY}/><Dot x={moreR} y={btnY}/>
      <Label x={right} y={btnY} side="r">Button secondary</Label>

      <VLine x={adoptX} y1={bottom - PAD} y2={adoptY}/>
      <HLine x1={adoptX} x2={right} y={adoptY}/><Dot x={adoptX} y={bottom - PAD}/>
      <Label x={right} y={adoptY} side="r">Button filled</Label>

      {/* design-tool selection box */}
      <div style={{ position: 'absolute', left: X - 1, top: Y - 1, width: W + 2, height: H + 2, border: `1px solid ${C.mark}`, borderRadius: 2 }}/>
      <Handle x={X - 1} y={Y - 1}/>
      <Handle x={X + W + 1} y={Y - 1}/>
      <Handle x={X - 1} y={Y + H + 1}/>
      <Handle x={X + W + 1} y={Y + H + 1}/>
    </>
  );
}

export async function puppyDataUrl(): Promise<string> {
  const png = await readFile(join(process.cwd(), 'public', 'puppy.png'));
  return `data:image/png;base64,${png.toString('base64')}`;
}

export function HomeCard({ image }: { image: string }) {
  const [line1, line2] = ['Deliver clean UI', 'without complex code'];
  return (
    <Frame>
      {/* stage canvas */}
      <Dots left={RAIL_L + 1} top={STAGE_Y + 1} width={RAIL_R - RAIL_L - 1} height={OG_SIZE.height - STAGE_Y - 1}/>

      {/* headline */}
      <div style={{
        position: 'absolute', left: RAIL_L, top: HEADER_H, width: RAIL_R - RAIL_L, height: STAGE_Y - HEADER_H,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontSize: 70, fontWeight: 600, letterSpacing: -1.9, lineHeight: 1.02, color: C.ink,
      }}>
        <div>{line1}</div>
        <div>{line2}</div>
      </div>
      <Hairline y={STAGE_Y}/>

      <div style={{ position: 'absolute', left: RAIL_L + 40, top: STAGE_Y + 24, display: 'flex' }}>
        <Eyebrow size={13}>Fig. 01: live render</Eyebrow>
      </div>
      <DogCard image={image}/>
      <Redlines/>
    </Frame>
  );
}
