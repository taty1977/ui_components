import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import {
  headingTextClasses,
  resolveHeadingLevel,
  type HeadingStyleOptions,
  type TextTone,
  type TextWeight,
  type TextTransform,
} from '../../utils/text.styles';

export { headingSizeClasses, weightClasses, transformClasses } from '../../utils/text.styles';
export type { HeadingLevel, HeadingVariant } from '../../utils/text.styles';

export type HeadingTone = TextTone;
export type HeadingWeight = TextWeight;
export type HeadingFamily = 'sans';
export type HeadingTextTransform = TextTransform;
export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>, HeadingStyleOptions {
  family?: HeadingFamily;
}

export default function Heading({
  level,
  variant = 'default',
  weight = 'bold',
  family: _family,
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
        headingTextClasses({ level, variant, weight, tone, textTransform }),
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
