import { createRequire } from 'node:module';
import postcss from 'postcss';
import tailwind from 'tailwindcss';
import { getThemeTokens, themeModes, themeTokens } from './themeTokens';
import { cn } from '../utils/cn';

const require = createRequire(import.meta.url);
const preset = require('../../tailwind.preset.cjs');

describe('shared design tokens', () => {
  test('exposes the reference palette and numeric scales without metadata', () => {
    expect([...themeModes].sort()).toEqual(['dark', 'light', 'teal']);
    expect(themeTokens.core.color.primary['500']).toBe('#7367f0');
    expect(themeTokens.core.space['1']).toBe(4);
    expect(themeTokens.core.radius).toMatchObject({ xs: 2, sm: 4, md: 6, lg: 8, xl: 10, round: 500 });
    expect(themeTokens.core.fontSize['46']).toBe(46);
    expect(themeTokens.core.fontWeight.semibold).toBe(600);
    expect(themeTokens.core.space).not.toHaveProperty('$type');
  });

  test('resolves mode-specific palettes and typography', () => {
    expect(getThemeTokens('light').core.color.palette['primary-main']).toBe('#7367f0');
    expect(getThemeTokens('dark').semantic.color.background).toEqual({ canvas: '#25293c', surface: '#2f3349' });
    expect(getThemeTokens('light').core.fontFamily).toBe("'Inter', sans-serif");
    expect(getThemeTokens('dark').core.fontFamily).toBe("'Roboto', sans-serif");
    expect(getThemeTokens('teal').core.color.palette['primary-main']).not.toBe('#7367f0');
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
            raw: 'light dark teal rounded-md text-15 font-regular min-h-9 min-h-11 min-h-12 bg-palette-primary-main disabled:opacity-45',
          },
        ],
      }),
    ]).process('@tailwind base; @tailwind utilities;', { from: undefined });
    const css = result.css;
    for (const mode of themeModes) expect(css).toContain(`.${mode}`);
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
