import { type PaletteTone } from '../themes/paletteTones';
export type TextTone = 'default' | 'muted' | PaletteTone | 'inverse';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export declare const textToneClasses: Record<TextTone, string>;
export declare const textTones: TextTone[];
export declare const textWeightClasses: Record<TextWeight, string>;
export declare const textWeights: TextWeight[];
