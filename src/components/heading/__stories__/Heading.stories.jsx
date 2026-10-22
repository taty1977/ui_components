import React from 'react';
import Heading from '../Heading';
const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const tones = ['default', 'muted', 'primary', 'secondary', 'error', 'warning', 'info', 'success', 'inverse'];
const weights = ['regular', 'medium', 'semibold', 'bold'];
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
  args: { children: 'Book an appointment', variant: 'h4', tone: 'default', weight: 'bold' },
  argTypes: {
    children: { control: 'text', table: { category: 'Content' } },
    variant: { control: 'select', options: variants, table: { category: 'Appearance' } },
    tone: {
      control: 'select',
      options: tones,
      table: { category: 'Appearance' },
    },
    weight: { control: 'select', options: weights, table: { category: 'Appearance' } },
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
        <Heading {...args} key={variant} level={variant} variant={variant}>
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
        <div key={tone} className={tone === 'inverse' ? 'rounded-md bg-palette-secondary-dark p-3' : 'p-3'}>
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
