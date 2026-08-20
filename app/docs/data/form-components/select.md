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

The list opens below the field and flips above it only when it genuinely does not fit. Browsers default to whichever side has more room, which sends the list upward for any field past the middle of the window even when there is space below it.

Options are children of the field, so they inherit its colours: the list follows the appearance and variant you set rather than staying pinned to the light surface. A disabled option, typically a placeholder, fades toward the list's own background instead of a fixed grey, so it stays readable on a filled list too.

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

## Appearances

Selects are `primary` by default and take the same appearance props as `Input`.

```tsx demo
<Row flexWrap>
  <Select className="w-40" defaultValue="eur">
    <option value="eur">Primary</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select success className="w-40" defaultValue="eur">
    <option value="eur">Success</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select warning className="w-40" defaultValue="eur">
    <option value="eur">Warning</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select danger className="w-40" defaultValue="eur">
    <option value="eur">Danger</option>
    <option value="usd">US dollar</option>
  </Select>
</Row>
```

## Variants

`outline` is the default. The dropdown list takes its colours from the field, so a `filled` Select opens a filled list rather than a light one on a dark control. `ghost` drops the field's own surface but keeps the list opaque, since a see-through popup would render the options unreadable.

```tsx demo
<Row flexWrap>
  <Select className="w-40" defaultValue="eur">
    <option value="eur">Outline</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select filled className="w-40" defaultValue="eur">
    <option value="eur">Filled</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select ghost className="w-40" defaultValue="eur">
    <option value="eur">Ghost</option>
    <option value="usd">US dollar</option>
  </Select>
</Row>
```

## Shapes

`rounded` is the default, and the shape carries through to the dropdown: a `sharp` Select opens a sharp list rather than a rounded one on a square field.

`pill` is the exception. It reshapes the field only, because a pill radius is effectively infinite and a tall list box given that radius swallows its own first and last rows.

```tsx demo
<Row flexWrap>
  <Select rounded className="w-40" defaultValue="eur">
    <option value="eur">Rounded</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select pill className="w-40" defaultValue="eur">
    <option value="eur">Pill</option>
    <option value="usd">US dollar</option>
  </Select>
  <Select sharp className="w-40" defaultValue="eur">
    <option value="eur">Sharp</option>
    <option value="usd">US dollar</option>
  </Select>
</Row>
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
