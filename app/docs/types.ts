import React, { JSX } from 'react';
import { Icon } from "react-feather";

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

export interface DocsPageProps {
  category: string;
  pageTitle: string;
  description: string;
  examples: DocsComponentExample[];
} 