---
componentKey: title
importPath: 'import { Title } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/title/Title.tsx
since: 0.9.0
---

## Basic usage

Title renders an `<h3>` heading for subsection headings. It defaults to `semibold` weight, `heading` font family, and left-aligned text.

```tsx demo
<Title>Subsection Heading</Title>
```

## Sizes

Titles come in five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Title xs>Extra Small Title</Title>
  <Title sm>Small Title</Title>
  <Title>Medium Title (default)</Title>
  <Title lg>Large Title</Title>
  <Title xl>Extra Large Title</Title>
</Col>
```

## Appearances

By default, Title uses the `inherit` appearance: it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger`, `warning`, `info` to override.

```tsx demo
<Col>
  <Title primary>Primary Title</Title>
  <Title secondary>Secondary Title</Title>
  <Title success>Success Title</Title>
  <Title warning>Warning Title</Title>
  <Title danger>Danger Title</Title>
  <Title info>Info Title</Title>
</Col>
```

## Title vs PageTitle vs SectionTitle

Three heading components for a clean semantic hierarchy. Use them together so the document outline matches the visual hierarchy.

```tsx demo
<Col>
  <PageTitle>Page Heading (h1)</PageTitle>
  <SectionTitle>Section Heading (h2)</SectionTitle>
  <Title>Subsection Heading (h3)</Title>
</Col>
```

## Font weights

Title is `semibold` by default. Override with any weight prop: `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`.

```tsx demo
<Col>
  <Title light>Light Title</Title>
  <Title normal>Normal Title</Title>
  <Title medium>Medium Title</Title>
  <Title>Semibold Title (default)</Title>
  <Title bold>Bold Title</Title>
  <Title black>Black Title</Title>
</Col>
```

## Font families

Switch between `sans`, `serif`, and `mono` font families.

```tsx demo
<Col>
  <Title sans>Sans-serif Title</Title>
  <Title serif>Serif Title</Title>
  <Title mono>Monospace Title</Title>
</Col>
```

## Italic

Use the `italic` prop for italic emphasis.

```tsx demo
<Title italic>Italic Title</Title>
```

## Uppercase

Use the `uppercase` prop to render the title in all caps.

```tsx demo
<Title uppercase>Uppercase Title</Title>
```

## Text alignment

Title is left-aligned by default. Use `textCenter`, `textRight`, or `textJustify` to change alignment.

```tsx demo
<Card>
  <Title wFull>Left Aligned (default)</Title>
  <Title wFull textCenter>Center Aligned</Title>
  <Title wFull textRight>Right Aligned</Title>
</Card>
```

## Custom HTML tag

Override the rendered tag with the `tag` prop when the visual style of Title is wanted but a different semantic level is required.

```tsx demo
<Col>
  <Title tag="h1">Rendered as h1</Title>
  <Title tag="h2">Rendered as h2</Title>
  <Title>Rendered as h3 (default)</Title>
  <Title tag="h4">Rendered as h4</Title>
</Col>
```

## Title with Badge context

Titles pair naturally with badges, chips, and other inline components.

```tsx demo
<Col>
  <Row>
    <Title>Release Notes</Title>
    <Badge sm success>New</Badge>
  </Row>
  <Row>
    <Title>Deprecated API</Title>
    <Badge sm danger>Removed</Badge>
  </Row>
</Col>
```

## Title in context

Titles work well with other typography components in cards and sections.

```tsx demo
<Card>
  <Title lg primary bold>Product Features</Title>
  <Text secondary>Everything you need to build modern applications.</Text>
  <Title sm>Performance</Title>
  <Text>Optimized for speed and efficiency.</Text>
  <Title sm>Accessibility</Title>
  <Text>Built with ARIA best practices.</Text>
</Card>
```
