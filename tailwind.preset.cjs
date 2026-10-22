const path = require('node:path');
const { loadFigmaTokens } = require('./utils/loadFigmaTokens.cjs');
const {
  adaptiveColors,
  dimensions,
  scaleUtilities,
  themeKey,
  variablesForMode,
} = require('./utils/tailwindTokenUtils.cjs');

const tokens = loadFigmaTokens(path.join(__dirname, 'tokens/figma'));
const modes = Object.keys(tokens.Variables);
const defaultMode = modes.includes('Light') ? 'Light' : modes[0];

module.exports = {
  darkMode: 'class',
  safelist: modes.map(themeKey),
  theme: {
    extend: {
      opacity: { 45: '0.45' },
      colors: adaptiveColors(tokens),
      spacing: dimensions(tokens, 'Gap', 'spacing'),
      borderRadius: dimensions(tokens, 'Border-Radius', 'radius'),
      fontFamily: { sans: ['var(--font-family)'] },
      fontSize: scaleUtilities(tokens, 'font-size'),
      fontWeight: scaleUtilities(tokens, 'font-weight'),
      lineHeight: scaleUtilities(tokens, 'line-height'),
    },
  },
  plugins: [
    ({ addBase }) => {
      const noMode = modes.map((mode) => `:not(.${themeKey(mode)})`).join('');
      addBase({
        ':root': variablesForMode(tokens, defaultMode),
        ...(modes.includes('Dark')
          ? {
              '@media (prefers-color-scheme: dark)': {
                [`:root${noMode}`]: variablesForMode(tokens, 'Dark'),
              },
            }
          : {}),
        ...Object.fromEntries(
          modes.map((mode) => [
            `.${themeKey(mode)}`,
            { ...variablesForMode(tokens, mode), colorScheme: mode === 'Dark' ? 'dark' : 'light' },
          ]),
        ),
      });
    },
  ],
};
