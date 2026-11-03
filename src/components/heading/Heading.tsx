import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import {
  headingTextClasses,
  resolveHeadingLevel,
  type HeadingStyleOptions,
  type TextTone,
  type TypographyWeight,
  type TextColor,
  type TextTransform,
} from '../../utils/text.styles';

export { headingSizeClasses, weightClasses, transformClasses, resolveTextTone } from '../../utils/text.styles';
export type { HeadingLevel, HeadingVariant } from '../../utils/text.styles';

export type HeadingTone = TextTone;
export type HeadingWeight = TypographyWeight;
export type HeadingFamily = 'sans';
export type HeadingColor = TextColor;
export type HeadingTextTransform = TextTransform;
export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>, HeadingStyleOptions {
  family?: HeadingFamily;
}

export default function Heading({
  level,
  variant = 'default',
  weight = 'bold',
  family: _family,
  color,
  tone = 'default',
  textTransform = 'none',
  className,
  children,
  ...props
}: HeadingProps) {
  const Tag = resolveHeadingLevel({ level, variant });
  return (
    <Tag
      className={cn(
        'm-0',
        headingTextClasses({ level, variant, weight, color, tone, textTransform }),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
