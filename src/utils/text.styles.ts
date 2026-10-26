import { mapPaletteTones, type PaletteTone } from '../themes/paletteTones';

export type TextTone = 'default' | 'muted' | PaletteTone | 'inverse';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export const textToneClasses: Record<TextTone, string> = {
  default: 'text-text-primary',
  muted: 'text-text-secondary',
  ...mapPaletteTones((s) => s.text),
  inverse: 'text-misc-bg-white',
};
export const textTones = Object.keys(textToneClasses) as TextTone[];
export const textWeightClasses: Record<TextWeight, string> = {
  regular: 'font-regular',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};
export const textWeights = Object.keys(textWeightClasses) as TextWeight[];
