import type { Dispatch, KeyboardEventHandler, SetStateAction } from 'react';

interface ListboxKeyboardOptions<Option, Element extends HTMLElement> {
  options: readonly Option[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setOpen: (open: boolean) => void;
  onSelect: (option: Option) => void;
  onKeyDown?: KeyboardEventHandler<Element>;
}

// Components keep ownership of filtering, open state, and selection.
export function createListboxKeyDownHandler<Option, Element extends HTMLElement>({
  options,
  activeIndex,
  setActiveIndex,
  setOpen,
  onSelect,
  onKeyDown,
}: ListboxKeyboardOptions<Option, Element>): KeyboardEventHandler<Element> {
  return (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    switch (event.key) {
      case 'Enter':
        if (options.length) {
          event.preventDefault();
          onSelect(options[activeIndex] ?? options[0]);
        }
        break;
      case 'Escape':
        setOpen(false);
        break;
      case 'ArrowDown':
      case 'ArrowUp': {
        event.preventDefault();
        setOpen(true);
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        setActiveIndex((index) => Math.max(0, Math.min(options.length - 1, index + direction)));
        break;
      }
    }
  };
}
