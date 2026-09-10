import { useId } from 'react';
import { MagnifyingGlass, XCircle } from '@phosphor-icons/react';
import { Button } from '../button/Button';

/**
 * SearchInput
 * Source: `components/search-input.md` (doc-only, no Figma access).
 * radius=full always half height: md 40px->20px, sm 32px->16px (button.md rule
 * cross-referenced by the doc, confirmed with no exceptions).
 *
 * 2026-09-10 doc revision applied (user-confirmed, walking through the
 * component composition math):
 * - outer padding depends on `size` and is NOT uniformly symmetric:
 *   - size=md: pl=6 / pr=10. The prefix uses an md inner-button (32px)
 *     around a 20px desktop-icon (6px inset each side); the clear button
 *     uses an sm inner-button (24px) around the same 20px icon (2px inset
 *     each side) -- the differing inner-button sizes are why the two sides
 *     need different outer padding to align consistently
 *   - size=sm: pl=6 / pr=6 (symmetric). Both sides use an sm inner-button
 *     (24px) around the same 20px icon, so the same padding works for both
 * - both the prefix search icon AND the clear button are the real `Button`
 *   component (`kind="inner"`), not hand-rolled `<span>`/`<button>` elements
 *   that only coincidentally matched the right dimensions:
 *   - prefix: size matches the input's own `size` prop (md=32px / sm=24px),
 *     containing a 20px search icon
 *   - clear: always `size="sm"` (24px, regardless of the input's own size),
 *     containing a 20px icon -- the doc's original "16x16" figure for this
 *     icon was superseded by the user's confirmed component breakdown
 * - the outer container's own `gap` between prefix/input/clear button is 0
 *   (spacing between them comes from each element's own padding instead)
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
      isSm ? 'h-8 pl-1.5 pr-1.5' : 'h-10 pl-1.5 pr-2.5',
      disabled ? 'opacity-50' : '',
      className,
    ].filter(Boolean).join(' ')} style={{ borderRadius: RADIUS_PX[size][radius] }}>
      <Button
        kind="inner"
        size={isSm ? 'sm' : 'md'}
        aria-label="Search"
        iconBefore={<MagnifyingGlass size={20} color="var(--color-foreground-default)" />}
      />
      <input id={inputId} name={name} type="text" value={value} disabled={disabled} placeholder={placeholder} aria-label={ariaLabel}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="min-w-0 flex-1 bg-transparent text-sm leading-5 outline-none text-(--color-foreground-default) placeholder:text-(--color-foreground-subtle)" />
      {hasValue && (
        <Button
          type="button"
          kind="inner"
          size="sm"
          onClick={() => onValueChange?.('')}
          disabled={disabled}
          aria-label="Clear"
          iconBefore={<XCircle size={20} color="var(--color-foreground-subtle)" weight="fill" />}
        />
      )}
    </div>
  );
}

export default SearchInput;
