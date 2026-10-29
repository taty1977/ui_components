import React from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ChevronDownIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { paletteTones } from '../../../themes/paletteTones';
import Menu from '../Menu';

const edit = fn();
const items = [
  { label: 'Edit', icon: <PencilIcon className="size-5" />, onSelect: edit },
  { label: 'Duplicate' },
  { label: 'Delete', icon: <TrashIcon className="size-5" />, dividerBefore: true },
];
const variants = ['default', 'label', 'outline', 'text'];
const Frame = ({ children }) => <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{children}</div>;
const MenuFrame = ({ children }) => <div className="flex min-h-56 items-start justify-end">{children}</div>;
const renderMenu = (args) => (
  <div className="max-w-sm">
    <MenuFrame>
      <Menu {...args} />
    </MenuFrame>
  </div>
);
const openMenu = async ({ canvasElement, args }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: args.label || args.triggerAriaLabel }));
  await expect(canvas.getByRole('menu')).toBeVisible();
};

export default {
  title: 'Inputs/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'An action menu with its own trigger, icons, separators, and disabled items. Arrow keys, Home, and End move focus; Enter selects; Escape dismisses and restores trigger focus. Clicking outside dismisses the menu. The default popup is neutral paper; label and outline use the selected tone. Menus are positioned inline, so allow space below the trigger and avoid clipping ancestors.',
      },
    },
  },
  args: {
    label: 'Actions',
    triggerIcon: <ChevronDownIcon className="size-4" />,
    items,
    variant: 'default',
    tone: 'primary',
    disabled: false,
  },
  argTypes: {
    label: { control: 'text', table: { category: 'Content' } },
    triggerIcon: { control: false, table: { category: 'Content' } },
    triggerAriaLabel: {
      control: 'text',
      description: 'Accessible name for an icon-only trigger when label is omitted.',
      table: { category: 'Accessibility' },
    },
    variant: { control: 'select', options: variants, table: { category: 'Appearance' } },
    tone: { control: 'select', options: paletteTones, table: { category: 'Appearance' } },
    disabled: { control: 'boolean', table: { category: 'State' } },
    items: {
      control: false,
      description: 'Items accept label, icon, onSelect, disabled, and dividerBefore.',
      table: { category: 'Content' },
    },
    className: { control: 'text', table: { category: 'Layout' } },
    menuClassName: { control: 'text', table: { category: 'Layout' } },
  },
};

export const Playground = { render: renderMenu };

export const Variants = {
  render: (args) => (
    <Frame>
      {variants.map((variant) => (
        <MenuFrame key={variant}>
          <Menu {...args} label={variant} variant={variant} />
        </MenuFrame>
      ))}
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const variant of variants) {
      await userEvent.click(canvas.getByRole('button', { name: variant }));
      await expect(canvas.getByRole('menu', { name: variant })).toBeVisible();
      await expect(canvas.getAllByRole('menu')).toHaveLength(1);
    }
  },
};

export const Tones = {
  args: { variant: 'label' },
  render: (args) => (
    <Frame>
      {paletteTones.map((tone) => (
        <MenuFrame key={tone}>
          <Menu {...args} label={tone} tone={tone} />
        </MenuFrame>
      ))}
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    for (const tone of paletteTones) {
      await userEvent.click(canvas.getByRole('button', { name: tone }));
      await expect(canvas.getByRole('menu', { name: tone })).toBeVisible();
      await expect(canvas.getAllByRole('menu')).toHaveLength(1);
    }
  },
};

export const WithIconsAndDividers = { render: renderMenu, play: openMenu };

export const IconOnly = {
  render: renderMenu,
  args: {
    label: undefined,
    triggerAriaLabel: 'Account options',
    triggerIcon: <EllipsisHorizontalIcon className="size-4" />,
    variant: 'text',
  },
  play: openMenu,
};

export const States = {
  render: (args) => (
    <Frame>
      <MenuFrame>
        <Menu
          {...args}
          label="Available actions"
          disabled={false}
          items={[{ label: 'Edit' }, { label: 'Archive', disabled: true }, { label: 'Delete' }]}
        />
      </MenuFrame>
      <MenuFrame>
        <Menu {...args} label="Unavailable actions" disabled />
      </MenuFrame>
    </Frame>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabled = canvas.getByRole('button', { name: 'Unavailable actions' });
    await expect(disabled).toBeDisabled();
    await userEvent.click(disabled);
    await expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: 'Available actions' }));
    await expect(canvas.getByRole('menuitem', { name: 'Archive' })).toBeDisabled();
  },
};

export const KeyboardNavigation = {
  render: renderMenu,
  args: {
    items: [
      { label: 'Edit', onSelect: edit },
      { label: 'Archive', disabled: true },
      { label: 'Delete', dividerBefore: true },
    ],
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Actions' });
    trigger.focus();
    await userEvent.keyboard('{Enter}');
    const first = canvas.getByRole('menuitem', { name: 'Edit' });
    const last = canvas.getByRole('menuitem', { name: 'Delete' });
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(last).toHaveFocus();
    await userEvent.keyboard('{ArrowDown}');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{ArrowUp}');
    await expect(last).toHaveFocus();
    await userEvent.keyboard('{Home}');
    await expect(first).toHaveFocus();
    await userEvent.keyboard('{End}');
    await expect(last).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard('{Enter}{Enter}');
    await expect(args.items[0].onSelect).toHaveBeenCalledOnce();
    await expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
  },
};

export const OutsideClick = {
  render: (args) => (
    <div className="max-w-sm">
      {renderMenu(args)}
      <button type="button" className="rounded-md border border-border-subtle px-4 py-2">
        Outside action
      </button>
    </div>
  ),
  play: async (context) => {
    await openMenu(context);
    const canvas = within(context.canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Outside action' }));
    await expect(canvas.queryByRole('menu')).not.toBeInTheDocument();
  },
};
