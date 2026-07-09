VaneUI uses a theme system based on `ComponentTheme` classes that define styling for each component. This page explains the theme architecture and how to customize it.

## Theme architecture

### ComponentTheme class

Each component has a `ComponentTheme` instance that defines:
- **tag**: Default HTML element (e.g., "button", "div")
- **base**: Base CSS classes always applied
- **themes**: Tree of `BaseTheme` subclasses that generate CSS classes
- **defaults**: Default prop values
- **categories**: Which prop categories the component uses

```tsx
// Simplified view of how a component theme is structured
const buttonTheme = new ComponentTheme(
  "button",                           // Default tag
  "vane-button",                      // Base classes (kept minimal)
  {
    size: { px, py, text, gap },      // Size-related themes
    appearance: { bg, text, border }, // Appearance themes
    layout: { radius, border, ring }  // Layout themes
  },
  buttonDefaults,                     // Imported from buttonDefaults.ts
  BUTTON_CATEGORIES                   // Prop categories
);
```

### BaseTheme subclasses

Each `BaseTheme` subclass generates specific CSS classes based on extracted props:

```tsx
// FontSizeTheme returns consumer class for font size
class FontSizeTheme extends BaseTheme {
  getClasses(extractedKeys) {
    return ["text-(length:--fs)"];  // Consumes --fs CSS variable
  }
}

// SimpleConsumerTheme returns classes that consume color variables
class SimpleConsumerTheme extends BaseTheme {
  getClasses(extractedKeys) {
    if (!extractedKeys.appearance) return [];
    return ["bg-(--bg-color)", "text-(--text-color)"];
  }
}
```

## Accessing the theme

Use the `useTheme` hook to access the current theme:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();

  // Compound themes are nested by sub-part
  const buttonMainTheme = theme.button.main;
  const cardMainTheme = theme.card.main;
  // Single-target themes are accessed directly
  const badgeTheme = theme.badge;

  return <div>Custom component</div>;
}
```

## Available component themes

VaneUI includes themes for all components.

**Interactive:**
- `iconButton`, `badge`, `icon`, `chip`, `code`, `kbd`, `mark`, `input`, `label`, `img`
- `button`: compound with `button.main`, `button.spinner`
- `checkbox`: compound with `checkbox.input`, `checkbox.check`, `checkbox.indeterminate`, `checkbox.wrapper`

**Layout:**
- `divider`, `container`, `row`, `col`, `stack`, `section`
- `grid2`, `grid3`, `grid4`, `grid5`, `grid6`
- `card`: compound with `card.main`, `card.header`, `card.body`, `card.footer`

**Typography:**
- `text`, `title`, `pageTitle`, `sectionTitle`, `blockquote`, `link`, `list`, `listItem`

**Overlay / Floating:**
- `overlay`: Overlay backdrop theme
- `popup`: Popup floating element theme
- `modal`: compound with `modal.content`, `modal.overlay`, `modal.header`, `modal.body`, `modal.footer`, `modal.closeButton`
- `menu`: compound with `menu.item`, `menu.popup`, `menu.divider`, `menu.label`
- `navLink`: compound with `navLink.root`, `navLink.label`

## ThemeProvider props

### themeDefaults

Set default prop values for components:

```tsx
import { ThemeProvider, type ThemeDefaults } from '@vaneui/ui';

const defaults: ThemeDefaults = {
  button: {
    main: {
      filled: true, // change variant from outline (built-in) to filled
      lg: true,     // larger than built-in sm
    },
  },
  card: {
    main: { shadow: true }, // add shadow (not a default)
  },
};

<ThemeProvider themeDefaults={defaults}>
  <Button>Large filled button</Button>
  <Card>Card with shadow</Card>
</ThemeProvider>
```

### extraClasses

Add additional CSS classes based on active props:

```tsx
import type { ThemeExtraClasses } from '@vaneui/ui';

