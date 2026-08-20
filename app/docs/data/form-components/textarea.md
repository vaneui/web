---
componentKey: textarea
importPath: 'import { Textarea } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/textarea/Textarea.tsx
since: 1.1.0
---

## Basic usage

Textarea is an Input that wraps lines. It shares the Input size ramp and appearance props, and renders a real `<textarea>`, so every native attribute works.

```tsx demo
<Textarea placeholder="What changed in this release?" rows={4}/>
```

It resizes vertically by default and has a minimum height of three lines, so an empty textarea never collapses to a single row.

## Sizes

```tsx demo
<Col>
  <Textarea xs placeholder="xs"/>
  <Textarea sm placeholder="sm"/>
  <Textarea placeholder="md (default)"/>
  <Textarea lg placeholder="lg"/>
  <Textarea xl placeholder="xl"/>
</Col>
```

## Variants

Textarea is `outline` by default. Use `filled` for a solid background, and the appearance props for status colour.

```tsx demo
<Col>
  <Row flexWrap itemsStretch>
    <Textarea className="w-56" placeholder="Outline (default)"/>
    <Textarea className="w-56" success placeholder="Outline success"/>
    <Textarea className="w-56" danger placeholder="Outline danger"/>
  </Row>
  <Row flexWrap itemsStretch>
    <Textarea className="w-56" filled placeholder="Filled"/>
    <Textarea className="w-56" filled success placeholder="Filled success"/>
    <Textarea className="w-56" filled danger placeholder="Filled danger"/>
  </Row>
</Col>
```

## Shapes

```tsx demo
<Col>
  <Textarea rows={2} placeholder="Rounded, the default"/>
  <Textarea sharp rows={2} placeholder="Sharp"/>
  <Textarea pill rows={2} placeholder="Pill"/>
</Col>
```

## States

`invalid` paints a danger border and ring and emits `aria-invalid="true"`. Unlike `Input`, a Textarea shows no overlaid alert icon: a single-line field has one obvious place to put one, a box that grows does not. The border is therefore the only *visual* cue on its own, so pair `invalid` with a `Field` and let the `error` message carry the reason. It renders in danger text below the box and is linked with `aria-describedby`.

Note that the value itself never turns red. Colouring what the user typed hurts readability and says nothing about what is wrong.

```tsx demo
<Col>
  <Textarea placeholder="Default"/>
  <Field error="Tell us at least a sentence about what changed.">
    <Textarea defaultValue="Too short"/>
  </Field>
  <Textarea disabled defaultValue="Disabled"/>
  <Textarea readOnly defaultValue="Read only"/>
</Col>
```

## With a label and help text

```tsx demo
<Field label="Release notes" description="Markdown is supported.">
  <Textarea rows={3} placeholder="What changed?"/>
</Field>
```
