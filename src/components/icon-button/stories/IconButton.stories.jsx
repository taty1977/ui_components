import React from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { EllipsisHorizontalIcon, PencilIcon } from '@heroicons/react/24/outline';
import { paletteTones } from '../../../themes/paletteTones';
import IconButton from '../IconButton';

const variants = ['default', 'label', 'outline', 'text'];
const Frame = ({ children }) => <div className="flex flex-wrap items-center gap-6">{children}</div>;
const renderIconButton = (args) => (
  <Frame>
    <IconButton {...args} />
  </Frame>
);

export default {
  title: 'Inputs/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compact icon-only action with circular or square frames, three sizes, and Button-style variants. Omit tone for neutral styling. Always provide aria-label or aria-labelledby: the decorative icon is hidden from assistive technology.',
      },
    },
  },
  args: {
    size: 'medium',
    shape: 'circular',
    variant: 'text',
    tone: undefined,
    disabled: false,
    'aria-label': 'More actions',
    children: <EllipsisHorizontalIcon className="size-5" />,
    onClick: fn(),
  },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'], table: { category: 'Layout' } },
    shape: { control: 'select', options: ['circular', 'square'], table: { category: 'Appearance' } },
    variant: { control: 'select', options: variants, table: { category: 'Appearance' } },
    tone: {
      control: 'select',
      options: ['neutral', ...paletteTones],
      mapping: { neutral: undefined },
      table: { category: 'Appearance' },
    },
    disabled: { control: 'boolean', table: { category: 'State' } },
    'aria-label': { control: 'text', table: { category: 'Accessibility' } },
    children: { control: false, table: { category: 'Content' } },
    className: { control: 'text', table: { category: 'Layout' } },
    onClick: { control: false, table: { category: 'Events' } },
  },
};

export const Playground = { render: renderIconButton };

export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <IconButton {...args} key={variant} aria-label={`${variant} edit`} variant={variant}>
          <PencilIcon className="size-5" />
        </IconButton>
      ))}
    </Frame>
  ),
};

export const Tones = {
  args: { variant: 'label' },
  render: (args) => (
    <Frame>
      {paletteTones.map((tone) => (
        <IconButton {...args} key={tone} aria-label={`${tone} actions`} tone={tone} />
      ))}
    </Frame>
  ),
};

export const Sizes = {
  render: (args) => (
    <Frame>
      {['small', 'medium', 'large'].map((size) => (
        <IconButton {...args} key={size} aria-label={`${size} more actions`} size={size} />
      ))}
    </Frame>
  ),
};

export const Shapes = {
  render: (args) => (
    <Frame>
      {['circular', 'square'].map((shape) => (
        <IconButton {...args} key={shape} aria-label={`${shape} actions`} shape={shape} />
      ))}
    </Frame>
  ),
};

export const States = {
  render: (args) => (
    <Frame>
      <IconButton {...args} aria-label="Enabled actions" disabled={false} />
      <IconButton {...args} aria-label="Disabled actions" disabled />
    </Frame>
  ),
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Enabled actions' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
    const disabled = canvas.getByRole('button', { name: 'Disabled actions' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const KeyboardFocus = {
  render: renderIconButton,
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: args['aria-label'] });
    button.focus();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
