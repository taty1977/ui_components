export type PaletteTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export const paletteTones: readonly PaletteTone[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];

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

// Tailwind only generates classes it finds as complete literals, so every class stays spelled out.
export const paletteToneStyles: Record<PaletteTone, PaletteToneStyles> = {
  primary: {
    default: 'bg-palette-primary-main',
    defaultState:
      'enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-primary-opacity-light',
    labelState:
      'enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main',
    outline: 'border-palette-primary-main',
    text: 'text-palette-primary-main',
    subtleState:
      'enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter',
    fieldBorder:
      'border-palette-primary-main hover:border-palette-primary-dark focus-within:border-palette-primary-main',
    notchBorder: 'border-palette-primary-main group-hover:border-palette-primary-dark',
  },
  secondary: {
    default: 'bg-palette-secondary-main',
    defaultState:
      'enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-secondary-opacity-light',
    labelState:
      'enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main',
    outline: 'border-palette-secondary-main',
    text: 'text-palette-secondary-main',
    subtleState:
      'enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter',
    fieldBorder:
      'border-palette-secondary-main hover:border-palette-secondary-dark focus-within:border-palette-secondary-main',
    notchBorder: 'border-palette-secondary-main group-hover:border-palette-secondary-dark',
  },
  error: {
    default: 'bg-palette-error-main',
    defaultState:
      'enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-error-opacity-light',
    labelState:
      'enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main',
    outline: 'border-palette-error-main',
    text: 'text-palette-error-main',
    subtleState:
      'enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter',
    fieldBorder:
      'border-palette-error-main hover:border-palette-error-dark focus-within:border-palette-error-main',
    notchBorder: 'border-palette-error-main group-hover:border-palette-error-dark',
  },
  warning: {
    default: 'bg-palette-warning-main',
    defaultState:
      'enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-warning-opacity-light',
    labelState:
      'enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main',
    outline: 'border-palette-warning-main',
    text: 'text-palette-warning-main',
    subtleState:
      'enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter',
    fieldBorder:
      'border-palette-warning-main hover:border-palette-warning-dark focus-within:border-palette-warning-main',
    notchBorder: 'border-palette-warning-main group-hover:border-palette-warning-dark',
  },
  info: {
    default: 'bg-palette-info-main',
    defaultState:
      'enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-info-opacity-light',
    labelState:
      'enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main',
    outline: 'border-palette-info-main',
    text: 'text-palette-info-main',
    subtleState:
      'enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter',
    fieldBorder:
      'border-palette-info-main hover:border-palette-info-dark focus-within:border-palette-info-main',
    notchBorder: 'border-palette-info-main group-hover:border-palette-info-dark',
  },
  success: {
    default: 'bg-palette-success-main',
    defaultState:
      'enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark',
    defaultText: 'text-misc-bg-white',
    label: 'bg-palette-success-opacity-light',
    labelState:
      'enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main',
    outline: 'border-palette-success-main',
    text: 'text-palette-success-main',
    subtleState:
      'enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter',
    fieldBorder:
      'border-palette-success-main hover:border-palette-success-dark focus-within:border-palette-success-main',
    notchBorder: 'border-palette-success-main group-hover:border-palette-success-dark',
  },
};

/** Builds a `Record<PaletteTone, T>` by mapping each tone's centralized styles. */
export const mapPaletteTones = <T>(pick: (styles: PaletteToneStyles) => T): Record<PaletteTone, T> =>
  Object.fromEntries(paletteTones.map((tone) => [tone, pick(paletteToneStyles[tone])])) as Record<
    PaletteTone,
    T
  >;

export type PaletteShade = 'main' | 'dark' | 'opacity-light' | 'opacity-main' | 'opacity-lighter';

/** CSS variable reference for a tone shade, e.g. `var(--palette-primary-main)`. */
export const toneVar = (tone: PaletteTone, shade: PaletteShade = 'main'): string =>
  `var(--palette-${tone}-${shade})`;
