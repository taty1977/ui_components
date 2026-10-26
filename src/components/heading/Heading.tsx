import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { textToneClasses, textWeightClasses, type TextTone, type TextWeight } from '../../utils/text.styles';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = HeadingLevel;
export type HeadingTone = TextTone;
export type HeadingWeight = TextWeight | 'normal' | 'semiBold' | 'light' | 'extraBold';
export type HeadingFamily = 'sans';
export type HeadingColor = TextTone | 'title' | 'Primary' | 'Secondary' | 'danger';
export type HeadingTextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  variant?: HeadingLevel;
  tone?: TextTone;
  weight?: HeadingWeight;
  family?: HeadingFamily;
  color?: HeadingColor;
  textTransform?: HeadingTextTransform;
}

export const headingSizeClasses = {
  h1: 'text-46 leading-56',
  h2: 'text-38 leading-42',
  h3: 'text-28 leading-38',
  h4: 'text-24 leading-28',
  h5: 'text-18 leading-22',
  h6: 'text-15 leading-20',
};
export const weightClasses: Record<HeadingWeight, string> = {
  ...textWeightClasses,
  normal: 'font-regular',
  semiBold: 'font-semibold',
  light: 'font-light',
  extraBold: 'font-extrabold',
};
export const transformClasses = {
  none: 'normal-case',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
};
export function resolveTextTone(color: HeadingColor): TextTone {
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

export default function Heading({
  level,
  variant = 'h4',
  weight = 'bold',
  family: _family,
  color,
  tone = 'default',
  textTransform = 'none',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = level ?? variant;
  return (
    <Tag
      className={cn(
        'm-0 font-sans',
        headingSizeClasses[Tag],
        weightClasses[weight],
        textToneClasses[color ? resolveTextTone(color) : tone],
        transformClasses[textTransform],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
