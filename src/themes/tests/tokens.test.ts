import { createRequire } from 'node:module';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import figmaTokens from '../generatedTokens';
import { getThemeTokens, themeModes, themeTokens } from '../themeTokens';
import { cn } from '../../utils/cn';
import { paletteTones, paletteToneStyles } from '../paletteTones';

const require = createRequire(import.meta.url);
const preset = require('../../../tailwind.preset.cjs');
const { themeColors } = require('../../../utils/tailwindTokenUtils.cjs');

const colorChannels = (value: string) => {
  const hex = value.slice(1);
  return {
    rgb: [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16)),
    alpha: hex.length === 8 ? Number.parseInt(hex.slice(6, 8), 16) / 255 : 1,
  };
};
const compositeColor = (foreground: string, background: string) => {
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
const luminance = (value: string) => {
  const channels = colorChannels(value).rgb.map((channel) => channel / 255);
  const linear = channels.map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
};
const contrastRatio = (foreground: string, background: string) => {
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

describe('shared design tokens', () => {
  test.each(themeModes)('%s preserves original button fills and text colors', (theme) => {
    const mode = Object.keys(figmaTokens.Variables).find((name) => name.toLowerCase() === theme);
    if (!mode) throw new Error(`Missing Figma theme: ${theme}`);
    const colors = themeColors(figmaTokens, mode);
    const originalPalette = getThemeTokens(theme).core.color.palette;
    for (const tone of paletteTones) {
      for (const shade of ['main', 'dark']) {
        expect(colors.palette[`${tone}-${shade}`]).toBe(originalPalette[`${tone}-${shade}`]);
      }
    }
    for (const tone of paletteTones) {
      expect(colors.palette[`${tone}-outline-text`]).toBe(originalPalette[`${tone}-main`]);
      expect(colors.palette[`${tone}-button-text`]).toBe(originalPalette[`${tone}-main`]);
    }
  });

  test.each(paletteTones)('%s controls use accessible border and focus colors', (tone) => {
    const styles = paletteToneStyles[tone];
    expect(styles.fieldBorder).toContain(`border-palette-${tone}-graphic`);
    expect(styles.notchBorder).toContain(`border-palette-${tone}-graphic`);
    expect(styles.defaultState).toContain(`focus-visible:outline-palette-${tone}-graphic`);
  });

  test.each(['Light', 'Dark', 'Teal'] as const)('%s keeps readable text on original primary solid fills', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    for (const shade of ['main', 'dark']) {
      expect(
        contrastRatio(colors.palette[shade === 'main' ? 'primary-contrast' : 'primary-contrast-dark'], colors.palette[`primary-${shade}`]),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });

  test('exposes the reference palette and numeric scales without metadata', () => {
    expect(themeModes).toEqual(['dark', 'light', 'pulse', 'pulse-dark', 'teal', 'teal-dark']);
    expect(themeTokens.core.color.primary['500']).toBe('#087EA4');
    expect(themeTokens.semantic.color.background).toEqual({ canvas: '#F6F7F9', surface: '#ffffff' });
    expect(themeTokens.core.space['1']).toBe(4);
    expect(themeTokens.core.radius).toMatchObject({ xs: 2, sm: 4, md: 6, lg: 8, xl: 10, round: 500 });
    expect(themeTokens.core.fontSize['46']).toBe(46);
    expect(themeTokens.core.fontWeight.semibold).toBe(600);
    expect(themeTokens.core.space).not.toHaveProperty('$type');
  });

  test('resolves mode-specific palettes and typography', () => {
    expect(getThemeTokens('light').core.color.palette['primary-main']).toBe('#7367f0');
    expect(getThemeTokens('dark').semantic.color.background).toEqual({ canvas: '#25293c', surface: '#2f3349' });
    expect(getThemeTokens('dark').core.color.palette['primary-main']).toBe('#7367f0');
    expect(getThemeTokens('pulse-dark').semantic.color.background).toEqual({ canvas: '#23272f', surface: '#343a46' });
    expect(getThemeTokens('pulse-dark').core.color.palette['primary-main']).toBe('#58c4dc');
    expect(getThemeTokens('pulse-dark').semantic.color.text).toMatchObject({
      primary: '#f6f7f9',
      secondary: '#ebecf0',
      muted: '#99a1b3',
    });
    expect(getThemeTokens('light').core.fontFamily).toBe("'Inter', sans-serif");
    expect(getThemeTokens('dark').core.fontFamily).toBe("'Roboto', sans-serif");
    expect(getThemeTokens('teal').core.color.palette['primary-main']).not.toBe('#7367f0');
    expect(getThemeTokens('teal-dark').semantic.color.background).toEqual({ canvas: '#0b2023', surface: '#152e32' });
    expect(getThemeTokens('teal-dark').core.color.palette['primary-main']).toBe('#2dd4bf');
    expect(getThemeTokens('pulse').core.color.palette['primary-main']).toBe('#087EA4');
    expect(getThemeTokens('pulse').core.color.palette['secondary-main']).toBe('#404756');
    expect(getThemeTokens('pulse').semantic.color.background).toEqual({ canvas: '#F6F7F9', surface: '#ffffff' });
  });

  test.each(Object.keys(figmaTokens.Variables))('%s tone text meets WCAG AA contrast', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    const surfaces = [colors.background.canvas, colors.background.surface];

    for (const tone of ['primary', 'secondary', 'error', 'warning', 'info', 'success']) {
      const palette = colors.palette as Record<string, string>;
      const solidText = palette[`${tone}-contrast`];
      const whitePasses = contrastRatio('#ffffff', palette[`${tone}-main`]) >= 4.5;
      if (whitePasses) expect(solidText).toBe('#ffffff');
      else expect(luminance(solidText)).toBeLessThan(luminance(palette[`${tone}-main`]));
      for (const shade of ['main', 'dark']) {
        expect(contrastRatio(shade === 'main' ? solidText : palette[`${tone}-contrast-dark`], palette[`${tone}-${shade}`])).toBeGreaterThanOrEqual(4.5);
      }

      const graphic = palette[`${tone}-graphic`];
      for (const background of [
        ...surfaces,
        ...surfaces.map((surface) => compositeColor(colors.action.hover, surface)),
      ]) {
        expect(contrastRatio(graphic, background)).toBeGreaterThanOrEqual(3);
      }

      const toneText = palette[`${tone}-text`];
      const labelSurfaces = surfaces.flatMap((surface) =>
        ['opacity-lighter', 'opacity-light', 'opacity-main'].map((shade) =>
          compositeColor(palette[`${tone}-${shade}`], surface),
        ),
      );
      for (const background of [...surfaces, ...labelSurfaces]) {
        expect(contrastRatio(toneText, background)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test.each(Object.keys(figmaTokens.Variables))('%s tone text meets WCAG AA on tinted surfaces', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    const surfaces = [colors.background.canvas, colors.background.surface];

    for (const tone of ['primary', 'secondary', 'error', 'warning', 'info', 'success']) {
      const palette = colors.palette as Record<string, string>;
      const toneText = palette[`${tone}-text`];
      const tintedSurfaces = [
        ...surfaces,
        ...surfaces.map((surface) => compositeColor(colors.action.hover, surface)),
      ].flatMap((surface) =>
        ['opacity-lighter', 'opacity-light', 'opacity-main'].map((shade) =>
          compositeColor(palette[`${tone}-${shade}`], surface),
        ),
      );
      for (const background of [...surfaces, ...tintedSurfaces]) {
        expect(contrastRatio(toneText, background)).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  test.each(Object.keys(figmaTokens.Variables))('%s sticky table surfaces are opaque and readable', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    const surface = colors.background.surface;
    const hoverSurface = colors.action['hover-surface'];
    expect(hoverSurface).toBe(compositeColor(colors.action.hover, surface));
    expect(hoverSurface).toMatch(/^#[\da-f]{6}$/i);
    expect(contrastRatio(colors.text.primary, hoverSurface)).toBeGreaterThanOrEqual(4.5);

    for (const tone of ['primary', 'secondary', 'error', 'warning', 'info', 'success']) {
      const toneSurface = colors.palette[`${tone}-surface`];
      expect(toneSurface).toBe(compositeColor(colors.palette[`${tone}-opacity-light`], surface));
      expect(toneSurface).toMatch(/^#[\da-f]{6}$/i);
      expect(contrastRatio(colors.palette[`${tone}-text`], toneSurface)).toBeGreaterThanOrEqual(4.5);
    }
  });

  test.each(Object.keys(figmaTokens.Variables))('%s table dividers meet 3:1 contrast on table surfaces', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    const tableDivider = colors['table-divider'];
    const surfaces = [colors.background.canvas, colors.background.surface];
    const tableSurfaces = [
      ...surfaces,
      ...surfaces.map((surface) => compositeColor(colors.action.hover, surface)),
      ...['primary', 'secondary', 'error', 'warning', 'info', 'success'].flatMap((tone) =>
        surfaces.map((surface) => compositeColor(colors.palette[`${tone}-opacity-light`], surface)),
      ),
    ];

    for (const surface of tableSurfaces) {
      expect(contrastRatio(tableDivider, surface)).toBeGreaterThanOrEqual(3);
    }
  });

  test.each(Object.keys(figmaTokens.Variables))('%s semantic text and input borders meet contrast targets', (mode) => {
    const colors = themeColors(figmaTokens, mode);
    const surfaces = [colors.background.canvas, colors.background.surface];
    const textSurfaces = [
      ...surfaces,
      ...surfaces.flatMap((surface) =>
        ['hover', 'selected', 'focus'].map((state) => compositeColor(colors.action[state], surface)),
      ),
    ];
    for (const role of ['primary', 'secondary', 'muted']) {
      for (const surface of textSurfaces) {
        expect(contrastRatio(colors.text[role], surface)).toBeGreaterThanOrEqual(4.5);
      }
    }
    for (const surface of surfaces) {
      expect(contrastRatio(colors.border.input, surface)).toBeGreaterThanOrEqual(3);
    }
  });

  test('keeps token font sizes and weights distinct from color and family classes', () => {
    expect(cn('font-sans text-15 font-regular', 'text-text-primary')).toBe(
      'font-sans text-15 font-regular text-text-primary',
    );
    expect(cn('text-15', 'text-28 text-palette-primary-main')).toBe('text-28 text-palette-primary-main');
    expect(cn('rounded-md px-4', 'rounded-full px-6')).toBe('rounded-full px-6');
  });

  test('generates real Tailwind CSS for themes, radius, typography and control geometry', async () => {
    const result = await postcss([
      tailwind({
        presets: [preset],
        content: [
          {
            raw: 'light dark pulse-dark teal teal-dark pulse rounded-md text-15 font-regular min-h-9 min-h-11 min-h-12 bg-palette-primary-main text-palette-primary-contrast text-palette-primary-text border-palette-primary-graphic border-table-divider disabled:opacity-45',
          },
        ],
      }),
    ]).process('@tailwind base; @tailwind utilities;', { from: undefined });
    const css = result.css;
    for (const mode of themeModes) expect(css).toContain(`.${mode}`);
    expect(css).toContain(':root');
    expect(css).toContain('@media (prefers-color-scheme: dark)');
    expect(css).toContain('--background-canvas: #23272f');
    expect(css).toContain('.text-palette-primary-contrast');
    expect(css).toContain('.text-palette-primary-text');
    expect(css).toContain('.border-palette-primary-graphic');
    expect(css).toContain('.border-table-divider');
    expect(css).toContain('--radius-md: 6px');
    expect(css).toContain('border-radius: var(--radius-md)');
    expect(css).toContain('font-size: var(--font-size-15)');
    expect(css).toContain('font-weight: var(--font-weight-regular)');
    expect(css).toContain('background-color: var(--palette-primary-main)');
    for (const [key, pixels] of [
      [9, 36],
      [11, 44],
      [12, 48],
    ]) {
      expect(css).toContain(`min-height: var(--spacing-${key})`);
      expect(css).toContain(`--spacing-${key}: ${pixels}px`);
    }
    expect(css).toContain('opacity: 0.45');
  });
});
