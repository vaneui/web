---
componentKey: sectionTitle
importPath: 'import { SectionTitle } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/sectionTitle/SectionTitle.tsx
since: 0.9.0
---

## Basic usage

SectionTitle renders an `<h2>` heading for major section headings. It defaults to `fontSemibold` weight, `fontHeading` font family, `inheritAppearance` appearance, and left-aligned text.

```tsx demo
<SectionTitle>Getting Started</SectionTitle>
```

## Sizes

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

## Appearances

By default, SectionTitle uses the `inheritAppearance` appearance: it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `warning`, `danger`, `info` to override.

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

## Variants

Headings never paint a background, so the variant only picks which colour of the appearance the heading is painted in. `outline`, the default, uses the appearance's own colour. `filled` uses the "on this fill" colour, for a heading sitting on a filled surface of the same appearance.

```tsx demo
<Col>
  <SectionTitle info>outline info, on the page surface</SectionTitle>
  <SectionTitle danger>outline danger, on the page surface</SectionTitle>
  <Card info filled>
    <SectionTitle info filled>filled info, on a matching filled Card</SectionTitle>
  </Card>
  <Card danger filled>
    <SectionTitle danger filled>filled danger, on a matching filled Card</SectionTitle>
  </Card>
</Col>
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

## Font weights

SectionTitle is `fontSemibold` by default. Override with any weight prop: `fontThin`, `fontExtralight`, `fontLight`, `fontNormal`, `fontMedium`, `fontSemibold`, `fontBold`, `fontExtrabold`, `fontBlack`.

```tsx demo
<Col>
  <SectionTitle fontLight>Light Section Title</SectionTitle>
  <SectionTitle fontNormal>Normal Section Title</SectionTitle>
  <SectionTitle fontMedium>Medium Section Title</SectionTitle>
  <SectionTitle>Semibold Section Title (default)</SectionTitle>
  <SectionTitle fontBold>Bold Section Title</SectionTitle>
  <SectionTitle fontBlack>Black Section Title</SectionTitle>
</Col>
```

## Font families

Switch between `fontSans`, `fontSerif`, and `fontMono` font families.

```tsx demo
<Col>
  <SectionTitle fontSans>Sans-serif Section Title</SectionTitle>
  <SectionTitle fontSerif>Serif Section Title</SectionTitle>
  <SectionTitle fontMono>Monospace Section Title</SectionTitle>
</Col>
```

## Italic

Use the `italic` prop for italic emphasis.

```tsx demo
<SectionTitle italic>Italic Section Title</SectionTitle>
```

## Uppercase

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
