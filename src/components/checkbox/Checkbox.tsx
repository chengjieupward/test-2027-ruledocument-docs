import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Checkbox (checkbox-with-label) + CheckboxMark (the standalone mark)
 * Source: `components/checkbox.md` (doc-only, no Figma access).
 * State colors from the doc's "checkbox-mark State別カラー" table:
 * unchecked/default: white bg + #d2dce3 border (or #f44c4d if error);
 * unchecked/disabled: #e4ecf2 bg; checked: #0070FA bg (icon-based, not stroke).
 * indeterminate set via ref+useEffect since it's a DOM property, not a JSX attr
 * (per the doc's own implementation note). Checked/indeterminate marks are
 * hand-drawn inline SVG paths rather than the doc's "exported image asset" --
 * confirmed acceptable, visual result is equivalent and avoids an image asset
 * dependency.
 *
 * 2026-09-09 doc revision applied:
 * - corner radius is `rounded-sm` (4px), not `rounded-xs`. Tailwind's own `xs`
 *   step is 2px, which collides in name (but not value) with this design
 *   system's own `number/radius/xs` token, which is 4px -- a false-friend
 *   naming clash between the two scales
 * - checked+error fill uses `color/button/danger/default`, not
 *   `color/border/danger` (same hex today, but the wrong semantic token)
 * - labelPosition='left' now actually reorders the DOM (label before mark),
 *   not just a CSS flex-row-reverse visual flip -- same accessibility fix
 *   already applied to Switch
 * - mark now has its own 20x20 hit target (2px padding wrapper around the
 *   visible 16x16 box, per the doc's Anatomy), not just a bare 16x16 box --
 *   the input's invisible hit area now covers the full 20x20
 * - row now defaults to the doc's 240px width (`w-60`), overridable via
 *   `className`
 *
 * 2026-09-10: extracted the mark itself as `CheckboxMark`, exported
 * separately, so other components (e.g. Table's checkbox column, per
 * table.md's explicit "reuse checkbox.md's structure, don't reimplement"
 * rule) can reuse the exact same structure/tokens instead of hand-rolling
 * their own checkbox visuals.
 *
 * Bug found via that extraction: disabled's opacity-50 had only ever been
 * applied by the outer `<label>` wrapper, so a standalone `CheckboxMark`
 * (e.g. in Table) never dimmed when disabled+checked/indeterminate --
 * visually indistinguishable from enabled. Fixed by moving disabled's
 * opacity onto `CheckboxMark` itself, and onto just the label text
 * separately in `Checkbox` (not the outer `<label>` anymore), so the two
 * don't stack into a compounded ~25% opacity on the mark.
 */

export interface CheckboxMarkProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange' | 'size'> {
  checked?: boolean | 'indeterminate';
  onCheckedChange?: (checked: boolean) => void;
  error?: boolean;
  id?: string;
}

export function CheckboxMark({ checked = false, onCheckedChange, error = false, disabled, id, ...rest }: CheckboxMarkProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isIndeterminate = checked === 'indeterminate';
  const isChecked = checked === true;

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  let boxClass: string;
  if (isChecked || isIndeterminate) {
    boxClass = error
      ? 'bg-(--color-button-danger-default) border-(--color-button-danger-default)'
      : 'bg-(--color-button-primary-default) border-(--color-button-primary-default)';
  } else {
    boxClass = [
      error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
      disabled ? 'bg-(--color-surface-shade)' : 'bg-(--color-surface-default)',
    ].join(' ');
  }

  return (
    <span className={['relative flex size-5 shrink-0 items-center justify-center p-0.5', disabled ? 'opacity-50' : ''].join(' ')}>
      <input
        ref={inputRef}
        id={id}
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
          'pointer-events-none flex size-4 items-center justify-center rounded-sm border',
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
  );
}

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

  const mark = (
    <CheckboxMark
      id={inputId}
      checked={checked}
      onCheckedChange={onCheckedChange}
      error={error}
      disabled={disabled}
      {...rest}
    />
  );

  const labelColumn = (
    <span className={['flex flex-1 flex-col gap-0.5', disabled ? 'opacity-50' : ''].join(' ')}>
      <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>
      {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
    </span>
  );

  return (
    <label
      htmlFor={inputId}
      className={[
        'flex w-60 items-start py-1.5',
        labelPosition === 'right' ? 'gap-2' : 'gap-4',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      {/* Real DOM order per labelPosition (not just a CSS visual flip) --
          label first when labelPosition='left', mark first when 'right'. */}
      {labelPosition === 'left' ? (
        <>
          {labelColumn}
          {mark}
        </>
      ) : (
        <>
          {mark}
          {labelColumn}
        </>
      )}
    </label>
  );
}

export default Checkbox;
