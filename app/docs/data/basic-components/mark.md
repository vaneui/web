---
componentKey: mark
importPath: 'import { Mark } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/mark/Mark.tsx
since: 0.9.0
---

## Basic usage

Highlight text with the `Mark` component. Defaults to `warning` (yellow) appearance for a natural highlighter effect.

```tsx demo
<Row flexWrap>
  <Mark>Highlighted text</Mark>
  <Mark>Important</Mark>
  <Mark>Key term</Mark>
</Row>
```

## Appearances

Different color appearances for highlights.

```tsx demo
<Row flexWrap>
  <Mark primary>Primary</Mark>
  <Mark brand>Brand</Mark>
  <Mark accent>Accent</Mark>
  <Mark secondary>Secondary</Mark>
  <Mark tertiary>Tertiary</Mark>
  <Mark success>Success</Mark>
  <Mark danger>Danger</Mark>
  <Mark info>Info</Mark>
  <Mark link>Link</Mark>
</Row>
```

## Variants

Mark supports `outline` (default) and `filled` variants.

```tsx demo
<Col>
  <Row flexWrap>
    <Mark>outline (default)</Mark>
    <Mark primary>primary outline</Mark>
    <Mark success>success outline</Mark>
    <Mark danger>danger outline</Mark>
  </Row>
  <Row flexWrap>
    <Mark filled>filled</Mark>
    <Mark primary filled>primary filled</Mark>
    <Mark success filled>success filled</Mark>
    <Mark danger filled>danger filled</Mark>
  </Row>
</Col>
```

## Highlight matches context

Mark defaults to `inheritSize: true` so a highlight always renders at the same size as the surrounding text (body copy, subheading, section heading, or page title) without passing any size prop.

```tsx demo
<Col>
  <Text>Body text with a <Mark>highlighted phrase</Mark> inline.</Text>
  <Title>Subheading with <Mark>highlighted text</Mark> inside.</Title>
  <SectionTitle>Section heading with <Mark>a highlight</Mark>.</SectionTitle>
  <PageTitle>Page title <Mark>highlight</Mark></PageTitle>
</Col>
```

## Opting out with noInheritSize

Pass `noInheritSize` together with a size prop to render Mark at a fixed size regardless of the parent.

```tsx demo
<Title>
  Subheading with a <Mark sm noInheritSize>fixed-small highlight</Mark> inside.
</Title>
```

## In text context

Mark elements blend naturally within body text for inline highlights.

```tsx demo
<Col>
  <Text>VaneUI uses a <Mark>boolean props API</Mark> for styling components.</Text>
  <Text>Always wrap your app in <Mark primary>ThemeProvider</Mark> for theming to work.</Text>
  <Text>Components marked with <Mark danger>danger</Mark> indicate destructive actions.</Text>
</Col>
```

## Search highlight pattern

Use Mark to highlight search matches within text content.

```tsx demo
<Col>
  <Text sm secondary>Search results for &quot;React&quot;:</Text>
  <Text>VaneUI is a <Mark>React</Mark> component library built with TypeScript.</Text>
  <Text>All components are <Mark>React</Mark> 19 compatible with server component support.</Text>
  <Text>Use <Mark>React</Mark> hooks like useState with VaneUI form components.</Text>
</Col>
```
