---
componentKey: img
importPath: 'import { Img } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/img/Img.tsx
since: 0.9.0
---

Img is for photos, screenshots, avatars and other content images. It renders a native `<img>` element and takes no children, so an image that needs a title or caption next to it goes in a [Card](/docs/layout-components/card) or a [Col](/docs/layout-components/col) together with its text. For an icon, use [Icon](/docs/basic-components/icon), which wraps an inline SVG in a `<span>` rather than loading an image file.

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

## Appearances and variants

Img paints no surface of its own, so an appearance only shows through the border it draws. `filled` gives it a background, which is visible behind a transparent PNG or while the image is still loading.

```tsx demo
<Row flexWrap itemsCenter>
  <Img border success src="https://placehold.co/80x60/png" alt="Success border" />
  <Img border danger src="https://placehold.co/80x60/png" alt="Danger border" />
  <Img filled secondary className="w-20 h-15" alt="" />
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
    <Img src={portraitSrc} alt="Cover crops to fill the box" className="w-[200px] h-[150px]" />
    <Text sm secondary>objectCover (default)</Text>
  </Col>
  <Col itemsCenter>
    <Img objectContain src={portraitSrc} alt="Contain fits inside the box" className="w-[200px] h-[150px]" />
    <Text sm secondary>objectContain</Text>
  </Col>
  <Col itemsCenter>
    <Img objectFill src={portraitSrc} alt="Fill stretches to the box" className="w-[200px] h-[150px]" />
    <Text sm secondary>objectFill</Text>
  </Col>
</Row>
```

## Aspect ratio

`aspectSquare` and `aspectVideo` fix the shape of the image at 1:1 and 16:9: set the width, and the height follows. With `objectCover`, the default, the photo is cropped to fill that shape, so a gallery of photos of different sizes lines up. `aspectAuto` goes back to the photo's own shape. These props need `@vaneui/ui` 1.8.0 or later.

```tsx demo
<Row flexWrap itemsStart>
  <Img aspectSquare src={placeholderSrc} alt="Square crop" className="w-32" />
  <Img aspectVideo src={portraitSrc} alt="16:9 crop of a portrait photo" className="w-56" />
</Row>
```

## Inside a Card

For a media tile, put the `Img` first in a Card built from parts and the text in a `CardBody`. A Card of parts has no inset of its own, so the image sits on the Card's top edge: it takes the Card's corners there, less the border, and is square where it meets the body. Use `wFull` so the image spans the card width. An `Img` that closes the Card takes the bottom corners the same way.

```tsx demo
<Row flexWrap itemsStart>
  <Card className="w-[240px]">
    <Img wFull src={placeholderSrc} alt="Sunset over the harbor" className="h-[140px]" />
    <CardBody>
      <Title sm>Harbor Sunset</Title>
      <Text sm secondary>Captured last weekend on a walk along the pier.</Text>
    </CardBody>
  </Card>
  <Card className="w-[240px]">
    <Img wFull src={placeholderSrc} alt="Forest trail at dawn" className="h-[140px]" />
    <CardBody>
      <Title sm>Forest Trail</Title>
      <Text sm secondary>Early morning hike through the pine forest.</Text>
    </CardBody>
  </Card>
</Row>
```

An `Img` inside a padded Card keeps its own corners on all four sides, as do a `sharp` or `pill` Img and one with a radius class of your own. The edge corners need `@vaneui/ui` 1.8.0 or later; on earlier releases, give the Card `noPadding` and `overflowHidden` and the Img `sharp`.

## Keeping its size in a row with noShrink

In a flex [Row](/docs/layout-components/row), an image is a flex item that can give up width when the row runs out of room. `noShrink` sets `flex-shrink: 0`, so a logo or an avatar keeps its size and the text beside it gives way instead. Here the row also takes `whitespaceNowrap` and `overflowHidden`, so the label stays on one line and clips at the row's edge. `noShrink` on Img needs `@vaneui/ui` 1.4.5 or later.

```tsx demo
<Row whitespaceNowrap overflowHidden className="max-w-80">
  <Img noShrink pill src={avatarSrc} alt="" width={32} height={32}/>
  <Text sm>A long label that stays on one line and clips at the edge of its row</Text>
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

## Frequently asked questions

### How do I make a round avatar?

Use [Avatar](/docs/basic-components/avatar). It sizes the circle with the size prop, crops the photo to fill it, and falls back to the initials of `name` when the image is missing or fails to load. For a round Img of your own, add `pill` and `aspectSquare` and set a width, for example `<Img pill aspectSquare className="w-10" />`. `objectCover`, a default, crops a photo that is not square to fill the circle.

### How do I add a caption to an image?

Wrap the Img and its caption in `<Col tag="figure">`, and render the caption with `<Text tag="figcaption" sm secondary>`. The caption then names the figure for assistive technology. Keep the `alt` text as well: it describes what the image shows, while the caption adds context such as a credit, a date or a place.

### Can I use Img with the Next.js Image component?

Yes: pass it as the `tag`, as in `<Img tag={Image} src="/team.jpg" alt="The team" width={600} height={400}/>` with `Image` imported from `next/image`. Img then renders that component with its own classes, so the shape, border and object-fit props still apply, while Next.js resizes and lazy-loads the file. Next.js still requires `width` and `height`, or `fill`.
