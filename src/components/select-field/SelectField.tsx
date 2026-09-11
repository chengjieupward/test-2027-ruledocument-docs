import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { CaretDown, Check, XCircle } from '@phosphor-icons/react';
import { Button } from '../button/Button';

/**
 * SelectField (single-select + multi-select)
 * Source: `components/select-field-dropdown.md` (doc-only, no Figma access).
 * ⚠️ Doc explicitly notes the Chip spec was "未再検証" (not re-verified against
 * current Figma) -- implemented as documented, but flagged for future
 * re-verification rather than treated as fully confirmed.
 *
 * 2026-09-09 doc revision applied:
 * - trigger's right padding confirmed as 6px (pr-1.5) -- the doc's original
 *   "4px" was the actual error, not the code
 * - added avatar support: 32x32px, 0.8px `color/border/soft` border, 16px
 *   radius, 8px gap to text -- in both the trigger and each dropdown item
 * - item width is intentionally NOT fixed to the doc's old "296px" figure --
 *   confirmed flexible/set-as-needed per usage
 * - option description color is `color/foreground/muted`, not `-subtle`
 * - keyboard nav (arrows/Enter/Escape) added per the doc's own
 *   "実装上の注意", which wasn't implemented before
 * - fixed a real layout bug in labelPosition="left": the error message was a
 *   flex-row sibling of the trigger, rendering to its right instead of below
 *   it. Trigger + error message are now their own flex-col, with the label
 *   as a row-level sibling of that column
 * - added multi-select: chip display in the trigger (or "All" text label
 *   when every option is selected, per doc), a checkbox-style indicator per
 *   item instead of a checkmark, and an "All" pseudo-option at the top of the
 *   list. Per doc, Chip is 24px tall, 6px radius, `color/surface/shade` bg.
 *   Chip's own close button reuses the real `Button` component (`kind="inner"
 *   size="sm"`, 24x24px) with an `XCircle` (x-circle) icon at 20px
 *   (desktop-icon=md) -- matches the chip's own height exactly. Icon color
 *   is `color/foreground/subtle`, not `-muted` (team decision)
 *
 * 2026-09-10 doc revision applied:
 * - dropdown caret toggle reuses the real `Button` component (`kind="inner"
 *   size="sm"` (24x24px, radius 12, containing a 16px desktop-icon) --
 *   kept small deliberately so the arrow doesn't visually compete with the
 *   trigger's own content (team decision)
 *   -- team decision, matching the same fix applied to Accordion's toggle
 * - added group-name support: options can carry an optional `group` label;
 *   consecutive options sharing the same group get a bold group-name header
 *   row above them, with an optional count badge (`color/foreground/muted`)
 *   -- this was previously flagged in the doc as "未実装、別途対応要"
 */

export interface SelectOption<T extends string = string> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  avatarUrl?: string;
  avatarAlt?: string;
  disabled?: boolean;
  /** Optional group name. Consecutive options sharing the same group get a bold group-name header row (with an item-count badge) above them. */
  group?: string;
}

interface SelectFieldBaseProps<T extends string = string> {
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  error?: boolean;
  errorMessage?: ReactNode;
  disabled?: boolean;
  readOnly?: boolean;
  options: SelectOption<T>[];
  placeholder?: string;
  /** Only used when `multiple` -- label shown in the trigger when every option is selected. Doc's literal text is "すべて". */
  allSelectedLabel?: string;
  id?: string;
  className?: string;
}

export type SelectFieldProps<T extends string = string> = SelectFieldBaseProps<T> &
  (
    | { multiple?: false; value?: T; onValueChange?: (value: T) => void }
    | { multiple: true; value?: T[]; onValueChange?: (value: T[]) => void }
  );

function OptionAvatar({ src, alt }: { src: string; alt?: string }) {
  return (
    <img
      src={src}
      alt={alt ?? ''}
      className="size-8 shrink-0 rounded-2xl border-[0.8px] border-(--color-border-soft) object-cover"
    />
  );
}

function Chip({ label, onRemove }: { label: ReactNode; onRemove: () => void }) {
  return (
    <span className="inline-flex h-6 max-w-full items-center gap-1 rounded-md bg-(--color-surface-shade) pl-1.5 text-sm leading-5 text-(--color-foreground-default)">
      <span className="truncate">{label}</span>
      {/* close button: real inner-button (kind="inner" size="sm"), 24x24px,
          containing a 20px desktop-icon (x-circle) -- matches the chip's
          own 24px height exactly, no overflow. */}
      <Button
        kind="inner"
        size="sm"
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        aria-label="Remove"
        iconBefore={<XCircle size={20} color="var(--color-foreground-subtle)" weight="fill" />}
      />
    </span>
  );
}

