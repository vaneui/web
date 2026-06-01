---
componentKey: navLink
importPath: 'import { NavLink } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/navLink/NavLink.tsx
since: 0.9.0
---

A navigation link for sidebars, nav menus, and headers. Supports active state, icons, and renders as `<a>` when `href` is provided, or `<button>` otherwise.

## When to use

- Sidebar navigation items (docs nav, app shell sidebar, settings menus).
- Header navigation links that need an active-state indicator.
- Vertical or horizontal nav menus where each item routes to a page or section.
- On-page table-of-contents items (paired with `active` based on scroll position).

### When NOT to use

- For inline links inside prose: use `Link`, which sits on the typography baseline.
- For primary calls-to-action: use `Button primary filled`.

## Basic usage

NavLink renders as an `<a>` when `href` is provided. Defaults to `sm` size, `primary` appearance, `outline` variant, `wFull` and `textLeft` layout, ideal for stacking inside a sidebar `Col`.

```tsx demo
<Col className="w-64">
  <NavLink href="#">Home</NavLink>
  <NavLink href="#">Dashboard</NavLink>
  <NavLink href="#">Settings</NavLink>
</Col>
```

## Active state

Use the `active` prop to indicate the current page. Active NavLinks get `aria-current="page"` and a `data-active` attribute for styling.

```tsx demo
<Col className="w-64">
  <NavLink href="#">Home</NavLink>
  <NavLink href="#" active>Dashboard</NavLink>
  <NavLink href="#">Settings</NavLink>
  <NavLink href="#">Profile</NavLink>
</Col>
```

## With icon

Drop an icon directly inside the NavLink. `gap` is on by default, so spacing is automatic. React elements rendered before any text become the leading icon; text is auto-wrapped in a label span with truncation; elements after text become trailing accessories.

```tsx demo
<Col className="w-64">
  <NavLink href="#"><Home size={16} /> Home</NavLink>
  <NavLink href="#" active><FileText size={16} /> Documents</NavLink>
  <NavLink href="#"><Users size={16} /> Team</NavLink>
  <NavLink href="#"><Settings size={16} /> Settings</NavLink>
</Col>
```

## Sizes

NavLink supports five sizes: `xs`, `sm` (default), `md`, `lg`, `xl`. Size drives font-size, padding, gap, and border-radius simultaneously via CSS variables.

```tsx demo
<Col className="w-72">
  <NavLink xs href="#"><Home size={12} /> XS NavLink</NavLink>
  <NavLink href="#"><Home size={14} /> SM NavLink</NavLink>
  <NavLink md href="#"><Home size={16} /> MD NavLink</NavLink>
  <NavLink lg href="#"><Home size={18} /> LG NavLink</NavLink>
  <NavLink xl href="#"><Home size={20} /> XL NavLink</NavLink>
</Col>
```

## Appearances and variants

NavLinks default to `primary outline`. Use `filled` for solid backgrounds. Active state works with all appearances.

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

## Disabled state

Use `disabled` to prevent interaction. When `disabled` is combined with `href`, the anchor is replaced with a disabled `<button>` so the link cannot be followed.

```tsx demo
<Col className="w-64">
  <NavLink href="#"><Home size={16} /> Active Link</NavLink>
  <NavLink href="#" disabled><Lock size={16} /> Disabled Link</NavLink>
  <NavLink href="#" active><Settings size={16} /> Current Page</NavLink>
  <NavLink href="#" disabled><Users size={16} /> Restricted</NavLink>
</Col>
```

## As Button (no href)

Without `href`, NavLink renders as a `<button>`, useful for menu items that trigger actions instead of navigating.

```tsx demo
<Col className="w-64">
  <NavLink onClick={() => alert('Profile')}><User size={16} /> Profile</NavLink>
  <NavLink onClick={() => alert('Sign out')}><LogOut size={16} /> Sign out</NavLink>
</Col>
```

## Sidebar navigation

A real-world sidebar pattern with icons, active state, dividers, and trailing badges.

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

## Keyboard focus

NavLink renders a keyboard focus-visible outline by default so keyboard users can see where they are. Opt out with `noFocusVisible`.

## Next.js Link integration

Use the `tag` prop to render NavLink as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { NavLink } from '@vaneui/ui';

<NavLink href="/docs" tag={Link} active={pathname === '/docs'}>
  Documentation
</NavLink>
```

## Customizing

Set app-wide NavLink defaults with `ThemeProvider`'s `themeDefaults` and active-state styling with `extraClasses`:

```tsx
import { ThemeProvider, NavLink } from '@vaneui/ui';

<ThemeProvider
  themeDefaults={{ navLink: { root: { md: true } } }}
  extraClasses={{ navLink: { root: { active: 'bg-brand-50 text-brand-700 font-semibold' } } }}
>
  <NavLink href="/docs" active>Docs</NavLink>
</ThemeProvider>
```
