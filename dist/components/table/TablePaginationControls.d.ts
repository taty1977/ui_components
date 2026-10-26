import type { PaletteTone } from '../../themes/paletteTones';
import { type InputSize } from '../shared/fields/field.styles';
import type { TablePagination } from './Table';
interface TablePaginationControlsProps {
    pagination: TablePagination;
    size: InputSize;
    tone: PaletteTone;
}
export declare function TablePaginationControls({ pagination, size, tone }: TablePaginationControlsProps): import("react/jsx-runtime").JSX.Element;
export {};
