import React from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { ArrowRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import { paletteTones } from '../../../themes/paletteTones';
import Button from '../Button';
import { themeModes } from '../../../themes/themeTokens';

const luminance = (color) => {
  const channels = color.match(/[\d.]+/g).slice(0, 3).map((channel) => {
    const value = Number(channel) / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

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
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A themed button with solid, tinted, outline, and text appearances, six tones, and three sizes. Original theme fills are preserved. Filled text keeps white where readable and uses tone-matched contrast text where needed, including interaction states. Outline and text-only buttons keep original main-color text, even where contrast is below 4.5:1.',
      },
    },
  },
  args: { children: 'Continue', variant: 'default', tone: undefined, size: 'md', disabled: false, onClick: fn() },
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

export const ColorTreatment = {
  render: () => (
    <div className="grid gap-4">
      {tones.map((tone) => (
        <div key={tone} className="flex gap-3">
          <Button tone={tone}>{tone} filled</Button>
          <Button tone={tone} variant="outline">{tone} outline</Button>
          <Button tone={tone} variant="text">{tone} text</Button>
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const themeRoot = canvasElement.querySelector('[class*="min-h-screen"]');
    const originalClass = themeRoot.className;
    const checkFilled = (button, theme, tone) => {
      const style = getComputedStyle(button);
      const foreground = luminance(style.color);
      const background = luminance(style.backgroundColor);
      expect(
        (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
        `${theme} ${tone} filled contrast`,
      ).toBeGreaterThanOrEqual(4.5);
    };
    try {
      for (const theme of themeModes) {
        themeRoot.className = `${theme} min-h-screen bg-background-canvas`;
        for (const tone of tones) {
          const filled = canvas.getByRole('button', { name: `${tone} filled` });
          filled.blur();
          await waitFor(() => checkFilled(filled, theme, tone));
          await userEvent.click(filled);
          await waitFor(() => checkFilled(filled, theme, tone));
          const outline = canvas.getByRole('button', { name: `${tone} outline` });
          await waitFor(() => expect(outline.getAnimations()).toHaveLength(0));
          const color = getComputedStyle(outline).color;
          const borderColor = getComputedStyle(outline).borderTopColor;
          expect(color).toBe(borderColor);
          await userEvent.click(outline);
          await waitFor(() => {
            expect(getComputedStyle(outline).color).toBe(color);
            expect(getComputedStyle(outline).borderTopColor).toBe(borderColor);
          });
          const text = canvas.getByRole('button', { name: `${tone} text` });
          await waitFor(() => {
            expect(text.getAnimations()).toHaveLength(0);
            expect(getComputedStyle(text).color).toBe(borderColor);
          });
          await userEvent.click(text);
          await waitFor(() => expect(getComputedStyle(text).color).toBe(borderColor));
        }
      }
    } finally {
      themeRoot.className = originalClass;
    }
  },
};
