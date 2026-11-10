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

describe('shared design tokens', () => {
  test.each(themeModes)('%s keeps original palette colors and text treatments', (theme) => {
    const mode = (Object.keys(figmaTokens.Variables) as (keyof typeof figmaTokens.Variables)[]).find(
      (name) => name.toLowerCase() === theme,
    );
    if (!mode) throw new Error(`Missing Figma theme: ${theme}`);
    const colors = themeColors(figmaTokens, mode);
    const originalPalette = getThemeTokens(theme).core.color.palette as Record<string, string>;
    for (const tone of paletteTones) {
      const main = originalPalette[`${tone}-main`];
      expect(colors.palette[`${tone}-main`]).toBe(main);
      expect(colors.palette[`${tone}-dark`]).toBe(originalPalette[`${tone}-dark`]);
      expect(colors.palette[`${tone}-light`]).toBe(originalPalette[`${tone}-light`]);
      expect(colors.palette[`${tone}-contrast`]).toBe(colors.misc['bg-white']);
      expect(colors.palette[`${tone}-graphic`]).toBe(main);
      expect(colors.palette[`${tone}-text`]).toBe(main);
      expect(colors.palette[`${tone}-outline-text`]).toBe(main);
      expect(colors.palette[`${tone}-button-text`]).toBe(main);
    }
    expect(colors.text.primary).toBe(getThemeTokens(theme).semantic.color.text.primary);
    expect(colors.text.secondary).toBe(getThemeTokens(theme).semantic.color.text.secondary);
    expect(colors.text.muted).toBe(getThemeTokens(theme).semantic.color.text.muted);
    expect(colors.border.input).toBe(figmaTokens.Variables[mode].Theme['input-border'].$value);
    expect(colors['table-divider']).toBe(figmaTokens.Variables[mode].Theme.divider.$value);
  });

  test.each(paletteTones)('%s controls use original tone colors for borders and focus', (tone) => {
    const styles = paletteToneStyles[tone];
    expect(styles.fieldBorder).toContain(`border-palette-${tone}-graphic`);
    expect(styles.notchBorder).toContain(`border-palette-${tone}-graphic`);
    expect(styles.defaultState).toContain(`focus-visible:outline-palette-${tone}-graphic`);
    expect(styles.defaultState).not.toContain('enabled:hover:text-');
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
