Dark mode tokens are color variables that hold two values, one per color scheme. CSS can now store both values in one declaration with `light-dark()`, and VaneUI ships its dark theme that way: every scheme color is a `light-dark()` pair, and the `data-theme` attribute picks the side. This guide covers how the function resolves, where VaneUI declares its pairs, and how to override a token so it changes in both schemes. The [theme generator](/tools/theme-generator) builds token CSS from one brand color; the sections below explain what that CSS does and where it goes.

## How light-dark() picks a value from color-scheme

`light-dark(a, b)` returns `a` when the element's used color scheme is light and `b` when it is dark. The used color scheme comes from the `color-scheme` property, which is inherited:

| `color-scheme` | `light-dark(a, b)` returns |
|----------------|----------------------------|
| `light` | `a` |
| `dark` | `b` |
| `light dark` | `a` or `b`, following the operating system preference |
| `normal` (the initial value) | `a`, unless a `<meta name="color-scheme">` tag sets dark |

```css
.note {
  color-scheme: dark;
  background: light-dark(#ffffff, #030712);
  color: light-dark(#101828, #f9fafb);
}
```

`color-scheme` also switches the browser's own surfaces: scrollbars, form controls and the default canvas follow it. The function accepts colors only, so lengths, shadows and images still need a separate rule per scheme.

Inside a custom property, the browser keeps `light-dark(a, b)` as written and resolves it on the element that reads the variable. A token declared on `:root` therefore resolves against the `color-scheme` of each element that uses it, which matters for the bundler section below.

## How VaneUI declares its pairs on data-theme elements

`@vaneui/ui/tokens` declares the tokens in three parts. The `@theme` block sets the light values on `:root`, for pages without `data-theme`:

```css
@theme {
  --color-text-accent: var(--color-rose-700);
  --color-bg-primary: var(--color-white);
}
```

Two rules set the scheme. `data-theme="dark"` sets `color-scheme: dark` and raises the shadow alphas; `data-theme="light"` on an element below `<html>` sets `color-scheme: light` and resets them. A third rule declares every scheme color as a pair on the same elements (shortened here; the shipped rule also lists `:host()` forms for shadow DOM):

```css
:root[data-theme="dark"],
[data-theme="dark"],
[data-theme="light"]:not(:root) {
  --color-text-accent: light-dark(oklch(51.4% 0.222 16.935), oklch(71.2% 0.194 13.428)); /* rose-700 / rose-400 */
  --color-bg-primary: light-dark(#fff, oklch(13% 0.028 261.692)); /* white / gray-950 */
}
```

Each value is a literal color, not a `var()` reference to a palette step, so a build that drops unused palette variables cannot leave a pair empty. Tokens that keep one value in both schemes are not in the list. Most of them are filled text colors: `--color-text-filled-accent` stays white on the accent fill in both schemes.

The result for a page:

| Markup | Colors |
|--------|--------|
| no `data-theme` | the `@theme` light values |
| `<html data-theme="dark">` | every pair resolves to its dark side, portals included |
| `<div data-theme="dark">` | the wrapper's subtree turns dark |
| `<div data-theme="light">` inside a dark page | that subtree turns light again |

The [Dark Mode](/docs/customization/dark-mode) page covers whole-page and subtree theming in detail. To follow the operating system preference, set `data-theme` from `matchMedia('(prefers-color-scheme: dark)')` in a `<head>` script, as the [Next.js setup](/docs/getting-started/nextjs) does.

The default `info` surface in each scheme, with a light and a dark wrapper:

```tsx demo
<Grid2>
  <div data-theme="light">
    <Card info>
      <Text>Light side of the --color-bg-info and --color-text-info pairs</Text>
    </Card>
  </div>
  <div data-theme="dark">
    <Card info>
      <Text>Dark side of the same pairs</Text>
    </Card>
  </div>
</Grid2>
```

## Point the Tailwind CSS dark variant at data-theme

Tailwind CSS v4's `dark:` variant follows `prefers-color-scheme` by default, so a `dark:` utility next to a VaneUI component can disagree with the tokens around it. Point the variant at the same attribute in your CSS entry:

```css
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));
```

A `dark:bg-*` class on your own markup then switches together with the VaneUI tokens. A `data-theme="light"` region inside a dark page still matches this selector, so a page with light regions adds a `:not()` that excludes them.

## Override a dark mode token in both schemes

A token re-declared on `:root` alone reaches pages without `data-theme`. On a dark page the pair rule declares the token again on the `data-theme` element, so the change does not show there. To change a color in both schemes, keep the light value on `:root` and declare the pair on the `data-theme` elements:

```css
/* after @import "@vaneui/ui/vars", or after the prebuilt @vaneui/ui/css */
:root {
  --color-text-accent: oklch(48.8% 0.243 264.376); /* blue-700 */
}

:root[data-theme],
[data-theme]:not(:root) {
  --color-text-accent: light-dark(oklch(48.8% 0.243 264.376), oklch(70.7% 0.165 254.624)); /* blue-700 / blue-400 */
}
```

The selectors are chosen for specificity. `:root[data-theme]` and `[data-theme]:not(:root)` both weigh one pseudo-class and one attribute, the same as the built-in `[data-theme="light"]:not(:root)` and `:root[data-theme="dark"]`. With equal weight, the rule that comes later wins, so the override must follow the VaneUI stylesheet. A bare `[data-theme]` weighs less and loses inside a light region of a dark page.

The pair covers both schemes, so `<html data-theme="light">` reads it too: VaneUI sets no `color-scheme` on the root for the light theme, and `normal` resolves to the light side.

## Why the pairs stay off a :root-only rule

Uncompiled, a pair declared once on `:root` would switch in every `data-theme` subtree: the browser resolves it where the variable is read, and each subtree sets its own `color-scheme`. Bundlers that compile `light-dark()` for older browsers change that. Next.js does so by default. The compiled form replaces each pair with two fallbacks that helper variables switch on and off, and the `color-scheme` declarations set those helpers. Custom properties substitute other variables where they are declared, so a token compiled on `:root` keeps the root's result, and a `data-theme="dark"` wrapper further down inherits the light value.

Declaring the pair on every `data-theme` element gives each scheme root its own declaration, and the compiled form resolves again there. Write your own pairs the same way: the light value on `:root`, the pair on `:root[data-theme], [data-theme]:not(:root)`.

## Portals read the theme of the page root

[Modal](/docs/overlay-components/modal), Popup and Overlay render through a portal at the end of `<body>`, and so do Menu and Tooltip, which float in a Popup. Their tokens come from `<html>` and `<body>`, not from the wrapper around the button that opened them. A `data-theme="dark"` wrapper themes in-flow content, and a dialog opened from inside it stays light. For an app whose overlays must match the page, put the attribute on `<html>`.

## Browser support for light-dark()

Uncompiled, `light-dark()` needs Chrome 123, Firefox 120 or Safari 17.5, and Edge follows Chrome. A compiled build supports older browsers through its fallbacks. A page without `data-theme` never reads a pair, so it renders the `@theme` values in every browser, with or without support for the function.

To produce the pairs for a brand color, including the filled, hover, border and focus tokens, use the [theme generator](/tools/theme-generator), and place its CSS after the VaneUI stylesheet as described above. How the steps of a scale map to those roles is covered in [OKLCH Color Scales for UI Themes](/docs/guides/oklch-color-scales).
