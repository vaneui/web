VaneUI components are styled through boolean props and CSS variables, but you can override any visual property using standard Tailwind CSS classes via the `className` prop. This page explains how overrides work, when to use each approach, and common pitfalls.

## How className Overrides Work

VaneUI uses [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) to combine theme-generated classes with your `className`. When a conflict exists, **your class always wins** because `className` is passed last:

```tsx
// Internally, VaneUI does:
const finalClasses = twMerge(...themeGeneratedClasses, className);
```

This means the conflict is resolved at the **JavaScript level** — the losing class is removed from the string entirely before the DOM renders. There are no CSS specificity wars or `!important` hacks.

## What You Can Override

VaneUI components use CSS variable consumer classes like `border-(--border-color)`, `text-(--text-color)`, and `bg-(--bg-color)`. These compile to standard CSS (`border-color: var(--border-color)`). Any Tailwind utility that targets the same CSS property will override them.

### Border Color

```tsx
// VaneUI generates: border-(--border-color)
// Your class:       border-red-300
// Result:           border-red-300 (VaneUI class removed)
<Card className="border-red-300">Custom border</Card>
```

### Text Color

```tsx
// VaneUI generates: text-(--text-color)
// Your class:       text-emerald-600
// Result:           text-emerald-600
<Text className="text-emerald-600">Custom text color</Text>
```

### Background Color

```tsx
// VaneUI generates: bg-(--bg-color)
// Your class:       bg-gradient-to-r from-blue-500 to-purple-500
// Result:           bg-gradient-to-r from-blue-500 to-purple-500
<Card className="bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient card
</Card>
```

### Hover, Active, and Focus States

State-specific overrides work too — each state variant is resolved independently:

```tsx
// Override hover background
<Button className="hover:bg-blue-700">Custom hover</Button>

// Override focus ring
<Input className="focus-visible:outline-purple-500">Custom focus</Input>

// Override active state
<Button className="active:bg-blue-900">Custom active</Button>
```

### Shadow

```tsx
<Card className="shadow-2xl">Extra large shadow</Card>
<Card className="shadow-none">No shadow</Card>
```

### Non-Conflicting Properties Are Preserved

`twMerge` only removes classes that target the **same CSS property**. Different properties coexist:

```tsx
// border-width and border-color are separate properties
// VaneUI's border-width stays, only color is overridden
<Card className="border-red-300">
  {/* Has both: border-[length:var(--bw)] (width) + border-red-300 (color) */}
</Card>
```

## Override Hierarchy

From lowest to highest priority:

| Level | Mechanism | Scope | Use When |
|-------|-----------|-------|----------|
| 1 | Component defaults | Library-wide | You're the library author |
| 2 | `themeDefaults` | Provider subtree | Change defaults for all components in a section |
| 3 | `extraClasses` | Provider subtree | Add classes based on active props |
| 4 | `themeOverride` | Provider subtree | Modify theme internals programmatically |
| 5 | **`className`** | Single instance | One-off style adjustments |
| 6 | `style` | Single instance | Dynamic values, CSS variable overrides |

For most use cases, `className` (level 5) is the right tool. Use `themeDefaults` or `extraClasses` when you need the override to apply across many components.

## CSS Variable Approach

Instead of overriding the consumer class with a Tailwind utility, you can override the underlying CSS variable. This keeps VaneUI's consumer class active but changes what value it reads:

```tsx
// Override the variable — the component's own border-(--border-color) still fires,
// but reads your custom value instead of the theme's
<Card style={{ '--border-color': 'var(--color-red-300)' } as React.CSSProperties}>
  Theme-aware border override
</Card>
```

**When to use CSS variables vs className:**

- **`className="border-red-300"`** — static override, ignores the theme entirely. The component's `border-(--border-color)` class is removed by twMerge.
- **`style={{ '--border-color': '...' }}`** — theme-aware override. The component still uses its consumer class, but the variable value is different. Children inherit the new value.

The CSS variable approach is especially useful when you want descendants to inherit your override:

```tsx
// All children of this Card inherit the custom border color
<Card style={{ '--border-color': 'red' } as React.CSSProperties}>
  <Input /> {/* This Input also gets a red border */}
  <Divider /> {/* Red divider too */}
</Card>
```

## When to Use VaneUI Props Instead

VaneUI provides boolean props for most common styling needs. Always prefer props over Tailwind classes when a prop exists — this ensures the styling integrates with the size system, responds to theme changes, and works with `ThemeProvider` overrides.

| Instead of Tailwind | Use VaneUI Prop |
|---------------------|-----------------|
| `className="font-bold"` | `bold` |
| `className="text-center"` | `textCenter` |
| `className="uppercase"` | `uppercase` |
| `className="rounded-full"` | `pill` |
| `className="flex items-center"` | `flex itemsCenter` |
| `className="cursor-pointer"` | `cursorPointer` |
| `className="gap-4"` | Use size props (`xs` through `xl`) |
| `className="bg-red-500"` | `danger filled` |

## className Is for Things VaneUI Props Don't Cover

Good uses of `className`:

```tsx
{/* Custom width/height */}
<Card className="w-full max-w-md">Fixed-width card</Card>

{/* Custom positioning */}
<Row className="sticky top-0 z-10">Sticky header</Row>

{/* Animations */}
<Badge className="animate-pulse">Live</Badge>

{/* Gradients */}
<Card className="bg-gradient-to-br from-indigo-500 to-purple-600">
  Gradient card
</Card>

{/* Aspect ratio */}
<Img className="aspect-video" src="/banner.jpg" alt="Banner" />
```

## Common Pitfalls

### Don't override gap with Tailwind classes

Gap is controlled by VaneUI's size system. Use size props instead:

```tsx
// Wrong — fights the size system
<Row className="gap-10">Content</Row>

// Right — gap scales with size
<Row lg>Content</Row>
<Row xs>Tight content</Row>
```

### Don't override padding with Tailwind classes

Padding is also size-driven and scales proportionally:

```tsx
// Wrong
<Card className="p-8">Content</Card>

// Right — padding scales with size
<Card lg>Content</Card>
```

### Don't use appearance-colored Tailwind classes when an appearance prop exists

```tsx
// Wrong — bypasses the theme system
<Button className="bg-red-500 text-white border-red-600">Delete</Button>

// Right — uses the theme system
<Button danger filled>Delete</Button>
```

### Beware of className on Typography Components

Typography components have built-in letter spacing, line height, and font size that scale with the size prop. Overriding these with Tailwind classes breaks the proportional scaling:

```tsx
// Wrong — breaks size scaling
<Text className="text-2xl tracking-wide leading-10">Content</Text>

// Right — use size props
<Text xl>Content</Text>
```
