import { Info, Warning, CheckCircle, SpinnerGap, X } from '@phosphor-icons/react';
import type { ReactNode } from 'react';

/**
 * Toast
 * Source: `components/toast.md` (doc-only, no Figma access).
 * Icon per type (toast.md Spec table): info / warning(error type!) /
 * check-circle(success) / spinner-gap(loading). Doc explicitly notes the
 * "error" type visually uses a warning triangle, not an x-circle.
 * Width fixed 320px. loading type must not auto-timeout (doc Rules) --
 * out of scope here since this is a display-only component, no manager.
 */

export type ToastType = 'info' | 'error' | 'success' | 'loading';

export interface ToastProps {
  type?: ToastType;
  title: ReactNode;
  description?: ReactNode;
  closeButton?: boolean;
  onClose?: () => void;
  className?: string;
}

function TypeIcon({ type }: { type: ToastType }) {
  switch (type) {
    case 'info':
      return <Info size={20} color="var(--color-border-accent)" weight="fill" />;
    case 'error':
      return <Warning size={20} color="var(--color-border-danger)" weight="fill" />;
    case 'success':
      return <CheckCircle size={20} color="var(--color-border-success)" weight="fill" />;
    case 'loading':
      return (
        <span className="inline-flex" style={{ animation: 'uds-toast-spin 0.8s linear infinite' }}>
          <style>{'@keyframes uds-toast-spin{to{transform:rotate(360deg)}}'}</style>
          <SpinnerGap size={20} color="var(--color-border-accent)" weight="bold" />
        </span>
      );
  }
}

export function Toast({ type = 'info', title, description, closeButton = true, onClose, className }: ToastProps) {
  return (
    <div
      role="status"
      className={['flex w-80 items-start gap-2 rounded-xl bg-(--color-surface-default) p-2 shadow-[0_4px_16px_rgba(0,0,0,0.18)]', className]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex shrink-0 items-center justify-center p-0.5">
        <TypeIcon type={type} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5 py-0.5">
        <p className="text-sm font-bold leading-5 text-(--color-foreground-default)">{title}</p>
        {description && <p className="text-xs leading-[18px] text-(--color-foreground-default)">{description}</p>}
      </div>
      {closeButton && (
        <button type="button" onClick={onClose} aria-label="Close" className="flex size-6 shrink-0 items-center justify-center rounded-xl">
          <X size={20} color="var(--color-foreground-default)" />
        </button>
      )}
    </div>
  );
}

export default Toast;
