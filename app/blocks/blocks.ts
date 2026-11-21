// The blocks gallery: one entry per copy-paste block in app/blocks/library/<slug>.tsx.
// Plain data, no React, so the sitemap, search and llms.txt can import it.

export type BlockCategory = 'Marketing' | 'Auth' | 'App' | 'Data';

export interface BlockMeta {
  /** URL segment and file name: /blocks/<slug>, app/blocks/library/<slug>.tsx */
  slug: string;
  /** Page name, in title case */
  name: string;
  /** One sentence for the gallery card, the page intro and the meta description */
  description: string;
  category: BlockCategory;
  /** The `<title>` and Open Graph title of the block page */
  seoTitle: string;
  /** VaneUI components the block renders, most telling first; Table stands for its parts (Thead, Tr, Td...) */
  components: string[];
  /** How the layout changes across 390, 768, 1024 and 1280px */
  adapts: string[];
}

export const BLOCK_CATEGORIES: BlockCategory[] = ['Marketing', 'Auth', 'App', 'Data'];

/** The preview widths, from phone to desktop */
export const BLOCK_WIDTHS = [
  { label: 'Phone', width: 390 },
  { label: 'Tablet', width: 768 },
  { label: 'Laptop', width: 1024 },
  { label: 'Desktop', width: 1280 },
] as const;

export const BLOCK_THEMES = ['light', 'dark'] as const;
export type BlockTheme = typeof BLOCK_THEMES[number];

export const BLOCKS: BlockMeta[] = [
  {
    slug: 'landing',
    name: 'Landing Page',
    description: 'A header, a hero with text beside a visual, a feature grid, a call-to-action band and a footer, all on one page column.',
    category: 'Marketing',
    seoTitle: 'Landing Page Block for React + Tailwind CSS | VaneUI',
    components: ['Section', 'Container', 'Grid3', 'PageTitle', 'SectionTitle', 'Card', 'NavLink', 'Menu', 'MenuItem', 'IconButton', 'Button', 'Row', 'Col', 'Title', 'Text'],
    adapts: [
      '1024px and up: the links sit in the header and the hero text sits beside the visual.',
      'Below 1024px: a menu button holds the links, the visual moves under the headline and the features go to two columns.',
      'Below 768px: one feature per row, and the hero buttons and the call to action fill the width.',
    ],
  },
  {
    slug: 'pricing',
    name: 'Pricing',
    description: 'A centered heading and three plan cards of equal height, with the button at the bottom of each card.',
    category: 'Marketing',
    seoTitle: 'Pricing Section Block for React + Tailwind CSS | VaneUI',
    components: ['Card', 'Badge', 'List', 'ListItem', 'Button', 'Section', 'Container', 'PageTitle', 'Row', 'Col', 'Title', 'Text'],
    adapts: [
      '768px and up: three cards in a row, equal in height, with the buttons on one line.',
      'Below 768px: the cards stack and each one fills the width.',
      'The recommended plan has a stronger border, a badge and the only filled button, so it does not rely on color alone.',
    ],
  },
  {
    slug: 'sign-in',
    name: 'Sign-In',
    description: 'One narrow card centered in the window, with the email and password form in one column.',
    category: 'Auth',
    seoTitle: 'Sign-In Form Block for React + Tailwind CSS | VaneUI',
    components: ['Field', 'Button', 'Link', 'Card', 'Section', 'Row', 'Col', 'Title', 'Text'],
    adapts: [
      'Every width: the card stays centered in the window and stops at 384px wide.',
      '390px: the card fills the width, inside the section padding.',
      'The minimum height uses dynamic viewport units, so a phone keyboard does not hide the button.',
    ],
  },
  {
    slug: 'app-shell',
    name: 'App Shell',
    description: 'A sticky header, a sidebar of navigation links and the page content, with a menu button in place of the sidebar on small screens.',
    category: 'App',
    seoTitle: 'App Shell Layout Block for React + Tailwind CSS | VaneUI',
    components: ['NavLink', 'Menu', 'MenuItem', 'IconButton', 'Button', 'PageTitle', 'Row', 'Col', 'Stack', 'Text'],
    adapts: [
      '1024px and up: a 240px sidebar of links beside the page content.',
      'Below 1024px: the sidebar hides and a menu button in the header opens the same links.',
      'The header stays on top while the page scrolls.',
    ],
  },
  {
    slug: 'settings',
    name: 'Settings',
    description: 'Section navigation beside a column of forms, with the sections turning into a row of tabs on small screens.',
    category: 'App',
    seoTitle: 'Settings Page Block for React + Tailwind CSS | VaneUI',
    components: ['Field', 'NavLink', 'Card', 'Grid2', 'Button', 'Section', 'Container', 'PageTitle', 'SectionTitle', 'Row', 'Col', 'Title', 'Text'],
    adapts: [
      '1024px and up: the section links sit in a sidebar beside forms at most 672px wide.',
      'Below 1024px: the links become a row of tabs above the forms that scrolls sideways.',
      'Below 768px: first and last name stack, and the buttons stack and fill the width.',
    ],
  },
  {
    slug: 'list-detail',
    name: 'List and Detail',
    description: 'A message list beside the open message, split into two screens with a back button on small screens.',
    category: 'App',
    seoTitle: 'List and Detail Block for React + Tailwind CSS | VaneUI',
    components: ['NavLink', 'Input', 'Button', 'PageTitle', 'Row', 'Col', 'Stack', 'Text'],
    adapts: [
      '1024px and up: a 320px message list beside the selected message.',
      'Below 1024px: one pane at a time, the list or the message, with a back button on the message.',
      'Long subjects end in an ellipsis instead of widening the list.',
    ],
  },
  {
    slug: 'dashboard',
    name: 'Dashboard',
    description: 'A header with a period picker, a row of stat cards, a chart beside a short list, and an activity table.',
    category: 'Data',
    seoTitle: 'Dashboard Block for React + Tailwind CSS | VaneUI',
    components: ['Grid4', 'Card', 'Table', 'Badge', 'Select', 'Section', 'Container', 'PageTitle', 'Row', 'Col', 'Title', 'Text'],
    adapts: [
      '1024px and up: four stat cards in a row, and the chart beside a 320px customer list.',
      'Below 1024px: two stat cards per row, and the list moves under the chart at full width.',
      'On narrow screens the table scrolls inside its card, never the page.',
    ],
  },
  {
    slug: 'data-table',
    name: 'Data Table',
    description: 'An orders table with an export action, a filter toolbar and pagination, shown as one card per order on a phone.',
    category: 'Data',
    seoTitle: 'Data Table Block for React + Tailwind CSS | VaneUI',
    components: ['Table', 'Badge', 'Input', 'Select', 'Card', 'Button', 'Section', 'Container', 'PageTitle', 'Row', 'Col', 'Text'],
    adapts: [
      '768px and up: the full table, with the search and two filters in one row.',
      'Below 768px: the filters stack at full width and each order becomes a card with its status and total.',
      'The page count and the buttons wrap onto two lines when the row runs out of space.',
    ],
  },
];

/** A block's page */
export const blockHref = (slug: string) => `/blocks/${slug}`;

/** A block's bare preview page: the block alone, in one theme */
export const blockPreviewHref = (slug: string, theme: BlockTheme) => `/blocks/${slug}/preview/${theme}`;

export const findBlock = (slug: string) => BLOCKS.find(b => b.slug === slug);

export const isBlockTheme = (value: string): value is BlockTheme =>
  (BLOCK_THEMES as readonly string[]).includes(value);
