---
componentKey: code
importPath: 'import { Code } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/code/Code.tsx
since: 0.9.0
---

Renders inline code snippets with syntax highlighting. Perfect for displaying code examples, commands, file paths, or technical terms within text content.

## Basic usage

Inline code snippets with default styling. `Code` aligns to the surrounding text's baseline, so it lines up with the text it's inlined in. Pass `href` to render `Code` as `<a>` instead of `<code>`. A focus-visible outline auto-enables when `href` is set.

```tsx demo
<Col>
  <Text>Run <Code>npm install</Code> to install packages.</Text>
  <Text>Declare a constant with <Code>{"const x = 'value'"}</Code>.</Text>
</Col>
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

## Code in context

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

## Keyboard shortcuts

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

## In heading context

Code uses an em-based geometry pipeline: at the default `md` size it renders at ~87.5% of the surrounding text's font-size, with padding and border-radius scaling proportionally. The same `<Code>` looks right inside body copy, a subheading, a section heading, or a page title.

```tsx demo
<Col>
  <Text>Body text with <Code>npm install</Code> inline.</Text>
  <Title>Subheading: run <Code>npm run build</Code> first.</Title>
  <SectionTitle>Section: <Code>useState</Code> hook</SectionTitle>
  <PageTitle><Code>@vaneui/ui</Code></PageTitle>
</Col>
```

## Filled and outline variants

Code defaults to `outline` variant. Use `filled` for stronger visual emphasis.

```tsx demo
<Col>
  <Text>Default outline: <Code>npm install</Code> then <Code>npm run build</Code></Text>
  <Text>Filled: <Code filled>git commit</Code> then <Code filled>git push</Code></Text>
  <Text>Colored filled: <Code success filled>200 OK</Code> <Code danger filled>500 Error</Code> <Code warning filled>deprecated</Code></Text>
</Col>
```

## Shapes

Code supports `rounded` (default), `pill`, and `sharp` border-radius styles.

```tsx demo
<Row flexWrap>
  <Code rounded>rounded</Code>
  <Code pill>pill</Code>
  <Code sharp>sharp</Code>
</Row>
```

## As Link

Add `href` to render the `Code` element as an `<a>` tag. A keyboard focus-visible outline auto-renders so the link is reachable via Tab; opt out with `noFocusVisible`.

```tsx demo
<Col>
  <Text>Install <Code href="https://npmjs.com/package/@vaneui/ui" target="_blank" rel="noopener noreferrer">@vaneui/ui</Code> from npm.</Text>
  <Text>The <Code href="#useState" info>useState</Code> hook returns a value and a setter.</Text>
  <Text>See the <Code href="#install" filled success>install guide</Code> for setup steps.</Text>
</Col>
```

## Next.js Link integration

Use the `tag` prop to render `Code` as a Next.js `Link` for client-side navigation.

```tsx
import Link from 'next/link';
import { Code, Text } from '@vaneui/ui';

<Text>
  Read the <Code href="/docs/getting-started" tag={Link}>getting started guide</Code> for setup steps.
</Text>
```