const extraClasses: ThemeExtraClasses = {
  button: {
    main: {
      primary: 'shadow-lg hover:shadow-xl transition-shadow',
      danger: 'animate-pulse',
    },
  },
  card: {
    main: { filled: 'backdrop-blur-sm' },
  },
};

<ThemeProvider extraClasses={extraClasses}>
  <Button primary>Button with shadow</Button>
  <Button danger>Pulsing danger button</Button>
</ThemeProvider>
```

### themeOverride

A function with direct access to the full theme, for changes the declarative options can't express (like appending to a component's base classes):

```tsx
<ThemeProvider themeOverride={(theme) => {
  // Modify button base classes
  theme.button.main.base += ' uppercase tracking-wide';

  // Modify defaults
  theme.button.main.defaults = {
    ...theme.button.main.defaults,
    bold: true,
  };

  return theme;
}}>
  <App />
</ThemeProvider>
```

### mergeStrategy

Control how nested ThemeProviders combine:

```tsx
// Default: 'merge' - child theme merges with parent
<ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
  <ThemeProvider themeDefaults={{ button: { main: { filled: true } } }}>
    {/* Button gets both lg AND filled */}
    <Button>Large Filled</Button>
  </ThemeProvider>
</ThemeProvider>

// 'replace' - child theme replaces parent entirely (resets to defaultTheme + child)
<ThemeProvider themeDefaults={{ button: { main: { lg: true } } }}>
  <ThemeProvider
    themeDefaults={{ button: { main: { sm: true } } }}
    mergeStrategy="replace"
  >
    {/* Button is small only (parent's lg is ignored) */}
    <Button>Small Only</Button>
  </ThemeProvider>
</ThemeProvider>
```

## Data attributes

Components emit data attributes that CSS rules use for styling:

```html
<button
  class="vane-button text-(length:--fs) py-(--py) ..."
  data-vane-type="ui"
  data-size="md"
  data-appearance="danger"
  data-variant="filled"
>
  Click me
</button>
```

CSS rules in `rules.css` set unit variables per `data-size` and per-component class. `--fs-unit`, `--py-unit`, and (for Icon) `--icon-size` are all set together so font-size, padding, gap, and border-radius scale together:

```css
/* Per-component size mapping */
.vane-button[data-size="md"] {
  --fs-unit: var(--fs-unit-md);
  --py-unit: 2;
}

/* Icon uses a decoupled --icon-size, not --fs */
.vane-icon[data-size="md"] {
  --fs-unit: var(--fs-unit-md);
  --icon-size: calc(var(--spacing) * 8);
  --py-unit: 2;
}

/* Appearance + variant set the color palette */
[data-variant="filled"][data-appearance="danger"] {
  --text-color: var(--color-text-filled-danger);
  --bg-color: var(--color-bg-filled-danger);
}
```

## Color inheritance

Components with a concrete appearance emit `data-appearance` and `data-variant` and paint their own colors, so a default `<Button>` inside a filled `<Card>` keeps its own primary-outline palette. Inheritance is opt-in: only inherit-mode components (the typography components, which default to `appearance="inherit"`) and appearance-less `Icon` emit nothing and read their colors from the nearest ancestor. The `:root` palette is the fallback those inherit-mode components use when no ancestor sets colors. See [Variant Inheritance](./variant-inheritance) for details.

## Style resolution flow

1. User writes: `<Button danger lg filled>Click</Button>`
2. Button component calls `useTheme()` to get `theme.button.main`
3. `ThemedComponent` calls `theme.getComponentConfig(props)`
4. Props merged with defaults, then extracted by category: `{ size: 'lg', appearance: 'danger', variant: 'filled' }`
5. Theme tree is walked, each `BaseTheme.getClasses()` returns CSS classes
6. Classes are merged with `twMerge()`, data attributes are added (because `danger` is a concrete, non-`inherit` appearance)
7. Final render: `<button class="..." data-vane-type="ui" data-size="lg" data-appearance="danger" data-variant="filled">`
8. CSS rules in `rules.css` set unit variables and the appearance/variant palette
9. Browser computes final styles from CSS variables
