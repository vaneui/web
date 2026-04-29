---
componentKey: chip
importPath: 'import { Chip } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/chip.tsx
since: 0.9.0
---

Represents a complex entity in a compact form, such as an attribute, tag, or contact. Chips can be interactive, allowing for user input or triggering actions.

## Basic Usage

Chip styles and variants.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.appearance.map((key) => (
      <Chip key={key} {...{[key]: true}}>{key}</Chip>
    ))
  }
</Row>
```

## Chip Sizes

Chips come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.size.map((key) => (
      <Chip key={key} {...{[key]: true}}>{key}</Chip>
    ))
  }
</Row>
```

## Chip Shapes

Chips support different border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.shape.map((key: string) => (
      <Chip key={key} {...{[key]: true}}>JavaScript</Chip>
    ))
  }
</Row>
```

## Chip Variants

Chips can be styled as `outline` (default) or `filled`.

```tsx demo
<Col>
  {
    ComponentKeys.variant.map((variant) => (
      <Row key={variant} flexWrap>
        {
          ComponentKeys.appearance.slice(0, 4).map((appearance) => (
            <Chip key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
              {appearance}
            </Chip>
          ))
        }
      </Row>
    ))
  }
</Col>
```

## Chip with Icon

Chips can contain icons along with text.

```tsx demo
<Row flexWrap>
  <Chip brand>
    <Heart className="size-4"/> Brand with Icon
  </Chip>
  <Chip success>
    <CheckSquare className="size-4"/> Success with Icon
  </Chip>
  <Chip danger>
    <X className="size-4"/> Danger with Icon
  </Chip>
</Row>
```
