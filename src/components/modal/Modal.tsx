import { createPortal } from 'react-dom';
import { useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import Heading from '../heading/Heading';
import Paragraph from '../paragraph/Paragraph';

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
  headerClassName?: string;
  contentClassName?: string;
  closeButtonClassName?: string;
}

export type ModalProps = ModalBaseProps &
  (
    | { title: ReactNode; ariaLabel?: never }
    | { title?: never; ariaLabel: string }
  );

const sizeClasses: Record<ModalSize, string> = {
  small: 'max-w-sm',
  medium: 'max-w-xl',
  large: 'max-w-3xl',
  full: 'max-w-none',
};

const focusableSelector =
  'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

export default function Modal({
  open,
  onClose,
  title,
  ariaLabel,
  description,
  children,
  size = 'medium',
  closeOnBackdrop = true,
  showCloseButton = true,
  closeButtonLabel = 'Close dialog',
  className,
  panelClassName,
  titleClassName,
  headerClassName,
  contentClassName,
  closeButtonClassName,
  ...props
}: ModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previousActiveElement = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(focusableSelector);
    (focusable?.[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab' || !dialog) return;
      const currentFocusable = Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => !element.hasAttribute('hidden') && element.getAttribute('aria-hidden') !== 'true',
      );
      const first = currentFocusable[0];
      const last = currentFocusable[currentFocusable.length - 1];
      if (!first) {
        event.preventDefault();
        dialog.focus();
      } else if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog)) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousActiveElement instanceof HTMLElement && previousActiveElement.isConnected) {
        previousActiveElement.focus();
      }
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-backdrop-overlay p-4 sm:p-6',
        className,
      )}
      onMouseDown={(event) => {
        if (closeOnBackdrop && event.target === event.currentTarget) {
          // Keep the backdrop from stealing restored focus.
          event.preventDefault();
          onClose();
        }
      }}
    >
      <div
        {...props}
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title !== undefined ? titleId : undefined}
        aria-label={title === undefined ? ariaLabel : undefined}
        aria-describedby={description != null ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(
          'relative my-auto w-full rounded-md border border-border-subtle bg-background-surface p-5 text-text-primary shadow-xl outline-none sm:p-6',
          sizeClasses[size],
          panelClassName,
        )}
      >
        {(title !== undefined || showCloseButton) && (
          <div className={cn('mb-4 flex items-start justify-between gap-4', headerClassName)}>
            {title !== undefined && (
              <Heading
                level="h2"
                weight="semibold"
                id={titleId}
                className={cn('min-w-0 text-20 leading-[inherit]', titleClassName)}
              >
                {title}
              </Heading>
            )}
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label={closeButtonLabel}
                className={cn(
                  'ml-auto inline-flex size-9 shrink-0 items-center justify-center rounded-full text-text-primary hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
                  closeButtonClassName,
                )}
              >
                <XMarkIcon aria-hidden="true" className="size-5" />
              </button>
            )}
          </div>
        )}
        {description != null && (
          <Paragraph tone="muted" id={descriptionId} className="mb-4 leading-[inherit]">
            {description}
          </Paragraph>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}
