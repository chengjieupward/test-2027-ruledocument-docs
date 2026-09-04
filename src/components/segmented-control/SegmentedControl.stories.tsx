import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Form/SegmentedControl', component: SegmentedControl, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoOptions = [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }];

function BasicDemo() {
  const [value, setValue] = useState('list');
  return <div style={{ width: 320 }}><SegmentedControl options={twoOptions} value={value} onValueChange={setValue} /></div>;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** items: 2〜6（doc Property一覧） */
function ItemsCountDemo() {
  const [value, setValue] = useState('a');
  const options = [
    { value: 'a', label: 'A' }, { value: 'b', label: 'B' },
    { value: 'c', label: 'C' }, { value: 'd', label: 'D' },
  ];
  return <div style={{ width: 400 }}><SegmentedControl options={options} value={value} onValueChange={setValue} /></div>;
}
export const ItemsCount: Story = { render: () => <ItemsCountDemo /> };

/** size: md(高さ40px) / sm(高さ32px)（doc Property一覧） */
function SizesDemo() {
  const [value, setValue] = useState('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} size="md" />
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} size="sm" />
    </div>
  );
}
export const Sizes: Story = { render: () => <SizesDemo /> };

function RadiusesDemo() {
  const [value, setValue] = useState('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} radius="default" />
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} radius="full" />
    </div>
  );
}
export const Radiuses: Story = { render: () => <RadiusesDemo /> };

/** state: disabled（doc Property一覧） */
function DisabledDemo() {
  const [value, setValue] = useState('list');
  const options = [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid', disabled: true }];
  return <div style={{ width: 320 }}><SegmentedControl options={options} value={value} onValueChange={setValue} /></div>;
}
export const DisabledOption: Story = { render: () => <DisabledDemo /> };
