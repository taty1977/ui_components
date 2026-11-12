import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  componentVariantAppearances,
  resolveVariantTone,
  type ComponentVariant,
  type ComponentWidth,
  type ComponentShape,
} from '../../types/variants';
import { buttonStyles, toneClasses, type ButtonSize, type ButtonTone } from './button.styles';

export type { ButtonSize, ButtonTone } from './button.styles';
// Preserve existing Button type imports.
export type {
  ComponentVariant as ButtonVariant,
  ComponentWidth as ButtonWidth,
  ComponentShape as ButtonShape,
} from '../../types/variants';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  size?: ButtonSize;
  width?: ComponentWidth;
  variant?: ComponentVariant;
  tone?: ButtonTone;
  outline?: boolean;
  shape?: ComponentShape;
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
  const resolvedTone = resolveVariantTone(variant, tone);
  // The outline prop overrides the variant's appearance.
  const appearance = outline ? 'outline' : componentVariantAppearances[variant];
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
