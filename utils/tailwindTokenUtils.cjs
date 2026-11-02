const themeKey = (mode) => mode.toLowerCase().replace(/[^a-z0-9]+/g, '-');

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

const toVars = (map, prefix) =>
  Object.fromEntries(Object.entries(map).map(([name, value]) => [`--${prefix}-${name}`, value]));

// Include token names found in any theme.
const unionVarRefs = (figmaTokens, pick, prefix) => {
  const names = [
    ...new Set(Object.values(figmaTokens.Primitives).flatMap((primitives) => Object.keys(pick(primitives)))),
  ];
  return Object.fromEntries(names.map((name) => [name, `var(--${prefix}-${name})`]));
};

const colorScale = (tokens, prefix) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [name.replace(`${prefix}-`, ''), value]),
  );

const colorPalette = (figmaTokens, tokens) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [name, resolveTokenReference(figmaTokens, value)]),
  );

const colorChannels = (value) => {
  const match = /^#([\da-f]{6})([\da-f]{2})?$/i.exec(value);
  if (!match) throw new Error(`Unsupported color token: ${value}`);
  return {
    rgb: match[1].match(/../g).map((channel) => Number.parseInt(channel, 16)),
    alpha: match[2] ? Number.parseInt(match[2], 16) / 255 : 1,
  };
};

// Accessibility: flatten alpha over an opaque surface for contrast checks.
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

// Accessibility: WCAG luminance uses linearized sRGB.
const luminance = (value) => {
  const channels = colorChannels(value).rgb.map((channel) => channel / 255);
  const linear = channels.map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};

