import { cva } from 'class-variance-authority';
import { mapPaletteTones, type PaletteTone } from '../../themes/paletteTones';

export type ButtonTone = PaletteTone;
export type { ComponentVariant as ButtonVariant } from '../../types/variants';
export type ButtonSize = 'default' | 'sm' | 'md' | 'lg';

export const buttonStyles = cva(
  'inline-flex box-border items-center justify-center rounded-md font-sans font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
  {
    variants: {
      size: {
        default: 'min-h-11 gap-2 px-4 text-15',
        sm: 'min-h-9 gap-1.5 px-3 text-13',
        md: 'min-h-11 gap-2 px-4 text-15',
        lg: 'min-h-12 gap-2.5 px-6 text-18',
      },
      shape: { rectangle: 'rounded-md', pill: 'rounded-full' },
      width: { default: 'w-auto', auto: 'w-auto', sm: 'w-32', md: 'w-48', lg: 'w-64', full: 'w-full' },
    },
    defaultVariants: { size: 'md', shape: 'rectangle', width: 'default' },
  },
);

export const toneClasses: Record<ButtonTone, { solid: string; label: string; outline: string; text: string }> =
  mapPaletteTones((s) => ({
    solid: `${s.default} ${s.defaultText} ${s.defaultState}`,
    label: `${s.label} ${s.text} ${s.labelState}`,
    outline: `border bg-transparent ${s.outline} ${s.text} ${s.subtleState}`,
    text: `bg-transparent ${s.text} ${s.subtleState}`,
  }));
