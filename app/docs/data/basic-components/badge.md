---
componentKey: badge
importPath: 'import { Badge } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/badge/Badge.tsx
since: 0.9.0
---

Badge adds a short label, such as an unread count, "Live" or "Pro", next to a title or inside a [NavLink](/docs/basic-components/navlink). It renders a `<span>` whose text stays on one line, and switches to `<a>` when `href` is set. For a tag or filter token, use a [Chip](/docs/basic-components/chip), and when clicking the label should run an action, use a [Button](/docs/basic-components/button).

## Basic usage

Badge highlights a short piece of information such as a count or status, and each `appearance` prop maps to a semantic color from the active theme. Badge defaults to `md`, `secondary`, `outline`, `pill`, and `fontSemibold` in normal case. Add `uppercase` for a status-chip look.

```tsx demo
<Row flexWrap>
  <Badge primary>primary</Badge>
  <Badge accent>accent</Badge>
  <Badge secondary>secondary</Badge>
  <Badge tertiary>tertiary</Badge>
  <Badge success>success</Badge>
  <Badge danger>danger</Badge>
  <Badge warning>warning</Badge>
  <Badge info>info</Badge>
  <Badge inheritAppearance>inheritAppearance</Badge>
</Row>
```

## Sizes

Badges come in different sizes such as `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Row flexWrap>
  <Badge xs>xs</Badge>
  <Badge sm>sm</Badge>
  <Badge md>md</Badge>
  <Badge lg>lg</Badge>
  <Badge xl>xl</Badge>
</Row>
```

## Variants

Badges can be styled as `filled`, `outline` (default), or `ghost`.

```tsx demo
<Col>
  <Row flexWrap>
    <Badge filled primary>primary</Badge>
    <Badge filled accent>accent</Badge>
    <Badge filled secondary>secondary</Badge>
  </Row>
  <Row flexWrap>
    <Badge outline primary>primary</Badge>
    <Badge outline accent>accent</Badge>
    <Badge outline secondary>secondary</Badge>
  </Row>
  <Row flexWrap>
    <Badge ghost primary>primary</Badge>
    <Badge ghost accent>accent</Badge>
    <Badge ghost secondary>secondary</Badge>
  </Row>
</Col>
```

## Shapes

Badges support different border radius styles: `rounded`, `pill` (default), and `sharp`.

```tsx demo
<Row flexWrap>
  <Badge pill>Pro</Badge>
  <Badge sharp>Pro</Badge>
  <Badge rounded>Pro</Badge>
</Row>
```

## Font weights

Badges support different font weights.

```tsx demo
<Row flexWrap>
  <Badge fontNormal>Premium</Badge>
  <Badge fontMedium>Premium</Badge>
  <Badge fontSemibold>Premium</Badge>
  <Badge fontBold>Premium</Badge>
</Row>
```

## As Link

Pass `href` to render the badge as an `<a>`, useful for clickable status labels. When `href` is set, the badge gains a keyboard focus-visible outline by default (opt out with `noFocusVisible`).

```tsx demo
<Row flexWrap>
  <Badge href="#">Status</Badge>
  <Badge href="#" success filled>Live</Badge>
  <Badge href="#" warning>Pending</Badge>
</Row>
```

## Status badges in context

Badges work well as status indicators inside cards and other layout components.

```tsx demo
<Card>
  <Row justifyBetween>
    <Title>Production deploy</Title>
    <Badge success filled>Live</Badge>
  </Row>
  <Text>Build #1284 promoted to production 2 minutes ago.</Text>
</Card>
```

## Customizing

Set app-wide Badge defaults with `ThemeProvider`'s `themeDefaults`:

```tsx demo
<ThemeProvider themeDefaults={{
  badge: { success: true, uppercase: true },
}}>
  <Badge>Live</Badge>
</ThemeProvider>
```
