import type { ElementType, ReactNode } from 'react';

/**
 * Typography (Heading / Body / Stat)
 * Source: `foundations-color-typography.md` (doc-only, no Figma access).
 * Heading: Medium weight only, always single-line + ellipsis (doc's Resizing
 * spec: width Fixed + maxLines 1). Body: Regular/Bold, wraps (Resizing: Hug,
 * no truncation). Stat: SF Pro Rounded, no weight variant, Hug x Hug sizing.
 */

export type HeadingSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BodySize = 'lg' | 'md' | 'sm' | 'xs';
export type BodyWeight = 'regular' | 'bold';
export type StatSize = 'lg' | 'md';

const HEADING_STYLE: Record<HeadingSize, { fontSize: number; lineHeight: number }> = {
  '2xl': { fontSize: 27, lineHeight: 32 }, xl: { fontSize: 22, lineHeight: 28 },
  lg: { fontSize: 19, lineHeight: 24 }, md: { fontSize: 16, lineHeight: 22 },
  sm: { fontSize: 14, lineHeight: 20 }, xs: { fontSize: 12, lineHeight: 18 },
};
const BODY_STYLE: Record<BodySize, { fontSize: number; lineHeight: number }> = {
  lg: { fontSize: 16, lineHeight: 22 }, md: { fontSize: 14, lineHeight: 20 },
  sm: { fontSize: 12, lineHeight: 18 }, xs: { fontSize: 11, lineHeight: 15 },
};
const STAT_STYLE: Record<StatSize, { fontSize: number; lineHeight: number }> = {
  lg: { fontSize: 27, lineHeight: 32 }, md: { fontSize: 22, lineHeight: 28 },
};

export interface HeadingProps { size?: HeadingSize; as?: ElementType; children: ReactNode; className?: string; }
export function Heading({ size = 'md', as: Tag = 'h2', children, className }: HeadingProps) {
  const { fontSize, lineHeight } = HEADING_STYLE[size];
  return <Tag className={['truncate font-medium text-(--color-foreground-default)', className].filter(Boolean).join(' ')} style={{ fontSize, lineHeight: `${lineHeight}px` }}>{children}</Tag>;
}

export interface BodyProps { size?: BodySize; weight?: BodyWeight; as?: ElementType; children: ReactNode; className?: string; }
export function Body({ size = 'md', weight = 'regular', as: Tag = 'p', children, className }: BodyProps) {
  const { fontSize, lineHeight } = BODY_STYLE[size];
  return <Tag className={[weight === 'bold' ? 'font-bold' : 'font-normal', 'text-(--color-foreground-default)', className].filter(Boolean).join(' ')} style={{ fontSize, lineHeight: `${lineHeight}px` }}>{children}</Tag>;
}

export interface StatProps { size?: StatSize; as?: ElementType; children: ReactNode; className?: string; }
export function Stat({ size = 'lg', as: Tag = 'span', children, className }: StatProps) {
  const { fontSize, lineHeight } = STAT_STYLE[size];
  return <Tag className={['text-(--color-foreground-default)', className].filter(Boolean).join(' ')} style={{ fontSize, lineHeight: `${lineHeight}px`, fontFamily: '"SF Pro Rounded", ui-rounded, sans-serif' }}>{children}</Tag>;
}

export default { Heading, Body, Stat };
