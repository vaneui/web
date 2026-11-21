// Brand color to an 11-step OKLCH scale and VaneUI's accent tokens for light and dark.
import {
  contrastRatio, oklchToRgb, toGamut, toHex, toOklchString, WCAG,
  type Oklch,
} from './color';

export const STEPS = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'] as const;
export type Step = typeof STEPS[number];

/** Lightness of each step: fixed targets, so every hue lands on the same contrast against white and gray-950 */
const LIGHTNESS: Record<Step, number> = {
  '50': 0.975, '100': 0.945, '200': 0.89, '300': 0.81, '400': 0.71, '500': 0.62,
  '600': 0.54, '700': 0.47, '800': 0.40, '900': 0.34, '950': 0.27,
};

/** Share of the brand's chroma each step keeps: low near white and black, full at 600 */
const CHROMA_SHAPE: Record<Step, number> = {
  '50': 0.08, '100': 0.17, '200': 0.35, '300': 0.54, '400': 0.74, '500': 0.91,
  '600': 1, '700': 0.91, '800': 0.78, '900': 0.61, '950': 0.43,
};

export type Scale = Record<Step, Oklch>;

/**
 * The accessible scale: each step at its fixed lightness, with the brand's hue and a share of its
 * chroma, then mapped into sRGB. A muted brand gives a muted scale; a gray gives a gray scale.
 */
export function buildScale(brand: Oklch): Scale {
  const out = {} as Scale;
  for (const step of STEPS) {
    out[step] = toGamut({ l: LIGHTNESS[step], c: brand.c * CHROMA_SHAPE[step], h: brand.h });
  }
  return out;
}

/** The step whose lightness is nearest the brand's: where the exact brand color sits on the scale */
export function nearestStep(brand: Oklch): Step {
  return STEPS.reduce((best, s) =>
    Math.abs(LIGHTNESS[s] - brand.l) < Math.abs(LIGHTNESS[best] - brand.l) ? s : best, STEPS[0]);
}

/** VaneUI's accent roles, as CSS custom property names */
export const ROLES = [
  'text-accent', 'text-filled-accent', 'bg-accent', 'bg-hover-accent', 'bg-active-accent',
  'bg-filled-accent', 'bg-filled-hover-accent', 'bg-filled-active-accent', 'border-accent', 'focus-accent',
] as const;
export type Role = typeof ROLES[number];

/** Which step each role takes in light and in dark: VaneUI's own accent step table */
export const ROLE_STEPS: Record<Exclude<Role, 'text-filled-accent'>, [Step, Step]> = {
  'text-accent': ['700', '400'],
  'bg-accent': ['50', '950'],
  'bg-hover-accent': ['100', '900'],
  'bg-active-accent': ['200', '950'],
  'bg-filled-accent': ['600', '700'],
  'bg-filled-hover-accent': ['700', '800'],
  'bg-filled-active-accent': ['800', '900'],
  'border-accent': ['300', '700'],
  'focus-accent': ['600', '400'],
};

/** VaneUI's page surfaces: white, and gray-950 in dark */
export const PAGE: Record<Scheme, Oklch> = {
  light: { l: 1, c: 0, h: 0 },
  dark: { l: 0.13, c: 0.028, h: 261.692 },
};

export type Scheme = 'light' | 'dark';
export type Mode = 'accessible' | 'exact';
export type RoleValues = Record<Role, Oklch>;

export interface GeneratedTheme {
  brand: Oklch;
  mode: Mode;
  scale: Scale;
  /** The scale step the brand is closest to */
  brandStep: Step;
  roles: Record<Scheme, RoleValues>;
  /** Also set `--color-text-link`, so links take the brand color */
  links: boolean;
  checks: Record<Scheme, ContrastCheck[]>;
}

const WHITE: Oklch = { l: 1, c: 0, h: 0 };

/** White, or the darkest step when white is too faint on the fill */
function textOnFill(fill: Oklch, scale: Scale): Oklch {
  const rgb = oklchToRgb(fill);
  const white = contrastRatio(oklchToRgb(WHITE), rgb);
  if (white >= WCAG.text) return WHITE;
  const dark = contrastRatio(oklchToRgb(scale['950']), rgb);
  return dark > white ? scale['950'] : WHITE;
}

/** The same color, darker by `dl` in OKLCH lightness */
const darker = (c: Oklch, dl: number): Oklch => toGamut({ ...c, l: Math.max(0, c.l - dl) });

function rolesFor(scheme: Scheme, scale: Scale, brand: Oklch, mode: Mode): RoleValues {
  const i = scheme === 'light' ? 0 : 1;
  const out = {} as RoleValues;
  for (const role of Object.keys(ROLE_STEPS) as (keyof typeof ROLE_STEPS)[]) {
    out[role] = scale[ROLE_STEPS[role][i]];
  }
  if (mode === 'exact') {
    // The brand itself is the fill in both schemes; hover and press go darker from it
    const fill = toGamut(brand);
    out['bg-filled-accent'] = fill;
    out['bg-filled-hover-accent'] = darker(fill, 0.07);
    out['bg-filled-active-accent'] = darker(fill, 0.13);
  }
  out['text-filled-accent'] = textOnFill(out['bg-filled-accent'], scale);
  return out;
}

