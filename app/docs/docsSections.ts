import { BookOpen, Box, FileText, Icon, Layers } from "react-feather";
import { JSX } from "react";
import { buttonExamples } from "./data/button";
import { badgeExamples } from "./data/badge";
import { chipExamples } from "./data/chip";

export interface DocsComponentExample {
  title: string;
  description: string;
  code: string;
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
    description: 'Essential components for building user interfaces',
    icon: BookOpen,
    components: [
      {name: 'Installation', description: 'Learn more on how to install the package'},
    ]
  },
  {
    name: 'Basic Components',
    slug: 'basic-components',
    icon: Box,
    description: 'Essential components for building user interfaces',
    components: [
      {name: 'Button', description: 'Interactive element for user actions', examples: buttonExamples},
      {name: 'Badge', description: 'Small status indicators', examples: badgeExamples},
      {name: 'Chip', description: 'Compact elements for attributes or actions', examples: chipExamples},
      {name: 'Divider', description: 'Horizontal or vertical separators'},
    ]
  },
  {
    name: 'Layout Components',
    slug: 'layout-components',
    icon: Layers,
    description: 'Components for structuring page layouts',
    components: [
      {name: 'Section', description: 'Section container with customizable tag'},
      {name: 'Container', description: 'Centered content container with max-width'},
      {name: 'Row', description: 'Horizontal flex container'},
      {name: 'Col', description: 'Vertical flex container'},
      {name: 'Grid3', description: '3-column responsive grid'},
      {name: 'Grid4', description: '4-column responsive grid'},
    ]
  },
  {
    name: 'Typography Components',
    slug: 'typography-components',
    icon: FileText,
    description: 'Components for text and typography',
    components: [
      {name: 'Text', description: 'Basic text component with styling options'},
      {name: 'Title', description: 'Title text component'},
      {name: 'PageTitle', description: 'Page-level heading component'},
      {name: 'SectionTitle', description: 'Section-level heading component'},
      {name: 'Link', description: 'Interactive link component'},
      {name: 'List', description: 'Ordered or unordered list component'},
      {name: 'ListItem', description: 'List item component'},
    ]
  }
];