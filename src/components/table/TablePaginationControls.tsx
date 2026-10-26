import { cn } from '../../utils/cn';
import type { PaletteTone } from '../../themes/paletteTones';
import { toneTextClasses, type InputSize } from '../shared/fields/field.styles';
import type { TablePagination } from './Table';

interface TablePaginationControlsProps {
  pagination: TablePagination;
  size: InputSize;
  tone: PaletteTone;
}

export function TablePaginationControls({ pagination, size, tone }: TablePaginationControlsProps) {
  const { onPageChange, previousIcon, nextIcon, pageStatus } = pagination;
  const pageCount = Math.max(1, Math.ceil(Math.max(0, pagination.total) / Math.max(1, pagination.pageSize)));
  const page = Math.min(Math.max(pagination.page, 1), pageCount);
  const buttonClasses = cn(
    'inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45',
    toneTextClasses[tone],
    'hover:enabled:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
  );

  return (
    <nav
      aria-label="Table pagination"
      className={cn(
        'flex items-center justify-end gap-2 border-t border-divider',
        size === 'small' ? 'px-4 py-3' : 'px-4 py-4',
      )}
    >
      <button type="button" onClick={() => onPageChange(page - 1)} disabled={page <= 1} className={buttonClasses}>
        {previousIcon && (
          <span className="inline-flex size-4" aria-hidden="true">
            {previousIcon}
          </span>
        )}
        <span>Previous</span>
      </button>
      {pageStatus != null && (
        <span aria-live="polite" className="text-13 text-text-secondary">
          {pageStatus}
        </span>
      )}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        className={buttonClasses}
      >
        <span>Next</span>
        {nextIcon && (
          <span className="inline-flex size-4" aria-hidden="true">
            {nextIcon}
          </span>
        )}
      </button>
    </nav>
  );
}
