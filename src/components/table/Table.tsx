import {
  isValidElement,
  useState,
  type CSSProperties,
  type ReactNode,
  type Key,
  type TableHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import type { Breakpoint } from '../../utils/breakpoints';
import { toneTextClasses, type InputSize, type InputVariant } from '../input/input.styles';
import { toneClasses as buttonToneClasses, type ButtonTone, type ButtonVariant } from '../button/button.styles';
export type TableAlign = 'left' | 'center' | 'right';
export type TableFontWeight = 'normal' | 'semiBold';
export type TableVariant = Exclude<ButtonVariant, 'default'> | InputVariant;
export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  align?: TableAlign;
  fontWeight?: TableFontWeight;
  render?: (row: T, rowIndex: number) => ReactNode;
  sortIcon?: ReactNode;
}
export interface TablePagination {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  pageStatus?: ReactNode;
  previousIcon?: ReactNode;
  nextIcon?: ReactNode;
}
export interface TableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
  columns: TableColumn<T>[];
  data: T[];
  getRowKey?: (row: T, rowIndex: number) => Key;
  pagination?: TablePagination;
  emptyMessage?: ReactNode;
  variant?: TableVariant;
  tone?: ButtonTone;
  size?: InputSize;
  stickyFirstColumn?: boolean;
  stickyLastColumn?: boolean;
  stickyHeader?: boolean;
  showColumnBorders?: boolean;
  striped?: boolean;
  breakpoint?: Breakpoint;
}
const alignClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
const appearanceClasses = {
  solid: 'rounded-md',
  label: 'rounded-md',
  outline: 'rounded-md border',
  text: 'rounded-none',
};
const toneBorderClasses: Record<ButtonTone, string> = {
  primary: 'border-palette-primary-main',
  secondary: 'border-palette-secondary-main',
  error: 'border-palette-error-main',
  warning: 'border-palette-warning-main',
  info: 'border-palette-info-main',
  success: 'border-palette-success-main',
};
function sortIcon(icon: ReactNode) {
  if (!icon) return null;
  if (isValidElement<{ onClick?: unknown }>(icon) && typeof icon.props.onClick === 'function') return icon;
  return (
    <span className="inline-flex size-4 shrink-0 items-center justify-center" aria-hidden="true">
      {icon}
    </span>
  );
}
export default function Table<T>({
  className,
  columns,
  data,
  getRowKey,
  pagination,
  emptyMessage = 'No results found.',
  variant = 'outline',
  tone = 'primary',
  size = 'normal',
  stickyFirstColumn = false,
  stickyLastColumn = false,
  stickyHeader = false,
  showColumnBorders = false,
  striped = false,
  breakpoint,
  ...props
}: TableProps<T>) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledHorizontally, setIsScrolledHorizontally] = useState(false);
  const accent = variant === 'primary' || variant === 'secondary' ? variant : tone;
  const hasHeader = columns.some((column) => column.header != null && column.header !== '');
  const appearance = !hasHeader
    ? 'label'
    : variant === 'outlined'
      ? 'outline'
      : variant === 'filled' || variant === 'primary' || variant === 'secondary'
        ? 'solid'
        : variant === 'standard'
          ? 'text'
          : variant;
  const headerClasses = buttonToneClasses[accent][appearance];
  const pageCount = pagination
    ? Math.max(1, Math.ceil(Math.max(0, pagination.total) / Math.max(1, pagination.pageSize)))
    : 0;
  const page = pagination ? Math.min(Math.max(pagination.page, 1), pageCount) : 0;
  const sticky = breakpoint !== 'mobile';
  const tableSurface = 'bg-background-surface';
  const isStickyColumn = (index: number) =>
    sticky && ((stickyFirstColumn && index === 0) || (stickyLastColumn && index === columns.length - 1));
  const stickySurface = (index: number, header: boolean, rowIndex = 0): CSSProperties | undefined => {
    if (!isStickyColumn(index) && !(header && stickyHeader)) return undefined;
    const overlay = header
      ? appearance === 'label'
        ? `var(--palette-${accent}-opacity-light)`
        : appearance === 'solid'
          ? `var(--palette-${accent}-main)`
          : 'transparent'
      : striped && rowIndex % 2 === 1
        ? 'var(--action-hover)'
        : 'transparent';
    return {
      backgroundColor: 'var(--background-surface)',
      backgroundImage: `linear-gradient(var(--table-cell-overlay, ${overlay}), var(--table-cell-overlay, ${overlay}))`,
    };
  };
  const cellClasses = (column: TableColumn<T>, index: number) =>
    cn(
      'border-divider',
      size === 'small' ? 'px-4 py-3 text-13' : 'px-4 py-4 text-[0.875rem] leading-[1.43]',
      alignClasses[column.align ?? 'left'],
      showColumnBorders &&
        index > 0 &&
        !(sticky && stickyFirstColumn && index === 1) &&
        !(sticky && stickyLastColumn && index === columns.length - 1) &&
        'border-l',
      sticky &&
        stickyFirstColumn &&
        index === 0 &&
        "sticky left-0 z-10 after:pointer-events-none after:absolute after:inset-y-0 after:-right-1.5 after:w-1.5 after:bg-gradient-to-r after:from-action-focus after:to-transparent after:content-['']",
      !hasHeader && sticky && stickyFirstColumn && index === 0 && !isScrolledHorizontally && 'border-r border-divider',
      !hasHeader && sticky && stickyFirstColumn && index === 0 && !isScrolledHorizontally && 'after:hidden',
      sticky &&
        stickyLastColumn &&
        index === columns.length - 1 &&
        "sticky right-0 z-10 before:pointer-events-none before:absolute before:inset-y-0 before:-left-1.5 before:w-1.5 before:bg-gradient-to-l before:from-action-focus before:to-transparent before:content-['']",
    );
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-border-subtle bg-background-surface p-4 font-sans shadow-sm',
        className,
      )}
      data-variant={hasHeader ? variant : 'label'}
      data-tone={accent}
      data-size={size}
    >
      <div className="relative isolate">
        <div
          tabIndex={0}
          role="region"
          aria-label="Scrollable table"
          onScroll={(event) => {
            setIsScrolled(event.currentTarget.scrollTop > 0);
            setIsScrolledHorizontally(event.currentTarget.scrollLeft > 0);
          }}
          className={cn(
            'overflow-x-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-current',
            stickyHeader && 'max-h-80 overflow-auto',
            appearanceClasses[appearance],
            toneBorderClasses[accent],
          )}
        >
          <table
            {...props}
            aria-label={props['aria-label'] ?? 'Data table'}
            className={cn('w-max min-w-full border-separate border-spacing-0 text-text-primary', tableSurface)}
          >
            {hasHeader && (
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.key}
                      scope="col"
                      style={stickySurface(index, true)}
                      className={cn(
                        cellClasses(column, index),
                        'z-10 border-b border-divider font-medium text-text-primary',
                        headerClasses,
                        appearance === 'outline' && 'border-x-0 border-t-0 border-b',
                        isStickyColumn(index) && 'z-20',
                        stickyHeader && 'sticky top-0 z-20',
                        stickyHeader && appearance !== 'label' && 'border-b-0',
                        stickyHeader && isStickyColumn(index) && 'z-30',
                        appearance !== 'text' && 'first:rounded-tl-md last:rounded-tr-md',
                      )}
                    >
                      <span className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-1">
                        {column.header}
                        {sortIcon(column.sortIcon)}
                      </span>
                      {stickyHeader && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            'pointer-events-none absolute inset-x-0 -bottom-1.5 h-1.5 bg-gradient-to-b from-action-focus to-transparent',
                            appearance === 'label' && !isScrolled && 'hidden',
                          )}
                        />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {data.length ? (
                data.map((row, rowIndex) => (
                  <tr key={getRowKey?.(row, rowIndex) ?? rowIndex} className="group">
                    {columns.map((column, index) => {
                      const rowHeader = !hasHeader && index === 0;
                      const Tag = rowHeader ? 'th' : 'td';
                      const weight =
                        column.fontWeight ??
                        ((!hasHeader || (sticky && stickyFirstColumn)) && index === 0 ? 'semiBold' : 'normal');
                      return (
                        <Tag
                          key={column.key}
                          scope={rowHeader ? 'row' : undefined}
                          style={stickySurface(index, rowHeader, rowIndex)}
                          className={cn(
                            cellClasses(column, index),
                            'border-b border-divider align-middle',
                            rowHeader
                              ? headerClasses
                              : striped && rowIndex % 2 === 1
                                ? cn(tableSurface, 'bg-action-hover')
                                : tableSurface,
                            !rowHeader && 'group-hover:bg-action-hover',
                            !rowHeader &&
                              isStickyColumn(index) &&
                              'group-hover:[--table-cell-overlay:var(--action-hover)]',
                            weight === 'semiBold' ? 'font-semibold' : 'font-regular',
                            rowIndex === data.length - 1 && 'border-b-0',
                            appearance !== 'text' && !hasHeader && rowIndex === 0 && index === 0 && 'rounded-tl-md',
                            appearance !== 'text' &&
                              !hasHeader &&
                              rowIndex === 0 &&
                              index === columns.length - 1 &&
                              'rounded-tr-md',
                            appearance !== 'text' && rowHeader && rowIndex === data.length - 1 && 'rounded-bl-md',
                          )}
                        >
                          {column.render ? column.render(row, rowIndex) : String(row[column.key as keyof T] ?? '')}
                        </Tag>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={Math.max(columns.length, 1)}
                    className={cn(
                      'text-center',
                      size === 'small' ? 'px-4 py-6 text-13' : 'px-4 py-8 text-[0.875rem] leading-[1.43]',
                    )}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {hasHeader && appearance === 'outline' && (
          <span
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 z-40 rounded-md border', toneBorderClasses[accent])}
          />
        )}
      </div>
      {pagination && (
        <nav
          aria-label="Table pagination"
          className={cn(
            'flex items-center justify-end gap-2 border-t border-divider',
            size === 'small' ? 'px-4 py-3' : 'px-4 py-4',
          )}
        >
          <button
            type="button"
            onClick={() => pagination.onPageChange(page - 1)}
            disabled={page <= 1}
            className={cn(
              'inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45',
              toneTextClasses[accent],
              'hover:enabled:bg-action-hover',
            )}
          >
            {pagination.previousIcon && (
              <span className="inline-flex size-4" aria-hidden="true">
                {pagination.previousIcon}
              </span>
            )}
            <span>Previous</span>
          </button>
          {pagination.pageStatus && (
            <span aria-live="polite" className="text-13 text-text-secondary">
              {pagination.pageStatus}
            </span>
          )}
          <button
            type="button"
            onClick={() => pagination.onPageChange(page + 1)}
            disabled={page >= pageCount}
            className={cn(
              'inline-flex min-h-9 items-center gap-1 rounded-md px-2 text-13 font-semibold disabled:cursor-not-allowed disabled:opacity-45',
              toneTextClasses[accent],
              'hover:enabled:bg-action-hover',
            )}
          >
            <span>Next</span>
            {pagination.nextIcon && (
              <span className="inline-flex size-4" aria-hidden="true">
                {pagination.nextIcon}
              </span>
            )}
          </button>
        </nav>
      )}
    </div>
  );
}
