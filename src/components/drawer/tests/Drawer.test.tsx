import { useState, type CSSProperties } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Drawer from '../Drawer';

describe('Drawer', () => {
  test.each(['left', 'right', 'top', 'bottom'] as const)('supports the %s anchor', (anchor) => {
    render(
      <Drawer open onClose={vi.fn()} title="Navigation" anchor={anchor} width={360} height={240}>
        Content
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Navigation' });
    expect(screen.getByRole('heading', { level: 2, name: 'Navigation' })).toHaveClass(
      'text-[19px]',
      'leading-22',
      'self-center',
      'font-semibold',
    );
    expect(dialog).toHaveAttribute('data-anchor', anchor);
    expect(dialog).toHaveClass(
      'bg-background-surface',
      'text-text-primary',
      'border-border-subtle',
      'rounded-none',
      'overflow-y-auto',
    );
    expect(dialog.style.width).toBe(anchor === 'left' || anchor === 'right' ? '360px' : '100%');
    expect(dialog.style.height).toBe(anchor === 'left' || anchor === 'right' ? '100%' : '240px');
  });

  test('is hidden when closed', () => {
    render(
      <Drawer open={false} onClose={vi.fn()} title="Navigation">
        Content
      </Drawer>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('defaults to a full-height left drawer with a 320px width', () => {
    render(
      <Drawer open onClose={vi.fn()} title="Navigation">
        Content
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Navigation' });
    expect(dialog).toHaveAttribute('data-anchor', 'left');
    expect(dialog.style.width).toBe('320px');
    expect(dialog.style.height).toBe('100%');
  });

  test('preserves explicit style and class overrides', () => {
    const style: CSSProperties & { '--background-surface': string } = {
      width: 280,
      height: 400,
      '--background-surface': '#ffffff',
    };
    render(
      <Drawer
        open
        onClose={vi.fn()}
        title="Navigation"
        width={360}
        style={style}
        className="custom-backdrop"
        panelClassName="rounded-md custom-panel"
      >
        Content
      </Drawer>,
    );
    const dialog = screen.getByRole('dialog', { name: 'Navigation' });
    expect(dialog.style.width).toBe('280px');
    expect(dialog.style.height).toBe('400px');
    expect(dialog.style.getPropertyValue('--background-surface')).toBe('#ffffff');
    expect(dialog).toHaveClass('rounded-md', 'custom-panel');
    expect(dialog).not.toHaveClass('rounded-none');
    expect(dialog.parentElement).toHaveClass('custom-backdrop');
  });

  test('allows title styling overrides without changing the accessible name', () => {
    render(
      <Drawer open onClose={vi.fn()} title="Navigation" titleClassName="text-15 leading-20">
        Content
      </Drawer>,
    );
    const heading = screen.getByRole('heading', { level: 2, name: 'Navigation' });
    expect(heading).toHaveClass('text-15', 'leading-20');
    expect(heading).not.toHaveClass('text-[19px]', 'leading-22');
    expect(screen.getByRole('dialog', { name: 'Navigation' })).not.toHaveAttribute('titleClassName');
  });

  test('supports dismissal, focus trapping, scroll locking, and restoration', () => {
    function Example() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open drawer</button>
          <Drawer open={open} onClose={() => setOpen(false)} title="Navigation">
            <a href="#work">Work</a>
          </Drawer>
        </>
      );
    }
    const overflow = document.body.style.overflow;
    render(<Example />);
    const opener = screen.getByRole('button', { name: 'Open drawer' });
    opener.focus();
    fireEvent.click(opener);
    const close = screen.getByRole('button', { name: 'Close drawer' });
    expect(close).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    screen.getByRole('link').focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
    expect(document.body.style.overflow).toBe(overflow);
    fireEvent.click(opener);
    fireEvent.click(screen.getByRole('button', { name: 'Close drawer' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  test('supports optional backdrop dismissal', () => {
    const onClose = vi.fn();
    const { rerender } = render(
      <Drawer open onClose={onClose} ariaLabel="Navigation">
        Content
      </Drawer>,
    );
    const backdrop = screen.getByRole('dialog').parentElement;
    if (!backdrop) throw new Error('Drawer backdrop missing');
    fireEvent.mouseDown(backdrop);
    expect(onClose).toHaveBeenCalledOnce();
    onClose.mockClear();
    rerender(
      <Drawer open onClose={onClose} ariaLabel="Navigation" closeOnBackdrop={false}>
        Content
      </Drawer>,
    );
    fireEvent.mouseDown(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });
});
