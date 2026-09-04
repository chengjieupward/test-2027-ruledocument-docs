import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tab } from './Tab';

const meta = {
  title: 'Navigation/Tab', component: Tab, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoOptions = [{ value: 'overview', label: 'Overview' }, { value: 'settings', label: 'Settings' }];

function BasicDemo() {
  const [value, setValue] = useState('overview');
  return <Tab options={twoOptions} value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** items: 2〜6（doc Property一覧） */
function ItemsCountDemo() {
  const [value, setValue] = useState('a');
  const options = [
    { value: 'a', label: 'Tab A' }, { value: 'b', label: 'Tab B' },
    { value: 'c', label: 'Tab C' }, { value: 'd', label: 'Tab D' },
  ];
  return <Tab options={options} value={value} onValueChange={setValue} />;
}
export const ItemsCount: Story = { render: () => <ItemsCountDemo /> };

/** size: md(高さ40px) / sm(高さ32px)（doc Property一覧） */
function SizesDemo() {
  const [value, setValue] = useState('overview');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Tab options={twoOptions} value={value} onValueChange={setValue} size="md" />
      <Tab options={twoOptions} value={value} onValueChange={setValue} size="sm" />
    </div>
  );
}
export const Sizes: Story = { render: () => <SizesDemo /> };

/** state: disabled（doc Property一覧） */
function DisabledDemo() {
  const [value, setValue] = useState('overview');
  const options = [{ value: 'overview', label: 'Overview' }, { value: 'settings', label: 'Settings', disabled: true }];
  return <Tab options={options} value={value} onValueChange={setValue} />;
}
export const DisabledOption: Story = { render: () => <DisabledDemo /> };
