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

## Sizes

```tsx demo
<Col>
  <Select xs><option>xs</option></Select>
  <Select sm><option>sm</option></Select>
  <Select><option>md (default)</option></Select>
  <Select lg><option>lg</option></Select>
  <Select xl><option>xl</option></Select>
</Col>
```

## States

```tsx demo
<Col>
  <Select><option>Default</option></Select>
  <Select invalid><option>Invalid</option></Select>
  <Select disabled><option>Disabled</option></Select>
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
