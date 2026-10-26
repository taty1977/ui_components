import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';
import {
  fieldStyles,
  floatingLabelClasses,
  resolveFieldVariant,
  fieldInputClasses,
  fieldCenterAlignmentClasses,
  toneClasses,
  toneTextClasses,
  resolveFieldLabelTone,
  errorClasses,
  type InputSize,
  type InputTone,
  type InputVariant,
} from '../shared/fields/field.styles';
import { LabelText } from '../shared/fields/LabelText';
import { FieldNotch } from '../shared/fields/FieldNotch';

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
  const labelRef = useRef<HTMLLabelElement>(null);
  const [notchWidth, setNotchWidth] = useState<number>();
  const floating = String(value ?? localValue).length > 0;
  const showLabel = floating || !props.placeholder;
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const outlinedFloating = Boolean(label && floating && appearance === 'outlined');
  const notched = Boolean(label && floating && appearance === 'outlined' && notchWidth !== undefined);
  const labelTone = resolveFieldLabelTone({ disabled, error, active: focused, accent });
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
            {notched && notchWidth !== undefined && (
              <FieldNotch width={notchWidth} accent={accent} disabled={disabled} />
            )}
            {label && !(appearance === 'standard' && floating && showLabel) && (
              <LabelText
                ref={labelRef}
                htmlFor={inputId}
                required={required}
                className={cn(
                  floatingLabelClasses({ appearance, floating, visible: showLabel, iconLeft: Boolean(iconLeft), size }),
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
