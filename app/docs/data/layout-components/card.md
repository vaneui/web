---
componentKey: card
importPath: 'import { Card } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/card.tsx
since: 0.9.0
---

A flexible container component that groups related content with consistent styling. Cards can contain text, images, and other components.

## When to Use

- Group related content into a visually distinct surface (article preview, settings block, summary panel).
- Establish hierarchy on a page where multiple sections need to feel like discrete units.
- Wrap clickable surfaces (link/anchor cards) where the entire block is the affordance.
- Build form sections, dashboard tiles, or pricing tables.

### When NOT to Use

- For inline groupings of a few elements — prefer `Stack` or `Row` directly without the surface treatment.
- For modal/dialog content — `Modal` already provides the surface and shadow.

## Customizing

Set app-wide Card defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Card } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  card: { border: true, shadow: true, padding: true, gap: true, rounded: true },
}}>
  <Card>Content</Card>
</ThemeProvider>
```

## Basic Card

A simple card container with default styling.

```tsx demo
<Card>
  <Title>Welcome to VaneUI</Title>
  <Text>Build beautiful interfaces with ready-to-use components.</Text>
</Card>
```

## Card Sizes

Cards come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Row flexWrap>
  <Card sm>
    <Title sm>Small Card</Title>
    <Text sm>Compact content</Text>
  </Card>
  <Card>
    <Title>Medium Card</Title>
    <Text>Default size</Text>
  </Card>
  <Card lg>
    <Title lg>Large Card</Title>
    <Text lg>More spacious</Text>
  </Card>
</Row>
```

## Card Appearances

Cards support color appearances: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`.

```tsx demo
<Row flexWrap>
  <Card primary>
    <Title>Primary</Title>
    <Text>Main action</Text>
  </Card>
  <Card brand>
    <Title>Brand</Title>
    <Text>Brand color</Text>
  </Card>
  <Card accent>
    <Title>Accent</Title>
    <Text>Highlight</Text>
  </Card>
  <Card secondary>
    <Title>Secondary</Title>
    <Text>Subtle styling</Text>
  </Card>
  <Card success>
    <Title>Success</Title>
    <Text>Positive status</Text>
  </Card>
  <Card danger>
    <Title>Danger</Title>
    <Text>Error or alert</Text>
  </Card>
</Row>
```

## Card Variants

Use `filled` for solid backgrounds. `outline` is the default. Add `shadow` for elevation.

```tsx demo
<Row flexWrap>
  <Card filled>
    <Title filled>Filled Card</Title>
    <Text filled>Solid background</Text>
  </Card>
  <Card>
    <Title>Outline Card (default)</Title>
    <Text>Border only</Text>
  </Card>
  <Card shadow>
    <Title>Shadow Card</Title>
    <Text>Elevated appearance</Text>
  </Card>
</Row>
```

## Card Shapes

Cards support different border radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Card>
    <Title>Rounded</Title>
    <Text>Default style</Text>
  </Card>
  <Card pill>
    <Title>Pill</Title>
    <Text>Fully rounded</Text>
  </Card>
  <Card sharp>
    <Title>Sharp</Title>
    <Text>No radius</Text>
  </Card>
</Row>
```

## Responsive Layout

Use `row` for horizontal layout and `mobileCol` or `tabletCol` to switch to column on smaller screens.

```tsx demo
<Card row tabletCol>
  <Col>
    <Title>Product Image</Title>
    <Text secondary>Visual content area</Text>
  </Col>
  <Col>
    <Title>Product Details</Title>
    <Text>This layout switches to column on tablets and below. Resize to see the effect.</Text>
  </Col>
</Card>
```

## Card as Link

Add `href` to make the card a clickable link. The card automatically renders as an `<a>` tag when `href` is provided, ensuring valid HTML.

```tsx demo
<Row flexWrap>
  <Card href="#services" primary filled>
    <Title primary filled>Services</Title>
    <Text primary filled>Click to navigate</Text>
  </Card>
  <Card href="#pricing" secondary filled>
    <Title secondary filled>Pricing</Title>
    <Text secondary filled>View our plans</Text>
  </Card>
  <Card href="https://github.com" target="_blank" rel="noopener noreferrer" outline>
    <Title>External Link</Title>
    <Text>Opens in new tab</Text>
  </Card>
</Row>
```
