import React from 'react';
import { expect, fn, within } from 'storybook/test';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import { paletteTones } from '../../../themes/paletteTones';
import Button from '../Button';

const variants = ['default', 'label', 'outline', 'text'];
const tones = paletteTones;
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
  includeStories: ['Playground', 'Variants', 'Tones', 'Sizes', 'WithIcons', 'FullWidth', 'States', 'ColorTreatment'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A themed button with solid, tinted, outline, and text appearances, six tones, and three sizes. Button colors follow the original theme palette tokens.',
      },
    },
  },
  args: { children: 'Continue', variant: 'default', tone: undefined, size: 'md', disabled: false, onClick: fn() },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    label: {
      control: 'text',
      description: 'Fallback content when children are omitted.',
      table: { category: 'Content' },
    },
    variant: {
      control: 'select',
      options: variants,
      description: 'Solid, tinted, outlined, or text-only treatment.',
      table: { category: 'Appearance' },
    },
    tone: {
      control: 'select',
      options: tones,
      description: 'Omitted tones use primary.',
      table: { category: 'Appearance' },
    },
    shape: { control: 'select', options: ['rectangle', 'pill'], table: { category: 'Appearance' } },
    size: { control: 'select', options: ['sm', 'md', 'lg'], table: { category: 'Layout' } },
    width: { control: 'select', options: ['auto', 'sm', 'md', 'lg', 'full'], table: { category: 'Layout' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    className: { control: 'text', table: { category: 'Layout' } },
    onClick: { control: false, description: 'Called when the button is activated.', table: { category: 'Events' } },
    outline: {
      control: false,
      description: 'Legacy override; prefer variant="outline".',
      table: { category: 'Compatibility' },
    },
    iconLeft: { table: { disable: true } },
    iconRight: { table: { disable: true } },
  },
};
export const Playground = {
  render: renderButton,
  parameters: { docs: { description: { story: 'Adjust appearance, tone, size, and state using the controls.' } } },
};
export const Variants = {
  name: 'Appearances',
  parameters: { controls: { exclude: ['variant'] } },
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
  parameters: { controls: { exclude: ['tone'] } },
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
export const Sizes = {
  parameters: { controls: { exclude: ['size'] } },
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
export const WithIcons = {
  render: renderButton,
  args: {
    iconLeft: <PlusIcon className="size-5" aria-hidden="true" />,
    iconRight: <ArrowRightIcon className="size-5" aria-hidden="true" />,
  },
};
export const FullWidth = {
  render: renderButton,
  args: { width: 'full' },
  parameters: { controls: { exclude: ['width'] } },
};
export const States = {
  parameters: { controls: { exclude: ['disabled'] } },
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
export const ColorTreatment = {
  name: 'Tone Comparison',
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Compare filled, outline, text-only, and tinted buttons using the original theme colors.',
      },
    },
  },
  render: () => (
    <div className="grid gap-4 [&_button]:transition-none">
      {tones.map((tone) => (
        <div key={tone} className="flex gap-3">
          <Button tone={tone}>{tone} filled</Button>
          <Button tone={tone} variant="outline">
            {tone} outline
          </Button>
          <Button tone={tone} variant="text">
            {tone} text
          </Button>
          {['error', 'warning', 'info', 'success'].includes(tone) && (
            <Button tone={tone} variant="label">
              {tone} tinted
            </Button>
          )}
        </div>
      ))}
    </div>
  ),
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const tone of tones) {
      expect(canvas.getByRole('button', { name: `${tone} filled` })).toHaveClass(
        `bg-palette-${tone}-main`,
        `text-palette-${tone}-contrast`,
      );
    }
  },
};
