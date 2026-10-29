`data-theme="dark"` is the official dark-mode extension point. Set it on `<html>` or on a wrapping element, and every VaneUI component inside switches to its dark colors with no component code changes. `data-theme="light"` makes a subtree light again inside a dark page. A page with no `data-theme` attribute keeps the `@theme` values and is unaffected by the dark-mode rules.

## How the light-dark() color pairs resolve

From `@vaneui/ui` 1.4.5, each scheme color is one [`light-dark()`](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) pair of a light and a dark value, such as `--color-bg-primary: light-dark(#fff, oklch(13% 0.028 261.692))` (white and gray-950). The full list of pairs, covering text, background, hover, active, border, focus ring and overlay colors, is declared on every `data-theme="dark"` element and on every `data-theme="light"` element below `<html>`. The same rules set `color-scheme`, which picks the side of each pair:

| Attribute | `color-scheme` | Each pair resolves to |
|-----------|----------------|-----------------------|
| `data-theme="dark"` | `dark` | its dark value |
| `data-theme="light"` below `<html>` | `light` | its light value |
| none | not set | no pairs apply; the `@theme` values do |

Tokens not in the list keep their `@theme` value in both schemes. Most of them are filled-variant colors, such as the 100-level text tints on filled `success` or `danger` surfaces. Because the tokens are CSS custom properties, any element under a `data-theme` ancestor reads the resolved values through the cascade.

The dark scheme also deepens shadows: it raises `--shadow-alpha` from 0.1 to 0.4 and `--shadow-alpha-soft` from 0.06 to 0.25, and a light subtree resets both.

## Whole-page dark mode

Set `data-theme="dark"` on the `<html>` element to theme the entire page, including portaled content (Modal, Popup, Overlay) and native controls. The rule sets `color-scheme: dark`, so scrollbars and form controls render in their dark forms, and VaneUI paints the page itself with the dark surface color. A background you set on `html` or `body` still wins.

```html
<html data-theme="dark">
```

Under server-side rendering, the attribute must already be present in the server-rendered markup, otherwise the first paint shows light mode and then flips. When the theme is stored client-side, set the attribute from an inline `<head>` script that runs before first paint:

```html
<script>
  if (localStorage.theme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
  }
</script>
```

## Theming one subtree

To darken a region of an otherwise light page, set `data-theme="dark"` on a wrapping element. The dark token values inherit through that subtree:

```tsx
<div data-theme="dark">
  <Card>Dark card on an otherwise light page</Card>
</div>
```

The wrapper `<div>` paints nothing on its own. Give the subtree a surface: a [Card](/docs/layout-components/card), or a [Section](/docs/layout-components/section) with an explicit appearance (`<Section primary>`). Either reads the dark background token and fills the area; a bare `Section` paints nothing.

## Light regions inside a dark page

`data-theme="light"` on an element inside a dark page or a dark wrapper makes that subtree light. It sets `color-scheme: light`, so every pair resolves to its light value, and it resets the shadow alphas. Use it for a light preview panel, an embedded document or a sample that must stay light whatever the page theme. Before 1.4.5, it only reset `color-scheme`, and the dark colors still came through.

```tsx demo
<div data-theme="dark">
  <Card>
    <Text>Dark surface</Text>
    <div data-theme="light">
      <Card sm>
        <Text>Light card inside the dark surface</Text>
        <Row>
          <Button>Primary</Button>
          <Button filled>Filled</Button>
        </Row>
      </Card>
    </div>
  </Card>
</div>
```

The demo renders the same in both site themes: the outer wrapper is always dark and the inner one always light. On `<html>` itself, `data-theme="light"` changes nothing, since the light rule skips the root element. Token customizations for the light page keep working when a theme toggle sets `data-theme="light"` on `<html>`.

## Overlays follow the page theme

[Modal](/docs/overlay-components/modal), `Popup`, and `Overlay` render through a portal at the end of `<body>`, so they resolve the theme set on `<html>` or `<body>`, not the theme of an inner wrapper. Subtree theming covers in-flow content. For overlays, `<html data-theme="dark">` is the primary supported mode.

## Changing a color in both schemes

A token you re-declare on `:root` alone (as in the [CSS variables global override](/docs/customization/css-variables)) reaches pages without `data-theme`, but the scheme rules declare it again on dark elements and light subtrees, so the change does not show on a dark page or in a light region. To change a color in both schemes, declare it as a `light-dark()` pair on the `data-theme` elements, and keep the light value on `:root` for pages without `data-theme`:

```css
/* after the @vaneui/ui stylesheet */
:root {
  --color-bg-info: oklch(95% 0.02 220);
}

:root[data-theme],
[data-theme]:not(:root) {
  --color-bg-info: light-dark(oklch(95% 0.02 220), oklch(30% 0.05 220));
}
```

`:root[data-theme]` covers `<html data-theme="...">` and `[data-theme]:not(:root)` covers subtree wrappers. Both selectors carry the same weight as the built-in scheme rules, so the rule wins when it comes after the VaneUI stylesheet, including in a light region inside a dark page.

Keep `light-dark()` pairs off a `:root`-only rule. Bundlers that compile `light-dark()` for older browsers resolve it where the variable is declared, so a pair declared once on `:root` would not switch inside nested `data-theme` subtrees.

## Browser support for light-dark()

Uncompiled, `light-dark()` needs Chrome 123, Firefox 120 or Safari 17.5. Bundlers that compile it for older browsers keep those browsers working, and Next.js does so by default. The pairs apply only on `data-theme` elements, so a page without `data-theme` does not depend on `light-dark()` support.

## Custom named themes

The dark scheme is one instance of a general pattern: re-declare any `--color-*` token under a selector of your choice. A named theme works the same way:

```css
[data-theme="ocean"] {
  --color-bg-info: oklch(95% 0.02 220);
  --color-text-info: oklch(45% 0.12 220);
}
```

Apply it with `data-theme="ocean"` on any element, and the subtree reads the overridden tokens.
