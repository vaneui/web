---
componentKey: sectionTitle
importPath: 'import { SectionTitle } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/sectionTitle/SectionTitle.tsx
since: 0.9.0
---

Renders a section heading (`<h2>` by default) to mark the major divisions of a page. Pair it with `PageTitle` (`<h1>`) for the page heading and `Title` (`<h3>`) for subsection headings to keep the document outline aligned with the visual hierarchy.

## Basic SectionTitle

A heading component (renders as `<h2>`) for major section headings. Defaults to `semibold` weight, `heading` font family, `inherit` appearance, and left-aligned text.

```tsx demo
<SectionTitle>Getting Started</SectionTitle>
```

## PageTitle vs SectionTitle vs Title

Three heading components for a clean semantic hierarchy.

```tsx demo
<Col>
  <PageTitle>Page Heading (h1)</PageTitle>
  <SectionTitle>Section Heading (h2)</SectionTitle>
  <Title>Subsection Heading (h3)</Title>
</Col>
```

## SectionTitle sizes

Section titles come in five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <SectionTitle xs>Extra Small Section Title</SectionTitle>
  <SectionTitle sm>Small Section Title</SectionTitle>
  <SectionTitle>Medium Section Title (default)</SectionTitle>
  <SectionTitle lg>Large Section Title</SectionTitle>
  <SectionTitle xl>Extra Large Section Title</SectionTitle>
</Col>
```

## SectionTitle appearances

By default, SectionTitle uses the `inherit` appearance: it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `warning`, `danger`, `info` to override.

```tsx demo
<Col>
  <SectionTitle primary>Primary Section Title</SectionTitle>
  <SectionTitle secondary>Secondary Section Title</SectionTitle>
  <SectionTitle success>Success Section Title</SectionTitle>
  <SectionTitle warning>Warning Section Title</SectionTitle>
  <SectionTitle danger>Danger Section Title</SectionTitle>
  <SectionTitle info>Info Section Title</SectionTitle>
</Col>
```

## Font weights

SectionTitle is `semibold` by default. Override with any weight prop: `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`.

```tsx demo
<Col>
  <SectionTitle light>Light Section Title</SectionTitle>
  <SectionTitle normal>Normal Section Title</SectionTitle>
  <SectionTitle medium>Medium Section Title</SectionTitle>
  <SectionTitle>Semibold Section Title (default)</SectionTitle>
  <SectionTitle bold>Bold Section Title</SectionTitle>
  <SectionTitle black>Black Section Title</SectionTitle>
</Col>
```

## Font families

Switch between `sans`, `serif`, and `mono` font families.

```tsx demo
<Col>
  <SectionTitle sans>Sans-serif Section Title</SectionTitle>
  <SectionTitle serif>Serif Section Title</SectionTitle>
  <SectionTitle mono>Monospace Section Title</SectionTitle>
</Col>
```

## Italic SectionTitle

Use the `italic` prop for italic emphasis.

```tsx demo
<SectionTitle italic>Italic Section Title</SectionTitle>
```

## Uppercase SectionTitle

Use the `uppercase` prop to render the title in all caps.

```tsx demo
<SectionTitle uppercase>Uppercase Section Title</SectionTitle>
```

## Text alignment

SectionTitle is left-aligned by default. Use `textCenter`, `textRight`, or `textJustify` to change alignment.

```tsx demo
<Col>
  <SectionTitle>Left Aligned (default)</SectionTitle>
  <SectionTitle textCenter>Center Aligned</SectionTitle>
  <SectionTitle textRight>Right Aligned</SectionTitle>
</Col>
```

## Custom HTML tag

Override the rendered tag with the `tag` prop when the visual style of SectionTitle is wanted but a different semantic level is required.

```tsx demo
<Col>
  <SectionTitle tag="h1">Rendered as h1</SectionTitle>
  <SectionTitle>Rendered as h2 (default)</SectionTitle>
  <SectionTitle tag="h3">Rendered as h3</SectionTitle>
  <SectionTitle tag="h4">Rendered as h4</SectionTitle>
</Col>
```

## SectionTitle in a Section

`SectionTitle` is designed to head a `<Section>`. Use them together so the visual structure matches the semantic outline.

```tsx demo
<Col>
  <Section>
    <SectionTitle>Installation</SectionTitle>
    <Text>Install VaneUI using npm or yarn.</Text>
  </Section>
  <Section>
    <SectionTitle>Usage</SectionTitle>
    <Text>Import components and start building.</Text>
  </Section>
</Col>
```

## SectionTitle in context

Section titles work well with other typography components in cards.

```tsx demo
<Card>
  <SectionTitle lg primary>Product Features</SectionTitle>
  <Text secondary>Everything you need to build modern applications.</Text>
  <SectionTitle sm>Performance</SectionTitle>
  <Text>Optimized for speed and efficiency.</Text>
  <SectionTitle sm>Accessibility</SectionTitle>
  <Text>Built with ARIA best practices.</Text>
</Card>
```

## Section header pattern

Combine SectionTitle with Divider and content for a structured section.

```tsx demo
<Col>
  <SectionTitle primary>Getting Started</SectionTitle>
  <Divider />
  <Text>Follow the steps below to set up your project.</Text>
  <SectionTitle primary>Configuration</SectionTitle>
  <Divider />
  <Text>Customize the settings to match your requirements.</Text>
</Col>
```
