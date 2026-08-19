---
componentKey: spinner
importPath: 'import { Spinner } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/spinner/Spinner.tsx
since: 1.1.0
---

## Basic usage

Spinner indicates that something is in progress. Give it an `aria-label` so the busy state has a name, since the ring itself carries no text.

```tsx demo
<Spinner aria-label="Loading"/>
```

It renders `role="status"`, so assistive technology announces the label when the spinner appears.

## Sizes

The ring is one em square, so it scales with the size prop and lines up with text of the same size.

```tsx demo
<Row itemsCenter flexWrap>
  <Spinner xs aria-label="Loading"/>
  <Spinner sm aria-label="Loading"/>
  <Spinner aria-label="Loading"/>
  <Spinner lg aria-label="Loading"/>
  <Spinner xl aria-label="Loading"/>
</Row>
```

## Appearances

The ring is drawn in the current text colour, so an appearance prop colours it directly.

```tsx demo
<Row itemsCenter flexWrap>
  <Spinner primary aria-label="Loading"/>
  <Spinner accent aria-label="Loading"/>
  <Spinner secondary aria-label="Loading"/>
  <Spinner tertiary aria-label="Loading"/>
  <Spinner success aria-label="Loading"/>
  <Spinner danger aria-label="Loading"/>
  <Spinner warning aria-label="Loading"/>
  <Spinner info aria-label="Loading"/>
</Row>
```

## Variants

An appearance only becomes a colour through a variant, so Spinner carries the same `outline` / `filled` / `ghost` axis as everything else. It has no background of its own, so the variant does one thing here: it picks which colour of the appearance the ring paints in.

`outline`, the default, uses the appearance's own colour, for a spinner on a plain surface. `filled` uses the "on this fill" colour, for a spinner sitting on a filled surface of the same appearance.

```tsx demo
<Col>
  <Row itemsCenter flexWrap>
    <Spinner danger aria-label="Loading"/>
    <Spinner success aria-label="Loading"/>
    <Spinner info aria-label="Loading"/>
  </Row>
  <Row flexWrap>
    <Card danger filled wFit><Spinner danger filled aria-label="Loading"/></Card>
    <Card success filled wFit><Spinner success filled aria-label="Loading"/></Card>
    <Card info filled wFit><Spinner info filled aria-label="Loading"/></Card>
  </Row>
</Col>
```

Most of the time you do not need either. With no appearance prop the Spinner inherits the colour of whatever it sits in, which is what makes it readable inside a filled Badge, Card or Button without being told anything.

```tsx demo
<Row itemsCenter flexWrap>
  <Badge info filled><Spinner xs aria-label="Loading"/> Syncing</Badge>
  <Card sm filled secondary wFit>
    <Row itemsCenter>
      <Spinner sm aria-label="Loading"/>
      <Text sm>Rebuilding index</Text>
    </Row>
  </Card>
</Row>
```

Setting an appearance that matches the surface you are on is the one thing to avoid: `<Spinner secondary>` inside a `secondary filled` Card resolves to the outline colour, which is the surface's own colour, so the ring disappears.

## Button loading state

`Button` and `IconButton` render this same component for their `loading` prop, so there is one spinner in the library and restyling `theme.spinner` restyles both. The button forwards its own size, and the ring inherits the button's text colour, so a filled button gets a light ring and an outline button a dark one.

It is decorative there rather than a live region: the button already carries `aria-busy`, so the Spinner's `role="status"` is suppressed and the label stays in the accessibility tree behind it.

`loading` also swaps the label for the ring and keeps the button's width, so the layout does not jump.

```tsx demo
<Row flexWrap itemsCenter>
  <Button loading>Saving</Button>
  <Button loading filled danger>Deleting</Button>
  <Button loading lg>Large</Button>
  <IconButton loading aria-label="Refreshing"><RefreshCw/></IconButton>
</Row>
```

Spinner honours `prefers-reduced-motion`: the animation stops for users who ask for less motion.

## Inline with text

Because the ring is sized in em, it matches the surrounding text without any manual tuning.

```tsx demo
<Row itemsCenter>
  <Spinner sm aria-label="Loading"/>
  <Text sm secondary>Checking availability…</Text>
</Row>
```
