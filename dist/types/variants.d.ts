import type { PaletteTone } from '../themes/paletteTones';
export type ComponentVariant = 'default' | 'label' | 'outline' | 'text' | 'primary' | 'secondary';
export type ComponentAppearance = 'solid' | 'label' | 'outline' | 'text';
export declare const componentVariantAppearances: {
    readonly default: "solid";
    readonly label: "label";
    readonly outline: "outline";
    readonly text: "text";
    readonly primary: "solid";
    readonly secondary: "solid";
    readonly outlined: "outline";
    readonly filled: "solid";
    readonly standard: "text";
};
export declare function resolveVariantTone(variant: keyof typeof componentVariantAppearances, tone: PaletteTone): PaletteTone;
