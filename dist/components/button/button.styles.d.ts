export type ButtonTone = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export type ButtonVariant = 'default' | 'label' | 'outline' | 'text' | 'primary' | 'secondary';
export type ButtonSize = 'default' | 'sm' | 'md' | 'lg';
export declare const buttonStyles: (props?: ({
    size?: "default" | "sm" | "md" | "lg" | null | undefined;
    shape?: "rectangle" | "pill" | null | undefined;
    width?: "default" | "auto" | "sm" | "md" | "lg" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const toneClasses: Record<ButtonTone, {
    solid: string;
    label: string;
    outline: string;
    text: string;
}>;
