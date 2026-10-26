import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TablePaginationControls } from '../TablePaginationControls';

describe('TablePaginationControls', () => {
  test('supports keyboard navigation with visible focus styles', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <TablePaginationControls
        pagination={{ page: 2, pageSize: 2, total: 6, onPageChange }}
        size="normal"
        tone="info"
      />,
    );
    const previous = screen.getByRole('button', { name: 'Previous' });
    const next = screen.getByRole('button', { name: 'Next' });
    for (const button of [previous, next]) {
      expect(button).toHaveClass(
        'focus-visible:outline',
        'focus-visible:outline-2',
        'focus-visible:outline-offset-2',
        'focus-visible:outline-current',
      );
    }
    await user.tab();
    expect(previous).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    await user.tab();
    expect(next).toHaveFocus();
    await user.keyboard(' ');
    expect(onPageChange).toHaveBeenLastCalledWith(3);
  });

  test('renders a numeric zero page status inside the live announcement', () => {
    render(
      <TablePaginationControls
        pagination={{ page: 1, pageSize: 2, total: 0, pageStatus: 0, onPageChange: vi.fn() }}
        size="small"
        tone="primary"
      />,
    );
    expect(screen.getByText('0')).toHaveAttribute('aria-live', 'polite');
  });

  test('omits an unspecified page status and blocks boundary navigation', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const { container } = render(
      <TablePaginationControls
        pagination={{ page: 1, pageSize: 2, total: 0, onPageChange }}
        size="normal"
        tone="primary"
      />,
    );
    expect(container.querySelector('[aria-live]')).toBeNull();
    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
      await user.click(button);
    }
    expect(onPageChange).not.toHaveBeenCalled();
  });
});
