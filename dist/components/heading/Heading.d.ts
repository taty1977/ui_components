import type { HTMLAttributes } from 'react';
import { type TextTone, type TextWeight } from '../../utils/text.styles';
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
export declare const headingSizeClasses: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
};
export declare const weightClasses: Record<HeadingWeight, string>;
export declare const transformClasses: {
    none: string;
    capitalize: string;
    uppercase: string;
    lowercase: string;
};
export declare const resolveTextTone: (color: HeadingColor) => TextTone;
export default function Heading({ level, variant, weight, family: _family, color, tone, textTransform, className, children, ...props }: HeadingProps): import("react/jsx-runtime").JSX.Element;
