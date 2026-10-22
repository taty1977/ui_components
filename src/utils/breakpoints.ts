export const breakpoints = { mobile: '640px', tablet: '900px', desktop: '1280px' } as const;
export type Breakpoint = keyof typeof breakpoints;
