import { useId, useState, type ReactNode } from 'react';

/**
 * Tooltip
 * Source: `components/tooltip.md` (doc-only, no Figma access).
 * Doc notes the Figma component is card-only, with no trigger logic --
 * hover/focus toggling added here per the doc's implementation note.
 * max-width 240px per doc's "更新履歴".
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
          className={['pointer-events-none absolute z-20 max-w-[240px] rounded-xl bg-(--color-surface-default) px-3 py-2 shadow-[0_2px_8px_rgba(0,0,0,0.2)]', SIDE_POSITION[side]].join(' ')}>
          <span className="block text-sm leading-5 text-(--color-foreground-default)">{content}</span>
        </span>
      )}
    </span>
  );
}

export default Tooltip;
