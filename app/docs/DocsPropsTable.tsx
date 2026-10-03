'use client';

import React from 'react';
import NextLink from 'next/link';
import { Code, Text, Link as VaneLink, type ComponentKey } from '@vaneui/ui';
import { getPropTableRows, type PropRow } from './propTableRows';

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
// Text sets overflow-wrap:anywhere, which lets these columns collapse below their
// longest word and break it mid-word; only Description should ever wrap.
const narrowCellClasses = `${cellClasses} whitespace-nowrap`;
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
              <td className={narrowCellClasses}>
                <Code>{row.prop}</Code>
              </td>
              <td className={narrowCellClasses}>
                <Text sm secondary>{row.category}</Text>
              </td>
              <td className={narrowCellClasses}>
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
