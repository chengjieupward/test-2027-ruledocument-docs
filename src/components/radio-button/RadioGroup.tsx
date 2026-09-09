import type { ReactNode } from 'react';

/**
 * RadioGroup
 * Source: `components/radio-button.md`'s "radio-group" anatomy (doc-only, no
 * Figma access): label(top) gap 10px / label(left) gap 16px between the
 * group label and the option list. Same layout wrapper pattern as
 * CheckboxGroup -- pass pre-configured `<RadioButton name="..." .../>`
 * elements (sharing the same `name`) as children.
 */

export interface RadioGroupProps {
  label?: ReactNode;
  description?: ReactNode;
  labelPosition?: 'top' | 'left';
  children: ReactNode;
  className?: string;
}

export function RadioGroup({ label, description, labelPosition = 'top', children, className }: RadioGroupProps) {
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

export default RadioGroup;
