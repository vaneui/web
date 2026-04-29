---
componentKey: overlay
importPath: 'import { Overlay } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/overlay.tsx
since: 0.9.0
---

A fullscreen backdrop overlay for creating modal backgrounds, loading screens, and lightbox effects. Renders via portal with click-to-close and optional blur.

## Basic Overlay

A fullscreen semi-transparent backdrop. Click the overlay to close it.

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show Overlay</Button>
<Overlay open={open} onClose={() => setOpen(false)}>
  <Text>Click anywhere to close</Text>
</Overlay>
```

## Overlay with Content

Place content inside the overlay. Use `e.stopPropagation()` on inner elements to prevent closing when clicking them.

```tsx
<Overlay open={open} onClose={() => setOpen(false)}>
  <Card onClick={(e) => e.stopPropagation()}>
    <Text>Overlay content here</Text>
  </Card>
</Overlay>
```

## Blur Effect

Add `blur` for a backdrop-filter blur effect behind the overlay.

```tsx
<Overlay open={open} onClose={() => setOpen(false)} blur>
  <Text>Blurred Background</Text>
</Overlay>
```

## Non-dismissible Overlay

Use `pointerEventsNone` for loading states where the overlay should not be closable by clicking.

```tsx
<Overlay open={open} pointerEventsNone>
  <Text>Loading...</Text>
</Overlay>
```

## Transparent Overlay

Use the `transparent` prop to create an invisible overlay that still captures clicks. This is useful for click-away dismissal without visually dimming the page background.

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show Transparent Overlay</Button>
<Overlay open={open} onClose={() => setOpen(false)} transparent>
  <Card>
    <Text>Content on a transparent overlay</Text>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Card>
</Overlay>
```

## Custom Animation Duration

Control how the overlay transitions in and out. Use `transitionDuration` to set a custom duration in milliseconds (default is 200ms), or use `noAnimation` to disable transitions entirely for an instant open/close.

```tsx
{/* Slow fade — 500ms */}
<Overlay open={open} onClose={onClose} transitionDuration={500}>
  <Card>Slow transition content</Card>
</Overlay>

{/* Instant — no animation */}
<Overlay open={open} onClose={onClose} noAnimation>
  <Card>Instant content</Card>
</Overlay>
```
