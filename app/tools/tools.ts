// The free tools: one entry per page under /tools, read by the hub, the shell, the sitemap and search.

export interface ToolMeta {
  slug: string;
  /** Page name, in title case */
  name: string;
  /** Category shown as a chip on the hub */
  category: 'Color' | 'Content';
  /** One line for cards */
  summary: string;
  /** Meta description, 140 to 160 characters */
  description: string;
  /** `<title>` */
  seoTitle: string;
  /** The guide that explains the idea behind the tool */
  guide: { name: string; href: string };
}

export const TOOLS: ToolMeta[] = [
  {
    slug: 'theme-generator',
    name: 'Theme Generator',
    category: 'Color',
    summary: 'One brand color in: an OKLCH scale and light and dark tokens out, checked for contrast.',
    description: 'Turn one brand color into an 11-step OKLCH scale and light and dark theme tokens, preview them on real React components and export CSS, Tailwind or JSON.',
    seoTitle: 'OKLCH Theme Generator: Light and Dark Tokens from One Color | VaneUI',
    guide: { name: 'Dark mode tokens with light-dark() and Tailwind CSS v4', href: '/docs/guides/light-dark-tailwind-v4' },
  },
  {
    slug: 'oklch-converter',
    name: 'OKLCH Converter',
    category: 'Color',
    summary: 'Hex, RGB and HSL to OKLCH and back, with sliders and a gamut check.',
    description: 'Convert hex, RGB and HSL colors to OKLCH and back. Adjust lightness, chroma and hue with sliders and see when a color falls outside the sRGB gamut.',
    seoTitle: 'OKLCH Color Converter: Hex to OKLCH and Back | VaneUI',
    guide: { name: 'OKLCH color scales for UI themes', href: '/docs/guides/oklch-color-scales' },
  },
  {
    slug: 'contrast-checker',
    name: 'Contrast Checker',
    category: 'Color',
    summary: 'WCAG ratios for a text and background pair in light and dark at once.',
    description: 'Check WCAG 2.2 contrast for text and background colors in light and dark mode at once, get a passing color when a pair fails and copy it as light-dark().',
    seoTitle: 'Color Contrast Checker for Light and Dark Mode (WCAG 2.2) | VaneUI',
    guide: { name: 'Checking color contrast in light and dark mode', href: '/docs/guides/color-contrast-light-dark' },
  },
  {
    slug: 'markdown-editor',
    name: 'Markdown Editor',
    category: 'Content',
    summary: 'Write Markdown, see it as styled components, copy it as HTML or JSX.',
    description: 'Write Markdown with a live, styled preview built from React components. Copy the result as HTML, as JSX or as one Md component, in light or dark mode.',
    seoTitle: 'Online Markdown Editor with Live Preview and JSX Export | VaneUI',
    guide: { name: 'Render Markdown as React components', href: '/docs/guides/markdown-react-components' },
  },
];

export const toolHref = (slug: string) => `/tools/${slug}`;

export function getTool(slug: string): ToolMeta {
  const tool = TOOLS.find(t => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return tool;
}
