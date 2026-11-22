// Unit tests for the color math behind the free tools. Run with:
//   npx tsx --test lib/color/__tests__/color.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import {
  contrastRatio, fixContrast, formatRatio, inGamut, oklchToRgb, parseColor, rgbToOklch,
  toGamut, toHex, toHslString, toOklchString, toRgb8, toRgbString,
} from '../color';
import {
  ROLES, STEPS, buildScale, generateTheme, nearestStep, plainCss, tailwindTheme, tokensJson, vaneuiCss,
} from '../theme';

const close = (a: number, b: number, eps: number) => assert.ok(Math.abs(a - b) <= eps, `${a} is not within ${eps} of ${b}`);
const hexOf = (s: string) => {
  const p = parseColor(s);
  assert.ok(p, `could not parse ${s}`);
  return toHex(oklchToRgb(p.oklch));
};

test('hex round-trips through OKLCH', () => {
  for (const hex of ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#7c3aed', '#e11d48', '#808080']) {
    assert.equal(toHex(oklchToRgb(rgbToOklch(parseColorRgb(hex)))), hex);
  }
});

function parseColorRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
}

test('known OKLCH values match the CSS Color 4 reference', () => {
  // Tailwind's blue-600 is oklch(54.6% 0.245 262.881) = #155dfc
  const blue = parseColor('oklch(54.6% 0.245 262.881)');
  assert.ok(blue);
  assert.equal(toHex(oklchToRgb(blue.oklch)), '#155dfc');
  const white = rgbToOklch({ r: 1, g: 1, b: 1 });
  close(white.l, 1, 1e-4);
  close(white.c, 0, 1e-4);
  const red = rgbToOklch({ r: 1, g: 0, b: 0 });
  close(red.l, 0.628, 1e-3);
  close(red.c, 0.2577, 1e-3);
  close(red.h, 29.23, 0.05);
});

test('parseColor reads every supported syntax', () => {
  assert.equal(hexOf('#f00'), '#ff0000');
  assert.equal(hexOf('#ff000080'), '#ff0000');
  assert.equal(hexOf('FF0000'), '#ff0000');
  assert.equal(hexOf('rgb(255, 0, 0)'), '#ff0000');
  assert.equal(hexOf('rgb(255 0 0 / 50%)'), '#ff0000');
  assert.equal(hexOf('rgb(100% 0% 0%)'), '#ff0000');
  assert.equal(hexOf('hsl(0, 100%, 50%)'), '#ff0000');
  assert.equal(hexOf('hsl(120deg 100% 50%)'), '#00ff00');
  assert.equal(hexOf('hsl(0.5turn 100% 50%)'), '#00ffff');
  assert.equal(hexOf('oklch(62.8% 0.2577 29.23)'), '#ff0000');
  assert.equal(hexOf('oklch(0.628 0.2577 29.23)'), '#ff0000');
  assert.equal(hexOf('oklch(62.8 0.2577 29.23)'), '#ff0000');
  assert.equal(hexOf('White'), '#ffffff');
  for (const bad of ['', 'red', '#12', 'rgb(1,2)', 'oklch(a b c)', 'hsl(0 0 0 0)']) {
    assert.equal(parseColor(bad), null, bad);
  }
});

test('parseColor reads the alpha of every syntax, including the legacy comma form', () => {
  const alpha = (s: string) => {
    const p = parseColor(s);
    assert.ok(p, `could not parse ${s}`);
    return p.alpha;
  };
  assert.equal(hexOf('rgba(255, 0, 0, 0.5)'), '#ff0000');
  assert.equal(hexOf('hsla(0, 100%, 50%, 0.5)'), '#ff0000');
  assert.equal(hexOf('rgb(255, 0, 0, 50%)'), '#ff0000');
  assert.equal(alpha('rgba(0, 0, 0, 0.5)'), 0.5);
  assert.equal(alpha('rgba(0, 0, 0, 25%)'), 0.25);
  assert.equal(alpha('hsla(0, 0%, 0%, 0.5)'), 0.5);
  assert.equal(alpha('rgb(0 0 0 / 50%)'), 0.5);
  assert.equal(alpha('hsl(0 0% 0% / 0.2)'), 0.2);
  assert.equal(alpha('oklch(50% 0.1 30 / 0.4)'), 0.4);
  assert.equal(alpha('#00000080'), 128 / 255);
  assert.equal(alpha('#0008'), 136 / 255);
  assert.equal(alpha('#000000'), 1);
  assert.equal(alpha('rgba(0, 0, 0, 2)'), 1);
  // Four arguments need commas; a slash takes exactly one alpha
  for (const bad of ['rgba(0 0 0 0.5)', 'rgb(0 0 0 / )', 'rgb(0 0 0 / 1 / 2)', 'rgba(0, 0, 0, x)', 'oklch(50%, 0.1, 30, 0.5)']) {
    assert.equal(parseColor(bad), null, bad);
  }
});

