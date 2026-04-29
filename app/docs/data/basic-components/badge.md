---
componentKey: badge
importPath: 'import { Badge } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/badge.tsx
since: 0.9.0
---

Highlights important information such as notifications or counts in a non-intrusive way. Badges are typically used in conjunction with other elements like icons or navigation links.

## Basic Usage

Badge styles and variants.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.appearance.map((key) => (
      <Badge key={key} {...{[key]: true}}>{key}</Badge>
    ))
  }
</Row>
```

## Badge Sizes

Badges come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.size.map((key) => (
      <Badge key={key} {...{[key]: true}}>{key}</Badge>
    ))
  }
</Row>
```

## Badge Shapes

Badges support different border radius styles: `rounded`, `pill` (default), and `sharp`.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.shape.map((key: string) => (
      <Badge key={key} {...{[key]: true}}>Pro</Badge>
    ))
  }
</Row>
```

## Badge Variants

Badges can be styled as `outline` (default) or `filled`.

```tsx demo
<Col>
  {
    ComponentKeys.variant.map((variant) => (
      <Row key={variant} flexWrap>
        {
          ComponentKeys.appearance.slice(0, 4).map((appearance) => (
            <Badge key={`${variant}-${appearance}`} {...{[variant]: true, [appearance]: true}}>
              {appearance}
            </Badge>
          ))
        }
      </Row>
    ))
  }
</Col>
```

## Font Weights

Badges support different font weights.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.fontWeight.slice(3, 7).map((key: string) => (
      <Badge key={key} {...{[key]: true}}>Premium</Badge>
    ))
  }
</Row>
```
