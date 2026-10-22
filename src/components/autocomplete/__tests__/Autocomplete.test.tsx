import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete from '../Autocomplete';

describe('Autocomplete Component', () => {
  const options = ['Apple', 'Banana', 'Cherry'];

  test('renders without crashing', () => {
    const { getByPlaceholderText } = render(
      <Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />,
    );
    expect(getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  test('does not display options when input is focused with empty value', () => {
    const { getByPlaceholderText, queryByText } = render(
      <Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />,
    );
    fireEvent.focus(getByPlaceholderText('Search...'));
    expect(queryByText('Apple')).not.toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
    expect(queryByText('Cherry')).not.toBeInTheDocument();
  });

  test('calls onSelect when an option is clicked', () => {
    const onSelectMock = vi.fn();
    const { getByPlaceholderText, getByText } = render(
      <Autocomplete options={options} onSelect={onSelectMock} placeholder="Search..." />,
    );
    fireEvent.focus(getByPlaceholderText('Search...'));
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Ba' } });
    fireEvent.click(getByText('Banana'));
    expect(onSelectMock).toHaveBeenCalledWith('Banana');
  });

  test('calls onSelect for first filtered option when Enter is pressed', () => {
    const onSelectMock = vi.fn();
    const { getByPlaceholderText } = render(
      <Autocomplete options={options} onSelect={onSelectMock} placeholder="Search..." />,
    );
    const input = getByPlaceholderText('Search...');

    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Ba' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onSelectMock).toHaveBeenCalledWith('Banana');
  });

  test('filters options based on input value', () => {
    const { getByPlaceholderText, getByText, queryByText } = render(
      <Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />,
    );
    fireEvent.focus(getByPlaceholderText('Search...'));
    fireEvent.change(getByPlaceholderText('Search...'), { target: { value: 'Ap' } });
    expect(getByText('Apple')).toBeInTheDocument();
    expect(queryByText('Banana')).not.toBeInTheDocument();
  });

  test('shows clear button on focus with value and clears input when clicked', () => {
    render(<Autocomplete options={options} onSelect={() => {}} placeholder="Search..." />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'Banana' } });

    const clearButton = screen.getByRole('button', { name: /clear input/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(input).toHaveValue('');
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    expect(screen.queryByText('Banana')).not.toBeInTheDocument();
    expect(screen.queryByText('Cherry')).not.toBeInTheDocument();
  });

  test('renders custom icon nodes in both icon slots', () => {
    render(
      <Autocomplete
        iconLeft={<span data-testid="custom-left-icon">Left</span>}
        iconRight={<span data-testid="custom-right-icon">Right</span>}
        onSelect={() => {}}
        options={options}
      />,
    );

    expect(screen.getByTestId('custom-left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-right-icon')).toBeInTheDocument();
    expect(screen.getByTestId('custom-left-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('custom-right-icon').parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  test('renders a label and associates validation errors', () => {
    render(<Autocomplete error="Fruit is required" label="Fruit" onSelect={() => {}} options={options} required />);

    const input = screen.getByRole('combobox', { name: 'Fruit' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
    expect(screen.getByRole('alert')).toHaveTextContent('Fruit is required');
  });

  test('applies custom className to the container', () => {
    const { container } = render(
      <Autocomplete className="custom-autocomplete-class" onSelect={() => {}} options={options} />,
    );
    expect(container.firstChild).toHaveClass('custom-autocomplete-class');
  });

  test('honors a default value without mixing controlled and uncontrolled props', () => {
    render(<Autocomplete defaultValue="Banana" label="Fruit" onSelect={() => {}} options={options} />);
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveValue('Banana');
  });

  test('navigates suggestions with arrows and dismisses them with Escape', () => {
    const onSelect = vi.fn();
    render(<Autocomplete label="Fruit" onSelect={onSelect} options={options} />);
    const input = screen.getByRole('combobox', { name: 'Fruit' });
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'true');
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onSelect).toHaveBeenCalledWith('Banana');
    expect(input).toHaveValue('Banana');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('clear remains keyboard accessible and restores focus to the input', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Autocomplete label="Fruit" onSelect={onSelect} options={options} />);
    const input = screen.getByRole('combobox');
    await user.type(input, 'Banana');
    await user.tab();
    expect(screen.getByRole('button', { name: 'Clear input' })).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
  });

  test.each(['outlined', 'filled', 'standard'] as const)('uses the shared %s floating-label placement', (variant) => {
    render(<Autocomplete label="Fruit" onSelect={() => {}} options={options} variant={variant} />);

    const input = screen.getByRole('combobox', { name: 'Fruit' });
    expect(screen.getByText('Fruit')).toHaveClass('top-1/2');
    fireEvent.change(input, { target: { value: 'Apple' } });

    const floatingLabel = screen.getByText('Fruit');
    if (variant === 'outlined') expect(floatingLabel).toHaveClass('-top-2');
    if (variant === 'filled') expect(floatingLabel).toHaveClass('top-1');
    if (variant === 'standard') expect(floatingLabel.parentElement).not.toBe(input.parentElement);
  });

  test('sizes custom icons to 30px and associates helper text', () => {
    render(
      <Autocomplete
        helperText="Start typing to search."
        iconLeft={<svg data-testid="left-icon" />}
        iconRight={<svg data-testid="right-icon" />}
        label="Fruit"
        onSelect={() => {}}
        options={options}
      />,
    );

    expect(screen.getByTestId('left-icon').parentElement).toHaveClass('size-5');
    expect(screen.getByTestId('right-icon').parentElement).toHaveClass('size-5');
    expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('aria-describedby');
    expect(screen.getByText('Start typing to search.')).toHaveClass('text-text-secondary');
  });

  test('sizes the outlined notch to the floating label', async () => {
    const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(48);
    try {
      render(
        <Autocomplete defaultValue="Apple" label="Fruit" onSelect={() => {}} options={options} variant="outlined" />,
      );
      const input = screen.getByRole('combobox', { name: 'Fruit' });
      await waitFor(() => expect(input.parentElement).toHaveClass('border-0'));
      expect(input.parentElement?.querySelectorAll('[aria-hidden="true"]')).toHaveLength(3);
    } finally {
      width.mockRestore();
    }
  });
});
