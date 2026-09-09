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

/** カスタムscroll-thumb（doc v4）：3行を超える内容で自動表示。ネイティブのスクロールバー/リサイズグリップは非表示 */
function OverflowingContentDemo() {
  const [value, setValue] = useState(
    'Line 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8'
  );
  return <TextareaField label="Overflowing content (custom scroll-thumb)" value={value} onValueChange={setValue} />;
}
export const OverflowingContent: Story = { render: () => <OverflowingContentDemo /> };
