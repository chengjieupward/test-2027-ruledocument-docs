import { CaretDown, Check, X } from '@phosphor-icons/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';

const GLYPHS = { 'caret-down': <CaretDown />, check: <Check />, x: <X /> } as const;
type GlyphName = keyof typeof GLYPHS;

const meta = {
  title: 'Foundations/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = { args: { size: 'sm', children: <CaretDown /> } };

export const PickAGlyph: StoryObj<{ glyph: GlyphName; size: 'sm' | 'md' | 'lg' | 'xl' }> = {
  argTypes: {
    glyph: { control: 'select', options: Object.keys(GLYPHS) },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
  },
  args: { glyph: 'caret-down', size: 'md' },
  render: ({ glyph, size }) => <Icon size={size}>{GLYPHS[glyph]}</Icon>,
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Icon size="sm"><CaretDown /></Icon>
      <Icon size="md"><CaretDown /></Icon>
      <Icon size="lg"><CaretDown /></Icon>
      <Icon size="xl"><CaretDown /></Icon>
    </div>
  ),
};
