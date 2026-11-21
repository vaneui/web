Responsive page sections in VaneUI need no breakpoint classes in your markup. Layout changes are boolean props such as `tabletStack` or `mobileHide`, and the padding, gaps and heading sizes of padded surfaces step down for tablets and phones without any prop. This guide covers the desktop-first props, the spacing that scales by itself, the CSS import the props depend on, and a pricing section built with both. The [blocks gallery](/blocks) has more complete sections written the same way.

## Desktop-first breakpoints

VaneUI styles the desktop layout first and adapts it below three widths. Each responsive prop compiles to a Tailwind CSS class with a `max-*` variant, so it applies below the width and not at it:

| Breakpoint | Applies below | Example prop | Class it adds |
|------------|---------------|--------------|---------------|
| `mobile` | 768px (48rem) | `mobileStack` | `max-mobile:flex-col` |
| `tablet` | 1024px (64rem) | `tabletHide` | `max-tablet:hidden` |
| `desktop` | 1280px (80rem) | `desktopWFull` | `max-desktop:w-full` |

At exactly 768, 1024 or 1280px the larger tier applies. The widths match Tailwind's `md`, `lg` and `xl`, so `<Row mobileStack>` behaves like `flex flex-col md:flex-row`, written from the other end.

## Stack a Row below a width

`mobileStack`, `tabletStack` and `desktopStack` turn a [Row](/docs/layout-components/row) into a column below their width. They only affect row-direction components: Col, Stack, Section and Container are already columns, so the prop does nothing there. Set several on one Row and the widest applies.

A stacked Row keeps its default `itemsCenter`, so each child shrinks to its content width and centers. Cards in a stacked row usually should fill it, which `itemsStretch` does: in the row it gives the children equal height, and in the column it gives them full width.

```tsx
<Row tabletStack itemsStretch>
  <Card flex1>Equal width in the row, full width when stacked</Card>
  <Card flex1>Equal width in the row, full width when stacked</Card>
</Row>
```

Grids collapse without a prop: Grid3 shows three columns, two below 1024px and one below 768px. Pick a Row with `tabletStack` when every item must stay in one line or one column, and a Grid when the items can wrap into rows. The [Grid](/docs/layout-components/grid) page lists the column counts for each width.

## Hide and show by width

`mobileHide`, `tabletHide` and `desktopHide` hide an element below their width and keep its own display above it. The `*Show` props do the reverse: `mobileShow` shows an element only below 768px. Hide and show are separate categories, so `mobileHide tabletShow` shows an element only between 768 and 1024px.

```tsx
<Text mobileHide>Every plan starts with a 14-day trial of the features above it.</Text>
<Text mobileShow>Every plan starts with a 14-day trial.</Text>
```

A hidden element gets `display: none`, so screen readers skip it too. Two versions of a sentence never read twice.

## Full-width buttons on phones

Button and IconButton are `wFit`: as wide as their label. `mobileWFull` makes one full width below 768px and keeps the fit width above, and `tabletWFull` and `desktopWFull` do the same at their widths. In a stacked Row, give fit-width children such as Button and Badge `mobileWFull` to fill the column, since `itemsStretch` does not widen a child that sets its own width.

## Padding that steps down with the viewport

Section, Card, Stack, Container, Modal and Popup are padded surfaces with `responsiveSizing` on by default. Each repeats its padding and gap for tablet and mobile, so a Card inside a Section inside a phone screen keeps room for its content. At the default `md` size:

| Component | Padding from 1024px | Below 1024px | Below 768px |
|-----------|---------------------|--------------|-------------|
| [Section](/docs/layout-components/section) | 48px | 24px | 16px |
| Card | 24px | 20px | 16px |
| Stack | 16px | 12px | 8px |

Section's gap follows the same curve, 32px, then 24px, then 16px. The headings scale too: a SectionTitle at `md` is 36px on desktop, 32px below 1024px and 28px below 768px. Row, Col and Grid default to `noPadding` and add no inset, so they never double the padding of the surface around them.

The size prop moves the whole curve: `<Section lg>` pads 72px on desktop and 36px top and bottom below 1024px, while its side padding stops at 32px there and at 16px on phones.

A `className` that sets the whole value, such as `py-8` or `gap-4`, holds at every width, because it replaces the desktop, tablet and mobile values together. A one-sided class such as `pt-8` gives way to the theme's tablet and mobile padding below 1024px.

## The tokens import in a Tailwind CSS v4 build

The breakpoints are theme variables in `@vaneui/ui/tokens`. A project that runs its own Tailwind CSS v4 build needs all four lines in its CSS entry:

```css
@import "tailwindcss";
@import "@vaneui/ui/tokens";
@import "@vaneui/ui/vars";
@source "../node_modules/@vaneui/ui";
```

Without the tokens import, Tailwind does not know the `mobile`, `tablet` and `desktop` breakpoints and emits no CSS for any `max-mobile:`, `max-tablet:` or `max-desktop:` class. The build passes with no warning, but every responsive prop and the responsive padding and font sizes stop working. The prebuilt `@vaneui/ui/css` stylesheet already contains them. The [Installation](/docs/getting-started/installation) page covers both setups.

## A pricing section, worked through

The section below combines these props. Resize the window below 1024px and 768px to see the plans stack and the buttons widen:

```tsx demo
<Section secondary itemsStretch>
  <Col itemsCenter>
    <SectionTitle textCenter>Pricing for every team size</SectionTitle>
    <Text secondary textCenter mobileHide>Start free, add seats when your team grows, and switch plans at any time.</Text>
    <Text secondary textCenter mobileShow>Start free, add seats later.</Text>
  </Col>
  <Row tabletStack itemsStretch>
    <Card flex1>
      <Col flex1>
        <Title>Starter</Title>
        <Text xl fontBold>$0</Text>
        <List>
          <ListItem>Three projects</ListItem>
          <ListItem>Community support</ListItem>
        </List>
      </Col>
      <Button mobileWFull>Start free</Button>
    </Card>
    <Card flex1 accent>
      <Col flex1>
        <Row justifyBetween>
          <Title>Team</Title>
          <Badge accent>Popular</Badge>
        </Row>
        <Text xl fontBold>$12 per seat</Text>
        <List>
          <ListItem>Unlimited projects</ListItem>
          <ListItem>Email support</ListItem>
          <ListItem>90-day history</ListItem>
        </List>
      </Col>
      <Button accent filled mobileWFull>Start a trial</Button>
    </Card>
  </Row>
</Section>
```

What each part does:

- `Section secondary` paints a gray band, and its padding and gap step down from 48px and 32px on desktop to 16px each on phones. `itemsStretch` lets the heading block and the plan row span the section, since Section aligns its children to the start by default.
- `itemsCenter` centers the title and the subtitle in their column. Text and SectionTitle align their lines left by default, so each one also takes `textCenter` for when it wraps. `mobileHide` and `mobileShow` swap the long subtitle for a short one below 768px.
- `Row tabletStack itemsStretch` lays the plans out side by side from 1024px, with equal heights, and stacks them at full width below it. `flex1` gives the two cards equal widths in the row.
- In each Card, a `Col flex1` takes the height that the shorter plan leaves free, so both buttons sit at the bottom edge in the row. The Card's padding steps from 24px to 20px and then 16px.
- `mobileWFull` turns each Button into a full-width target on phones and leaves it at its label width on larger screens.

No class in the section names a breakpoint, and the same markup serves every width. More sections built from these props, from headers to feature grids, are in the [blocks gallery](/blocks).
