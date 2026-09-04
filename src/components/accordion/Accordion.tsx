import { useState, type ReactNode } from 'react';
import { CaretDown } from '@phosphor-icons/react';

/**
 * AccordionSection
 * Source: `components/accordion.md` (doc-only, no Figma access).
 * The doc clarifies caret-down is a single icon rotated 180deg via CSS
 * transform when open, not swapped for a separate caret-up icon.
 * Width fixed at 360px per doc Rules; no nesting supported.
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
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center gap-[10px] rounded-xl py-1.5 pl-2 pr-2.5 text-left hover:bg-(--color-surface-transparent-tint) transition-colors duration-100"
      >
        <div className="flex min-w-0 flex-1 flex-col px-2 py-1.5">
          <p className="truncate text-sm font-medium leading-5 text-(--color-foreground-default)">{title}</p>
          {description && <p className="text-xs leading-[18px] text-(--color-foreground-subtle)">{description}</p>}
        </div>
        <span className="flex size-8 shrink-0 items-center justify-center rounded-2xl">
          <CaretDown
            size={20}
            color="var(--color-foreground-default)"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 150ms ease' }}
          />
        </span>
      </button>
      <div className="grid w-full transition-[grid-template-rows] duration-200 ease-out" style={{ gridTemplateRows: open ? '1fr' : '0fr' }}>
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
