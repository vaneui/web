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
npm run screenshot   # Take full-page + section screenshots to screenshots/
npm run screenshot:clean  # Delete screenshots
```

Requires Node.js 24.x. Screenshots require Playwright browsers (`npx playwright install chromium`).

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 5.9
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
    Logo.tsx, ThemeToggle.tsx
    CodeBlock.tsx          # Syntax highlighting with prism-react-renderer
    themes/               # Prism color themes (dark ink / light paper, blue component names only)

  docs/                   # Documentation section
    layout.tsx            # Docs layout (site header, framed sidebar + content, site footer)
    page.tsx              # Docs index (renders DocsIndex.tsx)
    docsMetadata.ts       # Central docs structure config (categories + pages)
    docsSections.ts       # Derived from docsMetadata.ts
    types.ts              # DocsSection, DocsPage, DocsPageProps, DocPageFrontmatter interfaces
    DocsPageContent.tsx   # Renders page header, markdown body + auto-generated props table
    DocsMarkdown.tsx      # Renders markdown via @vaneui/md with custom components
    DocsNav.tsx           # Sidebar navigation
    OnThisPage.tsx        # Right-side table of contents
    [category]/[slug]/page.tsx  # Dynamic route for each docs page

    data/                 # Documentation content
      basic-components/   # Component pages (button.md, badge.md, etc.)
      form-components/    # Form component pages (input.md, field.md, etc.)
      layout-components/  # Layout component pages (card.md, row.md, etc.)
      overlay-components/ # Overlay component pages (modal.md, popup.md, etc.)
      typography-components/  # Typography component pages (text.md, title.md, etc.)
      getting-started/    # Markdown guides (installation.md, core-concepts.md, etc.)
      customization/      # Markdown guides (theming-overview.md, css-variables.md, etc.)
      reference/          # common-props.md

  landing/                # Landing page (blueprint frame design, blue accent)
    Landing.tsx           # Client root: assembles the sections, imports landing.css
    LandingHeader.tsx, LandingFooter.tsx  # Site header and footer (landing, docs, playground; `wide` = 80rem docs frame)
    Hero.tsx, WorksWith.tsx, ComponentsBento.tsx, Principles.tsx
    Theming.tsx, Agents.tsx, GetStarted.tsx
    frame.tsx             # Shared frame primitives: FrameRow, Band, SectionHead, Eyebrow, InstallBox
    content.ts            # Landing copy and data (features, frameworks, AI clients, nav)
    demos.tsx             # Live component demos for the component grid
    Reveal.tsx            # Scroll-in reveal wrapper, usePrefersReducedMotion
    landing.css           # Accent tokens, frame decoration and motion (lp- prefix); `lp-site` reuses the frame on docs without touching VaneUI tokens
    data/                 # Theming demo data (themes.ts, balanced.ts, playful.ts, strict.ts)

  utils/
    stringUtils.ts        # toHtmlId(), createHeadingSlugger(), extractMarkdownHeadings()
```

## Key Patterns

### Documentation Pages

Two types of docs pages, configured in `docsMetadata.ts`:

1. **Component example pages** — have a `componentKey` and a `.md` file with `tsx demo` fences
   - `scripts/build-examples.mjs` turns each `demo` fence into a wrapper under `app/docs/.generated/examples/`
   - `DocsMarkdown.tsx` renders each `demo` fence as a `LivePreview` above its `CodeBlock`
   - Props documentation is auto-generated from `ComponentCategories` and `PropDescriptions` exported by `@vaneui/ui`

2. **Markdown guide pages** — have `mdPath` pointing to a `.md` file
   - Rendered by `DocsMarkdown.tsx` using `@vaneui/md`'s `<Md>` component
   - Custom renderers: `MdFence` -> `CodeBlock` (+ `LivePreview` for `demo` fences), `MdHeading` -> `SectionTitle`/`Title` with anchor links

### Adding a New Component Example Page

1. Create `app/docs/data/{category}/{component}.md`
2. Add frontmatter (`componentKey`, `importPath`, `sourceUrl`, `since`) and `tsx demo` fences with examples
3. Register in `docsMetadata.ts` with `slug`, `name`, `description`, and `componentKey`

