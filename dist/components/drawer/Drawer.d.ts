import { type CSSProperties } from 'react';
import { type ModalProps } from '../modal/Modal';
export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
type WithoutModalSize<Props> = Props extends ModalProps ? Omit<Props, 'size'> : never;
export type DrawerProps = WithoutModalSize<ModalProps> & {
    anchor?: DrawerAnchor;
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
};
export default function Drawer({ anchor, width, height, className, panelClassName, titleClassName, style, open, closeButtonLabel, ...props }: DrawerProps): import("react/jsx-runtime").JSX.Element;
export {};
