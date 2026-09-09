import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { CalendarDots } from '@phosphor-icons/react';

/**
 * DateField
 * Source: `components/date-field.md` (doc-only, no Figma access).
 * Doc: this covers only the text input + calendar button; the calendar popover
 * is a separate `date-picker-calendar` component, wired via onCalendarClick.
 * State (default/disabled/readonly/error) converted to 3 independent booleans
 * per the doc's implementation note, matching button.md/accordion.md pattern.
 *
 * 2026-09-09 doc revision applied:
 * - .date-content is NOT fixed to the doc's old "210px" figure -- confirmed
 *   flexible, same resolution as the analogous width questions in
 *   SelectField/TextareaField/NumberField
 * - description color is `color/foreground/muted`, not `-subtle` -- aligned
 *   with every other component's description text
 */

export interface DateFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  description?: ReactNode;
  error?: boolean;
  errorMessage?: ReactNode;
  content?: 'day' | 'minute';
  value?: string;
  onValueChange?: (value: string) => void;
  onCalendarClick?: () => void;
}

const PLACEHOLDER: Record<'day' | 'minute', string> = { day: 'YYYY/MM/DD', minute: 'YYYY/MM/DD hh:mm' };

export function DateField({
  label, labelPosition = 'top', description, error = false, errorMessage, content = 'day',
  value, onValueChange, onCalendarClick, disabled, readOnly, id, className, ...rest
}: DateFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';

  const inputRow = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex items-center gap-2 rounded-xl border pl-3 pr-1.5',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <input
          id={inputId} type="text" inputMode="numeric" value={value} disabled={disabled} readOnly={readOnly}
          placeholder={PLACEHOLDER[content]} onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
          {...rest}
        />
        <button type="button" onClick={onCalendarClick} disabled={disabled || !onCalendarClick} aria-label="Open calendar"
          className="flex size-8 shrink-0 items-center justify-center rounded-2xl disabled:cursor-default">
          <CalendarDots size={20} color="var(--color-foreground-default)" />
        </button>
      </div>
      {error && errorMessage && <p className="pt-1 text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>}
    </div>
  );

  if (isLeft) {
    return (
      <div className={['flex items-start gap-4', className].filter(Boolean).join(' ')}>
        {label && (
          <div className="flex w-60 shrink-0 flex-col gap-0.5 pt-2.5">
            <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>
          </div>
        )}
        {inputRow}
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
      {inputRow}
    </div>
  );
}

export default DateField;
