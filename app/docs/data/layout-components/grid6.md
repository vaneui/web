---
componentKey: grid6
importPath: 'import { Grid6 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid6.tsx
since: 0.9.0
---

A responsive layout component that arranges its children in a six-column CSS grid. Ideal for icon grids, compact feature listings, and dense card collections.

## When to Use

- Icon or logo grids (clients, integrations, badges).
- Compact feature collections with small tiles.
- Dense layouts where the item count is a multiple of six.

### When NOT to Use

- For five or fewer columns — use `Grid2`–`Grid5` instead.
- For variable-width items — use `Row flexWrap` and let children size themselves.
- For column-spanning layouts — use raw CSS grid with `className` instead.

## Customizing

Set app-wide Grid6 defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Grid6 } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  grid6: { sm: true },
}}>
  <Grid6>{/* ... */}</Grid6>
</ThemeProvider>
```

## Basic Grid6

A six-column grid layout. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults — no need to specify them.

```tsx demo
<Grid6>
  <Card><Text textCenter>Item 1</Text></Card>
  <Card><Text textCenter>Item 2</Text></Card>
  <Card><Text textCenter>Item 3</Text></Card>
  <Card><Text textCenter>Item 4</Text></Card>
  <Card><Text textCenter>Item 5</Text></Card>
  <Card><Text textCenter>Item 6</Text></Card>
  <Card><Text textCenter>Item 7</Text></Card>
  <Card><Text textCenter>Item 8</Text></Card>
  <Card><Text textCenter>Item 9</Text></Card>
  <Card><Text textCenter>Item 10</Text></Card>
  <Card><Text textCenter>Item 11</Text></Card>
  <Card><Text textCenter>Item 12</Text></Card>
</Grid6>
```

## Grid Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Grid6 xs>
    <Card xs><Text xs textCenter>1</Text></Card>
    <Card xs><Text xs textCenter>2</Text></Card>
    <Card xs><Text xs textCenter>3</Text></Card>
    <Card xs><Text xs textCenter>4</Text></Card>
    <Card xs><Text xs textCenter>5</Text></Card>
    <Card xs><Text xs textCenter>6</Text></Card>
  </Grid6>
  <Text semibold>sm</Text>
  <Grid6 sm>
    <Card sm><Text sm textCenter>1</Text></Card>
    <Card sm><Text sm textCenter>2</Text></Card>
    <Card sm><Text sm textCenter>3</Text></Card>
    <Card sm><Text sm textCenter>4</Text></Card>
    <Card sm><Text sm textCenter>5</Text></Card>
    <Card sm><Text sm textCenter>6</Text></Card>
  </Grid6>
  <Text semibold>md (default)</Text>
  <Grid6>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Text semibold>lg</Text>
  <Grid6 lg>
    <Card lg><Text lg textCenter>1</Text></Card>
    <Card lg><Text lg textCenter>2</Text></Card>
    <Card lg><Text lg textCenter>3</Text></Card>
    <Card lg><Text lg textCenter>4</Text></Card>
    <Card lg><Text lg textCenter>5</Text></Card>
    <Card lg><Text lg textCenter>6</Text></Card>
  </Grid6>
  <Text semibold>xl</Text>
  <Grid6 xl>
    <Card xl><Text xl textCenter>1</Text></Card>
    <Card xl><Text xl textCenter>2</Text></Card>
    <Card xl><Text xl textCenter>3</Text></Card>
    <Card xl><Text xl textCenter>4</Text></Card>
    <Card xl><Text xl textCenter>5</Text></Card>
    <Card xl><Text xl textCenter>6</Text></Card>
  </Grid6>
</Col>
```

## Grid with Gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text semibold>Default gap</Text>
  <Grid6>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Text semibold>noGap</Text>
  <Grid6 noGap>
    <Card sharp><Text textCenter>1</Text></Card>
    <Card sharp><Text textCenter>2</Text></Card>
    <Card sharp><Text textCenter>3</Text></Card>
    <Card sharp><Text textCenter>4</Text></Card>
    <Card sharp><Text textCenter>5</Text></Card>
    <Card sharp><Text textCenter>6</Text></Card>
  </Grid6>
</Col>
```

## Grid Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid6 filled primary>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Grid6 filled secondary>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Grid6 filled success>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Grid6 filled warning>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
</Col>
```

## Grid Variants

`outline` is the default. Use `filled` for a solid background, or add `border` for a visible outline.

```tsx demo
<Col>
  <Grid6 filled primary>
    <Card><Text textCenter>Filled</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Grid6 border success>
    <Card><Text textCenter>Outline</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
</Col>
```

## Grid Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself — pair with `filled` or `border` to see it.

```tsx demo
<Col>
  <Grid6 filled secondary sharp padding>
    <Card><Text textCenter>Sharp</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
  <Grid6 filled secondary rounded padding>
    <Card><Text textCenter>Rounded</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
</Col>
```
