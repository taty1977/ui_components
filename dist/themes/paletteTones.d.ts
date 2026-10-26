export type PaletteTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export declare const paletteTones: readonly PaletteTone[];
export type PaletteToneStyles = {
    /** Solid fill. */
    default: string;
    /** Hover/active/focus fill for the solid style (enabled elements only). */
    defaultState: string;
    /** Text color on top of the solid fill. */
    defaultText: string;
    /** Translucent fill. */
    label: string;
    labelState: string;
    /** Border color. */
    outline: string;
    text: string;
    /** Faint tint on hover/active/focus (enabled elements only). */
    subtleState: string;
    /** Form-field border with hover/focus-within states. */
    fieldBorder: string;
    /** Notched-label border; parent needs the `group` class. */
    notchBorder: string;
};
export declare const paletteToneStyles: Record<PaletteTone, PaletteToneStyles>;
/** Builds a `Record<PaletteTone, T>` by mapping each tone's centralized styles. */
export declare const mapPaletteTones: <T>(pick: (styles: PaletteToneStyles) => T) => Record<PaletteTone, T>;
export type PaletteShade = 'main' | 'dark' | 'opacity-light' | 'opacity-main' | 'opacity-lighter';
/** CSS variable reference for a tone shade, e.g. `var(--palette-primary-main)`. */
export declare const toneVar: (tone: PaletteTone, shade?: PaletteShade) => string;
