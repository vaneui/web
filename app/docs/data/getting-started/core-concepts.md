VaneUI helps you build beautiful, consistent UIs faster by turning common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: `primary`, `lg`, `outline`, `rounded`. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

> TL;DR
> - Describe UI with intent-driven boolean props like `primary`, `lg`, and `outline`
> - Built on Tailwind CSS for performance, consistency, and familiarity
> - Fully customizable via CSS variables, Tailwind utilities, and theming
> - Consistent API across all components for rapid muscle memory

## How VaneUI works

At its core, VaneUI maps boolean props to thoughtfully curated class sets and design tokens.

1. You write intent in JSX using booleans
   ```tsx
   <Button primary lg pill filled />
   ```
2. The component resolves those booleans to semantic styles
   - `primary` → semantic color token
   - `lg` → size scale for paddings, radius, typography
   - `pill` → shape preset
   - `filled` → variant preset
3. Tailwind classes and CSS variables power the final styles
   - Tailwind utilities for performance and composability
   - CSS variables for theming and per-app overrides

> Note: You can always mix in your own Tailwind classes via className to fine‑tune any edge case.

## When to use VaneUI

- You want to ship quickly with consistent styling across components
- Your team uses or knows Tailwind
- You need clarity and discoverability over deep theme files

## The Boolean props

### Traditional approach vs VaneUI

Instead of writing verbose prop configurations, VaneUI uses intuitive boolean props that make your code cleaner and more readable:

```tsx
// Traditional approach
<Button variant="filled" appearance="primary" size="lg" />

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

## Powered by Tailwind CSS

VaneUI components are built on top of Tailwind CSS, which means:

- *Consistent design system*: All styling follows Tailwind's design tokens
- *Optimized bundle size*: Only used classes are included in your build
- *Familiar patterns*: If you know Tailwind, you understand VaneUI's styling

### Tailwind compatibility

VaneUI components work seamlessly with additional Tailwind classes:

```tsx
<Button primary lg className="mt-4 shadow-xl hover:shadow-2xl">
  Enhanced Button
</Button>

<Card secondary className="max-w-md mx-auto backdrop-blur-sm">
  Styled Card
</Card>
```

## Complete Customizability

### Every Class is Customizable

Behind each boolean prop are carefully crafted CSS classes that you can completely override:

**CSS Custom Properties:**
```css
:root {
  /* Use the actual VaneUI variables (see Docs → Customization → CSS Variables) */
  --text-color-primary: #8b5cf6;      /* Primary text color */
  --filled-background-color-primary: #8b5cf6; /* Primary filled bg */
  --ui-border-radius-md: 1rem;        /* Medium UI radius */
}
```

**Tailwind Overrides:**
```tsx
<Button 
  primary 
  className="!bg-purple-600 !hover:bg-purple-700"
>
  Custom Primary
</Button>
```

**Theme System:**
> Note: ThemeProvider does not expose a `colors` property. Use CSS variables for color customization. ThemeProvider can still set defaults and add extra classes per component via `themeDefaults` and `extraClasses`. See the Customization docs for details.

## Design System Benefits

### Consistent Naming

All components use the same boolean props for consistent experiences:

```tsx
// Same props work across all components
<Button primary lg />
<Badge primary lg />
<Card primary />
<Text primary lg />
```

### Semantic Colors

Color names have consistent meaning across components:

```tsx
<Button success>Success Action</Button>
<Badge success>Success Status</Badge>
<Text success>Success Message</Text>
```

### Flexible Layout System

Layout components provide powerful flexbox controls:

```tsx
<Row justifyBetween itemsCenter>
  <Text lg bold>Title</Text>
  <Button primary sm>Action</Button>
</Row>
```
