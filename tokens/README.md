# Design Tokens

This folder stores design token exports and source material for the component library.

Recommended layout:

- `tokens/figma/` for Figma token exports and related raw data
- `src/themes/` for app-level theme consumption and mapped token definitions

Keep raw token exports separate from application code so the tokens can be regenerated without touching component logic.

## Figma token files

Each theme mode has a `tokens/figma/<Mode>.json` file containing its `Variables` and `Primitives`. These files are the source of truth; `npm run generate-tokens` validates their references and generates `src/themes/generatedTokens.ts`.

## Adding a new theme

Modes (themes) are data, not code. To add one:

1. Add the new mode as `tokens/figma/<Mode>.json` (Figma export or hand-authored), holding that mode's `Variables` and `Primitives` with the standard groups (`Theme`/`Misc`/`Color-Palette` and `Color`/`Gap`/`Border-Radius`/`Typography`).
2. Run `npm run generate-tokens` (part of `npm run build`). The generator validates the structure and every `{...}` token reference, failing the build on a broken export.
3. The new theme is then automatically available as:
   - `themeTokens.themes.<theme>` / `getThemeTokens('<theme>')` at runtime
   - a `.<theme>` CSS class and adaptive utilities (for example `bg-background-surface`) via `tailwind.preset.cjs`

The `Pulse` theme is the default and uses React.dev's light palette. `Pulse-Dark` applies the matching dark palette for system dark mode; the original `Dark` theme is retained for explicit use.

`Teal-Dark` complements `Teal` with dark teal surfaces and lighter accent fills. Select `teal-dark` in Storybook or apply the `teal-dark` class to a root or subtree. It uses the same generated contrast checks without changing the default or system theme.

All theme modes derive tone text and solid-fill foregrounds with at least 4.5:1 contrast on their supported surfaces. Solid foregrounds are checked against both resting and interactive fills; if an original interactive fill cannot share a passing foreground, a compatible shade is selected from the existing theme tokens.

Semantic primary, secondary, and muted CSS text colors meet 4.5:1 contrast on canvas, paper, and neutral hover/selected/focus surfaces. Chart marks, tone outlines, field borders, solid-control focus outlines, and table dividers use colors with at least 3:1 contrast against their supported surfaces. Derived colors come from the theme's existing primitives, not hardcoded replacement colors. Raw Figma exports and the runtime token snapshot remain source values; these accessibility adjustments are applied by the Tailwind theme mapping.

Disabled controls and decorative borders retain their original styling; they are not subject to the same WCAG contrast requirements. Custom consumer colors and arbitrary foreground/background combinations still require validation. These contrast rules do not constitute a guarantee of complete WCAG compliance.

Sticky tables use opaque `palette-<tone>-surface` and `action-hover-surface` colors, derived by compositing the corresponding tint over the theme surface. This keeps scrolling content hidden without background gradients that prevent automated contrast checks.

`npm run check-tokens` fails (for CI) if `src/themes/generatedTokens.ts` is stale relative to the Figma export, and lint-staged regenerates it automatically on commit.
