import { type ReactNode } from 'react';
export type AccordionVariant = 'default' | 'primary' | 'secondary';
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
    children?: ReactNode;
}
export declare function Accordion({ items, className, allowMultiple, collapsedIcon, expandedIcon, iconPosition, variant, children, }: AccordionProps): import("react/jsx-runtime").JSX.Element;
export default Accordion;
