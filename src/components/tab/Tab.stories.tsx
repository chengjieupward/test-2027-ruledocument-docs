import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Placeholder } from '@phosphor-icons/react';
import { Tab } from './Tab';

const meta = {
  title: 'Navigation/Tab', component: Tab, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoOptions = [{ value: 'overview', label: 'Overview' }, { value: 'settings', label: 'Settings' }];

function BasicDemo() {
  const [value, setValue] = useState('overview');
  return <Tab options={twoOptions} value={value} onValueChange={setValue} />;
}
export const Basic: Story = { render: () => <BasicDemo /> };

/** items: 2〜6（doc Property一覧、6が上限）。2026-09-10: 上限の6件で表示するよう変更 */
function ItemsCountDemo() {
  const [value, setValue] = useState('a');
  const options = [
    { value: 'a', label: 'Tab A' }, { value: 'b', label: 'Tab B' },
    { value: 'c', label: 'Tab C' }, { value: 'd', label: 'Tab D' },
    { value: 'e', label: 'Tab E' }, { value: 'f', label: 'Tab F' },
  ];
  return <Tab options={options} value={value} onValueChange={setValue} />;
}
export const ItemsCount: Story = { render: () => <ItemsCountDemo /> };

/** size: md(高さ40px) / sm(高さ32px)（doc Property一覧）。文字サイズ自体は両方14pxで共通、違いは高さと横paddingのみ */
function SizesDemo() {
  const [value, setValue] = useState('overview');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>size=md（高さ40px・横padding16px）</span>
        <Tab options={twoOptions} value={value} onValueChange={setValue} size="md" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>size=sm（高さ32px・横padding12px）</span>
        <Tab options={twoOptions} value={value} onValueChange={setValue} size="sm" />
      </div>
    </div>
  );
}
export const Sizes: Story = { render: () => <SizesDemo /> };

/** state: disabled（doc Property一覧） */
function DisabledDemo() {
  const [value, setValue] = useState('overview');
  const options = [{ value: 'overview', label: 'Overview' }, { value: 'settings', label: 'Settings', disabled: true }];
  return <Tab options={options} value={value} onValueChange={setValue} />;
}
export const DisabledOption: Story = { render: () => <DisabledDemo /> };

/** content: text only / icon before / icon only（ユーザー追加要件、旧docには未記載）。
    3種類を同一tablist内に混在させると「混ぜて使うもの」に見えて誤解を招くため、
    それぞれ独立したTabとして分けて提示する */
function ContentVariantsDemo() {
  const gear = <Placeholder size={16} />;
  const [textValue, setTextValue] = useState('overview');
  const [iconBeforeValue, setIconBeforeValue] = useState('overview');
  const [iconOnlyValue, setIconOnlyValue] = useState('overview');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>text only</span>
        <Tab
          options={[{ value: 'overview', label: 'Overview' }, { value: 'settings', label: 'Settings' }]}
          value={textValue} onValueChange={setTextValue}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>icon before</span>
        <Tab
          options={[{ value: 'overview', label: 'Overview', icon: gear }, { value: 'settings', label: 'Settings', icon: gear }]}
          value={iconBeforeValue} onValueChange={setIconBeforeValue}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ fontSize: 12, color: '#75808c' }}>icon only</span>
        <Tab
          options={[{ value: 'overview', icon: gear, iconLabel: 'Overview' }, { value: 'settings', icon: gear, iconLabel: 'Settings' }]}
          value={iconOnlyValue} onValueChange={setIconOnlyValue}
        />
      </div>
    </div>
  );
}
export const ContentVariants: Story = { render: () => <ContentVariantsDemo /> };
