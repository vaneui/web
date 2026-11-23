VaneUI components use a three-tier CSS variable system. Override these variables to change colors globally or for any subtree. This page explains the variable architecture and how to customize it.

## Three-tier variable system

### Tier 1: unit variables
Set per-component in `rules.css` based on the `data-size` attribute. Each per-size block sets all the unit vars that scale with size (typically `--fs-unit`, `--py-unit`, and for Icon `--icon-size`) so font-size, padding, gap, and border-radius all change together:
```css
.vane-button[data-size="md"] {
  --fs-unit: var(--fs-unit-md);   /* Font size unit (8 by default) */
  --py-unit: 2;                   /* Padding Y unit */
}

/* --gap-unit and --br-unit (for layout) come from data-vane-type defaults */
[data-vane-type="ui"][data-size="md"]     { --gap-unit: 2; }
[data-vane-type="layout"][data-size="md"] { --br-unit: 3; --gap-unit: 4; --py-unit: 4; }
```

### Tier 2: computed variables
Calculated from unit variables in `@layer base`:
```css
[data-size] {
  --fs: calc(var(--fs-unit) * var(--fs-base));                       /* Font size */
  --py: calc(var(--py-unit) * var(--spacing));                       /* Padding Y */
  --px: calc(var(--aspect-ratio) * var(--py-unit) * var(--spacing)); /* Padding X */
  --br: calc(var(--br-unit) * var(--br-base) * var(--br-scale));     /* Border radius (layout) */
  --gap: calc(var(--gap-unit) * var(--spacing));                     /* Gap */
}

/* UI border-radius is a ratio of element height, not a flat multiplier: */
[data-vane-type="ui"][data-size] {
  --br: calc((var(--fs-unit) * 0.5 * var(--lh) + 2 * var(--py-unit))
             * var(--br-unit) * var(--spacing) * var(--br-scale));
}
```

### Tier 3: semantic color variables
Set by `data-variant` + `data-appearance` attribute combinations:
```css
[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
  --border-color: var(--color-border-primary);
}
```

