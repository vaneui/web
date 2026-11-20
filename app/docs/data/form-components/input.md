---
componentKey: input
importPath: 'import { Input } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/input/Input.tsx
since: 0.9.0
---

Input takes a single-line value, such as a name, an email address or a search query, and renders a native `<input>`. With `invalid` set, it adds `aria-invalid="true"` and a trailing alert icon that screen readers skip. Text that runs over several lines needs a [Textarea](/docs/form-components/textarea), and a [Field](/docs/form-components/field) around an Input links its label, help text and error message.

## Basic usage

Input renders a styled text field for entering text, numbers, and other data. It defaults to `sm`, `primary`, `outline`, and `rounded`, with `insetRing` and `focusVisible`. Input is `wFull` by default, so it spans its container. Constrain the width with a sized parent or `className="w-64"`.

```tsx demo
<Input placeholder="Enter text..." />
```

## Sizes

Inputs come in different sizes: `xs`, `sm` (default), `md`, `lg`, `xl`. At the same size an Input is as tall as a `Button` and has the same corner radius. Both default to `sm`, so a field and a button with no size prop line up. When you size one, give the other the same prop.

```tsx demo
<Row>
  <Input placeholder="you@company.com" />
  <Button filled>Subscribe</Button>
</Row>
```

```tsx demo
<Col>
  <Input xs placeholder="Extra small" />
  <Input placeholder="Small (default)" />
  <Input md placeholder="Medium" />
  <Input lg placeholder="Large" />
  <Input xl placeholder="Extra large" />
</Col>
```

## Variants

Inputs are `outline` by default. Use `filled` for solid backgrounds.

```tsx demo
<Col>
  <Row flexWrap>
    <Input placeholder="Outline (default)" />
    <Input success placeholder="Outline success" />
    <Input danger placeholder="Outline danger" />
  </Row>
  <Row flexWrap>
    <Input filled placeholder="Filled" />
    <Input filled success placeholder="Filled success" />
    <Input filled danger placeholder="Filled danger" />
  </Row>
</Col>
```

## Shapes

Inputs support border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Input placeholder="Rounded (default)" />
  <Input pill placeholder="Pill shape" />
  <Input sharp placeholder="Sharp corners" />
</Row>
```

## Types

The `type` HTML attribute passes through to the underlying `<input>` element.

```tsx demo
<Col>
  <Input type="text" placeholder="Text input" />
  <Input type="email" placeholder="Email input" />
  <Input type="password" placeholder="Password input" />
  <Input type="number" placeholder="Number input" />
  <Input type="search" placeholder="Search input" />
</Col>
```

## With labels

Pair inputs with labels for accessibility and better UX. When the `Input` is nested inside a `Label`, it inherits the Label's size. Set it once on the Label.

```tsx demo
<Col>
  <Label>
    Full Name
    <Input type="text" placeholder="Enter your full name" />
  </Label>
  <Label lg>
    Email Address (large)
    <Input type="email" placeholder="Enter your email" />
  </Label>
</Col>
```

## States

Different input states: disabled, readonly, and validation feedback. Use appearance props (`success`, `danger`) for visual feedback, or the `invalid` validity prop for form validation state. `invalid` layers a danger border and ring over the current appearance.

```tsx
<Input placeholder="Normal input" />
<Input disabled placeholder="Disabled input" />
<Input success placeholder="Success state" />
<Input danger placeholder="Error state" />
<Input invalid placeholder="Validation error" />
```

```tsx demo
<Col>
  <Input placeholder="Normal input" />
  <Input disabled placeholder="Disabled input" />
  <Input success placeholder="Success state" />
  <Input danger placeholder="Error state" />
  <Input invalid placeholder="Validation error (validity)" />
</Col>
```

Input renders a wrapper `<span>` around the `<input>`. While the input is valid the wrapper is `display: contents`, so it adds no box, and `ref`, `className` and `style` go to the `<input>`. The `<input>` stays the same node when `invalid` changes, so the field keeps focus and its text while it is validated as the user types. Before `@vaneui/ui` 1.6.0 the wrapper was rendered only while the input was invalid. A selector that expects the `<input>` as a direct child of its parent, such as `.form > input`, does not match.

## Customizing

Set app-wide Input defaults with `ThemeProvider`'s `themeDefaults` and add a focus-ring colour with `extraClasses`:

```tsx demo
<ThemeProvider
  themeDefaults={{ input: { lg: true, filled: true } }}
  extraClasses={{ input: { primary: 'focus:ring-2 focus:ring-blue-500/40' } }}
>
  <Input placeholder="Email" />
</ThemeProvider>
```
