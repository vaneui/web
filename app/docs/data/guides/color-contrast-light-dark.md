Color contrast is the ratio between the relative luminance of two colors, and WCAG sets the minimum ratio for text and controls. A theme with dark mode has two sets of colors, so every text and surface pairing needs two checks, one per scheme. This guide covers the WCAG 2.2 AA thresholds, the luminance formula behind them, how to check a `light-dark()` pair, and when a filled button needs dark text instead of white. The [contrast checker](/tools/contrast-checker) measures any two colors with the same formula.

## WCAG 2.2 AA contrast thresholds

Two success criteria set the AA minimums:

| What is measured | Criterion | Minimum |
|------------------|-----------|---------|
| Text and images of text | 1.4.3 Contrast (Minimum) | 4.5:1 |
| Large text: 24px, or 18.66px bold (18pt and 14pt) | 1.4.3 Contrast (Minimum) | 3:1 |
| The visual parts needed to identify a control and its state, such as an input's border or a checkbox's box | 1.4.11 Non-text Contrast | 3:1 against adjacent colors |
| A focus indicator | 1.4.11 Non-text Contrast | 3:1 against adjacent colors |

The thresholds are not rounded: 4.49:1 fails 4.5:1. Disabled controls, logos and decorative text are exempt. A border that only decorates a control whose label already identifies it, such as the outline of a text button, does not need 3:1. The border of an empty text input does, because it is the only thing that shows where the field is. 2.4.13 Focus Appearance adds size rules for focus indicators, but it sits at level AAA.

## The relative luminance formula

WCAG computes contrast from relative luminance, the light a color emits on a 0 to 1 scale:

1. Divide each sRGB channel by 255.
2. Linearize each channel: a value `c` at or below 0.04045 becomes `c / 12.92`, a larger one `((c + 0.055) / 1.055) ^ 2.4`.
3. Weight the channels: `L = 0.2126 R + 0.7152 G + 0.0722 B`.
4. Divide the lighter luminance plus 0.05 by the darker plus 0.05. The result runs from 1:1 to 21:1.

```ts
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

contrast('#2563eb', '#ffffff'); // 5.168...
```

An OKLCH color needs converting to sRGB first. `oklchToLinearSrgb` from [OKLCH Color Scales for UI Themes](/docs/guides/oklch-color-scales) returns linear channels, so a color inside the gamut goes straight to step 3. A color outside the gamut has to be brought inside first, and the method changes the result: VaneUI's light filled accent, rose-600, gives white text 4.52:1 when clipped to sRGB and 4.71:1 when its chroma is reduced instead. Unless noted, the ratios on this page come from colors clipped to sRGB, truncated to two decimals so a value shown as passing is never rounded up.

OKLCH lightness is not WCAG luminance. The 600 steps of three ramps built with the OKLCH guide's code, from `#2563eb`, `#f5b700` and `#14b8a6`, all sit at 56% lightness. They give white text 4.84:1, 4.72:1 and 4.42:1, so the teal fails although all three look equally light.

## Why each color scheme needs its own check

A `light-dark()` token holds two colors, and in dark mode the text and the surface under it both change. A pairing that passes in one scheme says nothing about the other. Rose-700 text measures 6.03:1 on white, but on VaneUI's gray-950 dark page it measures 3.33:1. That is why `--color-text-accent` moves to rose-400 in dark mode.

VaneUI's accent pairs, checked per scheme:

| Pairing | Light | Dark |
|---------|-------|------|
| `--color-text-accent` on `--color-bg-primary` | 6.03:1 (rose-700 on white) | 7.03:1 (rose-400 on gray-950) |
| `--color-text-accent` on `--color-bg-accent` | 5.49:1 (rose-700 on rose-50) | 5.48:1 (rose-400 on rose-950) |
| `--color-text-filled-accent` on `--color-bg-filled-accent` | 4.52:1 (white on rose-600) | 6.03:1 (white on rose-700) |
| `--color-focus-accent` against `--color-bg-primary` | 4.52:1 (rose-600 on white) | 7.03:1 (rose-400 on gray-950) |

