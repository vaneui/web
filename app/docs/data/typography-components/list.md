---
componentKey: list
importPath: 'import { List } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/list/List.tsx
since: 0.9.0
---

## Basic usage

List renders an unordered list with bullet points by default. Each entry is a `ListItem`, which renders an `<li>` and carries the core typography props (appearance, size, weight, alignment) minus the margin, letter-spacing, and cursor props that `Text` has. Always render `ListItem` inside a `List`, which supplies the marker style and size.

```tsx demo
<List>
  <ListItem>First item in the list</ListItem>
  <ListItem>Second item in the list</ListItem>
  <ListItem>Third item in the list</ListItem>
</List>
```

## Sizes

Lists come in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Font size, line height, padding, and the gap between items all scale together via the CSS-variable pipeline. `ListItem` has no size default of its own. It inherits from the parent `List`, so `<List xl>` propagates to every item without repeating the prop.

```tsx demo
<Col>
  <List xs>
    <ListItem>Extra small item</ListItem>
    <ListItem>Extra small item two</ListItem>
  </List>
  <List sm>
    <ListItem>Small list item</ListItem>
    <ListItem>Another small item</ListItem>
  </List>
  <List lg>
    <ListItem>Large list item</ListItem>
    <ListItem>Another large item</ListItem>
  </List>
  <List xl>
    <ListItem>Extra large item</ListItem>
    <ListItem>Another extra large item</ListItem>
  </List>
</Col>
```

## Appearances

Lists use `inheritAppearance` appearance by default: they inherit color from their parent and stay `transparent` with no background of their own. Use explicit appearances like `primary`, `success`, `danger` to override the text color. Because a List has no background of its own, place it inside a filled container like `Card` when you want a surface behind it.

```tsx demo
<Col>
  <List primary>
    <ListItem>Primary colored item</ListItem>
    <ListItem>Another primary item</ListItem>
  </List>
  <List success>
    <ListItem>Success colored item</ListItem>
    <ListItem>Another success item</ListItem>
  </List>
  <List danger>
    <ListItem>Danger colored item</ListItem>
    <ListItem>Another danger item</ListItem>
  </List>
  <Card secondary filled>
    <List>
      <ListItem>List on a filled Card surface</ListItem>
      <ListItem>The Card provides the background</ListItem>
    </List>
  </Card>
</Col>
```

## Variants

List is `outline` and transparent by default, so an appearance colours the text and the list paints nothing behind it. List is the one typography component that still wires a background mapper, so clearing `transparent` lets `filled` paint the appearance's surface behind the whole list. Left alone, `filled` only switches the text to the "on this fill" colour, for a list sitting on a filled surface of the same appearance.

```tsx demo
<Col>
  <List info>
    <ListItem>outline info, on the page surface</ListItem>
  </List>
  <List danger filled transparent={false}>
    <ListItem>filled danger, with the surface switched on</ListItem>
  </List>
  <Card info filled>
    <List info filled>
      <ListItem>filled info, on a matching filled Card</ListItem>
    </List>
  </Card>
</Col>
```

## List style types

List supports six marker types: `listDisc` (default for unordered), `listDecimal` (default for ordered), `listCircle`, `listSquare`, `listLowerAlpha`, and `listLowerRoman`. Setting `listDecimal`, `listLowerAlpha`, or `listLowerRoman` switches the element from `<ul>` to `<ol>`.

```tsx demo
<Col>
  <div>
    <Text fontSemibold>Unordered (disc)</Text>
    <List listDisc>
      <ListItem>Bullet point one</ListItem>
      <ListItem>Bullet point two</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>circle</Text>
    <List listCircle>
      <ListItem>Hollow circle marker</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>square</Text>
    <List listSquare>
      <ListItem>Filled square marker</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>Ordered (decimal)</Text>
    <List listDecimal>
      <ListItem>Step one</ListItem>
      <ListItem>Step two</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>lowerAlpha</Text>
    <List listLowerAlpha>
      <ListItem>Lowercase letters</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>lowerRoman</Text>
    <List listLowerRoman>
      <ListItem>Lowercase roman</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
</Col>
```

## Marker position (inside vs outside)

Use `listOutside` (the default) to hang markers outside the content box so multi-line items align under the first character. Use `listInside` to place markers inline with text. Compact, but wrapped lines flow under the marker.

