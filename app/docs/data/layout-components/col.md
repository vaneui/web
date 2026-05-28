---
componentKey: col
importPath: 'import { Col } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/col/Col.tsx
since: 0.9.0
---

A vertical flex container. Pairs with `Row` to build column-based layouts.

## Basic Col

`Col` defaults to `column`, `flex`, `gap`, `md`, `noPadding`, `noBorder`, `noRing`, `outline`, and `sharp` — you don't need to pass any of these. Pass `href` to render `Col` as `<a>` instead of `<div>` — a focus-visible outline auto-enables when `href` is set.

```tsx demo
<Col>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
</Col>
```

## Col Spacing

Use size props (`xs`, `sm`, `md`, `lg`, `xl`) to control the gap, or `noGap` to disable.

```tsx demo
<Row itemsStart>
  <Col xs flex1>
    <Text semibold>xs</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
  <Col sm flex1>
    <Text semibold>sm</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
  <Col flex1>
    <Text semibold>md (default)</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
  <Col lg flex1>
    <Text semibold>lg</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
  <Col xl flex1>
    <Text semibold>xl</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
  <Col noGap flex1>
    <Text semibold>noGap</Text>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Col>
</Row>
```

## Items (Cross Axis)

Col has no `items` default, so children stretch to fill the width. Use `itemsStart`, `itemsCenter`, `itemsEnd`, `itemsBaseline`, or `itemsStretch` to override.

```tsx demo
<Row itemsStart>
  <Col flex1 className="border-2 border-dashed border-gray-300 p-2">
    <Text semibold>default (stretch)</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col itemsStart flex1 className="border-2 border-dashed border-gray-300 p-2">
    <Text semibold>itemsStart</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col itemsCenter flex1 className="border-2 border-dashed border-gray-300 p-2">
    <Text semibold>itemsCenter</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col itemsEnd flex1 className="border-2 border-dashed border-gray-300 p-2">
    <Text semibold>itemsEnd</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
</Row>
```

## Justify (Main Axis)

Control vertical distribution with `justifyStart`, `justifyEnd`, `justifyCenter`, `justifyBetween`, `justifyAround`, or `justifyEvenly`. The Col needs a fixed height for these to have any effect.

```tsx demo
<Row itemsStart>
  <Col justifyStart flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyStart</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col justifyCenter flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyCenter</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col justifyEnd flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyEnd</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col justifyBetween flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyBetween</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col justifyAround flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyAround</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
  <Col justifyEvenly flex1 className="h-48 border-2 border-dashed border-gray-300 p-2">
    <Text semibold>justifyEvenly</Text>
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
  </Col>
</Row>
```

## Reverse Order

Use `columnReverse` to reverse the visual order of children.

```tsx demo
<Col columnReverse className="border-2 border-dashed border-gray-300 p-2">
  <div className="p-3 bg-gray-100 rounded">First in DOM</div>
  <div className="p-3 bg-gray-100 rounded">Second</div>
  <div className="p-3 bg-gray-100 rounded">Last in DOM</div>
</Col>
```

## Col Variants

Use `filled` with an appearance prop for a filled background. Col defaults to `sharp` — pair with `rounded` or `pill` for curved corners, and add `padding` so the background has breathing room.

```tsx demo
<Row itemsStart>
  <Col filled primary padding rounded flex1>
    <div className="p-4 bg-white/80 rounded">Filled Primary</div>
    <div className="p-4 bg-white/80 rounded">Item 2</div>
  </Col>
  <Col border success padding rounded flex1>
    <div className="p-4 rounded">Outline Success</div>
    <div className="p-4 rounded">Item 2</div>
  </Col>
</Row>
```

## Text Alignment

Use `textLeft`, `textCenter`, `textRight`, or `textJustify` to control text alignment within the column.

```tsx demo
<Row itemsStart>
  <Col textLeft flex1 className="border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Left Aligned</Text>
    <Text>Content aligned to the left.</Text>
  </Col>
  <Col textCenter flex1 className="border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Center Aligned</Text>
    <Text>Content centered within the column.</Text>
  </Col>
  <Col textRight flex1 className="border-2 border-dashed border-gray-300 p-4">
    <Text semibold>Right Aligned</Text>
    <Text>Content aligned to the right.</Text>
  </Col>
</Row>
```

## Nested in Row

Col is commonly used inside Row to create multi-column layouts. Use `flex1` so each column shares the available width equally.

```tsx demo
<Row itemsStart>
  <Col flex1>
    <Card>
      <Title>Column 1</Title>
      <Text sm secondary>First column content.</Text>
    </Card>
  </Col>
  <Col flex1>
    <Card>
      <Title>Column 2</Title>
      <Text sm secondary>Second column content.</Text>
    </Card>
  </Col>
  <Col flex1>
    <Card>
      <Title>Column 3</Title>
      <Text sm secondary>Third column content.</Text>
    </Card>
  </Col>
</Row>
```

## Inside a Card

Col composes naturally inside a Card to lay out a vertical cluster — labelled fields, key/value pairs, or a list of actions.

```tsx demo
<Card>
  <Title>Account</Title>
  <Col>
    <Row justifyBetween>
      <Text secondary>Plan</Text>
      <Badge success>Pro</Badge>
    </Row>
    <Row justifyBetween>
      <Text secondary>Seats</Text>
      <Text semibold>12 / 25</Text>
    </Row>
    <Row justifyBetween>
      <Text secondary>Renews</Text>
      <Text semibold>Jan 14, 2026</Text>
    </Row>
  </Col>
  <Row justifyEnd>
    <Button secondary>Manage</Button>
    <Button filled>Upgrade</Button>
  </Row>
</Card>
```

## As a Navigation Column

Col is a natural container for a vertical stack of `NavLink`s in a sidebar.

```tsx demo
<Col className="w-56 border-2 border-dashed border-gray-300 p-3">
  <NavLink href="#" active>Dashboard</NavLink>
  <NavLink href="#">Projects</NavLink>
  <NavLink href="#">Team</NavLink>
  <NavLink href="#">Billing</NavLink>
  <NavLink href="#">Settings</NavLink>
</Col>
```

## As Link

Add `href` to render the Col as an `<a>` tag — useful for clickable feature tiles. A keyboard focus-visible outline auto-renders so the link is reachable via Tab; opt out with `noFocusVisible`.

```tsx demo
<Row itemsStart>
  <Col href="#docs" flex1 padding border rounded>
    <BookOpen size={20} />
    <Title>Documentation</Title>
    <Text secondary>Browse guides and API reference.</Text>
  </Col>
  <Col href="#examples" flex1 padding border rounded>
    <Codepen size={20} />
    <Title>Examples</Title>
    <Text secondary>Copy-ready component patterns.</Text>
  </Col>
  <Col href="https://github.com" target="_blank" rel="noopener noreferrer" flex1 padding border rounded>
    <GitHub size={20} />
    <Title>Source</Title>
    <Text secondary>View the project on GitHub.</Text>
  </Col>
</Row>
```

## Next.js Link Integration

Use the `tag` prop to render the Col as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Col, Title, Text } from '@vaneui/ui';

<Col href="/docs" tag={Link} padding border rounded>
  <Title>Documentation</Title>
  <Text secondary>Browse guides and API reference.</Text>
</Col>
```
