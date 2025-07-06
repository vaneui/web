import React from 'react';

export type PropDefinition = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
};

export type PropCategory = {
  title: string;
  props: PropDefinition[];
};

export type ComponentExample = {
  title: string;
  description: string;
  code: string;
  component: React.ReactNode;
};

export interface DocsPageProps {
  category: string;
  pageTitle: string;
  description: string;
  propCategories: PropCategory[];
  examples: ComponentExample[];
} 