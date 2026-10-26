import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading, { resolveTextTone } from '../Heading';
import { textTones } from '../../../utils/text.styles';

describe('Heading', () => {
  test.each([
    ['title', 'default'],
    ['Primary', 'primary'],
    ['Secondary', 'secondary'],
    ['danger', 'error'],
  ] as const)('resolves the legacy %s color to %s', (color, tone) => {
    expect(resolveTextTone(color)).toBe(tone);
  });

  test.each(textTones)('preserves the canonical %s tone', (tone) => {
    expect(resolveTextTone(tone)).toBe(tone);
  });

  test.each([
    ['h1', 'text-46'],
    ['h2', 'text-38'],
    ['h3', 'text-28'],
    ['h4', 'text-24'],
    ['h5', 'text-18'],
    ['h6', 'text-15'],
  ] as const)('%s variant sets the web heading level and token size', (variant, size) => {
    render(<Heading variant={variant}>Title</Heading>);
    expect(screen.getByRole('heading', { level: Number(variant.slice(1)) })).toHaveClass(size, 'font-bold');
  });
  test('uses theme tokens for size, weight, and family', () => {
    render(
      <Heading level="h3" weight="medium" family="sans">
        Section title
      </Heading>,
    );

    const heading = screen.getByRole('heading', { name: 'Section title' });
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveClass('text-28', 'font-medium', 'font-sans');
  });

  test('supports a semantic heading level independent of visual size', () => {
    render(<Heading level="h2">Subheading</Heading>);

    expect(screen.getByRole('heading', { level: 2, name: 'Subheading' })).toBeInTheDocument();
  });

  test('uses semantic theme colors for notification text', () => {
    render(
      <Heading level="h4" color="info">
        Additional information
      </Heading>,
    );

    expect(screen.getByRole('heading', { name: 'Additional information' })).toHaveClass('text-palette-info-main');
  });

  test('supports selectable text transform', () => {
    render(<Heading textTransform="uppercase">Section title</Heading>);

    expect(screen.getByRole('heading', { name: 'Section title' })).toHaveClass('uppercase');
  });
});
