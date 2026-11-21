---
componentKey: field
importPath: 'import { Field } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/field/Field.tsx
since: 1.1.0
---

Use Field when a control has help text or an error message. A bare [Label](/docs/form-components/label) associates text with a control but links neither message to it, so a screen reader announces that the control is invalid and never says why. For a control that needs a visible name and nothing else, a Label is enough. Field renders a `<div>` that holds a `<label>`, the control, and the help and error text as `<p>` elements. For a whole form built from Fields, with validation, values and submit, see [Forms](/docs/form-components/forms).

## Basic usage

Field wires a control to its label, help text and error message. It generates one id, points the label at the control with `htmlFor`, and links the description and error with `aria-describedby`. Pass any control as the child. `disabled`, `required` and `readOnly` set on the Field reach the child control (and every `Radio` of a child `RadioGroup`); a prop set on the child itself wins. A disabled Field, or a disabled child control, also dims the label.

```tsx demo
<Field label="Email" description="We will never share it.">
  <Input type="email" placeholder="you@company.com"/>
</Field>
```

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
<Field type="text" filled secondary label="Name" description="Filled and secondary route to the input, not the wrapper."/>
```

Three details are worth knowing before you reach for them.

`onChange` is typed for whichever control Field might render, so its event target is the union of an input, a select and a textarea. Reading a property that only one of them has needs a cast:

```tsx
<Field checkbox label="Subscribe"
  onChange={(e) => setSubscribed((e.target as HTMLInputElement).checked)}/>
```

`ref` points at the rendered control for every kind. Before `@vaneui/ui` 1.6.0, the ref of a `checkbox` kind landed on the element wrapping the box, where a form library that reads `.checked` off the ref did not find it.

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

Passing `error` renders the message and marks the control invalid, so the danger cue and the message can never disagree. With a message you do not set `invalid` yourself.

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

An empty string for `error` or `description` means no message, so `error={errors.email ?? ''}` leaves the field valid. This needs `@vaneui/ui` 1.6.0 or later: before that, `error=""` marked the control invalid.

An invalid control gets a danger border and ring plus `aria-invalid="true"`, and on `Input` a trailing alert icon, so the state is never signalled by colour alone.

## Invalid without a message

Set `invalid` on the Field when the control is invalid but the reason is reported elsewhere, such as a cross-field check or a server error shown in a banner. The control gets the same danger cue and `aria-invalid` as with an `error`, and no message element is rendered. `error={true}` does the same. The `invalid` prop needs `@vaneui/ui` 1.5.0 or later.

```tsx demo
<Col>
  <Text sm danger>The end date is before the start date.</Text>
  <Row mobileStack>
    <Field label="Start" invalid>
      <Input type="date" defaultValue="2026-11-20"/>
    </Field>
    <Field label="End" invalid>
      <Input type="date" defaultValue="2026-11-10"/>
    </Field>
  </Row>
</Col>
```

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

A control VaneUI does not ship, such as a plain `<input>`, a masked input or a date picker, joins a Field through `useFieldControlProps`. Spread its result on the control: it adds the Field's `id`, `aria-describedby`, `aria-invalid`, `required`, `disabled` and `readOnly`. The control's own props win, and outside a Field the props come back unchanged. The hook needs `@vaneui/ui` 1.6.0 or later.

```tsx
import { Field, useFieldControlProps } from '@vaneui/ui';

function DateInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" {...useFieldControlProps(props)} />;
}

<Field label="Start date" description="The first day of the booking.">
  <DateInput />
</Field>
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

State set on the Field reaches every radio in the group, whether the group is a child or rendered with `radiogroup`: `disabled`, `readOnly` and `required` pass through, and an `error` or `invalid` marks each radio invalid. `RadioGroup` takes the same props itself (see [Radio](/docs/form-components/radio)).

```tsx demo
<Field disabled label="Billing period" description="Locked by your plan.">
  <RadioGroup name="billing-locked" defaultValue="yearly">
    <Label row itemsCenter><Radio value="monthly"/> Monthly</Label>
    <Label row itemsCenter><Radio value="yearly"/> Yearly</Label>
  </RadioGroup>
</Field>
```

## Sizes

Field's size sets the whole block: the label and the control both take it, and the help and error text sit one step below so they stay subordinate. You set it once, and an explicit size on the control still wins.

```tsx demo
<Col>
  <Field xs label="Extra small">
    <Input placeholder="xs"/>
  </Field>
  <Field label="Small (default)">
    <Input placeholder="sm"/>
  </Field>
  <Field md label="Medium">
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

### On a dark surface

A field's label, help text and error read off the surface they sit on, so putting the block on a filled `Card` or `Row` carries all three with it instead of leaving them in the colours they pin for a light page. `filled` on a self-rendering Field routes to the control, as every surface prop does.

```tsx demo
<Card filled>
  <Field label="Display name" description="Visible to your team.">
    <Input defaultValue="alex.rivera"/>
  </Field>
  <Field textInput filled secondary label="Recovery email" error="Enter a valid address." defaultValue="alex@"/>
</Card>
```

Only the message text follows the surface. The control keeps its danger border, ring and alert icon, so the error is still marked where it happened. The pinned danger red is tuned for a light page and loses contrast on a dark one.

## Bringing your own id

If the control already carries an `id`, Field adopts it rather than generating one, so the label still points at the right element. Useful with form libraries that own the id.

```tsx demo
<Field label="Coupon code" description="Case sensitive.">
  <Input id="coupon" defaultValue="LAUNCH25"/>
</Field>
```

## Frequently asked questions

### How do I mark a field as required with an asterisk?

Field draws no required marker of its own. Put the asterisk in the `label`, for example `label={<>Email <Text tag="span" danger inheritSize aria-hidden>*</Text></>}`, as on the [Label](/docs/form-components/label#required-and-status) page. `aria-hidden` keeps screen readers from reading the symbol, since `required` on the Field already makes the control announce itself as required.

### Can one Field hold two controls?

No. A Field publishes one id, and every VaneUI control inside it takes that id, so two inputs would share it and the label would point at the first one only. Give each control its own Field, or use a [RadioGroup](/docs/form-components/radio) for a set of options. A Button next to the control, such as a password toggle, is fine: buttons do not read the Field.

### Why isn't the error message read out when it appears?

The message is a `<p>` linked to the control with `aria-describedby`, not a live region, so a screen reader reads it while focus is on the control. An error set on blur is therefore heard when the user comes back to the field. After a failed submit, move focus to the first invalid control, as the example in [Forms](/docs/form-components/forms#showing-errors-with-the-field-error-prop) does.
