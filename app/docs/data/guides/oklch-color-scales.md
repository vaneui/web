An OKLCH color scale is a ramp of 11 steps, 50 to 950, built in a color space whose lightness axis follows human perception. One table of lightness targets then works for every hue, and each step can map to a fixed role in a UI theme: text, tinted background, border, fill or focus ring. This guide builds such a ramp from one brand color, keeps it inside the sRGB gamut, and maps it onto VaneUI's accent tokens. The [OKLCH converter](/tools/oklch-converter) runs the conversions below on any color you paste.

## Why OKLCH lightness matches what people see

HSL calls `hsl(60 100% 50%)` (pure yellow) and `hsl(240 100% 50%)` (pure blue) equally light, yet the yellow is close to white and the blue close to navy. OKLCH measures them at 96.8% and 45.2% lightness. Its three components are:

| Component | Range | Meaning |
|-----------|-------|---------|
| `L` | 0 to 100% | perceived lightness |
| `C` | 0 to about 0.37 for screen colors | chroma, the distance from gray |
| `h` | 0 to 360 | hue angle |

```css
.brand {
  background: oklch(54.6% 0.215 262.9);
}
```

Because equal `L` reads as equal lightness across hues, a blue, a teal and an amber ramp can share the same lightness table, and their steps line up visually. `oklch()` works in Chrome 111, Firefox 113 and Safari 15.4 and later.

## Lightness targets for an 11-step ramp

Each step gets a fixed lightness and a share of the brand color's chroma:

| Step | Lightness | Chroma share | Typical role |
|------|-----------|--------------|--------------|
| 50 | 97% | 0.12 | tinted surface |
| 100 | 93% | 0.25 | hover tint |
| 200 | 87% | 0.45 | pressed tint |
| 300 | 80% | 0.70 | border |
| 400 | 71% | 0.90 | text on dark surfaces |
| 500 | 63% | 1.00 | accents, icons |
| 600 | 56% | 1.00 | fill under white text |
| 700 | 49% | 0.90 | text on light surfaces |
| 800 | 43% | 0.78 | pressed fill |
| 900 | 37% | 0.65 | dark hover tint |
| 950 | 27% | 0.50 | dark tinted surface |

The light end moves in smaller lightness steps than the middle: near white, a few points of lightness already separate two tints. Chroma peaks at 500 and 600 and tapers toward both ends: a tint with full chroma looks neon, and a dark step with full chroma glows against a dark page.

The targets sit close to the palette VaneUI's default accent uses. Its rose steps run 96.9, 94.1, 89.2, 81, 71.2, 64.5, 58.6, 51.4, 45.5, 41 and 27.1% lightness.

Keep the hue fixed for most colors. Yellows and oranges are the exception: sRGB holds less chroma for them at every step below about 80% lightness, so their dark steps turn brown. Rotating the hue toward orange at the dark end helps. VaneUI's warning tokens use an amber ramp that does this, from hue 95.3 at step 50 to 45.6 at step 950.

## Keep every step inside the sRGB gamut

OKLCH can describe colors a standard screen cannot show. How much chroma fits depends on both lightness and hue: at hue 262.9 (blue), sRGB holds a chroma of 0.014 at 97% lightness and 0.242 at 56%. A color past that limit is mapped by the browser, and an exported hex value clips it, so the shown color and the stored token disagree. Wide-gamut values appear in shipped palettes too: VaneUI's light filled accent, rose-600 at `oklch(58.6% 0.253 17.585)`, sits outside sRGB, whose limit at that lightness and hue is a chroma of 0.235.

Lowering chroma at fixed lightness and hue keeps the step's place in the ramp. A binary search finds the highest chroma that fits, the same direction CSS Color 4 gamut mapping takes:

