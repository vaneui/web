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
  <Kbd>Pri</Kbd>
  <Kbd brand>Bra</Kbd>
  <Kbd accent>Acc</Kbd>
  <Kbd secondary>Sec</Kbd>
  <Kbd tertiary>Ter</Kbd>
  <Kbd success>Suc</Kbd>
  <Kbd danger>Dan</Kbd>
  <Kbd warning>War</Kbd>
  <Kbd info>Inf</Kbd>
  <Kbd link>Lin</Kbd>
</Row>
```

## Key combinations

Combine multiple `Kbd` elements to show keyboard shortcuts.

```tsx demo
<Col>
  <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>C</Kbd><Text sm secondary>Copy</Text></Row>
  <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>V</Kbd><Text sm secondary>Paste</Text></Row>
  <Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>P</Kbd><Text sm secondary>Command Palette</Text></Row>
  <Row><Kbd>Alt</Kbd><Text>+</Text><Kbd>Tab</Kbd><Text sm secondary>Switch Window</Text></Row>
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
  <Row justifyBetween><Text>Undo</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Z</Kbd></Row></Row>
  <Row justifyBetween><Text>Redo</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>Shift</Kbd><Text>+</Text><Kbd>Z</Kbd></Row></Row>
  <Row justifyBetween><Text>Find</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>F</Kbd></Row></Row>
  <Row justifyBetween><Text>Save</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>S</Kbd></Row></Row>
  <Row justifyBetween><Text>Select All</Text><Row><Kbd>Ctrl</Kbd><Text>+</Text><Kbd>A</Kbd></Row></Row>
</Col>
```
