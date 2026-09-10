import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';

/**
 * Icon
 * Source: `components/icon.md` (doc-only, no Figma access).
 * icon.md's "desktop-icon仕様" table: sm 16px / md 20px / lg 24px / xl 28px,
 * Weight fill/bold/regular, Color color/foreground/default or
 * color/button/primary/default. The doc's caret-down entry references keywords
 * (chevron, directional, pointer...) matching Phosphor Icons' naming exactly,
 * so @phosphor-icons/react is used as the icon set here.
 *
 * 2026-09-10 doc revision applied (user-confirmed):
 * - added an explicit `weight` prop (fill/bold/regular, doc's 3rd desktop-icon
 *   axis), forwarded to the cloned child glyph. Previously weight had no
 *   dedicated prop on Icon itself -- it only worked if the consumer set it
 *   directly on the glyph element passed as `children`, which was
 *   inconsistent with how `size`/`color` are centrally managed here
 */

export type IconSize = 'sm' | 'md' | 'lg' | 'xl';
export type IconWeight = 'fill' | 'bold' | 'regular';

const SIZE_PX: Record<IconSize, number> = { sm: 16, md: 20, lg: 24, xl: 28 };

export interface IconProps {
  size?: IconSize;
  weight?: IconWeight;
  color?: string;
  children: ReactNode;
  className?: string;
}

export function Icon({ size = 'sm', weight, color, children, className }: IconProps) {
  const px = SIZE_PX[size];
  const themedColor = color ?? 'var(--color-foreground-default)';
  const glyph = isValidElement(children)
    ? cloneElement(children as ReactElement<{ size?: number; color?: string; weight?: IconWeight }>, {
        size: px,
        color: themedColor,
        ...(weight ? { weight } : {}),
      })
    : children;
  return (
    <span
      className={['inline-flex shrink-0 items-center justify-center', className].filter(Boolean).join(' ')}
      style={{ width: px, height: px, color: themedColor }}
    >
      {glyph}
    </span>
  );
}

export default Icon;
