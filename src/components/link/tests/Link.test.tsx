import { fireEvent, render, screen } from '@testing-library/react';
import Link from '../Link';
import Paragraph from '../../paragraph/Paragraph';
import { bodyTextClasses, linkTextClasses, textTones, textToneClasses } from '../../../utils/text.styles';
import type { BodyTextVariant } from '../../paragraph/Paragraph';

describe('Link', () => {
  test.each<BodyTextVariant>(['subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'])(
    'shares Paragraph typography for %s',
    (variant) => {
      render(
        <>
          <Paragraph variant={variant}>Paragraph</Paragraph>
          <Link href="#work" variant={variant}>
            Work
          </Link>
        </>,
      );
      const link = screen.getByRole('link', { name: 'Work' });
      expect(link.className).toBe(linkTextClasses({ variant }));
      for (const className of screen.getByText('Paragraph').classList) {
        if (className !== 'm-0') expect(link).toHaveClass(className);
      }
      expect(link).toHaveAttribute('href', '#work');
    },
  );

  test.each(textTones)('supports the %s text tone', (tone) => {
    render(
      <Link href="#work" tone={tone}>
        Work
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass(textToneClasses[tone]);
    expect(screen.getByRole('link')).not.toHaveAttribute('tone');
  });

  test('supports size, weight, transform, tone, and custom classes', () => {
    render(
      <Link
        href="#work"
        size="xl"
        weight="bold"
        textTransform="capitalize"
        tone="error"
        className="custom"
      >
        Work
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass(
      'text-24',
      'leading-28',
      'font-bold',
      'capitalize',
      'text-palette-error-text',
      'custom',
    );
  });

  test.each(['always', 'hover', 'none'] as const)('supports %s underline behavior', (underline) => {
    render(
      <Link href="#work" underline={underline}>
        Work
      </Link>,
    );
    expect(screen.getByRole('link')).toHaveClass(underline === 'always' ? 'underline' : 'no-underline');
    if (underline === 'hover')
      expect(screen.getByRole('link')).toHaveClass('hover:underline', 'focus-visible:underline');
    expect(screen.getByRole('link').className).toBe(linkTextClasses({ underline }));
    expect(linkTextClasses({ underline })).toContain(bodyTextClasses());
    expect(screen.getByRole('link')).toHaveClass('focus-visible:outline', 'underline-offset-4');
  });

  test('preserves native attributes and click handlers while securing new tabs', () => {
    const onClick = vi.fn((event) => event.preventDefault());
    render(
      <Link href="#work" target="_blank" rel="external" download="work.pdf" onClick={onClick}>
        Work
      </Link>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('rel', 'external noopener noreferrer');
    expect(link).toHaveAttribute('download', 'work.pdf');
    fireEvent.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
