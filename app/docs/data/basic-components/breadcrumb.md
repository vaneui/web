---
componentKey: breadcrumb
propsTables: Breadcrumb=breadcrumb.main, BreadcrumbItem=breadcrumb.item
importPath: 'import { Breadcrumb, BreadcrumbItem } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/breadcrumb/Breadcrumb.tsx
since: 1.8.0
---

Breadcrumb shows where the current page sits in the site's hierarchy, as a trail of links from the top level down to the page itself. It renders a `<nav>` landmark labelled "Breadcrumb" around an ordered list, one `<li>` per BreadcrumbItem, with a chevron between items that assistive technology skips. For the main navigation of a site or a section, use [NavLink](/docs/basic-components/navlink) in a sidebar or tab bar. Breadcrumb needs `@vaneui/ui` 1.8.0 or later.

## Basic usage

Each BreadcrumbItem with `href` renders a link. An item without `href` renders text. The last item is the current page: it gets `aria-current="page"` and the stronger text color.

```tsx demo
<Breadcrumb>
  <BreadcrumbItem href="#home">Home</BreadcrumbItem>
  <BreadcrumbItem href="#docs">Docs</BreadcrumbItem>
  <BreadcrumbItem href="#components">Components</BreadcrumbItem>
  <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
</Breadcrumb>
```

`sm`, `secondary` and `outline` are defaults, so a bare Breadcrumb has 14px text in the secondary text color, one step below body text.

## Marking the current page

When the current page is not the last item, for example in a trail that ends with a tab or a filter, set `current` on that item. An item with `current={false}` opts out, so a trail can mark no item at all.

```tsx demo
<Col>
  <Breadcrumb>
    <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
    <BreadcrumbItem href="#billing" current>Billing</BreadcrumbItem>
    <BreadcrumbItem href="#invoices">Invoices</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb>
    <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
    <BreadcrumbItem href="#billing" current={false}>Billing</BreadcrumbItem>
  </Breadcrumb>
</Col>
```

## Separators

`separator` replaces the chevron with any node: a character, an icon or an element of your own. The separator is drawn before every item but the first, in the tertiary text color, and is hidden from assistive technology.

```tsx demo
<Col>
  <Breadcrumb separator="/">
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem href="#projects">Projects</BreadcrumbItem>
    <BreadcrumbItem>vaneui</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb separator="·">
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem href="#blog">Blog</BreadcrumbItem>
    <BreadcrumbItem>Release notes</BreadcrumbItem>
  </Breadcrumb>
</Col>
```

## Sizes

The size prop on Breadcrumb sets the text, the separator and the gap between items for the whole trail.

```tsx demo
<Col>
  <Breadcrumb xs>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>xs</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>sm</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb md>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>md</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb lg>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>lg</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb xl>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>xl</BreadcrumbItem>
  </Breadcrumb>
</Col>
```

## Appearances

An appearance on Breadcrumb colors the links and the current page. The default `secondary` keeps the trail quieter than the page title under it.

```tsx demo
<Col>
  <Breadcrumb primary>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>Primary</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb accent>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>Accent</BreadcrumbItem>
  </Breadcrumb>
  <Breadcrumb info>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>Info</BreadcrumbItem>
  </Breadcrumb>
</Col>
```

## Long trails on narrow screens

The list wraps, and each item keeps its text on one line, so a long trail breaks between items rather than inside one. The separator stays with the item that follows it.

```tsx demo
<Card className="max-w-xs">
  <Breadcrumb>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem href="#docs">Documentation</BreadcrumbItem>
    <BreadcrumbItem href="#components">Form components</BreadcrumbItem>
    <BreadcrumbItem>Field sections</BreadcrumbItem>
  </Breadcrumb>
</Card>
```

## A page header with a breadcrumb

Put the Breadcrumb above the page title, so the trail reads first and the title names the last item.

```tsx demo
<Col>
  <Breadcrumb>
    <BreadcrumbItem href="#projects">Projects</BreadcrumbItem>
    <BreadcrumbItem href="#website">Website</BreadcrumbItem>
    <BreadcrumbItem>Settings</BreadcrumbItem>
  </Breadcrumb>
  <PageTitle>Settings</PageTitle>
</Col>
```

## Next.js Link integration

Pass the router's link component through `tag`, like on [Button](/docs/basic-components/button) and [NavLink](/docs/basic-components/navlink). The item keeps its styles and `aria-current`, and the router handles the click:

```tsx
import Link from "next/link";

<Breadcrumb>
  <BreadcrumbItem tag={Link} href="/">Home</BreadcrumbItem>
  <BreadcrumbItem tag={Link} href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbItem>Button</BreadcrumbItem>
</Breadcrumb>
```

## Customizing

Breadcrumb has four theme nodes: `breadcrumb.main` (the `<nav>`), `breadcrumb.list` (the `<ol>`), `breadcrumb.item` (each link or text) and `breadcrumb.separator`.

```tsx demo
<ThemeProvider themeDefaults={{
  breadcrumb: { main: { md: true }, item: { fontMedium: true } },
}}>
  <Breadcrumb>
    <BreadcrumbItem href="#home">Home</BreadcrumbItem>
    <BreadcrumbItem>Customized</BreadcrumbItem>
  </Breadcrumb>
</ThemeProvider>
```

## Frequently asked questions

### Should the last item be a link?

No. The last item is the page you are on, so a link to it goes nowhere. Leave out its `href`, and it renders as text with `aria-current="page"`. Give it an `href` only when the item stands for a parent view, such as a list the current page was opened from.

### How do I translate the "Breadcrumb" label?

Pass `aria-label` on Breadcrumb, for example `aria-label="Fil d'Ariane"`. It replaces the default label of the `<nav>` landmark, which screen reader users hear when they move between landmarks.

### Can a page have more than one Breadcrumb?

It can, but each `<nav>` landmark then needs a label of its own, such as "Breadcrumb" and "Related sections", so screen reader users can tell them apart. Most pages need one trail, at the top of the main content.
