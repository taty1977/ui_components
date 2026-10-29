import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { componentVariantAppearances, resolveVariantTone, type ComponentVariant } from '../../types/variants';
import { toneClasses, type ButtonTone } from '../button/button.styles';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonShape = 'circular' | 'square';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  children: ReactNode;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  variant?: ComponentVariant;
  tone?: ButtonTone;
}

const sizeClasses: Record<IconButtonSize, string> = {
  small: 'size-8',
  medium: 'size-10',
  large: 'size-12',
};

const neutralAppearanceClasses: Record<ComponentVariant, string> = {
  default: 'bg-text-primary text-background-surface enabled:hover:opacity-85',
  primary: '',
  secondary: '',
  label: 'bg-action-hover text-text-primary enabled:hover:opacity-80',
  outline: 'border border-border-subtle bg-background-surface text-text-primary enabled:hover:bg-action-hover',
  text: 'bg-transparent text-text-primary enabled:hover:bg-action-hover',
};

export default function IconButton({
  children,
  className,
  size = 'medium',
  shape = 'circular',
  variant = 'text',
  tone,
  type = 'button',
  ...props
}: IconButtonProps) {
  const appearance = componentVariantAppearances[variant];
  const accent = resolveVariantTone(variant, tone ?? 'primary');
  const useToneAppearance = tone !== undefined || variant === 'primary' || variant === 'secondary';
  const toneClass = useToneAppearance
    ? toneClasses[accent][appearance]
    : neutralAppearanceClasses[variant];
  return (
    <button
      {...props}
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center p-0 transition-colors disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current',
        sizeClasses[size],
        shape === 'circular' ? 'rounded-full' : 'rounded-md',
        toneClass,
        className,
      )}
      data-size={size}
      data-shape={shape}
      data-variant={variant}
      data-tone={tone ?? (variant === 'primary' || variant === 'secondary' ? accent : undefined)}
    >
      <span className="inline-flex size-5 items-center justify-center" aria-hidden="true">
        {children}
      </span>
    </button>
  );
}
