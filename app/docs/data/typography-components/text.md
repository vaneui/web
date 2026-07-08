---
componentKey: text
importPath: 'import { Text } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/text/Text.tsx
since: 0.9.0
---

## Basic usage

Text renders paragraph text with default styling.

```tsx demo
<Text>Compose interfaces with VaneUI components. Text provides consistent typography across your application.</Text>
```

## Sizes

Text comes in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Text xs>Extra small text</Text>
  <Text sm>Small text for captions</Text>
  <Text>Medium text (default)</Text>
  <Text lg>Large text for emphasis</Text>
  <Text xl>Extra large text</Text>
</Col>
```

## Appearances

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

## Inherit appearance (default)

Text defaults to the `inherit` appearance: it picks up its color from the parent via CSS cascade instead of applying its own. Set an explicit appearance to override.

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

## Font weights

Control weight with `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`.

```tsx demo
<Col>
  <Text thin>Thin weight</Text>
  <Text light>Light weight</Text>
  <Text normal>Normal weight</Text>
  <Text medium>Medium weight</Text>
  <Text semibold>Semibold weight</Text>
  <Text bold>Bold weight</Text>
  <Text extrabold>Extra bold weight</Text>
  <Text black>Black weight</Text>
</Col>
```

## Font families

Switch font family with `sans` (default), `serif`, `mono`.

```tsx demo
<Col>
  <Text sans>Sans-serif font (default)</Text>
  <Text serif>Serif font for editorial content</Text>
  <Text mono>Monospace for code or technical content</Text>
</Col>
```

## Italic, underline, line-through

```tsx demo
<Col>
  <Text italic>Italic text for quotes or terms</Text>
  <Text underline>Underlined text for emphasis</Text>
  <Text lineThrough>Line-through for deleted content</Text>
</Col>
```

## Text transform

Use `uppercase`, `lowercase`, `capitalize`.

```tsx demo
<Col>
  <Text uppercase>Uppercase for labels</Text>
  <Text lowercase>LOWERCASE NORMALIZED</Text>
  <Text capitalize>capitalized words example</Text>
</Col>
```

## Text alignment

Align text with `textLeft` (default), `textCenter`, `textRight`, `textJustify`. Text defaults to `wFit`, so set `wFull` to see alignment effects across the container.

```tsx demo
<Col>
  <Text wFull>Left aligned (default)</Text>
  <Text wFull textCenter>Center aligned</Text>
  <Text wFull textRight>Right aligned</Text>
  <Text wFull textJustify>Justified text spreads to fill the line, distributing extra space between words across the full container width.</Text>
</Col>
```

## Truncate and line clamp

Use `truncate` for single-line ellipsis, or `lineClamp2`/`lineClamp3`/`lineClamp4`/`lineClamp5` for multi-line clamping.

```tsx demo
<Col>
  <Text wFull truncate>Truncated single line of text that will be cut off with an ellipsis when it exceeds the container width.</Text>
  <Text wFull lineClamp2>Clamped to two lines. This release note covers the new size props, the revised default appearances, and the spacing changes that now scale with the size prop across every typography component in the library.</Text>
  <Text wFull lineClamp3>Clamped to three lines. The migration guide walks through each change in detail, from the renamed appearance props to the updated default margins, and explains how to update your existing components step by step so nothing renders differently after you upgrade to the latest version.</Text>
</Col>
```

## Letter spacing

Control letter spacing with `trackingTighter`, `trackingTight`, `trackingNormal`, `trackingWide`, `trackingWider`, `trackingWidest`. Text defaults to a compact `-0.011em` tracking; `trackingNormal` resets it to `0`.

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

## Margins

Block typography (`Text`, `Title`, `SectionTitle`, `PageTitle`, `Blockquote`) accepts size-driven margin props: `margin` (all sides), `marginX`, `marginY`, `marginT`, and `marginB`. `Text` defaults to `noMargin`, so opt in where you need vertical rhythm outside a gap-based layout. The margin scales with the size prop.

```tsx demo
<Col noGap>
  <Text>No margin (default), sits flush.</Text>
  <Text marginT marginB>Margin above and below, scales with size.</Text>
  <Text>Another flush line.</Text>
</Col>
```

## Text in context

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
