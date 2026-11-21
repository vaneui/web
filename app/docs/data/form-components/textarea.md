---
componentKey: textarea
importPath: 'import { Textarea } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/textarea/Textarea.tsx
since: 1.1.0
---

Textarea is for comments, descriptions and other free-form text; a name, an email address or a number belongs in a single-line [Input](/docs/form-components/input). A Textarea inside a [Label](/docs/form-components/label) or a [Field](/docs/form-components/field) takes its size from that parent unless it sets its own.

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
  <Textarea placeholder="sm (default)"/>
  <Textarea md placeholder="md"/>
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

## Frequently asked questions

### How do I set the height of a Textarea?

Pass `rows`. Without `rows`, a Textarea is at least three lines tall; with `rows` set, that minimum no longer applies, so `rows={2}` gives a two-line box and `rows={8}` a taller one. The font size follows the size prop, so the same `rows` gives a taller box at `lg` than at `sm`. The user can still drag the bottom edge to resize it.

### Can a Textarea grow with its content?

Not by itself: Textarea adds no auto-grow, and the user resizes it by dragging, since it resizes vertically by default. The CSS `field-sizing: content` property makes a textarea grow with its text in browsers that support it, so set it in a class of your own stylesheet. To turn off manual resizing, pass `style={{ resize: 'none' }}`, which wins over the stylesheet.

### How do I show a character count?

Make the Textarea controlled, set `maxLength`, and put the count in the `description` of the [Field](/docs/form-components/field) around it, for example `description={text.length + ' of 280 characters'}`. The browser stops input at `maxLength`. The description is linked to the textarea with `aria-describedby`, so a screen reader reads the count when the field gets focus.