/** Small inline checkbox indicator used in multi-select list items (matches checkbox.md's checked visual: filled box + white check). */
function ItemCheckbox({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={[
        'flex size-4 shrink-0 items-center justify-center rounded-sm border',
        checked ? 'bg-(--color-button-primary-default) border-(--color-button-primary-default)' : 'border-(--color-border-normal) bg-(--color-surface-default)',
      ].join(' ')}
    >
      {checked && (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M2 6.2l2.6 2.6L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

export function SelectField<T extends string = string>(props: SelectFieldProps<T>) {
  const {
    label, labelPosition = 'top', error = false, errorMessage, disabled = false, readOnly = false,
    options, placeholder = 'placeholder', allSelectedLabel = 'All', id, className, multiple,
  } = props;
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const selectableValues = options.filter((o) => !o.disabled).map((o) => o.value);
  const selectedValues: T[] = multiple
    ? (Array.isArray(props.value) ? props.value : [])
    : (props.value !== undefined ? [props.value as T] : []);
  const selectedOption = !multiple ? options.find((o) => o.value === selectedValues[0]) : undefined;
  const isAllSelected = multiple && selectableValues.length > 0 && selectableValues.every((v) => selectedValues.includes(v));

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
    setActiveIndex(0);
    setOpen(true);
  };

  const emitMulti = (next: T[]) => (props.onValueChange as ((v: T[]) => void) | undefined)?.(next);
  const emitSingle = (next: T) => (props.onValueChange as ((v: T) => void) | undefined)?.(next);

  const commit = (index: number) => {
    const opt = options[index];
    if (!opt || opt.disabled) return;
    if (multiple) {
      const isSel = selectedValues.includes(opt.value);
      emitMulti(isSel ? selectedValues.filter((v) => v !== opt.value) : [...selectedValues, opt.value]);
      // menu stays open for multi-select so more than one option can be picked
    } else {
      emitSingle(opt.value);
      setOpen(false);
    }
  };

  const toggleAll = () => {
    if (!multiple) return;
    emitMulti(isAllSelected ? [] : selectableValues);
  };

  // Index 0 is the virtual "All" row when multiple; option indices are offset by 1.
  const rowCount = options.length + (multiple ? 1 : 0);
  const moveActive = (delta: number) => {
    setActiveIndex((prev) => {
      if (rowCount === 0) return prev;
      let next = prev < 0 ? (delta > 0 ? -1 : 0) : prev;
      for (let i = 0; i < rowCount; i++) {
        next += delta;
        const idx = ((next % rowCount) + rowCount) % rowCount;
        if (idx === 0 && multiple) return idx;
        const opt = options[multiple ? idx - 1 : idx];
        if (opt && !opt.disabled) return idx;
      }
      return prev;
    });
  };

  const commitActive = () => {
    if (activeIndex < 0) return;
    if (multiple && activeIndex === 0) toggleAll();
    else commit(multiple ? activeIndex - 1 : activeIndex);
  };

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) { openMenu(); return; }
      moveActive(e.key === 'ArrowDown' ? 1 : -1);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) openMenu();
      else commitActive();
    } else if (e.key === 'Escape') {
      if (open) { e.preventDefault(); setOpen(false); }
    }
  };

  const triggerContent = () => {
    if (multiple) {
      if (selectedValues.length === 0) {
        return <span className="min-w-0 flex-1 truncate text-sm leading-5 text-(--color-foreground-subtle)">{placeholder}</span>;
      }
      if (isAllSelected) {
        return <span className="min-w-0 flex-1 truncate text-sm leading-5 text-(--color-foreground-default)">{allSelectedLabel}</span>;
      }
      return (
        <span className="flex min-w-0 flex-1 flex-wrap items-center gap-2 py-0.5">
          {selectedValues.map((v) => {
            const opt = options.find((o) => o.value === v);
            if (!opt) return null;
            return <Chip key={v} label={opt.label} onRemove={() => emitMulti(selectedValues.filter((sv) => sv !== v))} />;
          })}
        </span>
      );
    }
    return (
      <>
        {selectedOption?.avatarUrl && <OptionAvatar src={selectedOption.avatarUrl} alt={selectedOption.avatarAlt} />}
        <span className={['min-w-0 flex-1 truncate text-sm leading-5', selectedOption ? 'text-(--color-foreground-default)' : 'text-(--color-foreground-subtle)'].join(' ')}>
          {selectedOption?.label ?? placeholder}
        </span>
      </>
    );
  };

  const trigger = (
    <div className={isLeft ? 'relative min-w-0 flex-1' : 'relative w-full shrink-0'}>
      <button id={inputId} type="button" disabled={disabled} onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox" aria-expanded={open}
        className={[
          'flex h-10 w-full items-center gap-2 rounded-xl border pl-2 pr-1.5 text-left',
          error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
          readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
          disabled ? 'opacity-50' : '',
        ].join(' ')}>
        {/* content wrapper: pl-1 (4px) for placeholder/all-selected text
            (8+4=12px total, same as before). The partial (chip list) state
            gets pl-0 instead (8px total) -- deliberately less than the other
            two states, per team decision, to tighten the chip layout even
            though it means the trigger's left inset changes slightly when
            switching between chip and non-chip content. */}
        <span className={['flex min-w-0 flex-1 items-center gap-2', multiple && selectedValues.length > 0 && !isAllSelected ? '' : 'pl-1'].join(' ')}>
          {triggerContent()}
        </span>
        <Button
          kind="inner"
          size="sm"
          tabIndex={-1}
          aria-hidden="true"
          className="pointer-events-none"
          iconBefore={
            <CaretDown
              size={16}
              color="var(--color-foreground-default)"
              style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }}
            />
          }
        />
      </button>
      {open && (
        <ul role="listbox" aria-multiselectable={multiple || undefined} className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-72 w-80 overflow-auto rounded-xl bg-(--color-surface-default) p-0.5 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
          {multiple && (
            <li role="option" aria-selected={isAllSelected}
              onMouseEnter={() => setActiveIndex(0)} onClick={toggleAll}
              className={[
                'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2',
                activeIndex === 0 ? 'ring-2 ring-(--color-system-focus-ring)' : 'hover:bg-(--color-surface-transparent-tint)',
              ].join(' ')}>
              <span className="min-w-0 flex-1 truncate text-sm leading-5 text-(--color-foreground-default)">{allSelectedLabel}</span>
              <ItemCheckbox checked={isAllSelected} />
            </li>
          )}
          {options.map((opt, index) => {
            const rowIndex = multiple ? index + 1 : index;
            const isSelected = selectedValues.includes(opt.value);
            const isActive = rowIndex === activeIndex;
            const isNewGroup = opt.group && options[index - 1]?.group !== opt.group;
            const groupCount = isNewGroup ? options.filter((o) => o.group === opt.group).length : 0;
            return (
              <Fragment key={opt.value}>
                {isNewGroup && (
                  <li key={`group-${opt.group}`} role="presentation" className="flex items-center gap-2 px-3 pt-2 pb-1">
                    <span className="min-w-0 flex-1 truncate text-sm font-bold leading-5 text-(--color-foreground-default)">{opt.group}</span>
                    <span className="shrink-0 text-xs leading-[18px] text-(--color-foreground-muted)">{groupCount}</span>
                  </li>
                )}
                <li role="option" aria-selected={isSelected} aria-disabled={opt.disabled}
                  onMouseEnter={() => setActiveIndex(rowIndex)} onClick={() => commit(index)}
                  className={[
                    'flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2',
                    opt.disabled ? 'pointer-events-none opacity-50' : '',
                    isActive ? 'ring-2 ring-(--color-system-focus-ring)' : 'hover:bg-(--color-surface-transparent-tint)',
                  ].join(' ')}>
                  {opt.avatarUrl && <OptionAvatar src={opt.avatarUrl} alt={opt.avatarAlt} />}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm leading-5 text-(--color-foreground-default)">{opt.label}</span>
                    {opt.description && <span className="block truncate text-xs leading-[18px] text-(--color-foreground-muted)">{opt.description}</span>}
                  </span>
                  {multiple ? <ItemCheckbox checked={isSelected} /> : isSelected && <Check size={20} color="var(--color-foreground-default)" />}
                </li>
              </Fragment>
            );
          })}
        </ul>
      )}
    </div>
  );

  const errorText = error && errorMessage && (
    <p className="text-xs leading-[18px] text-(--color-foreground-danger)">{errorMessage}</p>
  );

  if (isLeft) {
    return (
      <div ref={rootRef} className={['flex items-start gap-4', className].filter(Boolean).join(' ')}>
        {label && <label htmlFor={inputId} className="w-60 shrink-0 pt-2.5 text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
        {/* trigger + error message stack in their own tight column (4px), so the
            error renders close below the trigger instead of beside it
            (2026-09-09 fix). label sits at the outer 10px-equivalent gap. */}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          {trigger}
          {errorText}
        </div>
      </div>
    );
  }
  return (
    <div ref={rootRef} className={['flex w-80 flex-col gap-2.5', className].filter(Boolean).join(' ')}>
      {label && <label htmlFor={inputId} className="text-sm leading-5 text-(--color-foreground-default)">{label}</label>}
      {/* trigger + error message share the same tight 4px gap as the left
          layout, kept separate from the label's own 10px gap above them */}
      <div className="flex flex-col gap-1">
        {trigger}
        {errorText}
      </div>
    </div>
  );
}

export default SelectField;
