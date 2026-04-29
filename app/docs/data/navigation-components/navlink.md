---
componentKey: navLink
importPath: 'import { NavLink } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/navLink.tsx
since: 0.9.0
---

A navigation link for sidebars, nav menus, and headers. Supports active state, icons, and renders as anchor or button.

## When to Use

- Sidebar navigation items (docs nav, app shell sidebar, settings menus).
- Header navigation links that need an active-state indicator.
- Vertical or horizontal nav menus where each item routes to a page or section.
- On-page table-of-contents items (paired with `active` based on scroll position).

### When NOT to Use

- For inline links inside prose — use `Link`, which sits on the typography baseline.
- For primary calls-to-action — use `Button primary filled`.

## Customizing

Set app-wide NavLink defaults with `ThemeProvider`'s `themeDefaults` and active-state styling with `extraClasses`:

```tsx
import { ThemeProvider, NavLink } from '@vaneui/ui';

<ThemeProvider
  themeDefaults={{ navLink: { sm: true, wFull: true } }}
  extraClasses={{ navLink: { active: 'bg-brand-50 text-brand-700 font-semibold' } }}
>
  <NavLink href="/docs" active>Docs</NavLink>
</ThemeProvider>
```

## Basic Usage

NavLink is a navigation link component that renders as an `<a>` when `href` is provided, or a `<button>` otherwise. Defaults to `sm` size, `primary` appearance, and `outline` variant with full-width layout.

```tsx demo
<Col className="w-64">
  <NavLink href="#">Home</NavLink>
  <NavLink href="#">Dashboard</NavLink>
  <NavLink href="#">Settings</NavLink>
</Col>
```

## Active State

Use the `active` prop to indicate the current page. Active NavLinks get `aria-current="page"` and a `data-active` attribute for styling.

```tsx demo
<Col className="w-64">
  <NavLink href="#">Home</NavLink>
  <NavLink href="#" active>Dashboard</NavLink>
  <NavLink href="#">Settings</NavLink>
  <NavLink href="#">Profile</NavLink>
</Col>
```

## With Icons

Add leading icons to NavLinks for visual clarity. React element children (like icons) are rendered directly, while text is automatically wrapped in a label span with truncation.

```tsx demo
<Col className="w-64">
  <NavLink href="#"><Home size={16} /> Home</NavLink>
  <NavLink href="#" active><FileText size={16} /> Documents</NavLink>
  <NavLink href="#"><Users size={16} /> Team</NavLink>
  <NavLink href="#"><Settings size={16} /> Settings</NavLink>
</Col>
```

## Sizes

NavLink supports five sizes: `xs`, `sm` (default), `md`, `lg`, `xl`.

```tsx demo
<Col className="w-72">
  {
    ComponentKeys.size.map((key) => (
      <NavLink key={key} href="#" {...{[key]: true}}>
        <Home size={key === 'xs' ? 12 : key === 'sm' ? 14 : key === 'lg' ? 18 : key === 'xl' ? 20 : 16} />
        {key.toUpperCase()} NavLink
      </NavLink>
    ))
  }
</Col>
```

## Appearances & Variants

NavLinks default to `primary` appearance and `outline` variant. Use `filled` for solid backgrounds. Active state works with all appearances.

```tsx demo
<Row flexWrap>
  <Col className="w-48">
    <Text sm semibold secondary>Outline (default)</Text>
    <NavLink href="#" active>Primary</NavLink>
    <NavLink href="#" success active>Success</NavLink>
    <NavLink href="#" danger active>Danger</NavLink>
    <NavLink href="#" secondary active>Secondary</NavLink>
  </Col>
  <Col className="w-48">
    <Text sm semibold secondary>Filled</Text>
    <NavLink href="#" filled active>Primary</NavLink>
    <NavLink href="#" success filled active>Success</NavLink>
    <NavLink href="#" danger filled active>Danger</NavLink>
    <NavLink href="#" secondary filled active>Secondary</NavLink>
  </Col>
</Row>
```

## Disabled State

Use `disabled` to prevent interaction. When disabled with `href`, the anchor is replaced with a button and accessibility attributes are added.

```tsx demo
<Col className="w-64">
  <NavLink href="#"><Home size={16} /> Active Link</NavLink>
  <NavLink href="#" disabled><Lock size={16} /> Disabled Link</NavLink>
  <NavLink href="#" active><Settings size={16} /> Current Page</NavLink>
  <NavLink href="#" disabled><Users size={16} /> Restricted</NavLink>
</Col>
```

## Sidebar Navigation

A real-world sidebar navigation pattern with icons, active state, and trailing badges.

```tsx demo
<Card className="w-64" noGap>
  <Text sm semibold secondary className="px-3 py-2">Navigation</Text>
  <Divider />
  <NavLink href="#"><Home size={16} /> Home</NavLink>
  <NavLink href="#" active><FileText size={16} /> Documents</NavLink>
  <NavLink href="#"><Mail size={16} /> Messages <Badge xs info>3</Badge></NavLink>
  <NavLink href="#"><Bell size={16} /> Notifications <Badge xs danger>12</Badge></NavLink>
  <NavLink href="#"><Star size={16} /> Favorites</NavLink>
  <Divider />
  <NavLink href="#"><Users size={16} /> Team</NavLink>
  <NavLink href="#"><Settings size={16} /> Settings</NavLink>
</Card>
```
