import { fireEvent, render, screen } from '@testing-library/react';
import Input from '../Input';
import Select from '../../select/Select';
import Autocomplete from '../../autocomplete/Autocomplete';
import Textarea from '../../textarea/TextArea';
import type { InputSize, InputTone, InputVariant } from '../input.styles';

interface FieldProps {
  variant: InputVariant;
  tone: InputTone;
  size: InputSize;
  error?: string;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
}
const fields = [
  {
    name: 'Input',
    render: (props: FieldProps) => <Input label="Field" {...props} />,
    frame: () => screen.getByRole('textbox').parentElement!,
  },
  {
    name: 'Select',
    render: (props: FieldProps) => (
      <Select label="Field" {...props}>
        <option value="" />
        <option value="one">One</option>
      </Select>
    ),
    frame: () => screen.getByRole('button'),
  },
  {
    name: 'Autocomplete',
    render: (props: FieldProps) => <Autocomplete label="Field" options={['One']} onSelect={() => {}} {...props} />,
    frame: () => screen.getByRole('combobox').parentElement!,
  },
  {
    name: 'Textarea',
    render: (props: FieldProps) => <Textarea label="Field" {...props} />,
    frame: () => screen.getByRole('textbox').parentElement!,
  },
];
const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const;
const appearances = ['outlined', 'filled', 'standard'] as const;
const sizes = ['small', 'normal'] as const;
const combinations = appearances.flatMap((variant) =>
  tones.flatMap((tone) => sizes.map((size) => ({ variant, tone, size }))),
);
const chrome = {
  outlined: ['rounded-md', 'border', 'bg-background-surface', 'focus-within:border-2'],
  filled: ['rounded-t-md', 'border-b', 'bg-action-hover', 'focus-within:border-b-2'],
  standard: ['border-b', 'bg-transparent', 'focus-within:border-b-2'],
};

describe.each(fields)('$name shared field variants', (field) => {
  if (field.name !== 'Textarea') {
    test.each(appearances.flatMap((variant) => sizes.map((size) => ({ variant, size }))))(
      'centers the empty $variant / $size placeholder without moving populated text',
      ({ variant, size }) => {
        const props = { variant, size, tone: 'primary' as const };
        const { rerender } = render(field.render(props));
        const label = screen.getByText('Field');
        expect(label).toHaveClass('top-1/2', '-translate-y-1/2');
        if (variant !== 'outlined') expect(label).toHaveClass('mt-[0.5px]', 'group-focus-within:mt-px');

        rerender(field.render({ ...props, placeholder: 'Choose a value' }));
        const valueElement =
          field.name === 'Select' ? field.frame().querySelector('span.flex-1') : field.frame().querySelector('input');
        if (variant !== 'outlined') expect(valueElement).toHaveClass('top-[0.5px]', 'group-focus-within:top-px');
        else expect(valueElement).not.toHaveClass('top-[0.5px]');

        rerender(<div />);
        rerender(field.render({ ...props, defaultValue: 'one' }));
        const populated =
          field.name === 'Select' ? field.frame().querySelector('span.flex-1') : field.frame().querySelector('input');
        expect(populated).not.toHaveClass('top-[0.5px]', 'group-focus-within:top-px');
        expect(screen.getByText('Field')).not.toHaveClass('mt-[0.5px]');
      },
    );
  }

  test.each(appearances.flatMap((variant) => sizes.map((size) => ({ variant, size }))))(
    'aligns empty and populated $variant / $size labels with the outlined text inset',
    ({ variant, size }) => {
      const props = { variant, size, tone: 'primary' as const };
      const { rerender } = render(field.render(props));
      expect(screen.getByText('Field')).toHaveClass('left-4');

      rerender(<div />);
      rerender(field.render({ ...props, defaultValue: 'one' }));
      const label = screen.getByText('Field');
      if (variant === 'outlined') expect(label).toHaveClass('left-3', 'px-1');
      if (variant === 'filled') expect(label).toHaveClass('left-4');
      if (variant === 'standard') expect(label).toHaveClass('pl-4');
      if (variant === 'standard') {
        expect(label).toHaveClass('absolute', 'mb-0');
        expect(field.frame()).toHaveClass('mt-2');
      }
      const valueElement =
        field.name === 'Select'
          ? field.frame().querySelector('span.flex-1')
          : field.frame().querySelector('input, textarea');
      if (field.name === 'Textarea') {
        expect(valueElement).toHaveClass(variant === 'filled' ? 'pt-5' : 'pt-4');
        if (variant === 'standard') expect(valueElement).toHaveClass('pb-[7px]', 'focus:pb-[6px]');
        if (variant === 'filled') expect(valueElement).toHaveClass('pb-[3px]', 'focus:pb-[2px]');
      } else if (variant === 'filled') {
        expect(valueElement).toHaveClass('self-stretch', 'py-0', 'pt-[18px]', 'leading-5');
      } else {
        expect(valueElement).toHaveClass('py-2', 'leading-5');
        expect(valueElement).not.toHaveClass('pt-3', 'pt-[18px]', 'self-stretch');
      }
    },
  );

  test.each(combinations)('$variant / $tone / $size', (props) => {
    render(field.render(props));
    expect(field.frame()).toHaveClass(...chrome[props.variant], `border-palette-${props.tone}-main`);
    expect(field.frame()).toHaveClass(
      props.size === 'small' ? 'min-h-11' : 'min-h-12',
      props.size === 'small' ? 'text-15' : 'text-18',
      'px-4',
    );
    expect(field.frame()).not.toHaveClass('pl-0', 'pr-0', 'px-6');
  });

  test.each(appearances)('errors override the %s tone', (variant) => {
    render(field.render({ variant, tone: 'success', size: 'normal', error: 'Required' }));
    expect(field.frame()).toHaveClass('border-palette-error-main');
    expect(field.frame()).not.toHaveClass('border-palette-success-main');
    expect(screen.getByRole('alert')).toHaveTextContent('Required');
  });

  test.each(appearances)('disabled %s fields use disabled colors even with an error', (variant) => {
    render(field.render({ variant, tone: 'success', size: 'normal', error: 'Required', disabled: true }));
    expect(field.frame()).toHaveClass('border-text-disabled', 'text-text-disabled');
    expect(field.frame()).not.toHaveClass('border-palette-error-main', 'border-palette-success-main');
  });

  test.each(['primary', 'secondary'] as const)('retains the legacy %s alias', (variant) => {
    render(field.render({ variant, tone: 'success', size: 'normal' }));
    expect(field.frame()).toHaveClass('rounded-md', 'border', `border-palette-${variant}-main`);
  });
});

