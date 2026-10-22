import React from 'react';
import { fn } from 'storybook/test';
import Textarea from '../TextArea';

const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;

const meta = {
  title: 'Inputs/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed multiline field with floating labels and a shared 16px text inset. Floating labels do not add a separate layout row, and multiline text reserves space below the label.',
      },
    },
  },
  args: {
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
    label: 'Message',
    placeholder: '',
    helperText: '',
    rows: 5,
    required: false,
    variant: 'outlined',
    tone: 'primary',
    size: 'normal',
  },
  argTypes: {
    onFocus: { control: false, table: { category: 'Events' } },
    onBlur: { control: false, table: { category: 'Events' } },
    label: {
      control: 'text',
      description: 'Label aligned to the outlined text inset in every variant and size.',
      table: { category: 'Content' },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text.',
      table: { category: 'Content' },
    },
    value: {
      control: 'text',
      description: 'Controlled textarea value. Use with onChange.',
      table: { category: 'Content' },
    },
    onChange: {
      description: 'Called when the textarea value changes.',
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
      description: 'Disables the textarea field.',
      table: { category: 'State' },
    },
    tone: { control: 'select', options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'] },
    size: { control: 'select', options: ['small', 'normal'] },
    rows: {
      control: 'number',
      description: 'Number of visible text rows.',
      table: { category: 'Layout' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the textarea field.',
      table: { category: 'Layout' },
    },
    cols: {
      control: 'number',
      description: 'Suggested visible text columns.',
      table: { category: 'Layout' },
    },
    'aria-describedby': {
      control: 'text',
      description: 'IDs of elements that describe the textarea.',
      table: { category: 'Accessibility' },
    },
  },
};

export default meta;

export const Playground = {
  render: (args) => (
    <Frame>
      <Textarea {...args} />
    </Frame>
  ),
};
export const Variants = {
  render: (args) => (
    <Frame>
      <Textarea {...args} label="Outlined" variant="outlined" rows={3} helperText="Default variant" />
      <Textarea {...args} label="Filled" variant="filled" rows={3} helperText="Filled background" />
      <Textarea {...args} label="Standard" variant="standard" rows={3} helperText="Underline only" />
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Textarea key={tone} {...args} label={tone} tone={tone} rows={3} defaultValue="Example" />
      ))}
    </Frame>
  ),
};
export const States = {
  render: (args) => (
    <Frame>
      <Textarea {...args} label="Error" error="Please enter a message." defaultValue="Invalid" rows={3} />
      <Textarea {...args} label="Disabled" disabled placeholder="Cannot edit" rows={3} />
      <Textarea {...args} label="Required" required helperText="Marked with an asterisk" rows={3} />
    </Frame>
  ),
};
