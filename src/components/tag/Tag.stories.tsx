import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta = {
  title: 'Data Display/Tag', component: Tag, tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { color: { control: 'select', options: ['green', 'orange', 'red', 'natural', 'blue', 'purple', 'teal'] } },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { color: 'green', label: 'Label' } };

/** 全7种颜色，fill=true（doc「Color」表） */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Tag color="green" label="Upcoming" />
      <Tag color="orange" label="Active" />
      <Tag color="red" label="Delayed" />
      <Tag color="natural" label="Completed" />
      <Tag color="blue" label="Blue" />
      <Tag color="purple" label="Purple" />
      <Tag color="teal" label="Teal" />
    </div>
  ),
};

/** fill=true(実心) / fill=false(浅色底+同色文字)，doc「Color」表の両状態を対比 */
export const FillVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag color="green" fill label="Fill" />
        <Tag color="orange" fill label="Fill" />
        <Tag color="red" fill label="Fill" />
        <Tag color="blue" fill label="Fill" />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Tag color="green" fill={false} label="Tint" />
        <Tag color="orange" fill={false} label="Tint" />
        <Tag color="red" fill={false} label="Tint" />
        <Tag color="blue" fill={false} label="Tint" />
      </div>
    </div>
  ),
};

export const Closable: Story = { args: { color: 'blue', label: 'Label', onClose: () => alert('Removed') } };
