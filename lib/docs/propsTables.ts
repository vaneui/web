import { resolveThemeNode } from '../../app/docs/propTableRows';

// Which props tables a docs page shows. The page route, the Markdown renderer
// (the `.md` route and llms-full.txt) and the search index all ask here, so
// they list the same tables under the same names.

/** One props table on a docs page */
export interface PropsTable {
  /** The component as exported, shown in the table's heading: `MenuItem` */
  name: string;
  /** Theme node the rows come from: a component key (`button`) or one part (`menu.item`) */
  node: string;
}

/** What a page's metadata says about its props tables (a subset of DocPageMeta) */
export interface PropsTablesPage {
  slug: string;
  name: string;
  componentKey?: string;
  secondaryComponentKey?: string;
  secondaryComponentName?: string;
}

/** The frontmatter keys that decide a page's props tables */
export interface PropsTablesFrontmatter {
  componentKey?: string;
  propsTables?: string;
}

const NAME = /^[A-Za-z]\w*$/;
const NODE = /^[A-Za-z]\w*(\.[A-Za-z]\w*)*$/;

/**
 * Parse the `propsTables` frontmatter value: `Name=theme.node` entries separated by commas,
 * in the order the tables appear. `Menu=menu.popup, MenuItem=menu.item` gives a "Menu Props"
 * table from `menu.popup` and a "MenuItem Props" table from `menu.item`.
 */
export function parsePropsTables(value: string): PropsTable[] {
  return value
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)
    .map((entry) => {
      const [name, node, ...rest] = entry.split('=').map((part) => part.trim());
      if (rest.length > 0 || !NAME.test(name) || !NODE.test(node ?? '')) {
        throw new Error(`propsTables entry "${entry}" is not "Name=theme.node"`);
      }
      return { name, node };
    });
}

/**
 * The props tables a page shows, in order. A page that sets `propsTables` in its frontmatter
 * lists them itself, one per component or part. Any other page gets one table for its
 * `componentKey`, named after the page, and one for its secondary component.
 * Throws, naming the page, when an entry is malformed, names no theme node or repeats a name.
 */
export function pagePropsTables(page: PropsTablesPage, frontmatter: PropsTablesFrontmatter = {}): PropsTable[] {
  try {
    const tables = frontmatter.propsTables !== undefined
      ? parsePropsTables(frontmatter.propsTables)
      : defaultTables(page, frontmatter);
    const names = new Set<string>();
    for (const table of tables) {
      resolveThemeNode(table.node);
      // Each table's heading is an anchor on the page
      if (names.has(table.name)) throw new Error(`two props tables are named "${table.name}"`);
      names.add(table.name);
    }
    return tables;
  } catch (error) {
    throw new Error(`Docs page "${page.slug}": ${error instanceof Error ? error.message : String(error)}`, { cause: error });
  }
}

function defaultTables(page: PropsTablesPage, frontmatter: PropsTablesFrontmatter): PropsTable[] {
  const key = page.componentKey ?? frontmatter.componentKey;
  const tables: PropsTable[] = [];
  if (key) tables.push({ name: page.name, node: key });
  if (page.secondaryComponentKey) {
    tables.push({ name: page.secondaryComponentName ?? page.secondaryComponentKey, node: page.secondaryComponentKey });
  }
  return tables;
}

/** A table's heading on the site, and the text its anchor id is made from: "MenuItem Props" */
export function propsTableTitle(table: PropsTable): string {
  return `${table.name} Props`;
}
