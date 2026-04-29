---
componentKey: grid4
importPath: 'import { Grid4 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid4.tsx
since: 0.9.0
---

A responsive layout component that arranges its children into a four-column grid. This is ideal for displaying a collection of items or features.

## Basic Grid4

A four-column grid layout.

```tsx demo
<Grid4>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
  <div className="p-4 bg-gray-100 rounded">Item 4</div>
  <div className="p-4 bg-gray-100 rounded">Item 5</div>
  <div className="p-4 bg-gray-100 rounded">Item 6</div>
  <div className="p-4 bg-gray-100 rounded">Item 7</div>
  <div className="p-4 bg-gray-100 rounded">Item 8</div>
</Grid4>
```

## Grid Sizes

Grids come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Col lg>
  <div>
    <Text semibold>Extra Small Grid4</Text>
    <Grid4 xs>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 1</div>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 2</div>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 3</div>
      <div className="p-2 bg-gray-100 rounded text-sm">Item 4</div>
    </Grid4>
  </div>
  <div>
    <Text semibold>Large Grid4</Text>
    <Grid4 lg>
      <div className="p-6 bg-gray-100 rounded">Item 1</div>
      <div className="p-6 bg-gray-100 rounded">Item 2</div>
      <div className="p-6 bg-gray-100 rounded">Item 3</div>
      <div className="p-6 bg-gray-100 rounded">Item 4</div>
    </Grid4>
  </div>
</Col>
```

## Grid with Gap

Control spacing between grid items.

```tsx demo
<Col lg>
  <div>
    <Text semibold>No Gap</Text>
    <Grid4 noGap>
      <div className="p-4 bg-gray-100 border">Item 1</div>
      <div className="p-4 bg-gray-100 border">Item 2</div>
      <div className="p-4 bg-gray-100 border">Item 3</div>
      <div className="p-4 bg-gray-100 border">Item 4</div>
    </Grid4>
  </div>
  <div>
    <Text semibold>With Gap</Text>
    <Grid4>
      <div className="p-4 bg-gray-100 rounded">Item 1 (default with gap)</div>
      <div className="p-4 bg-gray-100 rounded">Item 2</div>
      <div className="p-4 bg-gray-100 rounded">Item 3</div>
      <div className="p-4 bg-gray-100 rounded">Item 4</div>
    </Grid4>
  </div>
</Col>
```

## Grid Appearances

Grids can have different background appearances.

```tsx demo
<Col lg>
  <Grid4 primary>
    <div className="p-4 bg-white rounded">Item 1</div>
    <div className="p-4 bg-white rounded">Item 2</div>
    <div className="p-4 bg-white rounded">Item 3</div>
    <div className="p-4 bg-white rounded">Item 4</div>
  </Grid4>
  <Grid4 secondary>
    <div className="p-4 bg-white rounded">Item 1</div>
    <div className="p-4 bg-white rounded">Item 2</div>
    <div className="p-4 bg-white rounded">Item 3</div>
    <div className="p-4 bg-white rounded">Item 4</div>
  </Grid4>
</Col>
```
