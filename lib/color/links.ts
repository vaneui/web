// A color in a tool's share link, written so that the link reopens the same color.
import { oklchToRgb, parseColor, toHex, type Oklch } from './color';

const round = (n: number, digits: number) => Number(n.toFixed(digits));

/** Whether two OKLCH values are the same color (a gray's hue does not count) */
function sameColor(a: Oklch, b: Oklch): boolean {
  const eps = 1e-9;
  return Math.abs(a.l - b.l) < eps && Math.abs(a.c - b.c) < eps && (a.c < 1e-4 || Math.abs(a.h - b.h) < eps);
}

/**
 * `c=7c3aed` when the color is a hex color (a preset, or hex, rgb() or hsl() input that lands on
 * one), otherwise `oklch=70,0.3,150`: lightness in percent, chroma and hue, with enough digits that
 * the scale built from it comes back the same (a typed value stays as short as it was typed).
 * Chroma is kept as it is, even outside sRGB.
 */
export function colorParams(c: Oklch): URLSearchParams {
  const hex = toHex(oklchToRgb(c));
  const asHex = parseColor(hex)?.oklch;
  if (asHex && sameColor(asHex, c)) return new URLSearchParams({ c: hex.slice(1) });
  return new URLSearchParams({ oklch: [round(c.l * 100, 8), round(c.c, 10), round(c.h, 8)].join(',') });
}

/** The color `colorParams` wrote (also `c=` with any CSS color), or `fallback` */
export function readColorParams(params: URLSearchParams, fallback: Oklch): Oklch {
  const raw = params.get('oklch');
  if (raw) {
    const [l, c, h] = raw.split(',').map(Number);
    if ([l, c, h].every(Number.isFinite)) {
      // The same limits as typed oklch(): lightness 0 to 100%, chroma from 0 with no upper cap
      return { l: Math.min(Math.max(l / 100, 0), 1), c: Math.max(c, 0), h: ((h % 360) + 360) % 360 };
    }
  }
  const hex = params.get('c');
  const value = hex && /^[0-9a-f]{3,8}$/i.test(hex) ? `#${hex}` : hex;
  return (value && parseColor(value)?.oklch) || fallback;
}
