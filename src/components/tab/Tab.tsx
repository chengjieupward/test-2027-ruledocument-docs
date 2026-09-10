import type { ReactNode } from 'react';

/**
 * Tab
 * Source: `components/tab.md`, cross-checked against the live Figma node
 * (fileKey V83CyjWzvH0CpRZdOAt9Q9, node-id 29374:2705) via get_design_context
 * on 2026-09-10.
 *
 * ⚠️ Figma's own node shows selected as bold (`body/md/bold`), but the user
 * explicitly confirmed -- after seeing that reference -- that this
 * implementation should NOT bold the selected label; weight stays
 * `font-normal` in every state. This is a deliberate, confirmed departure
 * from the literal Figma spec, not an oversight.
 *
 * That same Figma fetch also confirmed:
 * - each Tab item's label actually sits inside a nested Ghost Button
 *   (button.md), which is where the item's rounded (12px) hover/press
 *   background feedback comes from -- this is the "hovered" state the old
 *   Property table listed without ever describing what it looked like
 * - icon slot is a fixed 20x20 "desktop-icon" box (icon.md md size), not
 *   whatever size the consumer's own icon element happens to be
 *
 * 2026-09-10 doc revisions applied (from both user confirmation and the
 * Figma fetch above):
 * - only 3 real states exist: default / disabled / selected
 * - underline width/color set via an absolutely-positioned decoration (not a
 *   real `border-bottom`, and not two conditionally-combined Tailwind
 *   border-width classes) -- both avoids the Tailwind class-order footgun
 *   *and* avoids the box-model jitter a real border's width change would
 *   cause when toggling selected
 * - label reserves the bold variant's width at all times via an invisible
 *   bold copy stacked behind the visible text, so switching weight never
 *   changes the button's rendered width and jitters neighboring tabs
 *   (2026-09-10: no longer needed now that weight never changes at all --
 *   removed)
 * - label container has no fixed width -- sized by its own padding + content
 * - content supports 3 variants (user-provided, not in the original doc):
 *   text only / icon before (icon + label) / icon only (icon, no label --
 *   requires `iconLabel` for accessibility since there's no visible text)
 * - ghost-button-style hover/press background (rounded-xl,
 *   surface-transparent-tint/-shade) added per the Figma nested-component
 *   finding above
 */

export type TabSize = 'md' | 'sm';

export interface TabOption<T extends string = string> {
  value: T;
  /** Text label. Omit for an icon-only tab (must pass `icon` + `iconLabel` in that case). */
  label?: ReactNode;
  /** Optional icon, rendered before the label ("icon before"). With no `label`, renders as icon-only. */
  icon?: ReactNode;
  /** Accessible name, required when there's no visible text label (icon-only). */
  iconLabel?: string;
  disabled?: boolean;
}

export interface TabProps<T extends string = string> {
  options: TabOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
  size?: TabSize;
  className?: string;
}

export function Tab<T extends string = string>({ options, value, onValueChange, size = 'md', className }: TabProps<T>) {
  if (import.meta.env?.DEV && options.length > 6) {
    console.warn(`Tab: doc's Property list caps items at 6; received ${options.length}.`);
  }
  const height = size === 'md' ? 40 : 32;
  const paddingX = size === 'md' ? 16 : 12;
  return (
    <div role="tablist" className={['flex', className].filter(Boolean).join(' ')} style={{ height }}>
      {options.map((option) => {
        const selected = option.value === value;
        const iconOnly = Boolean(option.icon) && !option.label;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={iconOnly ? option.iconLabel : undefined}
            disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className="relative flex items-center justify-center disabled:pointer-events-none disabled:opacity-50"
            style={{ height }}
          >
            {/* nested ghost-button: rounded (12px) hover/press feedback
                surface, per the Figma reference's actual component nesting */}
            <span
              className="flex items-center justify-center gap-2 rounded-t-xl hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)"
              style={{ height, paddingInline: paddingX }}
            >
              {option.icon && (
                <span className="flex size-5 shrink-0 items-center justify-center">{option.icon}</span>
              )}
              {option.label && (
                <span className="text-sm leading-5 font-normal text-(--color-foreground-default)">
                  {option.label}
                </span>
              )}
            </span>
            {/* Underline: absolutely-positioned decoration, not a real
                `border`, so its 1px/2px thickness change never affects the
                button's own box height or shifts its content vertically. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: selected ? 2 : 1,
                backgroundColor: selected ? 'var(--color-border-accent)' : 'var(--color-border-normal)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}

export default Tab;
