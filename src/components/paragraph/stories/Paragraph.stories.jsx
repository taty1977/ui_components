import React from 'react';
import Paragraph from '../Paragraph';
import Button from '../../button/Button';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { themeModes } from '../../../themes/themeTokens';
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
  includeStories: ['Playground', 'Variants', 'Tones', 'Weights', 'ButtonToneAlignment'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Themed paragraph text with six typography variants, theme tones, and configurable weights. Passing tone colors stay unchanged; failing text colors use nearby readable same-tone shades. Button fills and outline borders remain unchanged.',
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
      description: 'Omitted tones use the default text color; only failing contrast combinations are corrected.',
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
      table: { category: 'Compatibility' },
    },
    color: {
      control: 'select',
      options: [...tones, 'title', 'Primary', 'Secondary', 'danger', 'text'],
      description: 'Legacy color override. Prefer tone; color takes precedence when set.',
      table: { category: 'Compatibility' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
  },
};
export const Playground = {
  parameters: { docs: { description: { story: 'Adjust typography and tone using the controls.' } } },
  render: (args) => (
    <Frame>
      <Paragraph {...args} />
    </Frame>
  ),
};
export const Variants = {
  name: 'Typography Variants',
  parameters: { controls: { exclude: ['variant'] } },
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
  parameters: { controls: { exclude: ['tone', 'color'] } },
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
  parameters: { controls: { exclude: ['weight'] } },
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
  name: 'Button Tone Comparison',
  parameters: {
    controls: { exclude: ['children', 'tone', 'color'] },
    docs: {
      description: {
        story:
          'Compare Paragraph with Button appearances. Contrast checks cover Paragraph and text-only buttons in all themes.',
      },
    },
  },
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
    const root = canvasElement.querySelector('[class*="min-h-screen"]');
    const originalClass = root.className;
    const luminance = (color) => {
      const channels = color
        .match(/[\d.]+/g)
        .slice(0, 3)
        .map((channel) => {
          const value = Number(channel) / 255;
          return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
        });
      return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    };
    const checkContrast = (element) => {
      const style = getComputedStyle(element);
      const surface = getComputedStyle(root)
        .backgroundColor.match(/[\d.]+/g)
        .slice(0, 3)
        .map(Number);
      const fill = style.backgroundColor.match(/[\d.]+/g).map(Number);
      const alpha = fill[3] ?? 1;
      const background = luminance(
        `rgb(${surface.map((channel, index) => fill[index] * alpha + channel * (1 - alpha)).join(',')})`,
      );
      const foreground = luminance(style.color);
      expect(
        (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
      ).toBeGreaterThanOrEqual(4.5);
    };
    try {
      for (const theme of themeModes) {
        root.className = `${theme} min-h-screen bg-background-canvas`;
        for (const tone of paletteTones) {
          const row = canvasElement.querySelector(`[data-tone-comparison="${tone}"]`);
          const canvas = within(row);
          await waitFor(() => checkContrast(row.querySelector('p')));
          const button = canvas.getByRole('button', { name: 'text' });
          await waitFor(() => checkContrast(button));
          await userEvent.click(button);
          await waitFor(() => checkContrast(button));
          button.blur();
        }
      }
    } finally {
      root.className = originalClass;
    }
  },
};
