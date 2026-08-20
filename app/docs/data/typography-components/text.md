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

Text supports explicit color appearances: `primary`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`. Use these to override the default `inheritAppearance` behavior.

```tsx demo
<Col>
  <Text primary>Primary text for important content</Text>
  <Text accent>Accent text for highlights</Text>
  <Text secondary>Secondary text for supporting content</Text>
  <Text tertiary>Tertiary text for muted content</Text>
  <Text success>Success text for positive feedback</Text>
  <Text danger>Danger text for errors or warnings</Text>
  <Text warning>Warning text for cautionary messages</Text>
  <Text info>Info text for informational content</Text>
</Col>
```

## Variants

Text never paints a background, so the variant does one thing here: it picks which colour of the appearance the text is painted in. `outline`, the default, uses the appearance's own colour, for text on a plain surface. `filled` uses the "on this fill" colour, for text sitting on a filled surface of the same appearance.

```tsx demo
<Col>
  <Text info>outline info, on the page surface</Text>
  <Text danger>outline danger, on the page surface</Text>
  <Card info filled>
    <Text info filled>filled info, on a matching filled Card</Text>
  </Card>
  <Card danger filled>
    <Text danger filled>filled danger, on a matching filled Card</Text>
  </Card>
</Col>
```

Use `filled` on a plain page and the text takes the colour meant to sit on the fill, which is close to the page itself. Wrap it in a matching surface, or leave the default `inheritAppearance` on and let it take the colour from whatever it sits in.

## Inherit appearance (default)

Text defaults to the `inheritAppearance` appearance: it picks up its color from the parent via CSS cascade instead of applying its own. Set an explicit appearance to override.

```tsx demo
<Row flexWrap itemsStretch>
  <Card primary filled>
    <Text fontBold>Inherited Primary</Text>
    <Text>This text inherits primary from the Card.</Text>
  </Card>
  <Card success filled>
    <Text fontBold>Inherited Success</Text>
    <Text>Inherits success color automatically.</Text>
  </Card>
  <Card border secondary>
    <Text fontBold>On a plain surface</Text>
    <Text>Inherits the Card's own colour.</Text>
    <Text danger>Explicit danger overrides inherit.</Text>
  </Card>
</Row>
```

An explicit appearance stops inheriting, so it has to read on the surface it lands on. Inside a filled Card, `<Text danger>` resolves to the outline danger colour, which is close in weight to the filled surface behind it.

## Font weights

Control weight with `fontThin`, `fontExtralight`, `fontLight`, `fontNormal`, `fontMedium`, `fontSemibold`, `fontBold`, `fontExtrabold`, `fontBlack`.

```tsx demo
<Col>
  <Text fontThin>Thin weight</Text>
  <Text fontLight>Light weight</Text>
  <Text fontNormal>Normal weight</Text>
  <Text fontMedium>Medium weight</Text>
  <Text fontSemibold>Semibold weight</Text>
  <Text fontBold>Bold weight</Text>
  <Text fontExtrabold>Extra bold weight</Text>
  <Text fontBlack>Black weight</Text>
</Col>
```

## Font families

Switch font family with `fontSans` (default), `fontSerif`, `fontMono`.

```tsx demo
<Col>
  <Text fontSans>Sans-serif font (default)</Text>
  <Text fontSerif>Serif font for editorial content</Text>
  <Text fontMono>Monospace for code or technical content</Text>
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

## Word break

Control how long unbreakable strings behave when they would overflow the container. `breakWords` wraps a long word onto the next line (`overflow-wrap: break-word`), `breakAll` breaks between any two characters, `breakKeep` prevents breaks in CJK text, and `breakNormal` resets to the default. This is the opposite of `truncate`: instead of hiding the overflow, the text wraps to fit.

```tsx demo
<Col>
  <Text className="w-48 border border-gray-300 p-2">
    Default: https://vaneui.com/docs/typography-components/text overflows.
  </Text>
  <Text breakWords className="w-48 border border-gray-300 p-2">
    breakWords: https://vaneui.com/docs/typography-components/text wraps.
  </Text>
  <Text breakAll className="w-48 border border-gray-300 p-2">
    breakAll: https://vaneui.com/docs/typography-components/text wraps.
  </Text>
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

Block typography (`Text`, `Title`, `SectionTitle`, `PageTitle`, `Blockquote`) accepts size-driven margin props: `margin` (all sides), `marginX`, `marginY`, `marginT`, and `marginB`. `Text` defaults to `noMargin`, so opt in where you need vertical rhythm outside a gap-based layout. The margin scales with the size prop. Side props compose: `marginT marginB` applies both. `noMargin` resets and wins.

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
    <Text lg fontBold>Product Title</Text>
    <Text secondary>Category • 4.5 ★ (128 reviews)</Text>
    <Text>High-quality component library for building modern web applications with React and TypeScript.</Text>
    <Text sm primary fontSemibold>$99.00</Text>
  </Card>
</Col>
```
