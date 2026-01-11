VaneUI helps you build beautiful, consistent UIs faster by turning common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

## Boolean Props API

At its core, VaneUI uses **boolean props** instead of string enums for cleaner JSX:

```tsx
// VaneUI approach
<Button primary lg filled>Submit</Button>

// Instead of traditional
<Button appearance="primary" size="lg" variant="filled">Submit</Button>
```

Props are organized into **categories**:
- **size**: `xs`, `sm`, `md`, `lg`, `xl`
- **appearance**: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`
- **variant**: `filled`, `outline`
- **shape**: `rounded`, `pill`, `sharp`
- **typography**: `sans`, `serif`, `mono`, `semibold`, `bold`, etc.
- **layout**: `flex`, `column`, `itemsCenter`, `justifyBetween`, etc.

## How Components Work

VaneUI components follow a three-layer architecture:

### Layer 1: React Component
Each component gets its theme from `ThemeContext` via `useTheme()` and passes props to `ThemedComponent`, which computes the final CSS classes.

### Layer 2: Theme System
The `ComponentTheme` class orchestrates class generation. It walks a tree of `BaseTheme` subclasses (like `FontSizeTheme`, `RadiusTheme`) that each generate specific CSS classes based on the active props.

### Layer 3: CSS Variables
Components output **data attributes** (`data-size`, `data-appearance`, `data-variant`) that CSS rules in `vars.css` use to set CSS variables. These variables are then consumed by Tailwind utility classes.

## Prop Extraction

When you pass props, VaneUI selects ONE value per category based on priority:

```tsx
// Props: { lg: true, primary: true }
// Defaults: { md: true, outline: true }

<Button lg primary>Submit</Button>
// Result: size='lg' (prop wins), appearance='primary', variant='outline' (default)
```

**Priority order**:
1. Props explicitly set to `true`
2. Defaults set to `true` (unless explicitly set to `false` in props)

## Prop Combinations

Boolean props can be combined naturally to create the exact styling you need:

```tsx
<Button primary lg pill shadow>
  Large primary pill button with shadow
</Button>

<Card secondary filled>
  Filled secondary card
</Card>

<Stack itemsCenter gap>
  Stack with centered items and gap
</Stack>
```

## CSS Variable System

VaneUI uses a three-tier CSS variable system:

### Tier 1: Unit Variables
Set by component class based on `data-size`:
```css
.vane-button[data-size="md"] {
  --fs-unit: 8;   /* Font size unit */
  --py-unit: 2;   /* Padding Y unit */
  --br-unit: 2;   /* Border radius unit */
}
```

### Tier 2: Computed Variables
Calculated from unit variables using base multipliers:
```css
[data-size] {
  --fs: calc(var(--fs-unit) * var(--fs-base));  /* --fs-base = 0.125rem */
  --py: calc(var(--py-unit) * var(--spacing));  /* --spacing = 0.25rem */
  --px: calc(var(--aspect-ratio) * var(--py-unit) * var(--spacing));
  --br: calc(var(--br-unit) * var(--br-base));  /* --br-base = 0.25rem */
  --gap: calc(var(--gap-unit) * var(--spacing));
}
```

### Tier 3: Semantic Color Variables
Set by `data-variant` + `data-appearance` attributes:
```css
[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
  --border-color: var(--color-border-primary);
}
```

## Mixing Custom Classes

You can always add your own Tailwind classes via `className` to fine-tune any edge case:
```tsx
<Button primary lg filled className="hover:opacity-80 shadow-xl">
  Get started
</Button>
```

User-provided `className` takes precedence over theme classes for the same properties (via `twMerge`).

## Customization Options

### CSS Variables
Override colors globally or for any subtree:
```css
:root {
  --color-text-primary: #8b5cf6;
  --color-bg-primary: #f3e8ff;
  --color-border-primary: #c4b5fd;
}
```

### ThemeProvider Defaults
Set default prop values for all components:
```tsx
<ThemeProvider themeDefaults={{
  button: { pill: true, lg: true },
  card: { primary: true }
}}>
  <Button>Large pill button by default</Button>
</ThemeProvider>
```

### Extra Classes
Add additional CSS classes based on active props:
```tsx
<ThemeProvider extraClasses={{
  button: { primary: 'shadow-lg hover:shadow-xl' }
}}>
  <Button primary>Button with extra shadow</Button>
</ThemeProvider>
```

### Theme Override Function
For programmatic theme modifications:
```tsx
<ThemeProvider themeOverride={(theme) => {
  // Modify base classes
  theme.button.base += ' uppercase tracking-wide';
  return theme;
}}>
  <App />
</ThemeProvider>
```
