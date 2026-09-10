import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button
 *
 * Source: Google Drive `upward-design-system-knowledge/components/button.md`
 * (generated from the rule document only -- no Figma access was used).
 *
 * Kinds: Filled(primary/danger) / Outlined / Ghost / Text / Inner (button.md "種類" table).
 * radius=full is always half the height (button.md "Radius variant" table:
 * md 40px -> full 20px, sm 32px -> full 16px). Inner button has no md/full
 * choice -- it's always pill-shaped (radius = height / 2).
 * State colors (button.md "Spec"): primary default #0070fa / hovered #0046eb /
 * pressed #0930bf; danger default #f44c4d / hovered #d21b1e / pressed #a90004.
 * Implemented with real CSS :hover/:active/:disabled instead of Figma's static
 * per-state variants, per the doc's own "実装上の注意".
 *
 * 2026-09-09 doc revision applied:
 * - added 'inner' kind (was documented but not implemented -- a real use-case gap)
 * - added Outlined `background` variant: 'transparent' | 'white' (was documented
 *   but the code always rendered white; default is 'transparent' per doc's more
 *   common scenario, doc doesn't state an explicit default so this is an
 *   assumption worth confirming)
 * - font now references the `typography / body / md / regular` token (same
 *   token Typography.Body uses) instead of a standalone hardcoded 14px/20px,
 *   including font-family which was previously missing entirely
 */

export type ButtonKind = 'filled' | 'outlined' | 'ghost' | 'text' | 'inner';
export type ButtonColor = 'primary' | 'danger';
export type ButtonSize = 'md' | 'sm';
export type ButtonRadius = 'md' | 'full';
/** Only meaningful when kind='outlined'. */
export type ButtonBackground = 'transparent' | 'white';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  kind?: ButtonKind;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  /** Outlined-only: transparent (default, assumes an already-white ancestor) or white (explicit white fill). */
  background?: ButtonBackground;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  children?: ReactNode;
}

// Filled / Outlined / Ghost / Text sizing (button.md "Spec")
const RADIUS_FULL_PX: Record<ButtonSize, number> = { md: 20, sm: 16 };
const RADIUS_MD_PX = 12;
const HEIGHT_PX: Record<ButtonSize, number> = { md: 40, sm: 32 };
const PADDING_X_PX: Record<ButtonSize, number> = { md: 16, sm: 12 };

// Inner button has its own scale (button.md "Inner button詳細"): md=32px is
// documented/measured; sm=24px/radius12/padding6 is an estimate extrapolated
// from the md->sm shrink ratio used elsewhere, not directly measured -- flagged
// in button.md as needing Figma confirmation.
const INNER_HEIGHT_PX: Record<ButtonSize, number> = { md: 32, sm: 24 };
const INNER_RADIUS_PX: Record<ButtonSize, number> = { md: 16, sm: 12 };
const INNER_PADDING_X_PX: Record<ButtonSize, number> = { md: 8, sm: 6 };

export function Button({
  kind = 'filled',
  color = 'primary',
  size = 'md',
  radius = 'md',
  background = 'transparent',
  iconBefore,
  iconAfter,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isIconOnly = !children && Boolean(iconBefore) && !iconAfter;
  const isInner = kind === 'inner';

  const height = kind === 'text' ? 32 : isInner ? INNER_HEIGHT_PX[size] : HEIGHT_PX[size];
  const cornerRadius = kind === 'text'
    ? 0
    : isInner
      ? INNER_RADIUS_PX[size]
      : radius === 'full' ? RADIUS_FULL_PX[size] : RADIUS_MD_PX;
  const paddingX = kind === 'text'
    ? undefined
    : isIconOnly
      ? 0
      : isInner
        ? INNER_PADDING_X_PX[size]
        : PADDING_X_PX[size];

  const outlinedBgClass = background === 'white' ? 'bg-(--color-surface-default)' : 'bg-transparent';

  const kindClass: Record<ButtonKind, string> = {
    filled:
      color === 'primary'
        ? 'text-white bg-(--color-button-primary-default) hover:bg-(--color-button-primary-hovered) active:bg-(--color-button-primary-pressed)'
        : 'text-white bg-(--color-button-danger-default) hover:bg-(--color-button-danger-hovered) active:bg-(--color-button-danger-pressed)',
    outlined:
      `border border-(--color-border-soft) ${outlinedBgClass} text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)`,
    ghost:
      'text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)',
    text: 'text-(--color-foreground-accent) hover:underline px-0',
    // Inner buttons live inside form fields (date/password/search etc.); ghost-like
    // visuals per button.md's "実装上の注意" (kind='inner' used internally by those components).
    inner: 'text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2',
        'transition-colors duration-100 disabled:opacity-50 disabled:pointer-events-none',
        kindClass[kind],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height,
        borderRadius: cornerRadius,
        paddingInline: paddingX,
        width: isIconOnly ? height : undefined,
        // typography / body / md / regular (foundations-color-typography.md) --
        // single source of truth, same token Typography.Body uses, not a
        // standalone hardcoded value.
        fontFamily: 'var(--typography-font-family)',
        fontSize: 'var(--typography-body-md-font-size)',
        lineHeight: 'var(--typography-body-md-line-height)',
        fontWeight: 400,
      }}
      {...rest}
    >
      {iconBefore}
      {children}
      {iconAfter}
    </button>
  );
}

export default Button;
