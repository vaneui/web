---
componentKey: iconButton
importPath: 'import { IconButton } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/iconButton.tsx
since: 0.9.0
---

A square icon-only button with customizable appearance, size, and shape. Supports loading state and renders as anchor when href is provided.

## Basic Usage

A square button designed for icon-only actions. Always provide `aria-label` for accessibility.

```tsx
<IconButton aria-label="Search"><SearchIcon /></IconButton>
<IconButton aria-label="Settings"><SettingsIcon /></IconButton>
<IconButton aria-label="Delete"><TrashIcon /></IconButton>
```

## Sizes

IconButton supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

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
    <IconButton md aria-label="Star md"><Star /></IconButton>
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

## Appearances & Variants

Combine appearance and variant props for different styles.

```tsx demo
<Col>
  <Row flexWrap>
    <IconButton aria-label="Primary"><Star /></IconButton>
    <IconButton secondary aria-label="Secondary"><Heart /></IconButton>
    <IconButton success aria-label="Success"><Star /></IconButton>
    <IconButton danger aria-label="Danger"><Trash2 /></IconButton>
    <IconButton warning aria-label="Warning"><Star /></IconButton>
    <IconButton info aria-label="Info"><Star /></IconButton>
  </Row>
  <Row flexWrap>
    <IconButton filled aria-label="Primary filled"><Star /></IconButton>
    <IconButton secondary filled aria-label="Secondary filled"><Heart /></IconButton>
    <IconButton success filled aria-label="Success filled"><Star /></IconButton>
    <IconButton danger filled aria-label="Danger filled"><Trash2 /></IconButton>
    <IconButton warning filled aria-label="Warning filled"><Star /></IconButton>
    <IconButton info filled aria-label="Info filled"><Star /></IconButton>
  </Row>
</Col>
```

## Shapes

IconButton supports `rounded` (default), `pill`, and `sharp` shapes.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <IconButton pill filled aria-label="Star pill"><Star /></IconButton>
    <Text sm secondary>pill</Text>
  </Col>
  <Col itemsCenter>
    <IconButton sharp filled aria-label="Star sharp"><Star /></IconButton>
    <Text sm secondary>sharp</Text>
  </Col>
  <Col itemsCenter>
    <IconButton rounded filled aria-label="Star rounded"><Star /></IconButton>
    <Text sm secondary>rounded</Text>
  </Col>
</Row>
```

## Loading State

Set `loading` to show a spinner and auto-disable the button.

```tsx
const [loading, setLoading] = useState(false);

<IconButton loading={loading} onClick={() => setLoading(true)} aria-label="Save">
  <StarIcon />
</IconButton>
```

## As Link

Pass `href` to render as an anchor tag.

```tsx demo
<Row>
  <IconButton href="https://github.com" target="_blank" aria-label="GitHub"><ExternalLink /></IconButton>
  <IconButton href="https://github.com" target="_blank" secondary aria-label="GitHub secondary"><ExternalLink /></IconButton>
</Row>
```
