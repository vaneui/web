---
componentKey: button
importPath: 'import { Button } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/button.tsx
since: 0.9.0
---

`Button` is the primary interactive control for triggering actions. It supports the full appearance, size, shape, and variant prop matrix and renders as an `<a>` when given an `href`.

## When to Use

- Primary page actions, calls-to-action, and prominent affordances.
- Form submissions (`type="submit"`) and form-level reset.
- Confirming or dismissing dialogs and modals.
- Toolbar actions where the label adds clarity beyond an icon alone.
- Cross-page navigation when the action looks like a button (otherwise prefer `Link`).

### When NOT to Use

- For inline navigation inside prose, prefer `Link` — it sits on the typography baseline.
- For icon-only destructive actions inside a row or table cell, prefer `IconButton`.

## Basic Usage

Button styles and variants.

```tsx demo
<Row flexWrap>
  <Button primary>primary</Button>
  <Button brand>brand</Button>
  <Button accent>accent</Button>
  <Button secondary>secondary</Button>
  <Button tertiary>tertiary</Button>
  <Button success>success</Button>
  <Button danger>danger</Button>
  <Button warning>warning</Button>
  <Button info>info</Button>
  <Button link>link</Button>
  <Button inherit>inherit</Button>
</Row>
```

## Sizes

Buttons come in different sizes — `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Row flexWrap>
  <Button xs>xs</Button>
  <Button sm>sm</Button>
  <Button md>md</Button>
  <Button lg>lg</Button>
  <Button xl>xl</Button>
</Row>
```

## Sizes with Icon

The same size matrix paired with an inline icon slot.

```tsx demo
<Row flexWrap>
  <Button xs><span className="rounded-full size-4 bg-gray-300"/> Extra Small</Button>
  <Button sm><span className="rounded-full size-4.5 bg-gray-300"/> Small</Button>
  <Button md><span className="rounded-full size-5 bg-gray-300"/> Medium</Button>
  <Button lg><span className="rounded-full size-6 bg-gray-300"/> Large</Button>
  <Button xl><span className="rounded-full size-7 bg-gray-300"/> Extra Large</Button>
</Row>
```

## Font Weights

Buttons support different font weights.

```tsx demo
<Row flexWrap>
  <Button thin>Submit</Button>
  <Button extralight>Submit</Button>
  <Button light>Submit</Button>
  <Button normal>Submit</Button>
  <Button medium>Submit</Button>
  <Button semibold>Submit</Button>
  <Button bold>Submit</Button>
  <Button extrabold>Submit</Button>
  <Button black>Submit</Button>
</Row>
```

## Border Radius Options

Button supports three border-radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Button pill>Subscribe</Button>
  <Button sharp>Subscribe</Button>
  <Button rounded>Subscribe</Button>
</Row>
```

## Button as Link & Disabled

Use `href` to render a Button as an `<a>` for navigation. Use `disabled` to prevent interaction.

```tsx demo
<Row flexWrap>
  <Button href="#">Link Button</Button>
  <Button success filled href="#">Success Link</Button>
  <Button disabled>Disabled</Button>
  <Button danger filled disabled>Disabled Danger</Button>
</Row>
```

## Button Styles

Buttons can be styled as `filled`, `outline` (default), or `ghost`.

```tsx demo
<Col>
  <Row flexWrap>
    <Button filled primary>primary</Button>
    <Button filled brand>brand</Button>
    <Button filled accent>accent</Button>
    <Button filled secondary>secondary</Button>
  </Row>
  <Row flexWrap>
    <Button outline primary>primary</Button>
    <Button outline brand>brand</Button>
    <Button outline accent>accent</Button>
    <Button outline secondary>secondary</Button>
  </Row>
  <Row flexWrap>
    <Button ghost primary>primary</Button>
    <Button ghost brand>brand</Button>
    <Button ghost accent>accent</Button>
    <Button ghost secondary>secondary</Button>
  </Row>
</Col>
```

## Customizing

Set app-wide Button defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Button } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  button: { primary: true, lg: true, filled: true },
}}>
  <Button>Submit</Button>
</ThemeProvider>
```

Add prop-conditional classes with `extraClasses` — applied whenever the matching boolean prop is active:

```tsx
import { ThemeProvider, Button } from '@vaneui/ui';

<ThemeProvider extraClasses={{
  button: {
    primary: 'shadow-lg hover:shadow-xl transition-shadow',
    danger: 'animate-pulse',
  },
}}>
  <Button primary>Glowing Primary</Button>
</ThemeProvider>
```
