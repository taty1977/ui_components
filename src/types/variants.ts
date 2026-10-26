import type { PaletteTone } from '../themes/paletteTones';

export type ComponentVariant = 'default' | 'label' | 'outline' | 'text' | 'primary' | 'secondary';
export type ComponentAppearance = 'solid' | 'label' | 'outline' | 'text';

export const componentVariantAppearances = {
  default: 'solid',
  label: 'label',
  outline: 'outline',
  text: 'text',
  primary: 'solid',
  secondary: 'solid',
  outlined: 'outline',
  filled: 'solid',
  standard: 'text',
} as const satisfies Record<ComponentVariant | 'outlined' | 'filled' | 'standard', ComponentAppearance>;

export function resolveVariantTone(variant: keyof typeof componentVariantAppearances, tone: PaletteTone): PaletteTone {
  return variant === 'primary' || variant === 'secondary' ? variant : tone;
}
