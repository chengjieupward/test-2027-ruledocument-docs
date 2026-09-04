import { useId } from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';

/**
 * NumberField
 * Source: `components/number-field.md` (doc-only, no Figma access).
 * Native <input type="number"> avoided per the doc note (inconsistent browser
 * spinners); stepper is a custom NumberStepper with real :hover/:active states.
 */

export interface NumberFieldProps {
  label?: React.ReactNode;
  labelPosition?: 'top' | 'left';
  error?: boolean;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  step?: number;
  min?: number;
  max?: number;
  id?: string;
  className?: string;
}

function clamp(n: number, min?: number, max?: number) {
  if (min !== undefined && n < min) return min;
  if (max !== undefined && n > max) return max;
  return n;
}

export function NumberField({
  label, labelPosition = 'top', error = false, errorMessage, disabled = false, readOnly = false,
  value, onValueChange, placeholder = 'placeholder', step = 1, min, max, id, className,
}: NumberFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';

  const handleStep = (dir: 1 | -1) => {
    const current = Number(value ?? 0) || 0;
    onValueChange?.(String(clamp(current + dir * step, min, max)));
  };

  const buttonBase = [
    'flex h-[19px] w-8 items-center justify-center border-l border-(--color-border-normal)',
    'text-(--color-foreground-default) hover:bg-(--color-surface-tint)',
    'active:bg-(--color-surface-shade) active:text-(--color-foreground-default)/50',
    'disabled:text-(--color-foreground-default)/50 disabled:pointer-events-none',
  ].join(' ');

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex items-center gap-1 rounded-xl border pl-3 pr-px',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <input
          id={inputId} type="text" inputMode="decimal" value={value} disabled={disabled} readOnly={readOnly}
          placeholder={placeholder} onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
        />
        <div className="flex h-[38px] w-8 flex-col">
          <button type="button" tabIndex={-1} aria-label="Increment" disabled={disabled || readOnly}
            onClick={() => handleStep(1)} className={[buttonBase, 'rounded-tr-xl border-b'].join(' ')}>
            <CaretUp size={12} />
          </button>
          <button type="button" tabIndex={-1} aria-label="Decrement" disabled={disabled || readOnly}
            onClick={() => handleStep(-1)} className={buttonBase}>
            <CaretDown size={12} />
          </button>
        </div>
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
    <div className={['flex w-[480px] flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
      {field}
    </div>
  );
}

export default NumberField;
