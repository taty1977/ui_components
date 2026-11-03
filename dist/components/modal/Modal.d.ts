import { type HTMLAttributes, type ReactNode } from 'react';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';
interface ModalBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    open: boolean;
    onClose: () => void;
    description?: ReactNode;
    children: ReactNode;
    size?: ModalSize;
    closeOnBackdrop?: boolean;
    showCloseButton?: boolean;
    closeButtonLabel?: string;
    panelClassName?: string;
    titleClassName?: string;
}
export type ModalProps = ModalBaseProps & ({
    title: ReactNode;
    ariaLabel?: never;
} | {
    title?: never;
    ariaLabel: string;
});
export default function Modal({ open, onClose, title, ariaLabel, description, children, size, closeOnBackdrop, showCloseButton, closeButtonLabel, className, panelClassName, titleClassName, ...props }: ModalProps): import("react").ReactPortal | null;
export {};