### Adding a New Markdown Guide

1. Create `app/docs/data/{category}/{slug}.md`
2. Register in `docsMetadata.ts` with `slug`, `name`, `description`, and `mdPath`

### VaneUI Usage in This Site

This site uses VaneUI components for its own UI. Follow these conventions:

- Use boolean props API: `<Button primary lg filled>` not className-based styling
- Rely on component defaults — don't specify props that are already true by default
- Use `ThemeProvider` for section-level theme overrides (see `themeWrapper.tsx`, `DocsPageContent.tsx`)
- Use `mergeStrategy="replace"` when examples need a clean theme (see hero card demo)
- Layout: `Section` > `Container` > `Stack`/`Row`/`Col` > content components
- Typography hierarchy: `PageTitle` (h1) > `SectionTitle` (h2) > `Title` (h3) > `Text` (p)
- Responsive: use `mobileStack`/`tabletStack`/`desktopStack` on Row to collapse it to a column at those breakpoints (Stack is already a column), `mobileHide`/`tabletHide` for visibility
- Prefer VaneUI props over Tailwind classes (see prop-to-class mapping in vaneui CLAUDE.md)

### VaneUI Component Reference

For the full VaneUI component API (all components, props, theming, best practices, anti-patterns), refer to the CLAUDE.md file in the sibling repository:

**`C:\GitHub\vaneui\CLAUDE.md`** — contains complete documentation of all VaneUI components, boolean props API, ThemeProvider usage, responsive design patterns, and best practices. Read this file when you need to understand VaneUI component behavior or write code using VaneUI components.

## Visual Review with Screenshots

Use `scripts/screenshot.ts` to capture full-height and section-by-section screenshots of any page for visual review. The dev server must be running first (`npm run dev`).

```bash
# Basic usage — screenshots landing page
npm run screenshot

# Screenshot a specific page
npx tsx scripts/screenshot.ts --url http://localhost:3000/docs

# Mobile viewport
npx tsx scripts/screenshot.ts --width 768 --height 1024

# More/fewer sections
npx tsx scripts/screenshot.ts --sections 12

# Clean up screenshots
npm run screenshot:clean
```

Screenshots are saved to `screenshots/` (gitignored). Clean up manually with `npm run screenshot:clean` when done reviewing.

## Agent Delegation (REQUIRED)

When a task matches an agent's trigger below, you **MUST** delegate to that agent. Do not perform the work inline when a matching agent exists.

| Task Pattern | Agent | Why |
|-------------|-------|-----|
| Creating/updating documentation pages (examples + markdown guides) | `docs-writer` | Knows docsMetadata.ts structure, markdown page and `tsx demo` fence conventions |
| After any code changes — verify typecheck, lint, build | `build-checker` | Runs full verification pipeline, reports pass/fail |
| Refining docs prose after docs-writer (flow, tone, style-rules conformance) | `editor` | Applies content-style-rules.md, strips marketing voice, fixes generic headings |
| Cross-linking related docs pages | `internal-linker` | Suggests + applies 2-5 site-relative links per page based on docsMetadata.ts |
| Generating per-page FAQ sections | `faq-generator` | 3-8 questions in 40-80 words each, sentence-case H3s, scoped to real decisions |
| SEO audit (titles, descriptions, headings, keyword placement) | `seo-optimizer` | Per-page audit against current sitemap / metadata pipeline |
| AI-citation audit (ChatGPT, Perplexity, AI Overviews) | `ai-optimization` | SOAR framework: Structure, Originality, Authority, Recency |
| Final pre-merge gate on docs changes | `quality-checker` | Single pass/fail summary across every check; BLOCKING if any fail |

**Exception:** Do not delegate tasks completable in 1-2 tool calls (reading a file, small inline edit).

**Standard docs pipeline:** `docs-writer` → `editor` → `internal-linker` → `faq-generator` (optional) → `seo-optimizer` → `ai-optimization` → `quality-checker`. Skip the optimization passes for trivial typo fixes.

**Content style rules:** All content agents above defer to `.claude/rules/content-style-rules.md` for capitalization, banned headings, dash policy, unit spacing, and marketing-voice ban. Mirrors `testland-web/.claude/rules/content-style-rules.md`.
