import React from 'react';
import { expect, userEvent, within } from 'storybook/test';
import Navbar from '../Navbar';

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

export default {
  title: 'Navigation/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A responsive section-navigation header with a brand link, current-section indication, and a collapsible mobile menu. On small screens the menu opens from the header and can be dismissed with Escape or by choosing a link.',
      },
    },
  },
  args: {
    brand: 'Tatianas',
    links,
    brandHref: '#top',
    activeHref: '#about',
  },
  argTypes: {
    brand: { control: 'text', table: { category: 'Content' } },
    brandHref: { control: 'text', table: { category: 'Content' } },
    activeHref: { control: 'text', table: { category: 'Content' } },
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    links: { control: false, table: { category: 'Content' } },
    className: { control: 'text', table: { category: 'Layout' } },
  },
};

export const Playground = {};

export const MobileMenu = {
  render: (args) => React.createElement('div', { style: { width: 375, maxWidth: '100%' } }, React.createElement(Navbar, args)),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Open navigation menu' });
    await expect(trigger).toBeVisible();
    await expect(canvas.queryByRole('link', { name: 'Contact' })).not.toBeInTheDocument();
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(canvas.getByRole('link', { name: 'Contact' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
};
