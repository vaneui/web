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
  <Chip primary>primary</Chip>
  <Chip brand>brand</Chip>
  <Chip accent>accent</Chip>
  <Chip secondary>secondary</Chip>
  <Chip tertiary>tertiary</Chip>
  <Chip success>success</Chip>
  <Chip danger>danger</Chip>
  <Chip warning>warning</Chip>
  <Chip info>info</Chip>
  <Chip link>link</Chip>
  <Chip inherit>inherit</Chip>
</Row>
```

## Chip Sizes

Chips come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Row flexWrap>
  <Chip xs>xs</Chip>
  <Chip sm>sm</Chip>
  <Chip md>md</Chip>
  <Chip lg>lg</Chip>
  <Chip xl>xl</Chip>
</Row>
```

## Chip Shapes

Chips support different border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Chip pill>JavaScript</Chip>
  <Chip sharp>JavaScript</Chip>
  <Chip rounded>JavaScript</Chip>
</Row>
```

## Chip Variants

Chips can be styled as `filled`, `outline` (default), or `ghost`.

```tsx demo
<Col>
  <Row flexWrap>
    <Chip filled primary>primary</Chip>
    <Chip filled brand>brand</Chip>
    <Chip filled accent>accent</Chip>
    <Chip filled secondary>secondary</Chip>
  </Row>
  <Row flexWrap>
    <Chip outline primary>primary</Chip>
    <Chip outline brand>brand</Chip>
    <Chip outline accent>accent</Chip>
    <Chip outline secondary>secondary</Chip>
  </Row>
  <Row flexWrap>
    <Chip ghost primary>primary</Chip>
    <Chip ghost brand>brand</Chip>
    <Chip ghost accent>accent</Chip>
    <Chip ghost secondary>secondary</Chip>
  </Row>
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
