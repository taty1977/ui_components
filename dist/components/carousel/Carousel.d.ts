import type { Breakpoint } from '../../utils/breakpoints';
import type { PaletteTone } from '../../themes/paletteTones';
import { type ComponentVariant } from '../../types/variants';
export interface CarouselImageItem {
    id?: string;
    src: string;
    alt: string;
    thumbnailSrc?: string;
    badge?: string;
    likeButton?: boolean;
}
export type CarouselVariant = Exclude<ComponentVariant, 'default'>;
export interface CarouselProps {
    images: CarouselImageItem[];
    className?: string;
    likeButton?: boolean;
    breakpoint?: Breakpoint;
    variant?: CarouselVariant;
    tone?: PaletteTone;
    initialIndex?: number;
    onImageChange?: (index: number, image: CarouselImageItem) => void;
    showThumbnails?: boolean;
    thumbnailsPosition?: 'left' | 'right' | 'bottom';
    showIndicators?: boolean;
    ariaLabel?: string;
    ofText?: string;
    openOnClick?: boolean;
}
export declare function Carousel({ images, className, likeButton, variant, tone, initialIndex, onImageChange, showThumbnails, thumbnailsPosition, showIndicators, ariaLabel, ofText, breakpoint, openOnClick, }: CarouselProps): import("react/jsx-runtime").JSX.Element;
export default Carousel;
