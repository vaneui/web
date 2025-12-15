# CSS Variables (@vaneui/ui)

VaneUI components read a small, semantic set of CSS custom properties. Override these variables to change colors globally or for any subtree. This page lists only the variables used by @vaneui/ui and how to override them.

## How it works
- The library defines and consumes the variables listed below.
- You override them with standard CSS (use :root for global, or any container for scoped changes).
- Components inherit the closest values automatically.

## Variable groups

Text colors
- --color-text-default
- --color-text-primary
- --color-text-secondary
- --color-text-tertiary
- --color-text-link
- --color-text-accent
- --color-text-success
- --color-text-danger
- --color-text-warning
- --color-text-info

Background colors (outline variant)
- --color-bg-default
- --color-bg-primary
- --color-bg-secondary
- --color-bg-tertiary
- --color-bg-accent
- --color-bg-success
- --color-bg-danger
- --color-bg-warning
- --color-bg-info

Filled variant background colors
- --color-bg-filled-default
- --color-bg-filled-primary
- --color-bg-filled-secondary
- --color-bg-filled-success
- --color-bg-filled-danger
- --color-bg-filled-warning
- --color-bg-filled-info
- Hover variants: --color-bg-filled-hover-{variant}
- Active variants: --color-bg-filled-active-{variant}

Border colors
- --color-border-default
- --color-border-primary
- --color-border-secondary
- --color-border-tertiary
- --color-border-success
- --color-border-danger
- --color-border-warning
- --color-border-info

## Global override (site‑wide)
```css
/* styles/globals.css */
:root {
  /* brand text */
  --color-text-primary: #8b5cf6;
  /* brand surfaces */
  --color-bg-primary: #f3e8ff;
  /* borders */
  --color-border-primary: #c4b5fd;
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
- Prefer semantic overrides (primary, success, danger) for consistent theming.
- ThemeProvider does not expose a `colors` field; use these CSS variables to change colors. You can still use ThemeProvider for defaults and extra classes.

That's it — override these variables to theme @vaneui/ui components simply and predictably.
