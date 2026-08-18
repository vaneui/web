---
componentKey: radio
importPath: 'import { Radio, RadioGroup } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/radio/Radio.tsx
since: 1.1.0
---

## Basic usage

Radio selects exactly one option from a set. Wrap the options in a `RadioGroup` so they share a name and behave as one control.

```tsx demo
<RadioGroup name="plan" defaultValue="pro">
  <Label row itemsCenter><Radio value="free"/> Free</Label>
  <Label row itemsCenter><Radio value="pro"/> Pro</Label>
  <Label row itemsCenter><Radio value="team"/> Team</Label>
</RadioGroup>
```

`RadioGroup` renders `role="radiogroup"` and generates a shared `name` when you do not pass one, so radios are mutually exclusive without extra wiring.

## With a group label

Inside a `Field`, the group is labelled by reference with `aria-labelledby`, because a radiogroup cannot be the target of `htmlFor`.

```tsx demo
<Field label="Billing period" description="Change it any time.">
  <RadioGroup name="billing" defaultValue="yearly">
    <Label row itemsCenter><Radio value="monthly"/> Monthly</Label>
    <Label row itemsCenter><Radio value="yearly"/> Yearly, two months free</Label>
  </RadioGroup>
</Field>
```

## Sizes

```tsx demo
<Col>
  <Label row itemsCenter xs><Radio name="s-xs" defaultChecked/> Extra small</Label>
  <Label row itemsCenter sm><Radio name="s-sm" defaultChecked/> Small</Label>
  <Label row itemsCenter md><Radio name="s-md" defaultChecked/> Medium</Label>
  <Label row itemsCenter lg><Radio name="s-lg" defaultChecked/> Large</Label>
  <Label row itemsCenter xl><Radio name="s-xl" defaultChecked/> Extra large</Label>
</Col>
```

## States

```tsx demo
<RadioGroup name="states" defaultValue="on">
  <Label row itemsCenter><Radio value="off"/> Unselected</Label>
  <Label row itemsCenter><Radio value="on"/> Selected</Label>
  <Label row itemsCenter><Radio value="no" disabled/> Disabled</Label>
</RadioGroup>
```
