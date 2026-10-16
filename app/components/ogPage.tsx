// Social card for a page that isn't the landing: an eyebrow, the page name, and a description.
import React from 'react';
import { C, Eyebrow, Frame, HEADER_H, OG_SIZE, RAIL_L, RAIL_R } from './og';

/** Page names run from "Card" to "Typography Components"; keep the longest on one line */
function nameSize(name: string): number {
  if (name.length <= 12) return 128;
  if (name.length <= 17) return 108;
  if (name.length <= 21) return 90;
  return 74;
}

export function PageCard({ eyebrow, name, description, right }: {
  eyebrow: string;
  name: string;
  description: string;
  /** Address shown at the right of the header row */
  right: string;
}) {
  const size = nameSize(name);
  return (
    <Frame right={right}>
      <div style={{
        position: 'absolute', left: RAIL_L + 1, top: HEADER_H + 1, width: RAIL_R - RAIL_L - 1, height: OG_SIZE.height - HEADER_H - 1,
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px 12px',
      }}>
        <Eyebrow size={17}>{eyebrow}</Eyebrow>
        <div style={{ marginTop: 28, fontSize: size, fontWeight: 600, letterSpacing: -size * 0.03, lineHeight: 1.0, color: C.ink }}>
          {name}
        </div>
        <div style={{ marginTop: 36, maxWidth: 1000, fontSize: 28, lineHeight: 1.5, color: C.muted }}>
          {description}
        </div>
      </div>
    </Frame>
  );
}
