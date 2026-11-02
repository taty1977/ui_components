import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { type ComponentVariant } from '../../types/variants';
import { type ButtonTone } from '../button/button.styles';
export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonShape = 'circular' | 'square';
export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    children: ReactNode;
    size?: IconButtonSize;
    shape?: IconButtonShape;
    variant?: ComponentVariant;
    tone?: ButtonTone;
}
export default function IconButton({ children, className, size, shape, variant, tone, type, ...props }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
