import type { ReactNode } from 'react';

/**
 * Tab
 * Source: `components/tab.md` (doc-only, no Figma access).
 * Selected state: 2px accent underline + bold text, per doc Anatomy. Distinct
 * from SegmentedControl (page/section navigation vs. same-screen view switch).
 */

export type TabSize = 'md' | 'sm';

export interface TabOption<T extends string = string> {
  value: T;
  label: ReactNode;
  disabled?: boolean;
}

export interface TabProps<T extends string = string> {
  options: TabOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  size?: TabSize;
  className?: string;
}

export function Tab<T extends string = string>({ options, value, onValueChange, size = 'md', className }: TabProps<T>) {
  const height = size === 'md' ? 40 : 32;
  const paddingX = size === 'md' ? 16 : 12;
  return (
    <div role="tablist" className={['flex', className].filter(Boolean).join(' ')} style={{ height }}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button key={option.value} type="button" role="tab" aria-selected={selected} disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className={[
              'flex items-center justify-center border-b text-sm leading-5',
              'disabled:pointer-events-none disabled:opacity-50',
              selected ? 'border-b-2 border-(--color-border-accent) font-bold text-(--color-foreground-default)' : 'border-(--color-border-normal) font-normal text-(--color-foreground-default)',
            ].join(' ')}
            style={{ height, paddingInline: paddingX }}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default Tab;
