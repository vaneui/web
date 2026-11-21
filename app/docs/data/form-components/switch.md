---
componentKey: switch
importPath: 'import { Switch } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/switch/Switch.tsx
since: 1.1.0
---

Switch takes the same `checked`, `defaultChecked`, `onChange`, `name` and `readOnly` props as [Checkbox](/docs/form-components/checkbox), so choosing between the two comes down to when the change applies. Its knob is decorative markup marked `aria-hidden`. Pass `switch` to a [Field](/docs/form-components/field) to render a Switch with its label beside it.

## Basic usage

Switch toggles a setting that takes effect immediately. It renders a real checkbox input with `role="switch"`, so it is operable with the keyboard and announced correctly.

```tsx demo
<Label row itemsCenter>
  <Switch defaultChecked/>
  Email notifications
</Label>
```

## Sizes

A Switch inside a Label inherits the Label's size, so set it once.

```tsx demo
<Col>
  <Label row itemsCenter xs><Switch defaultChecked/> Extra small</Label>
  <Label row itemsCenter sm><Switch defaultChecked/> Small</Label>
  <Label row itemsCenter md><Switch defaultChecked/> Medium</Label>
  <Label row itemsCenter lg><Switch defaultChecked/> Large</Label>
  <Label row itemsCenter xl><Switch defaultChecked/> Extra large</Label>
</Col>
```

## Appearances

The appearance colours the track when the switch is on, and the focus ring.

```tsx demo
<Row flexWrap>
  <Label row itemsCenter><Switch defaultChecked/> primary (default)</Label>
  <Label row itemsCenter accent><Switch accent defaultChecked/> accent</Label>
  <Label row itemsCenter secondary><Switch secondary defaultChecked/> secondary</Label>
  <Label row itemsCenter tertiary><Switch tertiary defaultChecked/> tertiary</Label>
  <Label row itemsCenter success><Switch success defaultChecked/> success</Label>
  <Label row itemsCenter danger><Switch danger defaultChecked/> danger</Label>
  <Label row itemsCenter warning><Switch warning defaultChecked/> warning</Label>
  <Label row itemsCenter info><Switch info defaultChecked/> info</Label>
</Row>
```

## Shapes

Switch is `pill` by default. The shape applies to the track and the knob together: the knob's corner radius insets from the track's by the track padding, so the two stay concentric instead of a round knob sitting in a square track.

```tsx demo
<Col>
  <Label row itemsCenter><Switch defaultChecked/> pill, the default</Label>
  <Label row itemsCenter><Switch rounded defaultChecked/> rounded</Label>
  <Label row itemsCenter><Switch sharp defaultChecked/> sharp</Label>
</Col>
```

## Variants

Switch is `filled` by default: the track fills with the appearance colour when on. `outline` keeps the track transparent and colours its border instead.

```tsx demo
<Col>
  <Label row itemsCenter><Switch defaultChecked/> filled, the default</Label>
  <Label row itemsCenter><Switch outline defaultChecked/> outline</Label>
  <Label row itemsCenter><Switch ghost defaultChecked/> ghost</Label>
</Col>
```

## Explicit size on the control

The Switch takes its own size prop, which wins over the size inherited from the Label.

```tsx demo
<Col>
  <Label row itemsCenter lg><Switch xs defaultChecked/> xs track, lg label</Label>
  <Label row itemsCenter lg><Switch defaultChecked/> inherited lg</Label>
  <Label row itemsCenter lg><Switch xl defaultChecked/> xl track, lg label</Label>
</Col>
```

## States

A `readOnly` switch keeps its value when clicked and dims like a read-only text field; `Checkbox` and `Radio` behave the same way.

```tsx demo
<Col>
  <Label row itemsCenter><Switch/> Off</Label>
  <Label row itemsCenter><Switch defaultChecked/> On</Label>
  <Label row itemsCenter><Switch disabled/> Disabled</Label>
  <Label row itemsCenter><Switch disabled defaultChecked/> Disabled and on</Label>
  <Label row itemsCenter><Switch readOnly defaultChecked/> Read-only</Label>
</Col>
```

## Frequently asked questions

### How do I put the Switch at the end of a settings row?

Put the text first and the Switch last in `<Label row itemsCenter justifyBetween wFull>`. The row fills its container and pushes the Switch to the end edge, and a click anywhere on the text still toggles it. For a description under the setting name, wrap the two lines in `<Col noGap tag="span">` and give each line `<Text tag="span">`, since a label holds no `<p>` or `<div>`.

### How do I name a Switch that has no visible text?

Pass `aria-label`, for example `<Switch aria-label="Email notifications"/>`. Switch hands it to the native input, so a screen reader announces the name, the switch role and whether it is on. When the setting name is visible elsewhere, such as in the first cell of a table row, point `aria-labelledby` at that text instead of repeating it.

### What does a Switch send with the form?

The same as a Checkbox: its `value`, or `"on"` without one, when it is on, and no entry when it is off. A Switch usually applies its setting at once through `checked` and `onChange` instead of waiting for a submit, as in the controlled example under [Values of Checkbox, RadioGroup, Switch and Select](/docs/form-components/forms#values-of-checkbox-radiogroup-switch-and-select).
