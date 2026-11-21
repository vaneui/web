---
componentKey: button
importPath: 'import { Button } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/button/Button.tsx
since: 0.9.0
---

Use Button for actions, [Link](/docs/typography-components/link) for an in-prose hyperlink, and [NavLink](/docs/basic-components/navlink) for a sidebar or navigation item. An action shown only as an icon goes in an [IconButton](/docs/basic-components/icon-button). Button renders a native `<button>`, or an `<a>` when `href` is set. It sets no `type`, so a Button inside a `<form>` submits the form: pass `type="button"` on every button that does anything else, as the [Forms](/docs/form-components/forms) guide shows. A `disabled` or `loading` Button with an `href` drops the `href` but stays focusable, marked with `aria-disabled`.

## Basic usage

Button triggers an action when the user clicks it; each `appearance` prop maps to a semantic color from the active theme.

```tsx demo
<Row flexWrap>
  <Button primary>primary</Button>
  <Button accent>accent</Button>
  <Button secondary>secondary</Button>
  <Button tertiary>tertiary</Button>
  <Button success>success</Button>
  <Button danger>danger</Button>
  <Button warning>warning</Button>
  <Button info>info</Button>
  <Button inheritAppearance>inheritAppearance</Button>
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
    <Button filled accent>accent</Button>
    <Button filled secondary>secondary</Button>
  </Row>
  <Row flexWrap>
    <Button primary>primary</Button>
    <Button accent>accent</Button>
    <Button secondary>secondary</Button>
  </Row>
  <Row flexWrap>
    <Button ghost primary>primary</Button>
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

Buttons default to `fontSemibold`. Use any of the standard weight props to override.

```tsx demo
<Row flexWrap>
  <Button fontThin>Submit</Button>
  <Button fontExtralight>Submit</Button>
  <Button fontLight>Submit</Button>
  <Button fontNormal>Submit</Button>
  <Button fontMedium>Submit</Button>
  <Button fontSemibold>Submit</Button>
  <Button fontBold>Submit</Button>
  <Button fontExtrabold>Submit</Button>
  <Button fontBlack>Submit</Button>
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

## Loading state

Set `loading` to swap the label for a spinner and auto-disable the button. The width is kept, so the layout does not jump when the state flips.

```tsx demo
<Row flexWrap itemsCenter>
  <Button loading>Saving</Button>
  <Button loading filled danger>Deleting</Button>
  <Button loading lg>Large</Button>
</Row>
```

The ring is the `Spinner` component, so there is one spinner in the library and restyling `theme.spinner` restyles both. The button forwards its own size, and the ring inherits the button's text colour: a filled button gets a light ring, an outline button a dark one.

It is decorative here rather than a live region. The button already carries `aria-busy`, so the Spinner's `role="status"` is suppressed and the accessible name stays the button's own.

```tsx demo
const [loading, setLoading] = useState(false);

return (
  <Button loading={loading} onClick={() => setLoading(true)}>
    Submit
  </Button>
);
```

## Next.js Link integration

Use the `tag` prop to render the button as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Button } from '@vaneui/ui';

<Button href="/docs" tag={Link}>Documentation</Button>
```

## How Button centers its label

A browser centers the line box of a font, and that box is rarely even around the letters. A label therefore sits a fraction of a pixel above or below the middle of its button, in a direction that depends on the font. Since 1.7.0, Button renders each run of its own text in a `<span class="vane-text-run">`, and the stylesheet trims that span to the height of the capital letters with `text-box`. The label sits in the middle with any font, and the button keeps its size.

```tsx
<Button><Download/> Download</Button>
```

```html
<button class="vane-button ...">
  <svg></svg>
  <span class="vane-text-run"> Download</span>
</button>
```

[IconButton](/docs/basic-components/icon-button), [Badge](/docs/basic-components/badge), [Chip](/docs/basic-components/chip), [Alert](/docs/basic-components/alert), [Tooltip](/docs/overlay-components/tooltip) and the items and labels of a [Menu](/docs/overlay-components/menu) wrap their text the same way. [NavLink](/docs/basic-components/navlink) trims the label span it already renders. The markup has three consequences:

- In a test, find the component by its role or its class, for example `getByRole('button', { name: 'Download' })`. `getByText('Download')` returns the span, not the button.
- Text passed as an element (a translation component, a fragment, a `<span>` of your own) is not wrapped and renders where the line box of the font puts it. Give your own span `className="vane-text-run"` to center it the same way.
- The trim needs the CSS `text-box` property: Chrome and Edge 133, Safari 18.2 or Firefox 154. An older browser renders the span without the trim, so the text stays where it was before 1.7.0.

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

## Frequently asked questions

### Why do my Button theme defaults have no effect?

Button's theme has sub-themes, so its defaults sit one level down, under `main`: write `themeDefaults={{ button: { main: { filled: true } } }}`, not `{ button: { filled: true } }`. The flat form matches no theme node and does nothing, and a development build logs a console warning about it. `IconButton` has a theme node of its own, `iconButton`, so set both when the two should match.

### How do I make a Button full width?

Pass `wFull`. Button defaults to `wFit`, so it is as wide as its label wherever it sits. For a button that fills its container only on small screens, use `mobileWFull` (below 768px) or `tabletWFull` (below 1024px), and it keeps its fit width above that. In your own Tailwind build, the responsive props need the `@vaneui/ui/tokens` import from the [installation guide](/docs/getting-started/installation#css-setup).

### How do I make a Button as tall as the Input next to it?

Give both the same size prop. `Button`, `IconButton`, `Input` and `Select` all default to `sm` and share one height scale, so a field and a button written without a size prop line up in a `Row`. When you change one, such as `<Input md>`, pass the same prop to the other (`<Button md>`). A `Field` passes its size to the control inside it, but not to a Button placed beside it.

### Can I wrap a Button in a Next.js Link?

No. A `<button>` inside an `<a>` nests two interactive elements, which HTML does not allow and which confuses keyboard and screen reader users. Pass `href` and `tag={Link}` to the Button instead, so it renders a single anchor through Next.js `Link`, as [Next.js Link integration](#next-js-link-integration) shows. A Button that only runs code takes `onClick` and no `href`.
