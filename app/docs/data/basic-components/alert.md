---
componentKey: alert
importPath: 'import { Alert } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/alert/Alert.tsx
since: 1.1.0
---

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

Alert is a flex row, so compose whatever the message needs.

```tsx demo
<Alert warning>
  <Col noGap>
    <Text fontSemibold>Your trial ends in three days</Text>
    <Text sm>Add a payment method to keep your projects running.</Text>
  </Col>
  <Button sm warning filled>Add card</Button>
</Alert>
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

```tsx demo
<Col>
  <Alert xs>Extra small</Alert>
  <Alert sm>Small</Alert>
  <Alert>Medium, the default</Alert>
  <Alert lg>Large</Alert>
  <Alert xl>Extra large</Alert>
</Col>
```
