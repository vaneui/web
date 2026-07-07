---
componentKey: card
importPath: 'import { Card } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/card/Card.tsx
since: 0.9.0
---

## Basic usage

A card container with default styling. `md`, `primary`, `outline`, `rounded`, `border`, `padding`, `gap`, `flex`, and `column` are all defaults: no need to specify them.

```tsx demo
<Card>
  <Title>Welcome to VaneUI</Title>
  <Text>Compose interfaces with ready-to-use components.</Text>
</Card>
```

## Sizes

Cards come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Size also scales padding, gap, and border-radius.

```tsx demo
<Row flexWrap itemsStart>
  <Card xs>
    <Title xs>Extra Small</Title>
    <Text xs>Tight content</Text>
  </Card>
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
  <Card xl>
    <Title xl>Extra Large</Title>
    <Text xl>Maximum room</Text>
  </Card>
</Row>
```

## Appearances

Cards support color appearances: `primary` (default), `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`, `link`.

```tsx demo
<Row flexWrap>
  <Card>
    <Title>Primary</Title>
    <Text>Default</Text>
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
  <Card tertiary>
    <Title>Tertiary</Title>
    <Text>Quiet emphasis</Text>
  </Card>
  <Card success>
    <Title>Success</Title>
    <Text>Positive status</Text>
  </Card>
  <Card danger>
    <Title>Danger</Title>
    <Text>Error or alert</Text>
  </Card>
  <Card warning>
    <Title>Warning</Title>
    <Text>Caution</Text>
  </Card>
  <Card info>
    <Title>Info</Title>
    <Text>Informational</Text>
  </Card>
</Row>
```

## Variants

`outline` is the default. Use `filled` for solid backgrounds. Add `shadow` for elevation.

```tsx demo
<Row flexWrap>
  <Card>
    <Title>Outline</Title>
    <Text>Default: border only</Text>
  </Card>
  <Card filled>
    <Title filled>Filled</Title>
    <Text filled>Solid background</Text>
  </Card>
  <Card shadow>
    <Title>Shadow</Title>
    <Text>Elevated appearance</Text>
  </Card>
</Row>
```

## Shapes

`rounded` is the default. Use `pill` for fully rounded corners or `sharp` for none.

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

## Card with sub-components

Use `CardHeader`, `CardBody`, and `CardFooter` to give a card explicit structural regions. When any sub-component is present the parent Card switches to compound mode and the sub-components own padding.

```tsx demo
<Card>
  <CardHeader>
    <Title>Settings</Title>
    <Badge success filled>Active</Badge>
  </CardHeader>
  <CardBody>
    <Text>Configure your preferences below. The body grows to fill available space.</Text>
  </CardBody>
  <CardFooter>
    <Button secondary>Cancel</Button>
    <Button filled>Save</Button>
  </CardFooter>
</Card>
```

## Responsive layout

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

## Nested cards

Cards can be nested. Pair a `secondary` or `tertiary` inner card with the default `primary` outer card to create clear visual hierarchy.

```tsx demo
<Card>
  <Title>Account</Title>
  <Text>Manage the resources tied to your workspace.</Text>
  <Card secondary>
    <Title sm>Storage</Title>
    <Text sm>4.2GB of 10GB used</Text>
  </Card>
  <Card secondary>
    <Title sm>Members</Title>
    <Text sm>3 active collaborators</Text>
  </Card>
</Card>
```

## As Link

Add `href` to make the card a clickable link. The card automatically renders as an `<a>` tag when `href` is provided, ensuring valid HTML. When `href` is set, the card gains a keyboard focus-visible outline by default. Opt out with `noFocusVisible`.

```tsx demo
<Row flexWrap>
  <Card href="#services" filled>
    <Title filled>Services</Title>
    <Text filled>Click to navigate</Text>
  </Card>
  <Card href="#pricing" secondary filled>
    <Title secondary filled>Pricing</Title>
    <Text secondary filled>View our plans</Text>
  </Card>
  <Card href="https://github.com" target="_blank" rel="noopener noreferrer">
    <Title>External Link</Title>
    <Text>Opens in new tab</Text>
  </Card>
</Row>
```

## Next.js Link integration

Use the `tag` prop to render the card as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Card, Title, Text } from '@vaneui/ui';

<Card href="/docs" tag={Link}>
  <Title>Documentation</Title>
  <Text>Browse component guides and API reference.</Text>
</Card>
```

## Customizing

Set app-wide Card defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Card } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  card: { main: { shadow: true } },
}}>
  <Card>Content</Card>
</ThemeProvider>
```
