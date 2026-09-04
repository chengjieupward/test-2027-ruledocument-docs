import { X, CheckCircle, Warning, Info } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

/**
 * Callout
 * Source: `components/callout.md` (doc-only, no Figma access).
 * Type-color table from callout.md "Type別カラー": info border #0070fa bg #eff8ff;
 * danger border #f44c4d bg #fff4f4; success border #1dc338 bg #edfeee;
 * warning border #ff970c bg #fff5ec (warning uses a different token pattern
 * per the doc's explicit warning note -- not a copy error).
 * Rule: icon and type are a fixed pair, not swappable (callout.md Rules).
 */

export type CalloutType = 'info' | 'danger' | 'success' | 'warning';

export interface CalloutProps {
  type?: CalloutType;
  title: string;
  description?: ReactNode;
  icon?: boolean;
  className?: string;
}

const TYPE_STYLE: Record<CalloutType, string> = {
  info: 'bg-(--color-callout-infomation) border-(--color-border-accent)',
  danger: 'bg-(--color-callout-danger) border-(--color-border-danger)',
  success: 'bg-(--color-callout-success) border-(--color-border-success)',
  warning: 'bg-(--color-callout-warning) border-(--color-feedback-progress-active)',
};

function CalloutIcon({ type }: { type: CalloutType }) {
  switch (type) {
    case 'info':
      return <Info size={20} color="var(--color-border-accent)" weight="fill" />;
    case 'danger':
      return <X size={20} color="var(--color-border-danger)" weight="bold" />;
    case 'success':
      return <CheckCircle size={20} color="var(--color-border-success)" weight="fill" />;
    case 'warning':
      return <Warning size={20} color="var(--color-feedback-progress-active)" weight="fill" />;
  }
}

export function Callout({ type = 'info', title, description, icon = true, className }: CalloutProps) {
  return (
    <div
      role="status"
      className={['flex w-80 items-start gap-2 rounded-xl border p-2', TYPE_STYLE[type], className]
        .filter(Boolean)
        .join(' ')}
    >
      {icon && <div className="shrink-0"><CalloutIcon type={type} /></div>}
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-sm font-bold leading-5 text-(--color-foreground-default)">{title}</p>
        {description && (
          <p className="text-xs leading-[18px] text-(--color-foreground-default)">{description}</p>
        )}
      </div>
    </div>
  );
}

export default Callout;
