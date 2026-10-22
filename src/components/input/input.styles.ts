import { cva } from 'class-variance-authority';
export type InputTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type InputAppearance = 'outlined' | 'filled' | 'standard';
export type InputVariant = InputAppearance | 'primary' | 'secondary';
export type InputSize = 'small' | 'normal';

export function resolveFieldVariant(
  variant: InputVariant,
  tone: InputTone,
  error?: string,
): { appearance: InputAppearance; accent: InputTone } {
  if (variant === 'primary' || variant === 'secondary') {
    return { appearance: 'outlined', accent: error ? 'error' : variant };
  }
  return { appearance: variant, accent: error ? 'error' : tone };
}

export const toneClasses: Record<InputTone, string> = {
  primary: 'border-palette-primary-main hover:border-palette-primary-dark focus-within:border-palette-primary-main',
  secondary:
    'border-palette-secondary-main hover:border-palette-secondary-dark focus-within:border-palette-secondary-main',
  error: 'border-palette-error-main hover:border-palette-error-dark focus-within:border-palette-error-main',
  warning: 'border-palette-warning-main hover:border-palette-warning-dark focus-within:border-palette-warning-main',
  info: 'border-palette-info-main hover:border-palette-info-dark focus-within:border-palette-info-main',
  success: 'border-palette-success-main hover:border-palette-success-dark focus-within:border-palette-success-main',
};
export const toneTextClasses: Record<InputTone, string> = {
  primary: 'text-palette-primary-main',
  secondary: 'text-palette-secondary-main',
  error: 'text-palette-error-main',
  warning: 'text-palette-warning-main',
  info: 'text-palette-info-main',
  success: 'text-palette-success-main',
};
export const notchToneClasses: Record<InputTone, string> = {
  primary: 'border-palette-primary-main group-hover:border-palette-primary-dark',
  secondary: 'border-palette-secondary-main group-hover:border-palette-secondary-dark',
  error: 'border-palette-error-main group-hover:border-palette-error-dark',
  warning: 'border-palette-warning-main group-hover:border-palette-warning-dark',
  info: 'border-palette-info-main group-hover:border-palette-info-dark',
  success: 'border-palette-success-main group-hover:border-palette-success-dark',
};
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
