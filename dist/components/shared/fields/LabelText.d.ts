import type { LabelHTMLAttributes, Ref } from 'react';
export interface LabelTextProps extends LabelHTMLAttributes<HTMLLabelElement> {
    required?: boolean;
    ref?: Ref<HTMLLabelElement>;
}
export declare function LabelText({ required, className, children, ref, ...props }: LabelTextProps): import("react/jsx-runtime").JSX.Element;
