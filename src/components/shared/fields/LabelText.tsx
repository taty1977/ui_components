import type { LabelHTMLAttributes, Ref } from 'react';
import { cn } from '../../../utils/cn';
import { a11yProps } from '../../../utils/a11yProps';
import { labelClasses } from './field.styles';
import { paletteToneStyles } from '../../../themes/paletteTones';

export interface LabelTextProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  ref?: Ref<HTMLLabelElement>;
}
export function LabelText({ required, className, children, ref, ...props }: LabelTextProps) {
  return (
    <label ref={ref} className={cn(labelClasses, className)} {...props}>
      {children}
      {required && (
        <span className={cn('ml-1', paletteToneStyles.error.text)} {...a11yProps(true)}>
          *
        </span>
      )}
    </label>
  );
}
