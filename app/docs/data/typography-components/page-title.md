---
componentKey: pageTitle
importPath: 'import { PageTitle } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/pageTitle/PageTitle.tsx
since: 0.9.0
---

Renders the primary page heading (`<h1>` by default) for the top-level title of a page. Pair it with `SectionTitle` (`<h2>`) for major section headings and `Title` (`<h3>`) for subsection headings to keep the document outline aligned with the visual hierarchy.

## Basic PageTitle

A large heading component (renders as `<h1>`) for page titles. Defaults to `semibold` weight, `heading` font family, `trackingTight` letter spacing, and `inherit` appearance for a compact, impactful look.

```tsx demo
<PageTitle>Welcome to VaneUI</PageTitle>
```

## PageTitle vs SectionTitle vs Title

Three heading components for a clean semantic hierarchy. Use them together so the document outline matches the visual hierarchy.

```tsx demo
<Col>
  <PageTitle>Page Heading (h1)</PageTitle>
  <SectionTitle>Section Heading (h2)</SectionTitle>
  <Title>Subsection Heading (h3)</Title>
</Col>
```

## PageTitle sizes

Page titles come in five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <PageTitle xs>Extra Small Page Title</PageTitle>
  <PageTitle sm>Small Page Title</PageTitle>
  <PageTitle>Medium Page Title (default)</PageTitle>
  <PageTitle lg>Large Page Title</PageTitle>
  <PageTitle xl>Extra Large Page Title</PageTitle>
</Col>
```

## PageTitle appearances

By default, PageTitle uses the `inherit` appearance: it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `warning`, `danger`, `info` to override.

```tsx demo
<Col>
  <PageTitle primary>Primary Page Title</PageTitle>
  <PageTitle secondary>Secondary Page Title</PageTitle>
  <PageTitle success>Success Page Title</PageTitle>
  <PageTitle warning>Warning Page Title</PageTitle>
  <PageTitle danger>Danger Page Title</PageTitle>
  <PageTitle info>Info Page Title</PageTitle>
</Col>
```

## Font weights

PageTitle is `semibold` by default. Override with any weight prop: `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`.

```tsx demo
<Col>
  <PageTitle light>Light Page Title</PageTitle>
  <PageTitle normal>Normal Page Title</PageTitle>
  <PageTitle medium>Medium Page Title</PageTitle>
  <PageTitle>Semibold Page Title (default)</PageTitle>
  <PageTitle bold>Bold Page Title</PageTitle>
  <PageTitle black>Black Page Title</PageTitle>
</Col>
```

## Font families

Switch between `sans`, `serif`, and `mono` font families.

```tsx demo
<Col>
  <PageTitle sans>Sans-serif Page Title</PageTitle>
  <PageTitle serif>Serif Page Title</PageTitle>
  <PageTitle mono>Monospace Page Title</PageTitle>
</Col>
```

## Italic PageTitle

Use the `italic` prop for italic emphasis.

```tsx demo
<PageTitle italic>Italic Page Title</PageTitle>
```

## Text alignment

PageTitle is left-aligned by default. Use `textCenter`, `textRight`, or `textJustify` to change alignment.

```tsx demo
<Card>
  <PageTitle wFull>Left Aligned (default)</PageTitle>
  <PageTitle wFull textCenter>Center Aligned</PageTitle>
  <PageTitle wFull textRight>Right Aligned</PageTitle>
</Card>
```

## Custom HTML tag

Override the rendered tag with the `tag` prop when the visual style of PageTitle is wanted but a different semantic level is required.

```tsx demo
<Col>
  <PageTitle>Rendered as h1 (default)</PageTitle>
  <PageTitle tag="h2">Rendered as h2</PageTitle>
  <PageTitle tag="h3">Rendered as h3</PageTitle>
  <PageTitle tag="div">Rendered as div</PageTitle>
</Col>
```

## PageTitle in context

Page titles work well as the main heading of a page, paired with a subtitle.

```tsx demo
<Card>
  <PageTitle lg primary>Product Documentation</PageTitle>
  <Text secondary>Learn how to use VaneUI components in your projects.</Text>
  <Text>Get started with our comprehensive guides and examples.</Text>
</Card>
```

## Page header pattern

Combine PageTitle with Text and Divider for a complete page header.

```tsx demo
<Col>
  <PageTitle xl>Dashboard</PageTitle>
  <Text lg secondary>Welcome back. Here is an overview of your projects.</Text>
  <Divider />
  <Text>Content goes here...</Text>
</Col>
```

## Hero page header

Combine an `xl` PageTitle with a large subtitle and a call to action for a marketing-style hero.

```tsx demo
<Stack itemsCenter>
  <PageTitle xl textCenter>Build Faster with VaneUI</PageTitle>
  <Text lg secondary textCenter>A boolean-props React component library powered by Tailwind CSS v4.</Text>
  <Row>
    <Button filled>Get Started</Button>
    <Button>View on GitHub</Button>
  </Row>
</Stack>
```
