VaneUI components read a small, semantic set of CSS custom properties. Override these variables to change colors globally or for any subtree. This page lists only the variables used by @vaneui/ui and how to override them.

## How it works
- The library defines and consumes the variables listed below.
- You override them with standard CSS (use :root for global, or any container for scoped changes).
- Components inherit the closest values automatically.

## Appearance values

Replace `{appearance}` in variable names with one of:
- `primary` - neutral/default styling (gray tones)
- `brand` - brand color (blue)
- `secondary` - subtle styling (light gray)
- `tertiary` - muted styling (darker gray)
- `accent` - highlight color (rose)
- `success` - positive feedback (green)
- `danger` - error/destructive (red)
- `warning` - caution (amber)
- `info` - informational (cyan)

## Variable groups

### Text colors
- `--color-text-{appearance}` - text color for outline variant
- `--color-text-filled-{appearance}` - text color for filled variant
- `--color-text-link` - link text color

### Background colors
- `--color-bg-{appearance}` - background for outline variant
- `--color-bg-hover-{appearance}` - hover state background
- `--color-bg-active-{appearance}` - active state background
- `--color-bg-filled-{appearance}` - background for filled variant
- `--color-bg-filled-hover-{appearance}` - filled hover state
- `--color-bg-filled-active-{appearance}` - filled active state
- `--color-bg-layout-{appearance}` - layout component backgrounds
- `--color-bg-filled-layout-{appearance}` - filled layout backgrounds

### Border colors
- `--color-border-{appearance}` - border color for outline variant
- `--color-border-filled-{appearance}` - border color for filled variant

## Global override (site-wide)
```css
/* styles/globals.css */
:root {
  /* customize brand colors */
  --color-text-brand: #8b5cf6;
  --color-bg-brand: #f3e8ff;
  --color-border-brand: #c4b5fd;
}
```

## Scoped override (specific section)
```css
/* Only affects components inside .marketing */
.marketing {
  --color-text-primary: #059669;
  --color-bg-primary: #ecfdf5;
  --color-border-primary: #6ee7b7;
}
```

## Notes and tips
- Use the semantic names above; avoid inventing new variable names.
- Values cascade. The closest definition (inline, container, :root) wins.
- Prefer semantic overrides (primary, brand, success, danger) for consistent theming.
- ThemeProvider does not expose a `colors` field; use these CSS variables to change colors. You can still use ThemeProvider for defaults and extra classes.
