---
componentKey: switch
importPath: 'import { Switch } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/switch/Switch.tsx
since: 1.1.0
---

## Basic usage

Switch toggles a setting that takes effect immediately. It renders a real checkbox input with `role="switch"`, so it is operable with the keyboard and announced correctly.

```tsx demo
<Label row itemsCenter>
  <Switch defaultChecked/>
  Email notifications
</Label>
```

Reach for Switch when the change applies at once, and for Checkbox when the value is submitted with a form.

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

```tsx demo
<Col>
  <Label row itemsCenter><Switch/> Off</Label>
  <Label row itemsCenter><Switch defaultChecked/> On</Label>
  <Label row itemsCenter><Switch disabled/> Disabled</Label>
  <Label row itemsCenter><Switch disabled defaultChecked/> Disabled and on</Label>
</Col>
```
