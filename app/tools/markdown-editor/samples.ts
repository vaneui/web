// Starting documents for the Markdown editor. Each shows a different side of the renderer.

export interface Sample { id: string; label: string; body: string }

const README = `# Project name

One sentence that says what the project does and who it is for.

## Install

\`\`\`bash
npm install project-name
\`\`\`

## Use it

\`\`\`tsx
import { start } from 'project-name';

start({ port: 3000 });
\`\`\`

## Options

| Option | Default | What it does |
|:--|:--|:--|
| \`port\` | \`3000\` | Port the server listens on |
| \`open\` | \`false\` | Opens the browser after start |

## Contributing

1. Fork the repository
2. Create a branch: \`git checkout -b fix-typo\`
3. Open a pull request

> Bug reports with a short reproduction get fixed first.

---

Released under the MIT license.
`;

const POST = `---
title: What we learned shipping dark mode
author: The team
---

# {% $markdoc.frontmatter.title %}

*By {% $markdoc.frontmatter.author %}, five minute read.*

Dark mode looked like a color swap. It took **three weeks**, and most of that went into
contrast, not color.

## Pick tokens, not colors

Every component reads a token such as \`--color-text-accent\`. The token holds a
\`light-dark()\` pair, so one stylesheet serves both schemes:

\`\`\`css
:root {
  --color-text-accent: light-dark(#6d28d9, #a78bfa);
}
\`\`\`

## Check both schemes at once

- A purple that passes on white can fail on near-black
- Borders need 3:1 against the surface, not just text
- ~~Inverting colors~~ never works for brand colors

Read more in the [contrast guide](https://vaneui.com/docs/guides/color-contrast-light-dark).
`;

const BLOCKS = `# Component blocks

A \`vaneui\` code fence describes components in YAML. The preview renders them in place.

\`\`\`vaneui
Card:
  - Title lg: Starter plan
  - Text secondary: For side projects and small teams.
  - Row:
      - Badge success: 14-day trial
      - Badge: No card needed
  - Button filled:
      href: /signup
      text: Start free
\`\`\`

Markdown keeps working around the blocks, so **bold**, \`code\` and lists render as usual.

\`\`\`vaneui
Alert info:
  - Text: Fences render only the components in the allow list, and never run scripts.
\`\`\`
`;

export const SAMPLES: Sample[] = [
  { id: 'readme', label: 'README', body: README },
  { id: 'post', label: 'Blog post', body: POST },
  { id: 'blocks', label: 'Component blocks', body: BLOCKS },
];
