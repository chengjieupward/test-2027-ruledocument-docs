import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Body, Stat } from './Typography';

const meta = { title: 'Foundations/Typography', tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** 全6种尺寸（doc: foundations-color-typography.md「スケール構成」表） */
export const HeadingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Heading size="2xl">Heading 2xl</Heading>
      <Heading size="xl">Heading xl</Heading>
      <Heading size="lg">Heading lg</Heading>
      <Heading size="md">Heading md</Heading>
      <Heading size="sm">Heading sm</Heading>
      <Heading size="xs">Heading xs</Heading>
    </div>
  ),
};

/** 全8种组合：4个尺寸 × 2种字重（doc同上表） */
export const BodySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Body size="lg" weight="regular">Body lg regular</Body>
      <Body size="lg" weight="bold">Body lg bold</Body>
      <Body size="md" weight="regular">Body md regular</Body>
      <Body size="md" weight="bold">Body md bold</Body>
      <Body size="sm" weight="regular">Body sm regular</Body>
      <Body size="sm" weight="bold">Body sm bold</Body>
      <Body size="xs" weight="regular">Body xs regular</Body>
      <Body size="xs" weight="bold">Body xs bold</Body>
    </div>
  ),
};

/** 全2种尺寸（doc同上表：Number display は size のみ、字重の分岐なし） */
export const StatSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
      <Stat size="lg">128</Stat>
      <Stat size="md">42%</Stat>
    </div>
  ),
};

/** Heading は常に単行省略、Body は折り返し可（doc「コンテナ仕様」の違い） */
export const HeadingTruncates: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Heading size="md">This is a very very very long heading used to demonstrate single-line truncation with an ellipsis</Heading>
    </div>
  ),
};
