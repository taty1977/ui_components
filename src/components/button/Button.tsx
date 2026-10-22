import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { buttonStyles, toneClasses, type ButtonSize, type ButtonTone, type ButtonVariant } from './button.styles';

export type { ButtonSize, ButtonTone, ButtonVariant } from './button.styles';
export type ButtonWidth = 'default' | 'auto' | 'sm' | 'md' | 'lg' | 'full';
export type ButtonShape = 'rectangle' | 'pill';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: ButtonSize;
  width?: ButtonWidth;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  outline?: boolean;
  shape?: ButtonShape;
}

export default function Button({
  className,
  label,
  iconLeft,
  iconRight,
  size = 'md',
  width = 'default',
  variant = 'default',
  tone = 'primary',
  outline = false,
  shape = 'rectangle',
  children,
  ...props
}: ButtonProps) {
  const resolvedTone = variant === 'primary' || variant === 'secondary' ? variant : tone;
  const appearance = outline
    ? 'outline'
    : variant === 'label' || variant === 'text' || variant === 'outline'
      ? variant
      : 'solid';
  return (
    <button
      className={cn(buttonStyles({ size, width, shape }), toneClasses[resolvedTone][appearance], className)}
      data-size={size}
      data-variant={variant}
      data-tone={resolvedTone}
      data-width={width}
      data-shape={shape}
      data-outline={outline}
      {...props}
    >
      {iconLeft && (
        <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children ?? label}
      {iconRight && (
        <span className="inline-flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  );
}
