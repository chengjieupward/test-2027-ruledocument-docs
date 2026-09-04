import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Form/TextField', component: TextField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <TextField label="Label" value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextField label="Label" labelPosition="top" />
      <TextField label="Label" labelPosition="left" />
    </div>
  ),
};

/** description付き（doc Property一覧） */
export const WithDescription: Story = { args: { label: 'Label', description: 'Description text goes here' } };

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextField label="Disabled" disabled />
      <TextField label="Read only" readOnly value="Read only value" />
      <TextField label="Error" error errorMessage="Error message" />
    </div>
  ),
};
