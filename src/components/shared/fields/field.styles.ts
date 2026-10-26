import { cva } from 'class-variance-authority';
import { mapPaletteTones, type PaletteTone } from '../../../themes/paletteTones';
import { cn } from '../../../utils/cn';
import { resolveVariantTone } from '../../../types/variants';

export type InputTone = PaletteTone;
export type InputAppearance = 'outlined' | 'filled' | 'standard';
export type InputVariant = InputAppearance | 'primary' | 'secondary';
export type InputSize = 'small' | 'normal';

export function floatingLabelClasses({
  appearance,
  floating,
  visible,
  iconLeft = false,
  size = 'normal',
  multiline = false,
}: {
  appearance: InputAppearance;
  floating: boolean;
  visible: boolean;
  iconLeft?: boolean;
  size?: InputSize | number;
  multiline?: boolean;
}): string {
  let position: string;
  if (!visible) {
    position = 'sr-only';
  } else if (floating && appearance === 'outlined') {
    position = 'left-3 -top-2 px-1 text-13 bg-background-surface';
  } else if (floating && appearance === 'filled') {
    position = 'left-4 top-1 text-13 leading-14';
  } else if (multiline) {
    position = 'left-4 top-2';
  } else {
    const inset = iconLeft ? (size === 'small' ? 'left-9' : 'left-[42px]') : 'left-4';
    position = cn('top-1/2 -translate-y-1/2 text-inherit', inset);
  }
  return cn(
    'pointer-events-none absolute z-10 mb-0 transition-all',
    position,
    !multiline && !floating && appearance !== 'outlined' && 'mt-[0.5px] group-focus-within:mt-px',
  );
}

export function resolveFieldVariant(
  variant: InputVariant,
  tone: InputTone,
  error?: string,
): { appearance: InputAppearance; accent: InputTone } {
  const appearance = variant === 'primary' || variant === 'secondary' ? 'outlined' : variant;
  const accent = error ? 'error' : resolveVariantTone(variant, tone);
  return { appearance, accent };
}

export const toneClasses: Record<InputTone, string> = mapPaletteTones((s) => s.fieldBorder);
export const toneTextClasses: Record<InputTone, string> = mapPaletteTones((s) => s.text);
export function resolveFieldLabelTone({
  disabled,
  error,
  active,
  accent,
}: {
  disabled?: boolean;
  error?: string;
  active: boolean;
  accent: InputTone;
}): string {
  if (disabled) return 'text-text-disabled';
  if (error) return toneTextClasses.error;
  if (active) return toneTextClasses[accent];
  return 'text-text-secondary';
}

export const notchToneClasses: Record<InputTone, string> = mapPaletteTones((s) => s.notchBorder);
export const fieldStyles = cva(
  'relative flex w-full items-center font-sans text-text-primary outline-none transition-colors',
  {
    variants: {
      variant: {
        outlined: 'rounded-md border bg-background-surface focus-within:border-2',
        filled: 'rounded-t-md border-b bg-action-hover focus-within:border-b-2',
        standard: 'border-b bg-transparent focus-within:border-b-2',
      },
      size: { small: 'min-h-11 gap-2 px-4 text-15', normal: 'min-h-12 gap-2.5 px-4 text-18' },
      disabled: { true: 'cursor-not-allowed border-text-disabled text-text-disabled', false: '' },
      iconLeft: { true: '', false: '' },
      iconRight: { true: '', false: '' },
      notched: { true: 'border-0 focus-within:border-0', false: '' },
    },
    compoundVariants: [
      { size: 'small', iconLeft: true, class: 'pl-2' },
      { size: 'normal', iconLeft: true, class: 'pl-3' },
      { size: 'small', iconRight: true, class: 'pr-2' },
      { size: 'normal', iconRight: true, class: 'pr-3' },
    ],
    defaultVariants: { variant: 'outlined', size: 'normal', disabled: false, notched: false },
  },
);
export const fieldInputClasses =
  'w-full min-w-0 flex-1 border-0 bg-transparent py-2 font-sans text-inherit leading-5 outline-none placeholder:text-text-secondary disabled:cursor-not-allowed disabled:text-text-disabled';
export const fieldCenterAlignmentClasses: Record<InputAppearance, string> = {
  outlined: '',
  filled: 'relative top-[0.5px] group-focus-within:top-px',
  standard: 'relative top-[0.5px] group-focus-within:top-px',
};
export const labelClasses = 'mb-1 block font-sans text-13 font-medium text-text-secondary';
export const errorClasses = 'mt-1 font-sans text-13 text-palette-error-main';
export const optionListClasses =
  'absolute z-20 mt-2 max-h-64 w-full overflow-auto rounded-md border border-border-subtle bg-background-surface py-2 font-sans text-15 text-text-primary shadow-lg';
