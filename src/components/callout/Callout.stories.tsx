import type { Meta, StoryObj } from '@storybook/react-vite';
import { Callout } from './Callout';

const meta = {
  title: 'Feedback/Callout',
  component: Callout,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { type: { control: 'select', options: ['info', 'danger', 'success', 'warning'] } },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { type: 'info', title: 'Title', description: 'Type your message or details here…' } };

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Callout type="info" title="Title" description="Type your message or details here…" />
      <Callout type="danger" title="Title" description="Type your message or details here…" />
      <Callout type="success" title="Title" description="Type your message or details here…" />
      <Callout type="warning" title="Title" description="Type your message or details here…" />
    </div>
  ),
};

export const WithoutIcon: Story = { args: { type: 'info', title: 'Title', icon: false } };
