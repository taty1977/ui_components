import type { Breakpoint } from '../../utils/breakpoints';
export interface CarouselImageItem {
    id?: string;
    src: string;
    alt: string;
    thumbnailSrc?: string;
    badge?: string;
    likeButton?: boolean;
}
export type CarouselVariant = 'primary' | 'secondary';
export interface CarouselProps {
    images: CarouselImageItem[];
    className?: string;
    likeButton?: boolean;
    breakpoint?: Breakpoint;
    variant?: CarouselVariant;
    initialIndex?: number;
    onImageChange?: (index: number, image: CarouselImageItem) => void;
    showThumbnails?: boolean;
    thumbnailsPosition?: 'left' | 'right' | 'bottom';
    showIndicators?: boolean;
    ariaLabel?: string;
    ofText?: string;
    openOnClick?: boolean;
}
export declare function Carousel({ images, className, likeButton, variant, initialIndex, onImageChange, showThumbnails, thumbnailsPosition, showIndicators, ariaLabel, ofText, breakpoint, openOnClick, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
export default Carousel;
