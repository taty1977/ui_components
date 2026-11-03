import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import Modal from '../Modal';

describe('Modal', () => {
  test('renders an accessible dialog and closes with its close button', () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Edit profile" description="Update your account details.">
        <p>Profile form</p>
      </Modal>,
    );

    const dialog = screen.getByRole('dialog', { name: 'Edit profile' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAccessibleDescription('Update your account details.');
    expect(screen.getByText('Profile form')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close dialog' })).toHaveFocus();
    fireEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  test('closes on Escape and restores focus to the opener', () => {
    const ModalHarness = () => {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open dialog
          </button>
          <Modal open={open} onClose={() => setOpen(false)} title="Dialog title">
            Dialog content
          </Modal>
        </>
      );
    };
    render(<ModalHarness />);

    const opener = screen.getByRole('button', { name: 'Open dialog' });
    opener.focus();
    fireEvent.click(opener);
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  test('closes on backdrop click when enabled and stays open when disabled', () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Modal open onClose={onClose} title="Backdrop close">
        Content
      </Modal>,
    );

    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);
    expect(onClose).toHaveBeenCalledOnce();

    onClose.mockClear();
    rerender(
      <Modal open onClose={onClose} title="Backdrop disabled" closeOnBackdrop={false}>
        Content
      </Modal>,
    );
    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);
    expect(onClose).not.toHaveBeenCalled();
  });

  test('traps keyboard focus within the dialog', () => {
    render(
      <Modal open onClose={vi.fn()} title="Focus trap">
        <button type="button">First action</button>
        <button type="button">Last action</button>
      </Modal>,
    );

    const close = screen.getByRole('button', { name: 'Close dialog' });
    const last = screen.getByRole('button', { name: 'Last action' });
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
  });

  test('supports an aria-label when no visible title is needed', () => {
    render(
      <Modal open onClose={vi.fn()} ariaLabel="Confirm action" showCloseButton={false}>
        Confirmation content
      </Modal>,
    );

    expect(screen.getByRole('dialog', { name: 'Confirm action' })).toBeInTheDocument();
  });
});
