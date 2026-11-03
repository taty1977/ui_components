import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { cn } from '../../utils/cn';
import Modal, { type ModalProps } from '../modal/Modal';

export type DrawerAnchor = 'left' | 'right' | 'top' | 'bottom';
// Distribute Omit to preserve Modal's title-or-ariaLabel requirement.
type WithoutModalSize<Props> = Props extends ModalProps ? Omit<Props, 'size'> : never;
export type DrawerProps = WithoutModalSize<ModalProps> & {
  anchor?: DrawerAnchor;
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
};

const anchorClasses: Record<DrawerAnchor, string> = {
  left: 'items-stretch justify-start',
  right: 'items-stretch justify-end',
  top: 'items-start justify-center',
  bottom: 'items-end justify-center',
};

export default function Drawer({
  anchor = 'left',
  width = 320,
  height = 'auto',
  className,
  panelClassName,
  titleClassName,
  style,
  open,
  closeButtonLabel = 'Close drawer',
  ...props
}: DrawerProps) {
  const sourceRef = useRef<HTMLSpanElement>(null);
  const [themeStyle, setThemeStyle] = useState<CSSProperties>({});
  const isSideDrawer = anchor === 'left' || anchor === 'right';

  useEffect(() => {
    if (!open || !sourceRef.current) return;
    // The portal must retain tokens from the drawer's themed subtree.
    const computed = getComputedStyle(sourceRef.current);
    const variables: Record<string, string> = {};
    for (const property of computed) {
      if (property.startsWith('--')) variables[property] = computed.getPropertyValue(property);
    }
    setThemeStyle(variables);
  }, [open]);

  return (
    <>
      <span ref={sourceRef} hidden />
      <Modal
        {...props}
        open={open}
        size="full"
        closeButtonLabel={closeButtonLabel}
        titleClassName={cn('self-center text-[19px] leading-22', titleClassName)}
        className={cn('overflow-hidden p-0 sm:p-0', anchorClasses[anchor], className)}
        panelClassName={cn(
          'm-0 max-h-full max-w-full shrink-0 overflow-y-auto overscroll-contain rounded-none font-sans',
          isSideDrawer && 'h-full',
          panelClassName,
        )}
        style={{
          ...themeStyle,
          width: isSideDrawer ? width : '100%',
          height: isSideDrawer ? '100%' : height,
          // Explicit styles take precedence over inherited tokens and dimensions.
          ...style,
        }}
        data-anchor={anchor}
      />
    </>
  );
}
