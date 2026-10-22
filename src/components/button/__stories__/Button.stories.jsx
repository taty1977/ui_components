import React from 'react';
import { fn } from 'storybook/test';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import Button from '../Button';

const variants = ['default', 'label', 'outline', 'text'];
const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const Frame = ({ children }) => <div className="grid max-w-80 justify-items-start gap-6">{children}</div>;
const renderButton = (args) => (
  <Frame>
    <Button {...args} />
  </Frame>
);

export default {
  title: 'Inputs/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A themed button with solid, tinted, outline, and text appearances, six tones, and three sizes.',
      },
    },
  },
  args: { children: 'Continue', variant: 'default', tone: 'primary', size: 'md', disabled: false, onClick: fn() },
  argTypes: {
    onClick: { control: false, description: 'Called when the button is activated.', table: { category: 'Events' } },
    children: { control: 'text', table: { category: 'Content' } },
    variant: { control: 'select', options: variants, table: { category: 'Appearance' } },
    tone: { control: 'select', options: tones, table: { category: 'Appearance' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Layout' } },
    width: { control: 'select', options: ['auto', 'sm', 'md', 'lg', 'full'], table: { category: 'Layout' } },
    shape: { control: 'select', options: ['rectangle', 'pill'], table: { category: 'Appearance' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    className: { control: 'text', table: { category: 'Layout' } },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
};
export const Playground = { render: renderButton };
export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <Button {...args} key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Button {...args} key={tone} tone={tone}>
          {tone}
        </Button>
      ))}
    </Frame>
  ),
};
export const WithIcons = {
  render: renderButton,
  args: {
    iconLeft: <PlusIcon className="size-5" aria-hidden="true" />,
    iconRight: <ArrowRightIcon className="size-5" aria-hidden="true" />,
  },
};
export const States = {
  render: (args) => (
    <Frame>
      <Button {...args} disabled={false}>
        Enabled
      </Button>
      <Button {...args} disabled>
        Disabled
      </Button>
    </Frame>
  ),
};
export const Sizes = {
  render: (args) => (
    <Frame>
      {['sm', 'md', 'lg'].map((size) => (
        <Button {...args} key={size} size={size}>
          {size}
        </Button>
      ))}
    </Frame>
  ),
};
export const FullWidth = { render: renderButton, args: { width: 'full' } };
