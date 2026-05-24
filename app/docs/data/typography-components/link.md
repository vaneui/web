---
componentKey: link
importPath: 'import { Link } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/link/Link.tsx
since: 0.9.0
---

Renders an accessible and themeable anchor link for navigation. Use this to direct users to other pages or external websites.

## When to Use

- In-text navigation that sits naturally on the typography baseline.
- External links to documentation, repositories, or referenced sources.
- Footer/secondary navigation where a button would be visually too heavy.
- Cross-references inside prose where the action is "go somewhere," not "do something."

### When NOT to Use

- For action buttons (submit, confirm, run) — use `Button` instead.
- For prominent calls-to-action — use `Button primary filled` for visual weight.

## Customizing

Set app-wide Link defaults with `ThemeProvider`'s `themeDefaults`:

```tsx
import { ThemeProvider, Link } from '@vaneui/ui';

<ThemeProvider themeDefaults={{
  link: { brand: true, noUnderline: true },
}}>
  <Link href="/docs">Read more</Link>
</ThemeProvider>
```

## Basic Link

A styled anchor element for navigation. Unlike other typography components which default to `inherit`, Link defaults to the `link` appearance (blue color) with `underline`.

```tsx demo
<Link href="#">Click here to learn more</Link>
```

## Size Inherits from Context

Link defaults to `inheritSize: true` so a link inside a heading renders at the heading's font-size automatically — no `size` prop needed. The link keeps its own blue colour.

```tsx demo
<Col>
  <Text>Body text with a <Link href="#">link inline</Link>.</Text>
  <Title>Subheading with a <Link href="#">link</Link> inside.</Title>
  <SectionTitle>Section heading with a <Link href="#">link</Link>.</SectionTitle>
  <PageTitle>Page title <Link href="#">link</Link></PageTitle>
</Col>
```

## Fixed Size with noInheritSize

Pass `noInheritSize` to render the Link at its own size instead of the parent's — useful when a link inside a heading should stay at body-text size.

```tsx demo
<Title>
  Subheading with <Link href="#" noInheritSize>a fixed-size link</Link> mid-sentence.
</Title>
```

## Explicit Sizes

When `noInheritSize` is set (or the parent has no size context), choose an explicit size with `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Link href="#" noInheritSize xs>Extra small link</Link>
  <Link href="#" noInheritSize sm>Small link</Link>
  <Link href="#" noInheritSize>Medium link (default)</Link>
  <Link href="#" noInheritSize lg>Large link</Link>
  <Link href="#" noInheritSize xl>Extra large link</Link>
</Col>
```

## Link Appearances

Links default to the `link` appearance (blue). Override with: `primary`, `brand`, `accent`, `secondary`, `tertiary`, `success`, `danger`, `warning`, `info`.

```tsx demo
<Row flexWrap>
  <Link primary href="#">Primary</Link>
  <Link brand href="#">Brand</Link>
  <Link accent href="#">Accent</Link>
  <Link secondary href="#">Secondary</Link>
  <Link success href="#">Success</Link>
  <Link danger href="#">Danger</Link>
  <Link warning href="#">Warning</Link>
  <Link info href="#">Info</Link>
</Row>
```

## Link Styling

Use `bold`, `semibold`, `italic`, or `noUnderline` to remove the default underline.

```tsx demo
<Col>
  <Link bold href="#">Bold link</Link>
  <Link semibold href="#">Semibold link</Link>
  <Link italic href="#">Italic link</Link>
  <Link noUnderline href="#">Link without underline</Link>
</Col>
```

## Hover State

Links keep an underline at rest. With `noUnderline`, the underline appears on hover for affordance.

```tsx demo
<Col>
  <Link href="#">Underlined at rest, stays underlined on hover</Link>
  <Link noUnderline href="#">No underline at rest — hover to reveal it</Link>
</Col>
```

## External Links

Pass the `external` prop and Link auto-applies `target="_blank"` and `rel="noopener noreferrer"` for safe cross-origin navigation.

```tsx demo
<Link href="https://github.com/vaneui/vaneui" external>VaneUI on GitHub</Link>
```

## Manual target="_blank"

Setting `target="_blank"` directly also auto-applies `rel="noopener noreferrer"` — no need to spell it out.

```tsx demo
<Link href="https://github.com/vaneui/vaneui" target="_blank">Open in a new tab</Link>
```

## Inline in Text

Links integrate naturally with surrounding prose — drop them inline inside `Text` and they inherit the parent size.

```tsx demo
<Text>
  Check out our <Link href="#">documentation</Link> to learn more about the features.
  You can also visit the <Link href="#">GitHub repository</Link> for source code.
</Text>
```

## Inherits Parent Text Size

Links inside body text inherit the surrounding `Text` size — set the size on the parent and the Link follows along.

```tsx demo
<Col>
  <Text sm>Read the <Link href="#">terms and conditions</Link> before proceeding.</Text>
  <Text>Visit our <Link href="#">help center</Link> for more information.</Text>
  <Text lg>Check out the <Link href="#">getting started guide</Link> to begin.</Text>
</Col>
```

## With Icons

Combine links with icons using Row for visual navigation cues.

```tsx demo
<Col>
  <Row itemsCenter>
    <ExternalLink size={14} />
    <Link href="#">Open in new window</Link>
  </Row>
  <Row itemsCenter>
    <FileText size={14} />
    <Link href="#">View documentation</Link>
  </Row>
  <Row itemsCenter>
    <GitHub size={14} />
    <Link href="#">Source on GitHub</Link>
  </Row>
</Col>
```

## Next.js Link Integration

Use the `tag` prop to render the VaneUI Link as a Next.js `Link` for client-side navigation. Alias the Next.js import so it doesn't shadow `Link` from `@vaneui/ui`.

```tsx
import NextLink from 'next/link';
import { Link } from '@vaneui/ui';

<Link href="/docs" tag={NextLink}>Documentation</Link>
```
