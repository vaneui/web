`@vaneui/md` renders Markdown as React components: every heading, paragraph, list and code block becomes a VaneUI component, so a blog post or a model's answer takes the same theme as the rest of the app. The [Markdown Rendering](/docs/getting-started/markdown) page covers installation and the main props. This guide goes further: how a string turns into components, which entry to import in Server and Client Components, a blog route with frontmatter metadata, components placed with `vaneui` fences, per-element styling, and Markdown from untrusted sources. To try any snippet below in the browser, paste it into the [Markdown editor](/tools/markdown-editor).

## How a Markdown string becomes VaneUI components

`<Md>` runs three steps on every render. Markdoc parses the string into a syntax tree. A transform applies the configuration: variables such as the frontmatter, tags, partials and your `transform` hook. Then each node renders through a renderer component that wraps one VaneUI component:

| Markdown | Renderer | VaneUI component |
|----------|----------|------------------|
| `#` to `######` headings | `MdHeading` | `Title`, sized `xl`, `lg`, `md`, `sm`, `xs`, `xs` by level |
| Paragraph | `MdParagraph` | `Text` |
| List and list item | `MdList`, `MdItem` | `List` (`listDecimal` when ordered), `ListItem` |
| `> quote` | `MdBlockquote` | `Card` |
| Code block | `MdFence` | `Card` around a `<pre>` |
| Inline code | `MdCode` | `Code` |
| Link, image | `MdLink`, `MdImage` | `Link`, `Img` |
| Table | `MdTable` | `Table` in a horizontally scrolling `Col` |
| `---` | `MdHr` | `Divider` |

Markdoc reads `{% ... %}` as tags and variables but has no JSX and no imports, so a document is data: it cannot run code or reach a component you did not register. Colors and sizes come from the nearest `ThemeProvider`, like any other VaneUI component.

## Server Components or the client entry

The package has two entries for rendering. Pick by where the Markdown comes from:

| Situation | Import |
|-----------|--------|
| Markdown read on the server: files, a CMS, a database | `Md` from `@vaneui/md` in a Server Component |
| Text that grows while it shows, such as a model's answer | `MdStream` from `@vaneui/md/client` |
| Custom renderers that read React context, or one theme provider above several documents | `Md` from `@vaneui/md/client` |

`Md` from the main entry uses no context and no hooks. In a Server Component it parses on the server, and Markdoc stays out of the browser bundle; the VaneUI components it outputs still hydrate as client components. `@vaneui/md/client` is a `"use client"` module. A Server Component cannot pass it functions such as `highlight`, `transform` or `parseFrontmatter`, so render the client entry from a Client Component:

```tsx
'use client';

import { MdStream } from '@vaneui/md/client';
import { prismHighlighter } from '@vaneui/md/prism';

// Created once: a new function on every render would re-highlight every block
const highlight = prismHighlighter();

export function Answer({ text }: { text: string }) {
  return <MdStream content={text} highlight={highlight} />;
}
```

`MdStream` parses the whole source on each update and renders again only the top-level blocks whose content changed. The client `Md` also reads a `RendererThemeContext.Provider` from the same entry, which the main `Md` ignores.

## Frontmatter for page metadata

A blog route needs the frontmatter twice: once for `generateMetadata` and once inside the document, where `$markdoc.frontmatter` exposes it. Parse it once in a loader and pass the result as the `frontmatter` prop, which `<Md>` uses instead of parsing again:

```tsx
// app/blog/[slug]/page.tsx: a Server Component
import { readFile } from 'node:fs/promises';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Md } from '@vaneui/md';
import { parseYamlFrontmatter } from '@vaneui/md/yaml';
import { defaultRegistry } from '@vaneui/md/registry';

type Props = { params: Promise<{ slug: string }> };

async function loadPost(slug: string) {
  // The slug becomes a file path: allow plain names only
  if (!/^[a-z0-9-]+$/.test(slug)) notFound();
  const source = await readFile(`content/blog/${slug}.md`, 'utf8').catch(() => notFound());
  const raw = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source)?.[1] ?? '';
  return { source, data: parseYamlFrontmatter(raw) };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { data } = await loadPost((await params).slug);
  return { title: String(data.title ?? 'Blog'), description: String(data.summary ?? '') };
}

export default async function Post({ params }: Props) {
  const { source, data } = await loadPost((await params).slug);
  return (
    <Md
      content={source}
      frontmatter={data}
      parseFrontmatter={parseYamlFrontmatter}
      components={defaultRegistry}
    />
  );
}
```

`parseYamlFrontmatter` needs the `yaml` package, and `parseFrontmatter` stays on `<Md>` because `vaneui` fences use the same parser. Inside `<Md>`, malformed YAML renders an error card above the body and never throws; called directly, as in `loadPost`, the parser throws, so catch it there if authors can break the file. The raw text between the `---` lines is also available as `$markdoc.frontmatterRaw`.

## Components inside Markdown with vaneui fences

