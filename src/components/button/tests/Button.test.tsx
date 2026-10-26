import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { paletteTones } from '../../../themes/paletteTones';
import Button from '../Button';

describe('Button Component', () => {
  test('renders both icon slots at the requested size and handles clicks', () => {
    const onClick = vi.fn();

    render(
      <Button
        aria-label="Save changes"
        iconLeft={<span data-testid="left-icon">Left</span>}
        iconRight={<span data-testid="right-icon">Right</span>}
        onClick={onClick}
        size="lg"
      >
        Save
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Save changes' });
    expect(button).toHaveAttribute('data-size', 'lg');
    expect(button).toHaveAttribute('data-tone', 'primary');
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders the primary variant', () => {
    render(
      <Button iconLeft={<span data-testid="primary-icon">Add</span>} variant="primary">
        Create
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Create' });
    expect(button).toHaveAttribute('data-variant', 'primary');
    expect(screen.getByTestId('primary-icon').parentElement).toHaveClass('inline-flex', 'size-5');
  });

  test('applies an optional width preset', () => {
    render(<Button width="full">Continue</Button>);

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('data-width', 'full');
  });

  test('uses the medium token sizing by default', () => {
    render(<Button>Continue</Button>);

    const button = screen.getByRole('button', { name: 'Continue' });
    expect(button).toHaveAttribute('data-size', 'md');
    expect(button).toHaveAttribute('data-width', 'default');
    expect(button).toHaveClass('min-h-11', 'text-15');
  });

  test.each([
    ['sm', 'min-h-9'],
    ['md', 'min-h-11'],
    ['lg', 'min-h-12'],
  ] as const)('uses the mobile %s button frame', (size, minHeight) => {
    render(<Button size={size}>Continue</Button>);

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveClass(minHeight);
  });

  test('applies custom className', () => {
    render(<Button className="custom-btn">Custom Class</Button>);

    const button = screen.getByRole('button', { name: 'Custom Class' });
    expect(button).toHaveClass('custom-btn');
  });

  describe.each(paletteTones)('%s tone', (tone) => {
    test.each(['default', 'label', 'outline', 'text'] as const)('%s appearance and interaction states', (variant) => {
      render(<Button variant={variant} tone={tone} label="Continue" />);
      const button = screen.getByRole('button', { name: 'Continue' });
      expect(button).toHaveClass(variant === 'default' ? 'text-misc-bg-white' : `text-palette-${tone}-main`);
      if (variant === 'default') expect(button).toHaveClass(`bg-palette-${tone}-main`);
      if (variant === 'label') expect(button).toHaveClass(`bg-palette-${tone}-opacity-light`);
      if (variant === 'outline') expect(button).toHaveClass('border', 'bg-transparent', `border-palette-${tone}-main`);
      if (variant === 'text') expect(button).toHaveClass('bg-transparent');
      const stateColor = variant === 'default' ? 'dark' : variant === 'label' ? 'opacity-main' : 'opacity-lighter';
      for (const state of ['hover', 'active', 'focus']) {
        expect(button).toHaveClass(`enabled:${state}:bg-palette-${tone}-${stateColor}`);
      }
    });
  });

  test.each(['default', 'label', 'outline', 'text'] as const)('disabled %s buttons do not fire actions', (variant) => {
    const onClick = vi.fn();
    render(<Button variant={variant} disabled onClick={onClick} label="Continue" />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-45');
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
