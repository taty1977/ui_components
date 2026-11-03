import { type HTMLAttributes } from 'react';
export interface GalleryProject {
    id?: string;
    title: string;
    category: string;
    image: string;
    alt: string;
    description?: string;
    href?: string;
}
export type GalleryFilterStyle = 'default' | 'pill' | 'underline' | 'rectangle';
export interface GalleryProps extends HTMLAttributes<HTMLElement> {
    items: GalleryProject[];
    heading?: string;
    allLabel?: string;
    ariaLabel?: string;
    gridClassName?: string;
    showHoverActions?: boolean;
    filterStyle?: GalleryFilterStyle;
    onFilterChange?: (category: string | null) => void;
    onProjectClick?: (project: GalleryProject) => void;
    onPreviewOpen?: (project: GalleryProject) => void;
    onPreviewClose?: (project: GalleryProject) => void;
    onPreviewChange?: (project: GalleryProject) => void;
}
export default function Gallery({ items, heading, allLabel, ariaLabel, className, gridClassName, showHoverActions, filterStyle, onFilterChange, onProjectClick, onPreviewOpen, onPreviewClose, onPreviewChange, ...props }: GalleryProps): import("react/jsx-runtime").JSX.Element;
