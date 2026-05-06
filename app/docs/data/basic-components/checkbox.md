---
componentKey: checkbox
importPath: 'import { Checkbox } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/checkbox.tsx
since: 0.9.0
---

Allows users to select one or more options from a set. Checkboxes are ideal for binary choices and multiple selections within forms.

## When to Use

- Boolean form fields (terms, opt-ins, feature toggles in settings).
- Multi-select lists where each option is independent of the others.
- "Select all" / batch actions inside tables or list pages.
- Pair with a `Label` so the entire label area is clickable.

### When NOT to Use

- For mutually exclusive options — use a radio group.
- For single on/off settings where a switch metaphor is clearer — a switch component is the better pattern.

## Customizing

Set app-wide Checkbox defaults with `ThemeProvider`'s `themeDefaults` and tune the checked-state visuals with `extraClasses`:

```tsx
import { ThemeProvider, Checkbox } from '@vaneui/ui';

<ThemeProvider
  themeDefaults={{ checkbox: { primary: true, md: true } }}
  extraClasses={{ checkbox: { primary: 'checked:bg-brand-600 checked:border-brand-600' } }}
>
  <Checkbox>I agree to the terms</Checkbox>
</ThemeProvider>
```

## Basic Usage

Checkbox should be used inside a Label with matching `id`/`htmlFor`.

```tsx demo
<Col>
  <Label htmlFor="terms">
    <Checkbox id="terms"/>
    <span>I agree to the <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>.</span>
  </Label>

  <Label htmlFor="emails">
    <Checkbox defaultChecked id="emails"/>
    <Col noGap tag="span">
      <Text>Receive product updates</Text>
      <Text xs secondary>Occasional emails about new features</Text>
    </Col>
  </Label>
</Col>
```

## Pre-checked Checkbox

Use defaultChecked on the input; wrap in Label for accessible click target.

```tsx demo
<Col>
  <Label htmlFor="prechecked-1">
    <Checkbox id="prechecked-1" defaultChecked/>
    Pre-checked checkbox
  </Label>
</Col>
```

## Sizes

Checkboxes in different sizes: `xs`, `sm`, `md`, `lg`, `xl`. A `Checkbox` nested inside a `Label` inherits the Label's size automatically — set it once on the Label and both scale together.

```tsx demo
<Row flexWrap>
  <Label xs htmlFor="size-xs">
    <Checkbox id="size-xs" defaultChecked/>
    Size: xs
  </Label>
  <Label sm htmlFor="size-sm">
    <Checkbox id="size-sm" defaultChecked/>
    Size: sm
  </Label>
  <Label md htmlFor="size-md">
    <Checkbox id="size-md" defaultChecked/>
    Size: md
  </Label>
  <Label lg htmlFor="size-lg">
    <Checkbox id="size-lg" defaultChecked/>
    Size: lg
  </Label>
  <Label xl htmlFor="size-xl">
    <Checkbox id="size-xl" defaultChecked/>
    Size: xl
  </Label>
</Row>
```

## Appearances

Different color appearances applied to the Checkbox; always place inside a Label.

```tsx demo
<Row flexWrap>
  <Label primary htmlFor="appearance-primary">
    <Checkbox primary id="appearance-primary" defaultChecked/>
    Enable primary style
  </Label>
  <Label brand htmlFor="appearance-brand">
    <Checkbox brand id="appearance-brand" defaultChecked/>
    Enable brand style
  </Label>
  <Label accent htmlFor="appearance-accent">
    <Checkbox accent id="appearance-accent" defaultChecked/>
    Enable accent style
  </Label>
  <Label secondary htmlFor="appearance-secondary">
    <Checkbox secondary id="appearance-secondary" defaultChecked/>
    Enable secondary style
  </Label>
  <Label tertiary htmlFor="appearance-tertiary">
    <Checkbox tertiary id="appearance-tertiary" defaultChecked/>
    Enable tertiary style
  </Label>
  <Label success htmlFor="appearance-success">
    <Checkbox success id="appearance-success" defaultChecked/>
    Enable success style
  </Label>
  <Label danger htmlFor="appearance-danger">
    <Checkbox danger id="appearance-danger" defaultChecked/>
    Enable danger style
  </Label>
  <Label warning htmlFor="appearance-warning">
    <Checkbox warning id="appearance-warning" defaultChecked/>
    Enable warning style
  </Label>
  <Label info htmlFor="appearance-info">
    <Checkbox info id="appearance-info" defaultChecked/>
    Enable info style
  </Label>
  <Label link htmlFor="appearance-link">
    <Checkbox link id="appearance-link" defaultChecked/>
    Enable link style
  </Label>
  <Label inherit htmlFor="appearance-inherit">
    <Checkbox inherit id="appearance-inherit" defaultChecked/>
    Enable inherit style
  </Label>
</Row>
```

## Indeterminate State

Use the `indeterminate` prop for "select all" checkboxes that represent a partially selected group. The indeterminate state is visual only and does not affect the `checked` value.

```tsx
<Checkbox indeterminate />
```

```tsx demo
<Col>
  <Label htmlFor="select-all">
    <Checkbox id="select-all" indeterminate/>
    Select all (2 of 4 selected)
  </Label>
  <Col style={{ paddingLeft: 24 }}>
    <Label htmlFor="ind-1"><Checkbox id="ind-1" defaultChecked/> Item one</Label>
    <Label htmlFor="ind-2"><Checkbox id="ind-2" defaultChecked/> Item two</Label>
    <Label htmlFor="ind-3"><Checkbox id="ind-3"/> Item three</Label>
    <Label htmlFor="ind-4"><Checkbox id="ind-4"/> Item four</Label>
  </Col>
</Col>
```

## Checkbox Group

Multiple labeled checkboxes working together.

```tsx demo
<Col>
  <Label htmlFor="opt-1">
    <Checkbox id="opt-1" defaultChecked/>
    Email notifications
  </Label>
  <Label htmlFor="opt-2">
    <Checkbox id="opt-2"/>
    SMS alerts
  </Label>
  <Label htmlFor="opt-3">
    <Checkbox id="opt-3"/>
    Push notifications
  </Label>
</Col>
```
