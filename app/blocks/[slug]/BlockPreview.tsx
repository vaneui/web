'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row, Text } from '@vaneui/ui';
import { useIsDark } from '../../utils/useIsDark';
import { BLOCK_THEMES, BLOCK_WIDTHS, blockPreviewHref, type BlockTheme } from '../blocks';

// The iframe is never shorter than this, so a block that fills the viewport (min-h-dvh) has room
const MIN_HEIGHT = 560;
// A ceiling, in case a block's height follows the viewport's in a loop
const MAX_HEIGHT = 8000;
// Until a width is chosen: the widest preset that fits the window, so a phone opens on the phone layout
const defaultWidth = (windowWidth: number) =>
  [...BLOCK_WIDTHS].reverse().find(preset => preset.width <= windowWidth)?.width ?? BLOCK_WIDTHS[0].width;
// The stage's 1px border on each side
const BORDER = 2;

type ThemeLabel = Record<BlockTheme, string>;
const THEME_LABEL: ThemeLabel = { light: 'Light', dark: 'Dark' };

/**
 * The block's preview page in an iframe, so its media queries see the chosen width. The iframe keeps
 * that width and is scaled down with a transform when the column is narrower. Its height follows the
 * content, read from the iframe's document (same origin).
 */
export function BlockPreview({ slug, name }: { slug: string; name: string }) {
  const siteDark = useIsDark();
  // Follows the site's theme until a theme button is pressed
  const [chosenTheme, setChosenTheme] = useState<BlockTheme | null>(null);
  const theme: BlockTheme = chosenTheme ?? (siteDark ? 'dark' : 'light');
  const [chosenWidth, setChosenWidth] = useState<number | null>(null);
  const [height, setHeight] = useState(MIN_HEIGHT);
  // The column's and the window's widths; null until measured, which is also when the iframe starts loading
  const [measured, setMeasured] = useState<{ available: number; window: number } | null>(null);
  const available = measured?.available ?? null;
  const width = chosenWidth ?? (measured ? defaultWidth(measured.window) : BLOCK_WIDTHS[BLOCK_WIDTHS.length - 1].width);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const src = blockPreviewHref(slug, theme);

  // A new width or theme starts again from the minimum height, so the next measurement starts from
  // the content and not from the old height (a block with min-h-dvh fills whatever it is given)
  const layout = `${width} ${src}`;
  const [measuredLayout, setMeasuredLayout] = useState(layout);
  if (measuredLayout !== layout) {
    setMeasuredLayout(layout);
    setHeight(MIN_HEIGHT);
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) =>
      setMeasured({ available: entry.contentRect.width, window: window.innerWidth }));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // Re-measured when the content resizes (fonts, a new width) and when the iframe itself does,
  // which lets the height shrink again after a narrow, tall width
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let observer: ResizeObserver | undefined;
    const attach = () => {
      observer?.disconnect();
      const doc = frame.contentDocument;
      const win = frame.contentWindow as (Window & typeof globalThis) | null;
      if (!doc?.body || !win || !doc.URL.endsWith(src)) return;
      const measure = () => {
        const content = Math.ceil(doc.documentElement.scrollHeight);
        setHeight(Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, content)));
      };
      observer = new win.ResizeObserver(measure);
      observer.observe(doc.documentElement);
      observer.observe(doc.body);
      measure();
    };
    frame.addEventListener('load', attach);
    // The document may have finished loading before this effect ran
    if (frame.contentDocument?.readyState === 'complete') attach();
    return () => {
      frame.removeEventListener('load', attach);
      observer?.disconnect();
    };
  }, [src]);

  const scale = available === null ? null : Math.min(1, (available - BORDER) / width);
  const shownAt = scale !== null && scale < 1 ? `, shown at ${Math.round(scale * 100)}%` : '';

  return (
    <Col noGap border rounded overflowHidden wFull>
      <Row justifyBetween flexWrap borderB className="px-4 py-2.5 max-mobile:px-3">
        <Row xs flexWrap role="group" aria-label="Preview width">
          {BLOCK_WIDTHS.map(preset => {
            const active = preset.width === width;
            return (
              <Button key={preset.width} xs filled={active} ghost={!active} secondary={!active} aria-pressed={active}
                      aria-label={`${preset.label} ${preset.width}px`} onClick={() => setChosenWidth(preset.width)}>
                {/* Phones show the number only, so the presets and the themes share one row */}
                <Text tag="span" inheritSize inheritColor mobileHide>{preset.label}</Text> {preset.width}
              </Button>
            );
          })}
        </Row>
        <Row xs role="group" aria-label="Preview theme">
          {BLOCK_THEMES.map(t => {
            const active = t === theme;
            return (
              <Button key={t} xs filled={active} ghost={!active} secondary={!active} aria-pressed={active}
                      onClick={() => setChosenTheme(t)}>
                {THEME_LABEL[t]}
              </Button>
            );
          })}
        </Row>
      </Row>

      {/* The preview on the site's dot-grid canvas */}
      <Col sm relative itemsCenter className="p-6 max-mobile:p-3">
        <div aria-hidden="true" className="lp-dots lp-dots--soft"/>
        <Text xs fontMono tertiary relative>{width}px{shownAt}</Text>
        <div ref={stageRef} className="relative w-full">
          <Col noGap border overflowHidden className="mx-auto"
               style={scale === null
                 ? { visibility: 'hidden', height: MIN_HEIGHT / 2 }
                 : { width: Math.floor(width * scale) + BORDER, height: Math.ceil(height * scale) + BORDER }}>
            <iframe ref={frameRef} src={available === null ? undefined : src}
                    title={`${name} block preview, ${width}px wide, ${THEME_LABEL[theme].toLowerCase()} theme`}
                    className="block shrink-0 origin-top-left border-0"
                    style={{ width, height, transform: scale === null || scale === 1 ? undefined : `scale(${scale})` }}/>
          </Col>
        </div>
      </Col>
    </Col>
  );
}