const contrastRatio = (foreground, background) => {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

const minimumContrast = (foreground, backgrounds) =>
  Math.min(...backgrounds.map((background) => contrastRatio(foreground, background)));

const colorDistance = (first, second) => {
  const a = colorChannels(first).rgb;
  const b = colorChannels(second).rgb;
  return Math.sqrt(a.reduce((total, channel, index) => total + (channel - b[index]) ** 2, 0));
};

// Accessibility: prefer the closest passing token; text needs 4.5:1.
const readableColor = (candidates, backgrounds, reference, mode, tone, minimumRatio = 4.5) => {
  const selected = [...new Set(candidates)]
    .map((color) => ({ color, contrast: minimumContrast(color, backgrounds) }))
    .filter(({ contrast }) => contrast >= minimumRatio)
    .sort(
      (first, second) =>
        colorDistance(first.color, reference) - colorDistance(second.color, reference) ||
        second.contrast - first.contrast,
    )[0];
  if (!selected) throw new Error(`${mode}: no WCAG AA text color found for ${tone}`);
  return selected.color;
};

const neutralColorCandidates = (primitives, misc) => [
  ...Object.values(primitives.Color.Gray).map((token) => token.$value),
  misc['bg-white'],
  misc['bg-black'],
  misc.snackbar,
];

// Accessibility targets: text 4.5:1, graphics 3:1.
const accessiblePaletteColors = (mode, palette, primitives, misc, theme) => {
  const toneNames = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
  const neutralCandidates = neutralColorCandidates(primitives, misc);
  const output = {};
  for (const tone of toneNames) {
    const main = palette[`${tone}-main`];
    const dark = palette[`${tone}-dark`];
    const backgrounds = [misc['body-bg'], misc.paper];
    const controlSurfaces = backgrounds.flatMap((surface) => [surface, compositeColor(theme['action-hover'], surface)]);
    const graphicCandidates = [
      ...Object.values(primitives.Color[tone[0].toUpperCase() + tone.slice(1)]).map((token) => token.$value),
      ...neutralCandidates,
      main,
      dark,
      palette[`${tone}-light`],
    ];
    // Keep one readable foreground across resting and interactive fills.
    const sharedForeground = neutralCandidates.some((color) => minimumContrast(color, [main, dark]) >= 4.5);
    const preservePrimaryForeground = tone === 'primary' && (!sharedForeground || mode === 'Teal');
    output[`${tone}-contrast`] = preservePrimaryForeground
      ? misc['bg-white']
      : readableColor(
          neutralCandidates,
          sharedForeground ? [main, dark] : [main],
          misc['bg-white'],
          mode,
          `${tone} solid`,
        );
    if (preservePrimaryForeground) {
      output[`${tone}-main`] = readableColor(
        graphicCandidates,
        [output[`${tone}-contrast`]],
        main,
        mode,
        `${tone} solid fill`,
      );
    }
    // Keep corrected primary hover visibly darker without losing text contrast.
    const interactionCandidates = preservePrimaryForeground
      ? graphicCandidates.filter(
          (color) =>
            luminance(color) < luminance(output[`${tone}-main`]) && contrastRatio(color, output[`${tone}-main`]) >= 1.2,
        )
      : graphicCandidates;
    output[`${tone}-dark`] = readableColor(
      interactionCandidates,
      [output[`${tone}-contrast`]],
      dark,
      mode,
      `${tone} solid interaction`,
    );
    output[`${tone}-graphic`] = readableColor(graphicCandidates, controlSurfaces, main, mode, `${tone} graphic`, 3);

    // Opaque sticky surfaces avoid image/gradient contrast ambiguity.
    output[`${tone}-surface`] = compositeColor(palette[`${tone}-opacity-light`], misc.paper);
    // Include tints layered over hovered rows.
    const labelBackgrounds = controlSurfaces.flatMap((surface) =>
      ['opacity-lighter', 'opacity-light', 'opacity-main'].map((shade) =>
        compositeColor(palette[`${tone}-${shade}`], surface),
      ),
    );
    output[`${tone}-text`] = readableColor(
      graphicCandidates,
      [...controlSurfaces, ...labelBackgrounds],
      main,
      mode,
      `${tone} text`,
    );
  }
  return output;
};

// Share one color tree across theme variables and utilities.
const themeColors = (figmaTokens, mode) => {
  const variables = figmaTokens.Variables[mode];
  const primitives = figmaTokens.Primitives[mode];
  const theme = tokenValues(variables.Theme);
  const misc = tokenValues(variables.Misc);
  const palette = colorPalette(figmaTokens, variables['Color-Palette']);
  Object.assign(palette, accessiblePaletteColors(mode, palette, primitives, misc, theme));
  const tableSurfaces = [misc['body-bg'], misc.paper];
  const contentSurfaces = [
    ...tableSurfaces,
    ...tableSurfaces.flatMap((surface) =>
      ['action-hover', 'action-selected', 'action-focus'].map((state) => compositeColor(theme[state], surface)),
    ),
  ];
  const neutralCandidates = neutralColorCandidates(primitives, misc);
  const readableText = (token) =>
    readableColor(
      [token, ...neutralCandidates].map((color) => compositeColor(color, misc.paper)),
      contentSurfaces,
      compositeColor(token, misc.paper),
      mode,
      'semantic text',
    );
  // Accessibility: dividers need 3:1 across supported row backgrounds.
  const tableDivider = readableColor(
    neutralCandidates,
    [
      ...tableSurfaces,
      ...tableSurfaces.map((surface) => compositeColor(theme['action-hover'], surface)),
      ...['primary', 'secondary', 'error', 'warning', 'info', 'success'].flatMap((tone) =>
        tableSurfaces.map((surface) => compositeColor(palette[`${tone}-opacity-light`], surface)),
      ),
    ],
    compositeColor(theme.divider, misc.paper),
    mode,
    'table divider',
    3,
  );

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
      primary: readableText(theme['text-primary']),
      secondary: readableText(theme['text-secondary']),
      muted: readableText(theme['text-subtitle']),
      disabled: theme['text-disabled'],
    },
    border: {
      subtle: theme['outline-border'],
      input: readableColor(
        [compositeColor(theme['input-border'], misc.paper), ...neutralCandidates],
        tableSurfaces,
        compositeColor(theme['input-border'], misc.paper),
        mode,
        'input border',
        3,
      ),
    },
    divider: theme.divider,
    'table-divider': tableDivider,
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

// Variable references let unprefixed utilities follow the active theme.
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

const dimensionScale = (tokens) =>
  Object.fromEntries(
    Object.entries(tokenValues(tokens)).map(([name, value]) => [
      name.replace(/^(gap-|border-radius-|border-)/, ''),
      value,
    ]),
  );

const dimensions = (figmaTokens, primitiveName, variablePrefix) =>
  unionVarRefs(figmaTokens, (primitives) => dimensionScale(primitives[primitiveName]), variablePrefix);

const dimensionVariablesForMode = (figmaTokens, mode) => ({
  ...toVars(dimensionScale(figmaTokens.Primitives[mode].Gap), 'spacing'),
  ...toVars(dimensionScale(figmaTokens.Primitives[mode]['Border-Radius']), 'radius'),
});

const typographyVariablesForMode = (figmaTokens, mode) => {
  const typography = figmaTokens.Primitives[mode].Typography;

  return {
    '--font-family': typography['font-family'].$value,
    ...toVars(tokenValues(typography['font-size']), 'font-size'),
    ...toVars(tokenValues(typography['font-weight']), 'font-weight'),
    ...toVars(tokenValues(typography['line-height']), 'line-height'),
  };
};

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
