import { fireEvent, render, screen } from '@testing-library/react';
import { expectTypeOf } from 'vitest';
import { BodyText, Paragraph, type BodyTextVariant, type ParagraphProps } from '../index';
import type { HeadingProps } from '../../heading';
import type { LinkProps } from '../../link';
import { bodyTextClasses, headingTextClasses, linkTextClasses, textTones, textToneClasses, type TextWeight } from '../../../utils/text.styles';
import { paletteTones, paletteToneStyles } from '../../../themes/paletteTones';
import Button from '../../button/Button';

test('exports BodyText as the web-compatible Paragraph alias', () => {
  expect(BodyText).toBe(Paragraph);
});

test('exposes tone without the removed color prop across typography components', () => {
  expectTypeOf<HeadingProps>().not.toHaveProperty('color');
  expectTypeOf<ParagraphProps>().not.toHaveProperty('color');
  expectTypeOf<LinkProps>().not.toHaveProperty('color');
});

test('uses regular rather than normal for shared typography weights', () => {
  expectTypeOf<'regular'>().toExtend<TextWeight>();
  expectTypeOf<'normal'>().not.toExtend<TextWeight>();
});

test.each<[TextWeight, string]>([
  ['regular', 'font-regular'],
  ['medium', 'font-medium'],
  ['semibold', 'font-semibold'],
  ['bold', 'font-bold'],
  ['semiBold', 'font-semibold'],
  ['light', 'font-light'],
  ['extraBold', 'font-extrabold'],
])('supports the shared %s weight across typography styles', (weight, className) => {
  for (const classes of [bodyTextClasses({ weight }), headingTextClasses({ weight }), linkTextClasses({ weight })]) {
    expect(classes.split(' ')).toContain(className);
  }
});

test.each(paletteTones)('matches %s Button label and text tones', (tone) => {
  render(
    <>
      <Paragraph tone={tone}>Status message</Paragraph>
      {(['label', 'outline', 'text'] as const).map((variant) => (
        <Button key={variant} variant={variant} tone={tone}>{variant}</Button>
      ))}
      <Button tone={tone}>Solid</Button>
    </>,
  );
  const textClass = paletteToneStyles[tone].text;
  expect(screen.getByText('Status message')).toHaveClass(textClass);
  for (const variant of ['label']) {
    expect(screen.getByRole('button', { name: variant })).toHaveClass(textClass);
  }
  expect(screen.getByRole('button', { name: 'text' })).toHaveClass(paletteToneStyles[tone].buttonText);
  expect(screen.getByRole('button', { name: 'outline' })).toHaveClass(paletteToneStyles[tone].outlineText, paletteToneStyles[tone].mainBorder);
  expect(screen.getByRole('button', { name: 'Solid' })).toHaveClass(
    paletteToneStyles[tone].defaultText,
  );
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
  expect(text.className).toBe(`m-0 ${bodyTextClasses({ variant })}`);
  if (variant === 'overline') expect(text).toHaveClass('uppercase', 'tracking-wider');
});

test.each(textTones)('supports the %s text tone', (tone) => {
  render(<Paragraph tone={tone}>Body text</Paragraph>);
  expect(screen.getByText('Body text')).toHaveClass(textToneClasses[tone]);
  expect(screen.getByText('Body text')).not.toHaveAttribute('tone');
});

test('shares tone, weight, transform, and explicit size overrides across native elements', () => {
  const classes = bodyTextClasses({
    variant: 'subtitle1',
    size: 'xs',
    weight: 'semiBold',
    tone: 'error',
    textTransform: 'capitalize',
  }).split(' ');
  expect(classes).toEqual([
    'font-sans',
    'text-12',
    'leading-14',
    'font-semibold',
    'text-palette-error-text',
    'capitalize',
  ]);
  expect(bodyTextClasses({ tone: 'default' })).toBe(bodyTextClasses());
});

test('allows tone and weight overrides without losing the variant size', () => {
  render(
    <BodyText variant="caption" weight="bold" tone="inverse">
      Body text
    </BodyText>,
  );
  expect(screen.getByText('Body text')).toHaveClass('text-12', 'font-bold', 'text-misc-bg-white');
});

test('preserves native attributes, events, and class overrides without forwarding style props', () => {
  const onClick = vi.fn();
  render(
    <Paragraph
      id="body-copy"
      aria-label="Details"
      family="sans"
      size="sm"
      weight="bold"
      tone="muted"
      textTransform="uppercase"
      className="text-18"
      onClick={onClick}
    >
      Body text
    </Paragraph>,
  );
  const text = screen.getByText('Body text');
  expect(text).toHaveAttribute('id', 'body-copy');
  expect(text).toHaveAttribute('aria-label', 'Details');
  expect(text).toHaveClass('text-18', 'font-bold', 'text-text-secondary', 'uppercase');
  expect(text).not.toHaveClass('text-13');
  for (const attribute of ['family', 'size', 'weight', 'tone', 'textTransform']) {
    expect(text).not.toHaveAttribute(attribute);
  }
  fireEvent.click(text);
  expect(onClick).toHaveBeenCalledOnce();
});
