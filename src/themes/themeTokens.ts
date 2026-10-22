import figmaTokens, { themeKeys } from './generatedTokens';

export type FigmaThemeMode = keyof typeof figmaTokens.Variables;
export type ThemeMode = (typeof themeKeys)[FigmaThemeMode];

function resolve(value: string): string {
  const reference = value.match(/^\{(.+)\}$/);
  if (!reference) return value;
  let target: unknown = figmaTokens;
  for (const key of reference[1].split('.')) {
    if (!target || typeof target !== 'object' || !(key in target)) {
      throw new Error(`Unknown token reference: ${value}`);
    }
    target = (target as Record<string, unknown>)[key];
  }
  if (!target || typeof target !== 'object' || !('$value' in target) || typeof target.$value !== 'string') {
    throw new Error(`Invalid token reference: ${value}`);
  }
  return resolve(target.$value);
}

type TokenGroup = Record<string, { readonly $value: string } | string>;
const values = (group: TokenGroup): Record<string, string> =>
  Object.fromEntries(
    Object.entries(group).flatMap(([key, token]) => (typeof token === 'string' ? [] : [[key, resolve(token.$value)]])),
  );
const scale = (group: TokenGroup, prefix = ''): Record<string, string> =>
  Object.fromEntries(Object.entries(values(group)).map(([key, value]) => [key.replace(prefix, ''), value]));
const dimensions = (group: TokenGroup, prefix: string | RegExp = ''): Record<string, number> =>
  Object.fromEntries(
    Object.entries(values(group)).map(([key, value]) => [key.replace(prefix, ''), Number.parseFloat(value)]),
  );

function createThemeTokens(mode: FigmaThemeMode) {
  const variables = figmaTokens.Variables[mode];
  const primitives = figmaTokens.Primitives[mode];
  const palette = values(variables['Color-Palette']);
  return {
    core: {
      color: {
        primary: scale(primitives.Color.Primary, 'primary-'),
        secondary: scale(primitives.Color.Secondary, 'secondary-'),
        info: scale(primitives.Color.Info, 'info-'),
        error: scale(primitives.Color.Error, 'error-'),
        warning: scale(primitives.Color.Warning, 'warning-'),
        success: scale(primitives.Color.Success, 'success-'),
        gray: scale(primitives.Color.Gray, 'gray-'),
        palette,
      },
      space: dimensions(primitives.Gap, 'gap-'),
      radius: dimensions(primitives['Border-Radius'], /^(border-radius-|border-)/),
      fontFamily: primitives.Typography['font-family'].$value,
      fontSize: dimensions(primitives.Typography['font-size']),
      fontWeight: dimensions(primitives.Typography['font-weight']),
      lineHeight: dimensions(primitives.Typography['line-height']),
    },
    semantic: {
      color: {
        background: { canvas: variables.Misc['body-bg'].$value, surface: variables.Misc.paper.$value },
        text: {
          primary: variables.Theme['text-primary'].$value,
          secondary: variables.Theme['text-secondary'].$value,
          muted: variables.Theme['text-subtitle'].$value,
          disabled: variables.Theme['text-disabled'].$value,
        },
        border: { subtle: variables.Theme['outline-border'].$value, strong: variables.Theme['input-border'].$value },
      },
    },
  };
}

const themes = Object.fromEntries(
  (Object.keys(figmaTokens.Variables) as FigmaThemeMode[]).map((mode) => [themeKeys[mode], createThemeTokens(mode)]),
) as Record<ThemeMode, ReturnType<typeof createThemeTokens>>;

export const themeModes = Object.values(themeKeys);
export const themeTokens = { core: themes.light.core, semantic: themes.light.semantic, themes };
export const getThemeTokens = (mode: ThemeMode) => themes[mode];
