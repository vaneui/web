# Core Concepts

VaneUI helps you build beautiful, consistent UIs faster by turning common design decisions into expressive, readable boolean props. Instead of memorizing property names and values, you compose intent: primary, lg, outline, rounded. The result is cleaner code, fewer decisions per component, and a smoother path from wireframe to production.

> TL;DR
> - Describe UI with intent-driven boolean props (primary, lg, outline)
> - Built on Tailwind CSS for performance, consistency, and familiarity
> - Fully customizable via CSS variables, Tailwind utilities, and theming
> - Consistent API across all components for rapid muscle memory

---

## How VaneUI Works (Architecture Overview)

At its core, VaneUI maps boolean props to thoughtfully curated class sets and design tokens.

1. You write intent in JSX using booleans
   ```tsx
   <Button primary lg pill filled />
   ```
2. The component resolves those booleans to semantic styles
   - primary → semantic color token
   - lg → size scale for paddings, radius, typography
   - pill → shape preset
   - filled → variant preset
3. Tailwind classes and CSS variables power the final styles
   - Tailwind utilities for performance and composability
   - CSS variables for theming and per-app overrides

```text
[Your JSX]
   ↓ intent (booleans)
[VaneUI resolver]
   ↓ tokens & presets
[Tailwind classes + CSS variables]
   ↓
[Rendered UI]
```

> Note: You can always mix in your own Tailwind classes via className to fine‑tune any edge case.

---

## Why This Approach Works

- Readability: Props read like a sentence — "primary large pill button"
- Speed: Fewer tokens to remember than variant/color/size prop combinations
- Consistency: Shared boolean vocabulary across all components
- Flexibility: Nothing is locked in — every class can be overridden
- Scalability: Teams ramp faster on a small, stable mental model

---

## When to Use VaneUI

- You want to ship quickly with consistent styling across components
- Your team uses or knows Tailwind
- You need clarity and discoverability over deep theme files

## When Not to Use (or Use Sparingly)

- You require pixel-perfect custom components with completely unique styling on every instance — you can still do this, but a lower-level system might be faster
- You prefer design tokens through CSS-in-JS only with no Tailwind

---

## The Boolean Props Philosophy

### Traditional Approach vs VaneUI

Instead of writing verbose prop configurations, VaneUI uses intuitive boolean props that make your code cleaner and more readable:

```tsx
// Traditional approach
<Button variant="filled" color="primary" size="lg" />

// VaneUI approach  
<Button primary lg filled />
```

### Why Boolean Props Matter

**Shorter Code**: Less typing means faster development and cleaner JSX.

**Better Readability**: Props read like natural language describing the component's appearance.

**Faster Development**: Common combinations become muscle memory.


## Prop Combinations

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

## Tailwind CSS Integration

### Powered by Tailwind

VaneUI components are built on top of Tailwind CSS, which means:

- **Consistent Design System**: All styling follows Tailwind's design tokens
- **Optimized Bundle Size**: Only used classes are included in your build
- **Familiar Patterns**: If you know Tailwind, you understand VaneUI's styling

### Tailwind Compatibility

VaneUI components work seamlessly with additional Tailwind classes:

```tsx
<Button 
  primary 
  lg 
  className="mt-4 shadow-xl hover:shadow-2xl"
>
  Enhanced Button
</Button>

<Card 
  secondary 
  className="max-w-md mx-auto backdrop-blur-sm"
>
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


## Key Benefits

**Shorter Syntax**: `<Button primary lg />` instead of `<Button color="primary" lg />`

**Natural Language**: Props read like descriptions - "primary large button"

**Faster Development**: Common patterns become muscle memory

**Complete Flexibility**: Every CSS class can be customized or overridden

**Tailwind Integration**: Works seamlessly with additional Tailwind classes

**Consistent API**: Same prop patterns across all components

VaneUI's core philosophy centers on making your code cleaner and your development faster, while maintaining complete control over the visual output through Tailwind CSS and comprehensive customization options.

---

## Accessibility & UX Defaults

VaneUI components are built with sensible defaults:
- Focus states are visible and consistent
- Interactive areas consider touch targets
- Labels and inputs pair naturally (e.g., Checkbox inside Label)
- Color choices align to semantic meaning (danger, success, info)

> Tip: Use semantic color booleans (success, danger, warning) for clearer intent and improved accessibility when combined with ARIA labels and announcements.

---

## Performance Characteristics

- Tailwind JIT keeps only the classes you use
- No heavy runtime style generation
- Styles compose predictably, enabling stable memoization

---

## Best Practices

- Compose intent first, then sprinkle utility classes for exceptions
- Prefer semantic props over ad-hoc classes for shared patterns
- Keep overrides local with className; keep system-wide changes in theme
- Use md/lg/xl sizes consistently across the app for a cohesive rhythm

---
## FAQ

**Can I mix Tailwind classes with boolean props?**
Yes. Use className for surgical overrides or utility additions.

**What if I need a style that has no boolean prop?**
Use className, or create a small wrapper component that applies your custom classes.

**How do I change the default primary color?**
Use CSS variables (for example, `--text-color-primary` and `--filled-background-color-primary`). ThemeProvider does not provide a `colors` field; see the CSS Variables guide for details.

**Does VaneUI work with SSR and Next.js?**
Yes. It’s a good fit with static generation and server rendering.

---

Still curious? Explore the component docs and try composing with booleans — the mental model clicks fast and scales even faster.