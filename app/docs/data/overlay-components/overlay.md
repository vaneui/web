---
componentKey: overlay
importPath: 'import { Overlay } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/overlay/Overlay.tsx
since: 0.9.0
---

Overlay ships its own layout defaults: `fixed`, `flex`, `itemsCenter`, `justifyCenter`. It covers the viewport via `inset-0` and reads its `z-index` from a managed stacking context so nested overlays layer correctly. `Modal` provides its own backdrop layer using the same layout defaults.

## Basic usage

A fullscreen semi-transparent backdrop. Click the overlay background to dismiss.


```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Show Overlay</Button>
<Overlay open={open} onClose={() => setOpen(false)}>
  <Text>Click anywhere to close</Text>
</Overlay>
```

## Overlay with content

Place content inside the overlay. Click handlers on the overlay only fire when the event target is the overlay itself, so children receive their own clicks without dismissing the overlay.

```tsx
<Overlay open={open} onClose={() => setOpen(false)}>
  <Card>
    <Text>Overlay content here</Text>
    <Button onClick={() => setOpen(false)}>Close</Button>
  </Card>
</Overlay>
```

## Blur effect

Add `blur` for a backdrop-filter blur behind the overlay. Blur intensity follows the `--overlay-blur` CSS variable.

```tsx
<Overlay open={open} onClose={() => setOpen(false)} blur>
  <Card>
    <Text>Blurred background</Text>
  </Card>
</Overlay>
```

## Custom backdrop appearance

Style the backdrop with appearance + variant + shadow props, or pass a `className` for arbitrary background utilities. The example below uses `danger filled` for a tinted destructive backdrop.

```tsx
<Overlay open={open} onClose={() => setOpen(false)} danger filled shadow>
  <Card>
    <Text>Tinted overlay</Text>
  </Card>
</Overlay>
```

Use `className` for gradients or backgrounds the appearance system doesn't cover:

```tsx
<Overlay
  open={open}
  onClose={() => setOpen(false)}
  className="bg-gradient-to-br from-black/80 to-transparent"
>
  <Card>
    <Text>Custom gradient backdrop</Text>
  </Card>
</Overlay>
```

## Non-dismissible Overlay

Use `pointerEventsNone` for loading states where the overlay should pass clicks through and never close on its own. Useful for full-screen spinners that sit above the page.

```tsx
<Overlay open={loading} pointerEventsNone>
  <Text>Loading...</Text>
</Overlay>
```

## Transparent Overlay

Use `transparent` to create an invisible backdrop that still captures clicks. Useful for click-away dismissal without visually dimming the page.

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

## Foundation for Modal

`Modal` layers a dialog surface over its own portal-rendered backdrop, which handles portaling, backdrop click, and stacking (the same mechanics as `Overlay`). For accessible dialogs with focus trap, scroll lock, and ARIA wiring, prefer `Modal`. Reach for `Overlay` directly when you need a custom backdrop layer (lightbox, loading shade, drawer scrim) without dialog semantics.

```tsx
{/* High-level: use Modal for dialogs */}
<Modal open={open} onClose={() => setOpen(false)}>
  <Text>Accessible dialog with focus trap</Text>
</Modal>

{/* Low-level: use Overlay for custom backdrops */}
<Overlay open={open} onClose={() => setOpen(false)} blur>
  <Img src="/photo.jpg" className="max-h-[90vh]" />
</Overlay>
```

## Portal target

Overlay renders into `document.body` by default via React portal. Set `portal={false}` to render in-place, useful when the overlay must be scoped to a positioned ancestor (e.g., scrim over a single card instead of the whole viewport).

```tsx
<Card relative className="h-64">
  <Text>Parent card</Text>
  <Overlay open={open} onClose={() => setOpen(false)} portal={false} absolute>
    <Text>Scoped to this card</Text>
  </Overlay>
</Card>
```

When `portal={false}` and `absolute` is set, the overlay anchors to the nearest `relative`/`absolute` ancestor instead of the viewport.

## Z-index / stacking

Overlay reads its `z-index` from a managed stacking context (`--z-index`), so multiple overlays stack in mount order automatically. Override per instance via inline style when you need to layer above a specific element (toasts, page chrome).

```tsx
<Overlay
  open={open}
  onClose={() => setOpen(false)}
  style={{ '--z-index': 9999 } as React.CSSProperties}
>
  <Card>
    <Text>Above everything</Text>
  </Card>
</Overlay>
```

## Custom animation duration

Control how the overlay transitions in and out. Use `transitionDuration` to set a custom duration in milliseconds (default `200`), or `noAnimation` to disable transitions entirely for an instant open/close.

```tsx
{/* Slow fade - 500ms */}
<Overlay open={open} onClose={() => setOpen(false)} transitionDuration={500}>
  <Card>Slow transition content</Card>
</Overlay>

{/* Instant - no animation */}
<Overlay open={open} onClose={() => setOpen(false)} noAnimation>
  <Card>Instant content</Card>
</Overlay>
```

## Lifecycle and mounting

| Prop | Default | Description |
|------|---------|-------------|
| `open` | `true` | Whether the overlay is visible |
| `onClose` | - | Called when the overlay is dismissed (backdrop click or `Escape`) |
| `portal` | `true` | Render into `document.body` via React portal |
| `keepMounted` | `false` | Keep DOM mounted when closed (useful for transition state preservation) |
| `noAnimation` | `false` | Disable enter/exit transitions |
| `transitionDuration` | `200` | Animation duration in ms |
| `onEnterComplete` | - | Called when enter transition completes |
| `onExitComplete` | - | Called when exit transition completes |

```tsx
<Overlay
  open={open}
  onClose={() => setOpen(false)}
  keepMounted
  transitionDuration={300}
  onExitComplete={() => console.log('overlay closed')}
>
  <Card>Persistent DOM, custom timing</Card>
</Overlay>
```
