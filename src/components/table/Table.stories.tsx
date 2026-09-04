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
const columns = [
  { key: 'name', header: 'Name', size: 'sm' as const, render: (r: Person) => r.name },
  { key: 'email', header: 'Email', size: 'md' as const, render: (r: Person) => r.email },
  { key: 'role', header: 'Role', size: 'sm' as const, render: (r: Person) => r.role },
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
