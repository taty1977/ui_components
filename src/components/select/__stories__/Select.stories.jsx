import React from 'react';
import { fn } from 'storybook/test';
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import Select from '../Select';

const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;

const options = [
  { value: '', label: 'Choose a country' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'gb', label: 'United Kingdom' },
];

const renderOptions = () =>
  options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

const meta = {
  title: 'Inputs/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed select with floating labels and a shared 16px text inset. Empty placeholders and icons align to the full field midpoint, including border thickness. Filled values reserve space below the inside label.',
      },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    label: 'Country',
    defaultValue: 'ca',
    placeholder: 'Choose a country',
    helperText: '',
    variant: 'outlined',
    tone: 'primary',
    size: 'normal',
    showLeftIcon: false,
    showSelectionCheck: false,
    required: false,
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
      description: 'Text shown when no option is selected.',
      table: { category: 'Content' },
    },
    defaultValue: {
      control: 'select',
      options: options.map((option) => option.value),
      description: 'Initially selected option value.',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the select field.',
      table: { category: 'Layout' },
    },
    onChange: {
      control: false,
      description: 'Called when the selected value changes.',
      table: { category: 'Events' },
    },
    required: {
      control: 'boolean',
      description: 'Marks the select as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the select.',
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
    disabled: {
      control: 'boolean',
      description: 'Disables the select field.',
      table: { category: 'State' },
    },
    tone: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: {
      control: 'select',
      options: ['small', 'normal'],
      description: 'Shared field size. Numeric values still forward to the underlying native select.',
      table: { category: 'Layout' },
    },
    showLeftIcon: {
      control: 'boolean',
      description: 'Show a custom React icon inside the left side of the select.',
      table: { category: 'Icons' },
    },
    showSelectionCheck: {
      control: 'boolean',
      description: 'Show a check icon beside the selected non-default option.',
      table: { category: 'Appearance' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the select.',
      table: { category: 'Accessibility' },
    },
    iconLeft: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export default meta;

const renderSelect = ({ showLeftIcon, ...args }) => (
  <Frame>
    <Select {...args} iconLeft={showLeftIcon ? <GlobeAltIcon aria-hidden="true" /> : undefined}>
      {renderOptions()}
    </Select>
  </Frame>
);

export const Playground = { render: renderSelect };
export const Variants = {
  render: (args) => (
    <Frame>
      <Select {...args} label="Outlined" variant="outlined" defaultValue="ca" helperText="Default variant">
        {renderOptions()}
      </Select>
      <Select {...args} label="Filled" variant="filled" defaultValue="ca" helperText="Filled background">
        {renderOptions()}
      </Select>
      <Select {...args} label="Standard" variant="standard" defaultValue="ca" helperText="Underline only">
        {renderOptions()}
      </Select>
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Select key={tone} {...args} label={tone} tone={tone} defaultValue="ca">
          {renderOptions()}
        </Select>
      ))}
    </Frame>
  ),
};
export const WithIcons = {
  render: renderSelect,
  args: {
    showLeftIcon: true,
  },
};
export const States = {
  render: (args) => (
    <Frame>
      <Select {...args} label="Error" error="Please select a country." required>
        {renderOptions()}
      </Select>
      <Select {...args} label="Disabled" disabled defaultValue="us">
        {renderOptions()}
      </Select>
      <Select {...args} label="Required" required helperText="Marked with an asterisk">
        {renderOptions()}
      </Select>
    </Frame>
  ),
};
