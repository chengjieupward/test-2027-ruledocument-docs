import { useId, type ReactNode } from 'react';

/**
 * Switch
 * Source: `components/switch.md` (doc-only, no Figma access).
 * ⚠️ Doc explicitly notes the off-state track color is exported as an image
 * asset in Figma, not a CSS property, so it couldn't be measured. This
 * implementation uses --color-surface-shade as a documented "reasonable
 * approximation", per the doc's own caveat -- not a verified value.
 * switch-mark outer box is 40px tall (24px visual track centered inside) per
 * the doc's corrected Anatomy -- an earlier version of this doc's own
 * implementation note flagged a misalignment bug from skipping this wrapper.
 */

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  labelPosition?: 'left' | 'right';
  id?: string;
  className?: string;
}

export function Switch({ checked = false, onCheckedChange, disabled = false, label, description, labelPosition = 'right', id, className }: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  const track = (
    <span className="relative inline-flex h-10 w-11 shrink-0 items-center">
      <input id={inputId} type="checkbox" role="switch" checked={checked} disabled={disabled} aria-checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed" />
      <span aria-hidden="true" className={[
        'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-150',
        checked ? 'bg-(--color-button-primary-default)' : 'bg-(--color-surface-shade)',
        disabled ? 'opacity-50' : '',
        'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-system-focus-ring) peer-focus-visible:ring-offset-1',
      ].join(' ')}>
        <span className="size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-150"
          style={{ transform: checked ? 'translateX(20px)' : 'translateX(0)' }} />
      </span>
    </span>
  );

  if (!label) return track;

  return (
    <label htmlFor={inputId} className={[
      'flex items-center',
      labelPosition === 'right' ? 'flex-row gap-2' : 'flex-row-reverse gap-4',
      disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      className,
    ].filter(Boolean).join(' ')}>
      {track}
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>
        {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
      </span>
    </label>
  );
}

export default Switch;