test.each(sizes)('reduces %s input padding beside adornments', (size) => {
  render(<Input label="Field" size={size} iconLeft={<span>Left</span>} iconRight={<span>Right</span>} />);
  expect(screen.getByRole('textbox').parentElement).toHaveClass(
    size === 'small' ? 'pl-2' : 'pl-3',
    size === 'small' ? 'pr-2' : 'pr-3',
  );
});

describe.each(['Input', 'Autocomplete'] as const)('%s icon alignment', (name) => {
  test.each(appearances.flatMap((variant) => sizes.map((size) => ({ variant, size }))))(
    'centers inside icons within the full $variant / $size frame',
    ({ variant, size }) => {
      const props = {
        label: 'Field',
        variant,
        size,
        defaultValue: 'One',
        iconLeft: <svg data-testid="left-icon" />,
        iconRight: <svg data-testid="right-icon" />,
      };
      render(
        name === 'Input' ? <Input {...props} /> : <Autocomplete {...props} options={['One']} onSelect={() => {}} />,
      );
      const input = screen.getByRole(name === 'Input' ? 'textbox' : 'combobox');
      expect(input.parentElement).toHaveClass('group');
      const checkAlignment = (element: HTMLElement | null) => {
        expect(element).toHaveClass('size-5', 'items-center', 'justify-center');
        if (variant === 'outlined') expect(element).not.toHaveClass('top-[0.5px]');
        else expect(element).toHaveClass('top-[0.5px]', 'group-focus-within:top-px');
      };
      checkAlignment(screen.getByTestId('left-icon').parentElement);
      checkAlignment(screen.getByTestId('right-icon').parentElement);
      fireEvent.focus(input);
      if (name === 'Autocomplete') checkAlignment(screen.getByRole('button', { name: 'Clear input' }));
    },
  );
});

test('preserves native numeric sizes on select and autocomplete', () => {
  render(
    <>
      <Select label="Country" size={4}>
        <option value="ca">Canada</option>
      </Select>
      <Autocomplete label="Fruit" size={30} options={['Apple']} onSelect={() => {}} />
    </>,
  );
  expect(screen.getByRole('listbox', { name: 'Country' })).toHaveAttribute('size', '4');
  expect(screen.getByRole('combobox', { name: 'Fruit' })).toHaveAttribute('size', '30');
});
