VaneUI has two color behaviors. Components with their own appearance (Button, Card, Badge, and most others) emit `data-appearance`/`data-variant` and paint their own colors regardless of context. Inherit-mode components (the typography components, plus Icon) emit nothing and read their colors from the nearest ancestor through native CSS custom-property cascade. This page explains the split, how the cascade works, and how to control it.

## How variants and appearances cascade through nesting

VaneUI's color system has three layers:

1. **`:root` fallbacks**: set `--text-color`, `--bg-color`, `--border-color` etc. to the primary outline palette (dark text, white background, light border). Inherit-mode components fall back to these when no ancestor sets colors.
2. **Direct CSS rules**: when a component emits `data-appearance` (and `data-variant`), a CSS rule fires and sets those variables on the element and its subtree. Every component with a concrete appearance emits these.
3. **CSS cascade**: inherit-mode components set no variables of their own, so they read them from the nearest ancestor that did.

```
:root                           → --text-color: dark, --bg-color: white
  <Card filled primary>         → --text-color: white, --bg-color: dark  (emits attrs, own rule fires)
    <Button>                    → --text-color: dark, --bg-color: white  (emits its own primary-outline attrs)
    <Text>                      → inherits white text from Card          (inherit mode, no attrs)
    <Mark>                      → --text-color: amber (warning)          (emits its own warning attrs)
```

## Which components set vs. inherit

### Components that paint their own colors

Every component with a concrete appearance default emits `data-appearance` and `data-variant`, so its own CSS rule fires and it keeps its colors regardless of the surrounding context:

**Button, Card, Badge, Chip, Code, Kbd, Mark, Input, Checkbox, IconButton, NavLink** (and any component you give an explicit appearance).

A default `<Button>` inside a `<Card filled primary>` renders in its own primary-outline palette (dark text on white), not the Card's white-on-dark. A `<Mark>` inside a `<Card filled danger>` stays warning-yellow, and a `<Badge>` keeps its secondary colors. These components do not inherit color; set an explicit appearance to change them.

### Components that inherit

Two kinds of components emit no `data-appearance`, so they read colors from the nearest ancestor that set them:

- **Inherit mode**: `Text`, `Title`, `SectionTitle`, `PageTitle`, `Label`, `List`, `ListItem`, `Blockquote`, and `Divider` default to `appearance="inherit"`. This is how a `<Text>` inside a `<Card filled primary>` gets white text with no props.
- **Icon**: has no appearance default at all, so it inherits `currentColor` from its surroundings.

## Explicit props always win

When you explicitly set an appearance or variant on a component, VaneUI emits data attributes and the component's own CSS rule fires, overriding any inherited values:

```tsx demo
<Card filled primary>
  {/* Inherits from Card: white text on dark background */}
  <Text>I'm white</Text>

  {/* Explicit props: own CSS rule fires, dark text */}
  <Text primary outline>I'm dark, even inside a filled Card</Text>

  {/* Explicit different appearance: own CSS rule fires */}
  <Text success>I'm green</Text>
</Card>
```

## Nested layouts

When multiple layout components are nested, each child inherits from its **nearest ancestor** that sets variables, not from the outermost ancestor:

```tsx demo
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

## ThemeProvider overrides

`ThemeProvider.themeDefaults` sets a component's default appearance for a subtree. A concrete appearance emits data attributes and pins the color; giving an inherit-mode component a concrete appearance makes it stop inheriting:

```tsx
{/* All Badges in this subtree default to danger */}
<ThemeProvider themeDefaults={{ badge: { danger: true } }}>
  <Card filled primary>
    {/* This Badge renders red (danger), unaffected by the Card */}
    <Badge>Alert</Badge>
  </Card>
