import { type PaletteTone } from '../themes/paletteTones';
export type TextTone = 'default' | 'muted' | PaletteTone | 'inverse';
export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';
export type TypographyWeight = TextWeight | 'normal' | 'semiBold' | 'light' | 'extraBold';
export type TextColor = TextTone | 'title' | 'Primary' | 'Secondary' | 'danger';
export type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
export type BodyTextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type BodyTextVariant = 'subtitle1' | 'subtitle2' | 'body1' | 'body2' | 'caption' | 'overline';
export type BodyTextColor = TextColor | 'text';
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingVariant = HeadingLevel | 'default';
export type LinkUnderline = 'always' | 'hover' | 'none';
export interface HeadingStyleOptions {
    level?: HeadingLevel;
    variant?: HeadingVariant;
    weight?: TypographyWeight;
    color?: TextColor;
    tone?: TextTone;
    textTransform?: TextTransform;
}
export interface BodyTextStyleOptions {
    size?: BodyTextSize;
    variant?: BodyTextVariant;
    weight?: TypographyWeight;
    color?: BodyTextColor;
    tone?: TextTone;
    textTransform?: TextTransform;
}
export interface LinkStyleOptions extends BodyTextStyleOptions {
    underline?: LinkUnderline;
}
export declare const textToneClasses: Record<TextTone, string>;
export declare const textTones: TextTone[];
export declare const textWeightClasses: Record<TextWeight, string>;
export declare const textWeights: TextWeight[];
export declare const weightClasses: Record<TypographyWeight, string>;
export declare const transformClasses: Record<TextTransform, string>;
export declare function resolveTextTone(color: TextColor): TextTone;
export declare function bodyTextClasses({ size, variant, weight, color, tone, textTransform, }?: BodyTextStyleOptions): string;
export declare const headingSizeClasses: Record<HeadingLevel, string>;
export declare function resolveHeadingLevel({ level, variant }?: HeadingStyleOptions): HeadingLevel;
export declare function headingTextClasses({ level, variant, weight, color, tone, textTransform, }?: HeadingStyleOptions): string;
export declare function linkTextClasses({ underline, ...textOptions }?: LinkStyleOptions): string;
