---
componentKey: menu
importPath: 'import { Menu } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/menu.tsx
since: 0.9.0
---

A dropdown menu triggered by a button with full keyboard navigation. Contains MenuItem, Divider, and MenuLabel subcomponents.

## Basic Menu

A dropdown menu triggered by a button. Pass the trigger as a React element via the `trigger` prop; children are the menu contents. Includes full keyboard navigation (Arrow keys, Enter, Escape) and focus management.

```tsx
import { Menu, MenuItem, Button } from "@vaneui/ui";

<Menu trigger={<Button>Actions</Button>}>
  <MenuItem>Edit</MenuItem>
  <MenuItem>Duplicate</MenuItem>
  <MenuItem>Share</MenuItem>
</Menu>
```

## Labels & Separators

Use `MenuLabel` for section headings and `Divider` for visual dividers between groups.

```tsx
<Menu trigger={<Button>Account</Button>}>
  <MenuLabel>Account</MenuLabel>
  <MenuItem>Profile</MenuItem>
  <MenuItem>Settings</MenuItem>
  <Divider />
  <MenuLabel>Actions</MenuLabel>
  <MenuItem>Export data</MenuItem>
  <MenuItem danger>Delete account</MenuItem>
</Menu>
```

## Items with Icons

Place SVG icons directly inside `MenuItem` — they are automatically flex-aligned and pointer-events-disabled.

```tsx
import { Edit, Copy, Trash2 } from "react-feather";

<Menu trigger={<Button>File</Button>}>
  <MenuItem><Edit size={14} /> Edit</MenuItem>
  <MenuItem><Copy size={14} /> Copy</MenuItem>
  <Divider />
  <MenuItem danger><Trash2 size={14} /> Delete</MenuItem>
</Menu>
```

## Item Appearances

Apply appearance props to individual items for semantic coloring.

```tsx
<MenuItem success>Approve</MenuItem>
<MenuItem warning>Archive</MenuItem>
<MenuItem danger>Delete permanently</MenuItem>
```

## Disabled Items

Set `disabled` on a `MenuItem` to prevent interaction. Disabled items are skipped during keyboard navigation.

```tsx
<MenuItem disabled>Disabled action</MenuItem>
```

## Items as Links

Pass `href` to render a `MenuItem` as an anchor tag for navigation.

```tsx
<MenuItem href="/settings">Settings</MenuItem>
<MenuItem href="https://github.com" target="_blank">GitHub</MenuItem>
```

## Menu Sizes

Set a size on `Menu` (e.g. `<Menu lg>`) and the dropdown popup, every `MenuItem`, `MenuLabel`, and nested `Divider` scale together automatically — no need to repeat the size on every child. Items render with larger font-size and padding, the popup frame lifts its inner padding, and dividers match. Individual children can still override with their own size prop.

```tsx
<Menu lg trigger={<Button lg>Actions</Button>}>
  <MenuLabel>Actions</MenuLabel>
  <MenuItem>Edit</MenuItem>
  <Divider />
  <MenuItem danger>Delete</MenuItem>
</Menu>
```

## Advanced Props

Menu supports additional configuration for fine-tuning behavior:

| Prop | Default | Description |
|------|---------|-------------|
| `open` | — | Controlled open state |
| `defaultOpen` | `false` | Initial open state (uncontrolled) |
| `onOpenChange` | — | Called when open state changes |
| `onClose` | — | Called when the menu closes |
| `closeOnItemClick` | `true` | Close menu when any item is clicked |
| `loop` | `true` | Loop keyboard navigation from last to first |
| `disabled` | `false` | Prevent menu from opening |
| `transitionDuration` | `150` | Animation duration in ms |

`MenuItem` also accepts:

| Prop | Default | Description |
|------|---------|-------------|
| `closeMenuOnClick` | inherits | Override the menu-level `closeOnItemClick` for this item |
| `href` | — | Render as anchor tag |
| `disabled` | `false` | Prevent interaction |

```tsx
{/* Controlled menu */}
const [open, setOpen] = useState(false);
<Menu open={open} onOpenChange={setOpen} trigger={<Button>Menu</Button>}>
  <MenuItem closeMenuOnClick={false}>Keep open on click</MenuItem>
  <MenuItem>Close on click (default)</MenuItem>
</Menu>
```
