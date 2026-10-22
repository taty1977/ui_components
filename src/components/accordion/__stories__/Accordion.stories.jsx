import React from 'react';
import { Bars3Icon, PlusIcon } from '@heroicons/react/24/solid';
import { Accordion } from '../Accordion';

const tones = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
const appearances = ['default', 'label', 'outline', 'text'];
const Frame = ({ children }) => <div className="grid max-w-80 gap-6">{children}</div>;

const accordionItems = [
  { id: '1', title: 'Accordion Item 1', content: 'Content for the first accordion item' },
  { id: '2', title: 'Accordion Item 2', content: 'Content for the second accordion item' },
  { id: '3', title: 'Accordion Item 3', content: 'Content for the third accordion item' },
];

const baseArgs = {
  items: accordionItems,
  allowMultiple: false,
  variant: 'default',
  tone: 'primary',
  size: 'normal',
  iconPosition: 'right',
};

export default {
  component: Accordion,
  title: 'Data Display/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An accessible accordion with Button-style default (solid), label (tinted), outline, and text header variants, six tones, two sizes, and customizable icons. Previous outlined, filled, and standard values remain aliases for outline, default, and text.',
      },
    },
  },
  args: baseArgs,
  argTypes: {
    allowMultiple: {
      control: { type: 'inline-radio' },
      options: [true, false],
      labels: {
        true: 'Allow multiple open',
        false: 'Single panel only',
      },
      description: 'When true, multiple accordion panels can stay open at once.',
      table: { category: 'Behavior', defaultValue: { summary: false } },
    },
    variant: {
      control: 'select',
      options: appearances,
      description: 'Matches Button variants: solid default, tinted label, outline, or text.',
      table: { category: 'Appearance', defaultValue: { summary: 'default' } },
    },
    tone: {
      control: 'select',
      options: tones,
      description: 'Choose the tone for the header background, text, border, and interaction states.',
      table: { category: 'Appearance', defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['small', 'normal'],
      description: 'Controls the header height, typography, and content spacing.',
      table: { category: 'Layout', defaultValue: { summary: 'normal' } },
    },
    className: {
      control: 'text',
      description: 'Optional class name applied to the accordion container.',
      table: { category: 'Layout' },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Places the collapsed or expanded icon before or after the title.',
      table: { category: 'Icons', defaultValue: { summary: 'right' } },
    },
    items: {
      control: 'object',
      description: 'Accordion panels with an id, title, and optional content.',
      table: { category: 'Data' },
    },
    collapsedIcon: { table: { disable: true } },
    expandedIcon: { table: { disable: true } },
    children: { table: { disable: true } },
  },
};

export const Playground = {};

export const Variants = {
  render: (args) => (
    <Frame>
      {appearances.map((variant) => (
        <Accordion key={variant} {...args} variant={variant} />
      ))}
    </Frame>
  ),
};

export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Accordion key={tone} {...args} tone={tone} items={[accordionItems[0]]} />
      ))}
    </Frame>
  ),
};

export const Sizes = {
  render: (args) => (
    <Frame>
      <Accordion {...args} size="small" />
      <Accordion {...args} size="normal" />
    </Frame>
  ),
};

export const States = {
  render: (args) => (
    <Frame>
      <section>
        <h2 className="mb-2 text-18 font-semibold text-text-primary">Single panel open</h2>
        <Accordion {...args} allowMultiple={false} />
      </section>
      <section>
        <h2 className="mb-2 text-18 font-semibold text-text-primary">Multiple panels open</h2>
        <Accordion {...args} allowMultiple />
      </section>
    </Frame>
  ),
};

const customIconArgs = {
  collapsedIcon: <PlusIcon className="size-4" aria-hidden="true" />,
  expandedIcon: <Bars3Icon className="size-4" aria-hidden="true" />,
};

export const WithIcons = {
  args: customIconArgs,
  parameters: {
    docs: { description: { story: 'Use custom icons for collapsed and expanded states.' } },
  },
};
