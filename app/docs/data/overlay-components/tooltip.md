---
componentKey: tooltip
importPath: 'import { Tooltip } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/tooltip/Tooltip.tsx
since: 1.1.0
---

## Basic usage

Tooltip labels its trigger with a short hint on hover and on keyboard focus. Pass the trigger as the child and the hint as `content`.

```tsx demo
<Tooltip content="Saves without leaving the page">
  <Button>Save</Button>
</Tooltip>
```

The trigger must accept a ref, which every VaneUI component does.

Tooltip's own props are the ones listed under Advanced props below. The size, shape, variant and appearance props in the table further down belong to the frame it renders, so they are set through `popupProps` rather than on `Tooltip` itself.

## Keyboard and pointer

A tooltip that only opens on hover is invisible to keyboard users, so Tooltip opens on focus too. Tab to the second button to see it.

```tsx demo
<Row flexWrap>
  <Tooltip content="Opens on hover">
    <Button secondary>Hover me</Button>
  </Tooltip>
  <Tooltip content="Opens on focus as well">
    <Button secondary>Tab to me</Button>
  </Tooltip>
</Row>
```

## Placement

Placement comes from the underlying Popup, so all twelve `place*` props are available through `popupProps`.

```tsx demo
<Row flexWrap>
  <Tooltip content="Above" popupProps={{ placeTop: true }}>
    <Button sm>Top</Button>
  </Tooltip>
  <Tooltip content="Below" popupProps={{ placeBottom: true }}>
    <Button sm>Bottom</Button>
  </Tooltip>
  <Tooltip content="To the right" popupProps={{ placeRight: true }}>
    <Button sm>Right</Button>
  </Tooltip>
</Row>
```

## Styling the tooltip frame

Size, shape, variant and appearance belong to the frame, which is a `Popup`, so they go through `popupProps` rather than onto `Tooltip` itself. Tooltip defaults the frame to `sm`, `rounded`, `filled` and `secondary`.

```tsx demo
<Row flexWrap>
  <Tooltip content="sm filled secondary, the default">
    <Button>default</Button>
  </Tooltip>
  <Tooltip content="Large frame" popupProps={{ lg: true }}>
    <Button>lg</Button>
  </Tooltip>
  <Tooltip content="Sharp corners" popupProps={{ sharp: true }}>
    <Button>sharp</Button>
  </Tooltip>
  <Tooltip content="Outline danger" popupProps={{ outline: true, danger: true, border: true }}>
    <Button>outline danger</Button>
  </Tooltip>
</Row>
```

## Delays

`openDelay` keeps tooltips from flashing as the pointer crosses the screen; `closeDelay` gives the user time to move onto the tooltip itself.

```tsx demo
<Row flexWrap>
  <Tooltip content="Appears at once" openDelay={0}>
    <Button sm>No delay</Button>
  </Tooltip>
  <Tooltip content="Waits half a second" openDelay={500}>
    <Button sm>Slow</Button>
  </Tooltip>
</Row>
```

## Accessibility

A tooltip describes its trigger, so while it is open the trigger carries `aria-describedby` pointing at it. It never gets `aria-haspopup` or `aria-expanded`, because those describe a disclosure, not a description, and there is no `haspopup` value for tooltips.

Keep the content short and non-essential. Anything the user must read to complete a task belongs in the page, not behind a hover.

## Icon-only triggers

The most common use: explaining a control that has no visible label.

```tsx demo
<Row itemsCenter>
  <Text sm>API key</Text>
  <Tooltip content="Rotating the key invalidates the old one immediately">
    <IconButton sm secondary aria-label="About API keys">?</IconButton>
  </Tooltip>
</Row>
```
