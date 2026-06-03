'use client';

import React from 'react';
import NextLink from 'next/link';
import {
  Code,
  Text,
  Link as VaneLink,
  ComponentCategories,
  ComponentKeys,
  defaultTheme,
  type ComponentKey,
  type ComponentCategoryKey,
} from '@vaneui/ui';
import { PropDescriptions, getCategoryName } from '@vaneui/ui/props';
import { COMMON_DOC_CATEGORIES } from './commonCategories';

// TODO: once a TSX-aware test runner (Vitest / Jest) is wired up to vaneui-web,
// add a unit test for getPropTableRows that validates:
//   - Button rows count + isDefault flagging for primary / outline / sm
//   - Common categories (e.g. `hide`) get isCommon === true
//   - Compound components (modal -> content, menu -> item, navLink -> root, checkbox -> input)
//     resolve their defaults correctly.

/**
 * Resolve `defaults` for a component, including compound components whose
 * theme is split across sub-keys (button.main, card.main, modal.content,
 * menu.item, navLink.root, checkbox.input).
 */
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

/**
 * Render a prop description, turning markdown-style `inline code` backtick
 * spans into <Code> elements. PropDescriptions come from @vaneui/ui JSDoc,
 * which uses backticks for class names and CSS values (e.g. `flex-1`).
 */
function renderDescription(text: string): React.ReactNode {
  return text.split(/(`[^`]+`)/g).map((part, i) =>
    part.length > 1 && part.startsWith('`') && part.endsWith('`') ? (
      <Code key={i}>{part.slice(1, -1)}</Code>
    ) : (
      part
    ),
  );
}

function sortRows(rows: PropRow[]): PropRow[] {
  return [...rows].sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    return a.prop.localeCompare(b.prop);
  });
}

interface PropsTableProps {
  componentKey: ComponentKey;
}

const tableClasses =
  'w-full text-left border-collapse text-sm';
const cellClasses =
  'border-b border-gray-200 dark:border-gray-800 py-2 pr-4 align-top';
const headCellClasses =
  'border-b border-gray-200 dark:border-gray-800 py-2 pr-4 font-semibold text-sm text-gray-700 dark:text-gray-300';

function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-x-auto w-full">
      <table className={tableClasses}>
        <thead>
          <tr>
            <th scope="col" className={headCellClasses}>Prop</th>
            <th scope="col" className={headCellClasses}>Category</th>
            <th scope="col" className={headCellClasses}>Default</th>
            <th scope="col" className={headCellClasses}>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={`${row.categoryKey}:${row.prop}`}>
              <td className={cellClasses}>
                <Code>{row.prop}</Code>
              </td>
              <td className={cellClasses}>
                <Text sm secondary>{row.category}</Text>
              </td>
              <td className={cellClasses}>
                {row.isDefault ? (
                  <Text sm aria-label="default">{'✓'}</Text>
                ) : null}
              </td>
              <td className={cellClasses}>
                {row.description ? (
                  <Text sm>{renderDescription(row.description)}</Text>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DocsPropsTable({ componentKey }: PropsTableProps) {
  const rows = React.useMemo(() => getPropTableRows(componentKey), [componentKey]);
  const componentRows = React.useMemo(
    () => sortRows(rows.filter((r) => !r.isCommon)),
    [rows],
  );
  const commonRows = React.useMemo(
    () => sortRows(rows.filter((r) => r.isCommon)),
    [rows],
  );

  return (
    <>
      {componentRows.length > 0 && <PropsTable rows={componentRows}/>}
      {commonRows.length > 0 && (
        <details className="mt-4">
          <summary className="cursor-pointer">
            <Text sm secondary tag="span">
              Layout &amp; utility props (gap, padding, hide, items, justify, ...) — documented on{' '}
              <VaneLink href="/docs/reference/common-props" tag={NextLink}>
                Common Props
              </VaneLink>
            </Text>
          </summary>
          <div className="mt-3">
            <PropsTable rows={commonRows}/>
          </div>
        </details>
      )}
    </>
  );
}
