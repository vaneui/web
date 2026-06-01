# VaneUI Docs Content Style Rules

Canonical source for capitalization, heading, and prose conventions for VaneUI documentation. All content agents (`docs-writer`, `editor`, `quality-checker`, `faq-generator`, `seo-optimizer`, `ai-optimization`) reference this file.

Mirrors `testland-web/.claude/rules/content-style-rules.md`. When the testland rules change, mirror them here.

---

## Capitalization

### Page H1 / page name / SEO title / OG title → title case

Modern English title case:
- Capitalize the first and last word.
- Capitalize major words: nouns, pronouns, verbs, adjectives, adverbs, subordinating conjunctions.
- Lowercase minor words unless first/last: `a, an, the, and, but, or, nor, for, so, yet, as, at, by, for, in, of, on, per, to, up, via, with`.
- Preserve official capitalization for tool / brand / API names: VaneUI, React, TypeScript, Tailwind CSS, Next.js, JSX, TSX, JSON, HTML, CSS, MDX, Markdoc, Rollup, Vite, Jest, Playwright, npm.

Examples:
- "using theme provider" → "Using Theme Provider"
- "the customization workflow" → "The Customization Workflow"
- "css variables in vaneui" → "CSS Variables in VaneUI"

Apply consistently across: `docsMetadata.ts` `name`, page H1, `<title>` metadata, OG / Twitter title.

### Internal headings (H2-H6) → sentence case

- Capitalize only the first word and proper nouns / official names.
- Preserve tool / API / brand capitalization (React, TypeScript, ThemeProvider, ComponentTheme, useTheme, etc.).

Examples:
- "Why We Built This API" → "Why we built this API"
- "Using The ThemeProvider Override" → "Using the ThemeProvider override"
- "Working With CSS Variables" → "Working with CSS variables"
- "Step-By-Step Setup" → "Step-by-step setup"

### Shared rules for both

- Change capitalization only — do not rewrite text, add/remove words, alter meaning or punctuation unless required for consistency.
- Preserve technical strings exactly as written when they appear: code spans in backticks, prop names, CSS variable names, file names, URLs, package names. Examples: `` `<Button primary>` ``, `` `--fs-unit` ``, `` `@vaneui/ui` ``, `` `themeWrapper.tsx` ``.
- Hyphenated words: title case capitalizes major parts ("End-to-End Testing"); sentence case follows normal rules ("End-to-end testing with Playwright").
- Use straight quotes `"..."` not curly `"..."`.

---

## Banned heading patterns

All generic headings are banned. **Rule: if a heading could apply to any other docs page on any topic, it's too generic and must be rewritten.**

### Full ban list

- "How it works", "What it does", "What you need to know", "What to know"
- "Why it matters" / "Why this matters" / "Why [X] matters"
- "When it makes sense" / "When to use it"
- "Overview" / "Introduction" / "The basics" / "In a nutshell"
- "Best practices" / "Key takeaways" / "Key facts" (as a section heading)
- "What's new" / "What's changed" / "Recap"
- "Putting it all together" / "Wrapping up" / "Final thoughts" / "The bottom line"
- "Conclusion" / "Summary" / "Looking ahead" / "Moving forward" / "Next steps"

### Rewrite to a descriptive phrase that names the actual subject

| Generic (banned) | Descriptive (rewrite to something like this) |
|---|---|
| "How it works" | "How ThemeProvider resolves nested defaults" |
| "Why it matters" | "Why boolean props beat className composition" |
| "When to use it" | "When to use ThemeProvider vs `extraClasses`" |
| "What you need to know" | "Prerequisites for customizing the appearance system" |
| "Best practices" | "Five patterns that keep theme overrides predictable" |
| "Overview" | "How the three-tier CSS variable system resolves to pixels" |
| "Introduction" | (delete and merge into the opening paragraph) |
| "Conclusion" / "Summary" | (delete and end with a concrete next-step paragraph) |
| "Next steps" | "What to read next: building a custom appearance" |

### "Installation" / "Getting started" carve-out

`Installation` and `Getting started` are permitted **only** when followed by concrete numbered steps or a specific URL. They're allowed as section names in the Getting Started category (`installation.md`, `core-concepts.md`, etc.) where they ARE the page topic.

Mid-page "Getting started" headings inside other pages are banned.

---

## Punctuation: dashes (em / en / hyphen)

Em dashes (`—`) and en dashes (`–`) are **banned** in published docs. They feel literary, ornamental, and are a known AI-generated-content signal. Removing them is the single highest-signal humanizer edit.

### First, rewrite to remove the dash entirely

- **Colon** for clarification, list, or punchline:
  - Bad: "The override pattern is not `className` — it's `extraClasses`."
  - Good: "The override pattern is not `className`: it's `extraClasses`."

