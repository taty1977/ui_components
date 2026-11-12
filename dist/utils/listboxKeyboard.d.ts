import type { Dispatch, KeyboardEventHandler, SetStateAction } from 'react';
interface ListboxKeyboardOptions<Option, Element extends HTMLElement> {
    options: readonly Option[];
    activeIndex: number;
    setActiveIndex: Dispatch<SetStateAction<number>>;
    setOpen: (open: boolean) => void;
    onSelect: (option: Option) => void;
    onKeyDown?: KeyboardEventHandler<Element>;
}
export declare function createListboxKeyDownHandler<Option, Element extends HTMLElement>({ options, activeIndex, setActiveIndex, setOpen, onSelect, onKeyDown, }: ListboxKeyboardOptions<Option, Element>): KeyboardEventHandler<Element>;
export {};
