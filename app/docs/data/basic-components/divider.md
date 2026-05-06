---
componentKey: divider
importPath: 'import { Divider } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/divider.tsx
since: 0.9.0
---

Renders a thin line to separate content and create a clear visual hierarchy. Dividers can be used to group related items in lists and layouts.

## Basic Divider

A simple horizontal divider.

```tsx demo
<div>
  <Text>Content above the divider</Text>
  <Divider />
  <Text>Content below the divider</Text>
</div>
```

## Divider Sizes

Dividers come in different sizes such as `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Col lg>
  <div>
    <Text semibold>Divider xs</Text>
    <Divider xs />
    <Text>Content after xs divider</Text>
  </div>
  <div>
    <Text semibold>Divider sm</Text>
    <Divider sm />
    <Text>Content after sm divider</Text>
  </div>
  <div>
    <Text semibold>Divider md</Text>
    <Divider md />
    <Text>Content after md divider</Text>
  </div>
  <div>
    <Text semibold>Divider lg</Text>
    <Divider lg />
    <Text>Content after lg divider</Text>
  </div>
  <div>
    <Text semibold>Divider xl</Text>
    <Divider xl />
    <Text>Content after xl divider</Text>
  </div>
</Col>
```

## Divider Appearances

Dividers use `inherit` appearance by default. Use explicit appearances for colored dividers.

```tsx demo
<Col lg>
  <div>
    <Text semibold>Divider primary</Text>
    <Divider primary />
    <Text>Content after primary divider</Text>
  </div>
  <div>
    <Text semibold>Divider brand</Text>
    <Divider brand />
    <Text>Content after brand divider</Text>
  </div>
  <div>
    <Text semibold>Divider accent</Text>
    <Divider accent />
    <Text>Content after accent divider</Text>
  </div>
  <div>
    <Text semibold>Divider secondary</Text>
    <Divider secondary />
    <Text>Content after secondary divider</Text>
  </div>
  <div>
    <Text semibold>Divider tertiary</Text>
    <Divider tertiary />
    <Text>Content after tertiary divider</Text>
  </div>
  <div>
    <Text semibold>Divider success</Text>
    <Divider success />
    <Text>Content after success divider</Text>
  </div>
</Col>
```

## Vertical Divider

Use `vertical` to render a vertical divider. Useful for separating items in a horizontal row.

```tsx
<Row>
  <Text>Left</Text>
  <Divider vertical />
  <Text>Right</Text>
</Row>
```

```tsx demo
<Row style={{ height: 40 }}>
  <Text>Home</Text>
  <Divider vertical />
  <Text>About</Text>
  <Divider vertical />
  <Text>Contact</Text>
</Row>
```

## Separating Items

Dividers used to separate individual items.

```tsx demo
<Col>
  <div className="p-4 bg-gray-50 rounded">
    <Text semibold>First Item</Text>
    <Text>Description of first item</Text>
  </div>
  <Divider />
  <div className="p-4 bg-gray-50 rounded">
    <Text semibold>Second Item</Text>
    <Text>Description of second item</Text>
  </div>
  <Divider />
  <div className="p-4 bg-gray-50 rounded">
    <Text semibold>Third Item</Text>
    <Text>Description of third item</Text>
  </div>
</Col>
```

## Separating Content Blocks

Dividers used to separate larger content blocks.

```tsx demo
<Col lg>
  <div>
    <Text semibold lg>Block 1</Text>
    <Text>This is the first block with some content that demonstrates how dividers can be used to separate different blocks of content.</Text>
  </div>
  <Divider />
  <div>
    <Text semibold lg>Block 2</Text>
    <Text>This is the second block that follows the divider. The divider provides a clear visual separation between blocks.</Text>
  </div>
  <Divider />
  <div>
    <Text semibold lg>Block 3</Text>
    <Text>This is the third and final block, demonstrating consistent use of dividers throughout the content.</Text>
  </div>
</Col>
```
