import { BookOpen, Box, FileText, Layers, Settings } from "react-feather";
import { DocsSection } from "./types";
import { buttonExamples } from "./data/basic-components/button";
import { badgeExamples } from "./data/basic-components/badge";
import { chipExamples } from "./data/basic-components/chip";
import { checkboxExamples } from "./data/basic-components/checkbox";
import { labelExamples } from "./data/basic-components/label";
import { codeExamples } from "./data/basic-components/code";
import { rowExamples } from "./data/layout-components/row";
import { colExamples } from "./data/layout-components/col";
import { cardExamples } from "./data/layout-components/card";
import { stackExamples } from "./data/layout-components/stack";
import { containerExamples } from "./data/layout-components/container";
import { sectionExamples } from "./data/layout-components/section";
import { dividerExamples } from "./data/basic-components/divider";
import { textExamples } from "./data/typography-components/text";
import { titleExamples } from "./data/typography-components/title";
import { pageTitleExamples } from "./data/typography-components/pagetitle";
import { sectionTitleExamples } from "./data/typography-components/sectiontitle";
import { linkExamples } from "./data/typography-components/link";
import { listExamples } from "./data/typography-components/list";
import { grid3Examples } from "./data/layout-components/grid3";
import { grid4Examples } from "./data/layout-components/grid4";


export const docsSections: DocsSection[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'An overview of the library and instructions on how to install and configure it in your project.',
    icon: BookOpen,
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
    icon: Box,
    description: 'A collection of fundamental and interactive components for building user interfaces.',
    pages: [
      {
        slug: 'button',
        name: 'Button',
        description: 'Triggers an action or event when the user clicks on it. Buttons are a primary way for users to interact with the application and can contain text, an icon, or both.',
        parts: buttonExamples
      },
      {
        slug: 'badge',
        name: 'Badge',
        description: 'Highlights important information such as notifications or counts in a non-intrusive way. Badges are typically used in conjunction with other elements like icons or navigation links.',
        parts: badgeExamples
      },
      {
        slug: 'chip',
        name: 'Chip',
        description: 'Represents a complex entity in a compact form, such as an attribute, tag, or contact. Chips can be interactive, allowing for user input or triggering actions.',
        parts: chipExamples
      },
      {
        slug: 'checkbox',
        name: 'Checkbox',
        description: 'Allows users to select one or more options from a set. Checkboxes are ideal for binary choices and multiple selections within forms.',
        parts: checkboxExamples
      },
      {
        slug: 'label',
        name: 'Label',
        description: 'Displays text with various styling options for categorization, status indicators, or highlighting important information. Labels can be styled with different colors, sizes, and variants.',
        parts: labelExamples
      },
      {
        slug: 'code',
        name: 'Code',
        description: 'Renders inline code snippets with syntax highlighting. Perfect for displaying code examples, commands, file paths, or technical terms within text content.',
        parts: codeExamples
      },
      {
        slug: 'divider',
        name: 'Divider',
        description: 'Renders a thin line to separate content and create a clear visual hierarchy. Dividers can be used to group related items in lists and layouts.',
        parts: dividerExamples
      },
    ]
  },
  {
    name: 'Layout Components',
    slug: 'layout-components',
    icon: Layers,
    description: 'A set of components designed to help structure and organize your page content.',
    pages: [
      {
        slug: 'section',
        name: 'Section',
        description: 'A semantic container used to group related content within a page. This component helps to create a clear document outline and improve accessibility.',
        parts: sectionExamples
      },
      {
        slug: 'container',
        name: 'Container',
        description: 'Manages the main content area by centering it and applying a max-width. It ensures a consistent and readable layout across different screen sizes.',
        parts: containerExamples
      },
      {
        slug: 'row',
        name: 'Row',
        description: 'A fundamental layout component that arranges its children in a horizontal line. It is built on the flexbox model and is used to create columns.',
        parts: rowExamples
      },
      {
        slug: 'col',
        name: 'Col',
        description: 'A container that organizes content vertically within a Row. It provides a simple way to create flexible and responsive column-based layouts.',
        parts: colExamples
      },
      {
        slug: 'stack',
        name: 'Stack',
        description: 'A flexible layout component that arranges its children with consistent spacing. It can be used for both vertical and horizontal layouts.',
        parts: stackExamples
      },
      {
        slug: 'card',
        name: 'Card',
        description: 'A flexible container component that groups related content with consistent styling. Cards can contain text, images, and other components.',
        parts: cardExamples
      },
      {
        slug: 'grid3',
        name: 'Grid3',
        description: 'A specialized layout component for creating a responsive three-column grid. It simplifies the arrangement of content into a balanced and organized structure.',
        parts: grid3Examples
      },
      {
        slug: 'grid4',
        name: 'Grid4',
        description: 'A responsive layout component that arranges its children into a four-column grid. This is ideal for displaying a collection of items or features.',
        parts: grid4Examples
      },
    ]
  },
  {
    name: 'Typography Components',
    slug: 'typography-components',
    icon: FileText,
    description: 'A suite of components for rendering text and establishing a clear typographic hierarchy.',
    pages: [
      {
        slug: 'text',
        name: 'Text',
        description: 'The primary component for rendering all text content. It provides props to control typographic properties like size, weight, color, and alignment.',
        parts: textExamples
      },
      {
        slug: 'title',
        name: 'Title',
        description: 'Renders a heading to establish a semantic hierarchy on the page. Use this component for the main titles of pages or sections.',
        parts: titleExamples
      },
      {
        slug: 'page-title',
        name: 'PageTitle',
        description: 'A specialized component for the primary heading of a page. It ensures consistent styling for top-level titles across your application.',
        parts: pageTitleExamples
      },
      {
        slug: 'section-title',
        name: 'SectionTitle',
        description: 'A component for rendering headings of major sections within a page. It helps to create a clear and accessible document structure.',
        parts: sectionTitleExamples
      },
      {
        slug: 'link',
        name: 'Link',
        description: 'Renders an accessible and themeable anchor link for navigation. Use this to direct users to other pages or external websites.',
        parts: linkExamples
      },
      {
        slug: 'list',
        name: 'List',
        description: 'A container for displaying a series of related items in an ordered or unordered fashion. It provides consistent styling for list elements.',
        parts: listExamples
      },
      {
        slug: 'list-item',
        name: 'ListItem',
        description: 'Represents a single item within a List component. It can contain text, icons, or other components to create complex list structures.',
        parts: listExamples
      },
    ]
  },
  {
    name: 'Customization',
    slug: 'customization',
    description: 'Learn how to customize and theme VaneUI components to match your design requirements.',
    icon: Settings,
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
    ]
  },
];