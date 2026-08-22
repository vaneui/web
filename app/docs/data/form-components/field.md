---
componentKey: field
importPath: 'import { Field } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/field/Field.tsx
since: 1.1.0
---

## Basic usage

Field wires a control to its label, help text and error message. It generates one id, points the label at the control with `htmlFor`, and links the description and error with `aria-describedby`. Pass any control as the child.

```tsx demo
<Field label="Email" description="We will never share it.">
  <Input type="email" placeholder="you@company.com"/>
</Field>
```

`Label` on its own associates text with a control, but nothing links help text or an error message to it. That is what Field adds: without it, a screen reader announces that a control is invalid and never says why.

## Rendering the control

Field can render the control itself instead of wrapping one passed as a child. Pass `type` (a control kind such as `select`, or a native input type such as `email` or `date`) or one of six booleans: `textInput`, `textarea`, `select`, `checkbox`, `switch`, `radiogroup`. Naming none of them keeps the children mode above unchanged.

```tsx demo
<Col>
  <Field type="email" label="Email" description="We never share it." placeholder="you@company.com"/>
  <Field select label="Region" description="Sets your default currency.">
    <option>Cyprus</option>
    <option>Estonia</option>
    <option>Portugal</option>
  </Field>
</Col>
```

Children still reach the rendered control, so an `<option>` works with `select` and a `<Radio>` works with `radiogroup`, the same way they do when passed to a standalone `Select` or `RadioGroup`.

In this self-rendering mode, surface props (`appearance`, `variant`, `shape`, `border`, `ring`, `shadow`, `transparent`) route to the control rather than the wrapper, and native attributes such as `placeholder` or `defaultValue` go to the control too. Layout props and `className` stay on the wrapper, and `ref` points at the control. Field's own size still becomes the control's default, the same as in children mode.

```tsx demo
<Field type="text" filled danger label="Name" description="Filled and danger route to the input, not the wrapper."/>
```

Three details are worth knowing before you reach for them.

`onChange` is typed for whichever control Field might render, so its event target is the union of an input, a select and a textarea. Reading a property that only one of them has needs a cast:

```tsx
<Field checkbox label="Subscribe"
  onChange={(e) => setSubscribed((e.target as HTMLInputElement).checked)}/>
```

`ref` points at the rendered control for every kind except `checkbox`, where it lands on the element wrapping the box. A form library that reads `.checked` straight off the ref will not find it there; pass the control as a child and put the ref on it instead.

`className` stays on the wrapper, but `style` goes to the control, since only `className` and `tag` are treated as wrapper props. Use `className` to size or place the whole field block.

## Checkbox and switch

`checkbox` and `switch` lay out inline: the control first, the label beside it, with the description and error below the row. Any explicit direction prop (`row`, `column`, `rowReverse` or `columnReverse`) drops the inline row and falls back to the plain stacked layout used by every other control.

```tsx demo
<Col>
  <Field checkbox label="Subscribe to the newsletter" description="One email a month."/>
  <Field switch label="Beta features"/>
</Col>
```

## Error state

Passing `error` renders the message and marks the control invalid, so the danger cue and the message can never disagree. You do not set `invalid` yourself.

```tsx demo
<Col>
  <Field label="Display name" error="This name is already taken.">
    <Input defaultValue="alex.rivera"/>
  </Field>

  <Field
    label="Password"
    description="At least 12 characters."
    error="Too short."
  >
    <Input type="password" defaultValue="short"/>
  </Field>
</Col>
```

When both `description` and `error` are present, the control is described by both, in that order.

An invalid control gets a danger border and ring plus `aria-invalid="true"`, and on `Input` a trailing alert icon, so the state is never signalled by colour alone.

## Any control

Every form control reads the Field it sits in: `Input`, `Textarea`, `Select`, `Checkbox`, `Radio` and `Switch`.

```tsx demo
<Col>
  <Field label="Region" description="Sets your default currency.">
    <Select>
      <option>Cyprus</option>
      <option>Estonia</option>
      <option>Portugal</option>
    </Select>
  </Field>

  <Field label="Release notes" description="Markdown is supported.">
    <Textarea placeholder="What changed?"/>
  </Field>
</Col>
```

## Radio groups

A `radiogroup` is not a labelable element, so Field labels it by reference with `aria-labelledby` instead of `htmlFor`, and leaves the individual radios alone.

```tsx demo
<Field label="Billing period" description="Change it any time.">
  <RadioGroup name="billing" defaultValue="yearly">
    <Label row itemsCenter><Radio value="monthly"/> Monthly</Label>
    <Label row itemsCenter><Radio value="yearly"/> Yearly</Label>
  </RadioGroup>
</Field>
```

## Sizes

Field's size becomes the control's default, so you set it once. An explicit size on the control still wins.

```tsx demo
<Col>
  <Field xs label="Extra small">
    <Input placeholder="xs"/>
  </Field>
  <Field sm label="Small">
    <Input placeholder="sm"/>
  </Field>
  <Field label="Medium (default)">
    <Input placeholder="md"/>
  </Field>
  <Field lg label="Large">
    <Input placeholder="lg"/>
  </Field>
  <Field xl label="Extra large">
    <Input placeholder="xl"/>
  </Field>
</Col>
```

## Shape, variant and appearance

Field is a layout wrapper, so it takes the same surface props as `Col`: it paints nothing by default (`sharp`, `outline`, no padding), and an appearance only shows once you give it a surface with `filled` or `border`. Useful for marking a field block that needs attention without touching the control inside it.

```tsx demo
<Col>
  <Field label="Default" description="No surface of its own.">
    <Input placeholder="you@company.com"/>
  </Field>
  <Field rounded border danger padding label="Bordered danger" description="A border plus an appearance.">
    <Input placeholder="you@company.com"/>
  </Field>
  <Field rounded filled secondary padding label="Filled secondary" description="A surface plus an appearance.">
    <Input placeholder="you@company.com"/>
  </Field>
</Col>
```

## Bringing your own id

If the control already carries an `id`, Field adopts it rather than generating one, so the label still points at the right element. Useful with form libraries that own the id.

```tsx demo
<Field label="Coupon code" description="Case sensitive.">
  <Input id="coupon" defaultValue="LAUNCH25"/>
</Field>
```
