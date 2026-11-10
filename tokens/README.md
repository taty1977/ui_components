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

`Teal-Dark` complements `Teal` with dark teal surfaces and lighter accent fills. Select `teal-dark` in Storybook or apply the `teal-dark` class to a root or subtree. It uses the same theme-token mapping without changing the default or system theme.

Theme palette values come directly from the referenced tokens in each Figma export. The `Teal` theme retains its original palette; edit `tokens/figma/Teal.json` to change it.

Tone text, solid fills, outlines, focus indicators, semantic text, borders, and dividers use the original theme token colors without contrast-based substitutions. Check color combinations against your product's accessibility requirements when selecting a theme.

Sticky tables use opaque `palette-<tone>-surface` and `action-hover-surface` colors, derived by compositing the corresponding tint over the theme surface.

`npm run check-tokens` fails (for CI) if `src/themes/generatedTokens.ts` is stale relative to the Figma export, and lint-staged regenerates it automatically on commit.
