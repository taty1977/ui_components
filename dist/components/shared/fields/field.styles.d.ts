import { type PaletteTone } from '../../../themes/paletteTones';
export type InputTone = PaletteTone;
export type InputAppearance = 'outlined' | 'filled' | 'standard';
export type InputVariant = InputAppearance | 'primary' | 'secondary';
export type InputSize = 'small' | 'normal';
export declare function floatingLabelClasses({ appearance, floating, visible, iconLeft, size, multiline, }: {
    appearance: InputAppearance;
    floating: boolean;
    visible: boolean;
    iconLeft?: boolean;
    size?: InputSize | number;
    multiline?: boolean;
}): string;
export declare function resolveFieldVariant(variant: InputVariant, tone: InputTone, error?: string): {
    appearance: InputAppearance;
    accent: InputTone;
};
export declare const toneClasses: Record<InputTone, string>;
export declare const toneTextClasses: Record<InputTone, string>;
export declare function resolveFieldLabelTone({ disabled, error, active, accent, }: {
    disabled?: boolean;
    error?: string;
    active: boolean;
    accent: InputTone;
}): string;
export declare const notchToneClasses: Record<InputTone, string>;
export declare const fieldStyles: (props?: ({
    variant?: "outlined" | "filled" | "standard" | null | undefined;
    size?: "small" | "normal" | null | undefined;
    disabled?: boolean | null | undefined;
    iconLeft?: boolean | null | undefined;
    iconRight?: boolean | null | undefined;
    notched?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const fieldInputClasses = "w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled";
export declare const fieldCenterAlignmentClasses: Record<InputAppearance, string>;
export declare const labelClasses = "mb-1 block font-sans text-13 font-medium text-text-secondary";
export declare const errorClasses = "mt-1 font-sans text-13 text-palette-error-main";
export declare const optionListClasses = "absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg";