</ThemeProvider>
```

## The emission rule

The data-attribute gate uses one rule:

> **Emit `data-appearance` and `data-variant` for any concrete (non-`inherit`) appearance.** They are suppressed only in inherit mode (`appearance="inherit"`, which activates `inheritColor`) or when a component has no appearance at all (Icon).

This means:
- `<Button>` → primary → attrs emitted → own primary-outline colors
- `<Button filled>` → primary + filled → attrs emitted → own rule
- `<Badge>` → secondary → attrs emitted → own colors
- `<Text>` → inherit → no attrs → inherits from the nearest ancestor
- `<Icon>` → no appearance → no attrs → inherits `currentColor`

## Granular inheritance props

By default, the `inherit` appearance keyword inherits **everything** (color, size, background, and border) from the nearest ancestor. But sometimes you need selective inheritance: a `Link` inside a `Title` should inherit font-size (so the link matches the heading size) but keep its own link-blue color.

VaneUI provides four independent boolean toggle props for this:

| Prop | What it inherits | Negative toggle |
|------|-----------------|-----------------|
| `inheritSize` | Font-size and line-height from parent | `noInheritSize` |
| `inheritColor` | Text color via CSS variable cascade | `noInheritColor` |
| `inheritBg` | Background color via CSS variable cascade | `noInheritBg` |
| `inheritBorder` | Border color via CSS variable cascade | `noInheritBorder` |

### How `inherit` expands

When a component has `inherit` appearance (the default for Text, Title, Label, List, Divider, Blockquote), VaneUI expands it into color, background, and border inheritance, but **not size**:

```
<Text inherit>
  ↓ expands to:
  inheritColor + inheritBg + inheritBorder
  (NOT inheritSize: size uses own --fs variable so <Text sm> works as expected)
```

Size inheritance is separate. Only Link and Mark have `inheritSize: true` in their defaults (Code and Kbd achieve the same effect via em-relative geometry, described below). You can also set it explicitly:

```tsx demo
<Card filled primary>
  {/* Inherits color (white) but uses own md size */}
  <Text inherit>Inherited color, own size</Text>

  {/* Explicit inheritSize: also inherits font-size from parent */}
  <Text inherit inheritSize>Inherited color AND size</Text>
</Card>
```

### Link, Mark: exact size inheritance via `inheritSize`

Link and Mark have their own appearance (Link = `link`, Mark = `warning`) so the `inherit` expansion does NOT fire. Instead, they have `inheritSize: true` set explicitly in their defaults. They render at the *exact* font-size of the nearest typography ancestor.

```tsx demo
<Title lg>
  Check the <Link href="/docs">documentation</Link> for details
</Title>
```

- **Link** renders at the Title's `lg` font-size (inherited 1:1) but stays **link-blue** (own appearance)
- **Mark** renders at parent size with its own warning highlight color

### Code, Kbd: em-relative geometry

Code and Kbd use a different mechanism: their `.vane-code` / `.vane-kbd` rules override `--spacing` to `0.25em` locally, so the entire geometry pipeline (font-size, padding, border-radius, gap) resolves in em, proportional to the parent's font-size.

```tsx demo
<Title lg>
  Run <Code>npm install</Code> to add the package
</Title>
```

- **Code** renders at 87.5% of Title's `lg` font-size (Code's default `md` ratio = 0.875×)
- The size prop adjusts the ratio: `xs` = 0.625, `sm` = 0.75, `md` = 0.875 (default), `lg` = 1 (matches parent), `xl` = 1.125

So inline Code feels right-sized in every context: body text at 14px / 16px, headings at 21px / 24px, hero displays at 42px / 48px.

### Opting out (Link, Mark)

Use `noInheritSize` to keep Link or Mark at its own size instead of the parent's:

```tsx demo
<Title lg>
  Heading with <Link noInheritSize href="/docs">fixed-size link</Link>
</Title>
```

The Link renders at its default `md` size while the Title is `lg`. For Code/Kbd, the size prop already controls the ratio: pass any of `xs` / `sm` / `md` / `lg` / `xl` to adjust.

### Responsive overrides `inheritSize`

Title, PageTitle, and SectionTitle have `responsive: true` in their defaults. Responsive sizing takes priority over `inheritSize`: a responsive heading always uses its viewport-scaled size, even if `inheritSize` is set via the `inherit` expansion.
