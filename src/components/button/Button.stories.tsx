import type { Meta, StoryObj } from '@storybook/react-vite';
import { X } from '@phosphor-icons/react';
import { Button } from './Button';

const meta = {
  title: 'Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    kind: { control: 'select', options: ['filled', 'outlined', 'ghost', 'text', 'inner'] },
    color: { control: 'select', options: ['primary', 'danger'] },
    size: { control: 'select', options: ['md', 'sm'] },
    radius: { control: 'select', options: ['md', 'full'] },
    background: { control: 'select', options: ['transparent', 'white'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { kind: 'filled', color: 'primary', children: 'Button' } };

export const Kinds: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button kind="filled">Filled</Button>
      <Button kind="outlined">Outlined</Button>
      <Button kind="ghost">Ghost</Button>
      <Button kind="text">Text</Button>
      <Button kind="inner" iconBefore={<X size={16} />} aria-label="Clear" />
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

// button.md: Inner button is used inside form fields (date/password/search etc.),
// sized to match the input height it sits inside (input 40px -> button md 32px,
// input 32px -> button sm 24px). sm values here are an extrapolated estimate,
// not directly measured -- see button.md's 2026-09-09 note.
export const InnerButton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        <Button kind="inner" size="md" iconBefore={<X size={16} />} aria-label="Clear" />
        <span style={{ fontSize: 12, color: '#75808c' }}>size=md (32px)</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
        <Button kind="inner" size="sm" iconBefore={<X size={14} />} aria-label="Clear" />
        <span style={{ fontSize: 12, color: '#75808c' }}>size=sm (24px, estimated)</span>
      </div>
    </div>
  ),
};

// button.md: Outlined has two background variants. `transparent` assumes an
// already-white ancestor (e.g. a card); `white` explicitly paints white, for use
// on non-white backdrops (e.g. this gray wrapper) so the button reads clearly.
export const OutlinedBackground: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, padding: 24, background: '#e4ecf2' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Button kind="outlined" background="transparent">Transparent</Button>
        <span style={{ fontSize: 12, color: '#282c33' }}>background=transparent</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <Button kind="outlined" background="white">White</Button>
        <span style={{ fontSize: 12, color: '#282c33' }}>background=white</span>
      </div>
    </div>
  ),
};
