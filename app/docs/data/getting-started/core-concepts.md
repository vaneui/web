VaneUI helps you build beautiful, consistent UIs faster by turning common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

## How VaneUI works

At its core, VaneUI maps boolean props to thoughtfully curated CSS classes. You write the JSX using booleans like this:

```tsx
<Button primary lg pill filled>
  Get started
</Button>
```
The component resolves those booleans to semantic styles:
- `primary` → semantic color token
- `lg` → size scale for paddings, border radius, typography size
- `pill` → shape preset
- `filled` → variant preset

Tailwind classes and CSS variables power the final styles:
- Tailwind utilities for performance and composability
- CSS variables for theming and per-app overrides
- Each CSS class can be changed using ThemeProvider
- Each component has a customizable set of default values for boolean props

You can always mix in your own Tailwind classes via className to fine‑tune any edge case:
```tsx
<Button primary lg pill filled className="hover:opacity-80">
  Get started
</Button>
```

## Traditional approach vs VaneUI

Instead of writing verbose prop configurations, VaneUI uses intuitive boolean props that make your code cleaner and more readable:

```tsx
// Traditional approach
<Button appearance="primary" size="lg" variant="filled" />

// VaneUI approach  
<Button primary lg filled />
```

## Prop combinations

Boolean props can be combined naturally to create the exact styling you need:

```tsx
<Button primary lg pill shadow>
  Large primary pill button with shadow
</Button>

<Card secondary padding border rounded>
  Secondary card with padding, border and rounded corners
</Card>

<Stack column itemsCenter>
  Vertical stack with gap and centered items
</Stack>
```

## Every Class is Customizable

Behind each boolean prop are carefully crafted CSS classes that you can completely override.

### CSS Variables

You can customize the VaneUI by overriding the CSS variables:

```css
:root {
  --text-color-primary: #8b5cf6;      /* Primary text color */
  --ui-border-radius-md: 1rem;        /* Medium UI radius */
}
```

### Tailwind Overrides

Each component can be changed by using the regular Tailwind CSS classes:

```tsx
<Button primary className="bg-purple-600 hover:bg-purple-700">
  Custom Primary
</Button>
```

### Theme Overrides

You can set up default values of all boolean props by providing `themeDefaults` in ThemeProvider:

```tsx
const defaults: ThemeDefaults = {
  button: {
    pill: true,
    lg: true,
  },
};

return (
  <ThemeProvider themeDefaults={defaults}>
    <Button>This button is large and pill-shaped</Button>
  </ThemeProvider>
);
```

You can change default CSS classes of all components by providing `themeOverride` in ThemeProvider:

```tsx
const overrideFunc = (theme: ThemeProps) => {
  theme.button.themes.appearance.text.outline.default.base = 'text-blue-200';
  theme.button.themes.appearance.text.outline.default.hover = 'hover:text-blue-700';
  theme.button.themes.appearance.text.outline.default.active = 'active:text-blue-900';
  return theme;
};

return (
  <ThemeProvider themeOverride={overrideFunc}>
    <Button>This button has blue colors</Button>
  </ThemeProvider>
);
```