VaneUI components use a three-tier CSS variable system. Override these variables to change colors globally or for any subtree. This page explains the variable architecture and how to customize it.

## Three-Tier Variable System

### Tier 1: Unit Variables
Set by component class in `vars.css` based on the `data-size` attribute:
```css
.vane-button[data-size="md"] {
  --fs-unit: 8;    /* Font size unit */
  --py-unit: 2;    /* Padding Y unit */
  --br-unit: 2;    /* Border radius unit */
  --gap-unit: 2;   /* Gap unit */
}
```

### Tier 2: Computed Variables
Calculated from unit variables in `@layer base`:
```css
[data-size] {
  --fs: calc(var(--fs-unit) * var(--fs-base));   /* Font size */
  --py: calc(var(--py-unit) * var(--spacing));   /* Padding Y */
  --px: calc(var(--aspect-ratio) * var(--py));   /* Padding X */
  --br: calc(var(--br-unit) * var(--br-base));   /* Border radius */
  --gap: calc(var(--gap-unit) * var(--spacing)); /* Gap */
}
```

### Tier 3: Semantic Color Variables
Set by `data-variant` + `data-appearance` attribute combinations:
```css
[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
  --border-color: var(--color-border-primary);
}
```

## Appearance Values

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
- `link` - link color (blue)

## Color Variable Groups

### Text Colors
- `--color-text-{appearance}` - text color for outline variant
- `--color-text-filled-{appearance}` - text color for filled variant

### Background Colors
- `--color-bg-{appearance}` - background for outline variant
- `--color-bg-hover-{appearance}` - hover state background
- `--color-bg-active-{appearance}` - active state background
- `--color-bg-filled-{appearance}` - background for filled variant
- `--color-bg-filled-hover-{appearance}` - filled hover state
- `--color-bg-filled-active-{appearance}` - filled active state
- `--color-bg-layout-{appearance}` - layout component backgrounds
- `--color-bg-filled-layout-{appearance}` - filled layout backgrounds

### Border Colors
- `--color-border-{appearance}` - border color for outline variant
- `--color-border-filled-{appearance}` - border color for filled variant

## Base Variables

VaneUI defines base variables in the `@theme` block that control the foundation of the sizing system:

```css
@theme {
  --fs-base: calc(var(--spacing) * 0.5);  /* Font size base unit (0.5rem) */
  --br-base: var(--spacing);               /* Border radius base (1rem) */
  --lh-base: 1.6;                          /* Line height base */
}
```

### Font Size Unit Scale
These variables define the font size multipliers for each size:
```css
--fs-unit-xs: 6;   /* xs = 6 * 0.5rem = 0.75rem (12px) */
--fs-unit-sm: 7;   /* sm = 7 * 0.5rem = 0.875rem (14px) */
--fs-unit-md: 8;   /* md = 8 * 0.5rem = 1rem (16px) */
--fs-unit-lg: 9;   /* lg = 9 * 0.5rem = 1.125rem (18px) */
--fs-unit-xl: 10;  /* xl = 10 * 0.5rem = 1.25rem (20px) */
```

### Component-Specific Sizing

Padding, gap, and radius values are set per-component via CSS classes in `vars.css`:

```css
/* Button sizes */
.vane-button[data-size="md"] { --fs-unit: 8; --py-unit: 2; }

/* Layout component defaults based on type and size */
[data-vane-type="ui"][data-size="md"] { --br-unit: 2; --gap-unit: 2; }
[data-vane-type="layout"][data-size="md"] { --br-unit: 5; --gap-unit: 4; }
```

To customize sizing globally, override the computed variables in your CSS:
```css
:root {
  /* Make all spacing slightly larger */
  --spacing: 0.3rem;  /* Default is 0.25rem */
}
```

## Global Override (Site-wide)
```css
/* styles/globals.css */
:root {
  /* Customize brand colors */
  --color-text-brand: #8b5cf6;
  --color-bg-brand: #f3e8ff;
  --color-border-brand: #c4b5fd;
}
```

## Scoped Override (Specific Section)
```css
/* Only affects components inside .marketing */
.marketing {
  --color-text-primary: #059669;
  --color-bg-primary: #ecfdf5;
  --color-border-primary: #6ee7b7;
}
```

## Notes and Tips
- Use the semantic names above; avoid inventing new variable names.
- Values cascade. The closest definition (inline, container, :root) wins.
- Prefer semantic overrides (primary, brand, success, danger) for consistent theming.
- ThemeProvider does not expose a `colors` field; use these CSS variables to change colors.
- Components inherit the closest CSS variable values automatically via CSS cascade.
