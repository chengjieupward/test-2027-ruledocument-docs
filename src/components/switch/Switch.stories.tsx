import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta = {
  title: 'Form/Switch', component: Switch, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onCheckedChange={setChecked} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

function WithLabelDemo() {
  const [checked, setChecked] = useState(true);
  return <Switch label="Label" checked={checked} onCheckedChange={setChecked} />;
}
export const WithLabel: Story = { render: () => <WithLabelDemo /> };

/** label position: right(default, switch on the left) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
      <Switch label="Label position = right" checked labelPosition="right" onCheckedChange={() => {}} />
      <Switch label="Label position = left" checked labelPosition="left" onCheckedChange={() => {}} />
    </div>
  ),
};

/** description付き（doc Anatomy） */
export const WithDescription: Story = {
  render: () => (
    <Switch label="Label" description="Description text goes here" checked={false} onCheckedChange={() => {}} />
  ),
};

/** state: disabled（doc Property一覧） */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Switch label="Disabled off" checked={false} disabled onCheckedChange={() => {}} />
      <Switch label="Disabled on" checked={true} disabled onCheckedChange={() => {}} />
    </div>
  ),
};
