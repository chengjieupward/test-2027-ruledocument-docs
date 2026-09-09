import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * TextField
 * Source: `components/text-field.md` (doc-only, no Figma access).
 * Doc explicitly notes: no stepper, unlike number-field -- that's the
 * distinguishing feature of this simplest form field.
 *
 * 2026-09-09 doc revision applied:
 * - description color is `color/foreground/muted`, not `-subtle` -- aligned
 *   with the same token every other component's description uses (Avatar,
 *   Switch, Checkbox, RadioButton, SelectField, TextareaField), even though
 *   this doc had explicitly written `-subtle` (confirmed by user to be wrong)
 * - labelPosition="left" label has its own 10px right padding (`pr-2.5`), in
 *   addition to (not instead of) the existing 16px gap between label and
 *   field -- the two stack, they aren't the same measurement recorded twice
 */

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function TextField({
  label, labelPosition = 'top', description, error = false, errorMessage, disabled = false, readOnly = false,
  value, onValueChange, placeholder = 'placeholder', id, className, ...rest
}: TextFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex items-center rounded-xl border px-3',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <input id={inputId} type="text" value={value} disabled={disabled} readOnly={readOnly} placeholder={placeholder}
          onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
          {...rest} />
      </div>
      {error && errorMessage && <p className="pt-1 text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>}
    </div>
  );

  if (isLeft) {
    return (
      <div className={['flex items-start gap-4', className].filter(Boolean).join(' ')}>
        {label && <label htmlFor={inputId} className="w-60 shrink-0 pt-2.5 pr-2.5 text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
        {field}
      </div>
    );
  }
  return (
    <div className={['flex w-80 flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {label && (
        <div className="flex flex-col gap-0.5">
          <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>
          {description && <p className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</p>}
        </div>
      )}
      {field}
    </div>
  );
}

export default TextField;
