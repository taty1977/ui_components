import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from '../Heading';
import { headingTextClasses, resolveHeadingLevel, textTones, textToneClasses } from '../../../utils/text.styles';
import Button from '../../button/Button';

describe('Heading', () => {
  test.each(['error', 'warning', 'info', 'success'] as const)('uses the solid %s Button fill for status headings', (tone) => {
    render(
      <>
        <Heading tone={tone}>Status</Heading>
        <Button tone={tone}>Action</Button>
      </>,
    );
    expect(screen.getByRole('heading', { name: 'Status' })).toHaveClass(`text-palette-${tone}-text`);
    expect(screen.getByRole('button', { name: 'Action' })).toHaveClass(`bg-palette-${tone}-main`);
  });
  test('uses h4 for both the omitted and explicit default variant', () => {
    const { rerender } = render(<Heading>Title</Heading>);
    const heading = screen.getByRole('heading', { level: 4 });
    const classes = heading.className;
    expect(classes).toBe(`m-0 ${headingTextClasses()}`);
    expect(resolveHeadingLevel()).toBe('h4');
    rerender(<Heading variant="default">Title</Heading>);
    expect(screen.getByRole('heading', { level: 4 })).toHaveClass('text-24', 'leading-28');
    expect(screen.getByRole('heading').className).toBe(classes);
    rerender(
      <Heading variant="default" level="h2">
        Title
      </Heading>,
    );
    expect(screen.getByRole('heading', { level: 2 })).toHaveClass('text-38');
  });

  test.each(textTones)('supports the %s text tone', (tone) => {
    render(<Heading tone={tone}>Title</Heading>);
    expect(screen.getByRole('heading')).toHaveClass(textToneClasses[tone]);
    expect(screen.getByRole('heading')).not.toHaveAttribute('tone');
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
    expect(screen.getByRole('heading').className).toBe(`m-0 ${headingTextClasses({ variant })}`);
  });
  test('shares level precedence and typography overrides through the central helper', () => {
    const options = {
      level: 'h2',
      variant: 'h6',
      weight: 'semiBold',
      tone: 'error',
      textTransform: 'capitalize',
    } as const;
    render(<Heading {...options} className="text-15">Title</Heading>);
    expect(resolveHeadingLevel(options)).toBe('h2');
    expect(headingTextClasses(options).split(' ')).toEqual([
      'font-sans', 'text-38', 'leading-42', 'font-semibold', 'text-palette-error-text', 'capitalize',
    ]);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-15', 'font-semibold', 'capitalize', 'text-palette-error-text');
    expect(heading).not.toHaveClass('text-38');
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
      <Heading level="h4" tone="info">
        Additional information
      </Heading>,
    );

    expect(screen.getByRole('heading', { name: 'Additional information' })).toHaveClass('text-palette-info-text');
  });

  test('supports selectable text transform', () => {
    render(<Heading textTransform="uppercase">Section title</Heading>);

    expect(screen.getByRole('heading', { name: 'Section title' })).toHaveClass('uppercase');
  });
});
