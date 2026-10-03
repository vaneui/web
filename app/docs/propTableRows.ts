import {
  ComponentCategories,
  ComponentKeys,
  defaultTheme,
  type ComponentKey,
  type ComponentCategoryKey,
} from '@vaneui/ui';
import { PropDescriptions, getCategoryName } from '@vaneui/ui/props';
import { COMMON_DOC_CATEGORIES } from './commonCategories';

// TODO: unit-test getPropTableRows (defaults, isCommon, compound keys) once vaneui-web has a TSX test runner.

/** Resolve `defaults`, including compound themes split across sub-keys (button.main, menu.item, ...). */
function getDefaults(key: ComponentKey): Record<string, boolean> {
  const t = (defaultTheme as unknown as Record<string, unknown>)[key] as
    | Record<string, unknown>
    | undefined;
  if (!t || typeof t !== 'object') return {};

  const candidates: Array<unknown> = [
    (t as { main?: { defaults?: unknown } }).main,
    (t as { content?: { defaults?: unknown } }).content,
    (t as { root?: { defaults?: unknown } }).root,
    (t as { item?: { defaults?: unknown } }).item,
    (t as { input?: { defaults?: unknown } }).input,
    t, // direct ComponentTheme (e.g. badge, divider, container, ...)
  ];

  for (const c of candidates) {
    if (c && typeof c === 'object' && 'defaults' in c) {
      const d = (c as { defaults?: Record<string, boolean> }).defaults;
      if (d && typeof d === 'object') return d;
    }
  }
  return {};
}

export interface PropRow {
  prop: string;
  categoryKey: string;
  category: string;
  isDefault: boolean;
  description: string;
  isCommon: boolean;
}

export function getPropTableRows(componentKey: ComponentKey): PropRow[] {
  const defaults = getDefaults(componentKey);
  const cats = ComponentCategories[componentKey] ?? [];
  return cats.flatMap((catKey) => {
    const propKeys =
      (ComponentKeys as Record<string, readonly string[]>)[catKey] ?? [];
    const categoryName = getCategoryName(catKey) ?? catKey;
    const categoryDescriptions = PropDescriptions[catKey]?.props ?? {};
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
