const themeKey = (mode) => mode.toLowerCase().replace(/[^a-z0-9]+/g, '-');

// Extracts the $value from each token in a group, ignoring metadata like $type.
const tokenValues = (tokens) =>
  Object.fromEntries(
    Object.entries(tokens)
      .filter(([name]) => name !== '$type')
      .map(([name, token]) => [name, token.$value]),
  );

// Follow nested Figma references such as "{A.B.C}".
const resolveTokenReference = (figmaTokens, value) => {
  const reference = value.match(/^\{(.+)\}$/);
  if (!reference) return value;

  const target = reference[1].split('.').reduce((current, key) => {
    if (!current || typeof current !== 'object' || !(key in current)) {
      throw new Error(`Unknown Figma token reference: ${value}`);
    }
    return current[key];
  }, figmaTokens);

  if (!target || typeof target !== 'object' || typeof target.$value !== 'string') {
    throw new Error(`Invalid Figma token reference: ${value}`);
  }

  return resolveTokenReference(figmaTokens, target.$value);
};

// Converts a map of token names and values to CSS variable references with a given prefix.
const toVars = (map, prefix) =>
  Object.fromEntries(Object.entries(map).map(([name, value]) => [`--${prefix}-${name}`, value]));

// Include token names found in any theme.
const unionVarRefs = (figmaTokens, pick, prefix) => {
  const names = [
    ...new Set(Object.values(figmaTokens.Primitives).flatMap((primitives) => Object.keys(pick(primitives)))),
  ];
  return Object.fromEntries(names.map((name) => [name, `var(--${prefix}-${name})`]));
};

// Utility function to create a color scale from a token group with a given prefix.
const colorScale = (tokens, prefix) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [name.replace(`${prefix}-`, ''), value]),
  );
// Utility function to create a color palette from a token group, resolving Figma references.
const colorPalette = (figmaTokens, tokens) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [name, resolveTokenReference(figmaTokens, value)]),
  );

// Utility function to extract RGB and alpha channels from a hex color value.
const colorChannels = (value) => {
  const match = /^#([\da-f]{6})([\da-f]{2})?$/i.exec(value);
  if (!match) throw new Error(`Unsupported color token: ${value}`);
  return {
    rgb: match[1].match(/../g).map((channel) => Number.parseInt(channel, 16)),
    alpha: match[2] ? Number.parseInt(match[2], 16) / 255 : 1,
  };
};

// Utility function to composite a foreground color over a background color, accounting for alpha transparency.
const compositeColor = (foreground, background) => {
  const fg = colorChannels(foreground);
  const bg = colorChannels(background);
  return `#${fg.rgb
    .map((channel, index) =>
      Math.round(channel * fg.alpha + bg.rgb[index] * (1 - fg.alpha))
        .toString(16)
        .padStart(2, '0'),
    )
    .join('')}`;
};

const themeColors = (figmaTokens, mode) => {
  const variables = figmaTokens.Variables[mode];
  const theme = tokenValues(variables.Theme);
  const misc = tokenValues(variables.Misc);
  const palette = colorPalette(figmaTokens, variables['Color-Palette']);
  const toneNames = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
  for (const tone of toneNames) {
    const main = palette[`${tone}-main`];
    palette[`${tone}-contrast`] = misc['bg-white'];
    palette[`${tone}-graphic`] = main;
    palette[`${tone}-surface`] = compositeColor(palette[`${tone}-opacity-light`], misc.paper);
    palette[`${tone}-text`] = main;
    palette[`${tone}-outline-text`] = main;
    palette[`${tone}-button-text`] = main;
  }
  const primitives = figmaTokens.Primitives[mode];

  return {
    background: {
      canvas: misc['body-bg'],
      surface: misc.paper,
    },
    misc: {
      'bg-white': misc['bg-white'],
      'bg-black': misc['bg-black'],
      'grey-light': misc['grey-light'],
      'chat-bg': misc['chat-bg'],
      'track-bg': misc['track-bg'],
      'table-header': misc['table-header'],
      'avatar-bg': misc['avatar-bg'],
      snackbar: misc.snackbar,
      'bg-facebook': misc['bg-facebook'],
      'bg-twitter': misc['bg-twitter'],
      'bg-linkedin': misc['bg-linkedin'],
    },
    text: {
      primary: theme['text-primary'],
      secondary: theme['text-secondary'],
      muted: theme['text-subtitle'],
      disabled: theme['text-disabled'],
    },
    border: {
      subtle: theme['outline-border'],
      input: theme['input-border'],
    },
    divider: theme.divider,
    'table-divider': theme.divider,
    'chip-background': theme['chip-background'],
    'filled-input-bg': theme['filled-input-bg'],
    'backdrop-overlay': theme['backdrop-overlay'],
    primary: colorScale(primitives.Color.Primary, 'primary'),
    secondary: colorScale(primitives.Color.Secondary, 'secondary'),
    info: colorScale(primitives.Color.Info, 'info'),
    gray: colorScale(primitives.Color.Gray, 'gray'),
    error: colorScale(primitives.Color.Error, 'error'),
    success: colorScale(primitives.Color.Success, 'success'),
    warning: colorScale(primitives.Color.Warning, 'warning'),
    palette,
    action: {
      active: theme['action-active'],
      hover: theme['action-hover'],
      'hover-surface': compositeColor(theme['action-hover'], misc.paper),
      selected: theme['action-selected'],
      focus: theme['action-focus'],
      disabled: theme['action-disabled-bg'],
      'disabled-content': theme['action-disabled'],
    },
  };
};

