---
componentKey: menu
importPath: 'import { Menu } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/menu/Menu.tsx
since: 0.9.0
---

## Basic usage

A dropdown menu triggered by a button. Pass the trigger as a React element via the `trigger` prop; children are the menu contents. Includes full keyboard navigation (Arrow keys, Enter, Escape, Tab) and focus management with a keyboard-visible outline on each item. Focus returns to the trigger when the menu closes.

```tsx
import { Menu, MenuItem, Button } from "@vaneui/ui";

<Menu trigger={<Button>Actions</Button>}>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <MenuItem>Share</MenuItem>
</Menu>
```

## Labels and dividers

Use `MenuLabel` for section headings and `Divider` for visual separators between groups. `Divider` automatically picks up the Menu's size via the menu-divider sub-theme.

```tsx
<Menu trigger={<Button>Account</Button>}>
  <MenuLabel>Account</MenuLabel>
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
  <Divider />
  <MenuLabel>Workspace</MenuLabel>
  <MenuItem>Members</MenuItem>
  <MenuItem>Billing</MenuItem>
  <Divider />
  <MenuItem>Sign out</MenuItem>
</Menu>
```

## Items with icons

Place SVG icons directly inside `MenuItem`. They are automatically flex-aligned and pointer-events-disabled so clicks pass through to the item.

```tsx
import { Edit, Copy, Trash2 } from "react-feather";

<Menu trigger={<Button>File</Button>}>
  <MenuItem><Edit size={14} /> Edit</MenuItem>
  <MenuItem><Copy size={14} /> Duplicate</MenuItem>
  <Divider />
  <MenuItem danger><Trash2 size={14} /> Delete</MenuItem>
</Menu>
```

## Destructive item

Use the `danger` appearance prop on a `MenuItem` to flag a destructive action. Combine with a `Divider` to visually separate it from safe actions.

```tsx
<Menu trigger={<Button>Manage</Button>}>
  <MenuItem>Rename</MenuItem>
  <MenuItem>Archive</MenuItem>
  <Divider />
  <MenuItem danger>Delete permanently</MenuItem>
</Menu>
```

## Item appearances

Any appearance prop works on `MenuItem` for semantic coloring of individual actions.

```tsx
<Menu trigger={<Button>Review</Button>}>
  <MenuItem success>Approve</MenuItem>
  <MenuItem warning>Request changes</MenuItem>
  <MenuItem danger>Reject</MenuItem>
</Menu>
```

## Disabled items

Set `disabled` on a `MenuItem` to prevent interaction. Disabled items are skipped during keyboard navigation and announced via `aria-disabled`.

```tsx
<Menu trigger={<Button>Edit</Button>}>
  <MenuItem>Undo</MenuItem>
  <MenuItem disabled>Redo</MenuItem>
  <Divider />
  <MenuItem>Cut</MenuItem>
  <MenuItem>Copy</MenuItem>
  <MenuItem disabled>Paste</MenuItem>
</Menu>
```

## Items as links

Pass `href` to render a `MenuItem` as an anchor tag. For client-side navigation in a Next.js app, also pass `tag={Link}`.

```tsx
<Menu trigger={<Button>Navigate</Button>}>
  <MenuItem href="/settings">Settings</MenuItem>
  <MenuItem href="/profile">Profile</MenuItem>
  <Divider />
  <MenuItem href="https://github.com" target="_blank">GitHub</MenuItem>
</Menu>
```

## Sizes

Set a size on `Menu` (e.g. `<Menu lg>`) and the dropdown popup, every `MenuItem`, `MenuLabel`, and nested `Divider` scale together automatically. No need to repeat the size on every child. Items render with larger font-size and padding, the popup frame lifts its inner padding, and dividers match. Individual children can still override with their own size prop.

```tsx
<Menu lg trigger={<Button lg>Actions</Button>}>
  <MenuLabel>Actions</MenuLabel>
  <MenuItem>Edit</MenuItem>
  <Divider />
  <MenuItem danger>Delete</MenuItem>
</Menu>
```

## Controlled state

Pass `open` and `onOpenChange` to drive the menu from outside state. Useful when you need to open the menu programmatically or react to its state.

```tsx
const [open, setOpen] = useState(false);

<Menu
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Menu ({open ? "open" : "closed"})</Button>}
>
  <MenuItem onClick={() => console.log("Edit")}>Edit</MenuItem>
  <MenuItem closeMenuOnClick={false}>Stay open on click</MenuItem>
  <MenuItem>Close on click (default)</MenuItem>
</Menu>
```

## Advanced props

Menu supports additional configuration for fine-tuning behavior:

| Prop | Default | Description |
|------|---------|-------------|
| `open` |   | Controlled open state |
| `defaultOpen` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` |   | Called when open state changes |
| `onClose` |   | Called when the menu closes |
| `closeOnItemClick` | `true` | Close menu when any item is clicked |
| `loop` | `true` | Loop keyboard navigation from last to first |
| `disabled` | `false` | Prevent menu from opening |
| `transitionDuration` | `150` | Animation duration in ms |

`MenuItem` also accepts:

| Prop | Default | Description |
|------|---------|-------------|
| `closeMenuOnClick` | inherits | Override the menu-level `closeOnItemClick` for this item |
| `href` |   | Render as anchor tag |
| `disabled` | `false` | Prevent interaction |
| `focusVisible` | `true` | Render a keyboard focus-visible outline |
| `noFocusVisible` |   | Disable the keyboard focus-visible outline |
