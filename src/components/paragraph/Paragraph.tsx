import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { bodyTextClasses, type BodyTextStyleOptions } from '../../utils/text.styles';
export type {
  BodyTextSize as ParagraphSize,
  BodyTextColor as ParagraphColor,
  BodyTextVariant,
  TextTransform as ParagraphTextTransform,
  TypographyWeight as ParagraphWeight,
  TypographyWeight as BodyTextWeight,
  TextTone as BodyTextTone,
} from '../../utils/text.styles';
export type { ParagraphProps as BodyTextProps };

export type ParagraphFamily = 'sans';
export interface ParagraphProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>, BodyTextStyleOptions {
  // Compatibility prop; shared typography always uses the sans family.
  family?: ParagraphFamily;
}

export default function Paragraph({
  size,
  variant,
  weight,
  family: _family,
  color,
  tone,
  textTransform,
  className,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn('m-0', bodyTextClasses({ size, variant, weight, color, tone, textTransform }), className)}
      {...props}
    >
      {children}
    </p>
  );
}
