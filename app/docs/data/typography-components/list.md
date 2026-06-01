---
componentKey: list
importPath: 'import { List } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/list/List.tsx
since: 0.9.0
---

A container for displaying a series of related items in an ordered or unordered fashion. It provides consistent styling for list elements.

## Basic List

An unordered list with bullet points.

```tsx demo
<List>
  <ListItem>First item in the list</ListItem>
  <ListItem>Second item in the list</ListItem>
  <ListItem>Third item in the list</ListItem>
</List>
```

## List style types

List supports six marker types: `disc` (default for unordered), `decimal` (default for ordered), `circle`, `square`, `lowerAlpha`, and `lowerRoman`. Setting `decimal`, `lowerAlpha`, or `lowerRoman` switches the element from `<ul>` to `<ol>`.

```tsx demo
<Col>
  <div>
    <Text semibold>Unordered (disc)</Text>
    <List disc>
      <ListItem>Bullet point one</ListItem>
      <ListItem>Bullet point two</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>circle</Text>
    <List circle>
      <ListItem>Hollow circle marker</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>square</Text>
    <List square>
      <ListItem>Filled square marker</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>Ordered (decimal)</Text>
    <List decimal>
      <ListItem>Step one</ListItem>
      <ListItem>Step two</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>lowerAlpha</Text>
    <List lowerAlpha>
      <ListItem>Lowercase letters</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>lowerRoman</Text>
    <List lowerRoman>
      <ListItem>Lowercase roman</ListItem>
      <ListItem>Second item</ListItem>
    </List>
  </div>
</Col>
```

## Marker position (inside vs outside)

Use `outside` (the default) to hang markers outside the content box so multi-line items align under the first character. Use `inside` to place markers inline with text. Compact, but wrapped lines flow under the marker.

```tsx demo
<Col>
  <div>
    <Text semibold>outside (default)</Text>
    <List outside className="w-64">
      <ListItem>A short item.</ListItem>
      <ListItem>A much longer item that wraps onto a second line so you can see the hanging marker behaviour.</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>inside</Text>
    <List inside className="w-64">
      <ListItem>A short item.</ListItem>
      <ListItem>A much longer item that wraps onto a second line, markers flow inline with the text.</ListItem>
    </List>
  </div>
</Col>
```

## List sizes

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

## List appearances

Lists use `inherit` appearance by default: they inherit color from their parent and are `transparent` (no background). Use explicit appearances like `primary`, `success`, `danger` to override the text color. To add a background, combine an appearance with `filled`.

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
  <List primary filled>
    <ListItem>Filled primary</ListItem>
    <ListItem>Second item</ListItem>
  </List>
  <List success filled>
    <ListItem>Filled success</ListItem>
    <ListItem>Second item</ListItem>
  </List>
</Col>
```

## Nested Lists: automatic marker progression

Nested unordered lists automatically progress `disc` → `circle` → `square`. Nested ordered lists progress `decimal` → `lowerAlpha` → `lowerRoman`. Override a specific nested list with inline `style={{ listStyleType: "..." }}`. The parent descendant selector wins over a child utility class on specificity, so inline style is the escape hatch.

```tsx demo
<Col>
  <div>
    <Text semibold>Unordered (ul)</Text>
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
    <Text semibold>Ordered (ol)</Text>
    <List decimal>
      <ListItem>Level 0: decimal</ListItem>
      <ListItem>
        Parent
        <List decimal>
          <ListItem>Level 1: lowerAlpha</ListItem>
          <ListItem>
            Parent
            <List decimal>
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
    <Text semibold>Default gap</Text>
    <List>
      <ListItem>Item one</ListItem>
      <ListItem>Item two</ListItem>
      <ListItem>Item three</ListItem>
    </List>
  </div>
  <div>
    <Text semibold>noGap</Text>
    <List noGap>
      <ListItem>Item one</ListItem>
      <ListItem>Item two</ListItem>
      <ListItem>Item three</ListItem>
    </List>
  </div>
</Col>
```

## Custom item icons

Pass an `icon` node to a `ListItem` to replace the native marker on that item only. The icon wrapper is sized to match the text line-height and scales with the list size, so checkmarks, arrows, or any custom SVG align cleanly with the text. For decorative glyphs, include `aria-hidden="true"` on the icon node.

```tsx demo
<List>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Ship the feature</ListItem>
  <ListItem icon={<span aria-hidden="true">✓</span>}>Write the tests</ListItem>
  <ListItem icon={<span aria-hidden="true">→</span>}>Update the docs</ListItem>
  <ListItem>Plain item keeps the native marker</ListItem>
</List>
```

## List styling

Combine font properties like `bold`, `italic`, `mono` with lists.

```tsx demo
<Col>
  <List semibold>
    <ListItem>Bold list items</ListItem>
    <ListItem>Another bold item</ListItem>
  </List>
  <List mono>
    <ListItem>code --install extension</ListItem>
    <ListItem>npm run build</ListItem>
  </List>
</Col>
```
