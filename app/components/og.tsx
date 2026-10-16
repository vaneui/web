// Drawing kit for the generated social cards (Open Graph / Twitter) in the landing's blueprint style.
// ImageResponse renders with Satori: inline styles and flexbox only, no stylesheets, so VaneUI
// components can't render here. Colors are the landing tokens as hex (Satori has no oklch).
import React from 'react';

export const OG_SIZE = { width: 1200, height: 630 };

export const C = {
  ink: '#030712',        // gray-950, --color-text-primary on the landing
  text: '#101828',       // gray-900
  muted: '#4a5565',      // gray-600
  subtle: '#6a7282',     // gray-500
  line: '#e5e7eb',       // gray-200, rails and hairlines
  soft: '#f3f4f6',       // gray-100
  white: '#ffffff',
  cross: 'rgba(3, 7, 18, 0.4)',  // --lp-cross
  dot: 'rgba(3, 7, 18, 0.2)',    // --lp-dot
  mark: '#155dfc',       // blue-600, --lp-mark
  accent: '#1447e6',     // blue-700, accent text
  accentBg: '#eff6ff',   // blue-50
  accentLine: '#8ec5ff', // blue-300
};

/** Frame geometry: rails and the header hairline */
export const RAIL_L = 48;
export const RAIL_R = OG_SIZE.width - RAIL_L;
export const HEADER_H = 72;

// Font files are fetched from Google Fonts at build time (next/font/google already needs that
// network access). Satori takes TTF/OTF, which Google serves to a plain fetch.
async function googleFont(family: string, weight: number): Promise<ArrayBuffer> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}`,
  ).then(r => r.text());
  const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!src) throw new Error(`Social card font not found: ${family} ${weight}`);
  return fetch(src[1]).then(r => r.arrayBuffer());
}

type OgFont = { name: string; data: ArrayBuffer; weight: 400 | 500 | 600; style: 'normal' };
let fontsPromise: Promise<OgFont[]> | null = null;

/** Plus Jakarta Sans and JetBrains Mono, loaded once per build and shared by every card */
export function ogFonts(): Promise<OgFont[]> {
  fontsPromise ??= Promise.all(
    ([
      ['Plus Jakarta Sans', 400], ['Plus Jakarta Sans', 500], ['Plus Jakarta Sans', 600],
      ['JetBrains Mono', 400], ['JetBrains Mono', 500],
    ] as const).map(async ([name, weight]) => ({
      name, weight, style: 'normal' as const, data: await googleFont(name, weight),
    })),
  );
  return fontsPromise;
}

export const SANS = 'Plus Jakarta Sans';
export const MONO = 'JetBrains Mono';

/** The VaneUI mark, same path as the header logo */
export function LogoMark({ width = 40, color = C.text }: { width?: number; color?: string }) {
  return (
    <svg width={width} height={(width * 6) / 8} viewBox="0 0 8 6" fill="none">
      <path
        d="M0 0H1.38197C1.76074 0 2.107 0.214002 2.27639 0.552786L3.72361 3.44721C3.893 3.786 4.23926 4 4.61803 4H6L4.44721 0.894427C4.24175 0.483495 4.54056 0 5 0V0H8L6 4L5.27639 5.44721C5.107 5.786 4.76074 6 4.38197 6H3.61803C3.23926 6 2.893 5.786 2.72361 5.44721L0 0Z"
        fill={color}/>
    </svg>
  );
}

/** "+" where a hairline crosses a rail, centered on (x, y) */
export function Cross({ x, y }: { x: number; y: number }) {
  return (
    <div style={{ position: 'absolute', left: x - 6, top: y - 6, width: 13, height: 13, display: 'flex' }}>
      <div style={{ position: 'absolute', left: 6, top: 0, width: 1, height: 13, background: C.cross }}/>
      <div style={{ position: 'absolute', left: 0, top: 6, width: 13, height: 1, background: C.cross }}/>
    </div>
  );
}

/** Full-width hairline at y, with crosshairs on both rails */
export function Hairline({ y }: { y: number }) {
  return (
    <>
      <div style={{ position: 'absolute', left: 0, top: y, width: OG_SIZE.width, height: 1, background: C.line }}/>
      <Cross x={RAIL_L} y={y}/>
      <Cross x={RAIL_R} y={y}/>
    </>
  );
}

/** Dot grid of the landing's figure canvases, fading out towards the edges like `.lp-dots` */
export function Dots({ left, top, width, height }: { left: number; top: number; width: number; height: number }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <pattern id="d" width="16" height="16" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1.1" fill="${C.ink}" fill-opacity="0.22"/>
      </pattern>
      <radialGradient id="f" cx="50%" cy="45%" r="62%">
        <stop offset="35%" stop-color="#fff"/>
        <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <mask id="m"><rect width="${width}" height="${height}" fill="url(#f)"/></mask>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#d)" mask="url(#m)"/>
  </svg>`;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- Satori draws plain img elements
    <img alt="" width={width} height={height} style={{ position: 'absolute', left, top }}
         src={`data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`}/>
  );
}

/** Mono, uppercase, wide-tracked label with the accent square, like the landing eyebrows */
export function Eyebrow({ children, size = 15 }: { children: string; size?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 7, height: 7, background: C.mark }}/>
      <div style={{ fontFamily: MONO, fontSize: size, letterSpacing: size * 0.18, textTransform: 'uppercase', color: C.subtle }}>
        {children}
      </div>
    </div>
  );
}

/**
 * The page skeleton every card shares: white canvas, rails, the header row with the logo and
 * the site address, and the hairline under it.
 */
export function Frame({ children, right = 'vaneui.com' }: { children: React.ReactNode; right?: string }) {
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%', display: 'flex',
      background: C.white, fontFamily: SANS, color: C.ink,
    }}>
      {/* rails */}
      <div style={{ position: 'absolute', left: RAIL_L, top: 0, width: 1, height: OG_SIZE.height, background: C.line }}/>
      <div style={{ position: 'absolute', left: RAIL_R, top: 0, width: 1, height: OG_SIZE.height, background: C.line }}/>
      {children}
      {/* header row */}
      <div style={{
        position: 'absolute', left: RAIL_L + 1, top: 0, width: RAIL_R - RAIL_L - 1, height: HEADER_H,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px',
        background: C.white,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LogoMark width={44}/>
          <div style={{ fontSize: 30, fontWeight: 500, letterSpacing: -0.6, color: C.text }}>VaneUI</div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 20, color: C.subtle }}>{right}</div>
      </div>
      <Hairline y={HEADER_H}/>
    </div>
  );
}
