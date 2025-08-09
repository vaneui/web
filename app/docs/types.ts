import { JSX } from 'react';
import { Icon } from "react-feather";

export interface DocsPagePart {
  title: string;
  md: string;
  component: JSX.Element;
}

export interface DocsPage {
  slug: string;
  name: string;
  description: string;
  parts?: DocsPagePart[];
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
  examples: DocsPagePart[];
  md?: string;
} 