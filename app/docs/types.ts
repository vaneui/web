import { JSX } from 'react';
import { Icon } from "react-feather";

export interface DocsComponentExample {
  title: string;
  description: string;
  component: JSX.Element;
}

export interface DocsPage {
  name: string;
  description: string;
  examples?: DocsComponentExample[];
  mdPath?: string;
}

export interface DocsSection {
  name: string;
  slug: string;
  icon: Icon;
  description: string;
  pages: DocsPage[];
}

export interface DocsPageProps {
  category: string;
  pageTitle: string;
  description: string;
  examples: DocsComponentExample[];
  md?: string;
} 