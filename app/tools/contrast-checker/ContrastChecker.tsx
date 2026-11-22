'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';
import { Badge, Button, Card, Col, IconButton, Label, Row, SectionTitle, Switch, Text, Title } from '@vaneui/ui';
import { ToolShell } from '../ToolShell';
import { CodeTabs, ColorField, CopyLinkButton, Segmented } from '../_components/controls';
import { hexParam, useShareableState } from '../_components/useShareableState';
import {
  contrastRatio, fixContrast, formatRatio, oklchToRgb, parseColor, rgbToOklch, shownPair, toHex, toOklchString, toRgb8,
  WCAG, type Oklch, type Rgb,
} from '../../../lib/color/color';

type Scheme = 'light' | 'dark';
/** Text and background colors, each with its alpha (1 is opaque) */
interface Pair { fg: Oklch; bg: Oklch; fgAlpha: number; bgAlpha: number }
interface Settings { light: Pair; dark: Pair; both: boolean }

const color = (hex: string) => parseColor(hex)!.oklch;

const DEFAULTS: Settings = {
  light: { fg: color('#6d28d9'), bg: color('#ffffff'), fgAlpha: 1, bgAlpha: 1 },
  dark: { fg: color('#a78bfa'), bg: color('#030712'), fgAlpha: 1, bgAlpha: 1 },
  both: true,
};

/** What a translucent background is checked over: a white page in light mode, a black one in dark */
const PAGE: Record<Scheme, { rgb: Rgb; name: string }> = {
  light: { rgb: { r: 1, g: 1, b: 1 }, name: 'white' },
  dark: { rgb: { r: 0, g: 0, b: 0 }, name: 'black' },
};

const PARAMS: Record<Scheme, { fg: string; bg: string }> = {
  light: { fg: 'fg', bg: 'bg' },
  dark: { fg: 'dfg', bg: 'dbg' },
};

/** `?fg=6d28d9&bg=ffffff&dfg=a78bfa&dbg=030712` (8 digits with an alpha), and `dark=0` for one scheme only */
function readSettings(params: URLSearchParams, d: Settings): Settings {
  const pick = (key: string, fallback: Oklch, fallbackAlpha: number) => {
    const raw = hexParam(params.get(key));
    const parsed = raw ? parseColor(raw) : null;
    return parsed ? { color: parsed.oklch, alpha: parsed.alpha } : { color: fallback, alpha: fallbackAlpha };
  };
  const pair = (s: Scheme): Pair => {
    const fg = pick(PARAMS[s].fg, d[s].fg, d[s].fgAlpha);
    const bg = pick(PARAMS[s].bg, d[s].bg, d[s].bgAlpha);
    return { fg: fg.color, bg: bg.color, fgAlpha: fg.alpha, bgAlpha: bg.alpha };
  };
  return { light: pair('light'), dark: pair('dark'), both: params.get('dark') !== '0' };
}

const hexOf = (c: Oklch, alpha = 1) => toHex(oklchToRgb(c), alpha);

function writeSettings(s: Settings): URLSearchParams {
  const params = new URLSearchParams();
  for (const scheme of ['light', 'dark'] as const) {
    params.set(PARAMS[scheme].fg, hexOf(s[scheme].fg, s[scheme].fgAlpha).slice(1));
    params.set(PARAMS[scheme].bg, hexOf(s[scheme].bg, s[scheme].bgAlpha).slice(1));
  }
  if (!s.both) params.set('dark', '0');
  return params;
}

/** The WCAG 2.2 success criteria a single ratio decides */
const LEVELS = [
  { label: 'Normal text', level: 'AA', min: WCAG.text, note: '1.4.3' },
  { label: 'Large text', level: 'AA', min: WCAG.large, note: '1.4.3, 24px or 18.66px bold' },
  { label: 'Interface parts', level: 'AA', min: WCAG.large, note: '1.4.11, borders, icons, focus rings' },
  { label: 'Normal text', level: 'AAA', min: WCAG.textAAA, note: '1.4.6' },
  { label: 'Large text', level: 'AAA', min: WCAG.largeAAA, note: '1.4.6' },
];

