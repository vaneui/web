---
componentKey: grid4
importPath: 'import { Grid4 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid4.tsx
since: 0.9.0
---

## Basic usage

A four-column grid layout. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults: no need to specify them.

```tsx demo
<Grid4>
  <Card>
    <Title>Item 1</Title>
    <Text>Four-column layout</Text>
  </Card>
  <Card>
    <Title>Item 2</Title>
    <Text>Equal widths</Text>
  </Card>
  <Card>
    <Title>Item 3</Title>
    <Text>Wraps after four</Text>
  </Card>
  <Card>
    <Title>Item 4</Title>
    <Text>End of first row</Text>
  </Card>
  <Card>
    <Title>Item 5</Title>
    <Text>Second row</Text>
  </Card>
  <Card>
    <Title>Item 6</Title>
    <Text>Continues</Text>
  </Card>
  <Card>
    <Title>Item 7</Title>
    <Text>And fills</Text>
  </Card>
  <Card>
    <Title>Item 8</Title>
    <Text>Out evenly</Text>
  </Card>
</Grid4>
```

## Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Grid4 xs>
    <Card xs><Text xs>Item 1</Text></Card>
    <Card xs><Text xs>Item 2</Text></Card>
    <Card xs><Text xs>Item 3</Text></Card>
    <Card xs><Text xs>Item 4</Text></Card>
  </Grid4>
  <Text semibold>sm</Text>
  <Grid4 sm>
    <Card sm><Text sm>Item 1</Text></Card>
    <Card sm><Text sm>Item 2</Text></Card>
    <Card sm><Text sm>Item 3</Text></Card>
    <Card sm><Text sm>Item 4</Text></Card>
  </Grid4>
  <Text semibold>md (default)</Text>
  <Grid4>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Text semibold>lg</Text>
  <Grid4 lg>
    <Card lg><Text lg>Item 1</Text></Card>
    <Card lg><Text lg>Item 2</Text></Card>
    <Card lg><Text lg>Item 3</Text></Card>
    <Card lg><Text lg>Item 4</Text></Card>
  </Grid4>
  <Text semibold>xl</Text>
  <Grid4 xl>
    <Card xl><Text xl>Item 1</Text></Card>
    <Card xl><Text xl>Item 2</Text></Card>
    <Card xl><Text xl>Item 3</Text></Card>
    <Card xl><Text xl>Item 4</Text></Card>
  </Grid4>
</Col>
```

## Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid4 filled primary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Grid4 filled secondary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Grid4 filled success>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Grid4 filled warning>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
</Col>
```

## Variants

`outline` is the default. Use `filled` for a solid background, or add `border` for a visible outline.

```tsx demo
<Col>
  <Grid4 filled primary>
    <Card><Text>Filled primary</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Grid4 border success>
    <Card><Text>Outline success</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
</Col>
```

## Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself: pair with `filled` or `border` to see it.

```tsx demo
<Col>
  <Grid4 filled secondary sharp padding>
    <Card><Text>Sharp (default)</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Grid4 filled secondary rounded padding>
    <Card><Text>Rounded</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
</Col>
```

## With gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text semibold>Default gap</Text>
  <Grid4>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
    <Card><Text>Item 4</Text></Card>
  </Grid4>
  <Text semibold>noGap</Text>
  <Grid4 noGap>
    <Card sharp><Text>Item 1</Text></Card>
    <Card sharp><Text>Item 2</Text></Card>
    <Card sharp><Text>Item 3</Text></Card>
    <Card sharp><Text>Item 4</Text></Card>
  </Grid4>
</Col>
```

## Customizing

Set app-wide Grid4 defaults with `ThemeProvider`'s `themeDefaults`:

```tsx demo
<ThemeProvider themeDefaults={{
  grid4: { lg: true },
}}>
  <Grid4>{/* ... */}</Grid4>
</ThemeProvider>
```
