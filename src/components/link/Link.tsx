import type { AnchorHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { linkTextClasses, type LinkStyleOptions } from '../../utils/text.styles';

export type { LinkUnderline } from '../../utils/text.styles';
export interface LinkProps
  extends
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>,
    LinkStyleOptions {
  family?: 'sans';
}

export default function Link({
  variant,
  size,
  weight,
  family: _family,
  color,
  tone,
  textTransform,
  underline = 'always',
  className,
  children,
  target,
  rel,
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      target={target}
      rel={
        target === '_blank'
          ? [...new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), 'noopener', 'noreferrer'])].join(' ')
          : rel
      }
      className={cn(
        linkTextClasses({ variant, size, weight, color, tone, textTransform, underline }),
        className,
      )}
    >
      {children}
    </a>
  );
}
