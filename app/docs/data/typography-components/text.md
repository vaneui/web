---
componentKey: text
importPath: 'import { Text } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/text.tsx
since: 0.9.0
---

The primary component for rendering all text content. It provides props to control typographic properties like size, weight, color, and alignment.

## Basic Text

Default paragraph text styling.

```tsx demo
<Text>Build beautiful user interfaces with VaneUI components. Text provides consistent typography across your application.</Text>
```

## Text Sizes

Text comes in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Text sm>Small text for captions and secondary content</Text>
  <Text>Medium text for body content (default)</Text>
  <Text lg>Large text for emphasis</Text>
</Col>
```

## Inherit Appearance (Default)

By default, Text uses the `inherit` appearance — it inherits text color from its parent via CSS cascade instead of applying its own color. This means text inside a colored container automatically picks up the parent's color.

```tsx
<Card primary filled>
  <Text>Inherits primary color from Card</Text>
</Card>
<Card success filled>
  <Text>Inherits success color</Text>
  <Text danger>Explicit danger overrides inherit</Text>
</Card>
```

```tsx demo
<Row flexWrap>
  <Card primary filled>
    <Text bold>Inherited Primary</Text>
    <Text>This text inherits primary from the Card.</Text>
  </Card>
  <Card success filled>
    <Text bold>Inherited Success</Text>
    <Text>Inherits success color automatically.</Text>
    <Text danger>Explicit danger overrides inherit.</Text>
  </Card>
</Row>
```

## Text Appearances

Text supports explicit color appearances: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`. Use these to override the default `inherit` behavior.

```tsx demo
<Col>
  <Text primary>Primary text for important content</Text>
  <Text brand>Brand text for brand-colored content</Text>
  <Text accent>Accent text for highlights</Text>
  <Text secondary>Secondary text for supporting content</Text>
  <Text tertiary>Tertiary text for muted content</Text>
  <Text success>Success text for positive feedback</Text>
  <Text danger>Danger text for errors or warnings</Text>
  <Text warning>Warning text for cautionary messages</Text>
  <Text info>Info text for informational content</Text>
  <Text link>Link-colored text for clickable content</Text>
</Col>
```

## Text Styling

Use `bold`, `semibold`, `italic`, `underline`, `uppercase` and font families: `sans`, `serif`, `mono`.

```tsx demo
<Col>
  <Text bold>Bold text for emphasis</Text>
  <Text semibold>Semibold for subtle emphasis</Text>
  <Text italic>Italic text for quotes or terms</Text>
  <Text underline>Underlined text for links</Text>
  <Text mono>Monospace for code or technical content</Text>
  <Text uppercase>Uppercase for labels</Text>
</Col>
```

## Text Alignment

Align text with `textLeft`, `textCenter`, `textRight`, `textJustify`.

```tsx demo
<div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
  <Text textLeft>Left aligned (default)</Text>
  <Text textCenter>Center aligned</Text>
  <Text textRight>Right aligned</Text>
</div>
```

## Letter Spacing

Control letter spacing with tracking props: `trackingTighter`, `trackingTight`, `trackingNormal`, `trackingWide`, `trackingWider`, `trackingWidest`.

```tsx
<Text trackingTight>Tight tracking</Text>
<Text trackingWide>Wide tracking</Text>
<Text trackingWidest>Widest tracking</Text>
```

```tsx demo
<Col>
  <Text trackingTighter>Tighter letter spacing</Text>
  <Text trackingTight>Tight letter spacing</Text>
  <Text trackingNormal>Normal letter spacing (default)</Text>
  <Text trackingWide>Wide letter spacing</Text>
  <Text trackingWider>Wider letter spacing</Text>
  <Text trackingWidest>Widest letter spacing</Text>
</Col>
```

## Text in Context

Combining text properties for real-world use cases.

```tsx demo
<Col>
  <Card>
    <Text lg bold>Product Title</Text>
    <Text secondary>Category • 4.5 ★ (128 reviews)</Text>
    <Text>High-quality component library for building modern web applications with React and TypeScript.</Text>
    <Text sm primary semibold>$99.00</Text>
  </Card>
</Col>
```
