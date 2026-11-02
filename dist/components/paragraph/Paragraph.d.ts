import type { HTMLAttributes } from 'react';
import { type TextTone } from '../../utils/text.styles';
import { type HeadingColor, type HeadingTextTransform, type HeadingWeight } from '../heading/Heading';
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
export default function Paragraph({ size, variant, weight, family: _family, color, tone, textTransform, className, children, ...props }: ParagraphProps): import("react/jsx-runtime").JSX.Element;
