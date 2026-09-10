import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading, Body, Stat } from './Typography';

const meta = { title: 'Foundations/Typography', tags: ['autodocs'], parameters: { layout: 'padded' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

/** 全6サイズ（doc: foundations-color-typography.md「スケール構成」表） */
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

/** 全8組み合わせ：4サイズ × 2ウェイト（doc同上表） */
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

/** 全2サイズ（doc同上表：Number display は size のみ、字重の分岐なし） */
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

/** width: "fixed"（doc既定値：Heading 240px / Body 160px） / "fill"（親コンテナに合わせる、ユーザー要件） */
export const Width: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 400 }}>
      <div>
        <span style={{ fontSize: 12, color: '#75808c' }}>Heading, width="fixed"（240px）</span>
        <Heading size="md" width="fixed">Fixed width heading</Heading>
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#75808c' }}>Heading, width="fill"（親コンテナの幅いっぱい）</span>
        <Heading size="md" width="fill">Fill width heading</Heading>
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#75808c' }}>Body, width="fixed"（160px）</span>
        <Body size="md" width="fixed">Fixed width body text that wraps within 160px.</Body>
      </div>
      <div>
        <span style={{ fontSize: 12, color: '#75808c' }}>Body, width="fill"（親コンテナの幅いっぱい）</span>
        <Body size="md" width="fill">Fill width body text that wraps within the full container width.</Body>
      </div>
    </div>
  ),
};
