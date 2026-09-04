import { X } from '@phosphor-icons/react';

/**
 * Tag
 * Source: `components/tag.md` (doc-only, no Figma access).
 * Close button is an "x-circle" icon per the doc: solid circle + white X,
 * not a bare X. fill=true tags use a translucent white circle; fill=false
 * (tint) tags use a solid accent-color circle for contrast against the light bg.
 * Status colors (green/orange/red/natural) carry fixed business meaning per
 * tag.md Rules; blue/purple/teal are free-form category colors.
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

const CLOSE_CIRCLE_STYLE: Record<TagColor, string> = {
  green: 'bg-(--color-feedback-progress-upcoming)',
  orange: 'bg-(--color-feedback-progress-active)',
  red: 'bg-(--color-feedback-progress-delayed)',
  natural: 'bg-(--color-feedback-progress-completed)',
  blue: 'bg-(--color-blue-60)',
  purple: 'bg-(--color-purple-60)',
  teal: 'bg-(--color-teal-60)',
};

export function Tag({ color = 'green', fill = true, label, onClose, className }: TagProps) {
  return (
    <span
      className={[
        'inline-flex h-[22px] items-center gap-1 rounded-full pl-2 text-xs leading-[18px] whitespace-nowrap',
        onClose ? 'pr-1' : 'pr-2',
        fill ? FILL_STYLE[color] : TINT_STYLE[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="max-w-[8em] truncate">{label}</span>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Remove"
          className={['flex size-4 shrink-0 items-center justify-center rounded-full', fill ? 'bg-white/30' : CLOSE_CIRCLE_STYLE[color]].join(' ')}
        >
          <X size={10} color="white" weight="bold" />
        </button>
      )}
    </span>
  );
}

export default Tag;
