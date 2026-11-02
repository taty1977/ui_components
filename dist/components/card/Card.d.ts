import type { HTMLAttributes, ReactNode } from 'react';
import { type ComponentVariant } from '../../types/variants';
import { type ButtonTone } from '../button/button.styles';
export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    title?: ReactNode;
    description?: ReactNode;
    actions?: ReactNode;
    variant?: ComponentVariant;
    tone?: ButtonTone;
    headerClassName?: string;
    contentClassName?: string;
}
export default function Card({ title, description, actions, variant, tone, className, headerClassName, contentClassName, children, ...props }: CardProps): import("react/jsx-runtime").JSX.Element;
