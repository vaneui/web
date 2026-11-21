'use client';

import React, { useMemo, useState } from 'react';
import {
  Alert, Badge, Button, Card, Checkbox, Chip, Code, Col, Field, Input, Label, Link, NavLink, Progress, Row,
  Switch, Text, Title,
} from '@vaneui/ui';
import { ToolShell } from '../ToolShell';
import { CodeTabs, ColorField, CopyLinkButton, CopyValue, Segmented } from '../_components/controls';
import { hexParam, useShareableState } from '../_components/useShareableState';
import {
  formatRatio, oklchToRgb, parseColor, toHex, toOklchString, type Oklch,
} from '../../../lib/color/color';
import {
  STEPS, generateTheme, plainCss, roleStyle, tailwindTheme, tokensJson, vaneuiCss,
  type ColorFormat, type GeneratedTheme, type Mode, type Scheme,
} from '../../../lib/color/theme';

const PRESETS = [
  { name: 'Violet', hex: '#7c3aed' },
  { name: 'Blue', hex: '#2563eb' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Green', hex: '#16a34a' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Orange', hex: '#ea580c' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Slate', hex: '#475569' },
];

const DEFAULT_BRAND = parseColor(PRESETS[0].hex)!.oklch;

const MODES = [
  { value: 'accessible', label: 'Accessible scale' },
  { value: 'exact', label: 'Exact brand fill' },
] as const;

const VIEWS = [
  { value: 'both', label: 'Side by side' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

const FORMATS = [
  { value: 'oklch', label: 'OKLCH' },
  { value: 'hex', label: 'Hex' },
] as const;

interface Settings { brand: Oklch; mode: Mode; links: boolean }

const DEFAULTS: Settings = { brand: DEFAULT_BRAND, mode: 'accessible', links: false };

/** A shared link opens its theme: ?c=7c3aed&mode=exact&links=1 */
function readSettings(params: URLSearchParams, defaults: Settings): Settings {
  const c = hexParam(params.get('c'));
  return {
    brand: (c && parseColor(c)?.oklch) || defaults.brand,
    mode: params.get('mode') === 'exact' ? 'exact' : defaults.mode,
    links: params.get('links') === '1',
  };
}

function writeSettings(s: Settings): URLSearchParams {
  const params = new URLSearchParams({ c: toHex(oklchToRgb(s.brand)).slice(1) });
  if (s.mode === 'exact') params.set('mode', 'exact');
  if (s.links) params.set('links', '1');
  return params;
}

function Sheet({ theme, scheme }: { theme: GeneratedTheme; scheme: Scheme }) {
  return (
    <Card data-theme={scheme} style={roleStyle(theme, scheme) as React.CSSProperties} className="min-w-0 flex-1">
      <Row justifyBetween>
        <Text sm fontSemibold>{scheme === 'light' ? 'Light' : 'Dark'}</Text>
        <Text xs tertiary fontMono>{scheme === 'light' ? 'on white' : 'on gray-950'}</Text>
      </Row>
      <Row sm flexWrap>
        <Button accent filled>Save changes</Button>
        <Button accent>Outline</Button>
        <Button accent ghost>Ghost</Button>
        <Button secondary>Cancel</Button>
      </Row>
      <Row sm flexWrap>
        <Badge accent filled>New</Badge>
        <Badge accent>Beta</Badge>
        <Chip accent>Design</Chip>
        <Chip>Docs</Chip>
      </Row>
      <Alert accent sm>
        <Text>Your workspace now uses the new brand theme.</Text>
      </Alert>
      <Row noGap borderB>
        <NavLink indicatorBottom ghost sharp active wFit>Profile</NavLink>
        <NavLink indicatorBottom ghost sharp secondary wFit>Billing</NavLink>
        <NavLink indicatorBottom ghost sharp secondary wFit>Team</NavLink>
      </Row>
      <Field label="Display name" description="Shown on your public profile.">
        <Input defaultValue="Ada Lovelace"/>
      </Field>
      <Row justifyBetween flexWrap>
        <Label row sm><Checkbox accent defaultChecked/> Email me updates</Label>
        <Label row sm><Switch accent defaultChecked/> Public profile</Label>
      </Row>
      <Progress accent value={64} aria-label="Storage used"/>
      <Text sm>
        Read the <Link href="#preview">theming guide</Link> or run <Code>npm i @vaneui/ui</Code>.
      </Text>
    </Card>
  );
}

function Checks({ theme, scheme }: { theme: GeneratedTheme; scheme: Scheme }) {
  return (
    <Col xs flex1 mobileWFull className="min-w-0">
      <Text sm fontSemibold>{scheme === 'light' ? 'Light' : 'Dark'}</Text>
      {theme.checks[scheme].map(c => (
        <Row key={c.label} justifyBetween borderB className="py-1.5">
          <Row xs className="min-w-0">
            <span aria-hidden="true" className="size-4 shrink-0 rounded border border-(--color-border-primary)"
                  style={{ background: toOklchString(c.bg) }}>
              <span className="block size-2 translate-x-1 translate-y-1 rounded-full" style={{ background: toOklchString(c.fg) }}/>
            </span>
            <Text sm truncate>{c.label}</Text>
          </Row>
          <Row xs noShrink>
            <Text sm fontMono>{formatRatio(c.ratio)}</Text>
            <Badge xs success={c.pass} danger={!c.pass}>{c.pass ? `Pass ${c.min}:1` : `Below ${c.min}:1`}</Badge>
          </Row>
        </Row>
      ))}
    </Col>
  );
}

export function ThemeGenerator() {
  const [settings, setSettings] = useShareableState(DEFAULTS, readSettings, writeSettings);
  const { brand, mode, links } = settings;
  const setBrand = (c: Oklch) => setSettings(s => ({ ...s, brand: c }));
  const setMode = (m: Mode) => setSettings(s => ({ ...s, mode: m }));
  const setLinks = (on: boolean) => setSettings(s => ({ ...s, links: on }));
  const [view, setView] = useState<'both' | Scheme>('both');
  const [format, setFormat] = useState<ColorFormat>('oklch');

  const theme = useMemo(() => generateTheme(brand, { mode, links }), [brand, mode, links]);
  const failing = [...theme.checks.light, ...theme.checks.dark].filter(c => !c.pass).length;
  const schemes: Scheme[] = view === 'both' ? ['light', 'dark'] : [view];

  const tabs = [
    { id: 'vaneui', label: 'VaneUI CSS', language: 'css', fileName: 'theme.css', code: vaneuiCss(theme, format) },
    { id: 'tailwind', label: 'Tailwind @theme', language: 'css', fileName: 'app.css', code: tailwindTheme(theme, format) },
    { id: 'plain', label: 'Plain CSS', language: 'css', fileName: 'brand.css', code: plainCss(theme, format) },
    { id: 'json', label: 'Tokens JSON', language: 'json', fileName: 'tokens.json', code: tokensJson(theme) },
  ];

  return (
    <ToolShell slug="theme-generator" actions={<CopyLinkButton query={writeSettings(settings)} label="Copy link to this theme"/>}>
      <Row xl itemsStart tabletStack>
        {/* Controls */}
        <Col noShrink tabletWFull className="w-80">
          <Card>
            <Title sm tag="h2">Brand color</Title>
            <ColorField label="Color" value={brand} onChange={setBrand}
                        description="Any CSS color: hex, rgb(), hsl() or oklch()."/>
            <Row xs flexWrap role="group" aria-label="Presets">
              {PRESETS.map(p => (
                <Chip key={p.name} sm tag="button" type="button" onClick={() => setBrand(parseColor(p.hex)!.oklch)}>
                  <span aria-hidden="true" className="size-3 rounded-full" style={{ background: p.hex }}/>
                  {p.name}
                </Chip>
              ))}
            </Row>
          </Card>
          <Card>
            <Title sm tag="h2">Fill</Title>
            <Segmented label="Fill mode" options={MODES} value={mode} onChange={setMode}/>
            <Text sm secondary>
              {mode === 'accessible'
                ? 'Every step sits at a fixed lightness, so buttons and text pass WCAG AA for any hue. Your color may move a little.'
                : 'Filled buttons use your exact color. Their text switches to a dark shade when white is too faint on it.'}
            </Text>
            <Label row sm>
              <Switch checked={links} onChange={e => setLinks(e.target.checked)}/>
              Use it for links too
            </Label>
          </Card>
          <Card>
            <Row justifyBetween>
              <Title sm tag="h2">Scale</Title>
              <Segmented label="Color format" options={FORMATS} value={format} onChange={setFormat}/>
            </Row>
            <Row noGap overflowHidden rounded aria-hidden="true">
              {STEPS.map(s => (
                <div key={s} className="h-8 flex-1" style={{ background: toOklchString(theme.scale[s]) }}/>
              ))}
            </Row>
            <Col noGap>
              {STEPS.map(s => (
                <CopyValue key={s} dense label={s === theme.brandStep ? `${s} ●` : s}
                           value={format === 'hex' ? toHex(oklchToRgb(theme.scale[s])) : toOklchString(theme.scale[s])}/>
              ))}
            </Col>
            <Text xs tertiary>● marks the step nearest your color.</Text>
          </Card>
        </Col>

        {/* Preview, checks, export */}
        <Col lg flex1 tabletWFull className="min-w-0" id="preview">
          <Row justifyBetween flexWrap>
            <Title sm tag="h2">Preview on VaneUI components</Title>
            <Segmented label="Preview" options={VIEWS} value={view} onChange={setView}/>
          </Row>
          <Row itemsStretch mobileStack>
            {schemes.map(s => <Sheet key={s} theme={theme} scheme={s}/>)}
          </Row>

          <Card>
            <Row justifyBetween flexWrap>
              <Title sm tag="h2">Contrast (WCAG 2.2 AA)</Title>
              <Badge success={failing === 0} warning={failing > 0}>
                {failing === 0 ? 'All checks pass' : `${failing} below the minimum`}
              </Badge>
            </Row>
            <Row xl itemsStart mobileStack>
              <Checks theme={theme} scheme="light"/>
              <Checks theme={theme} scheme="dark"/>
            </Row>
          </Card>

          <Card>
            <Title sm tag="h2">Export</Title>
            <Text sm secondary>
              VaneUI CSS sets the accent color for every component. Load it after the VaneUI stylesheet.
              The other formats give you the same scale for any codebase.
            </Text>
            <CodeTabs label="Export format" tabs={tabs}/>
          </Card>
        </Col>
      </Row>
    </ToolShell>
  );
}
