import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Textarea from '../TextArea';

describe('Textarea', () => {
  test('renders a labeled textarea and forwards changes', () => {
    const onChange = vi.fn();

    render(<Textarea label="Message" onChange={onChange} placeholder="Write a message" />);

    const textArea = screen.getByLabelText('Message');
    expect(textArea).toHaveAttribute('placeholder', 'Write a message');

    fireEvent.change(textArea, { target: { value: 'Hello' } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test('associates validation errors with the textarea', () => {
    render(<Textarea error="Message is required" id="message" label="Message" />);

    const textArea = screen.getByLabelText('Message');
    expect(textArea).toHaveAttribute('aria-invalid', 'true');
    expect(textArea).toHaveAttribute('aria-describedby', 'message-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Message is required');
  });

  test('shows a required indicator without changing the accessible label', () => {
    render(<Textarea label="Message" required />);

    expect(screen.getByRole('textbox', { name: 'Message' })).toBeInTheDocument();
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true');
  });

  test('supports controlled values', () => {
    const onChange = vi.fn();

    render(<Textarea onChange={onChange} value="Controlled message" />);

    expect(screen.getByDisplayValue('Controlled message')).toBeInTheDocument();
  });

  test.each(['outlined', 'filled', 'standard'] as const)('uses the shared %s floating-label placement', (variant) => {
    render(<Textarea label="Message" variant={variant} />);
    const textarea = screen.getByRole('textbox', { name: 'Message' });
    expect(screen.getByText('Message')).toHaveClass('top-2');

    fireEvent.change(textarea, { target: { value: 'Hello' } });
    const floatingLabel = screen.getByText('Message');
    if (variant === 'outlined') expect(floatingLabel).toHaveClass('-top-2');
    if (variant === 'filled') expect(floatingLabel).toHaveClass('top-1');
    if (variant === 'standard') expect(floatingLabel.parentElement).not.toBe(textarea.parentElement);
  });

  test('hides the visual label for an empty textarea with a placeholder and associates helper text', () => {
    render(<Textarea helperText="Keep it brief." label="Message" placeholder="Write a message" />);

    expect(screen.getByText('Message')).toHaveClass('sr-only');
    expect(screen.getByRole('textbox', { name: 'Message' })).toHaveAttribute('aria-describedby');
    expect(screen.getByText('Keep it brief.')).toHaveClass('text-text-secondary');
  });

  test('creates a three-part outlined notch after the textarea is filled', async () => {
    const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(48);
    try {
      render(<Textarea defaultValue="Hello" label="Message" />);
      const textarea = screen.getByRole('textbox', { name: 'Message' });
      await waitFor(() => expect(textarea.parentElement).toHaveClass('border-0'));
      expect(textarea.parentElement?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
    } finally {
      width.mockRestore();
    }
  });
});
