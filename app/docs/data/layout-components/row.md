---
componentKey: row
importPath: 'import { Row } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/row.tsx
since: 0.9.0
---

A fundamental layout component that arranges its children in a horizontal line. It is built on the flexbox model and is used to create columns.

## Basic Row

A horizontal flex container that arranges children in a row. Has `gap: true` by default.

```tsx demo
<Row>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
</Row>
```

## Row Spacing

Gap is enabled by default. Use size props (`sm`, `lg`) to control the gap amount, or `noGap` to disable.

```tsx demo
<Col>
  <Text semibold>Small Gap</Text>
  <Row sm>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>Large Gap</Text>
  <Row lg>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
</Col>
```

## Row Alignment

Control alignment with `justifyCenter`, `justifyBetween`, `itemsCenter`, etc. Note: Row has `itemsCenter: true` by default.

```tsx demo
<Col>
  <Text semibold>Justify Between</Text>
  <Row justifyBetween className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-4 bg-gray-100 rounded">Left</div>
    <div className="p-4 bg-gray-100 rounded">Right</div>
  </Row>
  <Text semibold>Items Center (default)</Text>
  <Row className="border-2 border-dashed border-gray-300 p-2 h-24">
    <div className="p-2 bg-gray-100 rounded">Small</div>
    <div className="p-6 bg-gray-100 rounded">Tall</div>
    <div className="p-2 bg-gray-100 rounded">Small</div>
  </Row>
</Col>
```

## Row Wrap

Use `flexWrap` to allow items to wrap to the next line when they overflow.

```tsx demo
<Row flexWrap className="max-w-md border-2 border-dashed border-gray-300 p-2">
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
  <div className="p-4 bg-gray-100 rounded">Item 4</div>
  <div className="p-4 bg-gray-100 rounded">Item 5</div>
</Row>
```

## Row Variants

Use `filled` or `outline` with appearance props for styled rows.

```tsx demo
<Col>
  <Row filled primary>
    <div className="p-4 bg-white/80 rounded">Filled Primary</div>
    <div className="p-4 bg-white/80 rounded">Item 2</div>
  </Row>
  <Row outline success>
    <div className="p-4 rounded">Outline Success</div>
    <div className="p-4 rounded">Item 2</div>
  </Row>
</Col>
```

## Text Alignment

Use `textCenter`, `textLeft`, `textRight`, or `textJustify` to control text alignment within the row.

```tsx demo
<Col>
  <Row textLeft className="border-2 border-dashed border-gray-300 p-4">
    <Text>Left aligned content in a row.</Text>
  </Row>
  <Row textCenter className="border-2 border-dashed border-gray-300 p-4">
    <Text>Center aligned content in a row.</Text>
  </Row>
  <Row textRight className="border-2 border-dashed border-gray-300 p-4">
    <Text>Right aligned content in a row.</Text>
  </Row>
</Col>
```

## Responsive Layout

Use `mobileCol` or `tabletCol` to switch to column layout on smaller screens.

```tsx demo
<Row tabletCol>
  <Col className="flex-1 p-4 bg-primary-100 rounded">
    <Text semibold>Column 1</Text>
    <Text>Horizontal on desktop, stacked on tablet and below.</Text>
  </Col>
  <Col className="flex-1 p-4 bg-primary-100 rounded">
    <Text semibold>Column 2</Text>
    <Text>Resize to see the responsive behavior.</Text>
  </Col>
</Row>
```
