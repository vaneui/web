`data-theme="dark"` is the official dark-mode extension point. The shipped CSS re-declares every color token under it, so switching to dark mode needs no component code changes.

## The dark-mode token block

VaneUI ships a `[data-theme="dark"]` block that re-declares every `--color-*` token with its dark value. Because the tokens are CSS custom properties, any element under a `data-theme="dark"` ancestor reads the dark values through the cascade. You opt in by setting the attribute; you never restyle components.

## Whole-page dark mode

Set `data-theme="dark"` on the `<html>` element to theme the entire page, including portaled content (Modal, Popup, Overlay) and native controls. The block also sets `color-scheme: dark`, so scrollbars and form controls render in their dark forms.

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

The wrapper `<div>` paints nothing on its own. Give the subtree a surface with a primary `Card` or `Section`, which reads the dark background token and fills the area.

## Overlays follow the page theme

`Modal`, `Popup`, and `Overlay` render through a portal at the end of `<body>`, so they resolve the theme set on `<html>` or `<body>`, not the theme of an inner wrapper. Subtree theming covers in-flow content. For overlays, `<html data-theme="dark">` is the primary supported mode.

## Forcing a light region

`data-theme="light"` marks an explicit light region and restores `color-scheme: light` for native controls. The light token values are the `:root` defaults, so inside a dark subtree the inherited dark tokens still apply. To render a fully light island within `data-theme="dark"`, re-declare the tokens you need under your own `[data-theme="light"]` selector.

## Custom named themes

The dark block is one instance of a general pattern: re-declare any `--color-*` token under a selector of your choice. A named theme works the same way as the built-in dark block:

```css
[data-theme="ocean"] {
  --color-bg-info: oklch(95% 0.02 220);
  --color-text-info: oklch(45% 0.12 220);
}
```

Apply it with `data-theme="ocean"` on any element, and the subtree reads the overridden tokens.
