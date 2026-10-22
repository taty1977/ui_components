import { cva } from 'class-variance-authority';

export type ButtonTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ButtonVariant = 'default' | 'label' | 'outline' | 'text' | 'primary' | 'secondary';
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

export const toneClasses: Record<ButtonTone, { solid: string; label: string; outline: string; text: string }> = {
  primary: {
    solid:
      'bg-palette-primary-main text-misc-bg-white enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark',
    label:
      'bg-palette-primary-opacity-light text-palette-primary-main enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main',
    outline:
      'border bg-transparent border-palette-primary-main text-palette-primary-main enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter',
    text: 'bg-transparent text-palette-primary-main enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter',
  },
  secondary: {
    solid:
      'bg-palette-secondary-main text-misc-bg-white enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark',
    label:
      'bg-palette-secondary-opacity-light text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main',
    outline:
      'border bg-transparent border-palette-secondary-main text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter',
    text: 'bg-transparent text-palette-secondary-main enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter',
  },
  error: {
    solid:
      'bg-palette-error-main text-misc-bg-white enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark',
    label:
      'bg-palette-error-opacity-light text-palette-error-main enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main',
    outline:
      'border bg-transparent border-palette-error-main text-palette-error-main enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter',
    text: 'bg-transparent text-palette-error-main enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter',
  },
  warning: {
    solid:
      'bg-palette-warning-main text-misc-bg-white enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark',
    label:
      'bg-palette-warning-opacity-light text-palette-warning-main enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main',
    outline:
      'border bg-transparent border-palette-warning-main text-palette-warning-main enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter',
    text: 'bg-transparent text-palette-warning-main enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter',
  },
  info: {
    solid:
      'bg-palette-info-main text-misc-bg-white enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark',
    label:
      'bg-palette-info-opacity-light text-palette-info-main enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main',
    outline:
      'border bg-transparent border-palette-info-main text-palette-info-main enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter',
    text: 'bg-transparent text-palette-info-main enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter',
  },
  success: {
    solid:
      'bg-palette-success-main text-misc-bg-white enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark',
    label:
      'bg-palette-success-opacity-light text-palette-success-main enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main',
    outline:
      'border bg-transparent border-palette-success-main text-palette-success-main enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter',
    text: 'bg-transparent text-palette-success-main enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter',
  },
};
