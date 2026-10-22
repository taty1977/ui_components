import { type SelectHTMLAttributes, type ReactNode } from 'react';
import { type InputVariant, type InputTone, type InputSize } from '../input/input.styles';
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
export default function Select({ className, label, placeholder, helperText, error, variant, tone, size, iconLeft, showSelectionCheck, id, children, defaultValue, value, onChange, 'aria-describedby': describedBy, ...props }: SelectProps): import("react/jsx-runtime").JSX.Element;
