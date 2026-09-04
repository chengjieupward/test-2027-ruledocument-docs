import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from './SearchInput';

const meta = {
  title: 'Form/SearchInput', component: SearchInput, tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { radius: { control: 'select', options: ['default', 'full'] }, size: { control: 'select', options: ['md', 'sm'] } },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <SearchInput value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

export const Radiuses: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <SearchInput radius="default" value="Text value" onValueChange={() => {}} />
      <SearchInput radius="full" value="Text value" onValueChange={() => {}} />
    </div>
  ),
};

/** 两种尺寸：md(40px) / sm(32px)，doc「サイズ別実測値」表 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 320 }}>
      <SearchInput size="md" value="Text value" onValueChange={() => {}} />
      <SearchInput size="sm" value="Text value" onValueChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = { args: { value: 'Text value', disabled: true } };
