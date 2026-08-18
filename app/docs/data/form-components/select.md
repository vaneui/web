---
componentKey: select
importPath: 'import { Select } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/select/Select.tsx
since: 1.1.0
---

## Basic usage

Select renders a real `<select>`, so keyboard support, screen-reader semantics, form submission and constraint validation all come from the platform rather than from re-implemented JavaScript.

```tsx demo
<Select>
  <option>Cyprus</option>
  <option>Estonia</option>
  <option>Portugal</option>
</Select>
```

The native arrow is replaced with a themed chevron that scales with the size prop. The field reserves room for it, so a long option never runs underneath.

## The dropdown list

Historically a native `<select>` hands its option list to the operating system, which draws a flat, square, unpadded menu that no page CSS can reach. Only the option's text and background colour land, because the options get no layout box at all.

On engines that support `appearance: base-select` the list becomes real DOM instead, and VaneUI styles it to match a `Menu`: themed surface, border, radius, shadow, padded rows, a hover state, and a checkmark on the selected option. Everywhere else the OS picker still appears, with `option` and `optgroup` pinned to the theme's surface and text tokens so the list at least stays on your palette in both light and dark mode.

Nothing is required to opt in, and nothing breaks on engines without it: the enhancement sits behind an `@supports` rule and the control is the same `<select>` either way.

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
