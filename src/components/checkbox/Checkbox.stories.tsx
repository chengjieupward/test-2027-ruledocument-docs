import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';
import { CheckboxGroup } from './CheckboxGroup';

const meta = {
  title: 'Form/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [checked, setChecked] = useState(false);
  return <Checkbox label="Label" checked={checked} onCheckedChange={setChecked} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

export const CheckedStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Checkbox label="Unchecked" checked={false} onCheckedChange={() => {}} />
      <Checkbox label="Checked" checked={true} onCheckedChange={() => {}} />
      <Checkbox label="Indeterminate" checked="indeterminate" onCheckedChange={() => {}} />
    </div>
  ),
};

/** label 位置：right(默认，勾选框在左，gap 8px) / left(勾选框在右，gap 16px，doc Layout) */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 280 }}>
      <Checkbox label="Label position = right" checked={true} onCheckedChange={() => {}} labelPosition="right" />
      <Checkbox label="Label position = left" checked={true} onCheckedChange={() => {}} labelPosition="left" />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Checkbox label="Unchecked + error" checked={false} error onCheckedChange={() => {}} />
      <Checkbox label="Checked + error" checked={true} error onCheckedChange={() => {}} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Checkbox label="Disabled unchecked" checked={false} disabled onCheckedChange={() => {}} />
      <Checkbox label="Disabled checked" checked={true} disabled onCheckedChange={() => {}} />
    </div>
  ),
};

// CheckboxGroup demos live here as plain sibling stories (not a separate
// nested component/folder), per user request -- CheckboxGroup is just a
// layout wrapper around Checkbox, not a distinct top-level component.
function GroupDemo(props: { labelPosition?: 'top' | 'left'; description?: string }) {
  const [values, setValues] = useState({ a: true, b: false, c: false });
  const toggle = (key: keyof typeof values) => (v: boolean) => setValues((prev) => ({ ...prev, [key]: v }));
  return (
    <CheckboxGroup label="Group label" description={props.description} labelPosition={props.labelPosition}>
      <Checkbox label="Option A" checked={values.a} onCheckedChange={toggle('a')} />
      <Checkbox label="Option B" checked={values.b} onCheckedChange={toggle('b')} />
      <Checkbox label="Option C" checked={values.c} onCheckedChange={toggle('c')} />
    </CheckboxGroup>
  );
}

/** CheckboxGroup, labelPosition="top"（doc default）。description は任意項目のため既定ではoff */
export const GroupLabelTop: Story = { render: () => <GroupDemo labelPosition="top" /> };

/** CheckboxGroup, labelPosition="left"。description は任意項目のため既定ではoff */
export const GroupLabelLeft: Story = { render: () => <GroupDemo labelPosition="left" /> };

/** CheckboxGroup with description（doc Anatomy: description は任意） */
export const GroupWithDescription: Story = {
  render: () => <GroupDemo labelPosition="top" description="Group description" />,
};
