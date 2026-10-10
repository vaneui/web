---
componentKey: tooltip
importPath: 'import { Tooltip } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/tooltip/Tooltip.tsx
since: 1.1.0
---

## Basic usage

Tooltip describes its trigger with a short hint on hover and on keyboard focus. Pass the trigger as the child and the hint as `content`. The hint renders as an ink label: near-black in light mode, near-white in dark mode.

```tsx demo
<Tooltip content="Saves without leaving the page">
  <Button>Save</Button>
</Tooltip>
```

The trigger must accept a ref. `Button`, `IconButton`, `Badge`, `Link` and the other element components do.

Tooltip takes [Popup](/docs/overlay-components/popup) props directly (size, appearance, variant, shape, placement, `arrow`, `offset`, `className` and the rest), and they style the label. Its own props are `content`, `open`, `defaultOpen`, `onOpenChange`, `openDelay` (default `300`), `closeDelay` (default `100`), `popupProps`, `popupId` and `disabled`.

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

## Sizes

Tooltip defaults to `sm`. Its text, padding and corner radius follow its own size, `xs` to `xl`, and the text sits one font step under a Button of the same size. The tooltip does not shrink on phones.

```tsx demo
<Row flexWrap>
  <Tooltip xs content="An xs tooltip">
    <Button xs>xs</Button>
  </Tooltip>
  <Tooltip content="An sm tooltip, the default">
    <Button>sm</Button>
  </Tooltip>
  <Tooltip md content="An md tooltip">
    <Button md>md</Button>
  </Tooltip>
  <Tooltip lg content="An lg tooltip">
    <Button lg>lg</Button>
  </Tooltip>
  <Tooltip xl content="An xl tooltip">
    <Button xl>xl</Button>
  </Tooltip>
</Row>
```

## Placement

Tooltip opens above its trigger and flips to the other side when there is no room. All twelve `place*` props from Popup work on `Tooltip` directly, and `arrow` adds a pointer. Top and bottom tooltips stay on screen when the trigger sits at the edge of the viewport.

```tsx demo
<Row flexWrap>
  <Tooltip content="Above">
    <Button>Top</Button>
  </Tooltip>
  <Tooltip placeBottom content="Below">
    <Button>Bottom</Button>
  </Tooltip>
  <Tooltip placeRight content="To the right">
    <Button>Right</Button>
  </Tooltip>
  <Tooltip placeRight arrow content="Points at its trigger">
    <Button>Arrow</Button>
  </Tooltip>
</Row>
```

## Long hints

A long hint wraps inside a width cap that grows with size, from 16 to 32rem across `xs` to `xl` and 20rem at the default `sm`, instead of running across the page.

```tsx demo
<Tooltip content="Archiving moves the conversation out of your inbox. Replies bring it back, and nothing is deleted.">
  <Button secondary>Archive</Button>
</Tooltip>
```

## Color and shape

Appearance, variant and shape props restyle the label. `secondary` restores the gray look of earlier versions.

```tsx demo
<Row flexWrap>
  <Tooltip content="Ink, the default">
    <Button>default</Button>
  </Tooltip>
  <Tooltip secondary content="Gray">
    <Button>secondary</Button>
  </Tooltip>
  <Tooltip danger content="Deletes the project for everyone">
    <Button danger>danger</Button>
  </Tooltip>
  <Tooltip sharp content="Sharp corners">
    <Button>sharp</Button>
  </Tooltip>
  <Tooltip outline danger border content="Outline danger">
    <Button>outline danger</Button>
  </Tooltip>
</Row>
```

To change every tooltip in an app, set the default once on [`ThemeProvider`](/docs/customization/using-theme-provider):

```tsx
<ThemeProvider themeDefaults={{ tooltip: { secondary: true } }}>
  <App />
</ThemeProvider>
```

`popupProps` is still supported and is combined with the direct props, which helps when several tooltips share one props object. Pass one value per category (one size, one appearance, and so on) across the two.

## Delays

`openDelay` keeps tooltips from flashing as the pointer crosses the screen. `closeDelay` gives the pointer time to move onto the tooltip itself.

```tsx demo
<Row flexWrap>
  <Tooltip content="Appears at once" openDelay={0}>
    <Button>No delay</Button>
  </Tooltip>
  <Tooltip content="Waits half a second" openDelay={500}>
    <Button>Slow</Button>
  </Tooltip>
</Row>
```

## Accessibility

A tooltip describes its trigger, so while it is open the trigger carries `aria-describedby` pointing at it. It never gets `aria-haspopup` or `aria-expanded`, because those describe a disclosure, not a description, and there is no `aria-haspopup` value for tooltips.

Keep the content short and non-essential. Anything the user must read to complete a task belongs in the page, not behind a hover.

## Icon-only triggers

A common use is explaining a control that has no visible label.

```tsx demo
<Row>
  <Text sm>API key</Text>
  <Tooltip content="Rotating the key invalidates the old one immediately">
    <IconButton secondary aria-label="About API keys">?</IconButton>
  </Tooltip>
</Row>
```
