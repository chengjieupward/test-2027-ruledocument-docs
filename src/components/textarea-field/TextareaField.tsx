import { useEffect, useId, useRef, useState, type TextareaHTMLAttributes, type ReactNode } from 'react';
import { Notches } from '@phosphor-icons/react';

/**
 * TextareaField
 * Source: `components/textarea-field.md` (doc-only, no Figma access).
 * Implements the doc's "v4" final design: native scrollbar and resize grip
 * are visually hidden, and a custom scroll-thumb + decorative resize-corner
 * icon are drawn on top, tracked via onScroll + ResizeObserver. Per the doc's
 * own recorded constraint, the custom thumb is a position INDICATOR only --
 * it is not itself draggable (dragging it to scroll would need separate,
 * more involved drag-handling code, out of scope here); wheel/trackpad/
 * keyboard scrolling works normally since the real textarea still scrolls,
 * only its native chrome is hidden.
 *
 * 2026-09-09 doc revision applied:
 * - description color is `color/foreground/muted` (doc didn't specify a
 *   token; `muted` chosen per the same convention every other component's
 *   description uses -- Avatar/Switch/Checkbox/RadioButton/SelectField)
 * - content width is NOT fixed to the doc's old "220px" figure -- confirmed
 *   flexible (flex-1, fills available space), same resolution as
 *   SelectField's analogous "296px" item-width question
 * - implemented the doc's v4 custom scrollbar-thumb + resize-corner icon:
 *   both right-aligned, resize icon pinned bottom-right, thumb auto-shows
 *   only once content exceeds the visible area (default 3 rows)
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

interface ThumbState {
  top: number;
  height: number;
  visible: boolean;
}

/** Scroll-thumb min height (its own "最小高度" constraint per the doc). */
const MIN_THUMB_HEIGHT = 16;

/** Space reserved at the bottom of the thumb's track so it never overlaps
    the fixed resize-corner icon -- they sit side by side, not stacked. */
const ICON_RESERVE = 20;

/** Small clearance at the top of the track so the thumb doesn't visually
    clip into the container's rounded top-right corner. */
const TOP_RESERVE = 8;

/** Resize-corner icon: desktop-icon/notches (icon.md desktop-icon spec). */

export function TextareaField({
  label, labelPosition = 'top', description, error = false, errorMessage, disabled = false, readOnly = false,
  value, onValueChange, placeholder = 'placeholder', rows = 3, id, className, ...rest
}: TextareaFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isLeft = labelPosition === 'left';
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [thumb, setThumb] = useState<ThumbState>({ top: 0, height: 0, visible: false });

  const recompute = () => {
    const el = textareaRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight + 1) {
      setThumb((t) => (t.visible ? { top: 0, height: 0, visible: false } : t));
      return;
    }
    // The thumb's own movable track stops short of the icon's reserved space
    // at the bottom, and clears the rounded top corner at the top, so it
    // never visually overlaps either -- side by side, not stacked/clipped.
    const trackHeight = Math.max(0, clientHeight - ICON_RESERVE - TOP_RESERVE);
    const thumbHeight = Math.min(trackHeight, Math.max(MIN_THUMB_HEIGHT, (clientHeight / scrollHeight) * trackHeight));
    const maxTop = trackHeight - thumbHeight;
    const top = TOP_RESERVE + (scrollTop / (scrollHeight - clientHeight)) * maxTop;
    setThumb({ top, height: thumbHeight, visible: true });
  };

  useEffect(() => {
    recompute();
    const el = textareaRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(recompute);
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const field = (
    <div className={isLeft ? 'min-w-0 flex-1' : 'w-full shrink-0'}>
      <div className={[
        'relative flex min-h-[84px] rounded-xl border px-3',
        error ? 'border-(--color-border-danger)' : 'border-(--color-border-normal)',
        readOnly ? 'bg-(--color-surface-transparent-tint)' : 'bg-(--color-surface-default)',
        disabled ? 'opacity-50' : '',
      ].join(' ')}>
        <textarea id={inputId} ref={textareaRef} value={value} disabled={disabled} readOnly={readOnly} placeholder={placeholder} rows={rows}
          onChange={(e) => onValueChange?.(e.target.value)}
          onScroll={recompute}
          className={[
            'min-w-0 flex-1 resize-y bg-transparent py-2.5 text-sm leading-5 outline-none',
            'text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)',
            // native scrollbar + resize grip hidden visually; scrolling/resizing still work
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&::-webkit-resizer]:opacity-0',
          ].join(' ')}
          {...rest} />
        {/* custom scroll-thumb (v4): position indicator only, not draggable.
            color/surface/tone, 4px wide, 2px radius.
            Constraints: right（水平） / top+bottom（垂直、inputの拡張に伴い可動域も伸縮）、
            最小高度 = MIN_THUMB_HEIGHT */}
        {thumb.visible && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-1 top-0 w-1 rounded-full bg-(--color-surface-tone)"
            style={{ height: thumb.height, transform: `translateY(${thumb.top}px)` }}
          />
        )}
        {/* decorative resize-corner icon, bottom-right, aligned with the (now
            invisible) native resizer's drag area. desktop-icon/notches per
            icon.md (sm=16px, color/foreground/subtle).
            Constraints: right, bottom（固定ピン留め、伸縮なし） */}
        <span aria-hidden="true" className="pointer-events-none absolute bottom-1 right-1">
          <Notches size={16} color="var(--color-foreground-subtle)" />
        </span>
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
          {description && <p className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</p>}
        </div>
      )}
      {field}
    </div>
  );
}

export default TextareaField;
