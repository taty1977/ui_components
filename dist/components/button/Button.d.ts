import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type ButtonSize, type ButtonTone, type ButtonVariant } from './button.styles';
export type { ButtonSize, ButtonTone, ButtonVariant } from './button.styles';
export type ButtonWidth = 'default' | 'auto' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonShape = 'rectangle' | 'pill';
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
    size?: ButtonSize;
    width?: ButtonWidth;
    variant?: ButtonVariant;
    tone?: ButtonTone;
    outline?: boolean;
    shape?: ButtonShape;
}
export default function Button({ className, label, iconLeft, iconRight, size, width, variant, tone, outline, shape, children, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
