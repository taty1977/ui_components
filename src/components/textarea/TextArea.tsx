import { useEffect, useId, useRef, useState, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';
import { LabelText } from '../shared/fields/LabelText';
import { FieldNotch } from '../shared/fields/FieldNotch';
import {
  fieldStyles,
  floatingLabelClasses,
  resolveFieldVariant,
  fieldInputClasses,
  toneClasses,
  resolveFieldLabelTone,
  errorClasses,
  type InputVariant,
  type InputTone,
  type InputSize,
} from '../shared/fields/field.styles';

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
  const labelTone = resolveFieldLabelTone({ disabled: props.disabled, error, active: focused, accent });
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
        {notched && notchWidth !== undefined && (
          <FieldNotch width={notchWidth} accent={accent} disabled={props.disabled} />
        )}
        {label && !(appearance === 'standard' && filled && showLabel) && (
          <LabelText
            ref={labelRef}
            htmlFor={fieldId}
            required={props.required}
            className={cn(
              floatingLabelClasses({ appearance, floating: filled, visible: showLabel, multiline: true }),
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