Check each state as well. A hover or pressed background sits under the same text, so the text needs its minimum against every background a control can show. The [Dark Mode](/docs/customization/dark-mode) page describes which token groups switch between schemes.

## Check a light-dark() pair

Split each pair into its light and dark color, then compare light with light and dark with dark. A text pair is checked against every surface pair it can sit on. Never compare across schemes: light text on a dark surface never renders.

```ts
type Pair = [light: string, dark: string];

function checkPair(text: Pair, surface: Pair, minimum = 4.5) {
  return (['light', 'dark'] as const).map((scheme, i) => {
    const ratio = contrast(text[i], surface[i]);
    return { scheme, ratio: Math.floor(ratio * 100) / 100, pass: ratio >= minimum };
  });
}

// --color-text-accent on --color-bg-primary, as sRGB hex
checkPair(['#c70036', '#ff637e'], ['#ffffff', '#030712']);
// [{ scheme: 'light', ratio: 6.03, pass: true }, { scheme: 'dark', ratio: 7.03, pass: true }]
```

Pass `minimum = 3` for large text, borders that identify a control, and focus rings. In a running app, set `data-theme` on `<html>`, inspect a text element, and read the ratio in the browser dev tools color picker; then switch the attribute and read it again.

Filled buttons of each appearance in both schemes, with their default text tokens:

```tsx demo
<Grid2>
  <div data-theme="light">
    <Card>
      <Row flexWrap>
        <Button filled>Primary</Button>
        <Button accent filled>Accent</Button>
        <Button success filled>Success</Button>
        <Button warning filled>Warning</Button>
        <Button danger filled>Danger</Button>
      </Row>
    </Card>
  </div>
  <div data-theme="dark">
    <Card>
      <Row flexWrap>
        <Button filled>Primary</Button>
        <Button accent filled>Accent</Button>
        <Button success filled>Success</Button>
        <Button warning filled>Warning</Button>
        <Button danger filled>Danger</Button>
      </Row>
    </Card>
  </div>
</Grid2>
```

## White or dark text on a filled button

The formula fixes where white stops working. White text reaches 4.5:1 on a fill whose luminance is 0.183 or less, and black text on a fill of 0.175 or more, so every fill passes with one of the two. A dark gray is a different case: gray-900 text (luminance 0.009) needs a fill of 0.216 or more. A fill between 0.183 and 0.216 passes with neither white nor gray-900. Move the fill out of that band, or use a darker text color such as gray-950, which passes from 0.185.

VaneUI's filled text tokens follow the same rule: each is the lightest text that keeps 4.5:1 on its fill. That gives white on the primary, accent and danger fills, gray-50 on tertiary, and a 100-level tint on the others, such as emerald-100 on emerald-700 (4.72:1) and amber-100 on amber-700 (4.51:1).

A light brand color reverses the choice. A yellow fill, `#facc15`, gives white text 1.53:1 and gray-900 text 11.58:1. To use it as the accent fill, set the fill steps in both schemes and switch the filled text to dark gray:

```css
/* after the VaneUI stylesheet */
:root,
:root[data-theme],
[data-theme]:not(:root) {
  --color-bg-filled-accent: #facc15;
  --color-bg-filled-hover-accent: #eab308;
  --color-bg-filled-active-accent: #ca8a04;
}

:root {
  --color-text-filled-accent: oklch(21% 0.034 264.665); /* gray-900 */
  --color-focus-accent: #a16207;
}

:root[data-theme],
[data-theme]:not(:root) {
  --color-focus-accent: light-dark(#a16207, #facc15);
}
```

Gray-900 text keeps 9.25:1 on the hover step and 6.04:1 on the pressed step. `--color-text-filled-accent` needs only the `:root` rule, because VaneUI keeps it out of the dark scheme pairs. The focus ring needs its own pair: the yellow measures 1.53:1 against a white page, under the 3:1 a focus indicator needs, while `#a16207` measures 4.92:1. On the gray-950 dark page the yellow itself measures 13.14:1. The props a filled [Button](/docs/basic-components/button) takes are listed on its page.

Paste any of the pairs above into the [contrast checker](/tools/contrast-checker) to read both schemes at once, and change a step there until both sides pass.
