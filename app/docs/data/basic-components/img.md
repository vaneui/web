---
componentKey: img
importPath: 'import { Img } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/img.tsx
since: 0.9.0
---

Displays images with VaneUI styling support including sizes, shapes, borders, shadows, and object-fit options.

```tsx setup
const placeholderSrc = "https://placehold.co/300x200/e2e8f0/64748b?text=Image";
```

## Basic Image

Render an image with the `Img` component.

```tsx demo
<Img src={placeholderSrc} alt="Placeholder image" />
```

## Image Shapes

Control border radius with `rounded` (default), `pill`, and `sharp`.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img pill src={placeholderSrc} alt="pill image" />
    <Text sm secondary>pill</Text>
  </Col>
  <Col itemsCenter>
    <Img sharp src={placeholderSrc} alt="sharp image" />
    <Text sm secondary>sharp</Text>
  </Col>
  <Col itemsCenter>
    <Img rounded src={placeholderSrc} alt="rounded image" />
    <Text sm secondary>rounded</Text>
  </Col>
</Row>
```

## Image with Border & Shadow

Add `border` and `shadow` props for visual emphasis.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img border src={placeholderSrc} alt="Bordered image" />
    <Text sm secondary>border</Text>
  </Col>
  <Col itemsCenter>
    <Img shadow src={placeholderSrc} alt="Shadow image" />
    <Text sm secondary>shadow</Text>
  </Col>
  <Col itemsCenter>
    <Img border shadow src={placeholderSrc} alt="Border and shadow image" />
    <Text sm secondary>border + shadow</Text>
  </Col>
</Row>
```

## Image Sizes

Images support five sizes: `xs`, `sm`, `md`, `lg`, `xl`.

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
    <Img md src={placeholderSrc} alt="md image" />
    <Text sm secondary>md</Text>
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

## Object Fit

Control how the image fills its container with `objectCover`, `objectContain`, and `objectFill`.

```tsx demo
<Row flexWrap>
  <Col itemsCenter>
    <Img objectCover src={placeholderSrc} alt="Cover" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectCover</Text>
  </Col>
  <Col itemsCenter>
    <Img objectContain src={placeholderSrc} alt="Contain" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectContain</Text>
  </Col>
  <Col itemsCenter>
    <Img objectFill src={placeholderSrc} alt="Fill" style={{ width: 200, height: 150 }} />
    <Text sm secondary>objectFill</Text>
  </Col>
</Row>
```
