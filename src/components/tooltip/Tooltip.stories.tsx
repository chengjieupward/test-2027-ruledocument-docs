import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Feedback/Tooltip', component: Tooltip, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

// 2026-09-10: trigger is a small icon (not styled-button text), still
// requires hover/focus to show the tooltip. Wrapped in a generously padded
// container so a "top"-positioned tooltip has room to render fully instead
// of getting clipped by the Storybook canvas edge.
const triggerClass = 'inline-flex cursor-default text-(--color-foreground-muted)';

export const Basic: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Tooltip text">
        <span className={triggerClass}><Info size={16} /></span>
      </Tooltip>
    </div>
  ),
};

/** 4方向：top / bottom / left / right（本コンポーネント実装範囲内で新規追加した配置機能） */
export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 64, padding: 80 }}>
      <Tooltip content="Top" side="top"><span className={triggerClass}><Info size={16} /></span></Tooltip>
      <Tooltip content="Bottom" side="bottom"><span className={triggerClass}><Info size={16} /></span></Tooltip>
      <Tooltip content="Left" side="left"><span className={triggerClass}><Info size={16} /></span></Tooltip>
      <Tooltip content="Right" side="right"><span className={triggerClass}><Info size={16} /></span></Tooltip>
    </div>
  ),
};

/** 240px の最大幅を超えると自動的に折り返す（doc「更新履歴」TT-01） */
export const LongText: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="This is a fairly long tooltip message. Once it exceeds the 240px max width, it wraps automatically.">
        <span className={triggerClass}><Info size={16} /></span>
      </Tooltip>
    </div>
  ),
};
