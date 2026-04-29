---
componentKey: sectionTitle
importPath: 'import { SectionTitle } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/sectionTitle.tsx
since: 0.9.0
---

A component for rendering headings of major sections within a page. It helps to create a clear and accessible document structure.

## Basic SectionTitle

A medium heading component (renders as `<h2>`) for section headings.

```tsx demo
<SectionTitle>Getting Started</SectionTitle>
```

## SectionTitle Sizes

Section titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <SectionTitle sm>Small Section Title</SectionTitle>
  <SectionTitle>Medium Section Title (default)</SectionTitle>
  <SectionTitle lg>Large Section Title</SectionTitle>
</Col>
```

## SectionTitle Appearances

By default, SectionTitle uses the `inherit` appearance — it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger` to override.

```tsx demo
<Col>
  <SectionTitle primary>Primary Section Title</SectionTitle>
  <SectionTitle secondary>Secondary Section Title</SectionTitle>
  <SectionTitle success>Success Section Title</SectionTitle>
</Col>
```

## SectionTitle Styling

Use `bold`, `semibold`, `italic`, and font families: `sans`, `serif`, `mono`.

```tsx demo
<Col>
  <SectionTitle bold>Bold Section Title</SectionTitle>
  <SectionTitle italic>Italic Section Title</SectionTitle>
  <SectionTitle serif>Serif Font Section Title</SectionTitle>
</Col>
```

## Text Alignment

Align section titles with `textLeft`, `textCenter`, `textRight`.

```tsx demo
<div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
  <SectionTitle textLeft>Left Aligned</SectionTitle>
  <SectionTitle textCenter>Center Aligned</SectionTitle>
  <SectionTitle textRight>Right Aligned</SectionTitle>
</div>
```

## SectionTitle in Context

Section titles organize content within a page.

```tsx demo
<Card>
  <SectionTitle lg primary>Installation</SectionTitle>
  <Text>Install VaneUI using npm or yarn.</Text>
  <SectionTitle lg primary>Usage</SectionTitle>
  <Text>Import components and start building.</Text>
</Card>
```

## Section Header Pattern

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
