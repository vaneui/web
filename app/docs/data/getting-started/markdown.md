`@vaneui/md` renders a Markdown string as VaneUI components: a heading becomes `Title`, a paragraph `Text`, a list `List`, a quote or a code block `Card`, inline code `Code`, a table `Table`, a link `Link` and an image `Img`. The source is parsed with Markdoc. Unlike MDX it holds no JSX and no imports, so a document is data and cannot run code.

## Install the package and render a string

`@vaneui/md` needs `@vaneui/ui` 1.5.0 or later, set up as on the [Installation](/docs/getting-started/installation) page:

```bash
npm install @vaneui/md
```

Pass the Markdown source as `content`:

```tsx
import { Md } from '@vaneui/md';

const source = `
# Release notes

The **1.6.0** release adds nine import paths.

- Faster builds
- Smaller bundles

> Upgrade with \`npm install @vaneui/ui@latest\`.
`;

export function ReleaseNotes() {
  return <Md content={source} />;
}
```

The output takes its colors and sizes from the nearest `ThemeProvider`, like any other VaneUI component. For the spacing between blocks, add the package's stylesheet to your CSS entry, after the VaneUI imports:

```css
@import "@vaneui/md/styles";
```

It holds spacing rules for the rendered document and nothing else.

## Server Components and the client entry

`Md` from `@vaneui/md` uses no React context and no hooks, so it renders inside a React Server Component. Markdown known at build time is parsed on the server, and the parser stays out of the browser bundle:

```tsx
// app/blog/[slug]/page.tsx: a Server Component
import { Md } from '@vaneui/md';

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const content = await loadPost((await params).slug);
  return <Md content={content} />;
}
```

`@vaneui/md/client` is the client entry. It exports `MdStream` for text that grows while it is shown, such as a model's answer, and takes the same props as `Md`:

```tsx
'use client';

import { MdStream } from '@vaneui/md/client';

export function Answer({ text }: { text: string }) {
  return <MdStream content={text} />;
}
```

On each update `MdStream` renders again only the blocks whose content changed, so finished paragraphs and code blocks keep their DOM nodes.

## Frontmatter values inside the document

`Md` reads the YAML block at the top of a document when you pass a parser. `parseYamlFrontmatter` needs the `yaml` package (`npm install yaml`):

```tsx
import { Md } from '@vaneui/md';
import { parseYamlFrontmatter } from '@vaneui/md/yaml';

<Md content={source} parseFrontmatter={parseYamlFrontmatter} />
```

The parsed values are available in the document as `$markdoc.frontmatter`:

```md
---
title: Get started
author: Jane
---

# {% $markdoc.frontmatter.title %}

By {% $markdoc.frontmatter.author %}.
```

Data you already hold goes in the `frontmatter` prop, which wins over the parser: `<Md content={source} frontmatter={{ title: 'Get started' }} />`.

## VaneUI components inside Markdown with `vaneui` fences

A code block with the language `vaneui` is read as YAML and rendered as a component tree at that spot. The key holds the component name and its boolean props. A string value becomes the children, a list becomes child components, and a map sets other props:

````md
```vaneui
Card primary filled:
  - Title lg: Welcome
  - Text: Everything you need to ship.
```

```vaneui
Button filled:
  href: /get-started
  text: Get started
```
````

The fence needs two props on `Md`: the YAML parser and a registry that maps names to components.

```tsx
import { Md } from '@vaneui/md';
import { parseYamlFrontmatter } from '@vaneui/md/yaml';
import { defaultRegistry } from '@vaneui/md/registry';

<Md
  content={source}
  parseFrontmatter={parseYamlFrontmatter}
  components={defaultRegistry}
