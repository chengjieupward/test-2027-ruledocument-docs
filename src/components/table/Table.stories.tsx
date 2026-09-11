import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';

const meta = {
  title: 'Data Display/Table', component: Table, tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

interface Person { id: string; name: string; email: string; role: string; }
const people: Person[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Member' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', role: 'Member' },
];
// width is freely set per column (px number); columns with no width share
// the remaining space evenly (doc: 2026-09-10, width is not a fixed preset)
const columns = [
  { key: 'name', header: 'Name', width: 160, overflow: 'truncate' as const, render: (r: Person) => r.name },
  { key: 'email', header: 'Email', overflow: 'truncate' as const, render: (r: Person) => r.email },
  { key: 'role', header: 'Role', width: 120, overflow: 'truncate' as const, render: (r: Person) => r.role },
];

export const Basic: Story = { args: { columns, rows: people, rowKey: (r: Person) => r.id } };

function SelectableDemo() {
  const [selected, setSelected] = useState<string[]>(['1']);
  return <Table columns={columns} rows={people} rowKey={(r) => r.id} selectable selectedKeys={selected} onSelectedKeysChange={setSelected} />;
}
export const Selectable: Story = { render: () => <SelectableDemo /> };

/** disabledRowKeysで一部の行を選択不可に（doc「実装上の注意」） */
function DisabledRowDemo() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <Table columns={columns} rows={people} rowKey={(r) => r.id} selectable
      selectedKeys={selected} onSelectedKeysChange={setSelected} disabledRowKeys={['3']} />
  );
}
export const DisabledRow: Story = { render: () => <DisabledRowDemo /> };

/** 空データ */
export const Empty: Story = { args: { columns, rows: [], rowKey: (r: Person) => r.id } };

/** cell内に複数要素（アイコン+テキスト）→ overflow="wrap"（default）で4pxのgapを保ちつつ自動折り返し */
interface Task { id: string; name: string; tags: string[]; }
const tasks: Task[] = [
  { id: '1', name: 'Design review', tags: ['Design', 'Urgent', 'Q3'] },
  { id: '2', name: 'Ship release', tags: ['Engineering'] },
];
const wrapColumns = [
  { key: 'name', header: 'Task', width: 160, overflow: 'truncate' as const, render: (r: Task) => r.name },
  {
    key: 'tags', header: 'Tags', width: 200,
    render: (r: Task) => r.tags.map((t) => (
      <span key={t} className="rounded-md bg-(--color-surface-shade) px-1.5 py-0.5 text-xs">{t}</span>
    )),
  },
];
export const WrappingCellContent: Story = { args: { columns: wrapColumns, rows: tasks, rowKey: (r: Task) => r.id } };

/** rowBorder: 行の上線（border-top）表示は任意（`rowBorder` prop、デフォルトoff）。
    上線にすることでheading-rowと最初のcontent行の間にも区切り線が入る。
    slot内のコンテンツの密度・複雑さによって、境界線がある方が見やすい場合とない方がすっきりする場合があるため、
    使用者側の判断に委ねる方針とした */
export const WithRowBorder: Story = { args: { columns, rows: people, rowKey: (r: Person) => r.id, rowBorder: true } };
