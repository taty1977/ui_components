import { useId, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import Paragraph from '../paragraph/Paragraph';
import {
  resolveFieldVariant,
  toneTextClasses,
  errorClasses,
  type InputSize,
  type InputTone,
  type InputVariant,
} from '../shared/fields/field.styles';
import { TextFieldControl } from '../shared/fields/TextFieldControl';

export type { InputSize, InputTone, InputVariant } from '../shared/fields/field.styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: InputVariant;
  tone?: InputTone;
  size?: InputSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  outsideIconLeft?: ReactNode;
  outsideIconRight?: ReactNode;
  handleActions?: () => void;
  inputClassName?: string;
}
export default function Input({
  className,
  inputClassName,
  label,
  helperText,
  error,
  variant = 'outlined',
  tone = 'primary',
  size = 'normal',
  iconLeft,
  iconRight,
  outsideIconLeft,
  outsideIconRight,
  handleActions,
  id,
  type = 'text',
  'aria-describedby': ariaDescribedBy,
  onFocus,
  onBlur,
  onChange,
  value,
  defaultValue,
  disabled,
  required,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(defaultValue ?? '');
  const floating = String(value ?? localValue).length > 0;
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const message = error ?? helperText;
  const messageId = `${inputId}-${error ? 'error' : 'helper'}`;
  const describedBy = [ariaDescribedBy, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;

  const outsideIcon = (icon: ReactNode) =>
    handleActions ? (
      <button
        type="button"
        disabled={disabled}
        onClick={handleActions}
        className={cn(
          'inline-flex min-w-[26px] items-center justify-center self-stretch disabled:opacity-45 [&_svg]:size-[26px]',
          toneTextClasses[accent],
        )}
        aria-label={`${label ?? 'Input'} action`}
      >
        {icon}
      </button>
    ) : (
      <span
        aria-hidden="true"
        className={cn(
          'inline-flex min-w-[26px] items-center justify-center self-stretch [&_svg]:size-[26px]',
          toneTextClasses[accent],
        )}
      >
        {icon}
      </span>
    );
  return (
    <div className={cn('w-full max-w-sm font-sans', className)}>
      <div className="flex items-stretch gap-2">
        {outsideIconLeft && outsideIcon(outsideIconLeft)}
        <div className="relative min-w-0 flex-1">
          <TextFieldControl
            appearance={appearance}
            accent={accent}
            size={size}
            label={label}
            error={error}
            floating={floating}
            focused={focused}
            iconLeft={iconLeft}
            iconRight={iconRight}
            inputProps={{
              ...props,
              id: inputId,
              type,
              disabled,
              required,
              value,
              defaultValue,
              'aria-describedby': describedBy,
              'aria-invalid': error ? true : props['aria-invalid'],
              className: inputClassName,
              onFocus: (event) => {
                setFocused(true);
                onFocus?.(event);
              },
              onBlur: (event) => {
                setFocused(false);
                onBlur?.(event);
              },
              onChange: (event) => {
                setLocalValue(event.target.value);
                onChange?.(event);
              },
            }}
          />
        </div>
        {outsideIconRight && outsideIcon(outsideIconRight)}
      </div>
      {message && (
        <Paragraph
          variant="body2"
          tone={error ? 'error' : 'muted'}
          id={messageId}
          role={error ? 'alert' : undefined}
          aria-live="polite"
          className={cn('leading-[inherit]', error ? errorClasses : 'mt-1')}
        >
          {message}
        </Paragraph>
      )}
    </div>
  );
}
