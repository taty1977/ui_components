import { type ReactNode, type Key, type TableHTMLAttributes } from 'react';
import type { Breakpoint } from '../../utils/breakpoints';
import { type PaletteTone } from '../../themes/paletteTones';
import { type ComponentVariant } from '../../types/variants';
import { type InputSize, type InputVariant } from '../shared/fields/field.styles';
export type TableAlign = 'left' | 'center' | 'right';
export type TableFontWeight = 'normal' | 'semiBold';
export type TableVariant = Exclude<ComponentVariant, 'default'> | InputVariant;
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
    size?: InputSize;
    stickyFirstColumn?: boolean;
    stickyLastColumn?: boolean;
    stickyHeader?: boolean;
    showColumnBorders?: boolean;
    striped?: boolean;
    breakpoint?: Breakpoint;
}
export default function Table<T>({ className, columns, data, getRowKey, pagination, emptyMessage, variant, tone, size, stickyFirstColumn, stickyLastColumn, stickyHeader, showColumnBorders, striped, breakpoint, ...props }: TableProps<T>): import("react/jsx-runtime").JSX.Element;
