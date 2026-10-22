import React from 'react';
import { fn } from 'storybook/test';
import { ArrowRightIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Autocomplete from '../Autocomplete';

const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;

const meta = {
  title: 'Inputs/Autocomplete',
  component: Autocomplete,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed autocomplete with floating labels, filterable options, and a shared 16px text inset. Empty placeholders, inside icons, and the clear button align to the full field midpoint, including border thickness. Filled values reserve space below the inside label.',
      },
    },
  },
  args: {
    onChange: fn(),
    onSelect: fn(),
    onFocus: fn(),
    onBlur: fn(),
    label: 'Fruit',
    options: ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Orange'],
    placeholder: '',
    helperText: '',
    required: false,
    variant: 'outlined',
    tone: 'primary',
    size: 'normal',
    showLeftIcon: false,
    showRightIcon: false,
  },
  argTypes: {
    onFocus: { control: false, table: { category: 'Events' } },
    onBlur: { control: false, table: { category: 'Events' } },
    label: {
      control: 'text',
      description: 'Label aligned to the outlined text inset; empty labels clear any left icon.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty.',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'Controlled input value. Use with onChange.',
      table: { category: 'Content' },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the input.',
      table: { category: 'Validation' },
    },
    helperText: {
      control: 'text',
      description: 'Hint below the field; turns error-toned when error is set.',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'Selects the field frame treatment.',
      table: { category: 'Appearance' },
    },
    onChange: {
      description: 'Called when the input value changes.',
      table: { category: 'Events' },
    },
    tone: { control: 'select', options: tones },
    size: { control: 'select', options: ['small', 'normal'] },
    onSelect: {
      control: false,
      description: 'Called when an option is selected from the list.',
      table: { category: 'Events' },
    },
    options: {
      control: 'object',
      description: 'List of options used for client-side filtering.',
      table: { category: 'Data' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show a left icon in the input.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Show a right icon in the input.',
      table: { category: 'Icons' },
    },
    iconLeft: {
      table: { disable: true },
    },
    iconRight: {
      table: { disable: true },
    },
  },
};

export default meta;

const renderAutocomplete = ({ showLeftIcon, showRightIcon, ...args }) => (
  <Frame>
    <Autocomplete
      {...args}
      iconLeft={showLeftIcon ? <MagnifyingGlassIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
      iconRight={showRightIcon ? <ArrowRightIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    />
  </Frame>
);

export const Playground = { render: renderAutocomplete };
export const Variants = {
  render: (args) => (
    <Frame>
      <Autocomplete {...args} label="Outlined" variant="outlined" helperText="Default variant" />
      <Autocomplete {...args} label="Filled" variant="filled" helperText="Filled background" />
      <Autocomplete {...args} label="Standard" variant="standard" helperText="Underline only" />
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Autocomplete key={tone} {...args} label={tone} tone={tone} defaultValue="Apple" />
      ))}
    </Frame>
  ),
};
export const WithIcons = {
  render: renderAutocomplete,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
};
export const States = {
  render: (args) => (
    <Frame>
      <Autocomplete {...args} label="Error" error="Please choose a fruit." defaultValue="Invalid" />
      <Autocomplete {...args} label="Disabled" disabled placeholder="Cannot edit" />
      <Autocomplete {...args} label="Required" required helperText="Marked with an asterisk" />
    </Frame>
  ),
};
