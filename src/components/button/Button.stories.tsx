import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    kind: { control: 'select', options: ['filled', 'outlined', 'ghost', 'text'] },
    color: { control: 'select', options: ['primary', 'danger'] },
    size: { control: 'select', options: ['md', 'sm'] },
    radius: { control: 'select', options: ['md', 'full'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { kind: 'filled', color: 'primary', children: 'Button' } };

export const Kinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button kind="filled">Filled</Button>
      <Button kind="outlined">Outlined</Button>
      <Button kind="ghost">Ghost</Button>
      <Button kind="text">Text</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button color="primary">Primary</Button>
      <Button color="danger">Danger</Button>
    </div>
  ),
};

export const Radiuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button radius="md">Radius md</Button>
      <Button radius="full">Radius full</Button>
    </div>
  ),
};

export const Disabled: Story = { args: { children: 'Button', disabled: true } };
