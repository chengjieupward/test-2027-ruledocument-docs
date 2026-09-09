import { useId, useState, type ReactNode } from 'react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

/**
 * PasswordField
 * Source: `components/password-field.md` (doc-only, no Figma access).
 * ⚠️ Doc explicitly flags: the eye-slash icon's node-id was never confirmed
 * (only the placeholder/masked frame was measured). Using Phosphor's EyeSlash
 * here is a reasonable icon-set choice, not a verified match to the design.
 *
 * 2026-09-09 doc revision applied (user-confirmed):
 * - the doc's asymmetric input padding-right is real, not a Figma mistake:
 *   top layout uses 10px when error, 6px otherwise; left layout is always 6px
 *   regardless of error
 * - content width is NOT fixed to the doc's old "300px" figure -- confirmed
 *   flexible, same resolution as the analogous width questions in other
 *   form fields (SelectField/TextareaField/NumberField/DateField)
 * - added description support (top layout only, matching the sibling form
 *   fields), color `color/foreground/muted`
 */

export interface PasswordFieldProps {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
}

export function PasswordField({
  label, labelPosition = 'top', description, error = false, errorMessage, disabled = false, readOnly = false,
  value, onValueChange, placeholder = 'placeholder', id, name, className,
}: PasswordFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';
  const [visible, setVisible] = useState(false);

  // Doc's asymmetric padding-right: top layout differs by error state,
  // left layout is always the smaller (6px) value regardless of error.
  const paddingRightClass = !isLeft && error ? 'pr-2.5' : 'pr-1.5';

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex items-center gap-2 rounded-xl border pl-3',
        paddingRightClass,
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <input
          id={inputId} name={name} type={visible ? 'text' : 'password'} value={value} disabled={disabled} readOnly={readOnly}
          placeholder={placeholder} onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
        />
        <button type="button" onClick={() => setVisible((v) => !v)} disabled={disabled}
          aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible}
          className="flex size-8 shrink-0 items-center justify-center rounded-2xl disabled:cursor-default">
          {visible ? <EyeSlash size={20} color="var(--color-foreground-default)" /> : <Eye size={20} color="var(--color-foreground-default)" />}
        </button>
      </div>
      {error && errorMessage && <p className="pt-1 text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>}
    </div>
  );

  if (isLeft) {
    return (
      <div className={['flex items-start gap-4', className].filter(Boolean).join(' ')}>
        {label && <label htmlFor={inputId} className="w-60 shrink-0 pt-2.5 text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
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

export default PasswordField;
