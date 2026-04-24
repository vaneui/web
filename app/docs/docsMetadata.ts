import { ComponentKey } from "@vaneui/ui";

export interface DocPageMeta {
  slug: string;
  name: string;
  description: string;
  mdPath?: string;
  componentKey?: ComponentKey;
}

export interface DocSectionMeta {
  name: string;
  slug: string;
  description: string;
  pages: DocPageMeta[];
}

export const docsSectionsMeta: DocSectionMeta[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'An overview of the library and instructions on how to install and configure it in your project.',
    pages: [
      {
        slug: 'core-concepts',
        name: 'Core Concepts',
        description: 'Understand VaneUI\'s philosophy of boolean props, Tailwind CSS integration, and component customization.',
        mdPath: 'core-concepts.md',
      },
      {
        slug: 'installation',
        name: 'Installation',
        description: 'Follow these steps to get the library installed and ready to use in your application.',
        mdPath: 'installation.md',
      },
      {
        slug: 'usage-basics',
        name: 'Usage Basics',
        description: 'Learn fundamental patterns and concepts for using VaneUI components effectively.',
        mdPath: 'usage-basics.md',
      },
    ]
  },
  {
    name: 'Basic Components',
    slug: 'basic-components',
    description: 'A collection of fundamental and interactive components for building user interfaces.',
    pages: [
      {
        slug: 'button',
        name: 'Button',
        description: 'Triggers an action or event when the user clicks on it. Buttons are a primary way for users to interact with the application and can contain text, an icon, or both.',
        componentKey: "button",
      },
      {
        slug: 'badge',
        name: 'Badge',
        description: 'Highlights important information such as notifications or counts in a non-intrusive way. Badges are typically used in conjunction with other elements like icons or navigation links.',
        componentKey: "badge",
      },
      {
        slug: 'chip',
        name: 'Chip',
        description: 'Represents a complex entity in a compact form, such as an attribute, tag, or contact. Chips can be interactive, allowing for user input or triggering actions.',
        componentKey: "chip",
      },
      {
        slug: 'checkbox',
        name: 'Checkbox',
        description: 'Allows users to select one or more options from a set. Checkboxes are ideal for binary choices and multiple selections within forms.',
        componentKey: "checkbox",
      },
      {
        slug: 'label',
        name: 'Label',
        description: 'Displays text with various styling options for categorization, status indicators, or highlighting important information. Labels can be styled with different colors, sizes, and variants.',
        componentKey: "label",
      },
      {
        slug: 'code',
        name: 'Code',
        description: 'Renders inline code snippets with syntax highlighting. Perfect for displaying code examples, commands, file paths, or technical terms within text content.',
        componentKey: "code",
      },
      {
        slug: 'divider',
        name: 'Divider',
        description: 'Renders a thin line to separate content and create a clear visual hierarchy. Dividers can be used to group related items in lists and layouts.',
        componentKey: "divider",
      },
      {
        slug: 'input',
        name: 'Input',
        description: 'Allows users to enter text, numbers, and other data. Inputs are essential form elements with support for various types, validation states, and styling options.',
        componentKey: "input",
      },
      {
        slug: 'img',
        name: 'Img',
        description: 'Displays images with VaneUI styling support including sizes, shapes, borders, shadows, and object-fit options.',
        componentKey: "img",
      },
      {
        slug: 'icon',
        name: 'Icon',
        description: 'A lightweight SVG wrapper that provides consistent sizing, color inheritance, and themed appearances for icons.',
        componentKey: "icon",
      },
      {
        slug: 'icon-button',
        name: 'IconButton',
        description: 'A square icon-only button with customizable appearance, size, and shape. Supports loading state and renders as anchor when href is provided.',
        componentKey: "iconButton",
      },
      {
        slug: 'kbd',
        name: 'Kbd',
        description: 'Displays keyboard keys and shortcuts with monospace font, border, and a raised 3D effect. Ideal for documenting keyboard shortcuts.',
        componentKey: "kbd",
      },
      {
        slug: 'mark',
        name: 'Mark',
        description: 'Highlights text with a background color for emphasis. Defaults to warning (yellow) appearance for a natural highlighter effect.',
        componentKey: "mark",
      },
    ]
  },
  {
    name: 'Layout Components',
    slug: 'layout-components',
    description: 'A set of components designed to help structure and organize your page content.',
    pages: [
      {
        slug: 'section',
        name: 'Section',
        description: 'A semantic container used to group related content within a page. This component helps to create a clear document outline and improve accessibility.',
        componentKey: "section",
      },
      {
        slug: 'container',
        name: 'Container',
        description: 'Manages the main content area by centering it and applying a max-width. It ensures a consistent and readable layout across different screen sizes.',
        componentKey: "container",
      },
      {
        slug: 'row',
        name: 'Row',
        description: 'A fundamental layout component that arranges its children in a horizontal line. It is built on the flexbox model and is used to create columns.',
        componentKey: "row",
      },
      {
        slug: 'col',
        name: 'Col',
        description: 'A container that organizes content vertically within a Row. It provides a simple way to create flexible and responsive column-based layouts.',
        componentKey: "col",
      },
      {
        slug: 'stack',
        name: 'Stack',
        description: 'A flexible layout component that arranges its children with consistent spacing. It can be used for both vertical and horizontal layouts.',
        componentKey: "stack",
      },
      {
        slug: 'card',
        name: 'Card',
        description: 'A flexible container component that groups related content with consistent styling. Cards can contain text, images, and other components.',
        componentKey: "card",
      },
      {
        slug: 'grid2',
        name: 'Grid2',
        description: 'A responsive layout component for creating a two-column grid. Ideal for side-by-side content layouts and balanced arrangements.',
        componentKey: "grid2",
      },
      {
        slug: 'grid3',
        name: 'Grid3',
        description: 'A specialized layout component for creating a responsive three-column grid. It simplifies the arrangement of content into a balanced and organized structure.',
        componentKey: "grid3",
      },
      {
        slug: 'grid4',
        name: 'Grid4',
        description: 'A responsive layout component that arranges its children into a four-column grid. This is ideal for displaying a collection of items or features.',
        componentKey: "grid4",
      },
      {
        slug: 'grid5',
        name: 'Grid5',
        description: 'A responsive layout component that creates a five-column grid. Perfect for organizing content into balanced, visually appealing arrangements.',
        componentKey: "grid5",
      },
      {
        slug: 'grid6',
        name: 'Grid6',
        description: 'A six-column grid layout component for creating compact, organized displays. Ideal for icon grids, feature collections, and detailed content arrangements.',
        componentKey: "grid6",
      },
    ]
  },
  {
    name: 'Overlay Components',
    slug: 'overlay-components',
    description: 'Components for overlays, dialogs, and floating elements that appear above the page content.',
    pages: [
      {
        slug: 'overlay',
        name: 'Overlay',
        description: 'A fullscreen backdrop overlay for creating modal backgrounds, loading screens, and lightbox effects. Renders via portal with click-to-close and optional blur.',
        componentKey: "overlay",
      },
      {
        slug: 'modal',
        name: 'Modal',
        description: 'An accessible dialog component with focus trapping, scroll lock, and keyboard navigation. Built on Overlay with ARIA role="dialog" and aria-modal="true".',
        componentKey: "modal",
      },
      {
        slug: 'popup',
        name: 'Popup',
        description: 'A floating element anchored to a trigger element using CSS Anchor Positioning. Supports 12 placement options, width matching, and click-outside dismissal.',
        componentKey: "popup",
      },
      {
        slug: 'menu',
        name: 'Menu',
        description: 'A dropdown menu triggered by a button with full keyboard navigation. Contains MenuItem, Divider, and MenuLabel subcomponents.',
        componentKey: "menu",
      },
    ]
  },
  {
    name: 'Navigation Components',
    slug: 'navigation-components',
    description: 'Components for building navigation interfaces like sidebars, menus, and header links.',
    pages: [
      {
        slug: 'navlink',
        name: 'NavLink',
        description: 'A navigation link for sidebars, nav menus, and headers. Supports active state, icons, and renders as anchor or button.',
        componentKey: "navLink",
      },
    ]
  },
  {
    name: 'Typography Components',
    slug: 'typography-components',
    description: 'A suite of components for rendering text and establishing a clear typographic hierarchy.',
    pages: [
      {
        slug: 'text',
        name: 'Text',
        description: 'The primary component for rendering all text content. It provides props to control typographic properties like size, weight, color, and alignment.',
        componentKey: "text",
      },
      {
        slug: 'title',
        name: 'Title',
        description: 'Renders a heading to establish a semantic hierarchy on the page. Use this component for the main titles of pages or sections.',
        componentKey: "title",
      },
      {
        slug: 'page-title',
        name: 'PageTitle',
        description: 'A specialized component for the primary heading of a page. It ensures consistent styling for top-level titles across your application.',
        componentKey: "pageTitle",
      },
      {
        slug: 'section-title',
        name: 'SectionTitle',
        description: 'A component for rendering headings of major sections within a page. It helps to create a clear and accessible document structure.',
        componentKey: "sectionTitle",
      },
      {
        slug: 'link',
        name: 'Link',
        description: 'Renders an accessible and themeable anchor link for navigation. Use this to direct users to other pages or external websites.',
        componentKey: "link",
      },
      {
        slug: 'list',
        name: 'List',
        description: 'A container for displaying a series of related items in an ordered or unordered fashion. It provides consistent styling for list elements.',
        componentKey: "list",
      },
      {
        slug: 'blockquote',
        name: 'Blockquote',
        description: 'Displays quoted content with a left border accent. Inherits appearance from the parent by default for seamless embedding in themed containers.',
        componentKey: "blockquote",
      },
    ]
  },
  {
    name: 'Customization',
    slug: 'customization',
    description: 'Learn how to customize and theme VaneUI components to match your design requirements.',
    pages: [
      {
        slug: 'theming-overview',
        name: 'Theming Overview',
        description: 'Understand VaneUI\'s powerful theming system and design token architecture.',
        mdPath: 'theming-overview.md',
      },
      {
        slug: 'using-theme-provider',
        name: 'Using ThemeProvider',
        description: 'Configure and customize themes throughout your application with ThemeProvider.',
        mdPath: 'using-themeprovider.md',
      },
      {
        slug: 'theme-and-override',
        name: 'Theme & ThemeOverride',
        description: 'Customize themes using ThemeProvider\'s theme and themeOverride properties (applied to providers, not components).',
        mdPath: 'theme-and-override.md',
      },
      {
        slug: 'theme-defaults',
        name: 'ThemeDefaults',
        description: 'Set default theme values across your application using themeDefaults.',
        mdPath: 'theme-defaults.md',
      },
      {
        slug: 'extra-classes',
        name: 'ExtraClasses',
        description: 'Apply additional CSS classes to components using extraClasses.',
        mdPath: 'extra-classes.md',
      },
      {
        slug: 'css-variables',
        name: 'CSS Variables',
        description: 'Customize VaneUI components using CSS custom properties and variables.',
        mdPath: 'css-variables.md',
      },
      {
        slug: 'customizing-styles',
        name: 'Customizing Styles',
        description: 'Override VaneUI component styles using Tailwind CSS classes, CSS variables, and the className prop.',
        mdPath: 'customizing-styles.md',
      },
      {
        slug: 'variant-inheritance',
        name: 'Variant Inheritance',
        description: 'How components inherit colors from ancestor layouts via CSS custom-property cascade.',
        mdPath: 'variant-inheritance.md',
      },
    ]
  },
];
