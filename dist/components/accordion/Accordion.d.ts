import { type ReactNode } from 'react';
import { type ComponentVariant } from '../../types/variants';
import { type InputSize, type InputTone, type InputVariant } from '../shared/fields/field.styles';
export type AccordionVariant = InputVariant | ComponentVariant;
export type AccordionIconPosition = 'left' | 'right';
export interface AccordionProps {
    items: {
        id: string;
        title: string;
        content?: ReactNode;
    }[];
    className?: string;
    allowMultiple?: boolean;
    collapsedIcon?: ReactNode;
    expandedIcon?: ReactNode;
    iconPosition?: AccordionIconPosition;
    variant?: AccordionVariant;
    tone?: InputTone;
    size?: InputSize;
    children?: ReactNode;
}
export declare function Accordion({ items, className, allowMultiple, collapsedIcon, expandedIcon, iconPosition, variant, tone, size, children, }: AccordionProps): import("react/jsx-runtime").JSX.Element;
export default Accordion;
