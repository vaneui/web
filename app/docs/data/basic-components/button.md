---
componentKey: button
importPath: 'import { Button } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/button/Button.tsx
since: 0.9.0
---

## Basic usage

Each `appearance` prop maps to a semantic color from the active theme.

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

Buttons come in five sizes: `xs`, `sm` (default), `md`, `lg`, `xl`. Size drives font-size, padding, gap, and border-radius simultaneously via CSS variables.

```tsx demo
<Row flexWrap>
  <Button xs>xs</Button>
  <Button sm>sm</Button>
  <Button md>md</Button>
  <Button lg>lg</Button>
  <Button xl>xl</Button>
</Row>
```

## Variants

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
    <Button primary>primary</Button>
    <Button brand>brand</Button>
    <Button accent>accent</Button>
    <Button secondary>secondary</Button>
  </Row>
  <Row flexWrap>
    <Button ghost primary>primary</Button>
    <Button ghost brand>brand</Button>
    <Button ghost accent>accent</Button>
    <Button ghost secondary>secondary</Button>
  </Row>
</Col>
```

## Shapes

Button supports three border-radius styles: `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Button pill>Subscribe</Button>
  <Button sharp>Subscribe</Button>
  <Button rounded>Subscribe</Button>
</Row>
```

## With icon

Drop an icon directly inside the button. `gap` is on by default, so spacing is automatic.

```tsx demo
<Row flexWrap>
  <Button><Download/> Download</Button>
  <Button success filled><Check/> Saved</Button>
  <Button danger><Trash2/> Delete</Button>
  <Button secondary>Next <ArrowRight/></Button>
</Row>
```

## Sizes with icon

The same size matrix paired with an inline icon.

```tsx demo
<Row flexWrap>
  <Button xs><Star/> Extra Small</Button>
  <Button sm><Star/> Small</Button>
  <Button md><Star/> Medium</Button>
  <Button lg><Star/> Large</Button>
  <Button xl><Star/> Extra Large</Button>
</Row>
```

## Font weights

Buttons default to `semibold`. Use any of the standard weight props to override.

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

## As Link and disabled

Pass `href` to render the button as an `<a>` for navigation. Use `disabled` to prevent interaction.

```tsx demo
<Row flexWrap>
  <Button href="#">Link Button</Button>
  <Button success filled href="#">Success Link</Button>
  <Button disabled>Disabled</Button>
  <Button danger filled disabled>Disabled Danger</Button>
</Row>
```

## Next.js Link integration

Use the `tag` prop to render the button as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Button } from '@vaneui/ui';

<Button href="/docs" tag={Link}>Documentation</Button>
```

## Customizing

Set app-wide Button defaults with `ThemeProvider`'s `themeDefaults`:

```tsx demo
<ThemeProvider themeDefaults={{
  button: { main: { primary: true, lg: true, filled: true } },
}}>
  <Button>Submit</Button>
</ThemeProvider>
```

Add prop-conditional classes with `extraClasses`, applied whenever the matching boolean prop is active. For compound themes like Button, nest the prop-class map under the sub-theme name (`main` for Button's primary surface):

```tsx demo
<ThemeProvider extraClasses={{
  button: {
    main: {
      primary: 'shadow-lg hover:shadow-xl transition-shadow',
      danger: 'animate-pulse',
    },
  },
}}>
  <Button primary>Glowing Primary</Button>
</ThemeProvider>
```
