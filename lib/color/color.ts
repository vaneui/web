// Color math for the free tools: CSS color parsing, sRGB <-> OKLab/OKLCH, gamut mapping and WCAG contrast.
// Pure functions with no DOM access, so they run in tests, on the server and in the browser alike.

/** sRGB channels, gamma-encoded, 0 to 1 */
export interface Rgb { r: number; g: number; b: number }
/** OKLCH: lightness 0 to 1, chroma from 0 (about 0.37 at most in sRGB), hue in degrees */
export interface Oklch { l: number; c: number; h: number }
/** OKLab: lightness 0 to 1, a and b roughly -0.4 to 0.4 */
export interface Oklab { l: number; a: number; b: number }

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function srgbToLinear(v: number): number {
  const a = Math.abs(v);
  return a <= 0.04045 ? v / 12.92 : Math.sign(v) * Math.pow((a + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(v: number): number {
  const a = Math.abs(v);
  return a <= 0.0031308 ? v * 12.92 : Math.sign(v) * (1.055 * Math.pow(a, 1 / 2.4) - 0.055);
}

/** Linear sRGB to OKLab (Ottosson's matrices) */
export function linearRgbToOklab(r: number, g: number, b: number): Oklab {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return {
    l: 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    a: 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    b: 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  };
}

/** OKLab to linear sRGB; channels may fall outside 0 to 1 when the color is out of gamut */
export function oklabToLinearRgb({ l, a, b }: Oklab): [number, number, number] {
  const l_ = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  const m_ = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  const s_ = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);
  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

export function oklabToOklch({ l, a, b }: Oklab): Oklch {
  const c = Math.sqrt(a * a + b * b);
  let h = (Math.atan2(b, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  // A gray has no hue; keep 0 instead of the noise atan2 returns
  return { l, c, h: c < 1e-4 ? 0 : h };
}

export function oklchToOklab({ l, c, h }: Oklch): Oklab {
  const rad = (h * Math.PI) / 180;
  return { l, a: c * Math.cos(rad), b: c * Math.sin(rad) };
}

export function rgbToOklch(rgb: Rgb): Oklch {
  return oklabToOklch(linearRgbToOklab(srgbToLinear(rgb.r), srgbToLinear(rgb.g), srgbToLinear(rgb.b)));
}

/** The sRGB color for an OKLCH value, unclamped: check `inGamut` or map with `toGamut` first */
export function oklchToRgbUnclamped(c: Oklch): Rgb {
  const [r, g, b] = oklabToLinearRgb(oklchToOklab(c));
  return { r: linearToSrgb(r), g: linearToSrgb(g), b: linearToSrgb(b) };
}

const GAMUT_EPS = 1e-4;

/** Whether an OKLCH color can be shown in sRGB (with a small tolerance for rounding) */
export function inGamut(c: Oklch): boolean {
  const [r, g, b] = oklabToLinearRgb(oklchToOklab(c));
  return [r, g, b].every(v => v >= -GAMUT_EPS && v <= 1 + GAMUT_EPS);
}

/** Lowers chroma, keeping lightness and hue, until the color fits sRGB (the CSS Color 4 approach) */
export function toGamut(c: Oklch): Oklch {
  const l = clamp01(c.l);
  if (l >= 1) return { l: 1, c: 0, h: c.h };
  if (l <= 0) return { l: 0, c: 0, h: c.h };
  if (inGamut({ ...c, l })) return { ...c, l };
  let lo = 0;
  let hi = c.c;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (inGamut({ l, c: mid, h: c.h })) lo = mid; else hi = mid;
  }
  return { l, c: lo, h: c.h };
}

/** The sRGB color for an OKLCH value, mapped into the gamut first */
export function oklchToRgb(c: Oklch): Rgb {
  const rgb = oklchToRgbUnclamped(toGamut(c));
  return { r: clamp01(rgb.r), g: clamp01(rgb.g), b: clamp01(rgb.b) };
}

// ---------- Formatting ----------

const hex2 = (v: number) => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0');

/** The color an 8-bit screen shows, and the one its hex names: each channel rounded to a 255th */
export function toRgb8(rgb: Rgb): Rgb {
  const q = (v: number) => Math.round(clamp01(v) * 255) / 255;
  return { r: q(rgb.r), g: q(rgb.g), b: q(rgb.b) };
}

export function toHex(rgb: Rgb): string {
  return `#${hex2(rgb.r)}${hex2(rgb.g)}${hex2(rgb.b)}`;
}

const round = (v: number, digits: number) => {
  const f = Math.pow(10, digits);
  return Math.round(v * f) / f;
};

export function toRgbString(rgb: Rgb): string {
  const ch = (v: number) => Math.round(clamp01(v) * 255);
  return `rgb(${ch(rgb.r)} ${ch(rgb.g)} ${ch(rgb.b)})`;
}

export function rgbToHsl({ r, g, b }: Rgb): { h: number; s: number; l: number } {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  if (d === 0) return { h: 0, s: 0, l };
  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h *= 60;
  if (h < 0) h += 360;
  return { h, s, l };
}

export function toHslString(rgb: Rgb): string {
  const { h, s, l } = rgbToHsl(rgb);
  return `hsl(${round(h, 1)} ${round(s * 100, 1)}% ${round(l * 100, 1)}%)`;
}

/** CSS `oklch()` with lightness as a percentage, rounded the way design tokens usually are */
export function toOklchString(c: Oklch): string {
  return `oklch(${round(c.l * 100, 1)}% ${round(c.c, 3)} ${round(c.c < 1e-4 ? 0 : c.h, 1)})`;
}

// ---------- Parsing ----------

function parseHex(s: string): { rgb: Rgb; alpha: number } | null {
  const m = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.exec(s);
  if (!m) return null;
  let h = m[1];
  if (h.length <= 4) h = h.split('').map(ch => ch + ch).join('');
  return {
    rgb: {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    },
    alpha: h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1,
  };
}

/**
 * The three arguments of a CSS color function and its alpha token, from the modern syntax
 * (`rgb(0 0 0 / 50%)`, commas or spaces) or, with `legacyAlpha`, the comma syntax with a fourth
 * argument (`rgba(0, 0, 0, 0.5)`)
 */
function fnArgs(s: string, names: string[], legacyAlpha = false): { parts: string[]; alpha: string | null } | null {
  const m = /^([a-z]+)\(\s*(.*?)\s*\)$/i.exec(s);
  if (!m || !names.includes(m[1].toLowerCase())) return null;
  const [body, slash, ...rest] = m[2].split('/');
  if (rest.length) return null;
  const parts = body.split(/[\s,]+/).filter(Boolean);
  if (slash !== undefined) {
    const alpha = slash.trim();
    return parts.length === 3 && /^\S+$/.test(alpha) ? { parts, alpha } : null;
  }
  if (legacyAlpha && parts.length === 4 && body.includes(',')) return { parts: parts.slice(0, 3), alpha: parts[3] };
  return parts.length === 3 ? { parts, alpha: null } : null;
}

/** An alpha from `0.5` or `50%`, clamped to 0 to 1; 1 when there is none, null when it does not read */
function alphaOf(token: string | null): number | null {
  if (token == null) return 1;
  const v = num(token, 1);
  return v == null ? null : clamp01(v);
}

/** A number, or a percentage scaled so that 100% is `full` */
function num(token: string, full: number): number | null {
  const pct = token.endsWith('%');
  const v = parseFloat(pct ? token.slice(0, -1) : token);
  if (!Number.isFinite(v)) return null;
  return pct ? (v / 100) * full : v;
}

/** A hue in degrees from `120`, `120deg`, `2rad` or `0.5turn` */
function hue(token: string): number | null {
  const m = /^(-?[\d.]+)(deg|rad|grad|turn)?$/i.exec(token);
  if (!m) return null;
  const v = parseFloat(m[1]);
  if (!Number.isFinite(v)) return null;
  const unit = (m[2] ?? 'deg').toLowerCase();
  const deg = unit === 'rad' ? (v * 180) / Math.PI : unit === 'grad' ? v * 0.9 : unit === 'turn' ? v * 360 : v;
  return ((deg % 360) + 360) % 360;
}

function hslToRgb(h: number, s: number, l: number): Rgb {
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return { r: f(0), g: f(8), b: f(4) };
}

const NAMED: Record<string, string> = { white: '#ffffff', black: '#000000' };

/** A parsed color: the color itself and its alpha, 0 (transparent) to 1 (opaque) */
export type ParsedColor = { oklch: Oklch; alpha: number; source: 'hex' | 'rgb' | 'hsl' | 'oklch' };

/**
 * Parses hex (3, 4, 6 or 8 digits), `rgb()`/`rgba()`, `hsl()`/`hsla()` and `oklch()`, in the
 * modern syntax or the legacy comma syntax, with or without an alpha, plus `white` and `black`.
 * Returns null for anything else. OKLCH input keeps its own values, even outside sRGB.
 */
export function parseColor(input: string): ParsedColor | null {
  const s = input.trim().toLowerCase();
  if (!s) return null;
  const named = NAMED[s];
  const hex = parseHex(named ?? s);
  if (hex) return { oklch: rgbToOklch(hex.rgb), alpha: hex.alpha, source: 'hex' };

  const rgbArgs = fnArgs(s, ['rgb', 'rgba'], true);
  if (rgbArgs) {
    const [r, g, b] = rgbArgs.parts.map(t => num(t, 255));
    const alpha = alphaOf(rgbArgs.alpha);
    if (r == null || g == null || b == null || alpha == null) return null;
    return { oklch: rgbToOklch({ r: clamp01(r / 255), g: clamp01(g / 255), b: clamp01(b / 255) }), alpha, source: 'rgb' };
  }

  const hslArgs = fnArgs(s, ['hsl', 'hsla'], true);
  if (hslArgs) {
    const [hTok, sTok, lTok] = hslArgs.parts;
    const h = hue(hTok);
    const sat = num(sTok, 1);
    const light = num(lTok, 1);
    const alpha = alphaOf(hslArgs.alpha);
    if (h == null || sat == null || light == null || alpha == null) return null;
    // Without a % sign, modern syntax reads saturation and lightness as 0 to 100
    const norm = (v: number, token: string) => (token.endsWith('%') ? v : v / 100);
    return {
      oklch: rgbToOklch(hslToRgb(h, clamp01(norm(sat, sTok)), clamp01(norm(light, lTok)))),
      alpha,
      source: 'hsl',
    };
  }

  const oklchArgs = fnArgs(s, ['oklch']);
  if (oklchArgs) {
    const [lTok, cTok, hTok] = oklchArgs.parts;
    let l = num(lTok, 1);
    // A bare number above 1 is almost always a percentage typed without the sign
    if (l != null && !lTok.endsWith('%') && l > 1) l /= 100;
    const c = num(cTok, 0.4);
    const h = hue(hTok);
    const alpha = alphaOf(oklchArgs.alpha);
    if (l == null || c == null || h == null || alpha == null) return null;
    return { oklch: { l: clamp01(l), c: Math.max(0, c), h }, alpha, source: 'oklch' };
  }
  return null;
}

// ---------- Contrast (WCAG 2.2) ----------

/** WCAG relative luminance of a gamma-encoded sRGB color */
export function relativeLuminance({ r, g, b }: Rgb): number {
  const lin = (v: number) => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** WCAG contrast ratio, 1 to 21 */
export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** The ratio for display: two decimals, cut rather than rounded so 4.499 never shows as 4.50 */
export function formatRatio(ratio: number): string {
  return `${(Math.floor(ratio * 100) / 100).toFixed(2)}:1`;
}

export const WCAG = {
  /** Body text, AA */
  text: 4.5,
  /** Large text (24px, or 18.66px bold) and UI components or focus indicators, AA */
  large: 3,
  /** Body text, AAA */
  textAAA: 7,
  /** Large text, AAA */
  largeAAA: 4.5,
} as const;

/**
 * The closest color to `fg` (same hue and chroma, lightness moved) that reaches `target` against
 * `bg` however it is written: as its hex (the 8-bit color a screen shows), as `toOklchString` writes
 * it, and as the value itself. Pass `bg` as the screen shows it too (`toRgb8`). Returns `fg` when it
 * already passes, and null when no lightness in either direction gets there.
 */
export function fixContrast(fg: Oklch, bg: Rgb, target: number): Oklch | null {
  const reaches = (rgb: Rgb) => contrastRatio(rgb, bg) >= target && contrastRatio(toRgb8(rgb), bg) >= target;
  const passes = (c: Oklch) => {
    const written = parseColor(toOklchString(c));
    return reaches(oklchToRgb(c)) && !!written && reaches(oklchToRgb(written.oklch));
  };
  const at = (l: number) => toGamut({ ...fg, l });
  if (passes(fg)) return fg;
  const candidates: Oklch[] = [];
  for (const end of [0, 1]) {
    if (!passes(at(end))) continue;
    // Binary search between the current lightness (fails) and the end (passes); `pass` always passes
    let fail = fg.l;
    let pass = end;
    for (let i = 0; i < 40; i++) {
      const mid = (fail + pass) / 2;
      if (passes(at(mid))) pass = mid; else fail = mid;
    }
    candidates.push(at(pass));
  }
  if (!candidates.length) return null;
  return candidates.sort((x, y) => Math.abs(x.l - fg.l) - Math.abs(y.l - fg.l))[0];
}
