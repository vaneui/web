import {
  ComponentKeys,
  defaultTheme,
  type ComponentCategoryKey,
} from '@vaneui/ui';
import { PropDescriptions, getCategoryName } from '@vaneui/ui/props';
import { COMMON_DOC_CATEGORIES } from './commonCategories';

/** What a props table reads from a theme node: the element's defaults and the prop categories it takes */
export interface ThemeNode {
  defaults: Record<string, boolean>;
  categories: readonly string[];
}

function isThemeNode(value: unknown): value is ThemeNode {
  if (!value || typeof value !== 'object') return false;
  const { defaults, categories } = value as { defaults?: unknown; categories?: unknown };
  return Boolean(defaults) && typeof defaults === 'object' && Array.isArray(categories);
}

/**
 * The part of a compound theme that receives the component's own props, in the order tried:
 * `button.main`, `modal.content`, `navLink.root`, `menu.popup`, `checkbox.input`. Menu spreads
 * its props on the popup; its items are a part of their own (`menu.item`).
 */
const ROOT_PARTS = ['main', 'content', 'root', 'popup', 'input'] as const;

/**
 * The theme node behind a props table. `path` is a component key (`badge`, or `button` for the
 * root part of a compound theme) or a dotted path to one part (`menu.item`, `card.header`).
 * Throws when the path names no node, so a typo fails the build instead of printing an empty table.
 */
export function resolveThemeNode(path: string): ThemeNode {
  let value: unknown = defaultTheme;
  for (const segment of path.split('.')) {
    value = value && typeof value === 'object' && Object.hasOwn(value, segment)
      ? (value as Record<string, unknown>)[segment]
      : undefined;
  }
  if (isThemeNode(value)) return value;
  if (value && typeof value === 'object') {
    const parts = value as Record<string, unknown>;
    for (const part of ROOT_PARTS) {
      if (Object.hasOwn(parts, part) && isThemeNode(parts[part])) return parts[part] as ThemeNode;
    }
  }
  throw new Error(`"${path}" is not a theme node of @vaneui/ui (a component key such as "button", or one part such as "menu.item")`);
}

export interface PropRow {
  prop: string;
  categoryKey: string;
  category: string;
  isDefault: boolean;
  description: string;
  isCommon: boolean;
}

/**
 * The rows of one props table: every prop of every category the theme node takes, with the
 * node's own defaults marked. Categories and defaults both come from the node, so a table
 * documents the element that receives the props.
 */
export function getPropTableRows(node: string): PropRow[] {
  const { defaults, categories } = resolveThemeNode(node);
  return categories.flatMap((catKey) => {
    const propKeys =
      (ComponentKeys as Record<string, readonly string[]>)[catKey] ?? [];
    const categoryName = getCategoryName(catKey as ComponentCategoryKey) ?? catKey;
    const categoryDescriptions = PropDescriptions[catKey as ComponentCategoryKey]?.props ?? {};
    return propKeys.map((prop) => ({
      prop,
      categoryKey: catKey,
      category: categoryName,
      isDefault: defaults[prop] === true,
      description: categoryDescriptions[prop]?.description ?? '',
      isCommon: COMMON_DOC_CATEGORIES.has(catKey as ComponentCategoryKey),
    }));
  });
}
