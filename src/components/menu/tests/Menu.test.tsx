import { fireEvent, render, screen } from '@testing-library/react';
import Menu from '../Menu';

describe('Menu', () => {
  test('opens the menu, selects an item, and restores trigger focus', () => {
    const onSelect = vi.fn();
    render(
      <Menu
        label="More actions"
        items={[
          { label: 'Edit', onSelect },
          { label: 'Archive', disabled: true },
        ]}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'More actions' });
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();
    expect(screen.getByRole('menuitem', { name: 'Archive' })).toBeDisabled();

    fireEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test('supports keyboard navigation and Escape dismissal', () => {
    render(
      <Menu
        label="Options"
        items={[{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]}
        variant="outline"
        tone="warning"
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Options' });
    fireEvent.click(trigger);
    const firstItem = screen.getByRole('menuitem', { name: 'First' });
    const secondItem = screen.getByRole('menuitem', { name: 'Second' });
    expect(trigger).toHaveAttribute('data-variant', 'outline');
    expect(screen.getByRole('menu')).toHaveAttribute('data-variant', 'outline');
    fireEvent.keyDown(firstItem, { key: 'ArrowDown' });
    expect(secondItem).toHaveFocus();
    fireEvent.keyDown(secondItem, { key: 'Escape' });
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test('supports an icon-only trigger with an accessible name', () => {
    render(
      <Menu
        triggerAriaLabel="Account options"
        triggerIcon={<span>More</span>}
        items={[{ label: 'Settings' }]}
      />,
    );

    expect(screen.getByRole('button', { name: 'Account options' })).toBeInTheDocument();
  });
});
