import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type SelectHTMLAttributes,
  type OptionHTMLAttributes,
  type ReactNode,
} from 'react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { LabelText } from '../input/LabelText';
import {
  fieldStyles,
  fieldCenterAlignmentClasses,
  resolveFieldVariant,
  toneClasses,
  toneTextClasses,
  notchToneClasses,
  errorClasses,
  optionListClasses,
  type InputVariant,
  type InputTone,
  type InputSize,
} from '../input/input.styles';
export type SelectVariant = InputVariant;
export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: string;
  variant?: SelectVariant;
  tone?: InputTone;
  size?: InputSize | number;
  iconLeft?: ReactNode;
  showSelectionCheck?: boolean;
}
export default function Select({
  className,
  label,
  placeholder,
  helperText,
  error,
  variant = 'outlined',
  tone = 'primary',
  size = 'normal',
  iconLeft,
  showSelectionCheck = false,
  id,
  children,
  defaultValue,
  value,
  onChange,
  'aria-describedby': describedBy,
  ...props
}: SelectProps) {
  const generatedId = useId();
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const selectId = id ?? generatedId;
  const nativeSelect = useRef<HTMLSelectElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = Children.toArray(children).filter(isValidElement<OptionHTMLAttributes<HTMLOptionElement>>);
  const [localValue, setLocalValue] = useState(String(defaultValue ?? options[0]?.props.value ?? ''));
  const [open, setOpen] = useState(false);
  const selectedValue = String(value ?? localValue);
  const selected = options.find((option) => String(option.props.value ?? '') === selectedValue);
  const floating = selectedValue.length > 0 || (!placeholder && Boolean(selected?.props.children));
  const showLabel = floating || !placeholder;
  const outlinedFloating = Boolean(label && floating && appearance === 'outlined');
  const notched = Boolean(outlinedFloating);
  const message = error ?? helperText;
  const messageId = `${selectId}-${error ? 'error' : 'helper'}`;
  const description = [describedBy, message && messageId].filter(Boolean).join(' ') || undefined;
  const [notchWidth, setNotchWidth] = useState<number>();
  const labelRef = useRef<HTMLLabelElement>(null);
  const labelTone = props.disabled
    ? 'text-text-disabled'
    : error
      ? toneTextClasses.error
      : open
        ? toneTextClasses[accent]
        : 'text-text-secondary';

  useEffect(() => {
    if (!label || !floating || appearance !== 'outlined') return;
    const width = labelRef.current?.offsetWidth;
    if (width) setNotchWidth(width);
  }, [appearance, floating, label, props.required]);

  const selectValue = (next: string) => {
    setLocalValue(next);
    setOpen(false);
    if (nativeSelect.current) {
      nativeSelect.current.value = next;
      nativeSelect.current.dispatchEvent(new Event('change', { bubbles: true }));
    }
    trigger.current?.focus();
  };
  return (
    <div
      className={cn('relative w-full max-w-sm font-sans', className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      {label && appearance === 'standard' && floating && showLabel && (
        <LabelText
          ref={labelRef}
          id={`${selectId}-label`}
          htmlFor={selectId}
          required={props.required}
          className={cn('absolute left-0 top-0 z-10 mb-0 pl-4', labelTone)}
        >
          {label}
        </LabelText>
      )}
      <select
        {...props}
        size={typeof size === 'number' ? size : undefined}
        id={selectId}
        ref={nativeSelect}
        className="sr-only"
        tabIndex={-1}
        value={selectedValue}
        aria-describedby={description}
        aria-invalid={error ? true : props['aria-invalid']}
        onChange={(event) => {
          setLocalValue(event.target.value);
          onChange?.(event);
        }}
      >
        {children}
      </select>
      <button
        ref={trigger}
        type="button"
        disabled={props.disabled}
        aria-labelledby={label ? `${selectId}-label` : undefined}
        aria-label={!label ? (props['aria-label'] ?? placeholder ?? 'Select an option') : undefined}
        aria-describedby={description}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${selectId}-options`}
        aria-invalid={error ? true : undefined}
        className={cn(
          fieldStyles({
            variant: appearance,
            size: typeof size === 'number' ? 'normal' : size,
            disabled: props.disabled,
            iconLeft: Boolean(iconLeft),
            iconRight: true,
            notched,
          }),
          'group text-left',
          outlinedFloating && 'group mt-2 bg-background-surface',
          label && floating && appearance === 'standard' && 'mt-2',
          !props.disabled && toneClasses[accent],
        )}
        onClick={() => setOpen((previous) => !previous)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setOpen(false);
          if (event.key === 'ArrowDown') {
            event.preventDefault();
            setOpen(true);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.parentElement?.contains(event.relatedTarget)) setOpen(false);
        }}
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
        {label && !(appearance === 'standard' && floating && showLabel) && (
          <LabelText
            ref={labelRef}
            id={`${selectId}-label`}
            htmlFor={selectId}
            required={props.required}
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
            className={cn(
              'inline-flex size-5 shrink-0 items-center justify-center [&_svg]:size-5',
              fieldCenterAlignmentClasses[appearance],
            )}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}
        <span
          className={cn(
            'flex flex-1 items-center py-2 leading-5',
            !floating && fieldCenterAlignmentClasses[appearance],
            appearance === 'filled' && floating && label && 'self-stretch py-0 pt-[18px]',
          )}
        >
          {selected?.props.children ?? placeholder ?? 'Select an option'}
        </span>
        <span
          className={cn(
            'inline-flex size-5 shrink-0 items-center justify-center',
            fieldCenterAlignmentClasses[appearance],
          )}
          aria-hidden="true"
        >
          <ChevronDownIcon className="size-4" />
        </span>
      </button>
      {open && (
        <ul id={`${selectId}-options`} role="listbox" aria-label={label ?? 'Options'} className={optionListClasses}>
          {options.map((option) => {
            const optionValue = String(option.props.value ?? '');
            const selected = optionValue !== '' && optionValue === selectedValue;
            return (
              <li
                key={optionValue}
                role="option"
                aria-selected={selected}
                aria-disabled={option.props.disabled}
                tabIndex={option.props.disabled ? undefined : 0}
                className={cn(
                  'flex cursor-pointer items-center justify-between px-4 py-2 hover:bg-action-hover focus:bg-action-hover focus:outline-none',
                  selected && 'bg-action-selected',
                  option.props.disabled && 'cursor-not-allowed text-text-disabled',
                )}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  if (!option.props.disabled) selectValue(optionValue);
                }}
                onKeyDown={(event) => {
                  if (!option.props.disabled && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    selectValue(optionValue);
                  }
                  if (event.key === 'Escape') {
                    setOpen(false);
                    trigger.current?.focus();
                  }
                }}
              >
                {option.props.children}
                {showSelectionCheck && selected && (
                  <CheckIcon className={cn('size-4', toneTextClasses[accent])} aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
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
