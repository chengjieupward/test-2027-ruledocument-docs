import type { ReactNode } from 'react';

/**
 * SegmentedControl
 * Source: `components/segmented-control.md` (doc-only, no Figma access).
 * Inner selected chip radius is always outer radius - 2px (doc's measured
 * table, confirmed consistent across all size/radius combos).
 * Used for "switching views in the same screen", distinct from Tab (navigation).
 */

export type SegmentedControlSize = 'md' | 'sm';
export type SegmentedControlRadius = 'default' | 'full';

export interface SegmentedControlOption<T extends string = string> {
  value: T;
  label: ReactNode;
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
  const height = size === 'md' ? 40 : 32;
  return (
    <div role="tablist" className={['flex bg-(--color-surface-tint) p-0.5', className].filter(Boolean).join(' ')} style={{ height, borderRadius: OUTER_RADIUS[size][radius] }}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button key={option.value} type="button" role="tab" aria-selected={selected} disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className={[
              'flex flex-1 items-center justify-center px-4 text-sm leading-5 transition-colors',
              'disabled:pointer-events-none disabled:opacity-50',
              selected
                ? 'bg-(--color-surface-default) border border-(--color-border-soft) text-(--color-foreground-default)'
                : 'text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint)',
            ].join(' ')}
            style={{ borderRadius: OUTER_RADIUS[size][radius] - 2 }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
