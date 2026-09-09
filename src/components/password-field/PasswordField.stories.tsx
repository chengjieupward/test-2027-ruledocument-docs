import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordField } from './PasswordField';

const meta = {
  title: 'Form/PasswordField', component: PasswordField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof PasswordField>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <PasswordField label="Label" value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PasswordField label="Label" labelPosition="top" />
      <PasswordField label="Label" labelPosition="left" />
    </div>
  ),
};

export const WithDescription: Story = { args: { label: 'Label', description: 'Description text goes here' } };

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <PasswordField label="Disabled" disabled />
      <PasswordField label="Read only" readOnly value="secret123" />
      <PasswordField label="Error" error errorMessage="Error message" />
      <PasswordField label="Error, left position" labelPosition="left" error errorMessage="Error message" />
    </div>
  ),
};