```ts
function oklchToLinearSrgb(L: number, C: number, h: number): number[] {
  const a = C * Math.cos((h * Math.PI) / 180);
  const b = C * Math.sin((h * Math.PI) / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

const inSrgb = (L: number, C: number, h: number) =>
  oklchToLinearSrgb(L, C, h).every((v) => v >= -1e-6 && v <= 1 + 1e-6);

/** The highest chroma sRGB can show at this lightness and hue */
function maxChroma(L: number, h: number): number {
  let lo = 0;
  let hi = 0.4;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    if (inSrgb(L, mid, h)) lo = mid;
    else hi = mid;
  }
  return lo;
}

const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const LIGHTNESS = [0.97, 0.93, 0.87, 0.8, 0.71, 0.63, 0.56, 0.49, 0.43, 0.37, 0.27];
const CHROMA_SHARE = [0.12, 0.25, 0.45, 0.7, 0.9, 1, 1, 0.9, 0.78, 0.65, 0.5];

function buildRamp(brandHex: string): Record<number, string> {
  const [, brandChroma, hue] = hexToOklch(brandHex); // see the last section
  return Object.fromEntries(STEPS.map((step, i) => {
    const L = LIGHTNESS[i];
    const C = Math.min(brandChroma * CHROMA_SHARE[i], maxChroma(L, hue));
    // Round chroma down, so the rounded value stays inside the gamut
    return [step, `oklch(${(L * 100).toFixed(0)}% ${(Math.floor(C * 1000) / 1000).toFixed(3)} ${hue.toFixed(1)})`];
  }));
}
```

`buildRamp('#2563eb')` returns this ramp. Steps 50 to 500 hit the gamut limit; from 600 down, the chroma share decides:

| Step | Chroma wanted | sRGB limit | Result | Hex |
|------|---------------|------------|--------|-----|
| 50 | 0.026 | 0.014 | `oklch(97% 0.014 262.9)` | `#f0f5ff` |
| 100 | 0.054 | 0.033 | `oklch(93% 0.033 262.9)` | `#dce8ff` |
| 200 | 0.097 | 0.063 | `oklch(87% 0.063 262.9)` | `#bfd5ff` |
| 300 | 0.151 | 0.100 | `oklch(80% 0.100 262.9)` | `#9cbeff` |
| 400 | 0.194 | 0.151 | `oklch(71% 0.150 262.9)` | `#6f9fff` |
| 500 | 0.215 | 0.198 | `oklch(63% 0.198 262.9)` | `#4581ff` |
| 600 | 0.215 | 0.242 | `oklch(56% 0.215 262.9)` | `#2968f0` |
| 700 | 0.194 | 0.245 | `oklch(49% 0.193 262.9)` | `#1f55cb` |
| 800 | 0.168 | 0.215 | `oklch(43% 0.167 262.9)` | `#1946a9` |
| 900 | 0.140 | 0.185 | `oklch(37% 0.139 262.9)` | `#143888` |
| 950 | 0.108 | 0.135 | `oklch(27% 0.107 262.9)` | `#072159` |

## Map ramp steps to roles: VaneUI's accent tokens

A theme does not use steps directly. It assigns each role a step per color scheme, and each assignment is a `light-dark()` pair. VaneUI's accent appearance in `@vaneui/ui` 1.7.2 assigns these:

| Role | Token | Light | Dark |
|------|-------|-------|------|
| Text | `--color-text-accent` | 700 | 400 |
| Background | `--color-bg-accent` | 50 | 950 |
| Hover background | `--color-bg-hover-accent` | 100 | 900 |
| Pressed background | `--color-bg-active-accent` | 200 | 950 |
| Filled background | `--color-bg-filled-accent` | 600 | 700 |
| Filled hover | `--color-bg-filled-hover-accent` | 700 | 800 |
| Filled pressed | `--color-bg-filled-active-accent` | 800 | 900 |
| Border | `--color-border-accent` | 300 | 700 |
| Focus ring | `--color-focus-accent` | 600 | 400 |
| Text on the fill | `--color-text-filled-accent` | white | white |

The dark column mirrors the light one around the middle of the ramp, with two adjustments for contrast. The filled background moves one step darker in dark mode (600 to 700), which keeps white text well above 4.5:1. The pressed background returns to 950 instead of going lighter than the hover step: a pressed tint at 800 would put the 400 text at 2.76:1, below 3:1. [Checking Color Contrast in Light and Dark Mode](/docs/guides/color-contrast-light-dark) covers how to measure each pair.

VaneUI's default accent with both schemes side by side:

