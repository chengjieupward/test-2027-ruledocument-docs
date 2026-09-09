import { useId } from 'react';
import { CaretUp, CaretDown } from '@phosphor-icons/react';

/**
 * NumberField
 * Source: `components/number-field.md` (doc-only, no Figma access).
 * Native <input type="number"> avoided per the doc note (inconsistent browser
 * spinners); stepper is a custom NumberStepper with real :hover/:active states.
 *
 * 2026-09-09 doc revision applied (user-confirmed):
 * - the divider between the up/down stepper buttons is 1px, same weight as
 *   the field's outer border -- the doc's earlier "0.5px" was wrong
 * - up/down icons are genuinely two distinct icons (CaretUp/CaretDown), not
 *   one icon rotated 180deg -- the doc's earlier "reuse rotated icon"
 *   instruction was wrong
 * - the field is not fixed to a specific default width (removed the old
 *   `w-[480px]`, which didn't match any documented value or the sibling
 *   fields' convention anyway) -- it expands to fill/fit its content instead
 * - the doc's "4px gap between content and stepper" is the input's own
 *   right-padding (`pr-1`), not a flex `gap` on the row -- using a flex gap
 *   left a floating dead-space seam between the input and the stepper's own
 *   left border, instead of the stepper sitting flush against it
 * - stepper now matches the input's actual rendered height via `self-stretch`
 *   + `flex-1` on each button, instead of hardcoded `h-[38px]`/`h-[19px]`
 *   values that didn't quite match the input's real height -- this way it
 *   stays in sync automatically even if the input's padding/font-size change
 * - the increment button's top-right corner radius is 11px, not the outer
 *   field's 12px -- nested rounded corners need to shrink by the border
 *   width (1px here) to stay visually concentric with the outer curve;
 *   using the same 12px on both made the two arcs look mismatched/off-center
 * - decrement button now gets the matching bottom-right 11px radius too
 *   (the doc previously said only the top-right corner should be rounded,
 *   but the field's outer border is rounded on all 4 corners, so the
 *   bottom-right stepper button needs its own matching radius for the same
 *   concentric-corner reason as the top-right one -- user-confirmed)
 * - removed the field's `pr-px` -- the stepper now sits flush against the
 *   field's right border with no gap, per user request
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
    'flex flex-1 w-8 items-center justify-center border-l border-(--color-border-normal)',
    'text-(--color-foreground-default) hover:bg-(--color-surface-tint)',
    'active:bg-(--color-surface-shade) active:text-(--color-foreground-default)/50',
    'disabled:text-(--color-foreground-default)/50 disabled:pointer-events-none',
  ].join(' ');

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'flex items-center rounded-xl border pl-3',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <input
          id={inputId} type="text" inputMode="decimal" value={value} disabled={disabled} readOnly={readOnly}
          placeholder={placeholder} onChange={(e) => onValueChange?.(e.target.value)}
          className="min-w-0 flex-1 bg-transparent py-2.5 pr-1 text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)"
        />
        <div className="flex w-8 flex-col self-stretch">
          <button type="button" tabIndex={-1} aria-label="Increment" disabled={disabled || readOnly}
            onClick={() => handleStep(1)} className={[buttonBase, 'rounded-tr-[11px] border-b'].join(' ')}>
            <CaretUp size={12} />
          </button>
          <button type="button" tabIndex={-1} aria-label="Decrement" disabled={disabled || readOnly}
            onClick={() => handleStep(-1)} className={[buttonBase, 'rounded-br-[11px]'].join(' ')}>
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
    <div className={['flex flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
      {field}
    </div>
  );
}

export default NumberField;
