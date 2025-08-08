# CSS Variables (@vaneui/ui)

VaneUI components read a small, semantic set of CSS custom properties. Override these variables to change colors and radii globally or for any subtree. This page lists only the variables used by @vaneui/ui and how to override them.

## How it works
- The library defines and consumes the variables listed below.
- You override them with standard CSS (use :root for global, or any container for scoped changes).
- Components inherit the closest values automatically.

## Variable groups

Text colors
- --text-color-default
- --text-color-primary
- --text-color-secondary
- --text-color-tertiary
- --text-color-link
- --text-color-accent
- --text-color-success
- --text-color-danger
- --text-color-warning
- --text-color-info

Background colors
- --background-color-default
- --background-color-primary
- --background-color-secondary
- --background-color-tertiary
- --background-color-accent
- --background-color-success
- --background-color-danger
- --background-color-warning
- --background-color-info

Filled variant colors
- --filled-background-color-default
- --filled-background-color-primary
- --filled-background-color-secondary
- --filled-background-color-success
- --filled-background-color-danger
- Optional hover variables may be used by some components, following:
  - --filled-background-color-hover-{variant}

Border colors
- --border-color-default
- --border-color-primary
- --border-color-secondary
- --border-color-success
- --border-color-danger
- --border-color-warning
- --border-color-info

Radii
- --ui-border-radius-xs
- --ui-border-radius-sm
- --ui-border-radius-md
- --ui-border-radius-lg
- --ui-border-radius-xl
- Layout containers may also use:
  - --layout-border-radius-xs
  - --layout-border-radius-sm
  - --layout-border-radius-md
  - --layout-border-radius-lg
  - --layout-border-radius-xl

## Global override (site‑wide)
```css
/* styles/globals.css */
:root {
  /* brand text */
  --text-color-primary: #8b5cf6;
  /* brand surfaces */
  --background-color-primary: #f3e8ff;
  /* borders */
  --border-color-primary: #c4b5fd;
  /* rounded controls */
  --ui-border-radius-md: 0.75rem;
}
```

## Scoped override (specific section)
```css
/* Only affects components inside .marketing */
.marketing {
  --text-color-primary: #059669;
  --background-color-primary: #ecfdf5;
  --border-color-primary: #6ee7b7;
}
```

## Notes and tips
- Use the semantic names above; avoid inventing new variable names.
- Values cascade. The closest definition (inline, container, :root) wins.
- Prefer semantic overrides (primary, success, danger) for consistent theming.
- ThemeProvider does not expose a `colors` field; use these CSS variables to change colors. You can still use ThemeProvider for defaults and extra classes.

That’s it — override these variables to theme @vaneui/ui components simply and predictably.
