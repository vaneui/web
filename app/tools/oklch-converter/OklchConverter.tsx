'use client';

import React from 'react';
import NextLink from 'next/link';
import { Badge, Button, Card, Col, Grid3, Link, Row, Text, Title } from '@vaneui/ui';
import { ToolShell } from '../ToolShell';
import { ColorField, CopyLinkButton, CopyValue, Slider } from '../_components/controls';
import { hexParam, useShareableState } from '../_components/useShareableState';
import {
  contrastRatio, formatRatio, inGamut, oklchToRgb, parseColor, toGamut, toHex, toHslString, toOklchString,
  toRgbString, WCAG, type Oklch,
} from '../../../lib/color/color';
import { STEPS, buildScale } from '../../../lib/color/theme';

// Written out, not parsed at load: the server and the browser can differ in the last digit of a float
const DEFAULT: Oklch = { l: 0.546, c: 0.215, h: 262.9 };
const MAX_CHROMA = 0.37;
const WHITE = { r: 1, g: 1, b: 1 };
const BLACK = { r: 0, g: 0, b: 0 };

/** `?oklch=54.6,0.245,262.9` (lightness in percent), or `?c=2563eb` */
function readColor(params: URLSearchParams, fallback: Oklch): Oklch {
  const raw = params.get('oklch');
  if (raw) {
    const [l, c, h] = raw.split(',').map(Number);
    if ([l, c, h].every(Number.isFinite)) {
      return { l: Math.min(Math.max(l / 100, 0), 1), c: Math.min(Math.max(c, 0), MAX_CHROMA), h: ((h % 360) + 360) % 360 };
    }
  }
  const c = hexParam(params.get('c'));
  return (c && parseColor(c)?.oklch) || fallback;
}

function writeColor(c: Oklch): URLSearchParams {
  const round = (n: number, d: number) => Number(n.toFixed(d));
  return new URLSearchParams({ oklch: [round(c.l * 100, 1), round(c.c, 3), round(c.h, 1)].join(',') });
}

const percent = (l: number) => `${(l * 100).toFixed(1)}%`;

