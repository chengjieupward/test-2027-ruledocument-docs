import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectField } from './SelectField';

const meta = {
  title: 'Form/SelectField', component: SelectField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SelectField>;

export default meta;
type Story = StoryObj<typeof meta>;

const fruitOptions = [
  { value: 'apple', label: 'Apple' }, { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }, { value: 'grape', label: 'Grape' },
];

function BasicDemo() {
  const [value, setValue] = useState<string | undefined>();
  return <SelectField label="Label" options={fruitOptions} value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（他フォームコンポーネント共通のパターン） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SelectField label="Label" labelPosition="top" options={fruitOptions} onValueChange={() => {}} />
      <SelectField label="Label" labelPosition="left" options={fruitOptions} onValueChange={() => {}} />
    </div>
  ),
};

/** description付きオプション（doc item-single Anatomy） */
function WithDescriptionDemo() {
  const [value, setValue] = useState<string | undefined>();
  const options = [
    { value: 'basic', label: 'Basic', description: 'For individuals' },
    { value: 'pro', label: 'Pro', description: 'For small teams' },
    { value: 'enterprise', label: 'Enterprise', description: 'For large organizations' },
  ];
  return <SelectField label="Plan" options={options} value={value} onValueChange={setValue} />;
}
export const WithDescription: Story = { render: () => <WithDescriptionDemo /> };

/** disabled option（doc item-single state） */
function DisabledOptionDemo() {
  const [value, setValue] = useState<string | undefined>();
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana (out of stock)', disabled: true },
    { value: 'orange', label: 'Orange' },
  ];
  return <SelectField label="Label" options={options} value={value} onValueChange={setValue} />;
}
export const DisabledOption: Story = { render: () => <DisabledOptionDemo /> };

/** state: disabled / readonly / error（doc Anatomy「4状態パターン」） */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SelectField label="Disabled" options={fruitOptions} disabled onValueChange={() => {}} />
      <SelectField label="Read only" options={fruitOptions} value="apple" readOnly onValueChange={() => {}} />
      <SelectField label="Error" options={fruitOptions} error errorMessage="Error message" onValueChange={() => {}} />
    </div>
  ),
};
