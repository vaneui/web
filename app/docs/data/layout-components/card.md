---
componentKey: card
importPath: 'import { Card } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/card/Card.tsx
since: 0.9.0
---

Use a Card for one self-contained unit of content, such as a product, a profile or a group of settings, that should read as its own panel. A set of cards usually goes in a [Grid](/docs/layout-components/grid), so each card gets the same column width. When the content needs padding and spacing but no border, use [Stack](/docs/layout-components/stack); for a full-width band with its own background, use [Section](/docs/layout-components/section).

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

### Type sizes inside a Card

A card reads one step smaller than the page. A `Title` placed in the Card, in one of its parts or in a `Col`, `Stack` or `Row` there runs 14, 16, 18, 20 and 24px from `xs` to `xl`, 18px by default, at every screen width. An unsized `Text`, `List` or `Blockquote` there is 14px, the size of `<Text sm>`. One with `xs`, `sm`, `lg` or `xl` keeps its size, so give a figure that should stand out a larger size (`<Title xl>` for a 24px stat). Text placed straight in the Card, without a `Text`, keeps the page size. Before `@vaneui/ui` 1.8.3 a Title in a Card was 24px and a Text 16px, the sizes of page headings and page copy.

| Element in a Card | `xs` | `sm` | `md` (default) | `lg` | `xl` |
|---|---|---|---|---|---|
| `Title` | 14px | 16px | 18px | 20px | 24px |
| `Text`, `List`, `Blockquote` | 12px | 14px | 14px | 18px | 20px |

## Appearances

Cards support color appearances: `primary` (default), `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`.

```tsx demo
<Row flexWrap>
  <Card>
    <Title>Primary</Title>
    <Text>Default</Text>
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

## Strong border for a selected card

`strongBorder` paints the border in the appearance's strong color, the one its focus ring uses, instead of the soft border tint. Use it to mark a selected option or a highlighted plan in a set of cards. A `filled` Card, whose border is otherwise transparent, shows the strong border too.

```tsx demo
<Grid2>
  <Card>
    <Title>Starter</Title>
    <Text secondary>Default border</Text>
  </Card>
  <Card strongBorder>
    <Title>Team</Title>
    <Text secondary>strongBorder</Text>
  </Card>
  <Card accent strongBorder>
    <Title>Business</Title>
    <Text secondary>accent strongBorder</Text>
  </Card>
  <Card info filled strongBorder>
    <Title filled>Enterprise</Title>
    <Text filled>info filled strongBorder</Text>
  </Card>
</Grid2>
```

`strongBorder` changes the color only, so it shows wherever the component already draws a border. The same prop works on `Row`, `Col`, `Stack`, `Grid2` to `Grid6`, `Container` and `Section`, which draw no border until you add `border` or a side prop such as `borderB`. It needs `@vaneui/ui` 1.4.5 or later.

## Shadow sizes

`shadow` follows the card's size, so an `lg` Card casts a larger shadow than an `sm` one. `shadowXs`, `shadowSm`, `shadowMd`, `shadowLg` and `shadowXl` fix the shadow size whatever the card's size. Card uses the deeper layout shadow ramp; UI components such as Button take the same props on their compact ramp.

```tsx demo
<Row flexWrap>
  <Card sm shadowXs><Text sm>shadowXs</Text></Card>
  <Card sm shadowSm><Text sm>shadowSm</Text></Card>
  <Card sm shadowMd><Text sm>shadowMd</Text></Card>
  <Card sm shadowLg><Text sm>shadowLg</Text></Card>
  <Card sm shadowXl><Text sm>shadowXl</Text></Card>
</Row>
```

The shadow props share one category with `shadow` and `noShadow`, so set one of them at a time. The fixed sizes need `@vaneui/ui` 1.4.5 or later.

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

Use `CardHeader`, `CardBody`, and `CardFooter` to give a card explicit structural regions. When any sub-component is present the parent Card switches to compound mode and the sub-components own padding. The parts meet one inset apart: the body keeps its padding, the header drops its bottom padding, the footer drops its top padding, and the Card puts no gap between them. For a divider, add `borderB` to the header or `borderT` to the footer. A part with a line, and a `filled` part, keeps its padding on that side.

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

A part counts when it renders as the Card's direct child: written in the Card's JSX, inside a fragment, behind `memo()`, returned by your own component or rendered from a Server Component. A part nested inside another element does not count, and the Card keeps its own padding. An explicit `padding`, `paddingX` or `paddingY` on the Card keeps its inset next to the parts. Before `@vaneui/ui` 1.6.0, only a part written directly in the Card's JSX switched the Card to compound mode.

## Responsive layout

Use `row` for horizontal layout and `mobileStack` or `tabletStack` to switch to column on smaller screens.

```tsx demo
<Card row tabletStack>
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

Add `href` to make the card a clickable link. The card automatically renders as an `<a>` tag when `href` is provided, ensuring valid HTML. When `href` is set, the card gains a keyboard focus-visible outline in its appearance's focus color and tints on hover. Opt out of the outline with `noFocusVisible`.

The whole card becomes one link, so don't put a `Button`, `Link` or field inside it: one click would trigger both, and the link's accessible name would swallow the card's text (a development build warns). For a card with its own actions, render the card without `href`, put a `Link` in its title, and keep the `Button` beside it.

```tsx demo
<Row flexWrap>
  <Card href="#as-link" filled>
    <Title filled>Services</Title>
    <Text filled>Click to navigate</Text>
  </Card>
  <Card href="#as-link" secondary filled>
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

```tsx demo
<ThemeProvider themeDefaults={{
  card: { main: { shadow: true } },
}}>
  <Card>Content</Card>
</ThemeProvider>
```

## Frequently asked questions

### Why are the cards in my Row different heights?

A Row centers its children on the cross axis (`itemsCenter` is a default), so each Card is as tall as its own content. Put the cards in a [Grid](/docs/layout-components/grid) such as `Grid3`, whose cells stretch to the height of the tallest one in their row, or add `itemsStretch` to the Row. A Grid also gives every card the same width.

### How do I line up the footers of cards with different content?

Build each card from `CardBody` and `CardFooter`, and put the cards in a Grid. The Grid stretches every card in a row to the same height, and `CardBody` grows to fill the height the card has left, so each `CardFooter` sits at the bottom edge whatever the length of the text above it. The parts are described under [Card with sub-components](#card-with-sub-components).

### Why does a Button in a filled Card keep its own colors?

Button paints its own colors: its default `primary` `outline` palette stays the same on any surface, while `Text` and `Title` take the colors of the Card. Give the Button an appearance and variant that read on the fill, for example `<Button secondary filled>` on a `filled primary` Card. [Which components set vs. inherit](/docs/customization/variant-inheritance#which-components-set-vs-inherit) lists both groups.
