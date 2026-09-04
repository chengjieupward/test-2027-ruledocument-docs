import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';

const meta = {
  title: 'Form/RadioButton', component: RadioButton, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { render: () => <RadioButton name="basic" label="Label" defaultChecked /> };

function GroupDemo() {
  const options = ['Apple', 'Banana', 'Orange'];
  const [selected, setSelected] = useState(options[0]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 240 }}>
      {options.map((opt) => (
        <RadioButton key={opt} name="fruit" label={opt} checked={selected === opt} onChange={() => setSelected(opt)} />
      ))}
    </div>
  );
}
export const Group: Story = { render: () => <GroupDemo /> };

/** label 位置：right(默认，圈在左) / left(圈在右)，doc Anatomy */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 280 }}>
      <RadioButton name="pos1" label="Label position = right" checked labelPosition="right" onChange={() => {}} />
      <RadioButton name="pos2" label="Label position = left" checked labelPosition="left" onChange={() => {}} />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <RadioButton name="err" label="Unselected + error" error onChange={() => {}} />
      <RadioButton name="err" label="Selected + error" checked error onChange={() => {}} />
    </div>
  ),
};

/** disabled：doc「State別カラー」表のdisabled行 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <RadioButton name="disabled" label="Disabled unselected" disabled onChange={() => {}} />
      <RadioButton name="disabled" label="Disabled selected" checked disabled onChange={() => {}} />
    </div>
  ),
};
