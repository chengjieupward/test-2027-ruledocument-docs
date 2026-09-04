import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DateField } from './DateField';

const meta = {
  title: 'Form/DateField', component: DateField, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof DateField>;

export default meta;
type Story = StoryObj<typeof meta>;

function BasicDemo() {
  const [value, setValue] = useState('');
  return <DateField label="Label" value={value} onValueChange={setValue} onCalendarClick={() => alert('Open calendar')} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** label position: top(default) / left（doc Anatomy） */
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DateField label="Label" labelPosition="top" />
      <DateField label="Label" labelPosition="left" />
    </div>
  ),
};

/** content: day(仅日期) / minute(日期+时间)，doc「DateContent の content variant」表 */
export const Content: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DateField label="Date only" content="day" />
      <DateField label="Date + time" content="minute" />
    </div>
  ),
};

/** state: disabled / readonly / error（doc Property一覧の4状態パターンより default 以外） */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <DateField label="Disabled" disabled />
      <DateField label="Read only" readOnly value="2025/01/01" />
      <DateField label="Error" error errorMessage="Error message" />
    </div>
  ),
};