const colorVariablesForMode = (figmaTokens, mode) => {
  const flatten = (obj, path, out) => {
    for (const [key, value] of Object.entries(obj)) {
      const next = [...path, key];
      if (typeof value === 'string') out[`--${next.join('-')}`] = value;
      else flatten(value, next, out);
    }
    return out;
  };
  return flatten(themeColors(figmaTokens, mode), [], {});
};

// It connects Tailwind color utilities to theme-switchable CSS variables.
const adaptiveColors = (figmaTokens) => {
  const modes = Object.keys(figmaTokens.Variables);
  const defaultMode = modes.includes('Pulse') ? 'Pulse' : modes[0];
  const build = (obj, path) =>
    Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === 'string' ? `var(--${[...path, key].join('-')})` : build(value, [...path, key]),
      ]),
    );
  return build(themeColors(figmaTokens, defaultMode), []);
};

// Turns dimension tokens into a simpler key/value map for Tailwind utilities.
const dimensionScale = (tokens) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [
      name.replace(/^(gap-|border-radius-|border-)/, ''),
      value,
    ]),
  );

// It gets each theme’s dimension tokens, cleans their names with dimensionScale, then uses unionVarRefs to include keys found across all themes.
// Returns a map of CSS variable references for the given dimension primitive and theme mode.
const dimensions = (figmaTokens, primitiveName, variablePrefix) =>
  unionVarRefs(figmaTokens, (primitives) => dimensionScale(primitives[primitiveName]), variablePrefix);

// Generates CSS variable references for dimension tokens for a specific theme mode.
const dimensionVariablesForMode = (figmaTokens, mode) => ({
  ...toVars(dimensionScale(figmaTokens.Primitives[mode].Gap), 'spacing'),
  ...toVars(dimensionScale(figmaTokens.Primitives[mode]['Border-Radius']), 'radius'),
});

// Generates CSS variable references for typography tokens for a specific theme mode.
const typographyVariablesForMode = (figmaTokens, mode) => {
  const typography = figmaTokens.Primitives[mode].Typography;

  return {
    '--font-family': typography['font-family'].$value,
    ...toVars(tokenValues(typography['font-size']), 'font-size'),
    ...toVars(tokenValues(typography['font-weight']), 'font-weight'),
    ...toVars(tokenValues(typography['line-height']), 'line-height'),
  };
};

// Generates CSS variable references for a specific scale (e.g., font-size) across all themes.
const scaleUtilities = (figmaTokens, scaleName) =>
  unionVarRefs(figmaTokens, (primitives) => tokenValues(primitives.Typography[scaleName]), scaleName);

// The preset writes these variables under each theme class.
const variablesForMode = (figmaTokens, mode) => ({
  ...typographyVariablesForMode(figmaTokens, mode),
  ...dimensionVariablesForMode(figmaTokens, mode),
  ...colorVariablesForMode(figmaTokens, mode),
});

module.exports = {
  adaptiveColors,
  colorScale,
  dimensions,
  scaleUtilities,
  themeColors,
  themeKey,
  variablesForMode,
};
