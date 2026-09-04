import { useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CaretDown, Check } from '@phosphor-icons/react';

/**
 * SelectField (single-select only)
 * Source: `components/select-field-dropdown.md` (doc-only, no Figma access).
 * ⚠️ Doc explicitly notes multi-select/chip content was "未再検証" (not
 * re-verified) -- so that part is skipped entirely here, per the doc's own
 * scope warning, rather than guessed at.
 */

export interface SelectOption<T extends string = string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface SelectFieldProps<T extends string = string> {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  error?: boolean;
  errorMessage?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  options: SelectOption<T>[];
  value?: T;
  onValueChange?: (value: T) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function SelectField<T extends string = string>({
  label, labelPosition = 'top', error = false, errorMessage, disabled = false, readOnly = false,
  options, value, onValueChange, placeholder = 'placeholder', id, className,
}: SelectFieldProps<T>) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  const openMenu = () => {
    if (disabled || readOnly) return;
    setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen(true);
  };

  const commit = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    onValueChange?.(opt.value);
    setOpen(false);
  };

  const trigger = (
    <div className={isLeft ? 'relative min-w-0 flex-1' : 'relative w-full shrink-0'}>
      <button id={inputId} type="button" disabled={disabled} onClick={() => (open ? setOpen(false) : openMenu())}
        aria-haspopup="listbox" aria-expanded={open}
        className={[
          'flex h-10 w-full items-center gap-2 rounded-xl border pl-3 pr-1.5 text-left',
          error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
          readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
          disabled ? 'opacity-50' : '',
        ].join(' ')}>
        <span className={['min-w-0 flex-1 truncate text-sm leading-5', selectedOption ? 'text-(--color-foreground-default)' : 'text-(--color-foreground-subtle)'].join(' ')}>
          {selectedOption?.label ?? placeholder}
        </span>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-2xl">
          <CaretDown size={20} color="var(--color-foreground-default)" style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }} />
        </span>
      </button>
      {open && (
        <ul role="listbox" className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-72 w-80 overflow-auto rounded-xl bg-(--color-surface-default) p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
          {options.map((opt, index) => {
            const isSelected = opt.value === value;
            const isActive = index === activeIndex;
            return (
              <li key={opt.value} role="option" aria-selected={isSelected} aria-disabled={opt.disabled}
                onMouseEnter={() => setActiveIndex(index)} onClick={() => commit(index)}
                className={[
                  'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2',
                  opt.disabled ? 'pointer-events-none opacity-50' : '',
                  isActive ? 'ring-2 ring-(--color-system-focus-ring)' : 'hover:bg-(--color-surface-transparent-tint)',
                ].join(' ')}>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm leading-5 text-(--color-foreground-default)">{opt.label}</span>
                  {opt.description && <span className="block truncate text-xs leading-[18px] text-(--color-foreground-subtle)">{opt.description}</span>}
                </span>
                {isSelected && <Check size={20} color="var(--color-foreground-default)" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );

  if (isLeft) {
    return (
      <div ref={rootRef} className={['flex items-start gap-4', className].filter(Boolean).join(' ')}>
        {label && <label htmlFor={inputId} className="w-60 shrink-0 pt-2.5 text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
        {trigger}
        {error && errorMessage && <p className="pt-1 text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>}
      </div>
    );
  }
  return (
    <div ref={rootRef} className={['flex w-80 flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
      {trigger}
      {error && errorMessage && <p className="text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>}
    </div>
  );
}

export default SelectField;
