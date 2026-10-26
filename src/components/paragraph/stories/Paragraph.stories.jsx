import React from 'react';
import Paragraph from '../Paragraph';
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
        component: 'Themed paragraph text with six typography variants, theme tones, and configurable weights.',
      },
    },
  },
  args: { children: 'Shared tokens keep the web experience consistent.', variant: 'body1', tone: 'default' },
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
        <div key={tone} className={tone === 'inverse' ? 'rounded-md bg-palette-secondary-dark p-3' : 'p-3'}>
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
