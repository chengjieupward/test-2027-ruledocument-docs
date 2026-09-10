import type { ElementType, ReactNode } from 'react';

/**
 * Typography (Heading / Body / Stat)
 * Source: `foundations-color-typography.md` (doc-only, no Figma access).
 * Heading: Medium weight only, always single-line + ellipsis (doc's Resizing
 * spec: width Fixed + maxLines 1). Body: Regular/Bold, wraps (Resizing: Hug,
 * no truncation). Stat: SF Pro Rounded, no weight variant, Hug x Hug sizing.
 *
 * 2026-09-10 doc revision applied (user-confirmed):
 * - Heading/Body/Stat now reference the shared typography tokens in
 *   uds-tokens.css (font-family/font-size/line-height per scale+size),
 *   instead of hardcoding those numbers locally -- this was a known
 *   technical-debt item flagged back when Button first introduced
 *   `--typography-body-md-*` (previously named `-md-regular-`, renamed here
 *   since Body's size/line-height don't actually vary by weight)
 * - Heading/Body default to their doc-specified fixed width (240px / 160px),
 *   but now accept `width="fill"` to instead size to the parent container --
 *   some usages need the fixed doc default, others need to adapt to layout
 */

export type HeadingSize = '2xl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type BodySize = 'lg' | 'md' | 'sm' | 'xs';
export type BodyWeight = 'regular' | 'bold';
export type StatSize = 'lg' | 'md';
export type TypographyWidth = 'fixed' | 'fill';

const headingVars = (size: HeadingSize) => ({
  fontFamily: 'var(--typography-font-family)',
  fontWeight: 'var(--typography-heading-font-weight)',
  fontSize: `var(--typography-heading-${size}-font-size)`,
  lineHeight: `var(--typography-heading-${size}-line-height)`,
});
const bodyVars = (size: BodySize) => ({
  fontFamily: 'var(--typography-font-family)',
  fontSize: `var(--typography-body-${size}-font-size)`,
  lineHeight: `var(--typography-body-${size}-line-height)`,
});
const statVars = (size: StatSize) => ({
  fontFamily: 'var(--typography-stat-font-family)',
  fontSize: `var(--typography-stat-${size}-font-size)`,
  lineHeight: `var(--typography-stat-${size}-line-height)`,
});

export interface HeadingProps {
  size?: HeadingSize;
  /** 'fixed' (default, doc's 240px) or 'fill' (adapts to the parent container). */
  width?: TypographyWidth;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}
export function Heading({ size = 'md', width = 'fixed', as: Tag = 'h2', children, className }: HeadingProps) {
  return (
    <Tag
      className={['truncate text-(--color-foreground-default)', width === 'fixed' ? 'w-60' : 'w-full', className].filter(Boolean).join(' ')}
      style={headingVars(size)}
    >
      {children}
    </Tag>
  );
}

export interface BodyProps {
  size?: BodySize;
  weight?: BodyWeight;
  /** 'fixed' (default, doc's 160px) or 'fill' (adapts to the parent container). */
  width?: TypographyWidth;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}
export function Body({ size = 'md', weight = 'regular', width = 'fixed', as: Tag = 'p', children, className }: BodyProps) {
  return (
    <Tag
      className={[
        weight === 'bold' ? 'font-bold' : 'font-normal',
        'text-(--color-foreground-default)',
        width === 'fixed' ? 'w-40' : 'w-full',
        className,
      ].filter(Boolean).join(' ')}
      style={bodyVars(size)}
    >
      {children}
    </Tag>
  );
}

export interface StatProps { size?: StatSize; as?: ElementType; children: ReactNode; className?: string; }
export function Stat({ size = 'lg', as: Tag = 'span', children, className }: StatProps) {
  return (
    <Tag className={['text-(--color-foreground-default)', className].filter(Boolean).join(' ')} style={statVars(size)}>
      {children}
    </Tag>
  );
}

export default { Heading, Body, Stat };
