---
componentKey: iconButton
importPath: 'import { IconButton } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/iconButton/IconButton.tsx
since: 0.9.0
---

A square icon-only button with customizable appearance, size, and shape. Supports loading state and renders as an `<a>` when given an `href`. Always provide `aria-label` for accessibility.

## Basic usage

Drop an icon directly inside the `IconButton`. Each `appearance` prop maps to a semantic color from the active theme.

```tsx demo
<Row flexWrap>
  <IconButton><Star /></IconButton>
  <IconButton secondary><Heart /></IconButton>
  <IconButton success><Check /></IconButton>
  <IconButton danger><Trash2 /></IconButton>
  <IconButton warning><Bell /></IconButton>
  <IconButton info><Info /></IconButton>
</Row>
```

## Sizes

IconButton supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Size drives the square aspect ratio, padding, and border-radius simultaneously via CSS variables.

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
    <IconButton><Star /></IconButton>
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

Set `loading` to show a spinner and auto-disable the button.

```tsx
const [loading, setLoading] = useState(false);

<IconButton loading={loading} onClick={() => setLoading(true)}>
  <Star />
</IconButton>
```

## Customizing

Set app-wide IconButton defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, IconButton } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  iconButton: { secondary: true, pill: true, lg: true },
}}>
  <IconButton><Star /></IconButton>
</ThemeProvider>
```
