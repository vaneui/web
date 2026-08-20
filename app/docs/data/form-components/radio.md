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

## Appearances

Radio takes the same appearance props as Checkbox: the appearance colours the box border, the selected fill and the focus ring. Set it on the `Label` too when you want the text to match.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter><Radio name="a-primary" defaultChecked/> primary (default)</Label>
  <Label row itemsCenter accent><Radio accent name="a-accent" defaultChecked/> accent</Label>
  <Label row itemsCenter secondary><Radio secondary name="a-secondary" defaultChecked/> secondary</Label>
  <Label row itemsCenter tertiary><Radio tertiary name="a-tertiary" defaultChecked/> tertiary</Label>
  <Label row itemsCenter success><Radio success name="a-success" defaultChecked/> success</Label>
  <Label row itemsCenter danger><Radio danger name="a-danger" defaultChecked/> danger</Label>
  <Label row itemsCenter warning><Radio warning name="a-warning" defaultChecked/> warning</Label>
  <Label row itemsCenter info><Radio info name="a-info" defaultChecked/> info</Label>
</Row>
```

## Shapes

Radio is `pill` by default, which is what distinguishes it from a Checkbox at a glance. `rounded` and `sharp` are available, but a square radio reads as a checkbox, so reach for them only when the surrounding design demands it.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter><Radio name="sh-pill" defaultChecked/> pill, the default</Label>
  <Label row itemsCenter><Radio rounded name="sh-rounded" defaultChecked/> rounded</Label>
  <Label row itemsCenter><Radio sharp name="sh-sharp" defaultChecked/> sharp</Label>
</Row>
```

## Variants

Radio is `filled` by default: the box fills with the appearance colour when selected. `outline` keeps the box transparent and colours the dot instead.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter><Radio name="v-filled" defaultChecked/> filled, the default</Label>
  <Label row itemsCenter><Radio outline name="v-outline" defaultChecked/> outline</Label>
  <Label row itemsCenter><Radio ghost name="v-ghost" defaultChecked/> ghost</Label>
</Row>
```

## Explicit size on the control

The Radio takes its own size prop, which wins over the size inherited from the Label.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter lg><Radio xs name="sz-a" defaultChecked/> xs dot, lg label</Label>
  <Label row itemsCenter lg><Radio name="sz-b" defaultChecked/> inherited lg</Label>
  <Label row itemsCenter lg><Radio xl name="sz-c" defaultChecked/> xl dot, lg label</Label>
</Row>
```

## States

```tsx demo
<RadioGroup name="states" defaultValue="on">
  <Label row itemsCenter><Radio value="off"/> Unselected</Label>
  <Label row itemsCenter><Radio value="on"/> Selected</Label>
  <Label row itemsCenter><Radio value="no" disabled/> Disabled</Label>
</RadioGroup>
```
