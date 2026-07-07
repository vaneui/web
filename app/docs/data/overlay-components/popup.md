---
componentKey: popup
importPath: 'import { Popup } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/popup/Popup.tsx
since: 0.9.0
---

Popup ships its own surface defaults: `md`, `flex column`, `padding`, `gap`, `rounded`, `border`, `shadow`, `primary`, `outline`, `wFit`, `maxHeight`, `overflowAuto`, `bottom`. Render children directly. Wrapping content in another `Card` is usually redundant.

> **Browser support:** Popup uses the CSS Anchor Positioning API (Chrome/Edge 129+, for the `span-*` alignment it relies on). Other browsers fall back to a JS positioning path that recomputes on scroll/resize.

## Basic usage

A controlled floating element anchored to a button. Closes on outside click or `Escape`. Pass an `anchorRef` pointing at the trigger element.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle</Button>
<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <Text>Popup content</Text>
</Popup>
```

## Uncontrolled with `defaultOpen`

Skip `open`/`onClose` and let Popup manage its own state. Use `onOpenChange` to react to opens/closes without owning the state.

```tsx
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef}>Trigger</Button>
<Popup defaultOpen anchorRef={anchorRef} onOpenChange={(o) => console.log(o)}>
  <Text>Uncontrolled popup</Text>
</Popup>
```

## PopupTrigger (click)

`PopupTrigger` is a convenience wrapper that manages open/close state and ref wiring automatically. No `useState` or `useRef` needed: wrap the trigger element and provide popup content via the `popup` prop. Default trigger mode is `"click"`.

```tsx
<PopupTrigger popup={<Text sm>Click-triggered popup</Text>}>
  <Button>Click Me</Button>
</PopupTrigger>
```

## PopupTrigger (hover)

Set `triggerOnHover` to show on mouse enter and hide on mouse leave. `openDelay` (default `0`) delays appearance; `closeDelay` (default `150`) delays dismissal so the user can move the cursor over the popup. Keyboard focus also opens it for accessibility.

```tsx
<PopupTrigger
  triggerOnHover
  openDelay={200}
  popup={<Text sm>Tooltip text</Text>}
>
  <Button>Hover Me</Button>
</PopupTrigger>
```

## PopupTrigger (focus)

Set `triggerOnFocus` to show on focus and hide on blur. Useful for search autocomplete, input hints, and dropdown suggestions.

```tsx
<PopupTrigger
  triggerOnFocus
  popup={<Text sm>Search suggestions...</Text>}
>
  <Input placeholder="Search..." />
</PopupTrigger>
```

## All 12 placements

Placement is set via boolean props: `top`, `topStart`, `topEnd`, `bottom`, `bottomStart`, `bottomEnd`, `left`, `leftStart`, `leftEnd`, `right`, `rightStart`, `rightEnd`. Exactly one wins (first-truthy per category). Default is `bottom`.

```tsx
const ref = useRef<HTMLButtonElement>(null);
const [open, setOpen] = useState(false);

<Button ref={ref} onClick={() => setOpen(!open)}>Anchor</Button>

{/* Above the anchor, aligned to the anchor's left edge */}
<Popup topStart open={open} onClose={() => setOpen(false)} anchorRef={ref}>
  <Text>Top Start</Text>
</Popup>

{/* Centered to the right of the anchor */}
<Popup right open={open} onClose={() => setOpen(false)} anchorRef={ref}>
  <Text>Right</Text>
</Popup>

{/* Below the anchor, aligned to the anchor's right edge */}
<Popup bottomEnd open={open} onClose={() => setOpen(false)} anchorRef={ref}>
  <Text>Bottom End</Text>
</Popup>
```

When the requested placement would overflow the viewport, Popup falls back through `flip-block → flip-inline → shift → clamp` and exposes the resolved placement via the `data-placement` attribute.

## Match anchor width

`matchWidth` makes the popup track the anchor's width, useful for select-like dropdowns. It sets the popup width to the anchor's width, overriding the default `wFit`.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)} wFull>Select option</Button>
<Popup matchWidth open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <Text>Same width as the anchor</Text>
</Popup>
```

## Rich content

Children render directly inside the Popup surface. Use layout primitives (`Col`, `Row`, `Stack`) to compose multi-element content. Avoid nesting another `Card` inside; Popup already provides the bordered, padded, shadowed surface.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Account</Button>
<Popup open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <Text bold>User Menu</Text>
  <Divider />
  <Button>Profile</Button>
  <Button danger>Sign Out</Button>
