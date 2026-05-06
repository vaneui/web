---
componentKey: code
importPath: 'import { Code } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/code.tsx
since: 0.9.0
---

Renders inline code snippets with syntax highlighting. Perfect for displaying code examples, commands, file paths, or technical terms within text content.

## Basic Usage

Inline code snippets with default styling.

```tsx demo
<Row flexWrap>
  <span>Use the <Code>npm install</Code> command to install packages.</span>
  <span>The <Code>{"const variable = 'value'"}</Code> syntax declares a constant.</span>
</Row>
```

## Sizes

Code elements in different sizes - `xs`, `sm`, `md`, `lg`, `xl`.

```tsx demo
<Col>
  <Row><span>Size xs: <Code xs>{"console.log('Hello')"}</Code></span></Row>
  <Row><span>Size sm: <Code sm>{"console.log('Hello')"}</Code></span></Row>
  <Row><span>Size md: <Code md>{"console.log('Hello')"}</Code></span></Row>
  <Row><span>Size lg: <Code lg>{"console.log('Hello')"}</Code></span></Row>
  <Row><span>Size xl: <Code xl>{"console.log('Hello')"}</Code></span></Row>
</Col>
```

## Appearances

Different code color variants for syntax highlighting.

```tsx demo
<Row flexWrap>
  <Code primary>primary code</Code>
  <Code brand>brand code</Code>
  <Code accent>accent code</Code>
  <Code secondary>secondary code</Code>
  <Code tertiary>tertiary code</Code>
  <Code success>success code</Code>
  <Code danger>danger code</Code>
  <Code warning>warning code</Code>
  <Code info>info code</Code>
  <Code link>link code</Code>
  <Code inherit>inherit code</Code>
</Row>
```

## Code in Context

Code elements used within text content.

```tsx demo
<Col>
  <Text>
    To create a new React component, use <Code>{"function Component() {}"}</Code> or
    the arrow function syntax <Code>{"const Component = () => {}"}</Code>.
  </Text>
  <p>
    Install the package with <Code primary>npm i @vaneui/ui</Code> and then
    import it using <Code secondary>{'import { Button } from "@vaneui/ui"'}</Code>.
  </p>
  <Text>
    The <Code info>useState</Code> hook returns an array with two elements:
    the current state value and a setter function like <Code info>[state, setState]</Code>.
  </Text>
</Col>
```

## Keyboard Shortcuts

Code elements for displaying keyboard shortcuts and commands.

```tsx demo
<Row flexWrap>
  <Text primary>
    <Code>Ctrl</Code>+<Code>C</Code>
  </Text>
  or
  <Text primary>
    <Code primary>Cmd</Code>+<Code primary>V</Code>
  </Text>
</Row>
```

## In Heading Context

Code uses an em-based geometry pipeline — at the default `md` size it renders at ~87.5% of the surrounding text's font-size, with padding and border-radius scaling proportionally. The same `<Code>` looks right inside body copy, a subheading, a section heading, or a page title.

```tsx demo
<Col>
  <Text>Body text with <Code>npm install</Code> inline.</Text>
  <Title>Subheading: run <Code>npm run build</Code> first.</Title>
  <SectionTitle>Section: <Code>useState</Code> hook</SectionTitle>
  <PageTitle><Code>@vaneui/ui</Code></PageTitle>
</Col>
```

## Filled & Outline Variants

Code defaults to `outline` variant. Use `filled` for stronger visual emphasis.

```tsx demo
<Col>
  <Text>Default outline: <Code>npm install</Code> then <Code>npm run build</Code></Text>
  <Text>Filled: <Code filled>git commit</Code> then <Code filled>git push</Code></Text>
  <Text>Colored filled: <Code success filled>200 OK</Code> <Code danger filled>500 Error</Code> <Code warning filled>deprecated</Code></Text>
</Col>
```
