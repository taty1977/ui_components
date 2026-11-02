import { type HTMLAttributes, type ReactNode } from 'react';
import { type ComponentVariant } from '../../types/variants';
import { type ButtonTone } from '../button/button.styles';
export interface MenuItem {
    label: ReactNode;
    onSelect?: () => void;
    icon?: ReactNode;
    disabled?: boolean;
    dividerBefore?: boolean;
}
export interface MenuProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
    label?: string;
    items: MenuItem[];
    triggerIcon?: ReactNode;
    triggerAriaLabel?: string;
    variant?: ComponentVariant;
    tone?: ButtonTone;
    disabled?: boolean;
    menuClassName?: string;
}
export default function Menu({ label, items, triggerIcon, triggerAriaLabel, variant, tone, disabled, className, menuClassName, ...props }: MenuProps): import("react/jsx-runtime").JSX.Element;