```tsx demo
<Col>
  <div>
    <Text fontSemibold>outside (default)</Text>
    <List listOutside className="w-64">
      <ListItem>A short item.</ListItem>
      <ListItem>A much longer item that wraps onto a second line so you can see the hanging marker behaviour.</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>inside</Text>
    <List listInside className="w-64">
      <ListItem>A short item.</ListItem>
      <ListItem>A much longer item that wraps onto a second line, markers flow inline with the text.</ListItem>
    </List>
  </div>
</Col>
```

## Nested lists: automatic marker progression

Nested unordered lists automatically progress `listDisc` → `listCircle` → `listSquare`. Nested ordered lists progress `listDecimal` → `listLowerAlpha` → `listLowerRoman`. Override a specific nested list by forcing the marker with an important utility like `list-[square]!`. The parent's descendant selector outranks a plain child utility on specificity, so the trailing `!` is what makes the override win.

```tsx demo
<Col>
  <div>
    <Text fontSemibold>Unordered (ul)</Text>
    <List>
      <ListItem>Level 0: disc</ListItem>
      <ListItem>
        Parent
        <List>
          <ListItem>Level 1: circle</ListItem>
          <ListItem>
            Parent
            <List>
              <ListItem>Level 2: square</ListItem>
            </List>
          </ListItem>
        </List>
      </ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>Ordered (ol)</Text>
    <List listDecimal>
      <ListItem>Level 0: decimal</ListItem>
      <ListItem>
        Parent
        <List listDecimal>
          <ListItem>Level 1: lowerAlpha</ListItem>
          <ListItem>
            Parent
            <List listDecimal>
              <ListItem>Level 2: lowerRoman</ListItem>
            </List>
          </ListItem>
        </List>
      </ListItem>
    </List>
  </div>
</Col>
```

## Item spacing (gap vs noGap)

Lists apply a size-driven `gap` by default: a sibling margin between items that scales with the list's size prop. Use `noGap` to remove it entirely for a compact layout (useful for checklists or dense content).

```tsx demo
<Col>
  <div>
    <Text fontSemibold>Default gap</Text>
    <List>
      <ListItem>Item one</ListItem>
      <ListItem>Item two</ListItem>
      <ListItem>Item three</ListItem>
    </List>
  </div>
  <div>
    <Text fontSemibold>noGap</Text>
    <List noGap>
      <ListItem>Item one</ListItem>
      <ListItem>Item two</ListItem>
      <ListItem>Item three</ListItem>
    </List>
  </div>
</Col>
```

## Custom item icons

Pass an `icon` node to a `ListItem` to replace the native marker on that item only. The icon wrapper is sized to match the text font size (1em) and scales with the list size, so checkmarks, arrows, or any custom SVG align cleanly with the text. For decorative glyphs, include `aria-hidden="true"` on the icon node.

```tsx demo
<List>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Ship the feature</ListItem>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Write the tests</ListItem>
  <ListItem icon={<span aria-hidden="true">→</span>}>Update the docs</ListItem>
  <ListItem>Plain item keeps the native marker</ListItem>
</List>
```

## Overriding size and color per item

`ListItem` has no size or appearance default of its own, so both cascade from the parent `List`: `<List xl success>` propagates to every item. Set an explicit size or appearance on one item to opt out of just that row while its siblings keep the inherited values.

```tsx demo
<List xl success>
  <ListItem>Inherits xl size and success color</ListItem>
  <ListItem sm>Opts out of size: small, still inherits color</ListItem>
  <ListItem primary>Opts out of color: primary</ListItem>
</List>
```

## Styling

Combine font properties like `fontBold`, `italic`, `fontMono` with lists.

```tsx demo
<Col>
  <List fontSemibold>
    <ListItem>Bold list items</ListItem>
    <ListItem>Another bold item</ListItem>
  </List>
  <List fontMono>
    <ListItem>code --install extension</ListItem>
    <ListItem>npm run build</ListItem>
  </List>
</Col>
```

The same toggles apply per item, so one entry can stand out without affecting the rest of the list.

```tsx demo
<List>
  <ListItem fontBold>Bold item</ListItem>
  <ListItem italic>Italic item</ListItem>
  <ListItem fontMono>monospace-item</ListItem>
  <ListItem>Default item</ListItem>
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
