---
componentKey: section
importPath: 'import { Section } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/section/Section.tsx
since: 0.9.0
---

Sections own the outer padding and background; nest a `Container` inside to cap the inner reading width.

## Basic usage

`md`, `wFull`, `flex`, `column`, `itemsStart`, `gap`, `padding`, `outline`, `sharp`, and `responsive` are defaults. Padding and gap automatically scale at tablet and mobile breakpoints because `responsive` is on.

```tsx demo
<Section border>
  <Title>Welcome Section</Title>
  <Text>Sections provide consistent vertical rhythm and full-width backgrounds.</Text>
</Section>
```

## Sizes

Sizes (`xs`, `sm`, `md` default, `lg`, `xl`) control padding and gap.

```tsx demo
<Col>
  <Section sm border>
    <Text semibold>Small Section</Text>
    <Text>Compact padding</Text>
  </Section>
  <Section border>
    <Text semibold>Medium Section (default)</Text>
    <Text>Standard padding</Text>
  </Section>
  <Section lg border>
    <Text semibold>Large Section</Text>
    <Text>Generous padding</Text>
  </Section>
</Col>
```

## Appearances

Sections support color appearances: `primary`, `secondary`, `success`, `danger`, etc. Use `secondary` filled bands to create visual rhythm between regular sections.

```tsx demo
<Col>
  <Section secondary filled>
    <Text semibold>Secondary band</Text>
    <Text>Subtle background to break up a long page.</Text>
  </Section>
  <Section primary>
    <Text semibold>Primary Section</Text>
    <Text>Highlighted content area</Text>
  </Section>
  <Section success>
    <Text semibold>Success Section</Text>
    <Text>Positive feedback area</Text>
  </Section>
  <Section danger>
    <Text semibold>Danger Section</Text>
    <Text>Warning or error area</Text>
  </Section>
</Col>
```

## Variants

Use `filled` for solid backgrounds (`outline` is the default), and `shadow` for elevation.

```tsx demo
<Col>
  <Section filled primary>
    <Title filled primary>Filled Section</Title>
    <Text filled primary>Solid background with primary color</Text>
  </Section>
  <Section secondary border>
    <Title secondary>Outline Section (default)</Title>
    <Text secondary>Border-only styling</Text>
  </Section>
  <Section shadow>
    <Title>Shadow Section</Title>
    <Text>Elevated with drop shadow</Text>
  </Section>
</Col>
```

## Layout

Use `row` for horizontal layout. `gap` is already on by default; pair with `noPadding` only when a wrapper owns spacing.

```tsx demo
<Col>
  <Section row border>
    <Text semibold>Row Layout</Text>
    <Text>Content flows horizontally</Text>
    <Text>With gap between items</Text>
  </Section>
  <Section border>
    <Text semibold>Column Layout (default)</Text>
    <Text>Content flows vertically</Text>
    <Text>With gap between items</Text>
  </Section>
</Col>
```

## Responsive breakpoints

Use `mobileCol` or `tabletCol` to switch from row to column layout on smaller screens.

```tsx demo
<Section row tabletCol border>
  <Col>
    <Title>Left Content</Title>
    <Text>Switches to stacked layout on tablets and below.</Text>
  </Col>
  <Col>
    <Title>Right Content</Title>
    <Text>Resize your browser to see the responsive behavior.</Text>
  </Col>
</Section>
```

## Responsive sizing

`responsive` (default) scales padding and gap at tablet and mobile breakpoints using `--py-tablet`, `--gap-mobile`, etc. Pass `responsive={false}` to lock a single size across all viewports.

```tsx demo
<Col>
  <Section lg border>
    <Text semibold>responsive (default)</Text>
    <Text>Padding shrinks at tablet and mobile.</Text>
  </Section>
  <Section lg responsive={false} border>
    <Text semibold>responsive=&#123;false&#125;</Text>
    <Text>Padding stays fixed at the lg size on every viewport.</Text>
  </Section>
</Col>
```

## Semantic tag

Section renders as `<div>` by default. Pass `tag="section"` for a semantic `<section>` element, or `tag="header"` / `tag="footer"` / `tag="aside"` for other landmarks.

```tsx demo
<Col>
  <Section tag="section" border>
    <Title>Semantic section</Title>
    <Text>Renders as &lt;section&gt; in the DOM.</Text>
  </Section>
  <Section tag="header" secondary filled>
    <Title>Page header</Title>
    <Text>Renders as &lt;header&gt;.</Text>
  </Section>
</Col>
```

## Page layout pattern

The canonical full-bleed page band: a Section owns the outer padding and background, with a nested `Container` capping the inner reading width.

```tsx demo
<Section secondary filled>
  <Container>
    <PageTitle>Getting Started</PageTitle>
    <Text>The Section handles the full-bleed background and outer padding. The Container constrains the inner content to a comfortable reading width.</Text>
  </Container>
</Section>
```