/>
```

`defaultRegistry` lists the presentational components and leaves out the ones that need callbacks, such as Modal, Menu and Input. A name that is not in the registry renders nothing. Pass your own map to add components or to narrow the set.

## Restyle one Markdown element with `rendererTheme`

Each Markdown element has a slot in `rendererTheme` that takes VaneUI boolean props. A slot changes that element only, so quotes and code blocks can differ although both render a `Card`:

```tsx
<Md
  content={source}
  rendererTheme={{
    mdBlockquote: { info: true },
    mdCode: { success: true },
    mdHeading: { fontMono: true },
  }}
/>
```

The slots are named after the element: `mdHeading`, `mdParagraph`, `mdLink`, `mdList`, `mdItem`, `mdBlockquote`, `mdCode` for inline code, `mdFence` for code blocks, `mdTable`, `mdImage` and `mdHr`. A change for every `Card` in the app, in Markdown and outside it, belongs in `themeDefaults` on [ThemeProvider](/docs/customization/using-theme-provider).

To replace an element's component, pass your own in `config.components`:

```tsx
import type { ReactNode } from 'react';
import { Md } from '@vaneui/md';
import { Link } from '@vaneui/ui';

// Links to other sites open in a new tab
function DocLink({ href, children }: { href?: string; children?: ReactNode }) {
  return <Link href={href} external={href?.startsWith('http')}>{children}</Link>;
}

<Md content={source} config={{ components: { MdLink: DocLink } }} />
```

## Syntax highlighting in code blocks

A code block renders as plain text until `Md` gets a `highlight` function. Two adapters ship with the package. The Prism one needs `npm install prism-react-renderer`:

```tsx
import { Md } from '@vaneui/md';
import { prismHighlighter } from '@vaneui/md/prism';

const highlight = prismHighlighter();

<Md content={source} highlight={highlight} />
```

`@vaneui/md/shiki` exports `shikiHighlighter`, which takes the languages and themes you import from `shiki`. Any function of the shape `(code, language) => ReactNode` works as a custom highlighter. Create the function once, outside the component, so `MdStream` does not highlight unchanged blocks again.

## Content shared between documents

A partial is a named snippet that `Md` receives in `config.partials` and a document places with the `partial` tag. It can take variables:

```tsx
const partials = {
  'support.md': 'Questions? Write to **{% $channel %}**.',
};

<Md
  content={'# Setup\n\n{% partial file="support.md" variables={channel: "#help"} /%}'}
  config={{ partials }}
/>
```

To pull in another file by path, expand the document's `include` tags before rendering. `resolveIncludes` reads from the file system, so it runs on the server or in a build step:

```tsx
import { readFileSync } from 'node:fs';
import { Md } from '@vaneui/md';
import { resolveIncludes } from '@vaneui/md/include';

const filePath = 'docs/guide/page.md';
const content = resolveIncludes(readFileSync(filePath, 'utf8'), {
  filePath,
  root: 'docs',
});

<Md content={content} />
```

An include must stay inside `root` and, by default, point at a `.md`, `.mdoc` or `.markdown` file.

## Markdown written by users or by a model

Content from outside your team gets two settings. `untrustedPreset` limits `vaneui` fences to VaneUI's boolean props, text and a short list of attributes such as `href` and `alt`, with `http:`, `https:`, `mailto:`, `tel:` and relative URLs only. `tagSyntax={false}` leaves `{% ... %}` in the text as written, so the content cannot use tags, variables or partials:

```tsx
import { Md, untrustedPreset } from '@vaneui/md';
import { parseYamlFrontmatter } from '@vaneui/md/yaml';
import { defaultRegistry } from '@vaneui/md/registry';

<Md
  content={userMarkdown}
  presets={[untrustedPreset]}
  tagSyntax={false}
  parseFrontmatter={parseYamlFrontmatter}
  components={defaultRegistry}
/>
```

Without the preset a fence still cannot run script: event handlers, `dangerouslySetInnerHTML`, `javascript:` URLs and elements such as `script` and `iframe` are dropped at every level. The package's [README](https://github.com/vaneui/md#readme) lists every prop, the sanitize policy fields and the include options.
