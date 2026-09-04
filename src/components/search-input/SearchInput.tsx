import { useId } from 'react';
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react';

/**
 * SearchInput
 * Source: `components/search-input.md` (doc-only, no Figma access).
 * radius=full always half height: md 40px->20px, sm 32px->16px (button.md rule
 * cross-referenced by the doc, confirmed with no exceptions).
 */

export type SearchInputRadius = 'default' | 'full';
export type SearchInputSize = 'md' | 'sm';

export interface SearchInputProps {
  radius?: SearchInputRadius;
  size?: SearchInputSize;
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
  'aria-label'?: string;
}

const RADIUS_PX: Record<SearchInputSize, Record<SearchInputRadius, number>> = {
  md: { default: 12, full: 20 },
  sm: { default: 12, full: 16 },
};

export function SearchInput({
  radius = 'default', size = 'md', value, onValueChange, placeholder = 'Text value', disabled = false,
  id, name, className, 'aria-label': ariaLabel = 'Search',
}: SearchInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasValue = Boolean(value);
  const isSm = size === 'sm';

  return (
    <div className={[
      'flex items-center border border-(--color-border-normal) py-1',
      isSm ? 'h-8 pl-1.5 pr-2.5 gap-2' : 'h-10 pl-1.5 pr-2.5 gap-2',
      disabled ? 'opacity-50' : '',
      className,
    ].filter(Boolean).join(' ')} style={{ borderRadius: RADIUS_PX[size][radius] }}>
      <span className="flex shrink-0 items-center justify-center" style={{ width: isSm ? 24 : 32, height: isSm ? 24 : 32, borderRadius: isSm ? 12 : 16 }}>
        <MagnifyingGlass size={20} color="var(--color-foreground-default)" />
      </span>
      <input id={inputId} name={name} type="text" value={value} disabled={disabled} placeholder={placeholder} aria-label={ariaLabel}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)" />
      {hasValue && (
        <button type="button" onClick={() => onValueChange?.('')} disabled={disabled} aria-label="Clear"
          className="flex size-6 shrink-0 items-center justify-center rounded-xl disabled:cursor-default">
          <XCircle size={20} color="var(--color-foreground-subtle)" weight="fill" />
        </button>
      )}
    </div>
  );
}

export default SearchInput;
