VaneUI components read a small, semantic set of CSS custom properties. Override these variables to change colors globally or for any subtree. This page lists only the variables used by @vaneui/ui and how to override them.

## How it works
- The library defines and consumes the variables listed below.
- You override them with standard CSS (use :root for global, or any container for scoped changes).
- Components inherit the closest values automatically.

## Variable groups

### Text colors
- --color-text-primary
- --color-text-brand
- --color-text-secondary
- --color-text-tertiary
- --color-text-link
- --color-text-accent
- --color-text-success
- --color-text-danger
- --color-text-warning
- --color-text-info

### Filled variant text colors
- --color-text-filled-primary
- --color-text-filled-brand
- --color-text-filled-secondary
- --color-text-filled-tertiary
- --color-text-filled-accent
- --color-text-filled-success
- --color-text-filled-danger
- --color-text-filled-warning
- --color-text-filled-info

### Background colors (outline variant)
- --color-bg-primary
- --color-bg-brand
- --color-bg-secondary
- --color-bg-tertiary
- --color-bg-accent
- --color-bg-success
- --color-bg-danger
- --color-bg-warning
- --color-bg-info

### Filled variant background colors
- --color-bg-filled-primary
- --color-bg-filled-brand
- --color-bg-filled-secondary
- --color-bg-filled-tertiary
- --color-bg-filled-accent
- --color-bg-filled-success
- --color-bg-filled-danger
- --color-bg-filled-warning
- --color-bg-filled-info
- Hover variants: --color-bg-filled-hover-{appearance}
- Active variants: --color-bg-filled-active-{appearance}

### Layout background colors
- --color-bg-layout-primary
- --color-bg-layout-brand
- --color-bg-layout-secondary
- --color-bg-layout-tertiary
- --color-bg-layout-accent
- --color-bg-layout-success
- --color-bg-layout-danger
- --color-bg-layout-warning
- --color-bg-layout-info

### Border colors
- --color-border-primary
- --color-border-brand
- --color-border-secondary
- --color-border-tertiary
- --color-border-accent
- --color-border-success
- --color-border-danger
- --color-border-warning
- --color-border-info

### Filled variant border colors
- --color-border-filled-primary
- --color-border-filled-brand
- --color-border-filled-secondary
- --color-border-filled-tertiary
- --color-border-filled-accent
- --color-border-filled-success
- --color-border-filled-danger
- --color-border-filled-warning
- --color-border-filled-info

## Global override (site-wide)
```css
/* styles/globals.css */
:root {
  /* brand text */
  --color-text-brand: #8b5cf6;
  /* brand surfaces */
  --color-bg-brand: #f3e8ff;
  /* borders */
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

That's it — override these variables to theme @vaneui/ui components simply and predictably.
