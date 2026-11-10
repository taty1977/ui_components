# Web UI Component Library

React DOM components using the Figma tokens, Tailwind CSS 3, CVA variants, and token-generation architecture shared with [ui-mob-components](https://github.com/taty1977/ui-mob-components).

## Usage

React and React DOM 19 are peer dependencies. Import the compiled stylesheet once in your application:

```tsx
import '@taty1977/my-component-library/styles.css';
import { Button, Input } from '@taty1977/my-component-library';

export function Example() {
  return (
    <main className="pulse">
      <Input label="Email" type="email" helperText="Use your work address." />
      <Button tone="primary" variant="default" size="md">
        Continue
      </Button>
    </main>
  );
}
```

No theme provider is needed. Pulse is the default theme. Set `light`, `dark`, `pulse-dark`, `teal`, `teal-dark`, or `pulse` on the root or a subtree to switch CSS variables. Without an explicit root class, the system color scheme selects Pulse or Pulse Dark. The original Dark theme remains available by setting `dark` explicitly. Teal Dark pairs dark teal surfaces with bright teal accents. Nested themed sections are supported.

The stylesheet includes Tailwind's base reset; applications with their own Tailwind build can use the preset instead (avoid loading both copies of the utilities). Font names come from the tokens: load Inter and Roboto in the host application if you want those exact typefaces.

### Optional Tailwind integration

For applications using Tailwind CSS 3:

```js
// tailwind.config.cjs
module.exports = {
  presets: [require('@taty1977/my-component-library/tailwind-preset')],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@taty1977/my-component-library/dist/**/*.{js,cjs}'],
};
```

Include Tailwind's `base`, `components`, and `utilities` directives in your application CSS. Adaptive classes such as `bg-background-surface`, `text-text-primary`, `bg-palette-primary-main`, `rounded-md`, and `text-15` follow the active theme.

### Tokens and variants

- Raw Figma exports live in [tokens/figma](tokens/figma/). Generate the typed snapshot with `npm run generate-tokens`; do not edit the snapshot manually.
- `themeTokens.core` exposes the default Pulse palette, numeric spacing/radii, and typography. `themeTokens.themes`, `themeModes`, and `getThemeTokens('dark')` / `getThemeTokens('pulse-dark')` expose each mode.
- Button appearances: `default`, `label`, `outline`, `text`; tones: `primary`, `secondary`, `error`, `warning`, `info`, `success`; sizes: `sm` (36px), `md` (44px), `lg` (48px).
- Shared Button outline styling uses a 1px border without changing tone colors. Button stories run from Playground through Appearances, Tones, Sizes, With Icons, Full Width, States, and Contrast Comparison. Paragraph stories group Typography Variants, Tones, Weights, and Button Tone Comparison after Playground; existing story URLs are preserved and controls fixed by comparison examples are disabled.
- `ComponentVariant` is the shared appearance type in [src/types/variants.ts](src/types/variants.ts), exported from the package root. Button, Accordion, Carousel, and Table build on it while preserving their existing variant restrictions and legacy aliases. `ButtonVariant` remains a compatibility alias; use `ComponentVariant` in new shared code.
- `componentVariantAppearances` maps shared variants and legacy field aliases to `ComponentAppearance` (`solid`, `label`, `outline`, or `text`). Button, Accordion, Carousel, and Table reuse this mapping. `resolveVariantTone` applies legacy primary/secondary tone aliases across these components and fields. Component-specific rules remain local: headerless tables use `label`, Carousel retains legacy neutral surfaces, and fields retain their own appearances and error-tone override.
- Table headers support `default` (solid), `label` (tinted), `outline` (initial variant), and `text` with six tones; the outer card remains neutral. Headerless tables always use `label`, regardless of the requested variant, tinting the first-column row headers without a table outline or individual cell boxes. Table sizes are `default` (initial, alias for `normal`), `small`, and `normal`. Legacy `outlined`, `filled`, and `standard` values remain supported for tables with headers; `filled` retains its solid treatment.
- Sticky first table columns use a soft right-side shadow instead of an adjacent column border; sticky last columns use a matching left-side shadow instead of their left border. At the mobile breakpoint, stickiness and shadows are disabled and normal column borders apply.
- In headerless tables, a sticky first column shows a right divider at the left edge and replaces it with a shadow while horizontally scrolled.
- Table `stickyHeader` enables a scrolling region capped at 320px with pinned headers and a matching soft bottom shadow. The `label` variant keeps its header bottom divider and adds the shadow while scrolled down. Header stickiness works at all breakpoints and can be combined with sticky columns.
- Accordion headers use the same Button-style variants and six tones, with `small` / `normal` sizes. Previous `outlined`, `filled`, and `standard` variants map to `outline`, `default`, and `text`; expansion behavior and custom icons are unchanged.
- Chart has no `variant` prop. It keeps a neutral surface and supports six `tone` values for the leading default series color; custom palettes and series colors still take precedence. Stories include Playground, Types (line, bar, area, pie, and donut), Tones, and States. `isAnimationActive` defaults to true for consumers and is disabled in stories for stable visual snapshots.
- Carousel supports Button-style `default` (solid), `label` (tinted), `outline` (initial variant), and `text` appearances with six `tone` values. It applies the appearance to its frame and controls and the tone to active thumbnails, indicators, and badges, including in the modal. Legacy `primary` and `secondary` variants preserve their original neutral frames and control treatment. Stories include Playground, Variants, and Tones alongside the existing examples.
- Carousel `initialIndex` must be a finite integer (invalid values throw a `RangeError`); out-of-range integers are clamped to the available images. Active thumbnails and indicators expose `aria-current`. Closing the gallery restores focus to the actual opener. The `+N` tile counts all images it represents, including the covered thumbnail; with `openOnClick={false}`, that slot is a regular selectable thumbnail instead.
- Input, Select, Autocomplete, and Textarea share `outlined`, `filled`, and `standard` appearances, `small` / `normal` sizes, and the same six tones. Single-line fields are 44px / 48px; Textarea height still follows `rows` and native resizing. Focus doubles the outlined or bottom border, matching the shared field styling. Numeric native `size` values remain supported on Select and Autocomplete.
- Autocomplete and Select use `default` as their initial variant and an alias for `outlined`, in both the component APIs and stories.
- Heading variants `h1`–`h6` use the shared 46/38/28/24/18/15px scale; the initial `default` variant is an alias for `h4`, and `level` still takes precedence. Paragraph (also exported as `BodyText`) provides `subtitle1`, `subtitle2`, `body1`, `body2`, `caption`, and `overline`. Its public typography types directly re-export the shared styling types; internal consumers use `bodyTextClasses` rather than the removed `paragraphTextClasses` alias.
- Typography supports `default`, `muted`, the six palette tones, and `inverse`; weights are `regular`, `medium`, `semibold`, and `bold`.
- Buttons use original theme token colors for each tone and appearance. Filled buttons use white text; label, outline, and text appearances use their tone colors.
- Paragraph tones (also shared by Heading, Link, and Paragraph-based field messages) use the original theme palette colors. Use `tone="error"` for validation messages.
- Link is a native anchor sharing Paragraph's `variant`, `size`, `weight`, `tone`, legacy `color`, and `textTransform` features. `underline` supports `always` (default), `hover` (also shown on keyboard focus), and `none`. Native anchor attributes and events are supported; `_blank` links include `noopener noreferrer`.
- Navbar uses Link for navigation; Modal and Gallery use Heading for section/dialog titles; field helper messages and Chart/Modal descriptions use Paragraph. `src/utils/text.styles.ts` centralizes component-independent `bodyTextClasses`, `headingTextClasses`, and `linkTextClasses`, along with their styling option types, tones, weights, and text transforms. Heading keeps level precedence and native heading semantics; Link adds underline and focus styles to shared body typography. Card reuses `bodyTextClasses` and keeps its arbitrary ReactNode containers. Form labels, table cells, and inline button text retain their native semantics.
- Navbar collapses below 768px of its own container width (including narrow Storybook frames), rather than relying on the browser viewport. Its mobile toggle and links have 44px minimum touch targets; long brand text truncates to prevent overflow. The MobileMenu story uses a 375px frame.
- Card, IconButton, and Menu support the shared `default`, `label`, `outline`, and `text` variants and six tones. Card provides optional title, description, and actions; IconButton supports small/medium/large sizes and circular/square shapes; Menu provides an accessible trigger, keyboard-navigable items, outside-click dismissal, and Escape handling.
- Navbar provides responsive brand and section links, an active-link indicator, and an Escape-dismissible mobile menu. Gallery provides a responsive, category-filtered image grid and an accessible preview dialog with arrow-key navigation, focus trapping, and focus restoration. Gallery filters reuse Button's theme colors; its Storybook images are self-contained SVG artwork that loads without external requests.
- Modal is a controlled, portal-rendered dialog with accessible naming, optional backdrop dismissal, Escape handling, focus trapping and restoration, body scroll locking, and small, medium, large, or full-width sizes. Gallery reuses Modal for its project previews; `closeButtonLabel` customizes the close control's accessible name.
- Drawer is a controlled temporary overlay with `anchor="left" | "right" | "top" | "bottom"`. It reuses Modal's dismissal, focus, and scroll-lock behavior and inherits CSS theme tokens from its source subtree across the portal. Side drawers default to `width={320}`; top/bottom drawers use `height="auto"`. Dimensions are capped at the viewport and content scrolls inside. Pass `open`, `onClose`, and a `title` or `ariaLabel`. Drawer titles use 19px semibold text with a 22px line height, vertically centered with the close control and retaining the accessible h2 heading; `titleClassName` overrides title styling in Drawer or Modal without changing other Modal defaults. Persistent/permanent and swipe gestures are not supported.
- Drawer stories are ordered Playground, Right Anchor, Top Anchor, Bottom Anchor, and Theme Comparison, preserving existing story URLs. Controls group content, layout, appearance, state, behavior, accessibility, and events; the example manages open state and navigation content.
- Gallery's optional `showHoverActions` uses an inset theme surface with a centered title and circular link/zoom controls. Items with `href` get a project link; zoom opens Modal. In this mode captions move into the overlay. Actions appear on hover or keyboard focus and remain visible on touch devices. Overlay titles have an explicit theme background and are hidden while the overlay is inactive on hover-capable devices; controls remain keyboard-reachable. The default card-click preview is unchanged.
- Gallery Storybook examples enable `showHoverActions` and include sample project links. For application usage, pass `showHoverActions` explicitly and provide each project's `href`; `WithoutHoverActions` demonstrates the original captioned cards.
- Gallery hover link and preview icons use the primary fill, white text, and darker interaction state. Preview uses the shared IconButton.
- Gallery exposes `onFilterChange` (category or `null` for All), `onProjectClick`, `onPreviewOpen`, `onPreviewClose`, and `onPreviewChange` (each receives the project). Storybook connects these callbacks to action spies so interactions appear in the Actions panel.
- Gallery's `filterStyle` selects `default` (initial style, an alias for `underline`), `pill`, `underline`, or `rectangle`. Default and underline filters use a transparent background with a bottom border on the selected category; all styles preserve category filtering and `aria-pressed` state. Pass `filterStyle="pill"` to retain the previous initial appearance.
- Storybook groups Card under **Data Display** and IconButton/Menu under **Inputs**, with categorized controls and variant/tone examples. Card includes header-only, content-only, and action examples; IconButton covers sizes, shapes, disabled and keyboard states; Menu covers icons, separators, disabled items, icon-only triggers, keyboard selection, and outside-click dismissal. Interaction stories run in the existing browser test project. Card's previous `Surfaces/Card` Storybook URLs move to `Data Display/Card`.
- Storybook includes button variant/tone matrices and typography scales. Fields use a compact mobile-style set: Playground, Variants, Tones, With Icons (where supported), and States. Every example follows the alphabetically sorted theme toolbar, including Teal Dark.
- Story controls start with `default` where that variant is supported and no tone selected ("Choose option"); omitted tones use each component's built-in fallback. Fields and typography retain their own initial variant names, and headerless tables retain their required `label` appearance. Variant and tone matrices still render their complete ranges. These story defaults do not change component API defaults.

Legacy primary/secondary control variants remain aliases. The previous theme-provider API and custom font-family props are no longer supported; use theme classes and token-driven `font-sans` instead.

## Development

```sh
npm install
npm run storybook
```

- `npm run generate-tokens` / `npm run check-tokens`: regenerate or verify the typed token snapshot.
- `npm run typecheck`: TypeScript validation.
- `npm test` / `npm run test:watch`: Vitest unit tests and headless Chromium Storybook tests, matching the mobile project structure.
- `npm test -- --project=unit`: Testing Library unit tests with cleanup and DOM matchers from [vitest.setup.ts](vitest.setup.ts).
- `npm test -- --project=storybook`: render every story in Chromium, including any play-function checks. Run `npx playwright install chromium` once before running browser tests.
- `npm run lint`: ESLint.
- `npm run build`: token generation, Vite library build, TypeScript declarations.
- `npm run build-storybook`: static Vite-backed component catalog.
- `npm run check-package`: build, pack, and smoke-test the actual npm archive (ESM, CommonJS, server rendering, consumer types, CSS, and the Tailwind preset). Uses the system `tar` command, available on current Windows and GitHub Ubuntu runners; temporary archives are removed afterward.
- `npm run validate`: run all release checks, including unit/browser tests, the production Storybook build, and the package smoke test.

Storybook follows the mobile catalog organization: **All Components** first, **Inputs** for buttons and fields, and **Data Display** for typography and display components. Web-only components use the same categories; the responsive web preview toolbar is retained. Moving stories into these groups changes their Storybook URLs.

The pre-commit hook runs lint-staged, token consistency, type checking, and tests.

Reusable field components (`FieldNotch`, `LabelText`) and field styling helpers live in [src/components/shared/fields](src/components/shared/fields/), with their unit tests alongside them. The public `LabelText` and Input type exports remain unchanged.

[global.css](global.css) is the root Tailwind stylesheet shared by Storybook and the library build. The published stylesheet remains `styles.css`, so existing consumer imports do not change.

## Package exports

- Package root: ESM, CommonJS, and TypeScript declarations.
- `@taty1977/my-component-library/styles.css`: compiled web stylesheet.
- `@taty1977/my-component-library/tailwind-preset`: optional Tailwind 3 preset.

## Production and releases

Use Node.js 22.22.2+ (22.x) or 24.15.0+ (24.x) for development and CI, matching the installed tooling requirements. Install from the lockfile and verify before releasing:

```sh
npm ci
npx playwright install chromium
npm run validate
```

`npm pack` automatically rebuilds the library through `prepack`, so the archive does not rely on previously generated `dist` files. The package is configured for public npm access; React and React DOM remain peer dependencies. CI runs checks on pull requests and pushes to `master`.

### Separate web and mobile Chromatic projects

Create or select a **dedicated web project** in Chromatic linked to `taty1977/ui_components`. Leave the mobile repository's project unchanged. In this repository's GitHub **Settings > Secrets and variables > Actions**, set `CHROMATIC_PROJECT_TOKEN` to the **web** project's token. Do not reuse the mobile project's token or store either token in source control.

The tracked Chromatic config deliberately contains no project token. Both the local CLI and CI use `CHROMATIC_PROJECT_TOKEN` from the environment. For example, in PowerShell, after securely setting that environment variable:

```powershell
npm run chromatic
```

If a local ignored `.env` already defines `CHROMATIC_PROJECT_TOKEN`, update that value to the dedicated web-project token too.

CI reports a missing token as a configuration error. Fork pull requests skip Chromatic because repository secrets are unavailable; the main CI checks still run. Configuring the secret and completing a successful web-project build are required before visual-test setup is complete.

### Controlled npm publishing

Nothing is published by the validation commands or automatically on a push. The Release workflow maintains Changesets version PRs; publishing is explicitly opt-in:

1. Record a consumer-facing change with `npx changeset`, then commit the changeset with the code.
2. Enable GitHub Actions to create pull requests in repository settings so Changesets can open the version PR.
3. Review and merge the version PR into `master`.
4. When ready to publish, configure the repository's `NPM_TOKEN` secret with permission to publish this npm scope. Verify ownership and that the version has not already been published.
5. Manually run **Actions > Release > Run workflow** on `master`, selecting **Publish unreleased versions to npm**. All validation gates run again before publishing; npm provenance is enabled.

Before the first production release, configure branch protection for `master` to require the CI `checks` status, review the packed API and version, and complete the dedicated Chromatic project setup above.
