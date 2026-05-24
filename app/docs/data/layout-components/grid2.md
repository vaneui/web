---
componentKey: grid2
importPath: 'import { Grid2 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid2.tsx
since: 0.9.0
---

A responsive layout component that arranges its children in a two-column CSS grid. Ideal for side-by-side content layouts and balanced arrangements.

## When to Use

- Two-up feature comparisons, pricing tiers, or product highlights.
- Side-by-side cards (image + details, before/after, problem/solution).
- Splitting a section into two equal columns without writing custom flex math.

### When NOT to Use

- For two children that should align in a single line — use `Row` and let flexbox size them.
- For 3+ columns — use `Grid3`–`Grid6`.
- For column-spanning layouts — use raw CSS grid with `className` instead.

## Customizing

Set app-wide Grid2 defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Grid2 } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  grid2: { lg: true },
}}>
  <Grid2>{/* ... */}</Grid2>
</ThemeProvider>
```

## Basic Grid2

A two-column grid layout. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults — no need to specify them.

```tsx demo
<Grid2>
  <Card>
    <Title>Item 1</Title>
    <Text>Two-column layout</Text>
  </Card>
  <Card>
    <Title>Item 2</Title>
    <Text>Balanced columns</Text>
  </Card>
  <Card>
    <Title>Item 3</Title>
    <Text>Wraps to next row</Text>
  </Card>
  <Card>
    <Title>Item 4</Title>
    <Text>Equal widths</Text>
  </Card>
</Grid2>
```

## Grid Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Grid2 xs>
    <Card xs><Text xs>Item 1</Text></Card>
    <Card xs><Text xs>Item 2</Text></Card>
  </Grid2>
  <Text semibold>sm</Text>
  <Grid2 sm>
    <Card sm><Text sm>Item 1</Text></Card>
    <Card sm><Text sm>Item 2</Text></Card>
  </Grid2>
  <Text semibold>md (default)</Text>
  <Grid2>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Text semibold>lg</Text>
  <Grid2 lg>
    <Card lg><Text lg>Item 1</Text></Card>
    <Card lg><Text lg>Item 2</Text></Card>
  </Grid2>
  <Text semibold>xl</Text>
  <Grid2 xl>
    <Card xl><Text xl>Item 1</Text></Card>
    <Card xl><Text xl>Item 2</Text></Card>
  </Grid2>
</Col>
```

## Grid with Gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text semibold>Default gap</Text>
  <Grid2>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Text semibold>noGap</Text>
  <Grid2 noGap>
    <Card sharp><Text>Item 1</Text></Card>
    <Card sharp><Text>Item 2</Text></Card>
  </Grid2>
</Col>
```

## Grid Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid2 filled primary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Grid2 filled secondary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Grid2 filled success>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Grid2 filled warning>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
</Col>
```

## Grid Variants

`outline` is the default. Use `filled` for a solid background, or add `border` for a visible outline.

```tsx demo
<Col>
  <Grid2 filled primary>
    <Card><Text>Filled primary</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Grid2 border success>
    <Card><Text>Outline success</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
</Col>
```

## Grid Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself — pair with `filled` or `border` to see it.

```tsx demo
<Col>
  <Grid2 filled secondary sharp padding>
    <Card><Text>Sharp (default)</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
  <Grid2 filled secondary rounded padding>
    <Card><Text>Rounded</Text></Card>
    <Card><Text>Item 2</Text></Card>
  </Grid2>
</Col>
```
