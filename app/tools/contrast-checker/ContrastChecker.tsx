'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'react-feather';
import { Badge, Button, Card, Col, IconButton, Label, Row, SectionTitle, Switch, Text, Title } from '@vaneui/ui';
import { ToolShell } from '../ToolShell';
import { CodeTabs, ColorField, CopyLinkButton, Segmented } from '../_components/controls';
import { hexParam, useShareableState } from '../_components/useShareableState';
import {
  contrastRatio, fixContrast, formatRatio, oklchToRgb, parseColor, toHex, toOklchString, toRgb8, WCAG, type Oklch,
} from '../../../lib/color/color';

type Scheme = 'light' | 'dark';
interface Pair { fg: Oklch; bg: Oklch }
interface Settings { light: Pair; dark: Pair; both: boolean }

const color = (hex: string) => parseColor(hex)!.oklch;

const DEFAULTS: Settings = {
  light: { fg: color('#6d28d9'), bg: color('#ffffff') },
  dark: { fg: color('#a78bfa'), bg: color('#030712') },
  both: true,
};

const PARAMS: Record<Scheme, { fg: string; bg: string }> = {
  light: { fg: 'fg', bg: 'bg' },
  dark: { fg: 'dfg', bg: 'dbg' },
};

/** `?fg=6d28d9&bg=ffffff&dfg=a78bfa&dbg=030712`, and `dark=0` for one scheme only */
function readSettings(params: URLSearchParams, d: Settings): Settings {
  const pick = (key: string, fallback: Oklch) => {
    const raw = hexParam(params.get(key));
    return (raw && parseColor(raw)?.oklch) || fallback;
  };
  const pair = (s: Scheme): Pair => ({ fg: pick(PARAMS[s].fg, d[s].fg), bg: pick(PARAMS[s].bg, d[s].bg) });
  return { light: pair('light'), dark: pair('dark'), both: params.get('dark') !== '0' };
}

const hexOf = (c: Oklch) => toHex(oklchToRgb(c));

function writeSettings(s: Settings): URLSearchParams {
  const params = new URLSearchParams();
  for (const scheme of ['light', 'dark'] as const) {
    params.set(PARAMS[scheme].fg, hexOf(s[scheme].fg).slice(1));
    params.set(PARAMS[scheme].bg, hexOf(s[scheme].bg).slice(1));
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
  // The colors as the screen shows them and their hex writes them, so the ratio is the one the link reopens
  const fgRgb = toRgb8(oklchToRgb(pair.fg));
  const bgRgb = toRgb8(oklchToRgb(pair.bg));
  const ratio = contrastRatio(fgRgb, bgRgb);
  const fixed = ratio < WCAG.text ? fixContrast(pair.fg, bgRgb, WCAG.text) : null;
  const fg = hexOf(pair.fg);
  const bg = hexOf(pair.bg);
  const name = scheme === 'light' ? 'Light' : 'Dark';

  return (
    <Card className="min-w-0 flex-1">
      <Row justifyBetween>
        <Title sm tag="h2">{name} mode</Title>
        <IconButton xs ghost secondary type="button" aria-label={`Swap ${name.toLowerCase()} text and background`}
                    onClick={() => onChange({ fg: pair.bg, bg: pair.fg })}>
          <RefreshCw aria-hidden="true"/>
        </IconButton>
      </Row>
      <Row sm itemsStart mobileStack>
        <Col flex1 mobileWFull className="min-w-0">
          <ColorField label="Text" value={pair.fg} onChange={c => onChange({ ...pair, fg: c })}/>
        </Col>
        <Col flex1 mobileWFull className="min-w-0">
          <ColorField label="Background" value={pair.bg} onChange={c => onChange({ ...pair, bg: c })}/>
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
          <Button sm type="button" onClick={() => onChange({ ...pair, fg: fixed })}>Use it</Button>
        </Row>
      )}
    </Card>
  );
}

const FORMATS = [
  { value: 'hex', label: 'Hex' },
  { value: 'oklch', label: 'OKLCH' },
] as const;

function cssFor(s: Settings, format: 'hex' | 'oklch'): string {
  const f = (c: Oklch) => (format === 'hex' ? hexOf(c) : toOklchString(c));
  if (!s.both) {
    return [
      '.card {',
      `  color: ${f(s.light.fg)};`,
      `  background-color: ${f(s.light.bg)};`,
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
    `  color: light-dark(${f(s.light.fg)}, ${f(s.dark.fg)});`,
    `  background-color: light-dark(${f(s.light.bg)}, ${f(s.dark.bg)});`,
    '}',
    '',
  ].join('\n');
}

function tokensFor(s: Settings, format: 'hex' | 'oklch'): string {
  const f = (c: Oklch) => (format === 'hex' ? hexOf(c) : toOklchString(c));
  const lines = [
    '/* Custom properties, one value per scheme */',
    ':root {',
    `  --text: ${f(s.light.fg)};`,
    `  --surface: ${f(s.light.bg)};`,
    '}',
  ];
  if (s.both) {
    lines.push(
      '',
      '@media (prefers-color-scheme: dark) {',
      '  :root {',
      `    --text: ${f(s.dark.fg)};`,
      `    --surface: ${f(s.dark.bg)};`,
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
