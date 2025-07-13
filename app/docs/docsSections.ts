import { BookOpen, Box, FileText, Icon, Layers } from "react-feather";
import { JSX } from "react";
import { buttonExamples } from "./data/button";
import { badgeExamples } from "./data/badge";
import { chipExamples } from "./data/chip";

export interface DocsComponentExample {
  title: string;
  description: string;
  component: JSX.Element;
}

export interface DocsComponent {
  name: string;
  description: string;
  examples?: DocsComponentExample[];
}

export interface DocsSection {
  name: string;
  slug: string;
  icon: Icon;
  description: string;
  components: DocsComponent[];
}

export const docsSections: DocsSection[] = [
  {
    name: 'Getting Started',
    slug: 'getting-started',
    description: 'An overview of the library and instructions on how to install and configure it in your project.',
    icon: BookOpen,
    components: [
      {
        name: 'Installation',
        description: 'Follow these steps to get the library installed and ready to use in your application.'
      },
    ]
  },
  {
    name: 'Basic Components',
    slug: 'basic-components',
    icon: Box,
    description: 'A collection of fundamental and interactive components for building user interfaces.',
    components: [
      {
        name: 'Button',
        description: 'Triggers an action or event when the user clicks on it. Buttons are a primary way for users to interact with the application and can contain text, an icon, or both.',
        examples: buttonExamples
      },
      {
        name: 'Badge',
        description: 'Highlights important information such as notifications or counts in a non-intrusive way. Badges are typically used in conjunction with other elements like icons or navigation links.',
        examples: badgeExamples
      },
      {
        name: 'Chip',
        description: 'Represents a complex entity in a compact form, such as an attribute, tag, or contact. Chips can be interactive, allowing for user input or triggering actions.',
        examples: chipExamples
      },
      {
        name: 'Divider',
        description: 'Renders a thin line to separate content and create a clear visual hierarchy. Dividers can be used to group related items in lists and layouts.'
      },
    ]
  },
  {
    name: 'Layout Components',
    slug: 'layout-components',
    icon: Layers,
    description: 'A set of components designed to help structure and organize your page content.',
    components: [
      {
        name: 'Section',
        description: 'A semantic container used to group related content within a page. This component helps to create a clear document outline and improve accessibility.'
      },
      {
        name: 'Container',
        description: 'Manages the main content area by centering it and applying a max-width. It ensures a consistent and readable layout across different screen sizes.'
      },
      {
        name: 'Row',
        description: 'A fundamental layout component that arranges its children in a horizontal line. It is built on the flexbox model and is used to create columns.'
      },
      {
        name: 'Col',
        description: 'A container that organizes content vertically within a Row. It provides a simple way to create flexible and responsive column-based layouts.'
      },
      {
        name: 'Grid3',
        description: 'A specialized layout component for creating a responsive three-column grid. It simplifies the arrangement of content into a balanced and organized structure.'
      },
      {
        name: 'Grid4',
        description: 'A responsive layout component that arranges its children into a four-column grid. This is ideal for displaying a collection of items or features.'
      },
    ]
  },
  {
    name: 'Typography Components',
    slug: 'typography-components',
    icon: FileText,
    description: 'A suite of components for rendering text and establishing a clear typographic hierarchy.',
    components: [
      {
        name: 'Text',
        description: 'The primary component for rendering all text content. It provides props to control typographic properties like size, weight, color, and alignment.'
      },
      {
        name: 'Title',
        description: 'Renders a heading to establish a semantic hierarchy on the page. Use this component for the main titles of pages or sections.'
      },
      {
        name: 'PageTitle',
        description: 'A specialized component for the primary heading of a page. It ensures consistent styling for top-level titles across your application.'
      },
      {
        name: 'SectionTitle',
        description: 'A component for rendering headings of major sections within a page. It helps to create a clear and accessible document structure.'
      },
      {
        name: 'Link',
        description: 'Renders an accessible and themeable anchor link for navigation. Use this to direct users to other pages or external websites.'
      },
      {
        name: 'List',
        description: 'A container for displaying a series of related items in an ordered or unordered fashion. It provides consistent styling for list elements.'
      },
      {
        name: 'ListItem',
        description: 'Represents a single item within a List component. It can contain text, icons, or other components to create complex list structures.'
      },
    ]
  }
];