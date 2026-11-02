import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Register the project's custom text-size and font-weight utilities.
      'font-size': [{ text: ['12', '13', '15', '18', '24', '28', '38', '46'] }],
      'font-weight': [{ font: ['regular'] }],
    },
  },
});
// Combine conditional classes and remove conflicting Tailwind utilities.
export const cn = (...classes: ClassValue[]) => twMerge(clsx(classes));
