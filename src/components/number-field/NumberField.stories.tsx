import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta = {
  title: 'Form/NumberField', component: NumberField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof NumberField>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <NumberField label="Label" value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberField label="Label" labelPosition="top" />
      <NumberField label="Label" labelPosition="left" />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <NumberField label="Disabled" disabled />
      <NumberField label="Read only" readOnly value="42" />
      <NumberField label="Error" error errorMessage="Error message" />
    </div>
  ),
};
