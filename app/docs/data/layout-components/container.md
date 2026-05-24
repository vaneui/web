---
componentKey: container
importPath: 'import { Container } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/container/Container.tsx
since: 0.9.0
---

Manages the main content area by centering it and applying a max-width. It ensures a consistent and readable layout across different screen sizes.

## Basic Container

A centered, full-width wrapper that caps content at a readable max-width. `md`, `wFull`, `flex`, `column`, `itemsCenter`, `gap`, `noPadding`, `outline`, and `sharp` are defaults.

```tsx demo
<Container border>
  <Title>Page Content</Title>
  <Text>Container centers content and constrains width for optimal readability.</Text>
</Container>
```

## Container Sizes

Sizes (`xs`, `sm`, `md` default, `lg`, `xl`) control the max-width: `max-w-3xl` through `max-w-7xl`. Resize the viewport to see narrower containers stop growing before wider ones do.

```tsx demo
<Col>
  <Container xs border>
    <Text semibold>xs — max-w-3xl</Text>
  </Container>
  <Container sm border>
    <Text semibold>sm — max-w-4xl</Text>
  </Container>
  <Container border>
    <Text semibold>md (default) — max-w-5xl</Text>
  </Container>
  <Container lg border>
    <Text semibold>lg — max-w-6xl</Text>
  </Container>
  <Container xl border>
    <Text semibold>xl — max-w-7xl</Text>
  </Container>
</Col>
```

## Container Padding

Container defaults to `noPadding` — the parent Section usually owns vertical rhythm. Pass `padding` to opt in to size-driven internal padding.

```tsx demo
<Col>
  <Container border>
    <Text semibold>noPadding (default)</Text>
    <Text>Edges sit flush with the container box.</Text>
  </Container>
  <Container padding border>
    <Text semibold>padding</Text>
    <Text>Internal padding scales with the size prop.</Text>
  </Container>
</Col>
```

## Container Appearances

Containers support color appearances: `primary`, `secondary`, `success`, `danger`, etc.

```tsx demo
<Col>
  <Container primary border>
    <Text semibold>Primary Container</Text>
    <Text>Highlighted content area</Text>
  </Container>
  <Container success border>
    <Text semibold>Success Container</Text>
    <Text>Positive feedback area</Text>
  </Container>
</Col>
```

## Container Variants

Use `filled` for solid backgrounds. `outline` is the default. Add `shadow` for elevation.

```tsx demo
<Col>
  <Container filled primary padding>
    <Title filled primary>Filled Container</Title>
    <Text filled primary>Solid background with primary color</Text>
  </Container>
  <Container secondary border padding>
    <Title secondary>Outline Container (default)</Title>
    <Text secondary>Border only styling</Text>
  </Container>
  <Container shadow padding>
    <Title>Shadow Container</Title>
    <Text>Elevated with drop shadow</Text>
  </Container>
</Col>
```

## Container Shapes

Containers support different border radius styles. `sharp` is the default (no radius).

```tsx demo
<Col>
  <Container border>
    <Text semibold>Sharp (default)</Text>
  </Container>
  <Container rounded border>
    <Text semibold>Rounded corners</Text>
  </Container>
  <Container pill border padding>
    <Text semibold>Pill shape</Text>
  </Container>
</Col>
```

## Responsive Breakpoints

Container is a flex column by default. Use `row` to flow horizontally on desktop and `mobileCol` / `tabletCol` to stack on smaller screens.

```tsx demo
<Container row tabletCol border padding>
  <Col>
    <Title>Left Content</Title>
    <Text>Switches to stacked layout on tablets and below.</Text>
  </Col>
  <Col>
    <Title>Right Content</Title>
    <Text>Resize your browser to see the responsive behavior.</Text>
  </Col>
</Container>
```

## Page Layout Pattern

The canonical page layout: a Section owns vertical padding and full-width background, the Container nested inside caps reading width and centers the content.

```tsx demo
<Section secondary>
  <Container>
    <PageTitle>Getting Started</PageTitle>
    <Text>The Section handles the full-bleed background and outer padding. The Container constrains the inner content to a comfortable reading width.</Text>
  </Container>
</Section>
```
