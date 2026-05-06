import { DocsSection } from "./types";
import { docsSectionsMeta } from "./docsMetadata";

// All component example pages are now markdown-first under
// app/docs/data/<section>/<slug>.md and rendered by the dynamic route, which
// reads the matching .md file directly. There is no longer any JSX-array
// registry to maintain — sections derive purely from docsSectionsMeta.
export const docsSections: DocsSection[] = docsSectionsMeta.map(section => ({
  ...section,
  pages: section.pages.map(page => ({ ...page })),
}));
