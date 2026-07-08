---
componentKey: kbd
importPath: 'import { Kbd } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/kbd/Kbd.tsx
since: 0.9.0
---

## Basic usage

Display keyboard keys with the `Kbd` component.

```tsx demo
<Row flexWrap>
  <Kbd>Ctrl</Kbd>
  <Kbd>Shift</Kbd>
  <Kbd>Enter</Kbd>
  <Kbd>Esc</Kbd>
  <Kbd>Tab</Kbd>
</Row>
```

## Sizes

Kbd elements in different sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Row flexWrap itemsEnd>
  <Col itemsCenter>
    <Kbd xs>Ctrl</Kbd>
    <Text sm secondary>xs</Text>
  </Col>
  <Col itemsCenter>
    <Kbd sm>Ctrl</Kbd>
    <Text sm secondary>sm</Text>
  </Col>
  <Col itemsCenter>
    <Kbd>Ctrl</Kbd>
    <Text sm secondary>md</Text>
  </Col>
  <Col itemsCenter>
    <Kbd lg>Ctrl</Kbd>
    <Text sm secondary>lg</Text>
  </Col>
  <Col itemsCenter>
    <Kbd xl>Ctrl</Kbd>
    <Text sm secondary>xl</Text>
  </Col>
</Row>
```

## Appearances

Different color appearances for keyboard keys.

```tsx demo
<Row flexWrap>
  <Kbd>Ctrl</Kbd>
  <Kbd brand>Shift</Kbd>
  <Kbd accent>Alt</Kbd>
  <Kbd secondary>Tab</Kbd>
  <Kbd tertiary>Esc</Kbd>
  <Kbd success>Enter</Kbd>
  <Kbd danger>Del</Kbd>
  <Kbd warning>Fn</Kbd>
  <Kbd info>F5</Kbd>
  <Kbd link>⌘</Kbd>
</Row>
```

## Key combinations

Combine multiple `Kbd` elements to show keyboard shortcuts.

```tsx demo
<Col>
  <Text><Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy</Text>
  <Text><Kbd>Ctrl</Kbd> + <Kbd>V</Kbd> to paste</Text>
  <Text><Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>P</Kbd> for the command palette</Text>
  <Text><Kbd>Alt</Kbd> + <Kbd>Tab</Kbd> to switch windows</Text>
</Col>
```

## In text context

Kbd elements blend naturally within text content.

```tsx demo
<Col>
  <Text>Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> to save your work.</Text>
  <Text>Use <Kbd sm>Esc</Kbd> to close the dialog.</Text>
  <Text>Hit <Kbd info>F5</Kbd> to refresh the page.</Text>
</Col>
```

## In heading context

Kbd uses an em-based geometry pipeline: its font-size, padding, and border-radius all scale proportionally to the surrounding text. The same `<Kbd>` keeps its keycap look at body, subheading, section heading, and page title sizes.

```tsx demo
<Col>
  <Text>Press <Kbd>Ctrl</Kbd> + <Kbd>S</Kbd> to save.</Text>
  <Title>Subheading: hit <Kbd>Esc</Kbd> to close.</Title>
  <SectionTitle>Section: use <Kbd>Tab</Kbd> to focus</SectionTitle>
  <PageTitle><Kbd>⌘</Kbd> + <Kbd>K</Kbd></PageTitle>
</Col>
```

## Shortcut table

Display a set of keyboard shortcuts in a structured layout.

```tsx demo
<Col>
  <Row justifyBetween><Text>Undo</Text><Text><Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd></Text></Row>
  <Row justifyBetween><Text>Redo</Text><Text><Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd> + <Kbd>Z</Kbd></Text></Row>
  <Row justifyBetween><Text>Find</Text><Text><Kbd>Ctrl</Kbd> + <Kbd>F</Kbd></Text></Row>
  <Row justifyBetween><Text>Save</Text><Text><Kbd>Ctrl</Kbd> + <Kbd>S</Kbd></Text></Row>
  <Row justifyBetween><Text>Select all</Text><Text><Kbd>Ctrl</Kbd> + <Kbd>A</Kbd></Text></Row>
</Col>
```
