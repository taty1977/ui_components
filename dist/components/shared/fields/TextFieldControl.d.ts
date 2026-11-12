import { type ComponentPropsWithRef, type ReactNode } from 'react';
import { type InputAppearance, type InputSize, type InputTone } from './field.styles';
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
export declare function TextFieldControl({ inputProps, appearance, accent, size, label, error, floating, focused, iconLeft, iconRight, trailingAction, }: TextFieldControlProps): import("react/jsx-runtime").JSX.Element;
export {};
