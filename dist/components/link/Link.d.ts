import type { AnchorHTMLAttributes } from 'react';
import { type LinkStyleOptions } from '../../utils/text.styles';
export type { LinkUnderline } from '../../utils/text.styles';
export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'color'>, LinkStyleOptions {
    family?: 'sans';
}
export default function Link({ variant, size, weight, family: _family, tone, textTransform, underline, className, children, target, rel, ...props }: LinkProps): import("react/jsx-runtime").JSX.Element;
