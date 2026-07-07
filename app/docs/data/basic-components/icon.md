---
componentKey: icon
importPath: 'import { Icon } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/icon/Icon.tsx
since: 0.9.0
---

## Basic usage

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

## Shapes

Shape props apply once the icon enters container mode (any of `padding`, `border`, `ring`, `shadow`, `filled`). Without a container, the SVG has no visible box for the radius to act on.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Icon padding primary filled sharp><Star /></Icon>
    <Text xs secondary>sharp</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding primary filled><Star /></Icon>
    <Text xs secondary>rounded</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding primary filled pill><Star /></Icon>
    <Text xs secondary>pill</Text>
  </Col>
</Row>
```

## Container mode

Add `padding` to give the icon a sized box, then combine `filled`, `border`, `ring`, or `shadow` to style the container. Padding and radius scale with the size prop.

```tsx demo
<Row flexWrap itemsCenter>
  <Col itemsCenter>
    <Icon padding pill primary filled><Heart /></Icon>
    <Text xs secondary>filled</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill primary border><Heart /></Icon>
    <Text xs secondary>border</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill primary ring><Heart /></Icon>
    <Text xs secondary>ring</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill primary filled shadow><Heart /></Icon>
    <Text xs secondary>filled + shadow</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill success filled ring><Check /></Icon>
    <Text xs secondary>filled + ring</Text>
  </Col>
  <Col itemsCenter>
    <Icon lg padding pill danger filled><AlertCircle /></Icon>
    <Text xs secondary>lg</Text>
  </Col>
</Row>
```

## Transparent

Use `transparent` to keep the container background see-through while still applying the appearance color to the glyph, border, or ring.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Icon padding pill primary filled transparent border><Star /></Icon>
    <Text xs secondary>filled + transparent</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill success filled transparent ring><Check /></Icon>
    <Text xs secondary>success</Text>
  </Col>
  <Col itemsCenter>
    <Icon padding pill danger filled transparent border><AlertCircle /></Icon>
    <Text xs secondary>danger</Text>
  </Col>
</Row>
```

## In context

Icons work naturally alongside text and inside buttons.

```tsx demo
<Col>
  <Row>
    <Button><Search /> Search</Button>
    <Button success filled><Check /> Saved</Button>
    <Button danger><AlertCircle /> Delete</Button>
  </Row>
  <Text><Icon sm info><Info /></Icon> Icons inherit inline sizing when placed in text.</Text>
  <Row itemsCenter>
    <Icon padding pill primary filled><Star /></Icon>
    <Col gap noPadding>
      <Text bold>Container-mode icons</Text>
      <Text sm secondary>Pair a padded icon with adjacent text for compact summaries.</Text>
    </Col>
  </Row>
</Col>
```
