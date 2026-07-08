---
componentKey: grid5
importPath: 'import { Grid5 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid5.tsx
since: 0.9.0
---

## Basic usage

A five-column grid layout. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults: no need to specify them.

```tsx demo
<Grid5>
  <Card>
    <Title sm>Item 1</Title>
    <Text>Five-column layout</Text>
  </Card>
  <Card>
    <Title sm>Item 2</Title>
    <Text>Equal widths</Text>
  </Card>
  <Card>
    <Title sm>Item 3</Title>
    <Text>Five across</Text>
  </Card>
  <Card>
    <Title sm>Item 4</Title>
    <Text>Wraps after five</Text>
  </Card>
  <Card>
    <Title sm>Item 5</Title>
    <Text>End of row</Text>
  </Card>
  <Card>
    <Title sm>Item 6</Title>
    <Text>Second row</Text>
  </Card>
  <Card>
    <Title sm>Item 7</Title>
    <Text>Continues</Text>
  </Card>
  <Card>
    <Title sm>Item 8</Title>
    <Text>And fills</Text>
  </Card>
  <Card>
    <Title sm>Item 9</Title>
    <Text>Out evenly</Text>
  </Card>
  <Card>
    <Title sm>Item 10</Title>
    <Text>Across rows</Text>
  </Card>
</Grid5>
```

## Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text semibold>xs</Text>
  <Grid5 xs>
    <Card xs><Text xs>1</Text></Card>
    <Card xs><Text xs>2</Text></Card>
    <Card xs><Text xs>3</Text></Card>
    <Card xs><Text xs>4</Text></Card>
    <Card xs><Text xs>5</Text></Card>
  </Grid5>
  <Text semibold>sm</Text>
  <Grid5 sm>
    <Card sm><Text sm>1</Text></Card>
    <Card sm><Text sm>2</Text></Card>
    <Card sm><Text sm>3</Text></Card>
    <Card sm><Text sm>4</Text></Card>
    <Card sm><Text sm>5</Text></Card>
  </Grid5>
  <Text semibold>md (default)</Text>
  <Grid5>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Text semibold>lg</Text>
  <Grid5 lg>
    <Card lg><Text lg>1</Text></Card>
    <Card lg><Text lg>2</Text></Card>
    <Card lg><Text lg>3</Text></Card>
    <Card lg><Text lg>4</Text></Card>
    <Card lg><Text lg>5</Text></Card>
  </Grid5>
  <Text semibold>xl</Text>
  <Grid5 xl>
    <Card xl><Text xl>1</Text></Card>
    <Card xl><Text xl>2</Text></Card>
    <Card xl><Text xl>3</Text></Card>
    <Card xl><Text xl>4</Text></Card>
    <Card xl><Text xl>5</Text></Card>
  </Grid5>
</Col>
```

## Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid5 filled primary>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Grid5 filled secondary>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Grid5 filled success>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Grid5 filled warning>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
</Col>
```

## Variants

`outline` is the default. Use `filled` for a solid background, or add `border` for a visible outline.

```tsx demo
<Col>
  <Grid5 filled primary>
    <Card><Text>Filled primary</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Grid5 border success>
    <Card><Text>Outline success</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
</Col>
```

## Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself: pair with `filled` or `border` to see it.

```tsx demo
<Col>
  <Grid5 filled secondary sharp padding>
    <Card><Text>Sharp (default)</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Grid5 filled secondary rounded padding>
    <Card><Text>Rounded</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
</Col>
```

## With gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text semibold>Default gap</Text>
  <Grid5>
    <Card><Text>1</Text></Card>
    <Card><Text>2</Text></Card>
    <Card><Text>3</Text></Card>
    <Card><Text>4</Text></Card>
    <Card><Text>5</Text></Card>
  </Grid5>
  <Text semibold>noGap</Text>
  <Grid5 noGap>
    <Card sharp><Text>1</Text></Card>
    <Card sharp><Text>2</Text></Card>
    <Card sharp><Text>3</Text></Card>
    <Card sharp><Text>4</Text></Card>
    <Card sharp><Text>5</Text></Card>
  </Grid5>
</Col>
```

## Customizing

Set app-wide Grid5 defaults with `ThemeProvider`'s `themeDefaults`:

```tsx demo
<ThemeProvider themeDefaults={{
  grid5: { sm: true },
}}>
  <Grid5>{/* ... */}</Grid5>
</ThemeProvider>
```
