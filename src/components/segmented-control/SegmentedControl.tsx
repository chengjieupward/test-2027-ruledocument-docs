import type { ReactNode } from 'react';

/**
 * SegmentedControl
 * Source: `components/segmented-control.md` (doc-only, no Figma access).
 * Inner selected chip radius is always outer radius - 2px (doc's measured
 * table, confirmed consistent across all size/radius combos).
 * Used for "switching views in the same screen", distinct from Tab (navigation).
 *
 * 2026-09-10 doc revision applied:
 * - horizontal padding is a uniform 16px (`px-4`) for both selected and
 *   unselected -- user-confirmed final decision, overriding the doc's
 *   earlier claim that selected uses 12px. Keeping both states at the same
 *   padding is what actually guarantees the label's position never shifts
 *   when toggling selection (differing padding was the root cause of a
 *   width/jitter bug -- see below)
 * - the outer container's own 2px padding (`p-0.5`, wrapping the whole row
 *   of buttons) stays constant regardless of any button's state -- this was
 *   already correct, just reconfirmed
 * - added a real `:focus-visible` ring (using the same
 *   `--color-system-focus-ring` token every other component uses), instead
 *   of leaving the browser's default focus outline in place -- that default
 *   outline was rendering as an unstyled black line on click/focus
 * - selected's border is drawn as an inset `box-shadow`, not a real CSS
 *   `border` -- a real border participates in the box model and shrinks the
 *   available content height by its own width, so toggling selected on/off
 *   shifted the text's vertical centering by a pixel or two (the same class
 *   of jitter bug found in Tab's underline). box-shadow is paint-only and
 *   doesn't affect layout, so the text never moves when selection changes
 * - each button also keeps `min-w-0` alongside `flex-1` as a defensive
 *   measure: flex items default to `min-width: auto`, which floors their
 *   width at their own content's min-content size, and would skew the
 *   equal-share split if padding or content ever differs between buttons
 *   again in the future
 * - items capped at 6, matching Tab's rule (user-confirmed); dev-only
 *   console.warn if more are passed
 * - content supports 3 variants, same as Tag/Tab (user-provided, not in the
 *   original doc): text only / icon before (icon + label) / icon only (icon,
 *   no label -- requires `iconLabel` for accessibility)
 */

export type SegmentedControlSize = 'md' | 'sm';
export type SegmentedControlRadius = 'default' | 'full';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  /** Text label. Omit for an icon-only segment (must pass `icon` + `iconLabel` in that case). */
  label?: ReactNode;
  /** Optional icon, rendered before the label ("icon before"). With no `label`, renders as icon-only. */
  icon?: ReactNode;
  /** Accessible name, required when there's no visible text label (icon-only). */
  iconLabel?: string;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  size?: SegmentedControlSize;
  radius?: SegmentedControlRadius;
  className?: string;
}

const OUTER_RADIUS: Record<SegmentedControlSize, Record<SegmentedControlRadius, number>> = {
  md: { default: 12, full: 20 },
  sm: { default: 12, full: 16 },
};

export function SegmentedControl<T extends string = string>({
  options, value, onValueChange, size = 'md', radius = 'default', className,
}: SegmentedControlProps<T>) {
  if (import.meta.env?.DEV && options.length > 6) {
    console.warn(`SegmentedControl: items are capped at 6 (same rule as Tab); received ${options.length}.`);
  }
  const height = size === 'md' ? 40 : 32;
  return (
    <div role="tablist" className={['flex bg-(--color-surface-tint) p-0.5', className].filter(Boolean).join(' ')} style={{ height, borderRadius: OUTER_RADIUS[size][radius] }}>
      {options.map((option) => {
        const selected = option.value === value;
        const iconOnly = Boolean(option.icon) && !option.label;
        return (
          <button key={option.value} type="button" role="tab" aria-selected={selected}
            aria-label={iconOnly ? option.iconLabel : undefined}
            disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className={[
              'flex flex-1 min-w-0 items-center justify-center gap-2 px-4 text-sm leading-5 outline-none transition-colors',
              'focus-visible:ring-2 focus-visible:ring-(--color-system-focus-ring) focus-visible:ring-offset-1',
              'disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'bg-(--color-surface-default) shadow-[inset_0_0_0_1px_var(--color-border-soft)] text-(--color-foreground-default)'
                : 'text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint)',
            ].join(' ')}
            style={{ borderRadius: OUTER_RADIUS[size][radius] - 2 }}
          >
            {option.icon}
            {option.label && <span className="truncate">{option.label}</span>}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
