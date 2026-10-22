import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  fieldStyles,
  resolveFieldVariant,
  fieldInputClasses,
  fieldCenterAlignmentClasses,
  toneClasses,
  toneTextClasses,
  notchToneClasses,
  errorClasses,
  type InputSize,
  type InputTone,
  type InputVariant,
} from './input.styles';
import { LabelText } from './LabelText';

export type { InputSize, InputTone, InputVariant } from './input.styles';

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
  const labelRef = useRef<HTMLLabelElement>(null);
  const [notchWidth, setNotchWidth] = useState<number>();
  const floating = String(value ?? localValue).length > 0;
  const showLabel = floating || !props.placeholder;
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const outlinedFloating = Boolean(label && floating && appearance === 'outlined');
  const notched = Boolean(label && floating && appearance === 'outlined' && notchWidth !== undefined);
  const labelTone = disabled
    ? 'text-text-disabled'
    : error
      ? toneTextClasses.error
      : focused
        ? toneTextClasses[accent]
        : 'text-text-secondary';
  const message = error ?? helperText;
  const messageId = `${inputId}-${error ? 'error' : 'helper'}`;
  const describedBy = [ariaDescribedBy, message ? messageId : undefined].filter(Boolean).join(' ') || undefined;
  useEffect(() => {
    if (!label || !floating || appearance !== 'outlined') return;
    const width = labelRef.current?.offsetWidth;
    if (width) setNotchWidth(width);
  }, [appearance, floating, label, required]);

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
          {label && appearance === 'standard' && floating && showLabel && (
            <LabelText
              ref={labelRef}
              htmlFor={inputId}
              required={required}
              className={cn('absolute left-0 top-0 z-10 mb-0 pl-4', labelTone)}
            >
              {label}
            </LabelText>
          )}
          <div
            className={cn(
              fieldStyles({
                variant: appearance,
                size,
                disabled,
                iconLeft: Boolean(iconLeft),
                iconRight: Boolean(iconRight),
                notched,
              }),
              'group',
              outlinedFloating && 'mt-2 bg-background-surface',
              label && floating && appearance === 'standard' && 'mt-2',
              !disabled && toneClasses[accent],
            )}
          >
            {notched && (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2',
                    disabled ? 'border-text-disabled' : notchToneClasses[accent],
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2',
                    disabled ? 'border-text-disabled' : notchToneClasses[accent],
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2',
                    disabled ? 'border-text-disabled' : notchToneClasses[accent],
                  )}
                  style={{ left: 12 + (notchWidth ?? 0) }}
                />
              </>
            )}
            {label && !(appearance === 'standard' && floating && showLabel) && (
              <LabelText
                ref={labelRef}
                htmlFor={inputId}
                required={required}
                className={cn(
                  'pointer-events-none absolute z-10 mb-0 transition-all',
                  !showLabel
                    ? 'sr-only'
                    : floating && appearance === 'outlined'
                      ? 'left-3 -top-2 px-1 text-13'
                      : floating && appearance === 'filled'
                        ? 'left-4 top-1 text-13'
                        : cn(
                            'top-1/2 -translate-y-1/2 text-inherit',
                            iconLeft ? (size === 'small' ? 'left-9' : 'left-[42px]') : 'left-4',
                          ),
                  !floating && appearance !== 'outlined' && 'mt-[0.5px] group-focus-within:mt-px',
                  floating && appearance === 'outlined' && 'bg-background-surface',
                  floating && appearance === 'filled' && 'leading-14',
                  labelTone,
                )}
              >
                {label}
              </LabelText>
            )}
            {iconLeft && (
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5',
                  fieldCenterAlignmentClasses[appearance],
                )}
              >
                {iconLeft}
              </span>
            )}
            <input
              {...props}
              id={inputId}
              type={type}
              disabled={disabled}
              required={required}
              value={value}
              defaultValue={defaultValue}
              aria-describedby={describedBy}
              aria-invalid={error ? true : props['aria-invalid']}
              className={cn(
                fieldInputClasses,
                !floating && fieldCenterAlignmentClasses[appearance],
                appearance === 'filled' && floating && label && 'self-stretch py-0 pt-[18px]',
                inputClassName,
              )}
              onFocus={(event) => {
                setFocused(true);
                onFocus?.(event);
              }}
              onBlur={(event) => {
                setFocused(false);
                onBlur?.(event);
              }}
              onChange={(event) => {
                setLocalValue(event.target.value);
                onChange?.(event);
              }}
            />
            {iconRight && (
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5',
                  fieldCenterAlignmentClasses[appearance],
                )}
              >
                {iconRight}
              </span>
            )}
          </div>
        </div>
        {outsideIconRight && outsideIcon(outsideIconRight)}
      </div>
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          aria-live="polite"
          className={cn(error ? errorClasses : 'mt-1 text-13 text-text-secondary')}
        >
          {message}
        </p>
      )}
    </div>
  );
}
