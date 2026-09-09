import { User } from '@phosphor-icons/react';
import type { ImgHTMLAttributes } from 'react';

/**
 * Avatar
 * Source: `components/avatar.md` (doc-only, no Figma access).
 * Doc explicitly notes Show status/Status props do NOT actually exist on the
 * component (confirmed false lead in the Figma description, re-confirmed
 * 2026-09-09) -- so this implementation intentionally has no status props.
 * radius=full always half the height: sm 24px->12px, md 32px->16px, lg 40px->20px.
 *
 * 2026-09-09 doc revision applied:
 * - icon glyph color is `color/foreground/default` (icon.md desktop-icon
 *   standard color), not `-muted` -- previous version guessed `-muted`
 *   because the doc didn't specify a token at the time
 * - image type overflows the border by -1px (`-inset-px`), it does not sit
 *   flush with `inset-0`
 * - icon glyph weight is `regular` (outline/line style), not `fill` (solid
 *   silhouette) -- confirmed by visually comparing the rendered Storybook
 *   icon against the Figma reference screenshot; previous version guessed
 *   `fill` because the doc didn't specify a weight at the time
 */

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarType = 'icon' | 'letter' | 'image';

export interface AvatarProps {
  size?: AvatarSize;
  type?: AvatarType;
  letter?: string;
  imageSrc?: string;
  imageAlt?: ImgHTMLAttributes<HTMLImageElement>['alt'];
  className?: string;
}

const SIZE_PX: Record<AvatarSize, number> = { sm: 24, md: 32, lg: 40 };
const RADIUS_PX: Record<AvatarSize, number> = { sm: 12, md: 16, lg: 20 };
// Avatar-specific reduced icon size (smaller than icon.md's standard desktop-icon
// sizes sm16/md20/lg24 -- avatar.md explicitly calls these out as scaled-down values).
const ICON_SIZE_PX: Record<AvatarSize, number> = { sm: 12, md: 16, lg: 20 };
const LETTER_FONT_SIZE_PX: Record<AvatarSize, number> = { sm: 11, md: 12, lg: 14 };

export function Avatar({ size = 'sm', type = 'icon', letter, imageSrc, imageAlt = '', className }: AvatarProps) {
  const px = SIZE_PX[size];
  const style: React.CSSProperties = {
    width: px,
    height: px,
    borderRadius: RADIUS_PX[size],
    borderColor: 'var(--color-border-soft)',
    backgroundColor:
      type === 'letter' ? 'var(--color-button-primary-default)' : type === 'icon' ? 'var(--avatar-icon-background)' : undefined,
  };
  return (
    <div
      className={['relative inline-flex items-center justify-center overflow-hidden shrink-0 border-[0.8px]', className].filter(Boolean).join(' ')}
      style={style}
    >
      {/* desktop-icon/user, color per icon.md desktop-icon standard: color/foreground/default, weight: regular (outline) */}
      {type === 'icon' && <User size={ICON_SIZE_PX[size]} color="var(--color-foreground-default)" weight="regular" />}
      {type === 'letter' && (
        <span style={{ fontSize: LETTER_FONT_SIZE_PX[size], color: 'var(--avatar-letter-text)', fontWeight: 500, lineHeight: 1 }}>
          {letter?.slice(0, 1).toUpperCase()}
        </span>
      )}
      {/* -1px overflow beyond the border so the image fully covers it (per avatar.md) */}
      {type === 'image' && <img src={imageSrc} alt={imageAlt} className="absolute -inset-px object-cover" />}
    </div>
  );
}

export default Avatar;