- **Period + new sentence** when the after-clause is its own thought:
  - Bad: "Themes propagate through context — children inherit the parent defaults."
  - Good: "Themes propagate through context. Children inherit the parent defaults."

- **Comma** when the dash is just a soft pause:
  - Bad: "Boolean props are mutually exclusive within a category — only one wins."
  - Good: "Boolean props are mutually exclusive within a category, and only one wins."

- **Parentheses** for true asides:
  - Bad: "The `--fs-unit` variable — set by size props like `lg` and `xl` — drives font-size."
  - Good: "The `--fs-unit` variable (set by size props like `lg` and `xl`) drives font-size."

### Paired-dash constructions are always rewritten

Never replace both dashes with spaced hyphens (`text - inserted - text`) — readers can't pair them. Always rewrite to parentheses, a colon split, or two sentences.

### Last-resort fallback: hyphen with spaces

When all rewrite paths produce worse prose, fall back to a hyphen surrounded by spaces (` - `). This is the only dash character permitted in published docs.

Hyphens in compound words (`step-by-step`, `box-shadow`, `border-radius`, `data-appearance`) keep their no-space form. They are word-joiners, not dashes.

### Quality gate

Before publishing, every docs page MUST pass:

**Dash check.** Zero em dashes (`—`) and zero en dashes (`–`). Hyphens (`-`) only as word-joiners or as a last-resort spaced separator. Any em or en dash auto-fails the gate.

---

## Numbers and units: no space between value and unit symbol

When the unit is a **symbol** (1-2 letters, abbreviated), write it directly against the number with no space: `30s`, `200ms`, `100KB`, `2MB`, `45%`, `2x`, `12px`, `1.5rem`, `0.5em`.

When the unit is **spelled out as a word**, use normal English spacing: `30 seconds`, `2 hours`, `45 percent`.

Strict SI typography (`30 s` with a thin space) is **not** our style. We optimise for prose readability.

| Bad | Good |
|---|---|
| `30 s` | `30s` |
| `200 ms` | `200ms` |
| `100 KB` | `100KB` |
| `45 %` | `45%` |
| `12 px` | `12px` |
| `1.5 rem` | `1.5rem` |
| `2 x` | `2x` |

### Exceptions where the space stays

- Currency: `$30`, `€5`, `£10`.
- Degrees: `100°C`, `45°`.
- Ambiguous bare abbreviations where the unit could brush against a sentence break.
- Markdown tables where the unit lives in a separate column header.

### Ranges with units

Drop the trailing unit on all but the final value: `0 to 30s` (not `0s to 30s`), `12 to 18px`.

---

## Voice and tone for VaneUI docs

- **Direct, factual, present tense.** Describe what the component does, not what the developer will do.
  - Bad: "You will see that the button changes color when hovered."
  - Good: "The button changes background color on hover."
- **Second person (`you`) only when guiding action.** Reference docs ("Button accepts these props") describe behavior; guide pages ("To customize colors, you set …") direct the reader.
- **No marketing voice.** Avoid "powerful", "robust", "blazing fast", "easy", "simple", "intuitive", "beautiful", "elegant". State the property, let the reader judge.
- **No first-person plural ("we", "our")** in reference docs. It belongs in `getting-started/core-concepts.md` and similar guide pages where authorial perspective is acceptable.
- **Names match exports.** Every prop, component, or theme symbol referenced in prose must match the exported name exactly (case-sensitive). `ThemeProvider`, not `theme provider`. `useTheme`, not `useTheme()` unless calling it.

---

## Quality gates enforced by `quality-checker`

Every docs page MUST pass before merge:

1. **Capitalization check.** Page name in title case (per `docsMetadata.ts`); H2-H6 in sentence case; tool / API / brand capitalization preserved.
2. **Descriptive-heading check.** Every H2/H3 is a descriptive phrase naming the actual subject. No heading from the ban list.
3. **Dash check.** Zero em (`—`) and en (`–`) dashes.
4. **Unit-spacing check.** No body-copy number-and-symbol pairs with a stray space.
5. **Symbol-name check.** Every component, prop, hook, theme key, or CSS variable named in prose matches the exported identifier exactly (case + casing).
6. **Code-example-builds check.** Every fenced code block compiles against the current `@vaneui/ui` API. No imports from packages not in `package.json`.
7. **Marketing-voice check.** Zero banned adjectives ("powerful", "robust", "blazing fast", "easy", "simple", "intuitive", "beautiful", "elegant", "seamless", "effortless").

---

## Reference

- Testland parallel: `C:\GitHub\testland-web\.claude\rules\content-style-rules.md`
- Component usage rules: `C:\GitHub\vaneui-web\.claude\rules\component-usage.md`
- Full VaneUI API reference: `C:\GitHub\vaneui\.claude\rules\component-usage.md`
