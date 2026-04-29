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
  {
    ComponentKeys.size.map((key) => (
      <Col key={key} itemsCenter>
        <Icon {...{[key]: true}}><Star /></Icon>
        <Text sm secondary>{key}</Text>
      </Col>
    ))
  }
</Row>
```

## Appearances

By default, Icon inherits `currentColor` from the parent. Use appearance props to apply themed colors.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.appearance.slice(0, -1).map((key) => (
      <Col key={key} itemsCenter>
        <Icon {...{[key]: true}}><Star /></Icon>
        <Text xs secondary>{key}</Text>
      </Col>
    ))
  }
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
