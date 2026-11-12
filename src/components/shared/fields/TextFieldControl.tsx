import { useEffect, useRef, useState, type ComponentPropsWithRef, type ReactNode } from 'react';
import { cn } from '../../../utils/cn';
import {
  fieldStyles,
  fieldInputClasses,
  fieldCenterAlignmentClasses,
  floatingLabelClasses,
  resolveFieldLabelTone,
  toneClasses,
  type InputAppearance,
  type InputSize,
  type InputTone,
} from './field.styles';
import { FieldNotch } from './FieldNotch';
import { LabelText } from './LabelText';

interface TextFieldControlProps {
  inputProps: ComponentPropsWithRef<'input'>;
  appearance: InputAppearance;
  accent: InputTone;
  size: InputSize | number;
  label?: string;
  error?: string;
  floating: boolean;
  focused: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  trailingAction?: ReactNode;
}

// Field presentation is shared; callers own input state and interaction behavior.
export function TextFieldControl({
  inputProps,
  appearance,
  accent,
  size,
  label,
  error,
  floating,
  focused,
  iconLeft,
  iconRight,
  trailingAction,
}: TextFieldControlProps) {
  const { id, disabled, required, placeholder, className } = inputProps;
  const labelRef = useRef<HTMLLabelElement>(null);
  const [notchWidth, setNotchWidth] = useState<number>();
  const showLabel = floating || !placeholder;
  const showStandardLabel = Boolean(label && appearance === 'standard' && floating && showLabel);
  const outlinedFloating = Boolean(label && floating && appearance === 'outlined');
  const notched = outlinedFloating && notchWidth !== undefined;
  const labelTone = resolveFieldLabelTone({ disabled, error, active: focused, accent });
  const alignmentClasses = fieldCenterAlignmentClasses[appearance];
  const iconClasses = cn(
    'inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5',
    alignmentClasses,
  );

  useEffect(() => {
    if (!label || !floating || appearance !== 'outlined') return;
    const width = labelRef.current?.offsetWidth;
    if (width) setNotchWidth(width);
  }, [appearance, floating, label, required]);

  return (
    <>
      {showStandardLabel && (
        <LabelText
          ref={labelRef}
          htmlFor={id}
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
            size: typeof size === 'number' ? 'normal' : size,
            disabled,
            iconLeft: Boolean(iconLeft),
            iconRight: Boolean(iconRight || trailingAction),
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
        {label && !showStandardLabel && (
          <LabelText
            ref={labelRef}
            htmlFor={id}
            required={required}
            className={cn(
              floatingLabelClasses({ appearance, floating, visible: showLabel, iconLeft: Boolean(iconLeft), size }),
              labelTone,
            )}
          >
            {label}
          </LabelText>
        )}
        {iconLeft && <span aria-hidden="true" className={iconClasses}>{iconLeft}</span>}
        <input
          {...inputProps}
          className={cn(
            fieldInputClasses,
            !floating && alignmentClasses,
            appearance === 'filled' && floating && label && 'self-stretch py-0 pt-[18px]',
            outlinedFloating && 'relative z-20',
            className,
          )}
        />
        {/* Actions must remain outside the decorative icon's aria-hidden wrapper. */}
        {trailingAction || (iconRight && <span aria-hidden="true" className={iconClasses}>{iconRight}</span>)}
      </div>
    </>
  );
}
