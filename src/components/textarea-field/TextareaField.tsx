import { useId, type TextareaHTMLAttributes, type ReactNode } from 'react';

/**
 * TextareaField
 * Source: `components/textarea-field.md` (doc-only, no Figma access).
 * ⚠️ Doc's own "実装上の注意" records a v1→v2→v3→v4 history of a previous
 * implementer (working WITH Figma access) failing three times to reproduce
 * the custom scrollbar-thumb/desktop-icon without visual duplication bugs,
 * before landing on a fully native fallback (v3) or fully custom scroll
 * tracking (v4). Since this doc-only pass can't verify against a live
 * browser/Figma render either, the safest choice per the doc's own final
 * guidance is v3: rely entirely on native scrollbar + resize-y, no overlay.
 */

export interface TextareaFieldProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function TextareaField({
  label, labelPosition = 'top', description, error = false, errorMessage, disabled = false, readOnly = false,
  value, onValueChange, placeholder = 'placeholder', rows = 3, id, className, ...rest
}: TextareaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex min-h-[84px] rounded-xl border px-3',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <textarea id={inputId} value={value} disabled={disabled} readOnly={readOnly} placeholder={placeholder} rows={rows}
          onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 resize-y bg-transparent py-2.5 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
          {...rest} />
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
          {description && <p className="text-xs leading-[18px] text-(--color-foreground-subtle)">{description}</p>}
        </div>
      )}
      {field}
    </div>
  );
}

export default TextareaField;
