import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '@phosphor-icons/react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Form/SegmentedControl', component: SegmentedControl, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoOptions = [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }];

function BasicDemo() {
  const [value, setValue] = useState('list');
  return <div style={{ width: 320 }}><SegmentedControl options={twoOptions} value={value} onValueChange={setValue} /></div>;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** items: 2〜6（doc Property一覧、6が上限）。2026-09-10: 上限の6件で表示するよう変更 */
function ItemsCountDemo() {
  const [value, setValue] = useState('a');
  const options = [
    { value: 'a', label: 'A' }, { value: 'b', label: 'B' },
    { value: 'c', label: 'C' }, { value: 'd', label: 'D' },
    { value: 'e', label: 'E' }, { value: 'f', label: 'F' },
  ];
  return <div style={{ width: 480 }}><SegmentedControl options={options} value={value} onValueChange={setValue} /></div>;
}
export const ItemsCount: Story = { render: () => <ItemsCountDemo /> };

/** size: md(高さ40px) / sm(高さ32px)（doc Property一覧） */
function SizesDemo() {
  const [value, setValue] = useState('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} size="md" />
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} size="sm" />
    </div>
  );
}
export const Sizes: Story = { render: () => <SizesDemo /> };

function RadiusesDemo() {
  const [value, setValue] = useState('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 320 }}>
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} radius="default" />
      <SegmentedControl options={twoOptions} value={value} onValueChange={setValue} radius="full" />
    </div>
  );
}
export const Radiuses: Story = { render: () => <RadiusesDemo /> };

/** state: disabled（doc Property一覧） */
function DisabledDemo() {
  const [value, setValue] = useState('list');
  const options = [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid', disabled: true }];
  return <div style={{ width: 320 }}><SegmentedControl options={options} value={value} onValueChange={setValue} /></div>;
}
export const DisabledOption: Story = { render: () => <DisabledDemo /> };

/** content: text only / icon before / icon only（Tag/Tabと同じユーザー追加要件）。
    3種類を同一コントロール内に混在させると誤解を招くため、それぞれ独立して提示する */
function ContentVariantsDemo() {
  const [textValue, setTextValue] = useState('list');
  const [iconBeforeValue, setIconBeforeValue] = useState('list');
  const [iconOnlyValue, setIconOnlyValue] = useState('list');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>text only</span>
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]}
            value={textValue} onValueChange={setTextValue}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>icon before</span>
        <div style={{ width: 320 }}>
          <SegmentedControl
            options={[
              { value: 'list', label: 'List', icon: <Placeholder size={16} /> },
              { value: 'grid', label: 'Grid', icon: <Placeholder size={16} /> },
            ]}
            value={iconBeforeValue} onValueChange={setIconBeforeValue}
          />
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>icon only</span>
        <div style={{ width: 160 }}>
          <SegmentedControl
            options={[
              { value: 'list', icon: <Placeholder size={16} />, iconLabel: 'List' },
              { value: 'grid', icon: <Placeholder size={16} />, iconLabel: 'Grid' },
            ]}
            value={iconOnlyValue} onValueChange={setIconOnlyValue}
          />
        </div>
      </div>
    </div>
  );
}
export const ContentVariants: Story = { render: () => <ContentVariantsDemo /> };
