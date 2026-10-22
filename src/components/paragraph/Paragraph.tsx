import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { textToneClasses, type TextTone } from '../../utils/text.styles';
import {
  resolveTextTone,
  transformClasses,
  weightClasses,
  type HeadingColor,
  type HeadingTextTransform,
  type HeadingWeight,
} from '../heading/Heading';

export type ParagraphSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ParagraphWeight = HeadingWeight;
export type ParagraphFamily = 'sans';
export type ParagraphColor = HeadingColor | 'text';
export type ParagraphTextTransform = HeadingTextTransform;
export type BodyTextVariant = 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: ParagraphSize;
  weight?: ParagraphWeight;
  family?: ParagraphFamily;
  color?: ParagraphColor;
  tone?: TextTone;
  variant?: BodyTextVariant;
  textTransform?: ParagraphTextTransform;
}
export type BodyTextProps = ParagraphProps;
export type BodyTextTone = TextTone;
export type BodyTextWeight = ParagraphWeight;
const sizes: Record<ParagraphSize, string> = {
  xs: 'text-12 leading-14',
  sm: 'text-13 leading-18',
  md: 'text-15 leading-20',
  lg: 'text-18 leading-22',
  xl: 'text-24 leading-28',
};
const variants: Record<BodyTextVariant, { size: ParagraphSize; weight: ParagraphWeight }> = {
  subtitle1: { size: 'lg', weight: 'medium' },
  subtitle2: { size: 'md', weight: 'medium' },
  body1: { size: 'md', weight: 'regular' },
  body2: { size: 'sm', weight: 'regular' },
  caption: { size: 'xs', weight: 'regular' },
  overline: { size: 'xs', weight: 'medium' },
};
export default function Paragraph({
  size,
  variant = 'body1',
  weight,
  family: _family,
  color,
  tone = 'default',
  textTransform = 'none',
  className,
  children,
  ...props
}: ParagraphProps) {
  const resolvedTone = color ? resolveTextTone(color === 'text' ? 'default' : color) : tone;
  return (
    <p
      className={cn(
        'm-0 font-sans',
        sizes[size ?? variants[variant].size],
        weightClasses[weight ?? variants[variant].weight],
        textToneClasses[resolvedTone],
        transformClasses[textTransform],
        variant === 'overline' && 'uppercase tracking-wider',
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
}
