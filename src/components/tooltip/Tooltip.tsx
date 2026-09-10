import { useId, useState, type ReactNode } from 'react';

/**
 * Tooltip
 * Source: `components/tooltip.md` (doc-only, no Figma access).
 * Doc notes the Figma component is card-only, with no trigger logic --
 * hover/focus toggling added here per the doc's implementation note.
 * max-width 240px per doc's "更新履歴".
 *
 * 2026-09-10 fix: the card relied on the browser's implicit shrink-to-fit
 * sizing for an absolutely-positioned box with only `left` set, which
 * turned out unreliable -- it kept rendering close to the full 240px
 * max-width and wrapping short text ("Tooltip text") onto two lines even
 * though it easily fits on one. Removing the inner span's `block` alone
 * didn't fix it. Explicitly adding `w-max` (width: max-content) alongside
 * `max-w-[240px]` removes the ambiguity: the card now always sizes to its
 * actual text width first, capped at 240px, rather than depending on the
 * browser's shrink-to-fit resolution for an unconstrained absolute box.
 */

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  children: ReactNode;
  className?: string;
}

const SIDE_POSITION: Record<TooltipSide, string> = {
  top: 'bottom-[calc(100%+6px)] left-1/2 -translate-x-1/2',
  bottom: 'top-[calc(100%+6px)] left-1/2 -translate-x-1/2',
  left: 'right-[calc(100%+6px)] top-1/2 -translate-y-1/2',
  right: 'left-[calc(100%+6px)] top-1/2 -translate-y-1/2',
};

export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const tooltipId = useId();
  return (
    <span className={['relative inline-flex', className].filter(Boolean).join(' ')}
      onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)} onBlur={() => setVisible(false)}>
      <span aria-describedby={visible ? tooltipId : undefined}>{children}</span>
      {visible && (
        <span role="tooltip" id={tooltipId}
          className={['pointer-events-none absolute z-20 w-max max-w-[240px] rounded-xl bg-(--color-surface-default) px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.2)]', SIDE_POSITION[side]].join(' ')}>
          <span className="text-sm leading-5 text-(--color-foreground-default)">{content}</span>
        </span>
      )}
    </span>
  );
}

export default Tooltip;
