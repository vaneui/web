---
componentKey: col
importPath: 'import { Col } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/col.tsx
since: 0.9.0
---

A container that organizes content vertically within a Row. It provides a simple way to create flexible and responsive column-based layouts.

## Basic Col

A vertical flex container that arranges children in a column. Has `gap: true` by default.

```tsx demo
<Col>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
</Col>
```

## Col Spacing

Gap is enabled by default. Use size props (`sm`, `lg`) to control the gap amount, or `noGap` to disable.

```tsx demo
<Row>
  <Col sm>
    <Text semibold>Small Gap</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Col>
  <Col lg>
    <Text semibold>Large Gap</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Col>
</Row>
```

## Col Alignment

Control alignment with `justifyCenter`, `justifyBetween`, `itemsCenter`, etc.

```tsx demo
<Row>
  <Col justifyCenter className="h-40 w-32 border-2 border-dashed border-gray-300">
    <div className="p-4 bg-gray-100 rounded">Centered</div>
  </Col>
  <Col justifyBetween className="h-40 w-32 border-2 border-dashed border-gray-300">
    <div className="p-4 bg-gray-100 rounded">Top</div>
    <div className="p-4 bg-gray-100 rounded">Bottom</div>
  </Col>
  <Col itemsCenter className="h-40 w-32 border-2 border-dashed border-gray-300">
    <div className="p-4 bg-gray-100 rounded">Center</div>
  </Col>
</Row>
```

## Col Variants

Use `filled` or `outline` with appearance props for styled columns.

```tsx demo
<Row>
  <Col filled primary className="flex-1">
    <div className="p-4 bg-white/80 rounded">Filled Primary</div>
    <div className="p-4 bg-white/80 rounded">Item 2</div>
  </Col>
  <Col outline success className="flex-1">
    <div className="p-4 rounded">Outline Success</div>
    <div className="p-4 rounded">Item 2</div>
  </Col>
</Row>
```

## Text Alignment

Use `textCenter`, `textLeft`, `textRight`, or `textJustify` to control text alignment within the column.

```tsx demo
<Row>
  <Col textLeft className="flex-1 border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Left Aligned</Text>
    <Text>Content aligned to the left.</Text>
  </Col>
  <Col textCenter className="flex-1 border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Center Aligned</Text>
    <Text>Content centered within the column.</Text>
  </Col>
  <Col textRight className="flex-1 border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Right Aligned</Text>
    <Text>Content aligned to the right.</Text>
  </Col>
</Row>
```

## Nested in Row

Col is commonly used inside Row to create multi-column layouts.

```tsx demo
<Row>
  <Col className="flex-1">
    <Card>
      <Text semibold>Column 1</Text>
      <Text sm secondary>First column content.</Text>
    </Card>
  </Col>
  <Col className="flex-1">
    <Card>
      <Text semibold>Column 2</Text>
      <Text sm secondary>Second column content.</Text>
    </Card>
  </Col>
  <Col className="flex-1">
    <Card>
      <Text semibold>Column 3</Text>
      <Text sm secondary>Third column content.</Text>
    </Card>
  </Col>
</Row>
```
