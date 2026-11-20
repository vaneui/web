---
componentKey: alert
importPath: 'import { Alert } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/alert/Alert.tsx
since: 1.1.0
---

Alert shows messages such as a save confirmation, a failed payment or an upload error. It renders a full-width `<div>` laid out as a flex row, in the `info` appearance unless another is set. A note that is part of the page from the first render fits a [Card](/docs/layout-components/card), and an error about one input fits the `error` prop of [Field](/docs/form-components/field). A message the user must answer before continuing belongs in a [Modal](/docs/overlay-components/modal).

## Basic usage

Alert is a live region: assistive technology announces its content when it appears, without the user having to find it. Use it for messages that result from something the user just did.

```tsx demo
<Alert>Scheduled maintenance starts at 02:00 UTC.</Alert>
```

By default it renders `role="alert"`, which interrupts. For a message that can wait for a natural pause, use `polite`, which renders `role="status"`.

```tsx demo
<Alert polite success>Your changes were saved.</Alert>
```

Render an Alert only when the message appears. An Alert present on first paint is not announced, because a live region announces changes, not initial content.

## Appearances

```tsx demo
<Col>
  <Alert info>A new version is available.</Alert>
  <Alert success polite>Your changes were saved.</Alert>
  <Alert warning>Your trial ends in three days.</Alert>
  <Alert danger>Payment failed. Update your card to continue.</Alert>
</Col>
```

## Variants

```tsx demo
<Col>
  <Alert danger>Outline, the default.</Alert>
  <Alert danger filled>Filled, for the loudest messages.</Alert>
</Col>
```

## With a title and actions

A `Text`, `Col`, `Stack` or `Row` placed directly in an Alert takes the free width of the row, so a `Button` after the message sits at the end edge. `itemsCenter` centres the button on a short message.

```tsx demo
<Alert warning itemsCenter>
  <Col noGap>
    <Text fontSemibold>Your trial ends in three days</Text>
    <Text sm>Add a payment method to keep your projects running.</Text>
  </Col>
  <Button warning filled>Add card</Button>
</Alert>
```

For a message of several lines, or more than one button, put the buttons in the `Col`, under the text.

```tsx demo
<Alert danger>
  <Col>
    <Col noGap>
      <Text fontSemibold>Payment failed</Text>
      <Text sm>The card ending in 4242 was declined. Update the card or try another payment method. Your projects keep running for seven days.</Text>
    </Col>
    <Row>
      <Button danger filled>Update card</Button>
      <Button danger ghost>Contact support</Button>
    </Row>
  </Col>
</Alert>
```

## With an icon

A leading icon spans one text line, so it centres on the first line of the message. The Alert sets its width from the size prop: 20px at `md`. An icon with a `size-*` class keeps that size.

```tsx demo
<Alert info>
  <Info />
  A new version is available. Reload to update.
</Alert>
```

## Font family

Alert text renders in the sans font (`fontSans`, the default) with body line-height, even when the page uses another font. Pass `fontMono` for a machine-style message.

```tsx demo
<Alert danger fontMono>Error 503: upstream connect error</Alert>
```

## Shapes

Alert is `rounded` by default. `sharp` suits an alert pinned to the edge of a panel, where a radius would leave a gap against the edge.

```tsx demo
<Col>
  <Alert>Rounded, the default</Alert>
  <Alert sharp>Sharp</Alert>
  <Alert pill>Pill</Alert>
</Col>
```

## Sizes

The size prop sets the text, radius, padding, gap and icon together. Alert text runs one step below body text, so `md` renders 14px text, and the radius matches an Input of the same size.

| Size | Text | Radius | Padding | Gap | Icon |
|------|------|--------|---------|-----|------|
| `xs` | 12px | 6px | 8px | 6px | 17px |
| `sm` | 13px | 7px | 12px | 8px | 19px |
| `md` | 14px | 8px | 16px | 12px | 20px |
| `lg` | 16px | 10px | 20px | 16px | 23px |
| `xl` | 18px | 12px | 24px | 20px | 26px |

```tsx demo
<Col>
  <Alert xs>Extra small</Alert>
  <Alert sm>Small</Alert>
  <Alert>Medium, the default</Alert>
  <Alert lg>Large</Alert>
  <Alert xl>Extra large</Alert>
</Col>
```
