import { ComponentKey } from "@vaneui/ui";
import type { PropsTable } from "../../lib/docs/propsTables";

export interface DocPageFrontmatter {
  /** Matches @vaneui/ui ComponentKey — drives the auto-generated props table. */
  componentKey?: string;
  /**
   * The page's props tables when it documents several components or parts:
   * `Name=theme.node` entries separated by commas (`Menu=menu.popup, MenuItem=menu.item`).
   * Replaces the table `componentKey` gives. See lib/docs/propsTables.ts.
   */
  propsTables?: string;
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
  /** The guide page's `<title>`. See DocPageMeta. */
  seoTitle?: string;
  mdPath?: string;
  /** Markdown sourced from node_modules instead of app/docs/data. See DocPageMeta. */
  packageMdPath?: string;
  componentKey?: ComponentKey;
  /** Subcomponent documented on the same page; renders a second props table. */
  secondaryComponentKey?: ComponentKey;
  /** Label for the secondary props table (defaults to the component key). */
  secondaryComponentName?: string;
  /** Parsed frontmatter for MD-first pages. */
  frontmatter?: DocPageFrontmatter;
  /** The props tables under the page, in order (pagePropsTables). */
  propsTables?: PropsTable[];
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
