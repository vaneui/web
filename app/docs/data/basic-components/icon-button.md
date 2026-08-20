---
componentKey: iconButton
importPath: 'import { IconButton } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/iconButton/IconButton.tsx
since: 0.9.0
---

## Basic usage

Drop an icon directly inside the `IconButton`. Each `appearance` prop maps to a semantic color from the active theme.

```tsx demo
<Row flexWrap>
  <IconButton aria-label="Favorite"><Star /></IconButton>
  <IconButton secondary aria-label="Like"><Heart /></IconButton>
  <IconButton success aria-label="Confirm"><Check /></IconButton>
  <IconButton danger aria-label="Delete"><Trash2 /></IconButton>
  <IconButton warning aria-label="Notifications"><Bell /></IconButton>
  <IconButton info aria-label="Show info"><Info /></IconButton>
</Row>
```

## Accessibility

An icon-only button has no visible text, so assistive technology has nothing to announce. Give every `IconButton` an accessible name with `aria-label`.

```tsx demo
<Row flexWrap>
  <IconButton aria-label="Add to favorites"><Star /></IconButton>
  <IconButton secondary aria-label="Like"><Heart /></IconButton>
  <IconButton danger aria-label="Delete"><Trash2 /></IconButton>
</Row>
```

## Sizes

IconButton supports five sizes: `xs`, `sm` (default), `md`, `lg`, `xl`. Size drives the button's dimensions, padding, and border-radius; the aspect ratio stays square at every size.

```tsx demo
<Row flexWrap itemsEnd>
  <Col itemsCenter>
    <IconButton xs><Star /></IconButton>
    <Text sm secondary>xs</Text>
  </Col>
  <Col itemsCenter>
    <IconButton sm><Star /></IconButton>
    <Text sm secondary>sm</Text>
  </Col>
  <Col itemsCenter>
    <IconButton md><Star /></IconButton>
    <Text sm secondary>md</Text>
  </Col>
  <Col itemsCenter>
    <IconButton lg><Star /></IconButton>
    <Text sm secondary>lg</Text>
  </Col>
  <Col itemsCenter>
    <IconButton xl><Star /></IconButton>
    <Text sm secondary>xl</Text>
  </Col>
</Row>
```

## Variants

IconButton renders as `outline` (default) or `filled`.

```tsx demo
<Col>
  <Row flexWrap>
    <IconButton><Star /></IconButton>
    <IconButton secondary><Heart /></IconButton>
    <IconButton success><Check /></IconButton>
    <IconButton danger><Trash2 /></IconButton>
    <IconButton warning><Bell /></IconButton>
    <IconButton info><Info /></IconButton>
  </Row>
  <Row flexWrap>
    <IconButton filled><Star /></IconButton>
    <IconButton filled secondary><Heart /></IconButton>
    <IconButton filled success><Check /></IconButton>
    <IconButton filled danger><Trash2 /></IconButton>
    <IconButton filled warning><Bell /></IconButton>
    <IconButton filled info><Info /></IconButton>
  </Row>
</Col>
```

## Shapes

IconButton supports `rounded` (default), `pill`, and `sharp`. `pill` is especially well suited to icon-only buttons.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <IconButton filled><Star /></IconButton>
    <Text sm secondary>rounded</Text>
  </Col>
  <Col itemsCenter>
    <IconButton pill filled><Star /></IconButton>
    <Text sm secondary>pill</Text>
  </Col>
  <Col itemsCenter>
    <IconButton sharp filled><Star /></IconButton>
    <Text sm secondary>sharp</Text>
  </Col>
</Row>
```

## As Link and disabled

Pass `href` to render the IconButton as an `<a>` for navigation. Use `disabled` to prevent interaction.

```tsx demo
<Row flexWrap>
  <IconButton href="https://github.com" target="_blank"><ExternalLink /></IconButton>
  <IconButton filled success href="#"><ExternalLink /></IconButton>
  <IconButton disabled><Star /></IconButton>
  <IconButton filled danger disabled><Trash2 /></IconButton>
</Row>
```

## Next.js Link integration

Use the `tag` prop to render the IconButton as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { IconButton } from '@vaneui/ui';
import { Settings } from 'react-feather';

<IconButton href="/settings" tag={Link}><Settings /></IconButton>
```

## Loading state

Set `loading` to replace the icon with a spinner and auto-disable the button.

```tsx demo
<Row flexWrap itemsCenter>
  <IconButton loading aria-label="Refreshing"><RefreshCw /></IconButton>
  <IconButton loading filled danger aria-label="Deleting"><Trash2 /></IconButton>
  <IconButton loading lg aria-label="Saving"><Star /></IconButton>
</Row>
```

The ring is the `Spinner` component, sized from the button and coloured by the button's own text colour, so it reads correctly on every variant. Keep the `aria-label` describing the action: the button carries `aria-busy` while it spins, and the Spinner itself is decorative here.

```tsx demo
const [loading, setLoading] = useState(false);

return (
  <IconButton loading={loading} onClick={() => setLoading(true)} aria-label="Favorite">
    <Star />
  </IconButton>
);
```

## Customizing

Set app-wide IconButton defaults with `ThemeProvider`'s `themeDefaults`:

```tsx demo
<ThemeProvider themeDefaults={{
  iconButton: { secondary: true, pill: true, lg: true },
}}>
  <IconButton><Star /></IconButton>
</ThemeProvider>
```
