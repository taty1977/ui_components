import { type PaletteTone } from '../../themes/paletteTones';
export type ButtonTone = PaletteTone;
export type { ComponentVariant as ButtonVariant } from '../../types/variants';
export type ButtonSize = 'default' | 'sm' | 'md' | 'lg';
export declare const buttonStyles: (props?: ({
    size?: "default" | "sm" | "md" | "lg" | null | undefined;
    shape?: "rectangle" | "pill" | null | undefined;
    width?: "default" | "sm" | "md" | "lg" | "auto" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const toneClasses: Record<ButtonTone, {
    solid: string;
    label: string;
    outline: string;
    text: string;
}>;
