---
componentKey: stack
importPath: 'import { Stack } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/stack/Stack.tsx
since: 0.9.0
---

A vertical flex container with built-in `padding` and `flexWrap`. Think of `Stack` as `Col` plus padding and wrap — reach for it when you want a self-contained surface that breathes, not a structural skeleton.

## Basic Stack

`Stack` defaults to `column`, `flex`, `gap`, `padding`, `flexWrap`, `md`, `noBorder`, `noRing`, `outline`, and `sharp` — you don't need to pass any of these.

```tsx demo
<Stack>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
</Stack>
```

## Stack vs Col

`Stack` and `Col` are both vertical flex columns. The difference is opinion:

- **`Stack`** = `padding: true` + `flexWrap: true` — a padded, wrap-friendly container.
- **`Col`** = `noPadding` — a bare structural column you compose inside other surfaces.

Use `Stack` when the column owns its own breathing room. Use `Col` when an outer `Card` / `Section` / `Container` already supplies the padding.

```tsx demo
<Row itemsStart>
  <Col flex1>
    <Text semibold>Stack (padded by default)</Text>
    <Stack className="border-2 border-dashed border-gray-300">
      <div className="p-3 bg-gray-100 rounded">Item 1</div>
      <div className="p-3 bg-gray-100 rounded">Item 2</div>
    </Stack>
  </Col>
  <Col flex1>
    <Text semibold>Col (no padding)</Text>
    <Col className="border-2 border-dashed border-gray-300">
      <div className="p-3 bg-gray-100 rounded">Item 1</div>
      <div className="p-3 bg-gray-100 rounded">Item 2</div>
    </Col>
  </Col>
</Row>
```

## Stack Direction

Use `row` for horizontal layout. Default is `column` (vertical).

```tsx demo
<Row itemsStart>
  <Col flex1>
    <Text semibold>column (default)</Text>
    <Stack className="border-2 border-dashed border-gray-300">
      <div className="p-3 bg-gray-100 rounded">Item 1</div>
      <div className="p-3 bg-gray-100 rounded">Item 2</div>
    </Stack>
  </Col>
  <Col flex1>
    <Text semibold>row</Text>
    <Stack row className="border-2 border-dashed border-gray-300">
      <div className="p-3 bg-gray-100 rounded">Item 1</div>
      <div className="p-3 bg-gray-100 rounded">Item 2</div>
    </Stack>
  </Col>
</Row>
```

## Stack Spacing

Use size props (`xs`, `sm`, `md`, `lg`, `xl`) to scale gap and padding together, or `noGap` to remove the gap.

```tsx demo
<Row itemsStart>
  <Stack xs flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>xs</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Stack>
  <Stack sm flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>sm</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Stack>
  <Stack flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>md (default)</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Stack>
  <Stack lg flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>lg</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Stack>
  <Stack xl flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>xl</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
  </Stack>
</Row>
```

## Padding Sizes

`padding` is on by default. The padding value scales with the size prop. Use `noPadding` to remove it entirely.

```tsx demo
<Row itemsStart>
  <Stack xs filled secondary flex1>
    <Text semibold>xs padding</Text>
    <div className="p-2 bg-white/80 rounded">Item</div>
  </Stack>
  <Stack filled secondary flex1>
    <Text semibold>md padding (default)</Text>
    <div className="p-2 bg-white/80 rounded">Item</div>
  </Stack>
  <Stack xl filled secondary flex1>
    <Text semibold>xl padding</Text>
    <div className="p-2 bg-white/80 rounded">Item</div>
  </Stack>
  <Stack noPadding filled secondary flex1>
    <Text semibold>noPadding</Text>
    <div className="p-2 bg-white/80 rounded">Item</div>
  </Stack>
</Row>
```

## Items (Cross Axis)

Stack has no `items` default, so children stretch to fill the width. Override with `itemsStart`, `itemsCenter`, `itemsEnd`, `itemsBaseline`, or `itemsStretch`.

