import { User } from '@phosphor-icons/react';
import type { ImgHTMLAttributes } from 'react';

/**
 * Avatar
 * Source: `components/avatar.md` (doc-only, no Figma access).
 * Doc explicitly notes Show status/Status props do NOT actually exist on the
 * component (confirmed false lead in the Figma description) -- so this
 * implementation intentionally has no status props.
 * radius=full always half the height: sm 24px->12px, md 32px->16px, lg 40px->20px.
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
      {type === 'icon' && <User size={ICON_SIZE_PX[size]} color="var(--color-foreground-muted)" weight="fill" />}
      {type === 'letter' && (
        <span style={{ fontSize: LETTER_FONT_SIZE_PX[size], color: 'var(--avatar-letter-text)', fontWeight: 500, lineHeight: 1 }}>
          {letter?.slice(0, 1).toUpperCase()}
        </span>
      )}
      {type === 'image' && <img src={imageSrc} alt={imageAlt} className="absolute inset-0 h-full w-full object-cover" />}
    </div>
  );
}

export default Avatar;
