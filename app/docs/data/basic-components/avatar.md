---
componentKey: avatar
propsTables: Avatar=avatar, AvatarGroup=avatarGroup
importPath: 'import { Avatar, AvatarGroup } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/avatar/Avatar.tsx
since: 1.8.0
---

Avatar is a small picture of a person, a team or a workspace: in a comment thread, a member list, a header or next to an assignee. It renders a `<span>` of a fixed size that shows the image from `src`, the initials of `name` when there is no image or it fails to load, or a person icon when there is neither. AvatarGroup shows several avatars as one overlapping row. For a photo that is part of the content, use [Img](/docs/layout-components/img). Avatar needs `@vaneui/ui` 1.8.0 or later.

```tsx setup
const photo = "/puppy.webp";
```

## Basic usage

Pass the image in `src` and the person's name in `name`. The name becomes the image's text alternative, so a screen reader reads "Biscuit" for the avatar below.

```tsx demo
<Row>
  <Avatar src={photo} name="Biscuit"/>
  <Text>Biscuit commented on your pull request.</Text>
</Row>
```

Pass `alt` when the text alternative should differ from the name. With neither `name` nor `alt`, the image is decorative and gets `alt=""`.

## Initials and the person icon

Without an image, Avatar shows the first letters of the first and last word of `name`, in upper case. An image that fails to load falls back to the same initials, and a new `src` is tried again. With no image and no name, Avatar shows a person icon that is hidden from assistive technology.

```tsx demo
<Row>
  <Avatar name="Ada Lovelace"/>
  <Avatar src="/missing-photo.png" name="Grace Brewster Hopper"/>
  <Avatar name="élodie durand"/>
  <Avatar/>
</Row>
```

Initials get `role="img"` and the name as their `aria-label`, so the letters are read as the person's name rather than spelled out.

## Sizes

Size sets the box, the corner radius and the initials together: 24, 32, 40, 48 and 64px from `xs` to `xl`, with `md` (40px) as the default.

```tsx demo
<Row>
  <Avatar xs name="Ada Lovelace"/>
  <Avatar sm name="Ada Lovelace"/>
  <Avatar name="Ada Lovelace"/>
  <Avatar lg name="Ada Lovelace"/>
  <Avatar xl name="Ada Lovelace"/>
</Row>
```

## Appearances and variants

The default is a neutral `secondary` `outline` circle with a thin edge. An appearance colors the initials and the icon, and `filled` paints the circle in the appearance color.

```tsx demo
<Col>
  <Row>
    <Avatar name="Ada Lovelace"/>
    <Avatar primary name="Ada Lovelace"/>
    <Avatar accent name="Ada Lovelace"/>
    <Avatar success name="Ada Lovelace"/>
    <Avatar info name="Ada Lovelace"/>
  </Row>
  <Row>
    <Avatar filled name="Ada Lovelace"/>
    <Avatar primary filled name="Ada Lovelace"/>
    <Avatar accent filled name="Ada Lovelace"/>
    <Avatar success filled name="Ada Lovelace"/>
    <Avatar info filled name="Ada Lovelace"/>
  </Row>
</Col>
```

## Circle or square

`pill` (a circle) is the default. `rounded` gives a square with corners a quarter of the size, which suits a team, a workspace or a company logo. `sharp` drops the corners.

```tsx demo
<Row>
  <Avatar name="Design Team"/>
  <Avatar rounded name="Design Team"/>
  <Avatar sharp name="Design Team"/>
  <Avatar rounded src={photo} name="Biscuit"/>
</Row>
```

## Icons and other content

Children take the place of the initials, so an Avatar can hold an icon or an emoji. With a `name`, the box still gets `role="img"` and the name as its label.

```tsx demo
<Row>
  <Avatar rounded accent name="Billing">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2"/>
      <path d="M2 10h20"/>
    </svg>
  </Avatar>
  <Avatar name="Party">🎉</Avatar>
</Row>
```

## Overlapping avatars with AvatarGroup

AvatarGroup lays avatars out in one row, each overlapping the one before it by a quarter of its size, with a ring in the surface color between them. A size on the group reaches every avatar in it, and an avatar with its own size keeps it. Give the group an `aria-label`, since it renders `role="group"`.

```tsx demo
<AvatarGroup aria-label="Editors">
  <Avatar src={photo} name="Biscuit"/>
  <Avatar name="Ada Lovelace"/>
  <Avatar name="Alan Turing"/>
  <Avatar name="Grace Hopper"/>
</AvatarGroup>
```

`max` shows that many avatars and counts the rest in one "+N" avatar. When only the first few people are loaded, `total` sets the full count, and the "+N" avatar counts against it.

```tsx demo
<Col>
  <AvatarGroup lg max={3} aria-label="Reviewers">
    <Avatar src={photo} name="Biscuit"/>
    <Avatar name="Ada Lovelace"/>
    <Avatar name="Alan Turing"/>
    <Avatar name="Grace Hopper"/>
    <Avatar name="Barbara Liskov"/>
  </AvatarGroup>
  <AvatarGroup sm total={12} aria-label="Members">
    <Avatar name="Ada Lovelace"/>
    <Avatar name="Alan Turing"/>
    <Avatar name="Grace Hopper"/>
  </AvatarGroup>
</Col>
```

## Image attributes

`imgProps` reaches the inner `<img>`, for `loading`, `referrerPolicy`, `srcSet` and an `onError` handler of your own, which still runs before the fallback to initials.

```tsx demo
<Avatar src={photo} name="Biscuit" imgProps={{ loading: 'lazy', decoding: 'async' }}/>
```

## Customizing

Set app-wide defaults with `ThemeProvider`'s `themeDefaults`. Avatar and AvatarGroup each have their own node.

```tsx demo
<ThemeProvider themeDefaults={{
  avatar: { rounded: true, primary: true },
  avatarGroup: { sm: true },
}}>
  <AvatarGroup aria-label="Owners">
    <Avatar name="Ada Lovelace"/>
    <Avatar name="Alan Turing"/>
  </AvatarGroup>
</ThemeProvider>
```

## Frequently asked questions

### What does Avatar show when the image fails to load?

The initials of `name`, the same as with no `src` at all. Avatar listens to the image's `error` event, and a failure before React hydrates the page is caught too. When `src` changes, the new image is tried again. Without a `name`, a failed image falls back to the person icon.

### Should I pass `name` or `alt`?

Pass `name`. It gives the initials, and it is also the text alternative of the image, so one prop covers both. Use `alt` only when the image needs a different description, such as "Ada, profile photo". An avatar next to the person's name in text can drop both, since the image adds nothing to what the text already says.

### How do I make an avatar a link or a button?

Wrap it in a [Link](/docs/typography-components/link) or a [Button](/docs/basic-components/button) with an accessible name, or pass `tag` to render another element. Avatar itself has no `href` and no button semantics, so an `onClick` on it is not reachable from the keyboard.
