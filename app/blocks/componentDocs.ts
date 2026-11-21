import { docsSectionsMeta } from '../docs/docsMetadata';

// Components documented on another component's page: parts and numbered variants
const DOCS_PAGE_OF: Record<string, string> = {
  MenuItem: 'Menu',
  MenuLabel: 'Menu',
  ListItem: 'List',
  Grid2: 'Grid',
  Grid3: 'Grid',
  Grid4: 'Grid',
  Grid5: 'Grid',
  Grid6: 'Grid',
  Thead: 'Table',
  Tbody: 'Table',
  Tfoot: 'Table',
  Tr: 'Table',
  Th: 'Table',
  Td: 'Table',
};

/** The docs page of a VaneUI component, by its export name, or undefined when it has none */
export function componentDocsHref(component: string): string | undefined {
  const pageName = DOCS_PAGE_OF[component] ?? component;
  for (const section of docsSectionsMeta) {
    const page = section.pages.find(p => p.componentKey && p.name === pageName);
    if (page) return `/docs/${section.slug}/${page.slug}`;
  }
  return undefined;
}
