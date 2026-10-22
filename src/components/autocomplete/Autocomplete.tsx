import {
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEventHandler,
} from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
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
  optionListClasses,
  type InputVariant,
  type InputTone,
  type InputSize,
} from '../input/input.styles';
import { LabelText } from '../input/LabelText';
export type AutocompleteVariant = InputVariant;
export interface AutocompleteProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'onSelect' | 'value' | 'size'
> {
  options: string[];
  onSelect: (option: string) => void;
  label?: string;
  helperText?: string;
  error?: string;
  variant?: AutocompleteVariant;
  tone?: InputTone;
  size?: InputSize | number;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
}
export default function Autocomplete({
  className,
  error,
  helperText,
  iconLeft,
  iconRight,
  label,
  variant = 'outlined',
  tone = 'primary',
  size = 'normal',
  onChange,
  onSelect,
  options,
  value,
  defaultValue,
  id,
  'aria-describedby': describedBy,
  onFocus,
  onBlur,
  onKeyDown,
  ...props
}: AutocompleteProps) {
  const generatedId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  const [notchWidth, setNotchWidth] = useState<number>();
  const { appearance, accent } = resolveFieldVariant(variant, tone, error);
  const inputId = id ?? generatedId;
  const listId = `${inputId}-options`;
  const message = error ?? helperText;
  const messageId = `${inputId}-${error ? 'error' : 'helper'}`;
  const [localValue, setLocalValue] = useState(String(value ?? defaultValue ?? ''));
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentValue = value ?? localValue;
  const floating = currentValue.length > 0;
  const showLabel = floating || !props.placeholder;
  const outlinedFloating = Boolean(label && floating && appearance === 'outlined');
  const notched = Boolean(outlinedFloating && notchWidth !== undefined);
  const labelTone = props.disabled
    ? 'text-text-disabled'
    : error
      ? toneTextClasses.error
      : focused
        ? toneTextClasses[accent]
        : 'text-text-secondary';
  const filtered =
    open && currentValue.trim()
      ? options.filter((option) => option.toLowerCase().includes(currentValue.toLowerCase()))
      : [];
  useEffect(() => {
    if (!label || !floating || appearance !== 'outlined') return;
    const width = labelRef.current?.offsetWidth;
    if (width) setNotchWidth(width);
  }, [appearance, floating, label, props.required]);

  const selectOption = (option: string) => {
    setLocalValue(option);
    setOpen(false);
    onSelect(option);
  };
  return (
    <div
      className={cn('relative w-full max-w-sm font-sans', className)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {label && appearance === 'standard' && floating && showLabel && (
        <LabelText
          ref={labelRef}
          htmlFor={inputId}
          required={props.required}
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
            disabled: props.disabled,
            iconLeft: Boolean(iconLeft),
            iconRight: Boolean(iconRight || (focused && currentValue.trim())),
            notched,
          }),
          'group',
          outlinedFloating && 'mt-2 bg-background-surface',
          label && floating && appearance === 'standard' && 'mt-2',
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
        {label && !(appearance === 'standard' && floating && showLabel) && (
          <LabelText
            ref={labelRef}
            htmlFor={inputId}
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
          ref={inputRef}
          size={typeof size === 'number' ? size : undefined}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={filtered.length > 0}
          aria-controls={listId}
          aria-activedescendant={filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined}
          aria-describedby={[describedBy, message && messageId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error ? true : props['aria-invalid']}
          value={currentValue}
          className={cn(
            fieldInputClasses,
            !floating && fieldCenterAlignmentClasses[appearance],
            appearance === 'filled' && floating && label && 'self-stretch py-0 pt-[18px]',
          )}
          onChange={(event) => {
            setLocalValue(event.target.value);
            setOpen(true);
            setActiveIndex(0);
            onChange?.(event);
          }}
          onFocus={(event) => {
            setFocused(true);
            setOpen(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setOpen(false);
            onBlur?.(event);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (event.defaultPrevented) return;
            if (event.key === 'Enter' && filtered.length) {
              event.preventDefault();
              selectOption(filtered[activeIndex] ?? filtered[0]);
            }
            if (event.key === 'Escape') setOpen(false);
            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((index) =>
                Math.max(0, Math.min(filtered.length - 1, index + (event.key === 'ArrowDown' ? 1 : -1))),
              );
            }
          }}
        />
        {focused && currentValue.trim() ? (
          <button
            type="button"
            disabled={props.disabled}
            aria-label="Clear input"
            className={cn(
              'inline-flex size-5 items-center justify-center text-text-secondary [&_svg]:size-4',
              fieldCenterAlignmentClasses[appearance],
            )}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => {
              setLocalValue('');
              setOpen(false);
              onSelect('');
              inputRef.current?.focus();
            }}
          >
            <XMarkIcon className="size-4" aria-hidden="true" />
          </button>
        ) : iconRight ? (
          <span
            aria-hidden="true"
            className={cn(
              'inline-flex size-5 shrink-0 items-center justify-center text-text-secondary [&_svg]:size-5',
              fieldCenterAlignmentClasses[appearance],
            )}
          >
            {iconRight}
          </span>
        ) : null}
      </div>
      {filtered.length > 0 && (
        <ul id={listId} role="listbox" className={optionListClasses}>
          {filtered.map((option, index) => (
            <li
              key={option}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={activeIndex === index}
              className={cn(
                'cursor-pointer px-4 py-2 hover:bg-action-hover',
                activeIndex === index && 'bg-action-selected',
              )}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectOption(option)}
            >
              {option}
            </li>
          ))}
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
