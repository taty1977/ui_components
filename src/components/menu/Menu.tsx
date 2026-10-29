import { useEffect, useId, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { componentVariantAppearances, resolveVariantTone, type ComponentVariant } from '../../types/variants';
import { toneClasses, type ButtonTone } from '../button/button.styles';

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

const menuAppearanceClasses: Record<ComponentVariant, string> = {
  default: 'border border-border-subtle bg-background-surface shadow-lg',
  primary: '',
  secondary: '',
  label: '',
  outline: 'border bg-background-surface shadow-md',
  text: 'border-0 bg-background-surface shadow-md',
};

export default function Menu({
  label,
  items,
  triggerIcon,
  triggerAriaLabel,
  variant = 'default',
  tone = 'primary',
  disabled = false,
  className,
  menuClassName,
  ...props
}: MenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const appearance = componentVariantAppearances[variant];
  const accent = resolveVariantTone(variant, tone);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not(:disabled)')?.focus();
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const handleMenuKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const menuItems = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? [],
    );
    if (menuItems.length === 0) return;
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLButtonElement);
    let nextIndex: number | undefined;
    if (event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % menuItems.length;
    else if (event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = menuItems.length - 1;
    if (nextIndex !== undefined) {
      event.preventDefault();
      menuItems[nextIndex]?.focus();
    }
  };

  return (
    <div {...props} ref={rootRef} className={cn('relative inline-flex font-sans', className)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        aria-label={!label ? triggerAriaLabel || 'Open menu' : undefined}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          'inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 text-15 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current disabled:cursor-not-allowed disabled:opacity-45',
          toneClasses[accent][appearance],
        )}
        data-variant={variant}
        data-tone={accent}
      >
        {label}
        {triggerIcon && (
          <span className="inline-flex size-4 items-center justify-center" aria-hidden="true">
            {triggerIcon}
          </span>
        )}
      </button>
      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label={label || triggerAriaLabel || 'Menu options'}
          onKeyDown={handleMenuKeyDown}
          className={cn(
            'absolute right-0 top-full z-50 mt-2 min-w-48 overflow-hidden rounded-md py-1',
            menuAppearanceClasses[variant],
            appearance === 'solid' && variant !== 'default' && toneClasses[accent].solid,
            appearance === 'label' && toneClasses[accent].label,
            appearance === 'outline' && `${toneClasses[accent].outline} border bg-background-surface`,
            menuClassName,
          )}
          data-variant={variant}
          data-tone={accent}
        >
          {items.map((item, index) => (
            <div key={index}>
              {item.dividerBefore && <div role="separator" className="my-1 border-t border-border-subtle" />}
              <button
                type="button"
                role="menuitem"
                disabled={item.disabled}
                onClick={() => {
                  item.onSelect?.();
                  setOpen(false);
                  triggerRef.current?.focus();
                }}
                className="flex min-h-10 w-full items-center gap-3 px-4 text-left text-15 text-text-primary transition-colors hover:bg-action-hover focus-visible:bg-action-hover focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45"
              >
                {item.icon && (
                  <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="flex-1">{item.label}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
