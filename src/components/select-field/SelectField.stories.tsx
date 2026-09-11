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

/** avatar オプション（doc select-field-content Anatomy「avatar」variant） */
function WithAvatarDemo() {
  const [value, setValue] = useState<string | undefined>();
  const options = [
    { value: 'alice', label: 'Alice', avatarUrl: 'https://i.pravatar.cc/64?img=1' },
    { value: 'bob', label: 'Bob', avatarUrl: 'https://i.pravatar.cc/64?img=2' },
    { value: 'carol', label: 'Carol', avatarUrl: 'https://i.pravatar.cc/64?img=3' },
  ];
  return <SelectField label="Assignee" options={options} value={value} onValueChange={setValue} />;
}
export const WithAvatar: Story = { render: () => <WithAvatarDemo /> };

/** multi-select（doc select-field-content「multi-select」variant: chip表示 + Allオプション） */
function MultiSelectDemo() {
  const [value, setValue] = useState<string[]>(['apple']);
  return (
    <SelectField
      label="Fruits"
      multiple
      options={fruitOptions}
      value={value}
      onValueChange={setValue}
    />
  );
}
export const MultiSelect: Story = { render: () => <MultiSelectDemo /> };

/** multi-select, 全選択状態（doc: 全選択時はchipではなく「すべて」テキスト表示） */
function MultiSelectAllDemo() {
  const [value, setValue] = useState<string[]>(fruitOptions.map((o) => o.value));
  return (
    <SelectField
      label="Fruits"
      multiple
      options={fruitOptions}
      value={value}
      onValueChange={setValue}
      allSelectedLabel="All"
    />
  );
}
export const MultiSelectAllSelected: Story = { render: () => <MultiSelectAllDemo /> };

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

/** labelPosition="left" + error（2026-09-09修正確認：エラーメッセージはtriggerの下、右ではない） */
export const LeftPositionWithError: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <SelectField label="Label" labelPosition="left" options={fruitOptions} error errorMessage="Error message" onValueChange={() => {}} />
    </div>
  ),
};

/** group-name行：連続するoptionが同じgroupを持つ場合、太字のグループ見出し＋件数バッジを表示（doc: group-name行、2026-09-10実装） */
function GroupedDemo() {
  const [value, setValue] = useState<string | undefined>();
  const groupedOptions = [
    { value: 'apple', label: 'Apple', group: 'Fruits' },
    { value: 'banana', label: 'Banana', group: 'Fruits' },
    { value: 'orange', label: 'Orange', group: 'Fruits' },
    { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
    { value: 'potato', label: 'Potato', group: 'Vegetables' },
  ];
  return <SelectField label="Label" options={groupedOptions} value={value} onValueChange={setValue} />;
}
export const GroupedOptions: Story = { render: () => <GroupedDemo /> };
