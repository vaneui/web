# JUNIE.md

This file provides guidance to Junie (the JetBrains autonomous programmer) when working in this repository. It focuses on the current codebase and directory structure of this documentation site for the @vaneui/ui React component library.

## Quick Start

- Node.js: >= 22 (see package.json engines)
- Install: npm install
- Dev server: npm run dev (http://localhost:3000)
- Lint: npm run lint
- Build: npm run build
- Start production build: npm run start

## Tech Stack (current)

- Next.js 15 (App Router)
- React 19 + TypeScript 5.8
- Tailwind CSS 4.0 (via PostCSS)
- @vaneui/ui (UI components)
- @vaneui/md (markdown renderer for docs pages)
- MDX capability via @mdx-js/react (used by @vaneui/md)
- Prism.js for code highlighting
- react-feather for icons
- react-element-to-jsx-string for rendering component examples as JSX code

## Repository Layout (key areas)

- app/
  - docs/
    - [category]/[slug]/page.tsx
      - Dynamic route that renders documentation pages based on docsSections.ts configuration.
      - Reads optional markdown content from app/docs/data/<category>/<mdPath>.
    - DocsPageContent.tsx
      - Page-level layout and rendering of title, description, markdown content, and examples.
    - DocsMarkdown.tsx
      - Wraps @vaneui/md and themes markdown output. Overrides code fences to use local CodeBlock.
    - DocsNav.tsx
      - Builds the sidebar navigation from docsSections.ts.
    - docsSections.ts
      - Single source of truth for docs navigation. Declares categories, pages, and either examples or mdPath for each page.
    - types.ts
      - Types used across the docs system (DocsSection, DocsPage, DocsComponentExample, DocsPageProps).
    - data/
      - Component example modules (e.g., button.tsx, badge.tsx, …) exporting <name>Examples: DocsComponentExample[].
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

1. docsSections.ts defines the entire docs IA:
   - Category: { name, slug, icon, description, pages[] }
   - Page (two options):
     - Markdown-driven: { slug, name, description, mdPath }
       - mdPath points to a file under app/docs/data/<categorySlug>/<file>.md
     - Example-driven: { slug, name, description, examples }
       - examples is an array of { title, description, component } exported from a module in app/docs/data/.

2. Dynamic routing at app/docs/[category]/[slug]/page.tsx:
   - Finds the category and page from docsSections.ts.
   - If page.mdPath exists, reads the markdown file from app/docs/data/<category>/<mdPath>.
   - Renders DocsPageContent with optional md and examples.

3. Markdown rendering in DocsMarkdown.tsx:
   - Uses @vaneui/md Md component to render content.
   - Overrides fenced code blocks (MdFence) to use the local CodeBlock with Prism highlighting.

4. Example rendering in DocsPageContent.tsx:
   - Each example shows a live component preview and a CodeBlock with the JSX source derived from prepareComponentString.

## Adding or Updating Documentation

- Add a new markdown page:
  1) Choose a category slug that already exists in docsSections.ts (e.g., getting-started, customization), or add a new category.
  2) Create a markdown file under app/docs/data/<categorySlug>/<your-file>.md.
  3) In docsSections.ts, add a page object inside the matching category with: { slug, name, description, mdPath: '<your-file>.md' }.
  4) The sidebar and route /docs/<categorySlug>/<slug> will automatically reflect this.

- Add a new component docs page with examples:
  1) Create a file app/docs/data/<component>.tsx exporting a const <component>Examples: DocsComponentExample[].
     - Each DocsComponentExample = { title, description, component }.
  2) Import that examples array in docsSections.ts and attach it to a page definition under the appropriate category.
  3) The page will render the live demos and corresponding code blocks automatically.

- Update navigation:
  - All navigation comes from docsSections.ts. Add, remove, or reorder pages there.
  - Make sure page slugs are unique within a category and match the intended URL structure.

## Conventions & Tips

- Language tags in markdown code fences should match Prism loaders included in CodeBlock.tsx: jsx, tsx, typescript, javascript, css, scss, json, bash.
- When using @vaneui/ui components in examples, prefer boolean prop patterns (primary, xs, sm, etc.) consistent with library style.
- Keep descriptions succinct but clear; long content belongs in markdown pages rather than example descriptions.
- Respect the types in app/docs/types.ts for strong typing and consistent structure.
- For markdown pages, keep headings and lists simple; DocsMarkdown sets list and title spacing via ThemeProvider overrides.

## Common Pitfalls

- Incorrect mdPath or folder: page.tsx reads markdown from app/docs/data/<categorySlug>/<mdPath>. Ensure the category folder exists and the filename matches exactly.
- Missing example exports: If you declare examples in docsSections.ts, ensure the imported array exists and is typed as DocsComponentExample[].
- Unsupported code fence language: If Prism doesn’t highlight, verify the language matches one of the imported Prism languages in CodeBlock.tsx.
- Node engine mismatch: Use Node 22+ or adjust via nvm.

## Quality & CI

- ESLint: npm run lint
- There is no test suite configured in this repo. Consider adding targeted tests if you introduce logic that benefits from verification.

## PR Guidance (for changes by Junie)

- Keep changes minimal and focused on the docs structure and content.
- Update docsSections.ts atomically with any example or markdown additions.
- Verify local build and navigation for new/changed pages.
- Include screenshots or notes in PRs when UI changes are relevant to docs.

