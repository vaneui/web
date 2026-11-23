---
componentKey: radio
importPath: 'import { Radio, RadioGroup } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/radio/Radio.tsx
since: 1.1.0
---

Radio fits a short set of choices that should all stay visible. Each one is a native `<input type="radio">`, so the browser moves the selection with the arrow keys inside a group. RadioGroup takes `value`, `defaultValue` and `onChange` for the whole set and matches each option by its `value` prop. For a long list, use a [Select](/docs/form-components/select); for a few short options shown side by side, such as a filter, use a [SegmentedControl](/docs/form-components/segmented-control); when more than one option can be on, use [Checkbox](/docs/form-components/checkbox).

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

## Group state props

`RadioGroup` takes `disabled`, `readOnly`, `required` and `invalid`. Each one reaches every `Radio` in the group, and a `Radio`'s own prop wins. The group element also gets the matching `aria-disabled`, `aria-readonly`, `aria-required` and `aria-invalid` attributes. These props need `@vaneui/ui` 1.5.0 or later.

```tsx demo
<Row flexWrap itemsStart>
  <Col>
    <Text sm secondary>disabled</Text>
    <RadioGroup name="group-disabled" disabled defaultValue="free">
      <Label row itemsCenter><Radio value="free"/> Free</Label>
      <Label row itemsCenter><Radio value="pro"/> Pro</Label>
      <Label row itemsCenter><Radio value="team" disabled={false}/> Team, enabled</Label>
    </RadioGroup>
  </Col>
  <Col>
    <Text sm secondary>readOnly</Text>
    <RadioGroup name="group-readonly" readOnly defaultValue="pro">
      <Label row itemsCenter><Radio value="free"/> Free</Label>
      <Label row itemsCenter><Radio value="pro"/> Pro</Label>
    </RadioGroup>
  </Col>
  <Col>
    <Text sm secondary>invalid</Text>
    <RadioGroup name="group-invalid" invalid>
      <Label row itemsCenter><Radio value="free"/> Free</Label>
      <Label row itemsCenter><Radio value="pro"/> Pro</Label>
    </RadioGroup>
  </Col>
</Row>
```

Inside a [Field](/docs/form-components/field), the Field's own `disabled`, `readOnly`, `required` and `error` reach the group the same way.

## Frequently asked questions

### How do I lay out radio options in a row?

Add `row` to the RadioGroup. It is a flex column by default and takes the layout props of a `Col`, so `<RadioGroup row flexWrap>` puts the options side by side and wraps them on a narrow screen, and `mobileStack` returns them to a column below 768px. The arrow keys move the selection in either layout.

### How do I let the user clear a radio selection?

Give the group a way back, because a native radio cannot be unchecked by clicking it again. Add an option such as "None" with its own `value`, or a reset button. In a controlled group, set `value` to an empty string: no Radio matches it, so none is checked. In an uncontrolled form, a `type="reset"` button restores the group's `defaultValue`.

### Can I use Radio without a RadioGroup?

Yes. Radios that share a `name` are mutually exclusive in the browser, as in the size examples on this page. Without a RadioGroup the set loses the `radiogroup` role, the generated name, the shared `value` and `onChange`, and the group state props, and a [Field](/docs/form-components/field#radio-groups) around bare radios gives all of them its single id. Keep the group for any set a user fills in.
