import React, { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';
import { Button } from '../../button';
import Modal from '../Modal';

const ModalExample = ({ modalProps = {}, children = 'Modal content goes here.' }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...modalProps} open={open} onClose={() => setOpen(false)}>
        {children}
      </Modal>
    </div>
  );
};

export default {
  title: 'Feedback/Modal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A controlled dialog rendered in a portal. It supports accessible title or aria-label naming, Escape and optional backdrop dismissal, keyboard focus trapping, body scroll locking, and focus restoration to the opener.',
      },
    },
  },
  args: {
    title: 'Modal title',
    description: 'Add a short explanation of this dialog.',
    size: 'medium',
    closeOnBackdrop: true,
    showCloseButton: true,
  },
  argTypes: {
    open: { control: 'boolean', table: { category: 'State' } },
    onClose: { action: 'close', table: { category: 'Events' } },
    title: { control: 'text', table: { category: 'Content' } },
    description: { control: 'text', table: { category: 'Content' } },
    ariaLabel: { control: 'text', table: { category: 'Accessibility' } },
    size: { control: 'select', options: ['small', 'medium', 'large', 'full'], table: { category: 'Layout' } },
    closeOnBackdrop: { control: 'boolean', table: { category: 'Behavior' } },
    showCloseButton: { control: 'boolean', table: { category: 'Behavior' } },
    closeButtonLabel: { control: 'text', table: { category: 'Accessibility' } },
    children: { control: false, table: { category: 'Content' } },
  },
  render: (args) => <ModalExample modalProps={args}>Dialog content with a primary action.</ModalExample>,
};

export const Playground = {};

export const DismissalAndFocus = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open modal' }));
    const dialog = within(document.body).getByRole('dialog', { name: 'Modal title' });
    await expect(dialog).toBeVisible();
    await expect(within(dialog).getByRole('button', { name: 'Close dialog' })).toHaveFocus();
    await userEvent.keyboard('{Escape}');
    await expect(within(document.body).queryByRole('dialog')).not.toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Open modal' })).toHaveFocus();
  },
};

export const Sizes = {
  render: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      {['small', 'medium', 'large', 'full'].map((size) => (
        <ModalExample key={size} modalProps={{ title: `${size} modal`, size }}>
          This dialog uses the {size} width.
        </ModalExample>
      ))}
    </div>
  ),
};