### Icon sizing: decoupled from font size
Components that render icons (`Button`, `IconButton`, `Icon`, `Badge`, `Chip`, `Menu`, `NavLink`, `Link`, `ListItem`) size icons via `--icon-size`, not `--fs`. For most components this is `var(--fs)` (the element's own font-size), but `Icon` sets it independently per size as `calc(var(--spacing) * N)`. An `<Icon md>` is 5 × `--spacing` (20px) regardless of any inherited font-size:

```css
.vane-icon[data-size="md"] { --icon-size: calc(var(--spacing) * 5); }
.vane-icon[data-size="lg"] { --icon-size: calc(var(--spacing) * 6); }
```

## Appearance values

Replace `{appearance}` in variable names with one of:
- `primary` - neutral/default styling (gray tones)
- `secondary` - subtle styling (light gray)
- `tertiary` - muted styling (darker gray)
- `accent` - highlight color (rose)
- `success` - positive feedback (green)
- `danger` - error/destructive (red)
- `warning` - caution (amber)
- `info` - informational (cyan)
- `inheritAppearance` - inherits from parent element

> The `inheritAppearance` appearance works differently from all other appearances. Instead of setting `data-appearance` and `data-variant` attributes, it omits them entirely. This allows the semantic color CSS variables (`--text-color`, `--bg-color`, `--border-color`) to [cascade from parent elements](/docs/customization/variant-inheritance) rather than being set explicitly on the component. Text, Title, SectionTitle, PageTitle, Blockquote, Label, List, Divider, and Spinner default to `inheritAppearance`.

## Color variable groups

### Text colors
- `--color-text-{appearance}` - text color for outline variant
- `--color-text-filled-{appearance}` - text color for filled variant

### Background colors
- `--color-bg-{appearance}` - background for outline variant
- `--color-bg-hover-{appearance}` - hover state background
- `--color-bg-active-{appearance}` - active state background
- `--color-bg-filled-{appearance}` - background for filled variant
- `--color-bg-filled-hover-{appearance}` - filled hover state
- `--color-bg-filled-active-{appearance}` - filled active state

### Border colors
- `--color-border-{appearance}` - border color for outline variant
- `--color-border-form` - border color for unchecked `Checkbox`, `Radio`, and `Switch` controls. One step darker than the layout border (`gray-300` vs `gray-200`) so controls stay distinct on light surfaces. Kept off the appearance system, so secondary or tertiary `Card`, `Button`, and `Chip` keep their lighter border.

### Focus ring colors
- `--color-focus-{appearance}` - focus-visible outline color (used by all variants)

## Base variables

VaneUI defines base variables in the `@theme` block (in `tokens.css`) that control the foundation of the sizing system:

```css
@theme {
  --fs-base: calc(var(--spacing) * 0.5);  /* Font size base (0.125rem at default spacing) */
  --br-base: var(--spacing);               /* Border radius base */
  --br-scale: 1;                           /* Multiplies every corner radius */
  --lh-base: 1.6;                          /* Line height base */
}
```

### Corner radius for the whole library

Every corner radius in VaneUI is multiplied by `--br-scale`: the controls (Button, Input, Checkbox, Badge, Avatar and the others), whose corners follow their height, and the surfaces (Card, Modal, Img, Popup, Tooltip, Alert), whose corners follow `--br-base`. Set it once to make the whole library sharper or rounder. `pill` and `sharp` keep their shape at any value.

```css
:root {
  --br-scale: 0;    /* square corners everywhere */
}

[data-theme="playful"] {
  --br-scale: 2;    /* twice as round, in one subtree */
}
```

At the default scale, surfaces run 8, 10, 12, 14 and 16px from `xs` to `xl`, so a `md` Card has about 1.5 times the corners of the `sm` Button inside it. `--br-base` still moves the surfaces alone. `--br-scale` and these surface corners need `@vaneui/ui` 1.8.0 or later; earlier releases had 12 to 28px surfaces.

### Font size unit scale
These variables define the font size multipliers for each size. At Tailwind's default `--spacing: 0.25rem`, `--fs-base` = 0.125rem:

```css
--fs-unit-xs: 6;   /* xs = 6  × 0.125rem = 0.75rem  (12px) */
--fs-unit-sm: 7;   /* sm = 7  × 0.125rem = 0.875rem (14px) */
--fs-unit-md: 8;   /* md = 8  × 0.125rem = 1rem     (16px) */
--fs-unit-lg: 9;   /* lg = 9  × 0.125rem = 1.125rem (18px) */
--fs-unit-xl: 10;  /* xl = 10 × 0.125rem = 1.25rem  (20px) */
```

### Component-specific sizing

Padding, gap, and radius values are set per-component (and per `data-vane-type`) in `rules.css`:

```css
/* UI defaults (Button, Badge, Chip, Text, etc.) */
[data-vane-type="ui"][data-size="md"] { --gap-unit: 2; }

/* Layout defaults (Card, Row, Col, Stack, Section, Container, Grid*) */
[data-vane-type="layout"][data-size="md"] { --br-unit: 3; --gap-unit: 4; --py-unit: 4; }

/* Per-component overrides: Button sets its own --py-unit per size */
.vane-button[data-size="md"] { --fs-unit: var(--fs-unit-md); --py-unit: 2; }
```

To customize sizing globally, override the computed variables in your CSS:
```css
:root {
  /* Make all spacing slightly larger */
  --spacing: 0.3rem;  /* Tailwind's default is 0.25rem */
}
```

## Global override (site-wide)
```css
/* styles/globals.css */
:root {
  /* Customize info colors */
  --color-text-info: #8b5cf6;
  --color-bg-info: #f3e8ff;
  --color-border-info: #c4b5fd;
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
- [ThemeProvider](/docs/customization/using-theme-provider) does not expose a `colors` field; use these CSS variables to change colors.
- Components inherit the closest CSS variable values automatically via CSS cascade.
