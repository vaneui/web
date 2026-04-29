---
componentKey: popup
importPath: 'import { Popup } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/popup.tsx
since: 0.9.0
---

A floating element anchored to a trigger element using CSS Anchor Positioning. Supports 12 placement options, width matching, and click-outside dismissal.

## Basic Popup

A floating element anchored to a button. Closes on outside click or Escape.

> **Browser support:** Popup uses the CSS Anchor Positioning API (Chrome 125+, Edge 125+). Other browsers may need a polyfill.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle</Button>
<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <Card>Popup content</Card>
</Popup>
```

## Placement Options

Use the `placement` prop to position the popup. Supports `top`, `bottom`, `left`, `right` and their `-start`/`-end` variants (12 total). Default is `bottom-start`.

```tsx
<Popup placement="top" anchorRef={ref} open={open} onClose={onClose}>
  <Card>Top placement</Card>
</Popup>
```

## Match Anchor Width

Use `matchWidth` to make the popup match the width of its anchor element. Useful for select-like dropdowns.

```tsx
<Popup matchWidth anchorRef={ref} open={open} onClose={onClose}>
  <Card>Same width as anchor</Card>
</Popup>
```

## Popup with Rich Content

Popups can contain any content including cards, buttons, and other components.

```tsx
<Popup anchorRef={ref} open={open} onClose={onClose}>
  <Card shadow>
    <Stack>
      <Text bold>User Menu</Text>
      <Button>Profile</Button>
      <Button danger>Sign Out</Button>
    </Stack>
  </Card>
</Popup>
```

## PopupTrigger (Click)

`PopupTrigger` is a convenience wrapper that manages open/close state and ref wiring automatically. No need for `useState` or `useRef` — just wrap your trigger element and provide the popup content.

The default trigger mode is `"click"`, which toggles the popup on click.

```tsx
import { PopupTrigger, Button, Card, Text } from "@vaneui/ui";

<PopupTrigger popup={<Card sm shadow><Text sm>Click-triggered popup</Text></Card>}>
  <Button>Click Me</Button>
</PopupTrigger>
```

## PopupTrigger (Hover)

Set `triggerOnHover` to show the popup on mouse enter and hide it on mouse leave. Use `openDelay` to add a delay (in milliseconds) before the popup appears, and `closeDelay` (default: 150ms) before it disappears. This is useful for tooltip-like behavior.

```tsx
<PopupTrigger
  triggerOnHover
  openDelay={200}
  popup={<Card sm shadow><Text sm>Tooltip text</Text></Card>}
>
  <Button>Hover Me</Button>
</PopupTrigger>
```

## PopupTrigger (Focus)

Set `triggerOnFocus` to show the popup when the trigger element receives focus and hide it on blur. Useful for search autocomplete, input hints, and accessible dropdown suggestions.

```tsx
<PopupTrigger
  triggerOnFocus
  popup={<Card sm shadow><Text sm>Search suggestions...</Text></Card>}
>
  <Input placeholder="Search..." />
</PopupTrigger>
```

## Popup with Arrow

Use the `arrow` prop to display a small pointer/arrow on the popup that visually connects it to its anchor element. This is especially useful for tooltip-style popups where you want a clear visual link between the trigger and content.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Arrow Popup</Button>
<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef} arrow>
  <Card sm shadow>
    <Text sm>This popup has an arrow pointing to its anchor.</Text>
  </Card>
</Popup>
```

## All 12 Placements

Popup supports 12 placement positions via boolean props: `top`, `topStart`, `topEnd`, `bottom`, `bottomStart`, `bottomEnd`, `left`, `leftStart`, `leftEnd`, `right`, `rightStart`, `rightEnd`. Each prop positions the popup relative to the anchor element.

```tsx
{/* Position above, aligned to start */}
<Popup topStart anchorRef={ref} open={open} onClose={onClose}>
  <Card>Top Start</Card>
</Popup>

{/* Position to the right, centered */}
<Popup right anchorRef={ref} open={open} onClose={onClose}>
  <Card>Right</Card>
</Popup>
```

## Advanced Props

Popup supports additional configuration props for fine-tuning behavior:

| Prop | Default | Description |
|------|---------|-------------|
| `offset` | `4` | Distance from anchor in pixels |
| `closeOnEscape` | `true` | Close on Escape key press |
| `closeOnClickOutside` | `true` | Close when clicking outside |
| `portal` | `true` | Render in a portal (document.body) |
| `keepMounted` | `false` | Keep DOM node when closed |
| `noAnimation` | `false` | Disable enter/exit transitions |
| `transitionDuration` | `200` | Animation duration in ms |
| `disabled` | `false` | Prevent popup from opening |
| `hideWhenDetached` | `false` | Hide when anchor scrolls out of view |
| `role` | `"dialog"` | ARIA role for accessibility |

```tsx
<Popup
  open={open}
  onClose={onClose}
  anchorRef={ref}
  offset={8}
  noAnimation
  closeOnEscape={false}
>
  <Card>Custom config</Card>
</Popup>
```
