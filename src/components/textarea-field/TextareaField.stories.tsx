import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextareaField } from './TextareaField';

const meta = {
  title: 'Form/TextareaField', component: TextareaField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TextareaField>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <TextareaField label="Label" value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextareaField label="Label" labelPosition="top" />
      <TextareaField label="Label" labelPosition="left" />
    </div>
  ),
};

export const WithDescription: Story = { args: { label: 'Label', description: 'Description text goes here' } };

/** state: disabled / readonly / error（doc Anatomy「4状態パターン」） */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextareaField label="Disabled" disabled />
      <TextareaField label="Read only" readOnly value="Read only content" />
      <TextareaField label="Error" error errorMessage="Error message" />
    </div>
  ),
};
