import { useEffect, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import Link from '../link/Link';

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

export default function Navbar({
  brand,
  links,
  brandHref = '#top',
  activeHref,
  ariaLabel = 'Main navigation',
  className,
  ...props
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const mobileNavId = useId();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  const renderLinks = () =>
    links.map((link) => (
      <Link
        underline="none"
        weight="medium"
        key={link.href}
        href={link.href}
        aria-current={activeHref === link.href ? 'page' : undefined}
        onClick={() => setOpen(false)}
        className={cn(
          'rounded-sm leading-[inherit] transition-colors hover:text-palette-primary-main focus-visible:outline-offset-4',
          activeHref === link.href ? 'text-palette-primary-main' : 'text-text-primary',
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header
      {...props}
      className={cn(
        'sticky top-0 z-40 w-full min-w-0 border-b border-border-subtle bg-background-surface [container-type:inline-size]',
        className,
      )}
    >
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          underline="none"
          size="lg"
          weight="bold"
          href={brandHref}
          className="min-w-0 truncate rounded-sm leading-[inherit] focus-visible:outline-offset-4"
        >
          {brand}
        </Link>

        <nav aria-label={ariaLabel} className="hidden items-center gap-8 [@container(min-width:768px)]:flex">
          {renderLinks()}
        </nav>

        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-text-primary hover:bg-action-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current [@container(min-width:768px)]:hidden"
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          aria-controls={mobileNavId}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <XMarkIcon aria-hidden="true" className="size-6" /> : <Bars3Icon aria-hidden="true" className="size-6" />}
        </button>
      </div>

      {open && (
        <nav
          id={mobileNavId}
          aria-label={ariaLabel}
          className="flex flex-col gap-1 border-t border-border-subtle px-4 py-3 [@container(min-width:768px)]:hidden"
        >
          {links.map((link) => (
            <Link
              underline="none"
              weight="medium"
              key={link.href}
              href={link.href}
              aria-current={activeHref === link.href ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={cn(
                'flex min-h-11 items-center rounded-md px-3 py-2.5 leading-[inherit] transition-colors hover:bg-action-hover',
                activeHref === link.href ? 'text-palette-primary-main' : 'text-text-primary',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
