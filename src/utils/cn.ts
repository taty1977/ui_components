import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['12', '13', '15', '18', '24', '28', '38', '46'] }],
      'font-weight': [{ font: ['regular'] }],
    },
  },
});
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
