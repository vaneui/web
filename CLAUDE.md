# CLAUDE.md — vaneui-web

## What This Is

Next.js documentation website for the VaneUI React component library. Hosted at vaneui.com. This project serves two purposes:
1. **Documentation site** — showcases VaneUI components with interactive examples and guides
2. **VaneUI consumer** — the site itself is built with VaneUI components and should follow VaneUI best practices

## Commands

```bash
npm run dev          # Dev server (localhost:3000), runs typecheck + lint first
npm run build        # Production build (runs typecheck + lint first)
npm run typecheck    # TypeScript type checking
npm run lint         # ESLint
```

Requires Node.js >= 22.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.8
- Tailwind CSS v4 with `@vaneui/ui/vars` CSS variables
- `@vaneui/ui` — component library (source code at `C:\GitHub\vaneui`, see its CLAUDE.md for full API reference)
- `@vaneui/md` — markdown renderer using Markdoc, renders into VaneUI components
- `prism-react-renderer` — syntax highlighting in CodeBlock
- `react-feather` — icons
- Vercel Analytics, Ahrefs Analytics

## Project Structure

```
app/
  layout.tsx              # Root layout (fonts, ThemeWrapper, analytics)
  page.tsx                # Landing page (assembles landing sections)
  themeWrapper.tsx        # VaneUI ThemeProvider wrapper (client component)
  globals.css             # Tailwind imports, @source for VaneUI, font vars
  constants.ts            # Product branding (title, slogan, GitHub URL)
  not-found.tsx           # 404 page

  components/             # Shared components
    Header.tsx, Footer.tsx, Logo.tsx, FeatureTitle.tsx
    CodeBlock.tsx          # Syntax highlighting with prism-react-renderer
    VerticalCarousel.tsx
    themes/               # Prism color themes (dark/light)

  docs/                   # Documentation section
    layout.tsx            # Docs layout (sidebar nav + content area)
    page.tsx              # Docs index redirect
    docsSections.ts       # Central docs structure config (categories + pages)
    types.ts              # DocsSection, DocsPage, DocsPagePart interfaces
    DocsPageContent.tsx   # Renders component examples + auto-generated props docs
    DocsMarkdown.tsx      # Renders markdown via @vaneui/md with custom components
    DocsNav.tsx           # Sidebar navigation
    OnThisPage.tsx        # Right-side table of contents
    [category]/[slug]/page.tsx  # Dynamic route for each docs page

    data/                 # Documentation content
      basic-components/   # Component example files (button.tsx, badge.tsx, etc.)
      layout-components/  # Layout example files (card.tsx, row.tsx, etc.)
      typography-components/  # Typography example files (text.tsx, title.tsx, etc.)
      getting-started/    # Markdown guides (installation.md, core-concepts.md, etc.)
      customization/      # Markdown guides (theming-overview.md, css-variables.md, etc.)

  landing/                # Landing page sections
    HeroSection.tsx, AboutSection.tsx, LiveSection.tsx
    BasicComponentsSection.tsx, TypographyComponentsSection.tsx
    ThemeCustomizationSection.tsx
    data/                 # Theme demo data (balanced.ts, playful.ts, strict.ts)
    utils/                # Typing animation logic

  utils/
    stringUtils.ts        # prepareComponentString(), toHtmlId(), extractMarkdownHeadings()
```

## Key Patterns

### Documentation Pages

Two types of docs pages, configured in `docsSections.ts`:

1. **Component example pages** — have `parts: DocsPagePart[]` with interactive demos
   - Each `DocsPagePart` has `{ title, md, component }` where `component` is live JSX
   - The component is auto-converted to source code via `react-element-to-jsx-string`
   - Props documentation is auto-generated from `ComponentCategories` and `PropDescriptions` exported by `@vaneui/ui`

2. **Markdown guide pages** — have `mdPath` pointing to a `.md` file
   - Rendered by `DocsMarkdown.tsx` using `@vaneui/md`'s `<Md>` component
   - Custom renderers: `MdFence` -> `CodeBlock`, `MdHeading` -> `Title` with anchor links, `MdBlockquote` -> `Card`

### Adding a New Component Example Page

1. Create `app/docs/data/{category}/{component}.tsx`
2. Export a `DocsPagePart[]` array with examples
3. Register in `docsSections.ts` with `slug`, `name`, `description`, `parts`, and `componentKey`

### Adding a New Markdown Guide

1. Create `app/docs/data/{category}/{slug}.md`
2. Register in `docsSections.ts` with `slug`, `name`, `description`, `mdPath`, and `parts: []`

### VaneUI Usage in This Site

This site uses VaneUI components for its own UI. Follow these conventions:

- Use boolean props API: `<Button primary lg filled>` not className-based styling
- Rely on component defaults — don't specify props that are already true by default
- Use `ThemeProvider` for section-level theme overrides (see `themeWrapper.tsx`, `DocsPageContent.tsx`)
- Use `mergeStrategy="replace"` when examples need a clean theme (see hero card demo)
- Layout: `Section` > `Container` > `Stack`/`Row`/`Col` > content components
- Typography hierarchy: `PageTitle` (h1) > `SectionTitle` (h2) > `Title` (h3) > `Text` (p)
- Responsive: use `mobileCol`/`tabletCol` on Row/Stack, `mobileHide`/`tabletHide` for visibility
- Prefer VaneUI props over Tailwind classes (see prop-to-class mapping in vaneui CLAUDE.md)

### VaneUI Component Reference

For the full VaneUI component API (all components, props, theming, best practices, anti-patterns), refer to the CLAUDE.md file in the sibling repository:

**`C:\GitHub\vaneui\CLAUDE.md`** — contains complete documentation of all VaneUI components, boolean props API, ThemeProvider usage, responsive design patterns, and best practices. Read this file when you need to understand VaneUI component behavior or write code using VaneUI components.

## Subagents

Custom subagents are defined in `.claude/agents/`:

- **docs-writer** — use for creating/updating documentation pages (examples + markdown guides)
- **build-checker** — use after code changes to verify typecheck, lint, and build pass
