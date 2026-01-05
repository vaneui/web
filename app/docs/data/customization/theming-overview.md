VaneUI uses a powerful theme system based on `ComponentTheme` classes that define styling for each component. This page explains the theme architecture and how to customize it.

## Theme Architecture

### ComponentTheme Class

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
  "vane-button w-fit cursor-pointer", // Base classes
  {
    size: { px, py, text, gap },      // Size-related themes
    appearance: { bg, text, border }, // Appearance themes
    layout: { radius, border, ring }  // Layout themes
  },
  { md: true, primary: true },        // Defaults
  BUTTON_CATEGORIES                   // Prop categories
);
```

### BaseTheme Subclasses

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
    return ["[background:var(--bg-color)]", "text-(--text-color)"];
  }
}
```

## Accessing the Theme

Use the `useTheme` hook to access the current theme:

```tsx
import { useTheme } from '@vaneui/ui';

function CustomComponent() {
  const theme = useTheme();
  
  // Access component themes
  const buttonTheme = theme.button;
  const cardTheme = theme.card;
  
  return <div>Custom component</div>;
}
```

## Available Component Themes

VaneUI includes themes for all components:

**UI Components:**
- `button`, `badge`, `chip`, `code`, `input`, `checkbox`, `label`, `img`

**Layout Components:**
- `card`, `divider`, `container`, `row`, `col`, `stack`, `section`
- `grid2`, `grid3`, `grid4`, `grid5`, `grid6`

**Typography Components:**
- `text`, `title`, `pageTitle`, `sectionTitle`, `link`, `list`, `listItem`

## ThemeProvider Props

### themeDefaults

Set default prop values for components:

```tsx
import { ThemeProvider } from '@vaneui/ui';

const defaults = {
  button: {
    primary: true,  // All buttons are primary by default
    md: true,       // All buttons are medium size
  },
  card: {
    rounded: true,  // All cards have rounded corners
  }
};

<ThemeProvider themeDefaults={defaults}>
  <Button>Primary medium button</Button>
  <Card>Rounded card</Card>
</ThemeProvider>
```

### extraClasses

Add additional CSS classes based on active props:

```tsx
const extraClasses = {
  button: {
    primary: 'shadow-lg hover:shadow-xl transition-shadow',
    danger: 'animate-pulse',
  },
  card: {
    filled: 'backdrop-blur-sm',
  }
};

<ThemeProvider extraClasses={extraClasses}>
  <Button primary>Button with shadow</Button>
  <Button danger>Pulsing danger button</Button>
</ThemeProvider>
```

### themeOverride

Function for programmatic theme modifications:

```tsx
<ThemeProvider themeOverride={(theme) => {
  // Modify button base classes
  theme.button.base += ' uppercase tracking-wide';
  
  // Modify defaults
  theme.button.defaults = { 
    ...theme.button.defaults, 
    semibold: true 
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
<ThemeProvider themeDefaults={{ button: { lg: true } }}>
  <ThemeProvider themeDefaults={{ button: { primary: true } }}>
    {/* Button gets both lg AND primary */}
    <Button>Large Primary</Button>
  </ThemeProvider>
</ThemeProvider>

// 'replace' - child theme replaces parent entirely
<ThemeProvider themeDefaults={{ button: { lg: true } }}>
  <ThemeProvider 
    themeDefaults={{ button: { sm: true } }}
    mergeStrategy="replace"
  >
    {/* Button only gets sm, not lg */}
    <Button>Small Only</Button>
  </ThemeProvider>
</ThemeProvider>
```

## Data Attributes

Components output data attributes that CSS rules use for styling:

```html
<button 
  class="vane-button text-(length:--fs) py-(--py) ..."
  data-size="md"
  data-appearance="primary"
  data-variant="outline"
>
  Click me
</button>
```

CSS rules in `vars.css` set variables based on these attributes:

```css
.vane-button[data-size="md"] { 
  --fs-unit: 8; 
  --py-unit: 2; 
}

[data-variant="outline"][data-appearance="primary"] {
  --text-color: var(--color-text-primary);
  --bg-color: var(--color-bg-primary);
}
```

## Flow Summary

1. User writes: `<Button primary lg filled>Click</Button>`
2. Button component calls `useTheme()` to get `theme.button`
3. `ThemedComponent` calls `theme.getComponentConfig(props)`
4. Props are extracted by category: `{ size: 'lg', appearance: 'primary', variant: 'filled' }`
5. Theme tree is walked, each `BaseTheme.getClasses()` returns CSS classes
6. Classes are merged with `twMerge()`, data attributes are added
7. Final render: `<button class="..." data-size="lg" data-appearance="primary" data-variant="filled">`
8. CSS rules in `vars.css` set variables based on data attributes
9. Browser computes final styles from CSS variables
