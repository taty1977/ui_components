export type PaletteTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export const paletteTones: readonly PaletteTone[] = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

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
  bodyText: string;
  outlineText: string;
  buttonText: string;
  mainBorder: string;
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
      'enabled:hover:bg-palette-primary-dark enabled:active:bg-palette-primary-dark enabled:focus:bg-palette-primary-dark enabled:hover:text-palette-primary-contrast-dark enabled:active:text-palette-primary-contrast-dark enabled:focus:text-palette-primary-contrast-dark focus-visible:outline-palette-primary-graphic',
    defaultText: 'text-palette-primary-contrast',
    label: 'bg-palette-primary-opacity-light',
    labelState:
      'enabled:hover:bg-palette-primary-opacity-main enabled:active:bg-palette-primary-opacity-main enabled:focus:bg-palette-primary-opacity-main',
    outline: 'border-palette-primary-graphic',
    text: 'text-palette-primary-text',
    bodyText: 'text-palette-primary-body-text',
    outlineText: 'text-palette-primary-outline-text',
    buttonText: 'text-palette-primary-button-text',
    mainBorder: 'border-palette-primary-main',
    subtleState:
      'enabled:hover:bg-palette-primary-opacity-lighter enabled:active:bg-palette-primary-opacity-lighter enabled:focus:bg-palette-primary-opacity-lighter',
    fieldBorder:
      'border-palette-primary-graphic hover:border-palette-primary-graphic focus-within:border-palette-primary-graphic',
    notchBorder: 'border-palette-primary-graphic group-hover:border-palette-primary-graphic',
  },
  secondary: {
    default: 'bg-palette-secondary-main',
    defaultState:
      'enabled:hover:bg-palette-secondary-dark enabled:active:bg-palette-secondary-dark enabled:focus:bg-palette-secondary-dark enabled:hover:text-palette-secondary-contrast-dark enabled:active:text-palette-secondary-contrast-dark enabled:focus:text-palette-secondary-contrast-dark focus-visible:outline-palette-secondary-graphic',
    defaultText: 'text-palette-secondary-contrast',
    label: 'bg-palette-secondary-opacity-light',
    labelState:
      'enabled:hover:bg-palette-secondary-opacity-main enabled:active:bg-palette-secondary-opacity-main enabled:focus:bg-palette-secondary-opacity-main',
    outline: 'border-palette-secondary-graphic',
    text: 'text-palette-secondary-text',
    bodyText: 'text-palette-secondary-body-text',
    outlineText: 'text-palette-secondary-outline-text',
    buttonText: 'text-palette-secondary-button-text',
    mainBorder: 'border-palette-secondary-main',
    subtleState:
      'enabled:hover:bg-palette-secondary-opacity-lighter enabled:active:bg-palette-secondary-opacity-lighter enabled:focus:bg-palette-secondary-opacity-lighter',
    fieldBorder:
      'border-palette-secondary-graphic hover:border-palette-secondary-graphic focus-within:border-palette-secondary-graphic',
    notchBorder: 'border-palette-secondary-graphic group-hover:border-palette-secondary-graphic',
  },
  error: {
    default: 'bg-palette-error-main',
    defaultState:
      'enabled:hover:bg-palette-error-dark enabled:active:bg-palette-error-dark enabled:focus:bg-palette-error-dark enabled:hover:text-palette-error-contrast-dark enabled:active:text-palette-error-contrast-dark enabled:focus:text-palette-error-contrast-dark focus-visible:outline-palette-error-graphic',
    defaultText: 'text-palette-error-contrast',
    label: 'bg-palette-error-opacity-light',
    labelState:
      'enabled:hover:bg-palette-error-opacity-main enabled:active:bg-palette-error-opacity-main enabled:focus:bg-palette-error-opacity-main',
    outline: 'border-palette-error-graphic',
    text: 'text-palette-error-main',
    bodyText: 'text-palette-error-body-text',
    outlineText: 'text-palette-error-outline-text',
    buttonText: 'text-palette-error-button-text',
    mainBorder: 'border-palette-error-main',
    subtleState:
      'enabled:hover:bg-palette-error-opacity-lighter enabled:active:bg-palette-error-opacity-lighter enabled:focus:bg-palette-error-opacity-lighter',
    fieldBorder:
      'border-palette-error-graphic hover:border-palette-error-graphic focus-within:border-palette-error-graphic',
    notchBorder: 'border-palette-error-graphic group-hover:border-palette-error-graphic',
  },
  warning: {
    default: 'bg-palette-warning-main',
    defaultState:
      'enabled:hover:bg-palette-warning-dark enabled:active:bg-palette-warning-dark enabled:focus:bg-palette-warning-dark enabled:hover:text-palette-warning-contrast-dark enabled:active:text-palette-warning-contrast-dark enabled:focus:text-palette-warning-contrast-dark focus-visible:outline-palette-warning-graphic',
    defaultText: 'text-palette-warning-contrast',
    label: 'bg-palette-warning-opacity-light',
    labelState:
      'enabled:hover:bg-palette-warning-opacity-main enabled:active:bg-palette-warning-opacity-main enabled:focus:bg-palette-warning-opacity-main',
    outline: 'border-palette-warning-graphic',
    text: 'text-palette-warning-main',
    bodyText: 'text-palette-warning-body-text',
    outlineText: 'text-palette-warning-outline-text',
    buttonText: 'text-palette-warning-button-text',
    mainBorder: 'border-palette-warning-main',
    subtleState:
      'enabled:hover:bg-palette-warning-opacity-lighter enabled:active:bg-palette-warning-opacity-lighter enabled:focus:bg-palette-warning-opacity-lighter',
    fieldBorder:
      'border-palette-warning-graphic hover:border-palette-warning-graphic focus-within:border-palette-warning-graphic',
    notchBorder: 'border-palette-warning-graphic group-hover:border-palette-warning-graphic',
  },
  info: {
    default: 'bg-palette-info-main',
    defaultState:
      'enabled:hover:bg-palette-info-dark enabled:active:bg-palette-info-dark enabled:focus:bg-palette-info-dark enabled:hover:text-palette-info-contrast-dark enabled:active:text-palette-info-contrast-dark enabled:focus:text-palette-info-contrast-dark focus-visible:outline-palette-info-graphic',
    defaultText: 'text-palette-info-contrast',
    label: 'bg-palette-info-opacity-light',
    labelState:
      'enabled:hover:bg-palette-info-opacity-main enabled:active:bg-palette-info-opacity-main enabled:focus:bg-palette-info-opacity-main',
    outline: 'border-palette-info-graphic',
    text: 'text-palette-info-main',
    bodyText: 'text-palette-info-body-text',
    outlineText: 'text-palette-info-outline-text',
    buttonText: 'text-palette-info-button-text',
    mainBorder: 'border-palette-info-main',
    subtleState:
      'enabled:hover:bg-palette-info-opacity-lighter enabled:active:bg-palette-info-opacity-lighter enabled:focus:bg-palette-info-opacity-lighter',
    fieldBorder:
      'border-palette-info-graphic hover:border-palette-info-graphic focus-within:border-palette-info-graphic',
    notchBorder: 'border-palette-info-graphic group-hover:border-palette-info-graphic',
  },
  success: {
    default: 'bg-palette-success-main',
    defaultState:
      'enabled:hover:bg-palette-success-dark enabled:active:bg-palette-success-dark enabled:focus:bg-palette-success-dark enabled:hover:text-palette-success-contrast-dark enabled:active:text-palette-success-contrast-dark enabled:focus:text-palette-success-contrast-dark focus-visible:outline-palette-success-graphic',
    defaultText: 'text-palette-success-contrast',
    label: 'bg-palette-success-opacity-light',
    labelState:
      'enabled:hover:bg-palette-success-opacity-main enabled:active:bg-palette-success-opacity-main enabled:focus:bg-palette-success-opacity-main',
    outline: 'border-palette-success-graphic',
    text: 'text-palette-success-main',
    bodyText: 'text-palette-success-body-text',
    outlineText: 'text-palette-success-outline-text',
    buttonText: 'text-palette-success-button-text',
    mainBorder: 'border-palette-success-main',
    subtleState:
      'enabled:hover:bg-palette-success-opacity-lighter enabled:active:bg-palette-success-opacity-lighter enabled:focus:bg-palette-success-opacity-lighter',
    fieldBorder:
      'border-palette-success-graphic hover:border-palette-success-graphic focus-within:border-palette-success-graphic',
    notchBorder: 'border-palette-success-graphic group-hover:border-palette-success-graphic',
  },
};

/** Builds a `Record<PaletteTone, T>` by mapping each tone's centralized styles. */
export const mapPaletteTones = <T>(pick: (styles: PaletteToneStyles) => T): Record<PaletteTone, T> =>
  Object.fromEntries(paletteTones.map((tone) => [tone, pick(paletteToneStyles[tone])])) as Record<PaletteTone, T>;

export type PaletteShade =
  'main' | 'dark' | 'graphic' | 'contrast' | 'text' | 'surface' | 'opacity-light' | 'opacity-main' | 'opacity-lighter';

/** CSS variable reference for a tone shade, e.g. `var(--palette-primary-main)`. */
export const toneVar = (tone: PaletteTone, shade: PaletteShade = 'main'): string => `var(--palette-${tone}-${shade})`;
