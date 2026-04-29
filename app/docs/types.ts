import { JSX } from 'react';
import { ComponentKey } from "@vaneui/ui";

export interface DocsPagePart {
  title: string;
  md: string;
  component: JSX.Element;
  /** Optional code string for the CodeBlock. If omitted, auto-generated from component JSX. If empty string, CodeBlock is hidden. */
  code?: string;
}

export interface DocPageFrontmatter {
  /** Matches @vaneui/ui ComponentKey — drives the auto-generated props table. */
  componentKey?: string;
  /** Suggested import line shown in the docs (e.g. `import { Button } from "@vaneui/ui"`). */
  importPath?: string;
  /** Deep-link to the component source on GitHub. */
  sourceUrl?: string;
  /** First version that shipped this component. */
  since?: string;
  /** Stability tag — `stable` (default) or `beta`. */
  tag?: 'stable' | 'beta';
}

export interface DocsPage {
  slug: string;
  name: string;
  description: string;
  /** Optional — TSX-array pages set this; MD-first pages don't. */
  parts?: DocsPagePart[];
  mdPath?: string;
  componentKey?: ComponentKey;
  /** Parsed frontmatter for MD-first pages. */
  frontmatter?: DocPageFrontmatter;
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

// Re-export metadata types for convenience
export type { DocPageMeta, DocSectionMeta } from './docsMetadata';
