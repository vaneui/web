---
componentKey: select
importPath: 'import { Select } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/select/Select.tsx
since: 1.1.0
---

## Basic usage

Select renders a native `<select>` with the platform dropdown, so it is keyboard and screen-reader correct for free and behaves like the user expects on mobile.

```tsx demo
<Select>
  <option>Cyprus</option>
  <option>Estonia</option>
  <option>Portugal</option>
</Select>
```

The native arrow is replaced with a themed chevron that scales with the size prop. The field reserves room for it, so a long option never runs underneath.

The dropdown list is drawn by the browser, not by VaneUI, so `option` and `optgroup` carry the theme's surface and text tokens directly. That keeps the open list on your palette in both light and dark mode instead of falling back to the browser's own colours.

## Sizes

Selects come in five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. The chevron and the room reserved for it scale with the field.

```tsx demo
<Col>
  <Select xs defaultValue="sm">
    <option value="xs">Extra small</option>
    <option value="sm">Small</option>
    <option value="md">Medium</option>
    <option value="lg">Large</option>
  </Select>
  <Select sm defaultValue="sm">
    <option value="xs">Extra small</option>
    <option value="sm">Small</option>
    <option value="md">Medium</option>
    <option value="lg">Large</option>
  </Select>
  <Select defaultValue="sm">
    <option value="xs">Extra small</option>
    <option value="sm">Small</option>
    <option value="md">Medium</option>
    <option value="lg">Large</option>
  </Select>
  <Select lg defaultValue="sm">
    <option value="xs">Extra small</option>
    <option value="sm">Small</option>
    <option value="md">Medium</option>
    <option value="lg">Large</option>
  </Select>
  <Select xl defaultValue="sm">
    <option value="xs">Extra small</option>
    <option value="sm">Small</option>
    <option value="md">Medium</option>
    <option value="lg">Large</option>
  </Select>
</Col>
```

## States

`invalid` adds a danger border and ring, turns the chevron danger, and emits `aria-invalid`. Pair it with `Field` to attach the message.

```tsx demo
<Col>
  <Select defaultValue="eur">
    <option value="eur">Euro</option>
    <option value="usd">US dollar</option>
    <option value="gbp">Pound sterling</option>
  </Select>
  <Select invalid defaultValue="">
    <option value="" disabled>Select a currency</option>
    <option value="eur">Euro</option>
    <option value="usd">US dollar</option>
    <option value="gbp">Pound sterling</option>
  </Select>
  <Select disabled defaultValue="eur">
    <option value="eur">Euro</option>
    <option value="usd">US dollar</option>
    <option value="gbp">Pound sterling</option>
  </Select>
</Col>
```

## Variants and shapes

Selects are `outline` and `rounded` by default, and take the same appearance, variant and shape props as `Input`.

```tsx demo
<Col>
  <Row flexWrap>
    <Select className="w-48" defaultValue="eur">
      <option value="eur">Outline (default)</option>
      <option value="usd">US dollar</option>
    </Select>
    <Select filled className="w-48" defaultValue="eur">
      <option value="eur">Filled</option>
      <option value="usd">US dollar</option>
    </Select>
    <Select success className="w-48" defaultValue="eur">
      <option value="eur">Success</option>
      <option value="usd">US dollar</option>
    </Select>
  </Row>
  <Row flexWrap>
    <Select pill className="w-48" defaultValue="eur">
      <option value="eur">Pill</option>
      <option value="usd">US dollar</option>
    </Select>
    <Select sharp className="w-48" defaultValue="eur">
      <option value="eur">Sharp</option>
      <option value="usd">US dollar</option>
    </Select>
  </Row>
</Col>
```

## Groups and placeholders

```tsx demo
<Field label="Region" description="Sets your default currency.">
  <Select defaultValue="">
    <option value="" disabled>Choose a region</option>
    <optgroup label="Europe">
      <option>Cyprus</option>
      <option>Estonia</option>
    </optgroup>
    <optgroup label="Americas">
      <option>Canada</option>
    </optgroup>
  </Select>
</Field>
```
