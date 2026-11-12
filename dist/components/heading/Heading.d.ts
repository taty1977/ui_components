import type { HTMLAttributes } from 'react';
import { type HeadingStyleOptions, type TextTone, type TextWeight, type TextTransform } from '../../utils/text.styles';
export { headingSizeClasses, weightClasses, transformClasses } from '../../utils/text.styles';
export type { HeadingLevel, HeadingVariant } from '../../utils/text.styles';
export type HeadingTone = TextTone;
export type HeadingWeight = TextWeight;
export type HeadingFamily = 'sans';
export type HeadingTextTransform = TextTransform;
export interface HeadingProps extends Omit<HTMLAttributes<HTMLHeadingElement>, 'color'>, HeadingStyleOptions {
    family?: HeadingFamily;
}
export default function Heading({ level, variant, weight, family: _family, tone, textTransform, className, children, ...props }: HeadingProps): import("react/jsx-runtime").JSX.Element;
