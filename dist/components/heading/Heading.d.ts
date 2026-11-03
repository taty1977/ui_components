import type { HTMLAttributes } from 'react';
import { type HeadingStyleOptions, type TextTone, type TypographyWeight, type TextColor, type TextTransform } from '../../utils/text.styles';
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
export default function Heading({ level, variant, weight, family: _family, color, tone, textTransform, className, children, ...props }: HeadingProps): import("react/jsx-runtime").JSX.Element;
