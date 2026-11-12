import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type ComponentVariant, type ComponentWidth, type ComponentShape } from '../../types/variants';
import { type ButtonSize, type ButtonTone } from './button.styles';
export type { ButtonSize, ButtonTone } from './button.styles';
export type { ComponentVariant as ButtonVariant, ComponentWidth as ButtonWidth, ComponentShape as ButtonShape, } from '../../types/variants';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: ButtonSize;
    width?: ComponentWidth;
    variant?: ComponentVariant;
    tone?: ButtonTone;
    outline?: boolean;
    shape?: ComponentShape;
}
export default function Button({ className, label, iconLeft, iconRight, size, width, variant, tone, outline, shape, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
