---
componentKey: listItem
importPath: 'import { ListItem } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/listItem/ListItem.tsx
since: 0.9.0
---

A single entry inside a `List`. It renders an `<li>` and carries the same typography props as `Text` (appearance, size, weight, alignment), plus an `icon` prop for replacing the native marker. Always render it inside a `List`, which supplies the marker style and size.

## Custom markers with the icon prop

Pass an `icon` node to replace the native marker on that item only. The icon wrapper matches the text line-height and scales with the list size. Mark decorative glyphs with `aria-hidden="true"`.

```tsx demo
<List>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Ship the feature</ListItem>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Write the tests</ListItem>
  <ListItem icon={<span aria-hidden="true">→</span>}>Update the docs</ListItem>
  <ListItem>Plain item keeps the native marker</ListItem>
</List>
```

## Coloring a single item

`ListItem` defaults to `inherit`, taking its color from the parent `List`. Set an explicit appearance on one item to override just that row while its siblings keep the inherited color.

```tsx demo
<List>
  <ListItem>Inherited color</ListItem>
  <ListItem success>Success item</ListItem>
  <ListItem danger>Danger item</ListItem>
  <ListItem>Inherited again</ListItem>
</List>
```

## Emphasizing individual items

Typography toggles like `bold`, `italic`, and `mono` apply per item, so one entry can stand out without affecting the rest of the list.

```tsx demo
<List>
  <ListItem bold>Bold item</ListItem>
  <ListItem italic>Italic item</ListItem>
  <ListItem mono>monospace-item</ListItem>
  <ListItem>Default item</ListItem>
</List>
```

## Size and color inheritance

By default `ListItem` has `inheritSize` and `inheritColor` on, so `<List xl success>` propagates to every item without repeating the props. Set `noInheritSize` or `noInheritColor` (or an explicit size/appearance) on an item to opt out.

```tsx demo
<List xl success>
  <ListItem>Inherits xl size and success color</ListItem>
  <ListItem sm noInheritSize>Opts out: small, still inherits color</ListItem>
  <ListItem primary noInheritColor>Opts out: primary color</ListItem>
</List>
```

## Truncating long items

Use `truncate` for a single clipped line, or `lineClamp2` through `lineClamp5` to cap an item at a fixed number of lines.

```tsx demo
<List className="w-72">
  <ListItem truncate>This item is clipped to one line with an ellipsis when it runs past the width.</ListItem>
  <ListItem lineClamp2>This item is clamped to two lines, so longer content wraps once and then cuts off with an ellipsis at the end of the second line.</ListItem>
  <ListItem>A short item.</ListItem>
</List>
```
