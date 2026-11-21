'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Col } from '@vaneui/ui';
import { BlockRender } from './BlockRender';

// The thumbnail's shape: the block is laid out in a box of this ratio, then scaled to the card
const ASPECT = 10 / 16;

/**
 * The width the block is laid out at. Media queries follow the window, not the box, so below
 * VaneUI's tablet and mobile breakpoints the block already has its smaller layout: it is laid out
 * at the widest width of that layout, where it looks as it does on a real screen.
 */
function layoutWidth() {
  if (window.matchMedia('(width < 48rem)').matches) return 760;
  if (window.matchMedia('(width < 64rem)').matches) return 1000;
  return 1280;
}

/**
 * A live, scaled-down copy of a block: decoration only, so it is hidden from assistive technology,
 * inert and never takes the pointer. It mounts once the card's width is known, so it never shows
 * at the wrong scale and its demo text stays out of the page's server HTML.
 */
export function BlockThumb({ slug }: { slug: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ width: number; scale: number } | null>(null);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    // The box resizes with the window, which is also when the breakpoint can change
    const observer = new ResizeObserver(([entry]) => {
      const width = layoutWidth();
      setFit({ width, scale: entry.contentRect.width / width });
    });
    observer.observe(box);
    return () => observer.disconnect();
  }, []);

  return (
    <Col ref={boxRef} noGap border rounded overflowHidden relative aria-hidden="true" className="aspect-[16/10]">
      {fit !== null && (
        // A block that fills the viewport (min-h-dvh) fills the box instead, so a centered card stays in view
        <div inert className="pointer-events-none absolute top-0 left-0 origin-top-left select-none [&_.min-h-dvh]:min-h-full"
             style={{ width: fit.width, height: Math.round(fit.width * ASPECT), transform: `scale(${fit.scale})` }}>
          <BlockRender slug={slug}/>
        </div>
      )}
    </Col>
  );
}