test('formatters', () => {
  const red = { r: 1, g: 0, b: 0 };
  assert.equal(toRgbString(red), 'rgb(255 0 0)');
  assert.equal(toHslString(red), 'hsl(0 100% 50%)');
  assert.equal(toOklchString(rgbToOklch(red)), 'oklch(62.8% 0.258 29.2)');
  assert.equal(toOklchString({ l: 0.5, c: 0, h: 123 }), 'oklch(50% 0 0)');
});

test('toGamut keeps lightness and hue and lowers chroma until the color fits', () => {
  const wild = { l: 0.7, c: 0.4, h: 150 };
  assert.equal(inGamut(wild), false);
  const mapped = toGamut(wild);
  assert.equal(inGamut(mapped), true);
  close(mapped.l, 0.7, 1e-9);
  close(mapped.h, 150, 1e-9);
  assert.ok(mapped.c < 0.4 && mapped.c > 0.1);
  assert.deepEqual(toGamut({ l: 1.2, c: 0.1, h: 10 }), { l: 1, c: 0, h: 10 });
});

test('contrast ratio follows WCAG 2.2', () => {
  close(contrastRatio({ r: 0, g: 0, b: 0 }, { r: 1, g: 1, b: 1 }), 21, 1e-9);
  close(contrastRatio({ r: 1, g: 1, b: 1 }, { r: 1, g: 1, b: 1 }), 1, 1e-9);
  // #767676 on white is the classic 4.54:1
  const gray = parseColorRgb('#767676');
  close(contrastRatio(gray, { r: 1, g: 1, b: 1 }), 4.54, 0.01);
  assert.equal(formatRatio(4.4999), '4.49:1');
  assert.equal(formatRatio(21), '21.00:1');
});

test('fixContrast moves lightness the shortest way to the target', () => {
  const white = { r: 1, g: 1, b: 1 };
  const light = { l: 0.8, c: 0.1, h: 260 };
  const fixed = fixContrast(light, white, 4.5);
  assert.ok(fixed);
  assert.ok(fixed.l < 0.8);
  assert.ok(contrastRatio(oklchToRgb(fixed), white) >= 4.5);
  close(fixed.h, 260, 1e-9);
  // Already passing: unchanged
  const dark = { l: 0.3, c: 0.1, h: 260 };
  assert.deepEqual(fixContrast(dark, white, 4.5), dark);
  // 21:1 is only reachable with black on white, so a target above it fails
  assert.equal(fixContrast(light, white, 22), null);
});

test('the scale keeps the brand hue at fixed lightness and stays in sRGB', () => {
  const brand = { l: 0.54, c: 0.23, h: 292 };
  const scale = buildScale(brand);
  for (const s of STEPS) {
    assert.equal(inGamut(scale[s]), true, s);
    close(scale[s].h, 292, 1e-9);
  }
  assert.ok(scale['50'].l > scale['500'].l && scale['500'].l > scale['950'].l);
  assert.equal(nearestStep(brand), '600');
  assert.equal(nearestStep({ l: 0.96, c: 0.02, h: 90 }), '50');
});

test('the accessible theme passes WCAG AA for every hue in both schemes', () => {
  for (let h = 0; h < 360; h += 15) {
    const theme = generateTheme({ l: 0.6, c: 0.2, h });
    for (const scheme of ['light', 'dark'] as const) {
      for (const c of theme.checks[scheme]) {
        assert.ok(c.pass, `hue ${h} ${scheme}: ${c.label} is ${c.ratio.toFixed(2)}`);
      }
    }
  }
});

test('exact mode fills with the brand and picks readable text on it', () => {
  const yellow = parseColor('#facc15');
  assert.ok(yellow);
  const theme = generateTheme(yellow.oklch, { mode: 'exact' });
  assert.equal(toHex(oklchToRgb(theme.roles.light['bg-filled-accent'])), '#facc15');
  // White on yellow is about 1.5:1, so the text switches to the darkest step
  assert.notEqual(toHex(oklchToRgb(theme.roles.light['text-filled-accent'])), '#ffffff');
  const fill = theme.checks.light.find(c => c.label === 'Text on the filled button');
  assert.ok(fill?.pass);
});

