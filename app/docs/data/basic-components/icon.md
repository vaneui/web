---
componentKey: icon
importPath: 'import { Icon } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/icon.tsx
since: 0.9.0
---

A lightweight SVG wrapper that provides consistent sizing, color inheritance, and themed appearances for icons.

## Basic Usage

Wrap any SVG inside `Icon` to apply consistent sizing and color inheritance.

```tsx demo
<Row flexWrap>
  <Icon><Star /></Icon>
  <Icon><Heart /></Icon>
  <Icon><AlertCircle /></Icon>
  <Icon><Check /></Icon>
  <Icon><Info /></Icon>
</Row>
```

## Sizes

Icons support five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Row flexWrap itemsEnd>
  <Col itemsCenter>
    <Icon xs><Star /></Icon>
    <Text sm secondary>xs</Text>
  </Col>
  <Col itemsCenter>
    <Icon sm><Star /></Icon>
    <Text sm secondary>sm</Text>
  </Col>
  <Col itemsCenter>
    <Icon md><Star /></Icon>
    <Text sm secondary>md</Text>
  </Col>
  <Col itemsCenter>
    <Icon lg><Star /></Icon>
    <Text sm secondary>lg</Text>
  </Col>
  <Col itemsCenter>
    <Icon xl><Star /></Icon>
    <Text sm secondary>xl</Text>
  </Col>
</Row>
```

## Appearances

By default, Icon inherits `currentColor` from the parent. Use appearance props to apply themed colors.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Icon primary><Star /></Icon>
    <Text xs secondary>primary</Text>
  </Col>
  <Col itemsCenter>
    <Icon brand><Star /></Icon>
    <Text xs secondary>brand</Text>
  </Col>
  <Col itemsCenter>
    <Icon accent><Star /></Icon>
    <Text xs secondary>accent</Text>
  </Col>
  <Col itemsCenter>
    <Icon secondary><Star /></Icon>
    <Text xs secondary>secondary</Text>
  </Col>
  <Col itemsCenter>
    <Icon tertiary><Star /></Icon>
    <Text xs secondary>tertiary</Text>
  </Col>
  <Col itemsCenter>
    <Icon success><Star /></Icon>
    <Text xs secondary>success</Text>
  </Col>
  <Col itemsCenter>
    <Icon danger><Star /></Icon>
    <Text xs secondary>danger</Text>
  </Col>
  <Col itemsCenter>
    <Icon warning><Star /></Icon>
    <Text xs secondary>warning</Text>
  </Col>
  <Col itemsCenter>
    <Icon info><Star /></Icon>
    <Text xs secondary>info</Text>
  </Col>
  <Col itemsCenter>
    <Icon link><Star /></Icon>
    <Text xs secondary>link</Text>
  </Col>
</Row>
```

## Variants

Icons support `outline` (default, text color only) and `filled` (background fill) variants.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Icon primary><Star /></Icon>
    <Text xs secondary>outline</Text>
  </Col>
  <Col itemsCenter>
    <Icon primary filled><Star /></Icon>
    <Text xs secondary>filled</Text>
  </Col>
  <Col itemsCenter>
    <Icon danger><AlertCircle /></Icon>
    <Text xs secondary>outline</Text>
  </Col>
  <Col itemsCenter>
    <Icon danger filled><AlertCircle /></Icon>
    <Text xs secondary>filled</Text>
  </Col>
</Row>
```

## In Context

Icons work naturally alongside text and inside buttons.

```tsx demo
<Col>
  <Row>
    <Button><Search /> Search</Button>
    <Button success filled><Check /> Saved</Button>
    <Button danger><AlertCircle /> Delete</Button>
  </Row>
  <Text><Icon sm info><Info /></Icon> Icons inherit inline sizing when placed in text.</Text>
</Col>
```
