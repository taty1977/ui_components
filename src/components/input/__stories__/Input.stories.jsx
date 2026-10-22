import React from 'react';
import { fn } from 'storybook/test';
import { ArrowRightIcon, CheckIcon, ClockIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Input from '../Input';

const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;

const meta = {
  title: 'Inputs/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed single-line input with floating labels and a shared 16px text inset. Empty placeholders and inside icons align to the full field midpoint, including border thickness. Filled values reserve space below the inside label.',
      },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    handleActions: fn(),
    label: 'Input label',
    placeholder: '',
    helperText: '',
    required: false,
    variant: 'outlined',
    tone: 'primary',
    showLeftIcon: false,
    showRightIcon: false,
    showOutsideLeftIcon: false,
    showOutsideRightIcon: false,
  },
  argTypes: {
    onFocus: { control: false, table: { category: 'Events' } },
    onBlur: { control: false, table: { category: 'Events' } },
    label: {
      control: 'text',
      description: 'Label aligned to the outlined text inset; empty labels clear any left icon.',
      table: { category: 'Content' },
    },
    placeholder: { control: 'text', description: 'Placeholder text.', table: { category: 'Content' } },
    value: {
      control: 'text',
      description: 'Controlled input value. Use with onChange.',
      table: { category: 'Content' },
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'date', 'tel', 'url'],
      description: 'HTML input type.',
      table: { category: 'Content' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the input field.',
      table: { category: 'Layout' },
    },
    onChange: {
      description: 'Called when the input value changes.',
      table: { category: 'Events' },
    },
    required: {
      control: 'boolean',
      description: 'Marks the field as required and shows an asterisk.',
      table: { category: 'Validation' },
    },
    error: {
      control: 'text',
      description: 'Validation message shown below the field.',
      table: { category: 'Validation' },
    },
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'Selects the field frame treatment.',
      table: { category: 'Appearance' },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input field.',
      table: { category: 'State' },
    },
    tone: { control: 'select', options: tones },
    size: { control: 'select', options: ['small', 'normal'] },
    showLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon inside the input.',
      table: { category: 'Icons' },
    },
    showRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon inside the input.',
      table: { category: 'Icons' },
    },
    showOutsideLeftIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input on the left.',
      table: { category: 'Outside Icons' },
    },
    showOutsideRightIcon: {
      control: 'boolean',
      description: 'Shows the configured icon beside the input on the right.',
      table: { category: 'Outside Icons' },
    },
    handleActions: {
      description: 'Callback function triggered by interactive outside icons.',
      table: { category: 'Outside Icons' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the input.',
      table: { category: 'Accessibility' },
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
    outsideIconLeft: { table: { disable: true } },
    outsideIconRight: { table: { disable: true } },
  },
};

export default meta;

const renderInput = ({ showLeftIcon, showOutsideLeftIcon, showOutsideRightIcon, showRightIcon, ...args }) => (
  <Frame>
    <Input
      {...args}
      iconLeft={showLeftIcon ? <MagnifyingGlassIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
      iconRight={showRightIcon ? <ArrowRightIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
      outsideIconLeft={showOutsideLeftIcon ? <ClockIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
      outsideIconRight={showOutsideRightIcon ? <CheckIcon width="1em" height="1em" aria-hidden="true" /> : undefined}
    />
  </Frame>
);

export const Playground = { render: renderInput };
export const Variants = {
  render: (args) => (
    <Frame>
      <Input {...args} label="Outlined" variant="outlined" helperText="Default variant" />
      <Input {...args} label="Filled" variant="filled" helperText="Filled background" />
      <Input {...args} label="Standard" variant="standard" helperText="Underline only" />
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Input key={tone} {...args} label={tone} tone={tone} defaultValue="Example" />
      ))}
    </Frame>
  ),
};
export const WithIcons = {
  render: renderInput,
  args: {
    showLeftIcon: true,
    showRightIcon: true,
  },
};
export const States = {
  render: (args) => (
    <Frame>
      <Input {...args} label="Error" error="Please enter a valid value." defaultValue="Invalid" />
      <Input {...args} label="Disabled" disabled placeholder="Cannot edit" />
      <Input {...args} label="Required" required helperText="Marked with an asterisk" />
    </Frame>
  ),
};