function PairCard({ scheme, pair, onChange }: { scheme: Scheme; pair: Pair; onChange: (p: Pair) => void }) {
  // The colors as the screen shows them and their hex writes them, so the ratio is the one the link reopens.
  // Translucent colors are blended first: the text over the background, the background over the page.
  const page = PAGE[scheme];
  const { fg: fgRgb, bg: bgRgb } = shownPair(pair.fg, pair.fgAlpha, pair.bg, pair.bgAlpha, page.rgb);
  const ratio = contrastRatio(fgRgb, bgRgb);
  // A translucent text color is fixed from the color it shows as, and the suggestion is opaque
  const fixed = ratio < WCAG.text ? fixContrast(pair.fgAlpha < 1 ? rgbToOklch(fgRgb) : pair.fg, bgRgb, WCAG.text) : null;
  const fg = toHex(fgRgb);
  const bg = toHex(bgRgb);
  const name = scheme === 'light' ? 'Light' : 'Dark';
  const opacity = (alpha: number) => `${Math.round(alpha * 100)}%`;

  return (
    <Card className="min-w-0 flex-1">
      <Row justifyBetween>
        <Title sm tag="h2">{name} mode</Title>
        <IconButton xs ghost secondary type="button" aria-label={`Swap ${name.toLowerCase()} text and background`}
                    onClick={() => onChange({ fg: pair.bg, bg: pair.fg, fgAlpha: pair.bgAlpha, bgAlpha: pair.fgAlpha })}>
          <RefreshCw aria-hidden="true"/>
        </IconButton>
      </Row>
      <Row sm itemsStart mobileStack>
        <Col flex1 mobileWFull className="min-w-0">
          <ColorField label="Text" value={pair.fg} alpha={pair.fgAlpha}
                      onChange={(c, a) => onChange({ ...pair, fg: c, fgAlpha: a })}
                      description={pair.fgAlpha < 1 ? `At ${opacity(pair.fgAlpha)} opacity it shows as ${fg} on this background, and that is the color checked.` : undefined}/>
        </Col>
        <Col flex1 mobileWFull className="min-w-0">
          <ColorField label="Background" value={pair.bg} alpha={pair.bgAlpha}
                      onChange={(c, a) => onChange({ ...pair, bg: c, bgAlpha: a })}
                      description={pair.bgAlpha < 1 ? `At ${opacity(pair.bgAlpha)} opacity it shows as ${bg} on a ${page.name} page, and that is the color checked.` : undefined}/>
        </Col>
      </Row>

      <Col sm className="rounded-lg border border-(--color-border-primary) p-5" style={{ background: bg, color: fg, '--text-color': fg } as React.CSSProperties}>
        <Row justifyBetween itemsEnd>
          <SectionTitle tag="p" aria-hidden="true">Aa</SectionTitle>
          <SectionTitle tag="p">{formatRatio(ratio)}</SectionTitle>
        </Row>
        <Text lg fontSemibold>Large text reads at 3:1.</Text>
        <Text sm>Body text at 14 to 16px needs 4.5:1 to pass WCAG AA.</Text>
        <Row xs>
          <span aria-hidden="true" className="size-5 rounded-full border-2" style={{ borderColor: fg }}/>
          <Text xs>Icons and borders need 3:1.</Text>
        </Row>
      </Col>

      <Col noGap>
        {LEVELS.map(l => {
          const pass = ratio >= l.min;
          return (
            <Row key={l.label + l.level + l.note} justifyBetween borderB className="py-1.5 last:border-b-0">
              <Col noGap className="min-w-0">
                <Text sm>{l.label} <Text tag="span" sm tertiary>{l.level}</Text></Text>
                <Text xs tertiary truncate>{l.note}</Text>
              </Col>
              <Badge xs success={pass} danger={!pass}>{pass ? `Pass ${l.min}:1` : `Below ${l.min}:1`}</Badge>
            </Row>
          );
        })}
      </Col>

      {fixed && (
        <Row justifyBetween flexWrap className="rounded-lg border border-(--color-border-primary) p-3">
          <Row xs className="min-w-0">
            <span aria-hidden="true" className="size-5 shrink-0 rounded border border-(--color-border-primary)"
                  style={{ background: hexOf(fixed) }}/>
            <Text sm>
              Nearest text color that passes AA: <Text tag="span" sm fontMono>{hexOf(fixed)}</Text>{' '}
              ({formatRatio(contrastRatio(toRgb8(oklchToRgb(fixed)), bgRgb))})
            </Text>
          </Row>
          <Button sm type="button" onClick={() => onChange({ ...pair, fg: fixed, fgAlpha: 1 })}>Use it</Button>
        </Row>
      )}
    </Card>
  );
}

