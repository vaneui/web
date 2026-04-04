# VaneUI Component Usage in vaneui-web

This site is built with `@vaneui/ui` components. Follow these rules when writing or modifying any TSX in this project.

## Canonical Reference

The full VaneUI component usage guide (selection guide, patterns, anti-patterns, props reference) lives at:

**`C:\GitHub\vaneui\.claude\rules\component-usage.md`**

Read that file for the complete API. The rules below are vaneui-web-specific additions.

## Next.js Link Integration

Use the `tag` prop to render VaneUI components as Next.js `Link` for client-side navigation:

```tsx
import Link from 'next/link';

// Internal navigation buttons
<Button href="/docs" tag={Link}>Documentation</Button>

// Sidebar/header navigation
<NavLink href="/settings" tag={Link} active={isActive}>Settings</NavLink>

// External links — use tag="a", not Next.js Link
<Button href="https://github.com" tag="a" target="_blank" rel="noopener noreferrer">GitHub</Button>
<Link href="https://github.com" external>GitHub</Link>
```

## Anti-Patterns Specific to This Project

### Don't wrap Button/NavLink in Next.js Link

```tsx
// WRONG - nested interactive elements
import Link from 'next/link';
<Link href="/docs"><Button>Docs</Button></Link>

// RIGHT - use tag prop
<Button href="/docs" tag={Link}>Docs</Button>
```

### Don't use raw HTML/Tailwind for navigation

```tsx
// WRONG
<a href="/settings" className="flex items-center gap-2 text-sm px-3 py-2 rounded hover:bg-gray-100">
  <Settings size={16} /> Settings
</a>

// RIGHT
<NavLink href="/settings" tag={Link} active={isActive}>
  <Settings size={16} /> Settings
</NavLink>
```

### Don't use raw div layouts

```tsx
// WRONG
<div className="flex flex-col gap-4 p-4">
  <div className="flex gap-2 items-center">

// RIGHT
<Stack>
  <Row>
```

## Component Choices for This Site

| UI Element | Component | Example |
|-----------|-----------|---------|
| Sidebar nav item | `NavLink` with `tag={Link}` | `DocsNav.tsx` |
| Header nav button | `Button` with `tag={Link}` | `Header.tsx` |
| Footer link | `Link` (VaneUI) with `secondary noUnderline` | `Footer.tsx` |
| On-this-page link | `NavLink` with `active` prop | `OnThisPage.tsx` |
| Page layout | `Section` > `Container` > content | Landing sections |
| Doc section header | `SectionTitle` | Doc pages |
| Code example | `CodeBlock` (custom) | `DocsPageContent.tsx` |

## Quick Defaults Reminder

Don't specify props that are already true by default:

```tsx
// These are redundant — just use the bare component
<Row gap itemsCenter>        // gap + itemsCenter are defaults
<Button primary outline sm>  // primary + outline + sm are defaults
<Card padding rounded gap>   // padding + rounded + gap are defaults
<Stack column gap padding>   // column + gap + padding are defaults
<Link underline>             // underline is default
<Badge pill uppercase>       // pill + uppercase are defaults
```
