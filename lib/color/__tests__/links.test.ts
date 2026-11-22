// Unit tests for colors in the tools' share links. Run with:
//   npx tsx --test lib/color/__tests__/links.test.ts

import test from 'node:test';
import assert from 'node:assert/strict';

import { oklchToRgb, parseColor, toHex, type Oklch } from '../color';
import { colorParams, readColorParams } from '../links';
import { STEPS, generateTheme } from '../theme';

const FALLBACK: Oklch = { l: 0.5, c: 0.1, h: 10 };
const reopen = (c: Oklch) => readColorParams(new URLSearchParams(colorParams(c).toString()), FALLBACK);
const scaleHex = (c: Oklch, mode: 'accessible' | 'exact' = 'accessible') => {
  const theme = generateTheme(c, { mode });
  return [...STEPS.map(s => toHex(oklchToRgb(theme.scale[s]))), toHex(oklchToRgb(theme.roles.light['bg-filled-accent']))];
};

test('a hex color is linked as hex, any other color as OKLCH', () => {
  assert.equal(colorParams(parseColor('#7c3aed')!.oklch).toString(), 'c=7c3aed');
  assert.equal(colorParams(parseColor('rgb(0 190 88)')!.oklch).toString(), 'c=00be58');
  assert.equal(colorParams(parseColor('oklch(70% 0.3 150)')!.oklch).toString(), 'oklch=70%2C0.3%2C150');
  assert.equal(colorParams({ l: 0.546, c: 0.215, h: 262.9 }).get('oklch'), '54.6,0.215,262.9');
});

test('a theme link reopens the same scale for an OKLCH brand color', () => {
  // The case from the report: oklch(70% 0.3 150) was linked as #00be58, and 7 of 11 steps changed
  const brand = parseColor('oklch(70% 0.3 150)')!.oklch;
  assert.deepEqual(reopen(brand), brand);
  assert.deepEqual(scaleHex(reopen(brand)), scaleHex(brand));
  // Colors with many digits (hsl() input, the converter's own math) come back with the same theme
  let seed = 3;
  const rand = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
  for (let i = 0; i < 300; i++) {
    const c = { l: 0.05 + rand() * 0.9, c: rand() * 0.4, h: rand() * 360 };
    for (const mode of ['accessible', 'exact'] as const) {
      assert.deepEqual(scaleHex(reopen(c), mode), scaleHex(c, mode), JSON.stringify(c));
    }
    assert.equal(toHex(oklchToRgb(reopen(c))), toHex(oklchToRgb(c)), JSON.stringify(c));
  }
  for (const hex of ['#7c3aed', '#2563eb', '#0d9488', '#facc15', '#000000', '#ffffff', '#808080']) {
    assert.deepEqual(reopen(parseColor(hex)!.oklch), parseColor(hex)!.oklch, hex);
  }
});

test('chroma above the sRGB limit survives the link, as typed oklch() keeps it', () => {
  const wild = parseColor('oklch(50% 0.5 30)')!.oklch;
  assert.equal(wild.c, 0.5);
  assert.deepEqual(reopen(wild), wild);
  const read = (q: string) => readColorParams(new URLSearchParams(q), FALLBACK);
  assert.deepEqual(read('oklch=50,0.5,30'), { l: 0.5, c: 0.5, h: 30 });
  assert.deepEqual(read('oklch=120,-1,-30'), { l: 1, c: 0, h: 330 });
  assert.deepEqual(read('c=7c3aed'), parseColor('#7c3aed')!.oklch);
  assert.deepEqual(read('c=rgb(0%2C0%2C0)'), parseColor('#000')!.oklch);
  assert.deepEqual(read('oklch=a,b,c'), FALLBACK);
  assert.deepEqual(read(''), FALLBACK);
});
