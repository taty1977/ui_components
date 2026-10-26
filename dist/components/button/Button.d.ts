import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type ComponentVariant } from '../../types/variants';
import { type ButtonSize, type ButtonTone } from './button.styles';
export type { ButtonSize, ButtonTone } from './button.styles';
export type { ComponentVariant as ButtonVariant } from '../../types/variants';
export type ButtonWidth = 'default' | 'auto' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonShape = 'rectangle' | 'pill';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: ButtonSize;
    width?: ButtonWidth;
    variant?: ComponentVariant;
    tone?: ButtonTone;
    outline?: boolean;
    shape?: ButtonShape;
}
export default function Button({ className, label, iconLeft, iconRight, size, width, variant, tone, outline, shape, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
