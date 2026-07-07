---
componentKey: img
importPath: 'import { Img } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/img/Img.tsx
since: 0.9.0
---

```tsx setup
const placeholderSrc = "https://placehold.co/300x200/e2e8f0/64748b?text=Image";
const portraitSrc = "https://placehold.co/200x300/cbd5e1/475569?text=Portrait";
const avatarSrc = "https://placehold.co/120x120/c7d2fe/4338ca?text=Avatar";
```

## Basic usage

Render an image with the `Img` component.

```tsx demo
<Img src={placeholderSrc} alt="Sample landscape photo" />
```

## Alt text

Always pass a descriptive `alt` attribute. Use an empty `alt=""` for decorative images so assistive technology can skip them.

```tsx demo
<Row flexWrap>
  <Img src={placeholderSrc} alt="Team standing in front of the office building" />
  <Img src={placeholderSrc} alt="" />
</Row>
```

## Shapes

Control border radius with `rounded` (default), `pill` (great for avatars), and `sharp`.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img src={placeholderSrc} alt="Rounded image" />
    <Text sm secondary>rounded (default)</Text>
  </Col>
  <Col itemsCenter>
    <Img pill src={avatarSrc} alt="Avatar" />
    <Text sm secondary>pill</Text>
  </Col>
  <Col itemsCenter>
    <Img sharp src={placeholderSrc} alt="Sharp image" />
    <Text sm secondary>sharp</Text>
  </Col>
</Row>
```

## Border and shadow

Add `border` and `shadow` props for visual emphasis.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img border src={placeholderSrc} alt="Bordered image" />
    <Text sm secondary>border</Text>
  </Col>
  <Col itemsCenter>
    <Img shadow src={placeholderSrc} alt="Image with shadow" />
    <Text sm secondary>shadow</Text>
  </Col>
  <Col itemsCenter>
    <Img border shadow src={placeholderSrc} alt="Bordered image with shadow" />
    <Text sm secondary>border + shadow</Text>
  </Col>
</Row>
```

## Sizes

Images support five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`. Size controls border-radius scaling.

```tsx demo
<Row flexWrap itemsEnd>
  <Col itemsCenter>
    <Img xs src={placeholderSrc} alt="xs image" />
    <Text sm secondary>xs</Text>
  </Col>
  <Col itemsCenter>
    <Img sm src={placeholderSrc} alt="sm image" />
    <Text sm secondary>sm</Text>
  </Col>
  <Col itemsCenter>
    <Img src={placeholderSrc} alt="md image" />
    <Text sm secondary>md (default)</Text>
  </Col>
  <Col itemsCenter>
    <Img lg src={placeholderSrc} alt="lg image" />
    <Text sm secondary>lg</Text>
  </Col>
  <Col itemsCenter>
    <Img xl src={placeholderSrc} alt="xl image" />
    <Text sm secondary>xl</Text>
  </Col>
</Row>
```

## Object fit

Control how an image fills a sized container with `objectCover` (default), `objectContain`, and `objectFill`. The examples below constrain the image to a fixed box so the difference is visible.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img src={portraitSrc} alt="Cover crops to fill the box" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectCover (default)</Text>
  </Col>
  <Col itemsCenter>
    <Img objectContain src={portraitSrc} alt="Contain fits inside the box" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectContain</Text>
  </Col>
  <Col itemsCenter>
    <Img objectFill src={portraitSrc} alt="Fill stretches to the box" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectFill</Text>
  </Col>
</Row>
```

## Inside a Card

`Img` composes naturally inside `Card` for media tiles. Use `wFull` so the image spans the card width.

```tsx demo
<Row flexWrap>
  <Card noPadding overflowHidden style={{ width: 240 }}>
    <Img sharp wFull src={placeholderSrc} alt="Sunset over the harbor" style={{ height: 140 }} />
    <Stack>
      <Title sm>Harbor Sunset</Title>
      <Text sm secondary>Captured last weekend on a walk along the pier.</Text>
    </Stack>
  </Card>
  <Card noPadding overflowHidden style={{ width: 240 }}>
    <Img sharp wFull src={placeholderSrc} alt="Forest trail at dawn" style={{ height: 140 }} />
    <Stack>
      <Title sm>Forest Trail</Title>
      <Text sm secondary>Early morning hike through the pine forest.</Text>
    </Stack>
  </Card>
</Row>
```

## Native HTML attributes

`Img` forwards all standard `<img>` attributes including `loading`, `decoding`, `srcSet`, `sizes`, `referrerPolicy`, and `crossOrigin`. Use `loading="lazy"` for below-the-fold images.

```tsx demo
<Img
  src={placeholderSrc}
  alt="Lazy-loaded image"
  loading="lazy"
  decoding="async"
/>
```
