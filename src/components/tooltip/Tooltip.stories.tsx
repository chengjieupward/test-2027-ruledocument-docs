import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Feedback/Tooltip', component: Tooltip, tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonClass = 'rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm';

export const Basic: Story = {
  render: () => (
    <Tooltip content="Tooltip text">
      <button type="button" className={buttonClass}>Hover me</button>
    </Tooltip>
  ),
};

/** 四个方向：top / bottom / left / right（本组件实现范围内新增的定位能力） */
export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 48, padding: 40 }}>
      <Tooltip content="Top" side="top"><button type="button" className={buttonClass}>Top</button></Tooltip>
      <Tooltip content="Bottom" side="bottom"><button type="button" className={buttonClass}>Bottom</button></Tooltip>
      <Tooltip content="Left" side="left"><button type="button" className={buttonClass}>Left</button></Tooltip>
      <Tooltip content="Right" side="right"><button type="button" className={buttonClass}>Right</button></Tooltip>
    </div>
  ),
};

/** 超过 240px 最大宽度时自动换行（doc「更新履歴」TT-01） */
export const LongText: Story = {
  render: () => (
    <Tooltip content="This is a fairly long tooltip message. Once it exceeds the 240px max width, it wraps automatically.">
      <button type="button" className={buttonClass}>Hover for long text</button>
    </Tooltip>
  ),
};
