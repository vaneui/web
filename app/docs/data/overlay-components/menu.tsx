'use client'

import { Menu, MenuItem, MenuLabel, Divider, Button } from "@vaneui/ui";
import React from "react";
import { Edit, Copy, Trash2, ChevronDown, ExternalLink, Download, Share2 } from "react-feather";
import { DocsPagePart } from '../../types';

function BasicMenuDemo() {
  return (
    <Menu trigger={<Button>Actions <ChevronDown size={14} /></Button>}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuItem>Share</MenuItem>
    </Menu>
  );
}

function LabelsAndSeparatorsDemo() {
  return (
    <Menu trigger={<Button>Account <ChevronDown size={14} /></Button>}>
      <MenuLabel>Account</MenuLabel>
      <MenuItem>Profile</MenuItem>
      <MenuItem>Settings</MenuItem>
      <Divider />
      <MenuLabel>Actions</MenuLabel>
      <MenuItem>Export data</MenuItem>
      <MenuItem danger>Delete account</MenuItem>
    </Menu>
  );
}

function IconMenuDemo() {
  return (
    <Menu trigger={<Button>File <ChevronDown size={14} /></Button>}>
      <MenuItem><Edit size={14} /> Edit</MenuItem>
      <MenuItem><Copy size={14} /> Copy</MenuItem>
      <MenuItem><Download size={14} /> Download</MenuItem>
      <MenuItem><Share2 size={14} /> Share</MenuItem>
      <Divider />
      <MenuItem danger><Trash2 size={14} /> Delete</MenuItem>
    </Menu>
  );
}

function AppearanceMenuDemo() {
  return (
    <Menu trigger={<Button>Styled Items <ChevronDown size={14} /></Button>}>
      <MenuItem success>Approve</MenuItem>
      <MenuItem warning>Archive</MenuItem>
      <MenuItem info>View details</MenuItem>
      <Divider />
      <MenuItem danger>Delete permanently</MenuItem>
    </Menu>
  );
}

function DisabledMenuDemo() {
  return (
    <Menu trigger={<Button>Options <ChevronDown size={14} /></Button>}>
      <MenuItem>Available action</MenuItem>
      <MenuItem disabled>Disabled action</MenuItem>
      <MenuItem>Another available action</MenuItem>
      <Divider />
      <MenuItem disabled>Also disabled</MenuItem>
    </Menu>
  );
}

function LinkMenuDemo() {
  return (
    <Menu trigger={<Button>Navigation <ChevronDown size={14} /></Button>}>
      <MenuItem href="/docs/basic-components/button"><Edit size={14} /> Button docs</MenuItem>
      <MenuItem href="/docs/basic-components/badge"><Edit size={14} /> Badge docs</MenuItem>
      <Divider />
      <MenuItem href="https://github.com" target="_blank"><ExternalLink size={14} /> GitHub</MenuItem>
    </Menu>
  );
}

export const menuExamples: DocsPagePart[] = [
  {
    title: 'Basic Menu',
    md: 'A dropdown menu triggered by a button. Pass the trigger as a React element via the `trigger` prop; children are the menu contents. Includes full keyboard navigation (Arrow keys, Enter, Escape) and focus management.\n\n```tsx\nimport { Menu, MenuItem, Button } from "@vaneui/ui";\n\n<Menu trigger={<Button>Actions</Button>}>\n  <MenuItem>Edit</MenuItem>\n  <MenuItem>Duplicate</MenuItem>\n  <MenuItem>Share</MenuItem>\n</Menu>\n```',
    component: <BasicMenuDemo />,
    code: "",
  },
  {
    title: 'Labels & Separators',
    md: 'Use `MenuLabel` for section headings and `Divider` for visual dividers between groups.\n\n```tsx\n<Menu trigger={<Button>Account</Button>}>\n  <MenuLabel>Account</MenuLabel>\n  <MenuItem>Profile</MenuItem>\n  <MenuItem>Settings</MenuItem>\n  <Divider />\n  <MenuLabel>Actions</MenuLabel>\n  <MenuItem>Export data</MenuItem>\n  <MenuItem danger>Delete account</MenuItem>\n</Menu>\n```',
    component: <LabelsAndSeparatorsDemo />,
    code: "",
  },
  {
    title: 'Items with Icons',
    md: 'Place SVG icons directly inside `MenuItem` — they are automatically flex-aligned and pointer-events-disabled.\n\n```tsx\nimport { Edit, Copy, Trash2 } from "react-feather";\n\n<Menu trigger={<Button>File</Button>}>\n  <MenuItem><Edit size={14} /> Edit</MenuItem>\n  <MenuItem><Copy size={14} /> Copy</MenuItem>\n  <Divider />\n  <MenuItem danger><Trash2 size={14} /> Delete</MenuItem>\n</Menu>\n```',
    component: <IconMenuDemo />,
    code: "",
  },
  {
    title: 'Item Appearances',
    md: 'Apply appearance props to individual items for semantic coloring.\n\n```tsx\n<MenuItem success>Approve</MenuItem>\n<MenuItem warning>Archive</MenuItem>\n<MenuItem danger>Delete permanently</MenuItem>\n```',
    component: <AppearanceMenuDemo />,
    code: "",
  },
  {
    title: 'Disabled Items',
    md: 'Set `disabled` on a `MenuItem` to prevent interaction. Disabled items are skipped during keyboard navigation.\n\n```tsx\n<MenuItem disabled>Disabled action</MenuItem>\n```',
    component: <DisabledMenuDemo />,
    code: "",
  },
  {
    title: 'Items as Links',
    md: 'Pass `href` to render a `MenuItem` as an anchor tag for navigation.\n\n```tsx\n<MenuItem href="/settings">Settings</MenuItem>\n<MenuItem href="https://github.com" target="_blank">GitHub</MenuItem>\n```',
    component: <LinkMenuDemo />,
    code: "",
  },
  {
    title: 'Advanced Props',
    md: 'Menu supports additional configuration for fine-tuning behavior:\n\n| Prop | Default | Description |\n|------|---------|-------------|\n| `open` | — | Controlled open state |\n| `defaultOpen` | `false` | Initial open state (uncontrolled) |\n| `onOpenChange` | — | Called when open state changes |\n| `onClose` | — | Called when the menu closes |\n| `closeOnItemClick` | `true` | Close menu when any item is clicked |\n| `loop` | `true` | Loop keyboard navigation from last to first |\n| `disabled` | `false` | Prevent menu from opening |\n| `transitionDuration` | `150` | Animation duration in ms |\n\n`MenuItem` also accepts:\n\n| Prop | Default | Description |\n|------|---------|-------------|\n| `closeMenuOnClick` | inherits | Override the menu-level `closeOnItemClick` for this item |\n| `href` | — | Render as anchor tag |\n| `disabled` | `false` | Prevent interaction |\n\n```tsx\n{/* Controlled menu */}\nconst [open, setOpen] = useState(false);\n<Menu open={open} onOpenChange={setOpen} trigger={<Button>Menu</Button>}>\n  <MenuItem closeMenuOnClick={false}>Keep open on click</MenuItem>\n  <MenuItem>Close on click (default)</MenuItem>\n</Menu>\n```',
    component: <></>,
    code: "",
  },
];
