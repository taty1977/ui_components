/** Decorative elements are hidden from assistive tech; labeled ones are exposed as images. */
export declare const a11yProps: (decorative: boolean, label?: string) => {
    readonly 'aria-hidden': true | undefined;
    readonly role: "img" | undefined;
    readonly 'aria-label': string | undefined;
};
