import {
  isValidElement,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
  type Key,
  type TableHTMLAttributes,
} from 'react';
import { cn } from '../../utils/cn';
import type { Breakpoint } from '../../utils/breakpoints';
import { mapPaletteTones, toneVar, type PaletteTone } from '../../themes/paletteTones';
import { componentVariantAppearances, resolveVariantTone, type ComponentVariant } from '../../types/variants';
import { type InputSize, type InputVariant } from '../shared/fields/field.styles';
import { toneClasses as buttonToneClasses } from '../button/button.styles';
import { TablePaginationControls } from './TablePaginationControls';
export type TableAlign = 'left' | 'center' | 'right';
export type TableFontWeight = 'normal' | 'semiBold';
export type TableVariant = ComponentVariant | InputVariant;
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
  tone?: PaletteTone;
  size?: InputSize | 'default';
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
  text: 'rounded-md',
};
const toneBorderClasses = mapPaletteTones((s) => s.outline);

function stickySurfaceStyle(surface: string): CSSProperties {
  return {
    backgroundColor: `var(--table-cell-overlay, ${surface})`,
  };
}

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
  size = 'default',
  stickyFirstColumn = false,
  stickyLastColumn = false,
  stickyHeader = false,
  showColumnBorders = false,
  striped = false,
  breakpoint,
  ...props
}: TableProps<T>) {
  const tableId = useId().replace(/:/g, '');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledHorizontally, setIsScrolledHorizontally] = useState(false);
  const tableName = props['aria-label'] ?? 'Data table';
  const accent = resolveVariantTone(variant, tone);
  const hasHeader = columns.some((column) => column.header != null && column.header !== '');
  const appearance = hasHeader ? componentVariantAppearances[variant] : 'label';
  const headerClasses = buttonToneClasses[accent][appearance];
  const sticky = breakpoint !== 'mobile';
  const tableSurface = 'bg-background-surface';
  const isStickyFirstColumn = (index: number) => sticky && stickyFirstColumn && index === 0;
  const isStickyLastColumn = (index: number) => sticky && stickyLastColumn && index === columns.length - 1;
  const isStickyColumn = (index: number) => isStickyFirstColumn(index) || isStickyLastColumn(index);
  const headerOverlays = {
    label: toneVar(accent, 'surface'),
    solid: toneVar(accent),
    outline: 'var(--background-surface)',
    text: 'var(--background-surface)',
  };
  const headerSurface = stickySurfaceStyle(headerOverlays[appearance]);
  const bodySurface = stickySurfaceStyle('var(--background-surface)');
  const stripedSurface = stickySurfaceStyle('var(--action-hover-surface)');
  const stickySurface = (index: number, header: boolean, rowIndex = 0): CSSProperties | undefined => {
    if (!isStickyColumn(index) && !(header && stickyHeader)) return undefined;
    const shadows = [
      isStickyFirstColumn(index) && (hasHeader || isScrolledHorizontally) && '6px 0 6px -6px var(--action-focus)',
      isStickyLastColumn(index) && '-6px 0 6px -6px var(--action-focus)',
    ].filter(Boolean);
    return {
      ...(header ? headerSurface : striped && rowIndex % 2 === 1 ? stripedSurface : bodySurface),
      boxShadow: shadows.length ? shadows.join(', ') : undefined,
    };
  };
  const cellClasses = (column: TableColumn<T>, index: number) =>
    cn(
      'border-table-divider',
      size === 'small' ? 'px-4 py-3 text-13' : 'px-4 py-4 text-[0.875rem] leading-[1.43]',
      alignClasses[column.align ?? 'left'],
      showColumnBorders &&
        index > 0 &&
        !(sticky && stickyFirstColumn && index === 1) &&
        !(sticky && stickyLastColumn && index === columns.length - 1) &&
        'border-l',
      isStickyFirstColumn(index) && 'sticky left-0 z-10',
      !hasHeader && isStickyFirstColumn(index) && !isScrolledHorizontally && 'border-r border-table-divider',
      isStickyLastColumn(index) && 'sticky right-0 z-10',
    );
  return (
    <div
      className={cn(
        'w-full rounded-lg border border-table-divider bg-background-surface p-4 font-sans shadow-sm',
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
          aria-label={`Scrollable ${tableName} ${tableId}`}
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
            aria-label={tableName}
            className={cn('w-max min-w-full border-separate border-spacing-0 text-text-primary', tableSurface)}
          >
            {hasHeader && (
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={column.key}
                      scope="col"
                      style={{
                        ...stickySurface(index, true),
                        borderColor: appearance === 'solid' ? toneVar(accent, 'contrast') : undefined,
                      }}
                      className={cn(
                        cellClasses(column, index),
                        'z-10 border-b border-table-divider font-medium text-text-primary',
                        headerClasses,
                        appearance === 'outline' && 'border-x-0 border-t-0 border-b',
                        isStickyColumn(index) && 'z-20',
                        stickyHeader && 'sticky top-0 z-20',
                        stickyHeader && appearance !== 'label' && 'border-b-0',
                        stickyHeader && isStickyColumn(index) && 'z-30',
                        'first:rounded-tl-md last:rounded-tr-md',
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
                      const surfaceClasses = rowHeader
                        ? headerClasses
                        : cn(tableSurface, striped && rowIndex % 2 === 1 && 'bg-action-hover');
                      return (
                        <Tag
                          key={column.key}
                          scope={rowHeader ? 'row' : undefined}
                          style={stickySurface(index, rowHeader, rowIndex)}
                          className={cn(
                            cellClasses(column, index),
                            'border-b border-table-divider align-middle',
                            surfaceClasses,
                            !rowHeader && 'group-hover:bg-action-hover',
                            !rowHeader &&
                              isStickyColumn(index) &&
                              'group-hover:[--table-cell-overlay:var(--action-hover-surface)]',
                            weight === 'semiBold' ? 'font-semibold' : 'font-regular',
                            rowIndex === data.length - 1 && 'border-b-0',
                            !hasHeader && rowIndex === 0 && index === 0 && 'rounded-tl-md',
                            !hasHeader && rowIndex === 0 && index === columns.length - 1 && 'rounded-tr-md',
                            rowHeader && rowIndex === data.length - 1 && 'rounded-bl-md',
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
      </div>
      {pagination && (
        <TablePaginationControls
          pagination={pagination}
          size={size === 'default' ? 'normal' : size}
          tone={accent}
          ariaLabel={`Pagination for ${tableName} ${tableId}`}
        />
      )}
    </div>
  );
}
