---
componentKey: input
importPath: 'import { Input } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/input/Input.tsx
since: 0.9.0
---

Allows users to enter text, numbers, and other data. Inputs are essential form elements with support for various types, validation states, and styling options.

## When to use

- Text, email, password, number, search, URL, and tel form fields.
- Inline editable values in tables, settings panels, or detail pages.
- Filter/search bars where the value drives a list or query.
- Pair with `Label` for accessible field labelling.

### When NOT to use

- For long-form text: use a `<textarea>` (autosize support not yet built into VaneUI).
- For binary toggles: use `Checkbox`.
- For one-of-many selection: use a select/radio pattern.

## Customizing

Set app-wide Input defaults with `ThemeProvider`'s `themeDefaults` and add a focus-ring colour with `extraClasses`:

```tsx
import { ThemeProvider, Input } from '@vaneui/ui';

<ThemeProvider
  themeDefaults={{ input: { lg: true, filled: true } }}
  extraClasses={{ input: { primary: 'focus:ring-2 focus:ring-brand-500/40' } }}
>
  <Input placeholder="Email" />
</ThemeProvider>
```

## Basic input

A styled text input field.

```tsx demo
<Input placeholder="Enter text..." />
```

## Input sizes

Inputs come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Input xs placeholder="Extra small" />
  <Input sm placeholder="Small" />
  <Input placeholder="Medium (default)" />
  <Input lg placeholder="Large" />
  <Input xl placeholder="Extra large" />
</Col>
```

## Input types

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

## Input variants

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

## Input with labels

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

## Input shapes

Inputs support border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Input placeholder="Rounded (default)" />
  <Input pill placeholder="Pill shape" />
  <Input sharp placeholder="Sharp corners" />
</Row>
```

## Input states

Different input states: disabled, readonly, and validation feedback. Use appearance props (`success`, `danger`) for visual feedback, or the `error` status prop for form validation state.

```tsx
<Input placeholder="Normal input" />
<Input disabled placeholder="Disabled input" />
<Input success placeholder="Success state" />
<Input danger placeholder="Error state" />
<Input error placeholder="Validation error" />
```

```tsx demo
<Col>
  <Input placeholder="Normal input" />
  <Input disabled placeholder="Disabled input" />
  <Input success placeholder="Success state" />
  <Input danger placeholder="Error state" />
  <Input error placeholder="Validation error (status)" />
</Col>
```
