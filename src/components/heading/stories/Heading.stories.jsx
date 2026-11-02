import React from 'react';
import Heading from '../Heading';
import { textTones, textWeights } from '../../../utils/text.styles';
const levels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const variants = ['default', ...levels];
const tones = textTones;
const weights = textWeights;
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;
export default {
  title: 'Data Display/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Semantic headings with six typography variants, theme tones, and configurable weights.',
      },
    },
  },
  args: { children: 'Book an appointment', variant: 'default', tone: undefined, weight: 'bold' },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    variant: {
      control: 'select',
      options: variants,
      description: 'Sets the semantic heading level and text size. Default uses h4.',
      table: { category: 'Typography' },
    },
    level: {
      control: false,
      table: { disable: true },
    },
    tone: {
      control: 'select',
      options: tones,
      table: { category: 'Appearance' },
    },
    weight: { control: 'select', options: weights, table: { category: 'Typography' } },
    textTransform: {
      control: 'select',
      options: ['none', 'capitalize', 'uppercase', 'lowercase'],
      table: { category: 'Typography' },
    },
    family: {
      control: false,
      description: 'Compatibility prop; headings always use the theme sans font.',
      table: { category: 'Typography' },
    },
    color: {
      control: 'select',
      options: [...tones, 'title', 'Primary', 'Secondary', 'danger'],
      description: 'Legacy color override. Prefer tone; color takes precedence when set.',
      table: { category: 'Appearance' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
  },
};
export const Playground = {
  render: (args) => (
    <Frame>
      <Heading {...args} />
    </Frame>
  ),
};
export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <Heading {...args} key={variant} variant={variant}>
          {variant.toUpperCase()} - {args.children}
        </Heading>
      ))}
    </Frame>
  ),
};
export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <div key={tone} className={tone === 'inverse' ? 'rounded-md bg-misc-bg-black p-3' : 'p-3'}>
          <Heading {...args} tone={tone}>
            {tone} heading
          </Heading>
        </div>
      ))}
    </Frame>
  ),
};
export const Weights = {
  render: (args) => (
    <Frame>
      {weights.map((weight) => (
        <Heading {...args} key={weight} weight={weight}>
          {weight} heading
        </Heading>
      ))}
    </Frame>
  ),
};
