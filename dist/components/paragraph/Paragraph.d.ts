import type { HTMLAttributes } from 'react';
import { type BodyTextStyleOptions } from '../../utils/text.styles';
export type { BodyTextSize as ParagraphSize, TextTone as ParagraphTone, BodyTextVariant, TextTransform as ParagraphTextTransform, TextWeight as ParagraphWeight, TextWeight as BodyTextWeight, TextTone as BodyTextTone, } from '../../utils/text.styles';
export type { ParagraphProps as BodyTextProps };
export type ParagraphFamily = 'sans';
export interface ParagraphProps extends Omit<HTMLAttributes<HTMLParagraphElement>, 'color'>, BodyTextStyleOptions {
    family?: ParagraphFamily;
}
export default function Paragraph({ size, variant, weight, family: _family, tone, textTransform, className, children, ...props }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
