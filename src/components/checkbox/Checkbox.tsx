import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';

/**
 * Checkbox (checkbox-with-label)
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
 */

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

  const mark = (
    <span className="relative flex size-5 shrink-0 items-center justify-center p-0.5">
      <input
        ref={inputRef}
        id={inputId}
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

  const labelColumn = (
    <span className="flex flex-1 flex-col gap-0.5">
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
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
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
