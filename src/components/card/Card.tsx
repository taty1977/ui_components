import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { resolveVariantTone, type ComponentVariant } from '../../types/variants';
import { toneClasses, type ButtonTone } from '../button/button.styles';
import { bodyTextClasses } from '../../utils/text.styles';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  variant?: ComponentVariant;
  tone?: ButtonTone;
  headerClassName?: string;
  contentClassName?: string;
}

export default function Card({
  title,
  description,
  actions,
  variant = 'default',
  tone,
  className,
  headerClassName,
  contentClassName,
  children,
  ...props
}: CardProps) {
  const accent = resolveVariantTone(variant, tone ?? 'primary');
  const styles = toneClasses[accent];
  const variantClasses: Record<ComponentVariant, string> = {
    // Default cards stay neutral unless a tone is provided.
    default: cn(
      'border border-border-subtle bg-background-surface shadow-sm',
      tone !== undefined && styles.label,
      tone !== undefined && 'text-text-primary',
    ),
    primary: styles.solid,
    secondary: styles.solid,
    label: styles.label,
    outline: cn(styles.outline, 'bg-background-surface'),
    text: 'border-0 bg-transparent shadow-none',
  };
  const headerClasses = cn(
    'flex min-h-12 items-start justify-between gap-2.5 px-4 py-4',
    children != null && 'border-b border-border-subtle',
    headerClassName,
  );
  return (
    <section
      {...props}
      className={cn(
        'overflow-hidden rounded-md font-sans text-text-primary transition-colors',
        variantClasses[variant],
        className,
      )}
      data-variant={variant}
      data-tone={tone !== undefined || variant === 'primary' || variant === 'secondary' ? accent : undefined}
    >
      {(title != null || description != null || actions != null) && (
        <header className={headerClasses}>
          <div className="min-w-0">
            {title != null && (
              <div className={cn(bodyTextClasses({ variant: 'subtitle1' }), 'text-inherit leading-[inherit]')}>
                {title}
              </div>
            )}
            {description != null && (
              <div className={cn(bodyTextClasses({ tone: 'muted' }), 'mt-1 leading-[inherit]')}>
                {description}
              </div>
            )}
          </div>
          {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </header>
      )}
      {children != null && (
        <div className={cn('px-4 py-4 text-15', contentClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}
