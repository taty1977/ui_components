import { useEffect, useId, useRef, useState, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { LabelText } from '../input/LabelText';
import {
  fieldStyles,
  resolveFieldVariant,
  fieldInputClasses,
  toneClasses,
  toneTextClasses,
  notchToneClasses,
  errorClasses,
  type InputVariant,
  type InputTone,
  type InputSize,
} from '../input/input.styles';

export type TextareaVariant = InputVariant;
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: TextareaVariant;
  tone?: InputTone;
  size?: InputSize;
}
export default function Textarea({
  className,
  label,
  helperText,
  error,
  variant = 'outlined',
  tone = 'primary',
  size = 'normal',
  id,
  'aria-describedby': describedBy,
  ...props
}: TextareaProps) {
  const generatedId = useId();
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const fieldId = id ?? generatedId;
  const message = error ?? helperText;
  const messageId = `${fieldId}-${error ? 'error' : 'helper'}`;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [notchWidth, setNotchWidth] = useState<number>();
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(String(props.defaultValue ?? ''));
  const filled = String(props.value ?? localValue).length > 0;
  const showLabel = filled || !props.placeholder;
  const outlinedFloating = Boolean(label && filled && appearance === 'outlined');
  const notched = Boolean(outlinedFloating && notchWidth !== undefined);
  const labelTone = props.disabled
    ? 'text-text-disabled'
    : error
      ? toneTextClasses.error
      : focused
        ? toneTextClasses[accent]
        : 'text-text-secondary';
  useEffect(() => {
    if (!label || !filled || appearance !== 'outlined') return;
    const width = labelRef.current?.offsetWidth;
    if (width) setNotchWidth(width);
  }, [appearance, filled, label, props.required]);

  return (
    <div className={cn('relative w-full max-w-sm font-sans', className)}>
      {label && appearance === 'standard' && filled && showLabel && (
        <LabelText
          ref={labelRef}
          htmlFor={fieldId}
          required={props.required}
          className={cn('absolute left-0 top-0 z-10 mb-0 pl-4', labelTone)}
        >
          {label}
        </LabelText>
      )}
      <div
        className={cn(
          fieldStyles({ variant: appearance, size, disabled: props.disabled, notched }),
          'items-start',
          outlinedFloating && 'group mt-2 bg-background-surface',
          label && filled && appearance === 'standard' && 'mt-2',
          !props.disabled && toneClasses[accent],
        )}
      >
        {notched && (
          <>
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 left-0 top-0 w-3 rounded-l-md border-b border-l border-t group-focus-within:border-b-2 group-focus-within:border-l-2 group-focus-within:border-t-2',
                props.disabled ? 'border-text-disabled' : notchToneClasses[accent],
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 left-3 right-3 border-b group-focus-within:border-b-2',
                props.disabled ? 'border-text-disabled' : notchToneClasses[accent],
              )}
            />
            <span
              aria-hidden="true"
              className={cn(
                'absolute bottom-0 right-0 top-0 rounded-r-md border-b border-r border-t group-focus-within:border-b-2 group-focus-within:border-r-2 group-focus-within:border-t-2',
                props.disabled ? 'border-text-disabled' : notchToneClasses[accent],
              )}
              style={{ left: 12 + (notchWidth ?? 0) }}
            />
          </>
        )}
        {label && !(appearance === 'standard' && filled && showLabel) && (
          <LabelText
            ref={labelRef}
            htmlFor={fieldId}
            required={props.required}
            className={cn(
              'pointer-events-none absolute z-10 mb-0 transition-all',
              !showLabel
                ? 'sr-only'
                : filled && appearance === 'outlined'
                  ? 'left-3 -top-2 px-1 text-13'
                  : filled && appearance === 'filled'
                    ? 'left-4 top-1 text-13'
                    : 'left-4 top-2',
              filled && appearance === 'outlined' && 'bg-background-surface',
              filled && appearance === 'filled' && 'leading-14',
              labelTone,
            )}
          >
            {label}
          </LabelText>
        )}
        <textarea
          {...props}
          id={fieldId}
          value={props.value}
          defaultValue={props.defaultValue}
          aria-invalid={error ? true : props['aria-invalid']}
          aria-describedby={[describedBy, message && messageId].filter(Boolean).join(' ') || undefined}
          className={cn(
            fieldInputClasses,
            'min-h-12 resize-y',
            filled && appearance === 'filled' && label && 'pt-5 pb-[3px] focus:pb-[2px]',
            filled && appearance !== 'filled' && label && 'pt-4',
            filled && appearance === 'standard' && label && 'pb-[7px] focus:pb-[6px]',
          )}
          onFocus={(event) => {
            setFocused(true);
            props.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            props.onBlur?.(event);
          }}
          onChange={(event) => {
            setLocalValue(event.target.value);
            props.onChange?.(event);
          }}
        />
      </div>
      {message && (
        <p
          id={messageId}
          role={error ? 'alert' : undefined}
          aria-live="polite"
          className={error ? errorClasses : 'mt-1 text-13 text-text-secondary'}
        >
          {message}
        </p>
      )}
    </div>
  );
}