```tsx demo
<Row itemsStart>
  <Stack flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>default (stretch)</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack itemsStart flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>itemsStart</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack itemsCenter flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>itemsCenter</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack itemsEnd flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>itemsEnd</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
</Row>
```

## Justify (Main Axis)

Control vertical distribution with `justifyStart`, `justifyEnd`, `justifyCenter`, `justifyBetween`, `justifyAround`, or `justifyEvenly`. The Stack needs a fixed height for these to have any effect.

```tsx demo
<Row itemsStart>
  <Stack justifyStart flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyStart</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack justifyCenter flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyCenter</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack justifyEnd flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyEnd</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack justifyBetween flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyBetween</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack justifyAround flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyAround</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
  <Stack justifyEvenly flex1 className="h-48 border-2 border-dashed border-gray-300">
    <Text semibold>justifyEvenly</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Stack>
</Row>
```

## Wrap Behavior

`flexWrap` is on by default. In a horizontal Stack, items wrap to the next line when they would overflow the container. Use `flexNoWrap` to force everything onto a single line.

```tsx demo
<Col>
  <Text semibold>flexWrap (default) — items wrap when they overflow</Text>
  <Stack row className="max-w-md border-2 border-dashed border-gray-300">
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
    <div className="p-3 bg-gray-100 rounded">Item 4</div>
    <div className="p-3 bg-gray-100 rounded">Item 5</div>
  </Stack>
  <Text semibold>flexNoWrap — items shrink to fit</Text>
  <Stack row flexNoWrap className="max-w-md border-2 border-dashed border-gray-300">
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
    <div className="p-3 bg-gray-100 rounded">Item 4</div>
    <div className="p-3 bg-gray-100 rounded">Item 5</div>
  </Stack>
</Col>
```

## Stack Variants

Use `filled` or `outline` with appearance props for styled containers. Stack defaults to `sharp` — pair with `rounded` or `pill` for curved corners.

```tsx demo
<Row itemsStart>
  <Stack filled primary rounded flex1>
    <div className="p-4 bg-white/80 rounded">Filled Primary</div>
    <div className="p-4 bg-white/80 rounded">Item 2</div>
  </Stack>
  <Stack border success rounded flex1>
    <div className="p-4 rounded">Outline Success</div>
    <div className="p-4 rounded">Item 2</div>
  </Stack>
</Row>
```

## Text Alignment

Use `textLeft`, `textCenter`, `textRight`, or `textJustify` to control text alignment within the stack.

```tsx demo
<Row itemsStart>
  <Stack textLeft flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>Left Aligned</Text>
    <Text>Content aligned to the left.</Text>
  </Stack>
  <Stack textCenter flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>Center Aligned</Text>
    <Text>Content centered within the stack.</Text>
  </Stack>
  <Stack textRight flex1 className="border-2 border-dashed border-gray-300">
    <Text semibold>Right Aligned</Text>
    <Text>Content aligned to the right.</Text>
  </Stack>
</Row>
```

## Responsive Layout

Use `mobileCol` or `tabletCol` on a horizontal Stack to switch back to a column on narrower viewports.

```tsx demo
<Stack row tabletCol>
  <Col flex1 className="p-4 bg-primary-100 rounded">
    <Text semibold>Column 1</Text>
    <Text>Horizontal on desktop, stacked on tablet and below.</Text>
  </Col>
  <Col flex1 className="p-4 bg-primary-100 rounded">
    <Text semibold>Column 2</Text>
    <Text>Resize to see the responsive behavior.</Text>
  </Col>
</Stack>
```

## As a Form Container

Stack's built-in padding makes it a natural container for a form — each `Label` becomes a row with its input, and the Stack provides the vertical rhythm and outer breathing room without any extra wrapper.

```tsx demo
<Stack border rounded className="max-w-sm">
  <Title>Sign in</Title>
  <Label>
    Email
    <Input type="email" placeholder="you@example.com" />
  </Label>
  <Label>
    Password
    <Input type="password" placeholder="********" />
  </Label>
  <Row>
    <Checkbox />
    <Text sm>Remember me</Text>
  </Row>
  <Button filled>Sign in</Button>
</Stack>
```