export function OklchConverter() {
  const [color, setColor] = useShareableState(DEFAULT, readColor, writeColor);
  const fits = inGamut(color);
  const mapped = toGamut(color);
  const rgb = oklchToRgb(color);
  const hex = toHex(rgb);
  const css = toOklchString(color);
  const { l, c, h } = color;
  const scale = buildScale(color);

  const set = (patch: Partial<Oklch>) => setColor(prev => ({ ...prev, ...patch }));
  const cs = c.toFixed(3);
  const hs = h.toFixed(1);
  const hues = Array.from({ length: 13 }, (_, i) => `oklch(${percent(l)} ${cs} ${i * 30})`).join(', ');

  return (
    <ToolShell slug="oklch-converter" actions={<CopyLinkButton query={writeColor(color)} label="Copy link to this color"/>}>
      <Row xl itemsStart tabletStack>
        {/* Input and sliders */}
        <Col noShrink tabletWFull className="w-96">
          <Card>
            <ColorField label="Color" value={color} onChange={setColor} display={toOklchString}
                        description="Paste hex, rgb(), hsl() or oklch(), or pick one."/>
            {fits ? (
              <div aria-hidden="true" className="h-32 rounded-lg border border-(--color-border-primary)"
                   style={{ background: css }}/>
            ) : (
              <Row noGap overflowHidden rounded border aria-hidden="true" className="h-32">
                <Col flex1 justifyEnd className="h-full p-2" style={{ background: css }}>
                  <Badge xs className="w-fit">as written</Badge>
                </Col>
                <Col flex1 justifyEnd className="h-full p-2" style={{ background: hex }}>
                  <Badge xs className="w-fit">nearest sRGB</Badge>
                </Col>
              </Row>
            )}
            <Slider label="Lightness" value={l} min={0} max={1} step={0.001} format={percent}
                    onChange={v => set({ l: v })}
                    track={`linear-gradient(to right in oklch, oklch(0% ${cs} ${hs}), oklch(100% ${cs} ${hs}))`}/>
            <Slider label="Chroma" value={c} min={0} max={MAX_CHROMA} step={0.001} format={v => v.toFixed(3)}
                    onChange={v => set({ c: v })}
                    track={`linear-gradient(to right in oklch, oklch(${percent(l)} 0 ${hs}), oklch(${percent(l)} ${MAX_CHROMA} ${hs}))`}/>
            <Slider label="Hue" value={h} min={0} max={360} step={0.1} format={v => `${v.toFixed(1)}°`}
                    onChange={v => set({ h: v })}
                    track={`linear-gradient(to right, ${hues})`}/>
          </Card>
        </Col>

        {/* Output */}
        <Col lg flex1 tabletWFull className="min-w-0">
          <Card>
            <Row justifyBetween flexWrap>
              <Title sm tag="h2">Values</Title>
              <Badge success={fits} warning={!fits}>{fits ? 'Inside sRGB' : 'Outside sRGB'}</Badge>
            </Row>
            <Col noGap>
              <CopyValue label="OKLCH" value={css}/>
              <CopyValue label="HEX" value={hex}/>
              <CopyValue label="RGB" value={toRgbString(rgb)}/>
              <CopyValue label="HSL" value={toHslString(rgb)}/>
              <CopyValue label="CSS" value={`--color-brand: ${css};`}/>
            </Col>
            {!fits && (
              <Row justifyBetween flexWrap className="rounded-lg border border-(--color-border-warning) p-3">
                <Text sm className="min-w-0 flex-1">
                  Screens limited to sRGB can&apos;t show this chroma. HEX, RGB and HSL above use the nearest
                  sRGB color, <Text tag="span" sm fontMono>{toOklchString(mapped)}</Text>, which keeps the
                  lightness and hue.
                </Text>
                <Button sm type="button" warning onClick={() => setColor(mapped)}>Use the sRGB color</Button>
              </Row>
            )}
          </Card>

          <Card>
            <Title sm tag="h2">Contrast</Title>
            <Row mobileStack itemsStretch>
              {[{ name: 'On white', bg: WHITE, fg: '#ffffff' }, { name: 'On black', bg: BLACK, fg: '#000000' }].map(s => {
                const ratio = contrastRatio(rgb, s.bg);
                return (
                  <Row key={s.name} justifyBetween className="flex-1 rounded-lg border border-(--color-border-primary) p-3"
                       style={{ background: s.fg }}>
                    <Text lg fontSemibold style={{ color: hex }}>Aa {s.name.toLowerCase()}</Text>
                    <Badge success={ratio >= WCAG.text} warning={ratio >= WCAG.large && ratio < WCAG.text}
                           danger={ratio < WCAG.large}>{formatRatio(ratio)}</Badge>
                  </Row>
                );
              })}
            </Row>
            <Text sm secondary>
              Check this color against your own background in the{' '}
              <Link tag={NextLink} href={`/tools/contrast-checker?fg=${hex.slice(1)}`}>contrast checker</Link>.
            </Text>
          </Card>

          <Card>
            <Row justifyBetween flexWrap>
              <Title sm tag="h2">The same hue, 50 to 950</Title>
              <Button sm secondary tag={NextLink} href={`/tools/theme-generator?c=${toHex(oklchToRgb(mapped)).slice(1)}`}>
                Make a theme from it
              </Button>
            </Row>
            <Row noGap overflowHidden rounded>
              {STEPS.map(s => (
                <Col key={s} xs flex1 itemsCenter className="min-w-0 py-3" style={{ background: toOklchString(scale[s]) }}>
                  <Text xs fontMono style={{ color: scale[s].l > 0.6 ? '#111' : '#fff' }}>{s}</Text>
                </Col>
              ))}
            </Row>
            <Text sm secondary>
              Each step sits at a fixed lightness with your hue, so text on step 700 or darker passes 4.5:1 on white
              whatever the hue.
            </Text>
          </Card>
        </Col>
      </Row>

      <Grid3 tag="section" aria-label="What the numbers mean">
        <Col sm>
          <Title sm tag="h2">L: lightness</Title>
          <Text sm secondary>
            From 0% (black) to 100% (white), and close to how light the color looks. Two colors with the same L
            look equally light, which HSL lightness does not promise.
          </Text>
        </Col>
        <Col sm>
          <Title sm tag="h2">C: chroma</Title>
          <Text sm secondary>
            How colorful it is, from 0 (gray) up. sRGB screens reach about 0.32 at most and only for some hues;
            higher values need a wide-gamut screen.
          </Text>
        </Col>
        <Col sm>
          <Title sm tag="h2">H: hue</Title>
          <Text sm secondary>
            The angle on the color wheel in degrees: about 30 is red, 110 yellow, 145 green, 265 blue and 330 pink.
            Changing L or C keeps the hue.
          </Text>
        </Col>
      </Grid3>
    </ToolShell>
  );
}
