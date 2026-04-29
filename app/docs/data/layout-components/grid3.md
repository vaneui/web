---
componentKey: grid3
importPath: 'import { Grid3 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid3.tsx
since: 0.9.0
---

A specialized layout component for creating a responsive three-column grid. It simplifies the arrangement of content into a balanced and organized structure.

## Basic Grid3

A three-column grid layout.

```tsx demo
<Grid3>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
  <div className="p-4 bg-gray-100 rounded">Item 4</div>
  <div className="p-4 bg-gray-100 rounded">Item 5</div>
  <div className="p-4 bg-gray-100 rounded">Item 6</div>
</Grid3>
```

## Grid Sizes

Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Col lg>
  <div>
    <Text semibold>Extra Small Grid3</Text>
    <Grid3 xs>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
    </Grid3>
  </div>
  <div>
    <Text semibold>Large Grid3</Text>
    <Grid3 lg>
      <div className="p-6 bg-gray-100 rounded">Item 1</div>
      <div className="p-6 bg-gray-100 rounded">Item 2</div>
      <div className="p-6 bg-gray-100 rounded">Item 3</div>
    </Grid3>
  </div>
</Col>
```

## Grid with Gap

Control spacing between grid items.

```tsx demo
<Col lg>
  <div>
    <Text semibold>No Gap</Text>
    <Grid3 noGap>
      <div className="p-4 bg-gray-100 border">Item 1</div>
      <div className="p-4 bg-gray-100 border">Item 2</div>
      <div className="p-4 bg-gray-100 border">Item 3</div>
    </Grid3>
  </div>
  <div>
    <Text semibold>With Gap</Text>
    <Grid3>
      <div className="p-4 bg-gray-100 rounded">Item 1 (default with gap)</div>
      <div className="p-4 bg-gray-100 rounded">Item 2</div>
      <div className="p-4 bg-gray-100 rounded">Item 3</div>
    </Grid3>
  </div>
</Col>
```

## Grid Appearances

Grids can have different background appearances.

```tsx demo
<Col lg>
  <Grid3 primary>
    <div className="p-4 bg-white rounded">Item 1</div>
    <div className="p-4 bg-white rounded">Item 2</div>
    <div className="p-4 bg-white rounded">Item 3</div>
  </Grid3>
  <Grid3 secondary>
    <div className="p-4 bg-white rounded">Item 1</div>
    <div className="p-4 bg-white rounded">Item 2</div>
    <div className="p-4 bg-white rounded">Item 3</div>
  </Grid3>
</Col>
```

## Grid Variants

Grids support filled and outline variants.

```tsx demo
<Col lg>
  <Grid3 filled primary>
    <div className="p-4 bg-white rounded">Filled Primary Grid</div>
    <div className="p-4 bg-white rounded">Item 2</div>
    <div className="p-4 bg-white rounded">Item 3</div>
  </Grid3>
  <Grid3 outline success>
    <div className="p-4 rounded">Outline Success Grid</div>
    <div className="p-4 rounded">Item 2</div>
    <div className="p-4 rounded">Item 3</div>
  </Grid3>
</Col>
```
