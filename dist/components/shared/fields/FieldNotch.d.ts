import { type InputTone } from './field.styles';
import type { PaletteToneStyles } from '../../../themes/paletteTones';
interface FieldNotchProps {
    width: number;
    accent: InputTone;
    disabled?: boolean;
    borderClass?: PaletteToneStyles['outline'];
}
export declare function FieldNotch({ width, accent, disabled, borderClass }: FieldNotchProps): import("react/jsx-runtime").JSX.Element;
export {};