const FORMATS = [
  { value: 'hex', label: 'Hex' },
  { value: 'oklch', label: 'OKLCH' },
] as const;

/** The pair's text and background as CSS values, each with its alpha */
function written(p: Pair, format: 'hex' | 'oklch') {
  const f = (c: Oklch, alpha: number) => (format === 'hex' ? hexOf(c, alpha) : toOklchString(c, alpha));
  return { fg: f(p.fg, p.fgAlpha), bg: f(p.bg, p.bgAlpha) };
}

function cssFor(s: Settings, format: 'hex' | 'oklch'): string {
  const light = written(s.light, format);
  const dark = written(s.dark, format);
  if (!s.both) {
    return [
      '.card {',
      `  color: ${light.fg};`,
      `  background-color: ${light.bg};`,
      '}',
      '',
    ].join('\n');
  }
  return [
    '/* light-dark() picks a side from color-scheme */',
    ':root {',
    '  color-scheme: light dark;',
    '}',
    '',
    '.card {',
    `  color: light-dark(${light.fg}, ${dark.fg});`,
    `  background-color: light-dark(${light.bg}, ${dark.bg});`,
    '}',
    '',
  ].join('\n');
}

function tokensFor(s: Settings, format: 'hex' | 'oklch'): string {
  const light = written(s.light, format);
  const dark = written(s.dark, format);
  const lines = [
    '/* Custom properties, one value per scheme */',
    ':root {',
    `  --text: ${light.fg};`,
    `  --surface: ${light.bg};`,
    '}',
  ];
  if (s.both) {
    lines.push(
      '',
      '@media (prefers-color-scheme: dark) {',
      '  :root {',
      `    --text: ${dark.fg};`,
      `    --surface: ${dark.bg};`,
      '  }',
      '}',
    );
  }
  return `${lines.join('\n')}\n`;
}

export function ContrastChecker() {
  const [settings, setSettings] = useShareableState(DEFAULTS, readSettings, writeSettings);
  const [format, setFormat] = useState<'hex' | 'oklch'>('hex');
  const schemes: Scheme[] = settings.both ? ['light', 'dark'] : ['light'];
  const setPair = (scheme: Scheme) => (pair: Pair) => setSettings(s => ({ ...s, [scheme]: pair }));

  const tabs = [
    { id: 'light-dark', label: 'light-dark()', language: 'css', fileName: 'styles.css', code: cssFor(settings, format) },
    { id: 'props', label: 'Custom properties', language: 'css', fileName: 'tokens.css', code: tokensFor(settings, format) },
  ];

  return (
    <ToolShell slug="contrast-checker" actions={<CopyLinkButton query={writeSettings(settings)} label="Copy link to these colors"/>}>
      <Row justifyBetween flexWrap>
        <Label row>
          <Switch checked={settings.both} onChange={e => setSettings(s => ({ ...s, both: e.target.checked }))}/>
          Check dark mode too
        </Label>
      </Row>
      <Row itemsStretch tabletStack>
        {schemes.map(s => <PairCard key={s} scheme={s} pair={settings[s]} onChange={setPair(s)}/>)}
      </Row>
      <Card>
        <Row justifyBetween flexWrap>
          <Title sm tag="h2">Copy as CSS</Title>
          <Segmented label="Color format" options={FORMATS} value={format} onChange={setFormat}/>
        </Row>
        <CodeTabs label="CSS format" tabs={tabs}/>
      </Card>
    </ToolShell>
  );
}
