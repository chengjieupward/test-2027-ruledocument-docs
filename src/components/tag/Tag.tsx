import { XCircle } from '@phosphor-icons/react';

/**
 * Tag
 * Source: `components/tag.md` (doc-only, no Figma access).
 * Status colors (green/orange/red/natural) carry fixed business meaning per
 * tag.md Rules; blue/purple/teal are free-form category colors.
 *
 * 2026-09-09 doc revision applied (user-confirmed against a real Figma
 * reference screenshot):
 * - close button is a real inner-button (button.md, size=sm), fixed to 22px
 *   to match the tag's own height exactly -- it does not overflow
 * - uses the actual desktop-icon/x-circle glyph (Phosphor `XCircle`,
 *   weight="fill"), size md=20px per icon.md, instead of manually
 *   compositing a div circle + a separate X icon on top of it
 * - fill=true tags: white x-circle (reads clearly against the colored bg).
 *   fill=false (tint) tags: accent-color x-circle (unchanged intent from the
 *   original doc, now expressed as a single-color icon glyph rather than a
 *   two-tone circle+icon composite)
 * - gap between label and the inner-button is 8px
 */

export type TagColor = 'green' | 'orange' | 'red' | 'natural' | 'blue' | 'purple' | 'teal';

export interface TagProps {
  color?: TagColor;
  fill?: boolean;
  label: string;
  onClose?: () => void;
  className?: string;
}

const FILL_STYLE: Record<TagColor, string> = {
  green: 'bg-(--color-feedback-progress-upcoming) text-white',
  orange: 'bg-(--color-feedback-progress-active) text-white',
  red: 'bg-(--color-feedback-progress-delayed) text-white',
  natural: 'bg-(--color-feedback-progress-completed) text-white',
  blue: 'bg-(--color-blue-60) text-white',
  purple: 'bg-(--color-purple-60) text-white',
  teal: 'bg-(--color-teal-60) text-white',
};

const TINT_STYLE: Record<TagColor, string> = {
  green: 'bg-[rgba(34,197,94,0.1)] text-(--color-green-50)',
  orange: 'bg-[rgba(255,151,12,0.1)] text-(--color-orange-50)',
  red: 'bg-[rgba(244,76,77,0.1)] text-(--color-red-50)',
  natural: 'bg-(--color-surface-transparent-tint) text-(--color-foreground-muted)',
  blue: 'bg-[rgba(52,145,255,0.1)] text-(--color-blue-50)',
  purple: 'bg-[rgba(169,122,255,0.1)] text-(--color-purple-50)',
  teal: 'bg-[rgba(24,217,220,0.1)] text-(--color-teal-50)',
};

// x-circle icon color for fill=false (tint) tags -- accent color per tag color.
const ACCENT_COLOR_VAR: Record<TagColor, string> = {
  green: 'var(--color-feedback-progress-upcoming)',
  orange: 'var(--color-feedback-progress-active)',
  red: 'var(--color-feedback-progress-delayed)',
  natural: 'var(--color-feedback-progress-completed)',
  blue: 'var(--color-blue-60)',
  purple: 'var(--color-purple-60)',
  teal: 'var(--color-teal-60)',
};

export function Tag({ color = 'green', fill = true, label, onClose, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex h-[22px] items-center gap-0.5 rounded-full pl-2 text-xs leading-[18px] whitespace-nowrap',
        onClose ? 'pr-0' : 'pr-2',
        fill ? FILL_STYLE[color] : TINT_STYLE[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="max-w-[8em] truncate">{label}</span>
      {onClose && (
        // inner-button, size=sm, fixed to 22px to match the tag's own height
        // exactly. Icon: desktop-icon/x-circle, md=20px (icon.md).
        <button
          type="button"
          onClick={onClose}
          aria-label="Remove"
          className="flex size-[22px] shrink-0 items-center justify-center rounded-full hover:brightness-90"
        >
          <XCircle size={20} weight="fill" color={fill ? 'white' : ACCENT_COLOR_VAR[color]} />
        </button>
      )}
    </span>
  );
}

export default Tag;
