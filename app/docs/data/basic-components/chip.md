---
componentKey: chip
importPath: 'import { Chip } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/chip/Chip.tsx
since: 0.9.0
---

Compact, monospace-leaning token for representing tags, attributes, filter values, or other discrete entities inline with text. Chips default to `secondary` appearance, `outline` variant, `rounded` shape, and `mono` font, tuned for code-adjacent and metadata contexts.

## When to use

- Tags, labels, and keyword filters attached to a record.
- Attribute or metadata pills inside cards and lists (versions, environments, IDs).
- Removable selections inside an input or filter bar (combine with an inline icon).
- Inline category markers in code samples and API tables. `mono` is the default.

### When NOT to use

- For status indicators that need uppercase emphasis, prefer `Badge` (pill, uppercase, semibold by default).
- For triggering actions or navigation, prefer `Button` or `Link`.
- For inline code snippets, prefer `Code`.

## Basic usage

Each `appearance` prop maps to a semantic color from the active theme.

```tsx demo
<Row flexWrap>
  <Chip primary>primary</Chip>
  <Chip brand>brand</Chip>
  <Chip accent>accent</Chip>
  <Chip>secondary</Chip>
  <Chip tertiary>tertiary</Chip>
  <Chip success>success</Chip>
  <Chip danger>danger</Chip>
  <Chip warning>warning</Chip>
  <Chip info>info</Chip>
  <Chip link>link</Chip>
  <Chip inherit>inherit</Chip>
</Row>
```

## Sizes

Chips come in five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Size drives font-size, padding, gap, and border-radius simultaneously via CSS variables.

```tsx demo
<Row flexWrap>
  <Chip xs>xs</Chip>
  <Chip sm>sm</Chip>
  <Chip>md</Chip>
  <Chip lg>lg</Chip>
  <Chip xl>xl</Chip>
</Row>
```

## Variants

Chips can be styled as `filled`, `outline` (default), or `ghost`.

```tsx demo
<Col>
  <Row flexWrap>
    <Chip filled primary>primary</Chip>
    <Chip filled brand>brand</Chip>
    <Chip filled accent>accent</Chip>
    <Chip filled>secondary</Chip>
  </Row>
  <Row flexWrap>
    <Chip primary>primary</Chip>
    <Chip brand>brand</Chip>
    <Chip accent>accent</Chip>
    <Chip>secondary</Chip>
  </Row>
  <Row flexWrap>
    <Chip ghost primary>primary</Chip>
    <Chip ghost brand>brand</Chip>
    <Chip ghost accent>accent</Chip>
    <Chip ghost>secondary</Chip>
  </Row>
</Col>
```

## Shapes

Chips support three border-radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Chip>rounded</Chip>
  <Chip pill>pill</Chip>
  <Chip sharp>sharp</Chip>
</Row>
```

## Font family

Chips default to `mono` to fit code-adjacent contexts. Override with `sans` or `serif` when the surrounding copy calls for it.

```tsx demo
<Row flexWrap>
  <Chip>v1.4.2</Chip>
  <Chip sans>Active user</Chip>
  <Chip serif>Editorial</Chip>
</Row>
```

## With icon

Drop an icon directly inside the chip. `gap` is on by default, so spacing is automatic.

```tsx demo
<Row flexWrap>
  <Chip brand><Heart/> Favorite</Chip>
  <Chip success><CheckSquare/> Verified</Chip>
  <Chip danger><X/> Blocked</Chip>
</Row>
```

## Tag and filter lists

The canonical chip pattern: a wrapping row of tokens that classify or filter content.

```tsx demo
<Card>
  <Title>Article tags</Title>
  <Row flexWrap>
    <Chip>typescript</Chip>
    <Chip>react</Chip>
    <Chip>tailwind</Chip>
    <Chip>design-systems</Chip>
    <Chip>accessibility</Chip>
  </Row>
</Card>
```

## Removable chips

Pair a chip with an inline close icon to represent removable selections inside a filter bar.

```tsx demo
<Row flexWrap>
  <Chip>typescript <X/></Chip>
  <Chip>react <X/></Chip>
  <Chip danger filled>blocked <X/></Chip>
</Row>
```

## As Link

Pass `href` to render the chip as an `<a>`, useful for clickable tag listings. When `href` is set, the chip gains a keyboard focus-visible outline by default. Opt out with `noFocusVisible`.

```tsx demo
<Row flexWrap>
  <Chip href="#">typescript</Chip>
  <Chip href="#" brand>react</Chip>
  <Chip href="#" accent>tailwind</Chip>
</Row>
```

## Customizing

Set app-wide Chip defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Chip } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  chip: { brand: true, filled: true, pill: true },
}}>
  <Chip>v2.0</Chip>
</ThemeProvider>
```

Add prop-conditional classes with `extraClasses`, applied whenever the matching boolean prop is active:

```tsx
import { ThemeProvider, Chip } from '@vaneui/ui';

<ThemeProvider extraClasses={{
  chip: {
    danger: 'animate-pulse',
    success: 'shadow-sm',
  },
}}>
  <Chip danger>blocked</Chip>
</ThemeProvider>
```
