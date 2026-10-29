import React from 'react';
import { fn } from 'storybook/test';
import { Button } from '../../button';
import { paletteTones } from '../../../themes/paletteTones';
import Card from '../Card';

const variants = ['default', 'label', 'outline', 'text'];
const Frame = ({ children }) => <div className="grid w-full max-w-2xl gap-6">{children}</div>;
const renderCard = (args) => (
  <Frame>
    <Card {...args} />
  </Frame>
);

export default {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A theme-aware content surface with optional title, description, and actions. The default card is neutral when tone is omitted; an explicit tone gives it a softly tinted surface with readable text. Label is tinted, outline is bordered, and text removes the surface. Title accepts React content; use a heading element when the card introduces a section.',
      },
    },
  },
  args: {
    title: 'Account balance',
    description: 'Last 30 days',
    children: '$5,216,471.18',
    variant: 'default',
    tone: undefined,
  },
  argTypes: {
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    children: { control: 'text', table: { category: 'Content' } },
    actions: {
      control: false,
      description: 'Optional React content displayed at the end of the card header.',
      table: { category: 'Content' },
    },
    variant: { control: 'select', options: variants, table: { category: 'Appearance' } },
    tone: {
      control: 'select',
      options: ['neutral', ...paletteTones],
      mapping: { neutral: undefined },
      description: 'Omit for the neutral default surface. Label and outline fall back to primary.',
      table: { category: 'Appearance' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
    headerClassName: { control: 'text', table: { category: 'Layout' } },
    contentClassName: { control: 'text', table: { category: 'Layout' } },
  },
};

export const Playground = { render: renderCard };

export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <Card {...args} key={variant} title={`${variant} card`} variant={variant} />
      ))}
    </Frame>
  ),
};

export const Tones = {
  args: { variant: 'label' },
  render: (args) => (
    <Frame>
      {paletteTones.map((tone) => (
        <Card {...args} key={tone} title={`${tone} card`} tone={tone} />
      ))}
    </Frame>
  ),
};

export const WithActions = {
  render: ({ onManageAccount, ...args }) => (
    <Frame>
      <Card
        {...args}
        actions={
          <Button size="sm" variant="default" onClick={onManageAccount}>
            Manage account
          </Button>
        }
      />
    </Frame>
  ),
  args: {
    children: 'Account details and activity appear in this content area.',
    onManageAccount: fn(),
  },
  argTypes: {
    onManageAccount: {
      control: false,
      description: 'Storybook action logged when Manage account is clicked.',
      table: { category: 'Actions' },
    },
  },
};

export const ContentOnly = {
  render: renderCard,
  args: { title: undefined, description: undefined, children: 'A simple surface without a header.' },
};

export const HeaderOnly = { render: renderCard, args: { children: undefined } };
