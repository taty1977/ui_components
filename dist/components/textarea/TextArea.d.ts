import { type TextareaHTMLAttributes } from 'react';
import { type InputVariant, type InputTone, type InputSize } from '../shared/fields/field.styles';
export type TextareaVariant = InputVariant;
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    helperText?: string;
    error?: string;
    variant?: TextareaVariant;
    tone?: InputTone;
    size?: InputSize;
}
export default function Textarea({ className, label, helperText, error, variant, tone, size, id, 'aria-describedby': describedBy, ...props }: TextareaProps): import("react/jsx-runtime").JSX.Element;
