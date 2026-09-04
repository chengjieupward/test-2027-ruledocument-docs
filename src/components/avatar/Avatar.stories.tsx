import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { size: 'sm', type: 'icon' } };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar size="sm" type="letter" letter="N" />
      <Avatar size="md" type="letter" letter="N" />
      <Avatar size="lg" type="letter" letter="N" />
    </div>
  ),
};

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Avatar size="md" type="icon" />
      <Avatar size="md" type="letter" letter="N" />
      <Avatar size="md" type="image" imageSrc="https://i.pravatar.cc/64" imageAlt="Sample user avatar" />
    </div>
  ),
};
