---
componentKey: grid3
importPath: 'import { Grid2, Grid3, Grid4, Grid5, Grid6 } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/grid/Grid3.tsx
since: 0.9.0
---

Use a Grid component when cards or tiles should line up in columns. Each one renders a `<div>` with CSS grid display, so the cells in a row all get the same width whatever their content. For flex items that keep their content width, use [Row](/docs/layout-components/row); for data compared across rows and columns, use [Table](/docs/layout-components/table).

## Basic usage

The Grid family renders equal-width column layouts: `Grid2` through `Grid6` for two to six columns. Children flow left to right and wrap to the next row. `md`, `gap`, `noPadding`, `outline`, and `sharp` are defaults, so none of them need to be specified.

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
    <Text>Wraps to next row</Text>
  </Card>
</Grid3>
```

## Column counts

Pick the component for the number of columns you need, from `Grid2` to `Grid6`. They share the same API and differ only in the column count.

```tsx demo
<Col>
  <Text fontSemibold>Grid2</Text>
  <Grid2>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
  </Grid2>
  <Text fontSemibold>Grid3</Text>
  <Grid3>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
  </Grid3>
  <Text fontSemibold>Grid4</Text>
  <Grid4>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
  </Grid4>
  <Text fontSemibold>Grid6</Text>
  <Grid6>
    <Card><Text textCenter>1</Text></Card>
    <Card><Text textCenter>2</Text></Card>
    <Card><Text textCenter>3</Text></Card>
    <Card><Text textCenter>4</Text></Card>
    <Card><Text textCenter>5</Text></Card>
    <Card><Text textCenter>6</Text></Card>
  </Grid6>
</Col>
```

## Responsive columns

Each grid reduces its column count on smaller screens so cells never get too narrow. The breakpoints are tablet (below 1024px) and mobile (below 768px). Resize the window to see the reflow.

| Component | Desktop | Tablet | Mobile |
|-----------|---------|--------|--------|
| `Grid2`   | 2       | 2      | 1      |
| `Grid3`   | 3       | 2      | 1      |
| `Grid4`   | 4       | 3      | 2      |
| `Grid5`   | 5       | 3      | 2      |
| `Grid6`   | 6       | 4      | 2      |

## Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) scale the grid's `gap` and `border-radius`.

```tsx demo
<Col>
  <Text fontSemibold>xs</Text>
  <Grid3 xs>
    <Card xs><Text xs>Item 1</Text></Card>
    <Card xs><Text xs>Item 2</Text></Card>
    <Card xs><Text xs>Item 3</Text></Card>
  </Grid3>
  <Text fontSemibold>sm</Text>
  <Grid3 sm>
    <Card sm><Text sm>Item 1</Text></Card>
    <Card sm><Text sm>Item 2</Text></Card>
    <Card sm><Text sm>Item 3</Text></Card>
  </Grid3>
  <Text fontSemibold>md (default)</Text>
  <Grid3>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Text fontSemibold>lg</Text>
  <Grid3 lg>
    <Card lg><Text lg>Item 1</Text></Card>
    <Card lg><Text lg>Item 2</Text></Card>
    <Card lg><Text lg>Item 3</Text></Card>
  </Grid3>
  <Text fontSemibold>xl</Text>
  <Grid3 xl>
    <Card xl><Text xl>Item 1</Text></Card>
    <Card xl><Text xl>Item 2</Text></Card>
    <Card xl><Text xl>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Appearances

Grid supports color appearances. Pair with `filled` or `border` to make the surface visible.

```tsx demo
<Col>
  <Grid3 filled primary>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Grid3 filled success>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Variants

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

## Shapes

`sharp` is the default. Use `rounded` for soft corners or `pill` for fully rounded edges. Shape applies to the grid container itself, so pair with `filled` or `border` to see it.

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

## With gap

`gap` is on by default. Use `noGap` to remove spacing between cells.

```tsx demo
<Col>
  <Text fontSemibold>Default gap</Text>
  <Grid3>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
  <Text fontSemibold>noGap</Text>
  <Grid3 noGap>
    <Card sharp><Text>Item 1</Text></Card>
    <Card sharp><Text>Item 2</Text></Card>
    <Card sharp><Text>Item 3</Text></Card>
  </Grid3>
</Col>
```

## Divided grid with 1px lines

`divided` replaces the gap with 1px lines in the divider color, between the cells and around the outside, for a feature list or a strip of stats that reads as one ruled block. Each cell draws its line as an outline, so give the cells their own padding: a `Stack` per cell works, since it pads by default and its corners are `sharp`. `divided` is on `Grid2` to `Grid6` from `@vaneui/ui` 1.4.5, and the column count still reduces on smaller screens.

```tsx demo
<Grid3 divided>
  <Stack sm>
    <Title sm>Boolean props</Title>
    <Text sm secondary>Size, appearance and shape as flags.</Text>
  </Stack>
  <Stack sm>
    <Title sm>Theme overrides</Title>
    <Text sm secondary>App-wide defaults through ThemeProvider.</Text>
  </Stack>
  <Stack sm>
    <Title sm>Dark mode</Title>
    <Text sm secondary>One data-theme attribute.</Text>
  </Stack>
  <Stack sm>
    <Title sm>Tailwind CSS v4</Title>
    <Text sm secondary>Utilities and CSS variables.</Text>
  </Stack>
  <Stack sm>
    <Title sm>Accessible</Title>
    <Text sm secondary>Roles, labels and focus states.</Text>
  </Stack>
  <Stack sm>
    <Title sm>TypeScript</Title>
    <Text sm secondary>Typed props on every component.</Text>
  </Stack>
</Grid3>
```

A divided grid owns its 1px gap, so `gap`, `noGap` and the size props no longer change the spacing between cells. The lines take the grid's divider color, which follows its appearance.

## Customizing

Set app-wide Grid defaults with `ThemeProvider`'s `themeDefaults`. Each column count has its own key (`grid2` through `grid6`).

```tsx demo
<ThemeProvider themeDefaults={{
  grid3: { lg: true },
}}>
  <Grid3>
    <Card><Text>Item 1</Text></Card>
    <Card><Text>Item 2</Text></Card>
    <Card><Text>Item 3</Text></Card>
  </Grid3>
</ThemeProvider>
```
