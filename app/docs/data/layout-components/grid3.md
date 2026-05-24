---
componentKey: grid3
importPath: 'import { Grid3 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid3.tsx
since: 0.9.0
---

A responsive layout component that arranges its children in a three-column CSS grid. Great for feature triads, card collections, and balanced summaries.

## When to Use

- Three-up feature grids, plan tiers, or testimonial collections.
- Card layouts with a medium item count (3, 6, 9 items).
- Galleries or thumbnail rows that need equal column widths.

### When NOT to Use

- For two or four columns — use `Grid2` or `Grid4` instead.
- For variable-width items — use `Row flexWrap` and let children size themselves.
- For column-spanning layouts — use raw CSS grid with `className` instead.

## Customizing

Set app-wide Grid3 defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Grid3 } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  grid3: { lg: true },
}}>
  <Grid3>{/* ... */}</Grid3>
</ThemeProvider>
```

## Basic Grid3

A three-column grid layout. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults — no need to specify them.

```tsx demo
<Grid3>
  <Card>
    <Title>Item 1</Title>
    <Text>Three-column layout</Text>
  </Card>
  <Card>
    <Title>Item 2</Title>
    <Text>Equal widths</Text>
  </Card>
  <Card>
    <Title>Item 3</Title>
    <Text>Wraps after three</Text>
  </Card>
  <Card>
    <Title>Item 4</Title>
    <Text>Second row</Text>
  </Card>
  <Card>
    <Title>Item 5</Title>
    <Text>Continues</Text>
  </Card>
  <Card>
    <Title>Item 6</Title>
    <Text>And fills</Text>
  </Card>
</Grid3>
```

## Grid Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Grid3 xs>
    <Card xs><Text xs>Item 1</Text></Card>
    <Card xs><Text xs>Item 2</Text></Card>
    <Card xs><Text xs>Item 3</Text></Card>
  </Grid3>
  <Text semibold>sm</Text>
  <Grid3 sm>
    <Card sm><Text sm>Item 1</Text></Card>
    <Card sm><Text sm>Item 2</Text></Card>
    <Card sm><Text sm>Item 3</Text></Card>
  </Grid3>
  <Text semibold>md (default)</Text>
  <Grid3>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Text semibold>lg</Text>
  <Grid3 lg>
    <Card lg><Text lg>Item 1</Text></Card>
    <Card lg><Text lg>Item 2</Text></Card>
    <Card lg><Text lg>Item 3</Text></Card>
  </Grid3>
  <Text semibold>xl</Text>
  <Grid3 xl>
    <Card xl><Text xl>Item 1</Text></Card>
    <Card xl><Text xl>Item 2</Text></Card>
    <Card xl><Text xl>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Grid with Gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text semibold>Default gap</Text>
  <Grid3>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Text semibold>noGap</Text>
  <Grid3 noGap>
    <Card sharp><Text>Item 1</Text></Card>
    <Card sharp><Text>Item 2</Text></Card>
    <Card sharp><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Grid Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid3 filled primary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 filled secondary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 filled success>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 filled warning>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Grid Variants

`outline` is the default. Use `filled` for a solid background, or add `border` for a visible outline.

```tsx demo
<Col>
  <Grid3 filled primary>
    <Card><Text>Filled primary</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 border success>
    <Card><Text>Outline success</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Grid Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself — pair with `filled` or `border` to see it.

```tsx demo
<Col>
  <Grid3 filled secondary sharp padding>
    <Card><Text>Sharp (default)</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 filled secondary rounded padding>
    <Card><Text>Rounded</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```
