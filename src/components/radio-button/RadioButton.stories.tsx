import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from './RadioButton';
import { RadioGroup } from './RadioGroup';

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

// RadioGroup demos live here as plain sibling stories (not a separate nested
// component/folder) -- same convention established for CheckboxGroup.
function RadioGroupDemo(props: { labelPosition?: 'top' | 'left'; description?: string }) {
  const options = ['Apple', 'Banana', 'Orange'];
  const [selected, setSelected] = useState(options[0]);
  return (
    <RadioGroup label="Group label" description={props.description} labelPosition={props.labelPosition}>
      {options.map((opt) => (
        <RadioButton key={opt} name={`group-${props.labelPosition}-${props.description ? 'desc' : 'plain'}`} label={opt} checked={selected === opt} onChange={() => setSelected(opt)} />
      ))}
    </RadioGroup>
  );
}

/** RadioGroup, labelPosition="top"（doc default）。description は任意項目のため既定ではoff */
export const GroupLabelTop: Story = { render: () => <RadioGroupDemo labelPosition="top" /> };

/** RadioGroup, labelPosition="left"。description は任意項目のため既定ではoff */
export const GroupLabelLeft: Story = { render: () => <RadioGroupDemo labelPosition="left" /> };

/** RadioGroup with description（doc Anatomy: description は任意、CheckboxGroupと同様） */
export const GroupWithDescription: Story = {
  render: () => <RadioGroupDemo labelPosition="top" description="Group description" />,
};
