import { useId, useState, type ReactNode } from 'react';
import { CaretDown } from '@phosphor-icons/react';
import { Button } from '../button/Button';

/**
 * AccordionSection
 * Source: `components/accordion.md` (doc-only, no Figma access).
 *
 * 2026-09-09 doc revision applied:
 * - header padding is symmetric (px-2 both sides), not pl-2/pr-2.5
 * - vertical padding (py-1.5) lives only on the inner `heading` block,
 *   not duplicated on the header itself (previous version double-counted
 *   this and rendered ~22px too tall)
 * - Description uses `--color-foreground-muted`, not `-subtle`
 * - width fixed at 360px per doc Rules; no nesting supported
 *
 * 2026-09-10 doc revision applied (team decision):
 * - the open/close toggle now reuses the real `Button` component
 *   (`kind="inner" size="sm"`, 24x24px, radius 12, containing a 16px
 *   desktop-icon) -- kept small deliberately so the arrow doesn't visually
 *   compete with the row's own content (team decision)
 * - caret-down is a single icon rotated 180deg via CSS transform when
 *   open, never swapped for a separate caret-up icon
 */

export interface AccordionSectionProps {
  title: string;
  description?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function AccordionSection({
  title,
  description,
  children,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  className,
}: AccordionSectionProps) {
  const bodyId = useId();
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const toggle = () => {
    const next = !open;
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  return (
    <div className={['flex flex-col items-start overflow-hidden w-[360px]', className].filter(Boolean).join(' ')}>
      {/* header wrapper: px-2 (8px), no vertical padding here */}
      <div className="flex w-full items-center gap-[10px] px-2 rounded-xl hover:bg-(--color-surface-transparent-tint) transition-colors duration-100">
        {/* heading: the only place vertical padding (py-1.5 = 6px) is applied */}
        <div className="flex min-w-0 flex-1 flex-col py-1.5">
          <p className="truncate text-sm font-medium leading-5 text-(--color-foreground-default)">{title}</p>
          {description && (
            <p className="text-xs leading-[18px] text-(--color-foreground-muted)">{description}</p>
          )}
        </div>
        {/* toggle: InnerButton, 24x24px, radius=12 (full=half of height) */}
        {/* toggle: real inner-button (kind="inner" size="sm"), 24x24px, radius 12, 16px desktop-icon */}
        <Button
          kind="inner"
          size="sm"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={bodyId}
          aria-label={open ? 'Collapse' : 'Expand'}
          iconBefore={
            <CaretDown
              size={16}
              color="var(--color-foreground-default)"
              style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms ease' }}
            />
          }
        />
      </div>
      <div
        id={bodyId}
        className="grid w-full transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="w-full px-2 py-1.5 text-sm leading-5 text-(--color-foreground-default)">
            {children ?? 'Accordion Body'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccordionSection;
