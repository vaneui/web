---
componentKey: row
importPath: 'import { Row } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/row/Row.tsx
since: 0.9.0
---

A fundamental layout component that arranges its children in a horizontal line. It is built on the flexbox model and is used to create columns.

## Basic Row

A horizontal flex container. `Row` defaults to `gap`, `itemsCenter`, `noPadding`, `noBorder`, `noRing`, `outline`, and `sharp`: you don't need to pass these explicitly. Pass `href` to render `Row` as `<a>` instead of `<div>`. A focus-visible outline auto-enables when `href` is set.

```tsx demo
<Row>
  <div className="p-4 bg-gray-100 rounded">Item 1</div>
  <div className="p-4 bg-gray-100 rounded">Item 2</div>
  <div className="p-4 bg-gray-100 rounded">Item 3</div>
</Row>
```

## Row spacing

Use size props (`xs`, `sm`, `md`, `lg`, `xl`) to control the gap amount, or `noGap` to disable.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Row xs>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>sm</Text>
  <Row sm>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>md (default)</Text>
  <Row>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>lg</Text>
  <Row lg>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>xl</Text>
  <Row xl>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
  <Text semibold>noGap</Text>
  <Row noGap>
    <div className="p-3 bg-gray-100 rounded">Item 1</div>
    <div className="p-3 bg-gray-100 rounded">Item 2</div>
    <div className="p-3 bg-gray-100 rounded">Item 3</div>
  </Row>
</Col>
```

## Justify (main axis)

Control horizontal distribution with `justifyStart`, `justifyEnd`, `justifyCenter`, `justifyBetween`, `justifyAround`, or `justifyEvenly`.

```tsx demo
<Col>
  <Text semibold>justifyStart</Text>
  <Row justifyStart className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
  <Text semibold>justifyEnd</Text>
  <Row justifyEnd className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
  <Text semibold>justifyCenter</Text>
  <Row justifyCenter className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
  <Text semibold>justifyBetween</Text>
  <Row justifyBetween className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
  <Text semibold>justifyAround</Text>
  <Row justifyAround className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
  <Text semibold>justifyEvenly</Text>
  <Row justifyEvenly className="border-2 border-dashed border-gray-300 p-2">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
</Col>
```

## Items (cross axis)

Control vertical alignment with `itemsStart`, `itemsEnd`, `itemsCenter` (default), `itemsBaseline`, or `itemsStretch`.

```tsx demo
<Col>
  <Text semibold>itemsStart</Text>
  <Row itemsStart className="border-2 border-dashed border-gray-300 p-2 h-24">
    <div className="p-2 bg-gray-100 rounded">Small</div>
    <div className="p-6 bg-gray-100 rounded">Tall</div>
    <div className="p-2 bg-gray-100 rounded">Small</div>
  </Row>
  <Text semibold>itemsEnd</Text>
  <Row itemsEnd className="border-2 border-dashed border-gray-300 p-2 h-24">
    <div className="p-2 bg-gray-100 rounded">Small</div>
    <div className="p-6 bg-gray-100 rounded">Tall</div>
    <div className="p-2 bg-gray-100 rounded">Small</div>
  </Row>
  <Text semibold>itemsCenter (default)</Text>
  <Row className="border-2 border-dashed border-gray-300 p-2 h-24">
    <div className="p-2 bg-gray-100 rounded">Small</div>
    <div className="p-6 bg-gray-100 rounded">Tall</div>
    <div className="p-2 bg-gray-100 rounded">Small</div>
  </Row>
  <Text semibold>itemsBaseline</Text>
  <Row itemsBaseline className="border-2 border-dashed border-gray-300 p-2 h-24">
    <Text sm>Small text</Text>
    <Text xl>Large text</Text>
    <Text>Default</Text>
  </Row>
  <Text semibold>itemsStretch</Text>
  <Row itemsStretch className="border-2 border-dashed border-gray-300 p-2 h-24">
    <div className="p-2 bg-gray-100 rounded">A</div>
    <div className="p-2 bg-gray-100 rounded">B</div>
    <div className="p-2 bg-gray-100 rounded">C</div>
  </Row>
