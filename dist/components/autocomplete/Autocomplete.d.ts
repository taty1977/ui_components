import { type InputHTMLAttributes, type ReactNode, type ChangeEventHandler } from 'react';
import { type InputVariant, type InputTone, type InputSize } from '../input/input.styles';
export type AutocompleteVariant = InputVariant;
export interface AutocompleteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onSelect' | 'value' | 'size'> {
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
export default function Autocomplete({ className, error, helperText, iconLeft, iconRight, label, variant, tone, size, onChange, onSelect, options, value, defaultValue, id, 'aria-describedby': describedBy, onFocus, onBlur, onKeyDown, ...props }: AutocompleteProps): import("react/jsx-runtime").JSX.Element;
