VaneUI turns common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

## Boolean props API

At its core, VaneUI uses **boolean props** instead of string enums for cleaner JSX:

```tsx
// VaneUI approach
<Button primary lg filled>Submit</Button>

// Instead of traditional
<Button appearance="primary" size="lg" variant="filled">Submit</Button>
```

Props are organized into **categories**:
- **size**: `xs`, `sm`, `md`, `lg`, `xl`
- **appearance**: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`, `inherit`
- **variant**: `filled`, `outline`, `ghost`
- **shape**: `rounded`, `pill`, `sharp`
- **typography**: `sans`, `serif`, `mono`, `semibold`, `bold`, etc.
- **layout**: `flex`, `column`, `itemsCenter`, `justifyBetween`, etc.
- **inheritance**: `inheritSize`, `inheritColor`, `inheritBg`, `inheritBorder` (and `noInherit*` toggles)

Typography components (Text, Title, SectionTitle, PageTitle, Blockquote), Label, List, and Divider default to `inherit`, which means they inherit colors from their parent element via CSS variable cascade rather than setting their own color. Link and Mark default to `inheritSize`, so they inherit font-size from their parent while keeping their own appearance color; Code and Kbd achieve the same effect through em-relative geometry.

## How components work

VaneUI components follow a three-layer architecture:

### Layer 1: React component
Each component gets its theme from `ThemeContext` via `useTheme()` and passes props to `ThemedComponent`, which computes the final CSS classes.

### Layer 2: theme system
The `ComponentTheme` class orchestrates class generation. It walks a tree of `BaseTheme` subclasses (like `FontSizeTheme`, `RadiusTheme`) that each generate specific CSS classes based on the active props.

### Layer 3: CSS variables
Components output **data attributes** (`data-size`, `data-appearance`, `data-variant`) that CSS rules in `rules.css` use to set CSS variables. These variables are then consumed by Tailwind utility classes.

## Prop extraction

When you pass props, VaneUI selects ONE value per category based on priority:

```tsx
// Button defaults: { sm: true, primary: true, outline: true, ... }
// User props:     { lg: true, filled: true }

<Button lg filled>Submit</Button>
// Result: size='lg' (prop overrides default sm),
//         appearance='primary' (default kept),
//         variant='filled' (prop overrides default outline)
```

**Priority order**:
1. Props explicitly set to `true`
2. Defaults set to `true` (unless explicitly set to `false` in props)

## Prop combinations

Boolean props can be combined naturally to create the exact styling you need:

```tsx
<Button primary lg pill shadow>
  Large primary pill button with shadow
</Button>

<Card secondary filled>
  Filled secondary card
</Card>

<Stack itemsCenter>
  Stack with centered items (column, gap, padding, and flexWrap are defaults)
</Stack>
```

## CSS variable system

VaneUI uses a three-tier CSS variable system:

### Tier 1: unit variables
Set by component class based on `data-size`:
```css
.vane-button[data-size="md"] {
  --fs-unit: 8;   /* Font size unit */
  --py-unit: 2;   /* Padding Y unit */
}
```

### Tier 2: computed variables
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

### Tier 3: semantic color variables
Set by `data-variant` + `data-appearance` attributes:
```css
[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
  --border-color: var(--color-border-primary);
}
```

## Mixing custom classes

You can always add your own Tailwind classes via `className` to fine-tune any edge case:
```tsx
<Button primary lg filled className="hover:opacity-80 shadow-xl">
  Get started
</Button>
```

User-provided `className` takes precedence over theme classes for the same properties (via `twMerge`).

## Customization options

### CSS variables
Override colors globally or for any subtree:
```css
:root {
  --color-text-primary: #8b5cf6;
  --color-bg-primary: #f3e8ff;
  --color-border-primary: #c4b5fd;
}
```

### ThemeProvider defaults
Set default prop values for all components, including overlay components (Overlay, Modal, Popup):
```tsx
<ThemeProvider themeDefaults={{
  button: { main: { pill: true, lg: true } }, // button is compound; defaults nest under `main`
  card: { main: { primary: true } }            // card is compound too
}}>
  <Button>Large pill button by default</Button>
</ThemeProvider>
```

### Extra classes
Add additional CSS classes based on active props:
```tsx
<ThemeProvider extraClasses={{
  button: { main: { primary: 'shadow-lg hover:shadow-xl' } }
}}>
  <Button primary>Button with extra shadow</Button>
</ThemeProvider>
```

### Theme override function
For programmatic theme modifications:
```tsx
<ThemeProvider themeOverride={(theme) => {
  // Modify base classes
  theme.button.main.base += ' uppercase tracking-wide';
  return theme;
}}>
  <App />
</ThemeProvider>
```