</Popup>
```

## Tooltip pattern

Pair `triggerOnHover` with `arrow` for a classic tooltip. The arrow auto-rotates to match the resolved placement.

```tsx
<PopupTrigger
  triggerOnHover
  openDelay={300}
  popupProps={{ top: true, arrow: true, role: "tooltip", sm: true }}
  popup={<Text sm>Save your changes to the server</Text>}
>
  <Button>Save</Button>
</PopupTrigger>
```

## Dropdown via Popup

Popup is a low-level primitive. For action menus with keyboard navigation, focus management, and item semantics, prefer the dedicated [`Menu`](./menu) component. It wraps Popup and adds `MenuItem`/`MenuLabel` with full arrow-key navigation. Reach for raw `Popup` only when you need a non-menu surface (filter panels, custom autocompletes, info cards).

```tsx
<PopupTrigger popup={
  <>
    <Button transparent justifyStart>Edit</Button>
    <Button transparent justifyStart>Duplicate</Button>
    <Divider />
    <Button transparent justifyStart danger>Delete</Button>
  </>
}>
  <Button>Actions</Button>
</PopupTrigger>
```

## Arrow indicator

Set `arrow` to render a pointer that visually links the popup to its anchor. The arrow is positioned automatically based on the resolved placement.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Toggle Arrow Popup</Button>
<Popup arrow open={open} onClose={() => setOpen(false)} anchorRef={anchorRef}>
  <Text sm>Arrow points at the anchor.</Text>
</Popup>
```

## Click-outside behavior

By default, clicking anywhere outside the popup or anchor closes it. Set `closeOnClickOutside={false}` to require an explicit dismiss (e.g., a close button inside the popup). `closeOnEscape={false}` similarly disables the keyboard dismiss.

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(true)}>Open Sticky Popup</Button>
<Popup
  open={open}
  onClose={() => setOpen(false)}
  anchorRef={anchorRef}
  closeOnClickOutside={false}
  closeOnEscape={false}
>
  <Text>Stays open until dismissed.</Text>
  <Button sm onClick={() => setOpen(false)}>Close</Button>
</Popup>
```

## Disabled trigger

Set `disabled` on `Popup` (or `PopupTrigger`) to suppress opening regardless of `open` state. Useful for conditional UI where the trigger remains rendered but inactive.

```tsx
<PopupTrigger disabled popup={<Text>Hidden</Text>}>
  <Button disabled>Cannot open</Button>
</PopupTrigger>
```

## Advanced props

`Popup` supports additional configuration props:

| Prop | Default | Description |
|------|---------|-------------|
| `offset` | `4` | Distance from anchor in pixels |
| `closeOnEscape` | `true` | Close on `Escape` key press |
| `closeOnClickOutside` | `true` | Close when clicking outside the popup or anchor |
| `portal` | `true` | Render via portal into `document.body` |
| `keepMounted` | `false` | Keep DOM node mounted when closed |
| `noAnimation` | `false` | Disable enter/exit transitions |
| `transitionDuration` | `200` | Animation duration in ms |
| `disabled` | `false` | Prevent popup from opening |
| `hideWhenDetached` | `false` | Hide when anchor scrolls out of view (uses `IntersectionObserver`) |
| `role` | `"dialog"` | ARIA role (set `"tooltip"` for tooltip patterns) |
| `arrow` | `false` | Render arrow pointer |
| `onEnterComplete` |   | Called when the enter transition finishes |
| `onExitComplete` |   | Called when the exit transition finishes |

`PopupTrigger` additionally accepts:

| Prop | Default | Description |
|------|---------|-------------|
| `triggerOnClick` | `true` (when no other trigger set) | Toggle on click |
| `triggerOnHover` | `false` | Open on mouse enter / focus |
| `triggerOnFocus` | `false` | Open on focus only |
| `openDelay` | `0` | ms before opening on hover |
| `closeDelay` | `150` | ms before closing on hover-out |
| `popupProps` |   | Props forwarded to the internal `Popup` |
| `popupId` | auto | Override generated id for `aria-controls` |

```tsx
const [open, setOpen] = useState(false);
const anchorRef = useRef<HTMLButtonElement>(null);

<Button ref={anchorRef} onClick={() => setOpen(!open)}>Custom Config</Button>
<Popup
  open={open}
  onClose={() => setOpen(false)}
  anchorRef={anchorRef}
  offset={8}
  noAnimation
  closeOnEscape={false}
>
  <Text>Custom config</Text>
</Popup>
```
