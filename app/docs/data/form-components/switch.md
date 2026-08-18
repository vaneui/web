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

```tsx demo
<Row flexWrap>
  <Switch defaultChecked/>
  <Switch success defaultChecked/>
  <Switch danger defaultChecked/>
  <Switch warning defaultChecked/>
</Row>
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
