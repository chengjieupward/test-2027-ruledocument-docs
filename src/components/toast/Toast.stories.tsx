import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { type: { control: 'select', options: ['info', 'error', 'success', 'loading'] } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { type: 'info', title: 'Toast Title', description: 'Type your message or details here…' } };

export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast type="info" title="Toast Title" description="Type your message or details here…" />
      <Toast type="error" title="Toast Title" description="Type your message or details here…" />
      <Toast type="success" title="Toast Title" description="Type your message or details here…" />
      <Toast type="loading" title="Toast Title" description="Type your message or details here…" closeButton={false} />
    </div>
  ),
};
