import { JSX } from 'react';
import { ComponentKey } from "@vaneui/ui";

export interface DocsPagePart {
  title: string;
  md: string;
  component: JSX.Element;
}

export interface DocsPage {
  slug: string;
  name: string;
  description: string;
  parts: DocsPagePart[];
  mdPath?: string;
  componentKey?: ComponentKey;
}

export interface DocsSection {
  name: string;
  slug: string;
  description: string;
  pages: DocsPage[];
}

export interface DocsPageProps {
  pageData: DocsPage;
  section: DocsSection;
  md?: string;
} 