import type { ReactNode } from 'react';

/**
 * CheckboxGroup
 * Source: `components/checkbox.md`'s "checkbox-group" section (doc-only, no
 * Figma access). This is a layout wrapper: pass pre-configured `<Checkbox
 * labelPosition="right" .../>` elements as children (the doc states the list
 * itself is always labelPosition="right"; only checkbox-with-label used on
 * its own ever uses labelPosition="left").
 *
 * Two layouts per the doc:
 * - labelPosition="top": flex-col, gap 10px between the group label and the
 *   list, group width 240px, label column width 200px (gap 2px between label
 *   text and description)
 * - labelPosition="left": flex-row, gap 16px between the label column and the
 *   list, label column width 240px (note: different from top's 200px), label
 *   column padding 6px 0 so its top lines up with the first checkbox item's
 *   top (each Checkbox already has the same 6px vertical padding, so no extra
 *   alignment offset is needed here, unlike Switch)
 *
 * No extra gap between stacked checkbox-with-label rows: each row's own
 * 6px vertical padding stacks to create the visual 12px gap, per the doc.
 */

export interface CheckboxGroupProps {
  label?: ReactNode;
  description?: ReactNode;
  labelPosition?: 'top' | 'left';
  children: ReactNode;
  className?: string;
}

export function CheckboxGroup({ label, description, labelPosition = 'top', children, className }: CheckboxGroupProps) {
  const hasLabel = Boolean(label || description);

  if (labelPosition === 'left') {
    return (
      <div className={['flex flex-row items-start gap-4', className].filter(Boolean).join(' ')}>
        {hasLabel && (
          <div className="flex w-60 shrink-0 flex-col gap-0.5 py-1.5">
            {label && <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>}
            {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-0">{children}</div>
      </div>
    );
  }

  // labelPosition="top"
  return (
    <div className={['flex w-60 flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {hasLabel && (
        <div className="flex w-[200px] flex-col gap-0.5">
          {label && <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>}
          {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
        </div>
      )}
      <div className="flex flex-col gap-0">{children}</div>
    </div>
  );
}

export default CheckboxGroup;
