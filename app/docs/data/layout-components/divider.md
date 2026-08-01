---
componentKey: divider
importPath: 'import { Divider } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/divider/Divider.tsx
since: 0.9.0
---

## Basic usage

A horizontal divider.

```tsx demo
<Col>
  <Text>Content above the divider</Text>
  <Divider />
  <Text>Content below the divider</Text>
</Col>
```

## Sizes

Sizes (`xs`, `sm`, `md`, `lg`, `xl`) drive the per-size vertical padding via `--py-unit`. The line itself stays one pixel; pass `padding` to make the surrounding spacing visible.

```tsx demo
<Col lg>
  <div>
    <Text fontSemibold>Divider xs</Text>
    <Divider xs padding />
    <Text>Content after xs divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider sm</Text>
    <Divider sm padding />
    <Text>Content after sm divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider md (default)</Text>
    <Divider padding />
    <Text>Content after md divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider lg</Text>
    <Divider lg padding />
    <Text>Content after lg divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider xl</Text>
    <Divider xl padding />
    <Text>Content after xl divider</Text>
  </div>
</Col>
```

## Appearances

Dividers use `inherit` by default. Pass an explicit appearance for a colored line.

```tsx demo
<Col lg>
  <div>
    <Text fontSemibold>Divider primary</Text>
    <Divider primary />
    <Text>Content after primary divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider accent</Text>
    <Divider accent />
    <Text>Content after accent divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider secondary</Text>
    <Divider secondary />
    <Text>Content after secondary divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider tertiary</Text>
    <Divider tertiary />
    <Text>Content after tertiary divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider success</Text>
    <Divider success />
    <Text>Content after success divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider danger</Text>
    <Divider danger />
    <Text>Content after danger divider</Text>
  </div>
  <div>
    <Text fontSemibold>Divider warning</Text>
    <Divider warning />
    <Text>Content after warning divider</Text>
  </div>
</Col>
```

## Variants

`filled` swaps the outline appearance for a solid bar in the same color.

```tsx demo
<Col lg>
  <Divider primary filled />
  <Divider accent filled />
  <Divider success filled />
  <Divider danger filled />
</Col>
```

## Vertical divider

Pass `vertical` to render a vertical separator. Useful for inline navigation or toolbars; place it inside a `Row` so it can stretch to the row's height.

```tsx demo
<Row className="h-10">
  <Text>Home</Text>
  <Divider vertical />
  <Text>About</Text>
  <Divider vertical />
  <Text>Contact</Text>
</Row>
```

## Separating list items

Use `Divider` between items in a `Stack` or `Col` to group related rows.

```tsx demo
<Stack>
  <Row justifyBetween>
    <Text fontSemibold>Plan</Text>
    <Text>Pro</Text>
  </Row>
  <Divider />
  <Row justifyBetween>
    <Text fontSemibold>Seats</Text>
    <Text>12</Text>
  </Row>
  <Divider />
  <Row justifyBetween>
    <Text fontSemibold>Renews</Text>
    <Text>May 2026</Text>
  </Row>
</Stack>
```

## Separating content blocks

Dividers also work as section breaks between larger blocks of content.

```tsx demo
<Col lg>
  <div>
    <Text fontSemibold lg>Block 1</Text>
    <Text>The first block introduces the topic and sets context for the sections that follow.</Text>
  </div>
  <Divider />
  <div>
    <Text fontSemibold lg>Block 2</Text>
    <Text>The second block expands on the idea, with the divider providing a clear visual break.</Text>
  </div>
  <Divider />
  <div>
    <Text fontSemibold lg>Block 3</Text>
    <Text>The third block closes out the sequence, demonstrating consistent rhythm throughout.</Text>
  </div>
</Col>
```
