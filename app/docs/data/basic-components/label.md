---
componentKey: label
importPath: 'import { Label } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/label.tsx
since: 0.9.0
---

Displays text with various styling options for categorization, status indicators, or highlighting important information. Labels can be styled with different colors, sizes, and variants.

## Basic Usage

Default label styles and text.

```tsx demo
<Row flexWrap>
  <Label>Default</Label>
  <Label primary>Primary Action</Label>
  <Label secondary>Secondary Info</Label>
  <Label success>Success</Label>
  <Label warning>Warning</Label>
  <Label danger>Error</Label>
</Row>
```

## Sizes

Labels come in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.size.map((key: string) => (
      <Label key={key} {...{[key]: true}} primary>
        Label {key}
      </Label>
    ))
  }
</Row>
```

## Appearances

Labels use `inherit` appearance by default — they inherit color from their parent. Set an explicit appearance to override.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.appearance.map((key: string) => (
      <Label key={key} {...{[key]: true}}>
        {key} label
      </Label>
    ))
  }
</Row>
```

## Font Weights

Labels support different font weights.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.fontWeight.map((key: string) => (
      <Label key={key} {...{[key]: true}} lg>
        {key} weight
      </Label>
    ))
  }
</Row>
```

## Text Decorations

Labels with different text decorations.

```tsx demo
<Row flexWrap>
  {
    ComponentKeys.textDecoration.map((key: string) => (
      <Label key={key} {...{[key]: true}} lg>
        {key} text
      </Label>
    ))
  }
</Row>
```

## With Form Elements

Labels pair naturally with inputs and checkboxes for accessible forms.

```tsx demo
<Col>
  <Col noGap>
    <Label semibold>Email Address</Label>
    <Input placeholder="you@example.com" />
  </Col>
  <Col noGap>
    <Label semibold>Password</Label>
    <Input placeholder="Enter password" />
  </Col>
  <Row>
    <Checkbox />
    <Label>Remember me</Label>
  </Row>
</Col>
```

## Size Propagation

When an `Input` or `Checkbox` is nested inside a `Label`, it automatically picks up the Label's size — set it once on the Label and everything scales together. Pass a size on the child to opt out for that one element.

```tsx demo
<Col>
  <Label sm>
    Small field
    <Input placeholder="you@example.com" />
  </Label>
  <Label>
    Default (md) field
    <Input placeholder="you@example.com" />
  </Label>
  <Label lg>
    Large field
    <Input placeholder="you@example.com" />
  </Label>
  <Label xl>
    <Checkbox />
    Extra-large checkbox option
  </Label>
  <Label lg>
    <Checkbox xs />
    Explicit <code>xs</code> checkbox overrides the <code>lg</code> label
  </Label>
</Col>
```

## Required & Status

Use appearances to indicate field status — `danger` for errors, `success` for valid, `secondary` for hints.

```tsx demo
<Col>
  <Col noGap>
    <Label semibold>Username <Label danger>*</Label></Label>
    <Input placeholder="Choose a username" />
  </Col>
  <Col noGap>
    <Label success semibold>Email verified</Label>
    <Input placeholder="verified@example.com" />
  </Col>
  <Label sm secondary>All fields marked with * are required.</Label>
</Col>
```
