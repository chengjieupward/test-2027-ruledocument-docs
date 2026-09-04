import { useId, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * RadioButton
 * Source: `components/radio-button.md` (doc-only, no Figma access).
 * Doc explicitly corrects: selected ring color is color/border/accent (blue),
 * NOT color/border/normal (gray) -- an older version of the doc had this wrong.
 */

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label: ReactNode;
  error?: boolean;
  labelPosition?: 'left' | 'right';
}

export function RadioButton({ label, error = false, disabled = false, checked, labelPosition = 'right', id, className, ...rest }: RadioButtonProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  let ringClass: string;
  let dotClass = '';
  if (checked) {
    ringClass = error
      ? 'bg-(--color-surface-default) border-(--color-border-danger)'
      : 'bg-(--color-surface-default) border-(--color-border-accent)';
    dotClass = error ? 'bg-(--color-button-danger-default)' : 'bg-(--color-button-primary-default)';
  } else {
    ringClass = [
      error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
      disabled ? 'bg-(--color-surface-shade)' : 'bg-(--color-surface-default)',
    ].join(' ');
  }

  return (
    <label htmlFor={inputId} className={[
      'flex items-start py-1.5',
      labelPosition === 'right' ? 'flex-row gap-2' : 'flex-row-reverse gap-4',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      className,
    ].filter(Boolean).join(' ')}>
      <span className="relative flex size-4 shrink-0 items-center justify-center">
        <input id={inputId} type="radio" checked={checked} disabled={disabled}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed" {...rest} />
        <span aria-hidden="true" className={[
          'pointer-events-none flex size-4 items-center justify-center rounded-full border',
          'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-system-focus-ring) peer-focus-visible:ring-offset-1',
          ringClass,
        ].join(' ')}>
          {checked && <span className={['size-2 rounded-full', dotClass].join(' ')} />}
        </span>
      </span>
      <span className="flex-1 text-sm leading-5 text-(--color-foreground-default)">{label}</span>
    </label>
  );
}

export default RadioButton;
