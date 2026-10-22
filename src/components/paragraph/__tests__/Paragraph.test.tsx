import { render, screen } from '@testing-library/react';
import { BodyText, Paragraph, type BodyTextVariant } from '../index';

test('exports BodyText as the web-compatible Paragraph alias', () => {
  expect(BodyText).toBe(Paragraph);
});

const variants: Array<[BodyTextVariant, string, string]> = [
  ['subtitle1', 'text-18', 'font-medium'],
  ['subtitle2', 'text-15', 'font-medium'],
  ['body1', 'text-15', 'font-regular'],
  ['body2', 'text-13', 'font-regular'],
  ['caption', 'text-12', 'font-regular'],
  ['overline', 'text-12', 'font-medium'],
];
test.each(variants)('%s matches the shared size and default weight', (variant, size, weight) => {
  render(<BodyText variant={variant}>Body text</BodyText>);
  const text = screen.getByText('Body text');
  expect(text.tagName).toBe('P');
  expect(text).toHaveClass(size, weight, 'font-sans', 'text-text-primary');
  if (variant === 'overline') expect(text).toHaveClass('uppercase', 'tracking-wider');
});

test('allows tone and weight overrides without losing the variant size', () => {
  render(
    <BodyText variant="caption" weight="bold" tone="inverse">
      Body text
    </BodyText>,
  );
  expect(screen.getByText('Body text')).toHaveClass('text-12', 'font-bold', 'text-misc-bg-white');
});