export interface ContrastCheck {
  label: string;
  fg: Oklch;
  bg: Oklch;
  ratio: number;
  /** WCAG 2.2 AA minimum for this pair */
  min: number;
  pass: boolean;
}

function check(label: string, fg: Oklch, bg: Oklch, min: number): ContrastCheck {
  const ratio = contrastRatio(oklchToRgb(fg), oklchToRgb(bg));
  return { label, fg, bg, ratio, min, pass: ratio >= min };
}

function checksFor(scheme: Scheme, r: RoleValues): ContrastCheck[] {
  const page = PAGE[scheme];
  return [
    check('Accent text on the page', r['text-accent'], page, WCAG.text),
    check('Accent text on the accent tint', r['text-accent'], r['bg-accent'], WCAG.text),
    check('Text on the filled button', r['text-filled-accent'], r['bg-filled-accent'], WCAG.text),
    check('Text on the hovered button', r['text-filled-accent'], r['bg-filled-hover-accent'], WCAG.text),
    check('Focus ring on the page', r['focus-accent'], page, WCAG.large),
  ];
}

export function generateTheme(brand: Oklch, options: { mode?: Mode; links?: boolean } = {}): GeneratedTheme {
  const mode = options.mode ?? 'accessible';
  const scale = buildScale(brand);
  const roles = { light: rolesFor('light', scale, brand, mode), dark: rolesFor('dark', scale, brand, mode) };
  return {
    brand,
    mode,
    scale,
    brandStep: nearestStep(brand),
    roles,
    links: options.links ?? false,
    checks: { light: checksFor('light', roles.light), dark: checksFor('dark', roles.dark) },
  };
}

// ---------- Output ----------

export type ColorFormat = 'oklch' | 'hex';

export function formatColor(c: Oklch, format: ColorFormat): string {
  return format === 'hex' ? toHex(oklchToRgb(c)) : toOklchString(c);
}

/** The role values as CSS custom properties for one scheme, for an inline `style` */
export function roleStyle(t: GeneratedTheme, scheme: Scheme): Record<string, string> {
  const style: Record<string, string> = {};
  for (const role of ROLES) style[`--color-${role}`] = toOklchString(t.roles[scheme][role]);
  if (t.links) style['--color-text-link'] = style['--color-text-accent'];
  return style;
}

function roleLines(t: GeneratedTheme, value: (role: Role) => string): string[] {
  const lines = ROLES.map(role => `  --color-${role}: ${value(role)};`);
  if (t.links) lines.push(`  --color-text-link: ${value('text-accent')};`);
  return lines;
}

/**
 * CSS for a VaneUI app, in the pattern the dark-mode docs give: light values on `:root` for pages
 * without `data-theme`, and `light-dark()` pairs on every `data-theme` element. It goes after the
 * VaneUI stylesheet so the pairs win in light regions inside a dark page too.
 */
export function vaneuiCss(t: GeneratedTheme, format: ColorFormat): string {
  const v = (s: Scheme) => (role: Role) => formatColor(t.roles[s][role], format);
  const pair = (role: Role) => `light-dark(${v('light')(role)}, ${v('dark')(role)})`;
  return [
    '/* Put this after the VaneUI stylesheet */',
    ':root {',
    ...roleLines(t, v('light')),
    '}',
    '',
    ':root[data-theme],',
    '[data-theme]:not(:root) {',
    ...roleLines(t, pair),
    '}',
    '',
  ].join('\n');
}

/** The scale as a Tailwind CSS v4 `@theme` block, so `bg-brand-600` and friends exist */
export function tailwindTheme(t: GeneratedTheme, format: ColorFormat, name = 'brand'): string {
  return [
    '@theme {',
    ...STEPS.map(s => `  --color-${name}-${s}: ${formatColor(t.scale[s], format)};`),
    '}',
    '',
  ].join('\n');
}

/** Plain custom properties: the scale, and the roles switching with `prefers-color-scheme` */
export function plainCss(t: GeneratedTheme, format: ColorFormat, name = 'brand'): string {
  const role = (s: Scheme) => (r: Role) => `  --${name}-${r.replace(/-accent$/, '')}: ${formatColor(t.roles[s][r], format)};`;
  return [
    ':root {',
    ...STEPS.map(s => `  --${name}-${s}: ${formatColor(t.scale[s], format)};`),
    ...ROLES.map(role('light')),
    '}',
    '',
    '@media (prefers-color-scheme: dark) {',
    '  :root {',
    ...ROLES.map(r => `  ${role('dark')(r)}`),
    '  }',
    '}',
    '',
  ].join('\n');
}

/** Design tokens as JSON: the scale and both schemes' roles, each as hex and OKLCH */
export function tokensJson(t: GeneratedTheme, name = 'brand'): string {
  const both = (c: Oklch) => ({ hex: toHex(oklchToRgb(c)), oklch: toOklchString(c) });
  const scheme = (s: Scheme) => Object.fromEntries(ROLES.map(r => [r, both(t.roles[s][r])]));
  return `${JSON.stringify({
    [name]: Object.fromEntries(STEPS.map(s => [s, both(t.scale[s])])),
    roles: { light: scheme('light'), dark: scheme('dark') },
  }, null, 2)}\n`;
}

