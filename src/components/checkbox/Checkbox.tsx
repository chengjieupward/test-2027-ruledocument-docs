import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Checkbox (checkbox-with-label)
 * Source: `components/checkbox.md` (doc-only, no Figma access).
 * State colors from the doc's "checkbox-mark State別カラー" table:
 * unchecked/default: white bg + #d2dce3 border (or #f44c4d if error);
 * unchecked/disabled: #e4ecf2 bg; checked: #0070FA bg (icon-based, not stroke).
 * indeterminate set via ref+useEffect since it's a DOM property, not a JSX attr
 * (per the doc's own implementation note).
 */

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange' | 'size'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  label: ReactNode;
  description?: ReactNode;
  error?: boolean;
  labelPosition?: 'left' | 'right';
}

export function Checkbox({
  checked = false,
  onCheckedChange,
  label,
  description,
  error = false,
  disabled = false,
  labelPosition = 'right',
  id,
  className,
  ...rest
}: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const inputRef = useRef<HTMLInputElement>(null);
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = checked === true;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  let boxClass: string;
  if (isChecked || isIndeterminate) {
    boxClass = error
      ? 'bg-(--color-border-danger) border-(--color-border-danger)'
      : 'bg-(--color-button-primary-default) border-(--color-button-primary-default)';
  } else {
    boxClass = [
      error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
      disabled ? 'bg-(--color-surface-shade)' : 'bg-(--color-surface-default)',
    ].join(' ');
  }

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex items-start py-1.5',
        labelPosition === 'right' ? 'flex-row gap-2' : 'flex-row-reverse gap-4',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <input
          ref={inputRef}
          id={inputId}
          type="checkbox"
          checked={isChecked}
          disabled={disabled}
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
          {...rest}
        />
        <span
          aria-hidden="true"
          className={[
            'pointer-events-none flex size-4 items-center justify-center rounded-xs border',
            'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-system-focus-ring) peer-focus-visible:ring-offset-1',
            boxClass,
          ].join(' ')}
        >
          {isChecked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6.2l2.6 2.6L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {isIndeterminate && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2.5 6h7" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </span>
      </span>
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>
        {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
      </span>
    </label>
  );
}

export default Checkbox;