A code block with the language `vaneui` is parsed as YAML and rendered as a component tree in its place. In the shorthand form, the key holds the component name and its boolean props, and the value's shape decides the rest:

| Value | Becomes |
|-------|---------|
| empty | a component with no children |
| a string | its children |
| a list | child components, read the same way |
| a map | props such as `href`, `src` or `text`, plus `children` when it needs both |

A release note with a feature grid and a link button:

````md
---
title: Release 2.4
summary: Faster exports and a new billing page.
---

# {% $markdoc.frontmatter.title %}

{% $markdoc.frontmatter.summary %}

```vaneui
Grid3:
  - Card:
      - Title sm: Exports
      - Text: CSV exports finish in a third of the time.
  - Card:
      - Title sm: Billing
      - Text: Invoices download as PDF.
  - Card success:
      - Title sm: Uptime
      - Text: 99.98% over the last 90 days.
```

```vaneui
Button filled:
  href: /changelog
  text: Read the full changelog
```
````

A name must start with an uppercase letter; lowercase keys stay plain data. Names resolve through the `components` registry. `defaultRegistry` lists 36 presentational components and leaves out those that need callbacks, such as Modal, Menu and Input. Failures stay local:

| Condition | Result |
|-----------|--------|
| No `parseFrontmatter` on `<Md>` | the fence renders as a code block showing the YAML |
| Malformed YAML | an error card above the code block |
| A name not in the registry | that node renders nothing; the rest of the page renders |

Add your own components by spreading the registry:

```tsx
import type { ReactNode } from 'react';
import { Card, Text, Title } from '@vaneui/ui';
import { defaultRegistry } from '@vaneui/md/registry';

function PlanCard({ name, price, children }: { name?: string; price?: string; children?: ReactNode }) {
  return (
    <Card>
      <Title sm>{name}</Title>
      <Text xl fontBold>{price}</Text>
      {children}
    </Card>
  );
}

export const registry = { ...defaultRegistry, PlanCard };
```

## Restyle Markdown elements with rendererTheme

`rendererTheme` holds one slot per renderer, and each slot takes VaneUI boolean props for that element only. Quotes and code blocks both render a [Card](/docs/layout-components/card), yet `mdBlockquote` and `mdFence` style them apart.

The merge with the package defaults works per category. `mdBlockquote` defaults to `{ secondary: true, borderL: true }`:

| Your slot | Result |
|-----------|--------|
| `{ primary: true }` | `primary`, `borderL`: the appearance is replaced, the left bar stays |
| `{ border: true }` | `secondary`, `border`: the border is replaced, the appearance stays |
| `{ primary: true, border: true }` | both categories replaced |

Heading size comes from the heading level and is applied after the slot, so `mdHeading` can change weight, font or appearance but not size. To share one theme across documents, also from Server Components, bake it into a component:

```tsx
import { createMd } from '@vaneui/md';

export const DocMd = createMd().use({
  rendererTheme: {
    mdBlockquote: { info: true },
    mdFence: { tertiary: true },
    mdHeading: { fontMono: true },
  },
});
```

A change for every `Card` in the app, inside Markdown and outside it, belongs in `themeDefaults` on [ThemeProvider](/docs/customization/using-theme-provider) instead.

## Sanitize untrusted Markdown

Markdown from users or a model needs limits beyond the default. Some checks always run on fence props: event handlers, `dangerouslySetInnerHTML`, `javascript:` URLs and a `tag` such as `script` or `iframe` are dropped at every level. Every other prop passes, including `className`, `style` and `id`, which is right for documents your team writes.

`untrustedPreset` turns on an allow-list. Fences keep VaneUI's boolean props, `children`, `text`, `aria-*` and attributes such as `href`, `src` and `alt`, and URLs must be `http:`, `https:`, `mailto:`, `tel:` or relative. `tagSyntax={false}` leaves every `{% ... %}` in the text as written, so the content cannot read variables or call tags and partials.

Two gaps remain. Boolean layout props such as `fixed` and `absolute` pass the allow-list, and props of your own registry components, such as `name` and `price` on `PlanCard`, are dropped unless you allow them. A preset built on `strictSanitizePolicy` handles both:

```tsx
import { createMd, strictSanitizePolicy, type MdPreset } from '@vaneui/md';

const userContent: MdPreset = {
  sanitize: {
    ...strictSanitizePolicy,
    blockedProps: ['fixed', 'absolute', 'sticky'],
    allowedProps: ['name', 'price'],
  },
  tagSyntax: false,
};

export const UserMd = createMd().use(userContent);
```

A `sanitize` prop on `<Md>` replaces the preset's policy instead of merging with it, so start from the policy you mean to keep. To narrow the components as well, pass a smaller registry or list the allowed names in `allowComponents`.

Paste a document into the [Markdown editor](/tools/markdown-editor) to see how fences, frontmatter and the renderer theme come out before you ship it, and turn to the Markdown Rendering page for syntax highlighting, partials and file includes.
