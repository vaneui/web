# JUNIE.md

This file provides guidance to Junie (the JetBrains autonomous programmer) when working in this repository. It focuses on the current codebase and directory structure of this documentation site for the @vaneui/ui React component library.

## Quick Start

- Node.js: 24.x (see package.json engines)
- Install: npm install
- Dev server: npm run dev (http://localhost:3000)
- Lint: npm run lint
- Build: npm run build
- Start production build: npm run start

## Tech Stack (current)

- Next.js 16 (App Router)
- React 19 + TypeScript 5.9
- Tailwind CSS 4 (via PostCSS)
- @vaneui/ui (UI components)
- @vaneui/md (markdown renderer for docs pages)
- @mdx-js/react is listed in package.json but not imported; @vaneui/md uses Markdoc
- prism-react-renderer for code highlighting
- react-feather for icons
- react-element-to-jsx-string for rendering landing-page examples as JSX code

## Repository Layout (key areas)

- app/
  - docs/
    - [category]/[slug]/page.tsx
      - Dynamic route that renders documentation pages based on docsSections.ts configuration.
      - Reads markdown from app/docs/data/<category>/<slug>.md, falling back to packageMdPath or mdPath.
    - DocsPageContent.tsx
      - Page-level layout and rendering of title, description, markdown content, and props tables.
    - DocsMarkdown.tsx
      - Wraps @vaneui/md. Overrides code fences to use local CodeBlock (with LivePreview for tsx demo fences).
    - DocsNav.tsx
      - Builds the sidebar navigation from docsSections.ts.
    - docsSections.ts
      - Docs navigation, derived from docsMetadata.ts, which declares categories, pages, and either componentKey or mdPath for each page.
    - types.ts
      - Types used across the docs system (DocsSection, DocsPage, DocsPageProps, DocPageFrontmatter).
    - data/
      - Component pages as markdown under category subfolders (e.g., data/basic-components/button.md) with frontmatter and tsx demo fences.
      - Markdown content under subfolders matching category slugs (e.g., data/getting-started/*.md, data/customization/*.md).
  - components/
    - CodeBlock.tsx
      - Client component that renders highlighted code with Prism; used in markdown fences and example code views.
    - Other shared UI (Header, Logo, etc.).
  - utils/
    - stringUtils.ts
      - prepareComponentString and helpers to convert example JSX elements into readable code for display.
- public/
  - Static assets including icons used by CodeBlock (react-icon.svg) and branding.
- Configuration: next.config.mjs, postcss.config.mjs, tsconfig.json, tailwind via PostCSS.

## How the Docs System Works

1. docsMetadata.ts defines the entire docs IA (docsSections.ts derives from it):
   - Category: { name, slug, description, pages[] }
   - Page (two options):
     - Markdown-driven: { slug, name, description, mdPath }
       - mdPath points to a file under app/docs/data/<categorySlug>/<file>.md
     - Component page: { slug, name, description, componentKey }
       - the body is app/docs/data/<categorySlug>/<slug>.md; its tsx demo fences render as live examples.

2. Dynamic routing at app/docs/[category]/[slug]/page.tsx:
   - Finds the category and page from docsSections.ts.
   - Reads app/docs/data/<category>/<slug>.md if it exists, else packageMdPath, else mdPath.
   - Renders DocsPageContent with md and frontmatter.

3. Markdown rendering in DocsMarkdown.tsx:
   - Uses @vaneui/md Md component to render content.
   - Overrides fenced code blocks (MdFence) to use the local CodeBlock with Prism highlighting.

4. Example rendering in DocsMarkdown.tsx:
   - Each tsx demo fence shows a LivePreview (wrapper built by scripts/build-examples.mjs) and a CodeBlock with the fence source.

## Adding or Updating Documentation

- Add a new markdown page:
  1) Choose a category slug that already exists in docsMetadata.ts (e.g., getting-started, customization), or add a new category.
  2) Create a markdown file under app/docs/data/<categorySlug>/<your-file>.md.
  3) In docsMetadata.ts, add a page object inside the matching category with: { slug, name, description, mdPath: '<your-file>.md' }.
  4) The sidebar and route /docs/<categorySlug>/<slug> will automatically reflect this.

- Add a new component docs page with examples:
  1) Create app/docs/data/<categorySlug>/<slug>.md with frontmatter (componentKey, importPath, sourceUrl, since).
     - Put each example in a tsx demo fence.
  2) In docsMetadata.ts, add { slug, name, description, componentKey } under the appropriate category.
  3) The page will render the live demos and corresponding code blocks automatically.

- Update navigation:
  - All navigation comes from docsMetadata.ts (via docsSections.ts). Add, remove, or reorder pages there.
  - Make sure page slugs are unique within a category and match the intended URL structure.

## Conventions & Tips

- Language tags in markdown code fences should match languages bundled with prism-react-renderer (CodeBlock.tsx adds none): jsx, tsx, typescript, javascript, css, json.
- When using @vaneui/ui components in examples, prefer boolean prop patterns (primary, xs, sm, etc.) consistent with library style.
- Keep descriptions succinct but clear; long content belongs in markdown pages rather than example descriptions.
- Respect the types in app/docs/types.ts for strong typing and consistent structure.
- For markdown pages, keep headings and lists simple; spacing comes from @vaneui/md/styles, imported in globals.css.

## Common Pitfalls

- Incorrect mdPath or folder: page.tsx reads markdown from app/docs/data/<categorySlug>/<slug>.md (or <mdPath>). Ensure the category folder exists and the filename matches exactly.
- Broken demo fences: npm run check:examples type-checks every tsx demo fence and reports errors against the .md line.
- Unsupported code fence language: If Prism doesn’t highlight, verify the language is one prism-react-renderer bundles.
- Node engine mismatch: Use Node 24.x or adjust via nvm.

## Quality & CI

- ESLint: npm run lint
- There is no test suite configured in this repo. Consider adding targeted tests if you introduce logic that benefits from verification.

## PR Guidance (for changes by Junie)

- Keep changes minimal and focused on the docs structure and content.
- Update docsMetadata.ts atomically with any example or markdown additions.
- Verify local build and navigation for new/changed pages.
- Include screenshots or notes in PRs when UI changes are relevant to docs.

