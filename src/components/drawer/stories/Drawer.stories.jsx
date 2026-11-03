import React, { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import Drawer from '../Drawer';
import Button from '../../button/Button';
import Link from '../../link/Link';
import Paragraph from '../../paragraph/Paragraph';
import { themeModes } from '../../../themes/themeTokens';

function Example(args) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer
        {...args}
        open={open}
        onClose={() => {
          args.onClose?.();
          setOpen(false);
        }}
      >
        <Paragraph tone="muted" className="mb-6">
          Explore the site.
        </Paragraph>
        <nav aria-label="Drawer navigation" className="grid gap-4">
          {['About', 'Projects', 'Contact'].map((label) => (
            <Link key={label} href={`#${label.toLowerCase()}`} tone="primary" underline="hover">
              {label}
            </Link>
          ))}
        </nav>
      </Drawer>
    </>
  );
}

async function checkDrawer({ canvasElement, args }) {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
  const body = within(document.body);
  const dialog = body.getByRole('dialog', { name: args.title });
  await expect(dialog).toBeVisible();
  const heading = within(dialog).getByRole('heading', { name: args.title, level: 2 });
  await expect(getComputedStyle(heading).fontSize).toBe('19px');
  await expect(getComputedStyle(heading).lineHeight).toBe('22px');
  const titleRect = heading.getBoundingClientRect();
  const closeRect = within(dialog).getByRole('button', { name: 'Close drawer' }).getBoundingClientRect();
  await expect(
    Math.abs(titleRect.top + titleRect.height / 2 - (closeRect.top + closeRect.height / 2)),
  ).toBeLessThanOrEqual(1);
  const rect = dialog.getBoundingClientRect();
  if (args.anchor === 'left') await expect(rect.left).toBe(0);
  if (args.anchor === 'right') await expect(Math.round(rect.right)).toBe(window.innerWidth);
  if (args.anchor === 'top') await expect(rect.top).toBe(0);
  if (args.anchor === 'bottom') await expect(Math.round(rect.bottom)).toBe(window.innerHeight);
  const themeRoot = canvasElement.querySelector('[class*="min-h-screen"]');
  await expect(getComputedStyle(dialog).getPropertyValue('--background-surface')).toBe(
    getComputedStyle(themeRoot).getPropertyValue('--background-surface'),
  );
  await userEvent.keyboard('{Escape}');
  await expect(body.queryByRole('dialog')).not.toBeInTheDocument();
  await expect(canvas.getByRole('button', { name: 'Open drawer' })).toHaveFocus();
}

export default {
  title: 'Navigation/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  includeStories: ['Playground', 'Right', 'Top', 'Bottom', 'Themes'],
  args: {
    title: 'Navigation',
    anchor: 'left',
    width: 320,
    height: 'auto',
    closeOnBackdrop: true,
    showCloseButton: true,
    closeButtonLabel: 'Close drawer',
    onClose: fn(),
  },
  render: (args) => <Example {...args} />,
  parameters: {
    docs: {
      description: {
        component:
          'A controlled temporary drawer anchored to any viewport edge. Start with Playground (left), explore the other anchors, then compare Themes. Use Open drawer to preview changes. Side drawers use width; top and bottom drawers use height. The 19px title stays centered with the close control. Reuses Modal for Escape/backdrop dismissal, focus trapping, and scroll locking, and inherits theme tokens across its portal. Not a persistent or swipeable drawer.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    children: {
      control: false,
      description: 'Navigation content is provided by the example.',
      table: { category: 'Content' },
    },
    anchor: { control: 'select', options: ['left', 'right', 'top', 'bottom'], table: { category: 'Layout' } },
    width: {
      control: 'number',
      description: 'Width in pixels for left and right drawers.',
      table: { category: 'Layout' },
    },
    height: {
      control: 'text',
      description: 'Height for top and bottom drawers, such as 280px or auto.',
      table: { category: 'Layout' },
    },
    titleClassName: { control: 'text', table: { category: 'Appearance' } },
    panelClassName: { control: 'text', table: { category: 'Appearance' } },
    className: { control: 'text', description: 'Additional backdrop classes.', table: { category: 'Appearance' } },
    style: {
      control: 'object',
      description: 'Panel styles override default dimensions and inherited tokens.',
      table: { category: 'Appearance' },
    },
    open: { control: false, description: 'Managed by the Open drawer button.', table: { category: 'State' } },
    closeOnBackdrop: { control: 'boolean', table: { category: 'Behavior' } },
    showCloseButton: { control: 'boolean', table: { category: 'Behavior' } },
    closeButtonLabel: { control: 'text', table: { category: 'Accessibility' } },
    ariaLabel: {
      control: false,
      description: 'Use instead of title for a drawer without a visible heading.',
      table: { category: 'Accessibility' },
    },
    onClose: { control: false, table: { category: 'Events' } },
  },
};

export const Playground = {
  parameters: {
    docs: { description: { story: 'Left-anchored navigation with editable layout and behavior controls.' } },
  },
  play: checkDrawer,
};
export const Right = { name: 'Right Anchor', args: { anchor: 'right' }, play: checkDrawer };
export const Top = { name: 'Top Anchor', args: { anchor: 'top', height: 280 }, play: checkDrawer };
export const Bottom = { name: 'Bottom Anchor', args: { anchor: 'bottom', height: 280 }, play: checkDrawer };
export const Themes = {
  name: 'Theme Comparison',
  parameters: {
    docs: {
      description: { story: 'Open each drawer to compare inherited surface and text colors across all themes.' },
    },
  },
  render: (args) => (
    <div className="grid gap-6">
      {themeModes.map((theme) => (
        <div key={theme} data-drawer-theme={theme} className={`${theme} bg-background-surface text-text-primary p-4`}>
          <Paragraph className="mb-3">{theme}</Paragraph>
          <Example {...args} title={`${theme} drawer`} />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvasElement }) => {
    for (const theme of themeModes) {
      const root = canvasElement.querySelector(`[data-drawer-theme="${theme}"]`);
      const canvas = within(root);
      await userEvent.click(canvas.getByRole('button', { name: 'Open drawer' }));
      const dialog = within(document.body).getByRole('dialog', { name: `${theme} drawer` });
      await expect(dialog).toBeVisible();
      await expect(getComputedStyle(dialog).backgroundColor).toBe(getComputedStyle(root).backgroundColor);
      await expect(getComputedStyle(dialog).color).toBe(getComputedStyle(root).color);
      await userEvent.click(within(dialog).getByRole('button', { name: 'Close drawer' }));
      await expect(dialog).not.toBeInTheDocument();
    }
  },
};
