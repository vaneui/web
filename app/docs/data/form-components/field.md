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

## Error state

Passing `error` renders the message and marks the control invalid, so the danger cue and the message can never disagree. You do not set `invalid` yourself.

```tsx demo
<Col>
  <Field label="Display name" error="This name is already taken.">
    <Input defaultValue="evgenii"/>
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
  <Field sm label="Small">
    <Input placeholder="sm"/>
  </Field>
  <Field label="Medium (default)">
    <Input placeholder="md"/>
  </Field>
  <Field lg label="Large">
    <Input placeholder="lg"/>
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
