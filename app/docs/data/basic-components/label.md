---
componentKey: label
importPath: 'import { Label } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/label/Label.tsx
since: 0.9.0
---

## Basic usage

A `Label` defaults to `sm` size and `inherit` appearance, so it picks up text color from its surroundings.

```tsx demo
<Label>Email address</Label>
```

## Sizes

Labels come in five sizes: `xs`, `sm` (default), `md`, `lg`, `xl`. Nested `Input` and `Checkbox` controls inherit the size.

```tsx demo
<Col>
  <Label xs>xs label <Input placeholder="xs input" /></Label>
  <Label>sm label (default) <Input placeholder="sm input" /></Label>
  <Label md>md label <Input placeholder="md input" /></Label>
  <Label lg>lg label <Input placeholder="lg input" /></Label>
  <Label xl>xl label <Input placeholder="xl input" /></Label>
</Col>
```

## Appearances

Labels default to `inherit`: they take their color from the surrounding text. Set an explicit appearance to override.

```tsx demo
<Row flexWrap>
  <Label>inherit label (default)</Label>
  <Label primary>primary label</Label>
  <Label brand>brand label</Label>
  <Label accent>accent label</Label>
  <Label secondary>secondary label</Label>
  <Label tertiary>tertiary label</Label>
  <Label success>success label</Label>
  <Label danger>danger label</Label>
  <Label warning>warning label</Label>
  <Label info>info label</Label>
  <Label link>link label</Label>
</Row>
```

## With Input

Wrap an `Input` inside a `Label` to make the label clickable and associate them implicitly. No `htmlFor`/`id` wiring required.

```tsx demo
<Col noGap>
  <Label>
    Email
    <Input placeholder="you@example.com" />
  </Label>
</Col>
```

## With Checkbox

Place a `Checkbox` inside a `Label` so the label text expands the toggle's hit area. `Label` defaults to a stacked column layout, so add `row itemsCenter` to sit the checkbox inline with its text.

```tsx demo
<Label row itemsCenter>
  <Checkbox />
  Subscribe to product updates
</Label>
```

## htmlFor association

When the control lives outside the label, use the standard `htmlFor` attribute pointing at the input's `id`.

```tsx demo
<Col noGap>
  <Label htmlFor="username">Username</Label>
  <Input id="username" placeholder="Choose a username" />
</Col>
```

## Font weights

The default weight is `medium`. Override with any weight prop from `thin` to `black`.

```tsx demo
<Col>
  <Label thin>thin weight</Label>
  <Label extralight>extralight weight</Label>
  <Label light>light weight</Label>
  <Label normal>normal weight</Label>
  <Label>medium weight (default)</Label>
  <Label semibold>semibold weight</Label>
  <Label bold>bold weight</Label>
  <Label extrabold>extrabold weight</Label>
  <Label black>black weight</Label>
</Col>
```

## Text decorations

Apply text decorations as needed.

```tsx demo
<Row flexWrap>
  <Label underline>underline text</Label>
  <Label lineThrough>lineThrough text</Label>
  <Label overline>overline text</Label>
</Row>
```

## Size propagation

When an `Input` or `Checkbox` is nested inside a `Label`, it automatically picks up the label's size. Set it once and everything scales together. Pass a size on the child to opt out for that one element.

```tsx demo
<Col>
  <Label xl row itemsCenter>
    <Checkbox />
    Extra-large checkbox option
  </Label>
  <Label lg row itemsCenter>
    <Checkbox xs />
    Explicit <Code>xs</Code> checkbox overrides the <Code>lg</Code> label
  </Label>
</Col>
```

## Required and status

Use appearances to indicate field status: `danger` for errors, `success` for valid, `secondary` for hints.

```tsx demo
<Col>
  <Col noGap>
    <Label semibold>Username <Text tag="span" danger>*</Text></Label>
    <Input placeholder="Choose a username" />
  </Col>
  <Col noGap>
    <Label success semibold>Email verified</Label>
    <Input placeholder="verified@example.com" />
  </Col>
  <Label secondary>All fields marked with * are required.</Label>
</Col>
```
