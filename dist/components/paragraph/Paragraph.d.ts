import type { HTMLAttributes } from 'react';
import { type BodyTextStyleOptions } from '../../utils/text.styles';
export type { BodyTextSize as ParagraphSize, BodyTextColor as ParagraphColor, BodyTextVariant, TextTransform as ParagraphTextTransform, TypographyWeight as ParagraphWeight, TypographyWeight as BodyTextWeight, TextTone as BodyTextTone, } from '../../utils/text.styles';
export type { ParagraphProps as BodyTextProps };
export type ParagraphFamily = 'sans';
export interface ParagraphProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>, BodyTextStyleOptions {
    family?: ParagraphFamily;
}
export default function Paragraph({ size, variant, weight, family: _family, color, tone, textTransform, className, children, ...props }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
