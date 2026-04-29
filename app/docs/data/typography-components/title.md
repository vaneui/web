---
componentKey: title
importPath: 'import { Title } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/title.tsx
since: 0.9.0
---

Renders a heading to establish a semantic hierarchy on the page. Use this component for the main titles of pages or sections.

## Basic Title

A heading component (renders as `<h3>`) for section headings.

```tsx demo
<Title>Section Title</Title>
```

## Title Sizes

Titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Title sm>Small Title</Title>
  <Title>Medium Title (default)</Title>
  <Title lg>Large Title</Title>
  <Title xl>Extra Large Title</Title>
</Col>
```

## Title Appearances

By default, Title uses the `inherit` appearance — it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger` to override.

```tsx demo
<Col>
  <Title primary>Primary Title</Title>
  <Title secondary>Secondary Title</Title>
  <Title success>Success Title</Title>
  <Title danger>Danger Title</Title>
</Col>
```

## Title Styling

Use `bold`, `semibold`, `italic`, `underline`, and font families: `sans`, `serif`, `mono`.

```tsx demo
<Col>
  <Title bold>Bold Title</Title>
  <Title italic>Italic Title</Title>
  <Title serif>Serif Font Title</Title>
  <Title mono>Monospace Title</Title>
</Col>
```

## Title Alignment

Align titles with `textLeft`, `textCenter`, `textRight`.

```tsx demo
<div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
  <Title textLeft>Left Aligned</Title>
  <Title textCenter>Center Aligned</Title>
  <Title textRight>Right Aligned</Title>
</div>
```

## Title with Badge Context

Titles pair naturally with badges, chips, and other inline components.

```tsx demo
<Col>
  <Row itemsCenter>
    <Title>Release Notes</Title>
    <Badge sm success>New</Badge>
  </Row>
  <Row itemsCenter>
    <Title>Deprecated API</Title>
    <Badge sm danger>Removed</Badge>
  </Row>
</Col>
```

## Title in Context

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
