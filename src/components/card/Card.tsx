import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { componentVariantAppearances, resolveVariantTone, type ComponentVariant } from '../../types/variants';
import { toneClasses, type ButtonTone } from '../button/button.styles';

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  variant?: ComponentVariant;
  tone?: ButtonTone;
  headerClassName?: string;
  contentClassName?: string;
}

const cardAppearanceClasses: Record<ComponentVariant, string> = {
  default: 'border border-border-subtle bg-background-surface shadow-sm',
  primary: '',
  secondary: '',
  label: '',
  outline: 'border bg-background-surface',
  text: 'border-0 bg-transparent shadow-none',
};

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
  const appearance = componentVariantAppearances[variant];
  const accent = resolveVariantTone(variant, tone ?? 'primary');
  const defaultTone = variant === 'default' && tone !== undefined;
  return (
    <section
      {...props}
      className={cn(
        'overflow-hidden rounded-md font-sans text-text-primary transition-colors',
        cardAppearanceClasses[variant],
        appearance === 'solid' && variant !== 'default' && toneClasses[accent].solid,
        defaultTone && toneClasses[accent].label,
        appearance === 'label' && toneClasses[accent].label,
        appearance === 'outline' && `${toneClasses[accent].outline} border bg-background-surface`,
        defaultTone && 'text-text-primary',
        className,
      )}
      data-variant={variant}
      data-tone={tone !== undefined || variant === 'primary' || variant === 'secondary' ? accent : undefined}
    >
      {(title != null || description != null || actions != null) && (
        <header
          className={cn(
            'flex min-h-12 items-start justify-between gap-2.5 px-4 py-4',
            children != null && 'border-b border-border-subtle',
            headerClassName,
          )}
        >
          <div className="min-w-0">
            {title != null && <div className="text-18 font-medium">{title}</div>}
            {description != null && <div className="mt-1 text-15 text-text-secondary">{description}</div>}
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
