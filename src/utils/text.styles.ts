import { mapPaletteTones, type PaletteTone } from '../themes/paletteTones';
import { cn } from './cn';

export type TextTone = 'default' | 'muted' | PaletteTone | 'inverse';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'semiBold' | 'light' | 'extraBold';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type BodyTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BodyTextVariant = 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = HeadingLevel | 'default';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface HeadingStyleOptions {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  weight?: TextWeight;
  tone?: TextTone;
  textTransform?: TextTransform;
}

export interface BodyTextStyleOptions {
  size?: BodyTextSize;
  variant?: BodyTextVariant;
  weight?: TextWeight;
  tone?: TextTone;
  textTransform?: TextTransform;
}

export interface LinkStyleOptions extends BodyTextStyleOptions {
  underline?: LinkUnderline;
}

export const textToneClasses: Record<TextTone, string> = {
  default: 'text-text-primary',
  muted: 'text-text-secondary',
  ...mapPaletteTones((s) => s.text),
  inverse: 'text-misc-bg-white',
};
export const textTones = Object.keys(textToneClasses) as TextTone[];

// Keep controls focused on canonical weights while accepting legacy aliases below.
export const textWeightClasses = {
  regular: 'font-regular',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
} satisfies Partial<Record<TextWeight, string>>;
export const textWeights = Object.keys(textWeightClasses) as TextWeight[];

export const weightClasses: Record<TextWeight, string> = {
  ...textWeightClasses,
  semiBold: 'font-semibold',
  light: 'font-light',
  extraBold: 'font-extrabold',
};
export const transformClasses: Record<TextTransform, string> = {
  none: 'normal-case',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
};

const bodyTextSizes: Record<BodyTextSize, string> = {
  xs: 'text-12 leading-14',
  sm: 'text-13 leading-18',
  md: 'text-15 leading-20',
  lg: 'text-18 leading-22',
  xl: 'text-24 leading-28',
};
const bodyTextVariants: Record<BodyTextVariant, { size: BodyTextSize; weight: TextWeight }> = {
  subtitle1: { size: 'lg', weight: 'medium' },
  subtitle2: { size: 'md', weight: 'medium' },
  body1: { size: 'md', weight: 'regular' },
  body2: { size: 'sm', weight: 'regular' },
  caption: { size: 'xs', weight: 'regular' },
  overline: { size: 'xs', weight: 'medium' },
};

export const headingSizeClasses: Record<HeadingLevel, string> = {
  h1: 'text-46 leading-56',
  h2: 'text-38 leading-42',
  h3: 'text-28 leading-38',
  h4: 'text-24 leading-28',
  h5: 'text-18 leading-22',
  h6: 'text-15 leading-20',
};

const linkUnderlineClasses: Record<LinkUnderline, string> = {
  always: 'underline',
  hover: 'no-underline hover:underline focus-visible:underline',
  none: 'no-underline',
};

export function resolveHeadingLevel({ level, variant = 'default' }: HeadingStyleOptions = {}): HeadingLevel {
  return level ?? (variant === 'default' ? 'h4' : variant);
}

export function bodyTextClasses({
  size,
  variant = 'body1',
  weight,
  tone = 'default',
  textTransform = 'none',
}: BodyTextStyleOptions = {}) {
  const defaults = bodyTextVariants[variant];

  return cn(
    'font-sans',
    bodyTextSizes[size ?? defaults.size],
    weightClasses[weight ?? defaults.weight],
    textToneClasses[tone],
    transformClasses[textTransform],
    // Overline stays uppercase even when another transform is requested.
    variant === 'overline' && 'uppercase tracking-wider',
  );
}

export function headingTextClasses({
  level,
  variant,
  weight = 'bold',
  tone = 'default',
  textTransform = 'none',
}: HeadingStyleOptions = {}) {
  return cn(
    'font-sans',
    headingSizeClasses[resolveHeadingLevel({ level, variant })],
    weightClasses[weight],
    textToneClasses[tone],
    transformClasses[textTransform],
  );
}

export function linkTextClasses({ underline = 'always', ...textOptions }: LinkStyleOptions = {}) {
  return cn(
    bodyTextClasses(textOptions),
    'rounded-sm underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
    linkUnderlineClasses[underline],
  );
}
