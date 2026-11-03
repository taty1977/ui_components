import { type HTMLAttributes, type ReactNode } from 'react';
export interface NavbarLink {
    label: string;
    href: string;
}
export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    brand: ReactNode;
    links: NavbarLink[];
    brandHref?: string;
    activeHref?: string;
    ariaLabel?: string;
}
export default function Navbar({ brand, links, brandHref, activeHref, ariaLabel, className, ...props }: NavbarProps): import("react/jsx-runtime").JSX.Element;
