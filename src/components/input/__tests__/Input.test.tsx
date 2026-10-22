import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../Input';

describe('Input', () => {
  test('renders optional icon slots and forwards input changes', () => {
    const onChange = vi.fn();

    render(
      <Input
        iconLeft={<span data-testid="left-icon">Left</span>}
        iconRight={<span data-testid="right-icon">Right</span>}
        onChange={onChange}
        placeholder="Email address"
      />,
    );

    const input = screen.getByPlaceholderText('Email address');
    expect(input.parentElement).toHaveClass('border-palette-primary-main', 'rounded-md');
    expect(input).toHaveClass('bg-transparent', 'font-sans');
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'name@example.com' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('conditionally renders and associates a label and error message', () => {
    render(<Input error="Email is required" id="email" label="Email address" />);

    const input = screen.getByLabelText('Email address');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');
    expect(screen.getByText('Email is required')).toHaveAttribute('id', 'email-error');
  });

  test('shows a required indicator without changing the accessible label', () => {
    render(<Input label="Email address" required />);

    expect(screen.getByRole('textbox', { name: 'Email address' })).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  test('conditionally renders icon slots outside the input', () => {
    render(
      <Input
        outsideIconLeft={<span data-testid="outside-left-icon">Left</span>}
        outsideIconRight={<span data-testid="outside-right-icon">Right</span>}
      />,
    );

    expect(screen.getByTestId('outside-left-icon').parentElement).toHaveClass('self-stretch');
    expect(screen.getByTestId('outside-right-icon')).toBeInTheDocument();
  });

  test('forwards the input type and announces errors', () => {
    render(<Input error="Password is required" label="Password" type="password" />);

    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
    expect(screen.getByRole('alert')).toHaveTextContent('Password is required');
  });

  test('supports keyboard activation for outside icon actions', async () => {
    const handleActions = vi.fn();
    const user = userEvent.setup();

    render(<Input handleActions={handleActions} outsideIconLeft={<span>Help</span>} />);

    const action = screen.getByRole('button');
    action.focus();
    await user.keyboard('{Enter} ');

    expect(handleActions).toHaveBeenCalledTimes(2);
  });

  test.each(['outlined', 'filled', 'standard'] as const)(
    'keeps the %s label in-field until the input has a value',
    (variant) => {
      render(<Input label="Email" variant={variant} />);

      const input = screen.getByRole('textbox', { name: 'Email' });
      const label = screen.getByText('Email');
      expect(label).toHaveClass('top-1/2');

      fireEvent.focus(input);
      expect(label).toHaveClass('top-1/2');

      fireEvent.change(input, { target: { value: 'person@example.com' } });
      const floatingLabel = screen.getByText('Email');
      if (variant === 'outlined') expect(floatingLabel).toHaveClass('-top-2');
      if (variant === 'filled') expect(floatingLabel).toHaveClass('top-1');
      if (variant === 'standard') {
        expect(floatingLabel.parentElement).toBe(input.parentElement?.parentElement);
      }
    },
  );

  test('hides the visual label when an empty input has a placeholder', () => {
    render(<Input label="Email" placeholder="you@example.com" />);

    expect(screen.getByText('Email')).toHaveClass('sr-only');
    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('placeholder', 'you@example.com');
  });

  test('covers the outlined border behind the floating label and sizes the notch', async () => {
    const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(48);
    try {
      render(<Input defaultValue="person@example.com" label="Email" />);

      const input = screen.getByRole('textbox', { name: 'Email' });
      await waitFor(() => expect(input.parentElement).toHaveClass('border-0'));

      const field = input.parentElement!;
      const borderSegments = field.querySelectorAll('[aria-hidden="true"]');
      expect(borderSegments).toHaveLength(3);
      expect(borderSegments[2]).toHaveStyle({ left: '60px' });
      expect(screen.getByText('Email')).toHaveClass('bg-background-surface');
    } finally {
      width.mockRestore();
    }
  });

  test('renders inside and outside adornments at 30px', () => {
    render(
      <Input
        iconLeft={<svg data-testid="left-icon" />}
        iconRight={<svg data-testid="right-icon" />}
        outsideIconLeft={<svg data-testid="outside-left-icon" />}
        outsideIconRight={<svg data-testid="outside-right-icon" />}
      />,
    );

    for (const icon of [screen.getByTestId('left-icon'), screen.getByTestId('right-icon')]) {
      expect(icon.parentElement).toHaveClass('size-5');
    }
    for (const icon of [screen.getByTestId('outside-left-icon'), screen.getByTestId('outside-right-icon')]) {
      expect(icon.parentElement).toHaveClass('min-w-[26px]');
    }
  });
});
