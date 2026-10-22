import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from '../Select';

describe('Select', () => {
  test.each(['outlined', 'filled', 'standard'] as const)(
    'visually centers the %s chevron including the bottom border',
    (variant) => {
      render(
        <Select label="Country" variant={variant}>
          <option value="ca">Canada</option>
        </Select>,
      );
      const trigger = screen.getByRole('button', { name: 'Country' });
      const chevron = trigger.querySelector('svg.size-4')?.parentElement;
      expect(trigger).toHaveClass('group');
      expect(chevron).toHaveClass('items-center', 'justify-center');
      if (variant !== 'outlined') expect(chevron).toHaveClass('top-[0.5px]', 'group-focus-within:top-px');
      else expect(chevron).not.toHaveClass('top-[0.5px]');
    },
  );

  test('renders a labeled select with custom icons', () => {
    render(
      <Select iconLeft={<span data-testid="left-icon">Left</span>} label="Country">
        <option value="">Choose a country</option>
        <option value="us">United States</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Country' })).toBeInTheDocument();
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  test('forwards selected values and changes', () => {
    const onChange = vi.fn();

    render(
      <Select defaultValue="us" onChange={onChange}>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>,
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('us');
    fireEvent.change(select, { target: { value: 'ca' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(select).toHaveValue('ca');
  });

  test('shows a check icon for the selected dropdown option', () => {
    render(
      <Select defaultValue="us" showSelectionCheck>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));

    const listbox = screen.getByRole('listbox');
    expect(
      within(listbox)
        .getByRole('option', { name: /United States/ })
        .querySelector('svg'),
    ).not.toBeNull();
    expect(
      within(listbox)
        .getByRole('option', { name: /Canada/ })
        .querySelector('svg'),
    ).toBeNull();
  });

  test('associates validation errors with the select', () => {
    render(
      <Select error="Country is required" id="country" label="Country">
        <option value="">Choose a country</option>
      </Select>,
    );

    const select = screen.getByRole('combobox', { name: 'Country' });
    expect(select).toHaveAttribute('aria-invalid', 'true');
    expect(select).toHaveAttribute('aria-describedby', 'country-error');
    expect(screen.getByRole('alert')).toHaveTextContent('Country is required');
  });

  test('does not show a check icon for the default option', () => {
    render(
      <Select defaultValue="">
        <option value="">Choose a country</option>
        <option value="us">United States</option>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));

    const listbox = screen.getByRole('listbox');
    expect(within(listbox).getByRole('option', { name: 'Choose a country' }).querySelector('svg')).toBeNull();
  });

  test('custom options update controlled state and dispatch a genuine native change', async () => {
    const user = userEvent.setup();
    const changed = vi.fn();
    function ControlledSelect() {
      const [value, setValue] = React.useState('us');
      return (
        <Select
          label="Country"
          name="country"
          value={value}
          onChange={(event) => {
            changed(event.target.value, event.nativeEvent instanceof Event);
            setValue(event.target.value);
          }}
        >
          <option value="us">United States</option>
          <option value="ca">Canada</option>
        </Select>
      );
    }
    render(<ControlledSelect />);
    const trigger = screen.getByRole('button', { name: 'Country' });
    await user.click(trigger);
    await user.click(within(screen.getByRole('listbox')).getByRole('option', { name: 'Canada' }));
    expect(changed).toHaveBeenCalledWith('ca', true);
    expect(screen.getByRole('combobox')).toHaveValue('ca');
    expect(trigger).toHaveTextContent('Canada');
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('disabled options cannot be selected', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Select label="Country" defaultValue="us" onChange={onChange}>
        <option value="us">United States</option>
        <option value="ca" disabled>
          Canada
        </option>
      </Select>,
    );
    await user.click(screen.getByRole('button'));
    await user.click(within(screen.getByRole('listbox')).getByRole('option', { name: 'Canada' }));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByRole('combobox')).toHaveValue('us');
  });

  test.each(['outlined', 'filled', 'standard'] as const)('uses the shared %s floating-label placement', (variant) => {
    render(
      <Select defaultValue="" label="Country" variant={variant}>
        <option value="" />
        <option value="ca">Canada</option>
      </Select>,
    );
    const trigger = screen.getByRole('button', { name: 'Country' });
    expect(screen.getByText('Country')).toHaveClass('top-1/2');

    fireEvent.click(trigger);
    fireEvent.click(within(screen.getByRole('listbox')).getByRole('option', { name: 'Canada' }));

    const floatingLabel = screen.getByText('Country');
    if (variant === 'outlined') expect(floatingLabel).toHaveClass('-top-2');
    if (variant === 'filled') expect(floatingLabel).toHaveClass('top-1');
    if (variant === 'standard') expect(floatingLabel.parentElement).not.toBe(trigger);
  });

  test('sizes the left and dropdown icons to 30px and associates helper text', () => {
    render(
      <Select helperText="Choose your home country." iconLeft={<svg data-testid="left-icon" />} label="Country">
        <option value="">Choose a country</option>
        <option value="ca">Canada</option>
      </Select>,
    );

    expect(screen.getByTestId('left-icon').parentElement).toHaveClass('size-5');
    expect(screen.getByRole('button', { name: 'Country' }).querySelector('.size-4')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Country' })).toHaveAttribute('aria-describedby');
    expect(screen.getByText('Choose your home country.')).toHaveClass('text-text-secondary');
  });

  test('creates a three-part outlined notch for a selected value', async () => {
    const width = vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(48);
    try {
      render(
        <Select defaultValue="ca" label="Country">
          <option value="ca">Canada</option>
        </Select>,
      );
      const trigger = screen.getByRole('button', { name: 'Country' });
      await waitFor(() => expect(trigger).toHaveClass('border-0'));
      expect(trigger.querySelectorAll('[aria-hidden="true"]')).toHaveLength(5);
    } finally {
      width.mockRestore();
    }
  });
});