</Col>
```

## Row wrap

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

## Reverse order

Use `rowReverse` to reverse the visual order of children.

```tsx demo
<Row rowReverse className="border-2 border-dashed border-gray-300 p-2">
  <div className="p-4 bg-gray-100 rounded">First in DOM</div>
  <div className="p-4 bg-gray-100 rounded">Second</div>
  <div className="p-4 bg-gray-100 rounded">Last in DOM</div>
</Row>
```

## Responsive layout

Use `mobileCol` to stack on mobile, or `tabletCol` to stack on tablet and below.

```tsx demo
<Col>
  <Text semibold>tabletCol (stacks at ≤1024px)</Text>
  <Row tabletCol>
    <Col flex1 className="p-4 bg-primary-100 rounded">
      <Text semibold>Column 1</Text>
      <Text>Horizontal on desktop, stacked on tablet and below.</Text>
    </Col>
    <Col flex1 className="p-4 bg-primary-100 rounded">
      <Text semibold>Column 2</Text>
      <Text>Resize to see the responsive behavior.</Text>
    </Col>
  </Row>
  <Text semibold>mobileCol (stacks at ≤768px)</Text>
  <Row mobileCol>
    <Col flex1 className="p-4 bg-primary-100 rounded">
      <Text semibold>Column 1</Text>
      <Text>Horizontal until mobile.</Text>
    </Col>
    <Col flex1 className="p-4 bg-primary-100 rounded">
      <Text semibold>Column 2</Text>
      <Text>Stacks only on narrow viewports.</Text>
    </Col>
  </Row>
</Col>
```

## Row variants

Use `filled` or `outline` with appearance props for styled rows. Row uses `sharp` (no border-radius) by default: pair with `rounded` or `pill` for curved corners.

```tsx demo
<Col>
  <Row filled primary padding rounded>
    <div className="p-4 bg-white/80 rounded">Filled Primary</div>
    <div className="p-4 bg-white/80 rounded">Item 2</div>
  </Row>
  <Row border success padding rounded>
    <div className="p-4 rounded">Outline Success</div>
    <div className="p-4 rounded">Item 2</div>
  </Row>
</Col>
```

## Text alignment

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

## Inside a Card

Row composes naturally inside a Card to lay out header actions, button groups, or any horizontal cluster.

```tsx demo
<Card>
  <Row justifyBetween>
    <Title>Settings</Title>
    <Badge success>Active</Badge>
  </Row>
  <Text>Configure your preferences below.</Text>
  <Row justifyEnd>
    <Button secondary>Cancel</Button>
    <Button filled>Save</Button>
  </Row>
</Card>
```

## As Link

Add `href` to render the Row as an `<a>` tag, useful for clickable list rows. A keyboard focus-visible outline auto-renders so the link is reachable via Tab; opt out with `noFocusVisible`.

```tsx demo
<Col>
  <Row href="#inbox" justifyBetween padding border rounded>
    <Text semibold>Inbox</Text>
    <Badge primary filled>12</Badge>
  </Row>
  <Row href="#drafts" justifyBetween padding border rounded>
    <Text semibold>Drafts</Text>
    <Badge secondary>3</Badge>
  </Row>
  <Row href="https://github.com" target="_blank" rel="noopener noreferrer" justifyBetween padding border rounded>
    <Text semibold>GitHub</Text>
    <Text sm secondary>External</Text>
  </Row>
</Col>
```

## Next.js Link integration

Use the `tag` prop to render the Row as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Row, Text, Badge } from '@vaneui/ui';

<Row href="/inbox" tag={Link} justifyBetween padding border rounded>
  <Text semibold>Inbox</Text>
  <Badge primary filled>12</Badge>
</Row>
```
