import { useMemo, type ReactNode } from 'react';

/**
 * Table
 * Source: `components/table.md` (doc-only, no Figma access).
 * Overall corner radius 28px per doc (number/radius/lg). Column widths from
 * doc's table-slot size table: xs 48px(checkbox) / sm 120px / md 192px / lg 264px.
 * Rewritten as columns+rows props instead of Figma's slot-append pattern, per
 * the doc's own implementation note.
 */

export type TableColumnSize = 'sm' | 'md' | 'lg';
const COLUMN_WIDTH_PX: Record<TableColumnSize, number> = { sm: 120, md: 192, lg: 264 };

export interface TableColumn<Row> {
  key: string;
  header: ReactNode;
  size?: TableColumnSize;
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
  className?: string;
}

function HeaderCheckbox({ checked, indeterminate, onChange }: { checked: boolean; indeterminate: boolean; onChange: (checked: boolean) => void }) {
  return (
    <input type="checkbox" checked={checked} ref={(el) => { if (el) el.indeterminate = indeterminate; }}
      onChange={(e) => onChange(e.target.checked)}
      className="size-4 rounded-xs border-(--color-border-normal) accent-(--color-button-primary-default)" aria-label="Select all" />
  );
}

export function Table<Row>({ columns, rows, rowKey, selectable = false, selectedKeys = [], onSelectedKeysChange, disabledRowKeys = [], className }: TableProps<Row>) {
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
            <HeaderCheckbox checked={allSelected} indeterminate={!allSelected && someSelected} onChange={toggleAll} />
          </div>
        )}
        {columns.map((col) => (
          <div key={col.key} className="flex h-9 shrink-0 items-center px-2 py-1" style={{ width: COLUMN_WIDTH_PX[col.size ?? 'sm'] }}>
            <span className="truncate text-sm font-medium leading-5 text-(--color-foreground-default)">{col.header}</span>
          </div>
        ))}
      </div>
      <div>
        {rows.map((row) => {
          const key = rowKey(row);
          const disabled = disabledRowKeys.includes(key);
          const selected = selectedSet.has(key);
          return (
            <div key={key} className={['flex h-12 items-center px-4', disabled ? 'pointer-events-none opacity-50' : '', selected ? 'bg-(--color-surface-transparent-tint)' : ''].join(' ')}>
              {selectable && (
                <div className="flex h-12 w-12 shrink-0 items-center justify-center px-2 py-1">
                  <input type="checkbox" checked={selected} disabled={disabled} onChange={(e) => toggleOne(key, e.target.checked)}
                    className="size-4 rounded-xs border-(--color-border-normal) accent-(--color-button-primary-default)" aria-label="Select this row" />
                </div>
              )}
              {columns.map((col) => (
                <div key={col.key} className="flex h-12 shrink-0 items-center px-2 py-1" style={{ width: COLUMN_WIDTH_PX[col.size ?? 'sm'] }}>
                  <span className="truncate text-sm leading-5 text-(--color-foreground-default)">{col.render(row)}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;
