VaneUI components inherit their colors from ancestor components through native CSS custom-property cascade. This page explains how inheritance works, when components set their own colors vs. inherit, and how to control the behavior.

## How It Works

VaneUI's color system has three layers:

1. **`:root` fallbacks** — set `--text-color`, `--bg-color`, `--border-color` etc. to the primary outline palette (dark text, white background, light border)
2. **Direct CSS rules** — when a component has `data-variant` + `data-appearance` attributes, a CSS rule fires and rewrites those variables on the element
3. **CSS cascade** — children that don't set their own variables inherit from the nearest ancestor that did

```
:root                           → --text-color: dark, --bg-color: white
  <Card filled primary>         → --text-color: white, --bg-color: dark  (CSS rule fires)
    <Button>                    → inherits white text from Card           (no attrs, no rule)
    <Button primary outline>    → --text-color: dark                     (explicit attrs, own rule fires)
    <Text>                      → inherits white text from Card           (inherit mode)
    <Mark>                      → --text-color: amber (warning)           (identity, own rule fires)
```

## Which Components Set vs. Inherit

### Components That Inherit (no data attributes by default)

These components use the primary + outline defaults from the library baseline. Because `primary + outline` matches the `:root` palette, VaneUI skips data-attribute emission — letting the component inherit from its nearest ancestor that DID set variables.

**Button, Card, Badge, Code, Kbd, Input, IconButton, NavLink, Icon**

A default `<Button>` inside a `<Card filled primary>` inherits the Card's white text and dark background — it automatically looks right on the dark surface. No configuration needed.

### Components That Set Their Own Colors (identity components)

These components have defaults that deviate from the primary + outline baseline. VaneUI detects this and emits data attributes so the component's own CSS rule fires, pinning its colors regardless of context.

| Component | Default Appearance | Why |
|-----------|-------------------|-----|
| **Mark** | warning + outline | Yellow highlighter must be visible everywhere |
| **Chip** | secondary + outline | Muted tag should look consistent |
| **Link** | link + outline | Blue hyperlink must be recognizable |
| **Checkbox** | primary + filled | Checked state needs non-white background |

A `<Mark>` inside a `<Card filled danger>` still renders in its warning (yellow) palette — it doesn't turn red.

### Components in Inherit Mode (typography)

**Text, Title, SectionTitle, PageTitle, Label, List, ListItem, Divider, Blockquote**

These components default to `inherit` — they never emit data attributes and always read colors from their nearest ancestor. This is how `<Text>` inside a `<Card filled primary>` automatically gets white text without any props.

## Explicit Props Always Win

When you explicitly set an appearance or variant on a component, VaneUI emits data attributes and the component's own CSS rule fires — overriding any inherited values:

```tsx
<Card filled primary>
  {/* Inherits from Card — white text on dark background */}
  <Text>I'm white</Text>

  {/* Explicit props — own CSS rule fires, dark text */}
  <Text primary outline>I'm dark, even inside a filled Card</Text>

  {/* Explicit different appearance — own CSS rule fires */}
  <Text success>I'm green</Text>
</Card>
```

## Nested Layouts

When multiple layout components are nested, each child inherits from its **nearest ancestor** that sets variables — not from the outermost ancestor:

```tsx
<Card filled primary>
  {/* Card sets: --text-color = white, --bg-color = dark */}

  <Stack outline primary>
    {/* Stack sets its own: --text-color = dark, --bg-color = white */}
    {/* (explicit outline primary → own CSS rule fires) */}

    <Text>I'm dark (inherits from Stack, not Card)</Text>
  </Stack>

  <Stack filled danger>
    {/* Stack sets its own: --text-color = white, --bg-color = red */}

    <Text>I'm white on red (inherits from danger Stack)</Text>
  </Stack>
</Card>
```

## ThemeProvider Overrides

`ThemeProvider.themeDefaults` overrides are treated as user intent — they cause data-attribute emission even if the resolved value matches baseline:

```tsx
{/* All Badges in this subtree render as danger, with data attributes */}
<ThemeProvider themeDefaults={{ badge: { danger: true } }}>
  <Card filled primary>
    {/* This Badge renders red (danger), not inherited from Card */}
    <Badge>Alert</Badge>
  </Card>
</ThemeProvider>
```

## The Baseline Rule

The data-attribute gate uses a simple rule:

> **Emit `data-appearance` and `data-variant` when the resolved values deviate from `primary + outline`** — either because the user explicitly set props, because `themeDefaults` changed them, or because the component's library defaults are non-baseline (identity components).

This means:
- `<Button>` → primary + outline (baseline) → no attrs → inherits
- `<Button filled>` → primary + filled (filled ≠ outline) → attrs emitted → own rule
- `<Button danger>` → danger + outline (danger ≠ primary) → attrs emitted → own rule
- `<Mark>` → warning + outline (warning ≠ primary) → attrs emitted → own rule
- `<Text>` → inherit + outline (inherit excluded) → no attrs → inherits

## Granular Inheritance Props

By default, the `inherit` appearance keyword inherits **everything** — color, size, background, and border — from the nearest ancestor. But sometimes you need selective inheritance: a `Link` inside a `Title` should inherit font-size (so the link matches the heading size) but keep its own link-blue color.

VaneUI provides four independent boolean toggle props for this:

| Prop | What it inherits | Negative toggle |
|------|-----------------|-----------------|
| `inheritSize` | Font-size and line-height from parent | `noInheritSize` |
| `inheritColor` | Text color via CSS variable cascade | `noInheritColor` |
| `inheritBg` | Background color via CSS variable cascade | `noInheritBg` |
| `inheritBorder` | Border color via CSS variable cascade | `noInheritBorder` |

### How `inherit` expands

When a component has `inherit` appearance (the default for Text, Title, Label, List, Divider, Blockquote), VaneUI expands it into color, background, and border inheritance — but **not size**:

```
<Text inherit>
  ↓ expands to:
  inheritColor + inheritBg + inheritBorder
  (NOT inheritSize — size uses own --fs variable so <Text sm> works as expected)
```

Size inheritance is separate — only inline components like Link, Code, Kbd, and Mark have `inheritSize: true` in their defaults. You can also set it explicitly:

```tsx
<Card filled primary>
  {/* Inherits color (white) but uses own md size */}
  <Text inherit>Inherited color, own size</Text>

  {/* Explicit inheritSize — also inherits font-size from parent */}
  <Text inherit inheritSize>Inherited color AND size</Text>
</Card>
```

### Link, Code, Kbd, Mark — size inheritance by default

These components have their own appearance (Link = `link`, Code/Kbd = `primary`, Mark = `warning`) so the `inherit` expansion does NOT fire. Instead, they have `inheritSize: true` set explicitly in their defaults:

```tsx
<Title lg>
  Check the <Link href="/docs">documentation</Link> or run <Code>npm install</Code>
</Title>
```

- **Link** renders at the Title's `lg` font-size (inherited) but stays **link-blue** (own appearance)
- **Code** renders at the Title's `lg` font-size (inherited) but stays **primary-colored** with its own background and ring (own appearance)

This means inline elements automatically scale with their surrounding typography — no manual size matching needed.

### Opting out

Use `noInheritSize` to keep a component's own size:

```tsx
<Title lg>
  Heading with <Code noInheritSize>fixed-size code</Code>
</Title>
```

The Code renders at its default `md` size while the Title is `lg`.

### Responsive overrides inheritSize

Title, PageTitle, and SectionTitle have `responsive: true` in their defaults. Responsive sizing takes priority over `inheritSize` — a responsive heading always uses its viewport-scaled size, even if `inheritSize` is set via the `inherit` expansion.
