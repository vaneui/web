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
  <IconButton aria-label="Star"><Star /></IconButton>
  <IconButton secondary aria-label="Favorite"><Heart /></IconButton>
  <IconButton success aria-label="Confirm"><Check /></IconButton>
  <IconButton danger aria-label="Delete"><Trash2 /></IconButton>
  <IconButton warning aria-label="Notify"><Bell /></IconButton>
  <IconButton info aria-label="Info"><Info /></IconButton>
</Row>
```

## Sizes

IconButton supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Size drives the square aspect ratio, padding, and border-radius simultaneously via CSS variables.

```tsx demo
<Row flexWrap itemsEnd>
  <Col itemsCenter>
    <IconButton xs aria-label="Star xs"><Star /></IconButton>
    <Text sm secondary>xs</Text>
  </Col>
  <Col itemsCenter>
    <IconButton sm aria-label="Star sm"><Star /></IconButton>
    <Text sm secondary>sm</Text>
  </Col>
  <Col itemsCenter>
    <IconButton aria-label="Star md"><Star /></IconButton>
    <Text sm secondary>md</Text>
  </Col>
  <Col itemsCenter>
    <IconButton lg aria-label="Star lg"><Star /></IconButton>
    <Text sm secondary>lg</Text>
  </Col>
  <Col itemsCenter>
    <IconButton xl aria-label="Star xl"><Star /></IconButton>
    <Text sm secondary>xl</Text>
  </Col>
</Row>
```

## Variants

IconButton renders as `outline` (default) or `filled`.

```tsx demo
<Col>
  <Row flexWrap>
    <IconButton aria-label="Star"><Star /></IconButton>
    <IconButton secondary aria-label="Favorite"><Heart /></IconButton>
    <IconButton success aria-label="Confirm"><Check /></IconButton>
    <IconButton danger aria-label="Delete"><Trash2 /></IconButton>
    <IconButton warning aria-label="Notify"><Bell /></IconButton>
    <IconButton info aria-label="Info"><Info /></IconButton>
  </Row>
  <Row flexWrap>
    <IconButton filled aria-label="Star"><Star /></IconButton>
    <IconButton filled secondary aria-label="Favorite"><Heart /></IconButton>
    <IconButton filled success aria-label="Confirm"><Check /></IconButton>
    <IconButton filled danger aria-label="Delete"><Trash2 /></IconButton>
    <IconButton filled warning aria-label="Notify"><Bell /></IconButton>
    <IconButton filled info aria-label="Info"><Info /></IconButton>
  </Row>
</Col>
```

## Shapes

IconButton supports `rounded` (default), `pill`, and `sharp`. `pill` is especially well suited to icon-only buttons.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <IconButton filled aria-label="Star rounded"><Star /></IconButton>
    <Text sm secondary>rounded</Text>
  </Col>
  <Col itemsCenter>
    <IconButton pill filled aria-label="Star pill"><Star /></IconButton>
    <Text sm secondary>pill</Text>
  </Col>
  <Col itemsCenter>
    <IconButton sharp filled aria-label="Star sharp"><Star /></IconButton>
    <Text sm secondary>sharp</Text>
  </Col>
</Row>
```

## As Link and disabled

Pass `href` to render the IconButton as an `<a>` for navigation. Use `disabled` to prevent interaction.

```tsx demo
<Row flexWrap>
  <IconButton href="https://github.com" target="_blank" aria-label="GitHub"><ExternalLink /></IconButton>
  <IconButton filled success href="#" aria-label="Open"><ExternalLink /></IconButton>
  <IconButton disabled aria-label="Save disabled"><Star /></IconButton>
  <IconButton filled danger disabled aria-label="Delete disabled"><Trash2 /></IconButton>
</Row>
```

## Next.js Link integration

Use the `tag` prop to render the IconButton as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { IconButton } from '@vaneui/ui';
import { Settings } from 'react-feather';

<IconButton href="/settings" tag={Link} aria-label="Settings"><Settings /></IconButton>
```

## Loading state

Set `loading` to show a spinner and auto-disable the button.

```tsx
const [loading, setLoading] = useState(false);

<IconButton loading={loading} onClick={() => setLoading(true)} aria-label="Save">
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
  <IconButton aria-label="Star"><Star /></IconButton>
</ThemeProvider>
```
