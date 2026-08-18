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

## States

`invalid` adds a danger border and emits `aria-invalid`, so the error state is never colour-only. Pair it with `Field` to attach a message.

```tsx demo
<Col>
  <Textarea placeholder="Default"/>
  <Textarea invalid defaultValue="Too short"/>
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
