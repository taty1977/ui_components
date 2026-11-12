import {
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type ChangeEventHandler,
} from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { createListboxKeyDownHandler } from '../../utils/listboxKeyboard';
import Paragraph from '../paragraph/Paragraph';
import {
  resolveFieldVariant,
  fieldCenterAlignmentClasses,
  errorClasses,
  optionListClasses,
  type InputVariant,
  type InputTone,
  type InputSize,
} from '../shared/fields/field.styles';
import { TextFieldControl } from '../shared/fields/TextFieldControl';

export type AutocompleteVariant = InputVariant | 'default';
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
  variant = 'default',
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
  const { appearance, accent } = resolveFieldVariant(variant === 'default' ? 'outlined' : variant, tone, error);
  const inputId = id ?? generatedId;
  const listId = `${inputId}-options`;
  const message = error ?? helperText;
  const messageId = `${inputId}-${error ? 'error' : 'helper'}`;
  const [localValue, setLocalValue] = useState(() => String(value ?? defaultValue ?? ''));
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentValue = value ?? localValue;
  const floating = currentValue.length > 0;
  const hasQuery = currentValue.trim().length > 0;
  const showClearButton = focused && hasQuery;
  // Preserve spaces in nonblank searches.
  const query = currentValue.toLowerCase();
  const filtered =
    open && hasQuery
      ? options.filter((option) => option.toLowerCase().includes(query))
      : [];

  const selectOption = (option: string) => {
    setLocalValue(option);
    setOpen(false);
    onSelect(option);
  };

  return (
    <div
      className={cn('relative w-full max-w-sm font-sans', className)}
      onBlur={(event) => {
        // Keep the clear button visible when focus moves to it.
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
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
          ref: inputRef,
          size: typeof size === 'number' ? size : undefined,
          id: inputId,
          type: 'text',
          role: 'combobox',
          'aria-autocomplete': 'list',
          'aria-expanded': filtered.length > 0,
          'aria-controls': listId,
          'aria-activedescendant': filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined,
          'aria-describedby': [describedBy, message && messageId].filter(Boolean).join(' ') || undefined,
          'aria-invalid': error ? true : props['aria-invalid'],
          value: currentValue,
          onChange: (event) => {
            setLocalValue(event.target.value);
            setOpen(true);
            setActiveIndex(0);
            onChange?.(event);
          },
          onFocus: (event) => {
            setFocused(true);
            setOpen(true);
            onFocus?.(event);
          },
          onBlur: (event) => {
            setOpen(false);
            onBlur?.(event);
          },
          onKeyDown: createListboxKeyDownHandler({
            options: filtered,
            activeIndex,
            setActiveIndex,
            setOpen,
            onSelect: selectOption,
            onKeyDown,
          }),
        }}
        trailingAction={showClearButton && (
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
              selectOption('');
              inputRef.current?.focus();
            }}
          >
            <XMarkIcon className="size-4" aria-hidden="true" />
          </button>
        )}
      />
      {filtered.length > 0 && (
        <ul id={listId} role="listbox" className={cn(optionListClasses, 'relative')}>
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
