import type { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Button
 *
 * Source: Google Drive `upward-design-system-knowledge/components/button.md`
 * (generated from the rule document only -- no Figma access was used).
 *
 * Kinds: Filled(primary/danger) / Outlined / Ghost / Text (button.md "種類" table).
 * radius=full is always half the height (button.md "Radius variant" table:
 * md 40px -> full 20px, sm 32px -> full 16px).
 * State colors (button.md "Spec"): primary default #0070fa / hovered #0046eb /
 * pressed #0930bf; danger default #f44c4d / hovered #d21b1e / pressed #a90004.
 * Implemented with real CSS :hover/:active/:disabled instead of Figma's static
 * per-state variants, per the doc's own "実装上の注意".
 */

export type ButtonKind = 'filled' | 'outlined' | 'ghost' | 'text';
export type ButtonColor = 'primary' | 'danger';
export type ButtonSize = 'md' | 'sm';
export type ButtonRadius = 'md' | 'full';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  kind?: ButtonKind;
  color?: ButtonColor;
  size?: ButtonSize;
  radius?: ButtonRadius;
  iconBefore?: ReactNode;
  iconAfter?: ReactNode;
  children?: ReactNode;
}

const RADIUS_FULL_PX: Record<ButtonSize, number> = { md: 20, sm: 16 };
const RADIUS_MD_PX = 12;
const HEIGHT_PX: Record<ButtonSize, number> = { md: 40, sm: 32 };
const PADDING_X_PX: Record<ButtonSize, number> = { md: 16, sm: 12 };

export function Button({
  kind = 'filled',
  color = 'primary',
  size = 'md',
  radius = 'md',
  iconBefore,
  iconAfter,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isIconOnly = !children && Boolean(iconBefore) && !iconAfter;
  const height = kind === 'text' ? 32 : HEIGHT_PX[size];
  const cornerRadius = kind === 'text' ? 0 : radius === 'full' ? RADIUS_FULL_PX[size] : RADIUS_MD_PX;

  const kindClass: Record<ButtonKind, string> = {
    filled:
      color === 'primary'
        ? 'text-white bg-(--color-button-primary-default) hover:bg-(--color-button-primary-hovered) active:bg-(--color-button-primary-pressed)'
        : 'text-white bg-(--color-button-danger-default) hover:bg-(--color-button-danger-hovered) active:bg-(--color-button-danger-pressed)',
    outlined:
      'border border-(--color-border-soft) bg-(--color-surface-default) text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)',
    ghost:
      'text-(--color-foreground-default) hover:bg-(--color-surface-transparent-tint) active:bg-(--color-surface-transparent-shade)',
    text: 'text-(--color-foreground-accent) hover:underline px-0',
  };

  return (
    <button
      type="button"
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center gap-2 font-normal text-sm leading-5',
        'transition-colors duration-100 disabled:opacity-50 disabled:pointer-events-none',
        kindClass[kind],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        height,
        borderRadius: cornerRadius,
        paddingInline: kind === 'text' ? undefined : isIconOnly ? 0 : PADDING_X_PX[size],
        width: isIconOnly ? height : undefined,
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
