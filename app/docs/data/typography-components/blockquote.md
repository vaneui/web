---
componentKey: blockquote
importPath: 'import { Blockquote } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/blockquote.tsx
since: 0.9.0
---

Displays quoted content with a left border accent. Inherits appearance from the parent by default for seamless embedding in themed containers.

## Basic Usage

Display a styled quotation with a left border accent. Blockquote inherits appearance from the parent by default.

```tsx demo
<Col>
  <Blockquote>The only way to do great work is to love what you do.</Blockquote>
  <Blockquote>Design is not just what it looks like and feels like. Design is how it works.</Blockquote>
</Col>
```

## Appearances

Apply appearance props to color the blockquote. The default is `inherit`, which picks up the parent color.

```tsx demo
<Col>
  {
    ['primary', 'brand', 'accent', 'secondary', 'success', 'danger', 'warning', 'info'].map((key) => (
      <Blockquote key={key} {...{[key]: true}}>
        {key.charAt(0).toUpperCase() + key.slice(1)} appearance blockquote.
      </Blockquote>
    ))
  }
</Col>
```

## Sizes

Blockquote supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  {
    ComponentKeys.size.map((key) => (
      <Blockquote key={key} {...{[key]: true}} primary>
        Size {key}: The best way to predict the future is to create it.
      </Blockquote>
    ))
  }
</Col>
```

## Inside a Card

Blockquote inherits the parent appearance, making it blend seamlessly inside themed containers.

```tsx demo
<Row flexWrap>
  <Card primary>
    <Blockquote>Inherits primary from the card.</Blockquote>
  </Card>
  <Card success>
    <Blockquote>Inherits success from the card.</Blockquote>
  </Card>
  <Card danger>
    <Blockquote>Inherits danger from the card.</Blockquote>
  </Card>
</Row>
```

## With Rich Content

Blockquotes can contain multiple paragraphs and nested components.

```tsx demo
<Blockquote primary>
  <Text bold>Steve Jobs</Text>
  <Text>Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.</Text>
</Blockquote>
```

## Testimonial Pattern

Use blockquotes with attribution for testimonials and customer quotes.

```tsx demo
<Col>
  <Blockquote brand>
    <Text italic>VaneUI made our design system migration incredibly smooth. The boolean props API is intuitive and the theming is powerful.</Text>
    <Text sm bold>— Sarah Chen, Lead Engineer</Text>
  </Blockquote>
  <Blockquote success>
    <Text italic>We shipped our new dashboard in half the time thanks to VaneUI components.</Text>
    <Text sm bold>— Alex Rivera, Product Manager</Text>
  </Blockquote>
</Col>
```

## Variants

Use `filled` for solid background blockquotes or `outline` (default) for the left-border accent style.

```tsx demo
<Col>
  <Blockquote primary>Outline (default) — with a left border accent.</Blockquote>
  <Blockquote primary filled>Filled — solid background for emphasis.</Blockquote>
  <Blockquote info>Outline info — informational note.</Blockquote>
  <Blockquote info filled>Filled info — strong callout.</Blockquote>
</Col>
```
