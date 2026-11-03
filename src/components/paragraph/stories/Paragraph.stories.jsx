import React from 'react';
import Paragraph from '../Paragraph';
import Button from '../../button/Button';
import { expect, within } from 'storybook/test';
import { paletteTones } from '../../../themes/paletteTones';
import { textTones, textWeights } from '../../../utils/text.styles';
const variants = ['subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'];
const tones = textTones;
const weights = textWeights;
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;
export default {
  title: 'Data Display/Paragraph',
  component: Paragraph,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Themed paragraph text with six typography variants, theme tones, and configurable weights. Palette tones match label Button foregrounds. Text and outline buttons receive selective foreground contrast correction; solid buttons keep white where readable and otherwise use darker tone-matched text.',
      },
    },
  },
  args: { children: 'Shared tokens keep the web experience consistent.', variant: 'body1', tone: undefined },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: variants,
      description: 'Sets the default text size and weight.',
      table: { category: 'Typography' },
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Overrides the size provided by the variant.',
      table: { category: 'Typography' },
    },
    tone: {
      control: 'select',
      options: tones,
      table: { category: 'Appearance' },
    },
    weight: {
      control: 'select',
      options: weights,
      description: 'Overrides the weight provided by the variant.',
      table: { category: 'Typography' },
    },
    textTransform: {
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase'],
      description: 'Sets text casing. The overline variant always uses uppercase.',
      table: { category: 'Typography' },
    },
    family: {
      control: false,
      description: 'Compatibility prop; paragraphs always use the theme sans font.',
      table: { category: 'Typography' },
    },
    color: {
      control: 'select',
      options: [...tones, 'title', 'Primary', 'Secondary', 'danger', 'text'],
      description: 'Legacy color override. Prefer tone; color takes precedence when set.',
      table: { category: 'Appearance' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
  },
};
export const Playground = {
  render: (args) => (
    <Frame>
      <Paragraph {...args} />
    </Frame>
  ),
};
export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <Paragraph {...args} key={variant} variant={variant}>
          {variant} - {args.children}
        </Paragraph>
      ))}
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <div key={tone} className={tone === 'inverse' ? 'rounded-md bg-misc-bg-black p-3' : 'p-3'}>
          <Paragraph {...args} tone={tone}>
            {tone} body text
          </Paragraph>
        </div>
      ))}
    </Frame>
  ),
};
export const Weights = {
  render: (args) => (
    <Frame>
      {weights.map((weight) => (
        <Paragraph {...args} key={weight} weight={weight}>
          {weight} body text
        </Paragraph>
      ))}
    </Frame>
  ),
};

export const ButtonToneAlignment = {
  render: (args) => (
    <div className="grid gap-6">
      {paletteTones.map((tone) => (
        <div key={tone} data-tone-comparison={tone} className="grid gap-3">
          <Paragraph {...args} tone={tone}>
            {tone === 'error' ? 'Error: Please check your information.' : `${tone} message`}
          </Paragraph>
          <div className="flex flex-wrap gap-2">
            {['label', 'outline', 'text', 'default'].map((variant) => (
              <Button key={variant} tone={tone} variant={variant}>
                {variant}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const tone of paletteTones) {
      const row = canvasElement.querySelector(`[data-tone-comparison="${tone}"]`);
      const canvas = within(row);
      const paragraphColor = getComputedStyle(row.querySelector('p')).color;
      for (const variant of ['label']) {
        await expect(getComputedStyle(canvas.getByRole('button', { name: variant })).color).toBe(paragraphColor);
      }
      if (['error', 'warning', 'info', 'success'].includes(tone)) {
        await expect(paragraphColor).toBe(getComputedStyle(canvas.getByRole('button', { name: 'default' })).backgroundColor);
      }
    }
  },
};
