---
componentKey: container
importPath: 'import { Container } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/container.tsx
since: 0.9.0
---

Manages the main content area by centering it and applying a max-width. It ensures a consistent and readable layout across different screen sizes.

## Basic Container

A centered content wrapper with max-width constraint.

```tsx demo
<Container>
  <Title>Page Content</Title>
  <Text>Container centers content and constrains width for optimal readability.</Text>
</Container>
```

## Container Sizes

Containers come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Container sm border>
    <Text semibold>Small Container</Text>
    <Text>Narrower max-width</Text>
  </Container>
  <Container lg border>
    <Text semibold>Large Container</Text>
    <Text>Wider max-width for more content</Text>
  </Container>
</Col>
```

## Container Appearances

Containers support color appearances: `primary`, `secondary`, `success`, `danger`, etc.

```tsx demo
<Col>
  <Container primary>
    <Text semibold>Primary Container</Text>
    <Text>Highlighted content area</Text>
  </Container>
  <Container success>
    <Text semibold>Success Container</Text>
    <Text>Positive feedback area</Text>
  </Container>
</Col>
```

## Container Variants

Use `filled` for solid backgrounds. `outline` is the default. Add `shadow` for elevation.

```tsx demo
<Col>
  <Container filled primary>
    <Title filled primary>Filled Container</Title>
    <Text filled primary>Solid background with primary color</Text>
  </Container>
  <Container secondary>
    <Title secondary>Outline Container (default)</Title>
    <Text secondary>Border only styling</Text>
  </Container>
  <Container shadow>
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
  <Container pill border>
    <Text semibold>Pill shape</Text>
  </Container>
</Col>
```

## Page Layout Pattern

Nest Container inside Section for a standard page layout with centered, width-constrained content.

```tsx demo
<Section>
  <Container sm>
    <Title primary>Getting Started</Title>
    <Text>This content is centered and constrained to a small max-width for optimal readability.</Text>
  </Container>
</Section>
```
