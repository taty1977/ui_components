import { mapPaletteTones, type PaletteTone } from '../themes/paletteTones';
import { cn } from './cn';

export type TextTone = 'default' | 'muted' | PaletteTone | 'inverse';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyWeight = TextWeight | 'normal' | 'semiBold' | 'light' | 'extraBold';
export type TextColor = TextTone | 'title' | 'Primary' | 'Secondary' | 'danger';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type BodyTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BodyTextVariant = 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
export type BodyTextColor = TextColor | 'text';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = HeadingLevel | 'default';
export type LinkUnderline = 'always' | 'hover' | 'none';

export interface HeadingStyleOptions {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  weight?: TypographyWeight;
  color?: TextColor;
  tone?: TextTone;
  textTransform?: TextTransform;
}

export interface BodyTextStyleOptions {
  size?: BodyTextSize;
  variant?: BodyTextVariant;
  weight?: TypographyWeight;
  color?: BodyTextColor;
  tone?: TextTone;
  textTransform?: TextTransform;
}

export interface LinkStyleOptions extends BodyTextStyleOptions {
  underline?: LinkUnderline;
}

export const textToneClasses: Record<TextTone, string> = {
  default: 'text-text-primary',
  muted: 'text-text-secondary',
  ...mapPaletteTones((s) => s.bodyText),
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

export const weightClasses: Record<TypographyWeight, string> = {
  ...textWeightClasses,
  normal: 'font-regular',
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
export function resolveTextTone(color: TextColor): TextTone {
  switch (color) {
    case 'title':
      return 'default';
    case 'Primary':
      return 'primary';
    case 'Secondary':
      return 'secondary';
    case 'danger':
      return 'error';
    default:
      return color;
  }
}

const bodyTextSizes: Record<BodyTextSize, string> = {
  xs: 'text-12 leading-14',
  sm: 'text-13 leading-18',
  md: 'text-15 leading-20',
  lg: 'text-18 leading-22',
  xl: 'text-24 leading-28',
};
const bodyTextVariants: Record<BodyTextVariant, { size: BodyTextSize; weight: TypographyWeight }> = {
  subtitle1: { size: 'lg', weight: 'medium' },
  subtitle2: { size: 'md', weight: 'medium' },
  body1: { size: 'md', weight: 'regular' },
  body2: { size: 'sm', weight: 'regular' },
  caption: { size: 'xs', weight: 'regular' },
  overline: { size: 'xs', weight: 'medium' },
};
export function bodyTextClasses({
  size,
  variant = 'body1',
  weight,
  color,
  tone = 'default',
  textTransform = 'none',
}: BodyTextStyleOptions = {}) {
  const resolvedTone = color ? resolveTextTone(color === 'text' ? 'default' : color) : tone;
  return cn(
    'font-sans',
    bodyTextSizes[size ?? bodyTextVariants[variant].size],
    weightClasses[weight ?? bodyTextVariants[variant].weight],
    textToneClasses[resolvedTone],
    transformClasses[textTransform],
    variant === 'overline' && 'uppercase tracking-wider',
  );
}

export const headingSizeClasses: Record<HeadingLevel, string> = {
  h1: 'text-46 leading-56',
  h2: 'text-38 leading-42',
  h3: 'text-28 leading-38',
  h4: 'text-24 leading-28',
  h5: 'text-18 leading-22',
  h6: 'text-15 leading-20',
};

export function resolveHeadingLevel({ level, variant = 'default' }: HeadingStyleOptions = {}): HeadingLevel {
  return level ?? (variant === 'default' ? 'h4' : variant);
}

export function headingTextClasses({
  level,
  variant,
  weight = 'bold',
  color,
  tone = 'default',
  textTransform = 'none',
}: HeadingStyleOptions = {}) {
  return cn(
    'font-sans',
    headingSizeClasses[resolveHeadingLevel({ level, variant })],
    weightClasses[weight],
    textToneClasses[color ? resolveTextTone(color) : tone],
    transformClasses[textTransform],
  );
}

const linkUnderlineClasses: Record<LinkUnderline, string> = {
  always: 'underline',
  hover: 'no-underline hover:underline focus-visible:underline',
  none: 'no-underline',
};

export function linkTextClasses({ underline = 'always', ...textOptions }: LinkStyleOptions = {}) {
  return cn(
    bodyTextClasses(textOptions),
    'rounded-sm underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
    linkUnderlineClasses[underline],
  );
}