```tsx demo
<Grid2>
  <div data-theme="light">
    <Card accent>
      <Text>Light: text 700 on background 50, border 300</Text>
      <Row flexWrap>
        <Button accent>Outline</Button>
        <Button accent filled>Filled 600</Button>
      </Row>
    </Card>
  </div>
  <div data-theme="dark">
    <Card accent>
      <Text>Dark: text 400 on background 950, border 700</Text>
      <Row flexWrap>
        <Button accent>Outline</Button>
        <Button accent filled>Filled 700</Button>
      </Row>
    </Card>
  </div>
</Grid2>
```

To apply the generated blue ramp, write the light steps on `:root` and the pairs on the `data-theme` elements, after the VaneUI stylesheet. [Dark Mode Tokens with light-dark() and Tailwind CSS v4](/docs/guides/light-dark-tailwind-v4) explains the selectors:

```css
:root {
  --color-text-accent: oklch(49% 0.193 262.9);
  --color-bg-accent: oklch(97% 0.014 262.9);
  --color-bg-hover-accent: oklch(93% 0.033 262.9);
  --color-bg-active-accent: oklch(87% 0.063 262.9);
  --color-bg-filled-accent: oklch(56% 0.215 262.9);
  --color-bg-filled-hover-accent: oklch(49% 0.193 262.9);
  --color-bg-filled-active-accent: oklch(43% 0.167 262.9);
  --color-border-accent: oklch(80% 0.100 262.9);
  --color-focus-accent: oklch(56% 0.215 262.9);
}

:root[data-theme],
[data-theme]:not(:root) {
  --color-text-accent: light-dark(oklch(49% 0.193 262.9), oklch(71% 0.150 262.9));
  --color-bg-accent: light-dark(oklch(97% 0.014 262.9), oklch(27% 0.107 262.9));
  --color-bg-hover-accent: light-dark(oklch(93% 0.033 262.9), oklch(37% 0.139 262.9));
  --color-bg-active-accent: light-dark(oklch(87% 0.063 262.9), oklch(27% 0.107 262.9));
  --color-bg-filled-accent: light-dark(oklch(56% 0.215 262.9), oklch(49% 0.193 262.9));
  --color-bg-filled-hover-accent: light-dark(oklch(49% 0.193 262.9), oklch(43% 0.167 262.9));
  --color-bg-filled-active-accent: light-dark(oklch(43% 0.167 262.9), oklch(37% 0.139 262.9));
  --color-border-accent: light-dark(oklch(80% 0.100 262.9), oklch(49% 0.193 262.9));
  --color-focus-accent: light-dark(oklch(56% 0.215 262.9), oklch(71% 0.150 262.9));
}
```

With this ramp, accent text measures 6.52:1 on white and 7.74:1 on VaneUI's gray-950 dark page, and white text measures 4.84:1 on the light fill and 6.52:1 on the dark one. Measure again after changing the lightness table: equal OKLCH lightness does not give equal WCAG contrast across hues, and the 600 step of a teal ramp built from `#14b8a6` measures 4.42:1 against white, under the 4.5:1 minimum.

## Convert a hex brand color to OKLCH

A hex color is sRGB, so its OKLCH form is always inside the gamut. The conversion has four steps: read each channel as a number from 0 to 1, undo the sRGB transfer curve to get linear light, multiply by the OKLab matrix into a cone-response space and take cube roots, then multiply again into OKLab and turn `a` and `b` into chroma and hue:

```ts
function hexToOklch(hex: string): [l: number, c: number, h: number] {
  const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [1, 3, 5].map((i) => toLinear(parseInt(hex.slice(i, i + 2), 16) / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), (Math.atan2(B, A) * 180 / Math.PI + 360) % 360];
}
```

`hexToOklch('#2563eb')` returns a lightness of 0.546, a chroma of 0.215 and a hue of 262.9, written as `oklch(54.6% 0.215 262.9)`. The function expects a six-digit `#rrggbb` value. The way back to hex runs `oklchToLinearSrgb`, applies the sRGB curve to each channel and scales to 0 to 255; check the gamut first, or the channels clip.

The [OKLCH converter](/tools/oklch-converter) converts in both directions and shows when a color falls outside sRGB. To turn a brand hex into the full set of accent tokens for both schemes, continue in the [theme generator](/tools/theme-generator), and see [CSS Variables](/docs/customization/css-variables) for the other color groups VaneUI reads.
