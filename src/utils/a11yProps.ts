/** Decorative elements are hidden from assistive tech; labeled ones are exposed as images. */
export const a11yProps = (decorative: boolean, label?: string) =>
  ({
    'aria-hidden': decorative || undefined,
    role: decorative ? undefined : 'img',
    'aria-label': label,
  }) as const;
