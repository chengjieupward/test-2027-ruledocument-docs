import { useMemo, type ReactNode } from 'react';
import { CheckboxMark } from '../checkbox/Checkbox';

/**
 * Table
 * Source: `components/table.md` (doc-only, no Figma access).
 * Overall corner radius 28px per doc (number/radius/lg). Rewritten as
 * columns+rows props instead of Figma's slot-append pattern, per the doc's
 * own implementation note.
 *
 * 2026-09-10 doc revision applied (user-confirmed):
 * - checkbox column reuses the exact same `CheckboxMark` component
 *   Checkbox.tsx uses (20x20 hit target, 4px radius, same color tokens),
 *   instead of a bare native `<input>` styled ad hoc -- the doc explicitly
 *   says the checkbox column must not be independently reimplemented
 * - column width is freely set per-column (`width` prop, px number or any
 *   CSS width string), not restricted to the doc's old xs/sm/md/lg preset
 *   enum -- same resolution as the analogous "fixed width" questions in
 *   other components (SelectField/TextareaField/NumberField/DateField).
 *   Columns with no `width` share the remaining space evenly (flex-1)
 * - cell content overflow is configurable per column via `overflow`:
 *   'wrap' (default) lays the cell out as a flex row with a 4px gap that
 *   wraps when it holds multiple elements (e.g. icon + text); 'truncate'
 *   single-lines the content with an ellipsis, for plain text columns
 * - cell padding stays 8px left/right (`px-2`), unchanged from before
 * - rows can optionally show a top border via the `rowBorder` prop (off by
 *   default) -- using border-TOP (not bottom) so the divider also appears
 *   between the heading row and the first content row, not just between
 *   content rows. Whether a border reads well depends on what's inside the
 *   row's cells -- dense/multi-line slot content usually benefits from a
 *   visible separator, plain single-line text often doesn't need one -- so
 *   this is left to the consumer to decide per use case rather than forced
 *   on or off
 */

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  /** Freely settable (px number or any CSS width string). Omit to share remaining space with other width-less columns. */
  width?: number | string;
  /** 'wrap' (default): flex row, 4px gap, wraps for multi-element content. 'truncate': single-line ellipsis, for plain text. */
  overflow?: 'wrap' | 'truncate';
  render: (row: Row) => ReactNode;
}

export interface TableProps<Row> {
  columns: TableColumn<Row>[];
  rows: Row[];
  rowKey: (row: Row) => string;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectedKeysChange?: (keys: string[]) => void;
  disabledRowKeys?: string[];
  /** Whether each content row shows a bottom border. Optional -- whether this reads better on/off depends on what's inside the row's cells (e.g. dense multi-line content often wants a border, simple single-line text often doesn't). Off by default. */
  rowBorder?: boolean;
  className?: string;
}

function ColumnCell({ column, height, children }: { column: TableColumn<unknown>; height: number; children: ReactNode }) {
  const style = column.width !== undefined ? { width: column.width } : undefined;
  return (
    <div
      className={['flex shrink-0 items-center px-2 py-1', column.width === undefined ? 'flex-1 basis-0' : ''].join(' ')}
      style={{ height, ...style }}
    >
      {column.overflow === 'truncate' ? (
        <span className="block w-full truncate text-sm leading-5 text-(--color-foreground-default)">{children}</span>
      ) : (
        <div className="flex w-full flex-wrap items-center gap-1 text-sm leading-5 text-(--color-foreground-default)">{children}</div>
      )}
    </div>
  );
}

export function Table<Row>({ columns, rows, rowKey, selectable = false, selectedKeys = [], onSelectedKeysChange, disabledRowKeys = [], rowBorder = false, className }: TableProps<Row>) {
  const selectedSet = useMemo(() => new Set(selectedKeys), [selectedKeys]);
  const selectableRowKeys = useMemo(() => rows.map(rowKey).filter((k) => !disabledRowKeys.includes(k)), [rows, rowKey, disabledRowKeys]);
  const allSelected = selectableRowKeys.length > 0 && selectableRowKeys.every((k) => selectedSet.has(k));
  const someSelected = selectableRowKeys.some((k) => selectedSet.has(k));

  const toggleAll = (checked: boolean) => onSelectedKeysChange?.(checked ? selectableRowKeys : []);
  const toggleOne = (key: string, checked: boolean) => {
    const next = new Set(selectedSet);
    if (checked) next.add(key); else next.delete(key);
    onSelectedKeysChange?.(Array.from(next));
  };

  return (
    <div className={['overflow-hidden rounded-[28px] border border-(--color-border-normal) bg-(--color-surface-default)', className].filter(Boolean).join(' ')}>
      <div className="flex h-9 items-center px-4">
        {selectable && (
          <div className="flex h-9 w-12 shrink-0 items-center justify-center px-2 py-1">
            <CheckboxMark
              checked={allSelected ? true : someSelected ? 'indeterminate' : false}
              onCheckedChange={toggleAll}
              aria-label="Select all"
            />
          </div>
        )}
        {columns.map((col) => (
          <ColumnCell key={col.key} column={col as TableColumn<unknown>} height={36}>
            <span className="truncate font-medium">{col.header}</span>
          </ColumnCell>
        ))}
      </div>
      <div>
        {rows.map((row) => {
          const key = rowKey(row);
          const disabled = disabledRowKeys.includes(key);
          const selected = selectedSet.has(key);
          return (
            <div key={key} className={[
              'flex h-12 items-center px-4',
              rowBorder ? 'border-t border-(--color-border-normal)' : '',
              disabled ? 'pointer-events-none opacity-50' : '',
              selected ? 'bg-(--color-surface-transparent-tint)' : '',
            ].join(' ')}>
              {selectable && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center px-2 py-1">
                  <CheckboxMark
                    checked={selected}
                    onCheckedChange={(checked) => toggleOne(key, checked)}
                    disabled={disabled}
                    aria-label="Select this row"
                  />
                </div>
              )}
              {columns.map((col) => (
                <ColumnCell key={col.key} column={col as TableColumn<unknown>} height={48}>
                  {col.render(row)}
                </ColumnCell>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
