import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { textTones, textWeights } from '../../../utils/text.styles';
import Link from '../Link';

const variants = ['subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'];

export default {
  title: 'Navigation/Link',
  component: Link,
  tags: ['autodocs'],
  args: { href: '#work', children: 'Explore our work', variant: 'body1', underline: 'always', tone: undefined },
  parameters: {
    docs: {
      description: {
        component:
          'A native anchor sharing Paragraph typography, tones, and text transforms. Underlines can be always visible, hover/focus only, or disabled. New-tab links include noopener and noreferrer.',
      },
    },
  },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    href: { control: 'text', table: { category: 'Content' } },
    variant: { control: 'select', options: variants, table: { category: 'Typography' } },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'], table: { category: 'Typography' } },
    weight: { control: 'select', options: textWeights, table: { category: 'Typography' } },
    tone: { control: 'select', options: textTones, table: { category: 'Appearance' } },
    textTransform: {
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase'],
      table: { category: 'Typography' },
    },
    family: { control: false, table: { category: 'Typography' } },
    underline: { control: 'select', options: ['always', 'hover', 'none'], table: { category: 'Appearance' } },
    target: { control: 'select', options: ['_self', '_blank'], table: { category: 'Behavior' } },
  },
};

export const Playground = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole('link')).toHaveFocus();
  },
};
export const Variants = {
  render: (args) => (
    <div className="grid gap-4">
      {variants.map((variant) => (
        <Link {...args} key={variant} variant={variant}>
          {variant} link
        </Link>
      ))}
    </div>
  ),
};
export const Tones = {
  render: (args) => (
    <div className="grid gap-4">
      {textTones.map((tone) => (
        <div key={tone} className={tone === 'inverse' ? 'bg-misc-bg-black p-3' : 'p-3'}>
          <Link {...args} tone={tone}>
            {tone} link
          </Link>
        </div>
      ))}
    </div>
  ),
};
export const Weights = {
  render: (args) => (
    <div className="grid gap-4">
      {textWeights.map((weight) => (
        <Link {...args} key={weight} weight={weight}>
          {weight} link
        </Link>
      ))}
    </div>
  ),
};
export const Underlines = {
  render: (args) => (
    <div className="grid gap-4">
      {['always', 'hover', 'none'].map((underline) => (
        <Link {...args} key={underline} underline={underline}>
          {underline} underline
        </Link>
      ))}
    </div>
  ),
};
