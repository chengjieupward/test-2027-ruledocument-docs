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
 *
 * 2026-09-09 doc revision applied:
 * - labelPosition='left' now actually reorders the DOM (label before switch),
 *   not just a CSS flex-row-reverse visual flip -- matters for screen-reader
 *   read order, which the previous version got wrong
 * - labelPosition='left' label column is now a fixed 240px (w-60), previous
 *   version always used flex-1 regardless of position
 * - disabled no longer double-applies opacity-50 (once on the wrapping
 *   <label>, once again on the track -- compounded to ~25% instead of the
 *   intended 50%). Per user confirmation: label stays full opacity when
 *   disabled; off-track color is unchanged (no fade); only the on-track color
 *   gets a single opacity-50 applied to it
 * - knob translateX was a hardcoded `20px` inline style while every other
 *   dimension (track/padding/knob) is a rem-based Tailwind class. This
 *   project's global root font-size is 18px (not the Tailwind-assumed 16px,
 *   see src/index.css), so the rem-based classes render ~12.5% larger than
 *   their nominal px value while the hardcoded `20px` transform did not scale
 *   with them -- knob undershot its target by ~2.5px, leaving a visibly
 *   bigger gap on the right than top/bottom in the checked state. Fixed by
 *   using the Tailwind class `translate-x-5` (1.25rem, same unit as the
 *   knob's own `size-5`) instead of an inline px transform, so it always
 *   scales in lockstep with the rest of the component
 * - vertical alignment with description: the track must center against the
 *   Label line specifically, not the Label+Description block as a whole, and
 *   Description must sit tight (2px) below Label regardless of the track's
 *   greater height. Achieved by keeping Label+Description as one naturally
 *   stacked column (so Description is never pushed away by the track's
 *   height) and instead nudging the track itself upward by half the
 *   track/label height difference (`-mt-[0.625rem]`, a rem value so it scales
 *   correctly with root font-size like the translate fix above) so its own
 *   center lines up with the Label line's center
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

  // Track's own color logic. off never fades (disabled or not); on fades to
  // 50% only when disabled -- this is the single place opacity is applied,
  // not stacked with a wrapper-level opacity.
  const trackBgClass = checked
    ? disabled
      ? 'bg-(--color-button-primary-default) opacity-50'
      : 'bg-(--color-button-primary-default)'
    : 'bg-(--color-surface-shade)';

  const track = (
    <span className="relative inline-flex h-10 w-11 shrink-0 items-center">
      <input id={inputId} type="checkbox" role="switch" checked={checked} disabled={disabled} aria-checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="peer absolute inset-0 z-10 size-full cursor-pointer opacity-0 disabled:cursor-not-allowed" />
      <span aria-hidden="true" className={[
        'flex h-6 w-11 items-center rounded-full p-0.5 transition-colors duration-150',
        trackBgClass,
        'peer-focus-visible:ring-2 peer-focus-visible:ring-(--color-system-focus-ring) peer-focus-visible:ring-offset-1',
      ].join(' ')}>
        <span className={[
          'size-5 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-transform duration-150',
          checked ? 'translate-x-5' : 'translate-x-0',
        ].join(' ')} />
      </span>
    </span>
  );

  if (!label) return track;

  // Label+Description stack naturally (Description is never pushed away by
  // the track's greater height). The track itself is nudged up by half the
  // track/label height difference so its own center lines up with the Label
  // line specifically -- not the Label+Description block's overall center.
  const labelColumn = (
    <span className={['flex flex-col gap-0.5', labelPosition === 'left' ? 'w-60 shrink-0' : ''].join(' ')}>
      <span className="text-sm leading-5 text-(--color-foreground-default)">{label}</span>
      {description && <span className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</span>}
    </span>
  );
  const nudgedTrack = <span className="-mt-[0.625rem]">{track}</span>;

  return (
    <label htmlFor={inputId} className={[
      'flex items-start',
      labelPosition === 'right' ? 'gap-2' : 'gap-4',
      // disabled never dims the label itself, only cursor affordance changes
      disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      className,
    ].filter(Boolean).join(' ')}>
      {/* Real DOM order per labelPosition (not just a CSS visual flip) --
          label first when labelPosition='left', switch first when 'right'. */}
      {labelPosition === 'left' ? (
        <>
          {labelColumn}
          {nudgedTrack}
        </>
      ) : (
        <>
          {nudgedTrack}
          {labelColumn}
        </>
      )}
    </label>
  );
}

export default Switch;
