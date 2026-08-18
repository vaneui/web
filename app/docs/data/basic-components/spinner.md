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

```tsx demo
<Row itemsCenter flexWrap>
  <Spinner primary aria-label="Loading"/>
  <Spinner secondary aria-label="Loading"/>
  <Spinner success aria-label="Loading"/>
  <Spinner danger aria-label="Loading"/>
</Row>
```

## Inline with text

Because the ring is sized in em, it matches the surrounding text without any manual tuning.

```tsx demo
<Row itemsCenter>
  <Spinner sm aria-label="Loading"/>
  <Text sm secondary>Checking availability…</Text>
</Row>
```

## Inside a Button

Button has its own `loading` prop, which swaps the label for a spinner and keeps the button's width, so the layout does not jump.

```tsx demo
<Row flexWrap>
  <Button loading>Saving</Button>
  <Button filled loading>Saving</Button>
</Row>
```

Spinner honours `prefers-reduced-motion`: the animation stops for users who ask for less motion.