test('exports name every role and step', () => {
  const theme = generateTheme({ l: 0.55, c: 0.2, h: 250 }, { links: true });
  const css = vaneuiCss(theme, 'oklch');
  for (const role of ROLES) assert.ok(css.includes(`--color-${role}: oklch(`), role);
  assert.ok(css.includes('--color-text-link'));
  assert.ok(css.includes(':root[data-theme],\n[data-theme]:not(:root) {'));
  assert.match(css, /--color-text-accent: light-dark\(oklch\([^)]*\), oklch\([^)]*\)\);/);
  const hexCss = vaneuiCss(theme, 'hex');
  assert.match(hexCss, /--color-bg-accent: #[0-9a-f]{6};/);
  const tw = tailwindTheme(theme, 'oklch');
  for (const s of STEPS) assert.ok(tw.includes(`--color-brand-${s}:`), s);
  assert.ok(plainCss(theme, 'hex').includes('@media (prefers-color-scheme: dark)'));
  const json = JSON.parse(tokensJson(theme));
  assert.equal(Object.keys(json.brand).length, 11);
  assert.match(json.roles.dark['text-accent'].hex, /^#[0-9a-f]{6}$/);
});

test('contrast of the colors as written: black on white reads 21:1 after the OKLCH round trip', () => {
  const shown = (s: string) => {
    const p = parseColor(s);
    assert.ok(p, `could not parse ${s}`);
    return toRgb8(oklchToRgb(p.oklch));
  };
  // The float round trip lands a hair under 21; the 8-bit color is exact
  assert.ok(contrastRatio(oklchToRgb(parseColor('#000000')!.oklch), oklchToRgb(parseColor('#ffffff')!.oklch)) < 21);
  assert.equal(formatRatio(contrastRatio(shown('#000000'), shown('#ffffff'))), '21.00:1');
  assert.equal(formatRatio(contrastRatio(shown('#ffffff'), { r: 0, g: 0, b: 0 })), '21.00:1');
  assert.equal(formatRatio(contrastRatio(shown('#777777'), shown('#ffffff'))), '4.47:1');
  assert.equal(formatRatio(contrastRatio(shown('#767676'), shown('#ffffff'))), '4.54:1');
  assert.deepEqual(toRgb8({ r: 0.99999995, g: 1.2, b: -0.1 }), { r: 1, g: 1, b: 0 });
});

test('fixContrast suggests a color that still passes once written as hex or OKLCH', () => {
  // A small seeded generator, so a failure names a pair that reproduces
  let seed = 7;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  const hex = () => `#${Math.floor(rand() * 0x1000000).toString(16).padStart(6, '0')}`;
  const shown = (c: { l: number; c: number; h: number }) => toRgb8(oklchToRgb(c));
  const pairs: [string, string][] = [['#888888', '#ffffff'], ['#999999', '#ffffff'], ['#6b7280', '#111827']];
  while (pairs.length < 1500) pairs.push([hex(), hex()]);
  let fixedCount = 0;
  for (const [fgHex, bgHex] of pairs) {
    const fg = parseColor(fgHex)!.oklch;
    const bg = shown(parseColor(bgHex)!.oklch);
    if (contrastRatio(shown(fg), bg) >= 4.5) continue;
    const fixed = fixContrast(fg, bg, 4.5);
    if (!fixed) continue;
    fixedCount++;
    const asHex = toHex(oklchToRgb(fixed));
    assert.notEqual(asHex, fgHex, `${fgHex} on ${bgHex}: suggested the same color`);
    assert.ok(contrastRatio(shown(parseColor(asHex)!.oklch), bg) >= 4.5, `${fgHex} on ${bgHex}: ${asHex} fails as hex`);
    const written = parseColor(toOklchString(fixed))!.oklch;
    assert.ok(contrastRatio(oklchToRgb(written), bg) >= 4.5, `${fgHex} on ${bgHex}: ${toOklchString(fixed)} fails`);
    assert.ok(contrastRatio(shown(written), bg) >= 4.5, `${fgHex} on ${bgHex}: ${toOklchString(fixed)} fails on screen`);
  }
  assert.ok(fixedCount > 500, `only ${fixedCount} pairs needed a fix`);
  // The case from the report: #888 on white used to suggest #777777, which is 4.47:1
  const gray = fixContrast(parseColor('#888888')!.oklch, { r: 1, g: 1, b: 1 }, 4.5);
  assert.ok(gray);
  assert.equal(toHex(oklchToRgb(gray)), '#767676');
});
