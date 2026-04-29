---
componentKey: pageTitle
importPath: 'import { PageTitle } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/pageTitle.tsx
since: 0.9.0
---

A specialized component for the primary heading of a page. It ensures consistent styling for top-level titles across your application.

## Basic PageTitle

A large heading component (renders as `<h1>`) for page titles. Defaults to `semibold` weight and `trackingTight` letter spacing for a compact, impactful look.

```tsx demo
<PageTitle>Welcome to VaneUI</PageTitle>
```

## PageTitle Sizes

Page titles come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <PageTitle sm>Small Page Title</PageTitle>
  <PageTitle>Medium Page Title (default)</PageTitle>
  <PageTitle lg>Large Page Title</PageTitle>
</Col>
```

## PageTitle Appearances

By default, PageTitle uses the `inherit` appearance — it inherits color from its parent. Use explicit appearances like `primary`, `secondary`, `success`, `danger` to override.

```tsx demo
<Col>
  <PageTitle primary>Primary Page Title</PageTitle>
  <PageTitle secondary>Secondary Page Title</PageTitle>
  <PageTitle success>Success Page Title</PageTitle>
</Col>
```

## PageTitle Styling

Use `bold`, `semibold`, `italic`, and font families: `sans`, `serif`, `mono`.

```tsx demo
<Col>
  <PageTitle bold>Bold Page Title</PageTitle>
  <PageTitle italic>Italic Page Title</PageTitle>
  <PageTitle serif>Serif Font Page Title</PageTitle>
</Col>
```

## Text Alignment

Align page titles with `textLeft`, `textCenter`, `textRight`.

```tsx demo
<div className="space-y-2 border-2 border-dashed border-gray-300 p-4">
  <PageTitle textLeft>Left Aligned</PageTitle>
  <PageTitle textCenter>Center Aligned</PageTitle>
  <PageTitle textRight>Right Aligned</PageTitle>
</div>
```

## PageTitle in Context

Page titles work well as the main heading of a page, paired with a subtitle.

```tsx demo
<Card>
  <PageTitle lg primary>Product Documentation</PageTitle>
  <Text secondary>Learn how to use VaneUI components in your projects.</Text>
  <Text>Get started with our comprehensive guides and examples.</Text>
</Card>
```

## Page Header Pattern

Combine PageTitle with Text and Divider for a complete page header.

```tsx demo
<Col>
  <PageTitle xl>Dashboard</PageTitle>
  <Text lg secondary>Welcome back. Here is an overview of your projects.</Text>
  <Divider />
  <Text>Content goes here...</Text>
</Col>
```
