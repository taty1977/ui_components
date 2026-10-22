import { type InputHTMLAttributes, type ReactNode } from 'react';
import { type InputSize, type InputTone, type InputVariant } from './input.styles';
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
export default function Input({ className, inputClassName, label, helperText, error, variant, tone, size, iconLeft, iconRight, outsideIconLeft, outsideIconRight, handleActions, id, type, 'aria-describedby': ariaDescribedBy, onFocus, onBlur, onChange, value, defaultValue, disabled, required, ...props }: InputProps): import("react/jsx-runtime").JSX.Element;
