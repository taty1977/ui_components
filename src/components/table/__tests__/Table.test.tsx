import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Table from '../Table';

interface User {
  id: number;
  name: string;
  status: string;
}

const rows: User[] = [
  { id: 1, name: 'Ada Lovelace', status: 'Active' },
  { id: 2, name: 'Grace Hopper', status: 'Pending' },
];

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'status', header: 'Status' },
];

describe('Table', () => {
  test.each(['label', 'outline', 'text', 'outlined', 'filled', 'standard', 'primary', 'secondary'] as const)(
    'uses label styling instead of %s when column headers are absent',
    (variant) => {
      const { rerender } = render(
        <Table
          columns={columns.map((column) => ({ ...column, header: null }))}
          data={rows}
          variant={variant}
          stickyFirstColumn
        />,
      );
      const region = screen.getByRole('region');
      expect(region).toHaveClass('rounded-md');
      expect(region).not.toHaveClass('border');
      expect(region.nextElementSibling).toBeNull();
      expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).not.toHaveClass('border');
      expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveClass(
        'border-b',
        `bg-palette-${variant === 'secondary' ? 'secondary' : 'primary'}-opacity-light`,
        `text-palette-${variant === 'secondary' ? 'secondary' : 'primary'}-main`,
      );
      expect(region.parentElement?.parentElement).toHaveAttribute('data-variant', 'label');
      expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveClass('border-r');
      rerender(<Table columns={columns} data={rows} variant="outline" />);
      expect(region).toHaveClass('border');
      expect(region.nextElementSibling).toHaveClass('border');
    },
  );

  test('replaces the sticky row-header right divider with a shadow after horizontal scrolling', () => {
    const { rerender } = render(
      <Table
        columns={columns.map((column) => ({ ...column, header: null }))}
        data={rows}
        stickyFirstColumn
        showColumnBorders
      />,
    );
    const region = screen.getByRole('region');
    const first = screen.getByRole('rowheader', { name: 'Ada Lovelace' });
    expect(first).toHaveClass('border-r', 'border-divider', 'after:hidden');
    expect(screen.getByRole('cell', { name: 'Active' })).not.toHaveClass('border-l');
    fireEvent.scroll(region, { target: { scrollTop: 50, scrollLeft: 0 } });
    expect(first).toHaveClass('after:hidden');
    fireEvent.scroll(region, { target: { scrollLeft: 100 } });
    expect(first).toHaveClass('after:from-action-focus');
    expect(first).not.toHaveClass('border-r');
    expect(first).not.toHaveClass('after:hidden');
    fireEvent.scroll(region, { target: { scrollLeft: 0 } });
    expect(first).toHaveClass('border-r', 'after:hidden');
    rerender(
      <Table
        columns={columns.map((column) => ({ ...column, header: null }))}
        data={rows}
        stickyFirstColumn
        breakpoint="mobile"
      />,
    );
    expect(first).not.toHaveClass('border-r', 'after:from-action-focus', 'sticky');
  });

  test('pins opaque headers with a soft bottom shadow above sticky body columns', () => {
    const { rerender } = render(
      <Table columns={columns} data={rows} stickyHeader stickyFirstColumn variant="label" tone="info" />,
    );
    expect(screen.getByRole('region')).toHaveClass('max-h-80', 'overflow-auto');
    const first = screen.getByRole('columnheader', { name: 'Name' });
    const last = screen.getByRole('columnheader', { name: 'Status' });
    expect(first).toHaveClass('sticky', 'top-0', 'left-0', 'z-30');
    expect(last).toHaveClass('sticky', 'top-0', 'z-20');
    for (const header of [first, last]) {
      expect(header).toHaveClass('border-b', 'border-divider');
      expect(header).not.toHaveClass('border-b-0');
      expect(header.style.backgroundColor).toBe('var(--background-surface)');
      expect(header.style.backgroundImage).toContain('var(--palette-info-opacity-light)');
      expect(header.lastElementChild).toHaveClass('-bottom-1.5', 'h-1.5', 'from-action-focus', 'to-transparent');
      expect(header.lastElementChild).toHaveAttribute('aria-hidden', 'true');
      expect(header.lastElementChild).toHaveClass('hidden');
    }
    const region = screen.getByRole('region');
    fireEvent.scroll(region, { target: { scrollTop: 0, scrollLeft: 50 } });
    expect(first.lastElementChild).toHaveClass('hidden');
    fireEvent.scroll(region, { target: { scrollTop: 100 } });
    for (const header of [first, last]) {
      expect(header).toHaveClass('border-b');
      expect(header).not.toHaveClass('border-b-0');
      expect(header.lastElementChild).not.toHaveClass('hidden');
    }
    fireEvent.scroll(region, { target: { scrollTop: 0 } });
    expect(first.lastElementChild).toHaveClass('hidden');
    expect(last.lastElementChild).toHaveClass('hidden');
    expect(first).toHaveClass('border-b');
    expect(first).not.toHaveClass('border-b-0');
    expect(last).not.toHaveClass('border-b-0');
    rerender(<Table columns={columns} data={rows} />);
    expect(screen.getByRole('region')).not.toHaveClass('max-h-80');
    expect(screen.getByRole('columnheader', { name: 'Name' })).not.toHaveClass('top-0');
  });

  test.each(['outline', 'text', 'filled'] as const)('preserves the shadow-only sticky header for %s', (variant) => {
    render(<Table columns={columns} data={rows} stickyHeader variant={variant} />);
    screen.getAllByRole('columnheader').forEach((header) => {
      expect(header).toHaveClass('border-b-0');
      expect(header.lastElementChild).toHaveClass('bg-gradient-to-b');
      expect(header.lastElementChild).not.toHaveClass('hidden');
    });
  });

  test.each(['primary', 'secondary', 'info'] as const)('paints the rounded %s outline above sticky cells', (tone) => {
    render(<Table columns={columns} data={rows} tone={tone} stickyFirstColumn stickyLastColumn />);
    const region = screen.getByRole('region', { name: 'Scrollable table' });
    expect(region.parentElement).toHaveClass('relative', 'isolate');
    expect(region.nextElementSibling).toHaveClass(
      'absolute',
      'inset-0',
      'z-40',
      'rounded-md',
      'border',
      'pointer-events-none',
      `border-palette-${tone}-main`,
    );
    expect(region.nextElementSibling).toHaveAttribute('aria-hidden', 'true');
  });

  test.each(['outline', 'outlined'] as const)('keeps only the header bottom divider for %s', (variant) => {
    render(<Table columns={columns} data={rows} variant={variant} showColumnBorders />);

    screen.getAllByRole('columnheader').forEach((header) => {
      expect(header).toHaveClass('border-x-0', 'border-t-0', 'border-b');
      expect(header).not.toHaveClass('border', 'border-0', 'border-l');
    });
    expect(screen.getByRole('cell', { name: 'Active' })).toHaveClass('border-l');
    expect(screen.getByRole('region', { name: 'Scrollable table' })).toHaveClass('border');
  });

  test('renders data', () => {
    render(<Table<User> columns={columns} data={rows} getRowKey={(row) => row.id} />);

    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Data table' })).toBeInTheDocument();
  });

  test('renders an empty message when data is empty', () => {
    render(<Table columns={columns} data={[]} emptyMessage="Nothing here" />);

    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  test('hides the table head and rounds the body when headers are unavailable', () => {
    render(
      <Table
        columns={[
          { key: 'name', header: null },
          { key: 'status', header: null },
        ]}
        data={rows}
      />,
    );

    expect(screen.queryByRole('columnheader')).not.toBeInTheDocument();
    expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveAttribute('scope', 'row');
    expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveClass('font-semibold');
    expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveClass(
      'bg-palette-primary-opacity-light',
      'text-palette-primary-main',
    );
    expect(screen.getAllByRole('rowheader', { name: 'Ada Lovelace' })[0]).toHaveClass('rounded-tl-md');
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveClass('rounded-tr-md');
    expect(screen.getByRole('rowheader', { name: 'Grace Hopper' })).toHaveClass('rounded-bl-md');
  });

  test('renders pagination only when configured and changes pages', () => {
    const onPageChange = vi.fn();
    render(<Table columns={columns} data={rows} pagination={{ page: 2, pageSize: 2, total: 5, onPageChange }} />);

    expect(screen.getByRole('navigation', { name: 'Table pagination' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  test('matches pagination buttons to the table variant', () => {
    render(
      <Table
        columns={columns}
        data={rows}
        variant="primary"
        pagination={{ page: 1, pageSize: 2, total: 5, onPageChange: vi.fn() }}
      />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('rounded-md');
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('text-palette-primary-main');
    expect(screen.getByRole('button', { name: 'Previous' })).not.toHaveClass('border');
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('font-semibold');
  });

  test('supports button appearances, tones, and sizes with legacy input aliases', () => {
    const { container, rerender } = render(<Table columns={columns} data={rows} />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'outline');
    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-transparent',
      'text-palette-primary-main',
    );
    expect(container.firstChild).toHaveClass('rounded-lg', 'border-border-subtle', 'p-4', 'shadow-sm');
    expect(screen.getByRole('region')).toHaveClass('border-palette-primary-main');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'px-4',
      'py-4',
      'text-[0.875rem]',
      'leading-[1.43]',
    );

    rerender(<Table columns={columns} data={rows} variant="filled" tone="success" size="small" />);

    expect(screen.getByRole('region')).toHaveClass('rounded-md');
    expect(container.firstChild).toHaveAttribute('data-tone', 'success');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-palette-success-main',
      'text-misc-bg-white',
      'px-4',
      'py-3',
      'text-13',
    );

    rerender(<Table columns={columns} data={rows} variant="standard" tone="warning" />);
    expect(screen.getByRole('region')).toHaveClass('rounded-none');
    expect(container.firstChild).toHaveAttribute('data-tone', 'warning');
  });

  test('keeps primary and secondary variants as legacy tone aliases', () => {
    const { container, rerender } = render(<Table columns={columns} data={rows} variant="primary" />);

    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-palette-primary-main',
      'text-misc-bg-white',
    );
    expect(screen.getByRole('region')).toHaveClass('border-palette-primary-main');

    rerender(<Table columns={columns} data={rows} variant="secondary" />);
    expect(container.firstChild).toHaveAttribute('data-tone', 'secondary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-palette-secondary-main',
      'text-misc-bg-white',
    );
    expect(screen.getByRole('region')).toHaveClass('border-palette-secondary-main');
  });

  test.each([
    ['primary', 'border-palette-primary-main', 'bg-palette-primary-main', 'text-palette-primary-main'],
    ['secondary', 'border-palette-secondary-main', 'bg-palette-secondary-main', 'text-palette-secondary-main'],
    ['info', 'border-palette-info-main', 'bg-palette-info-main', 'text-palette-info-main'],
  ] as const)(
    'applies the %s tone to the table frame, header, and pagination controls',
    (tone, borderClass, surfaceClass, textClass) => {
      const pagination = { page: 2, pageSize: 1, total: 2, onPageChange: vi.fn() };
      const { container } = render(
        <Table columns={columns} data={rows} variant="filled" tone={tone} pagination={pagination} />,
      );

      expect(container.firstChild).toHaveClass('border-border-subtle');
      expect(screen.getByRole('region')).toHaveClass(borderClass);
      expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(surfaceClass, 'text-misc-bg-white');
      expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass(textClass);
    },
  );

  test.each([
    ['label', 'bg-palette-info-opacity-light', 'text-palette-info-main'],
    ['outline', 'bg-transparent', 'text-palette-info-main'],
    ['text', 'bg-transparent', 'text-palette-info-main'],
  ] as const)('matches the Button %s header treatment', (variant, background, text) => {
    render(<Table columns={columns} data={rows} variant={variant} tone="info" />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(background, text);
  });

  test('renders page status supplied as a React node', () => {
    render(
      <Table
        columns={columns}
        data={rows}
        pagination={{
          page: 2,
          pageSize: 2,
          total: 5,
          onPageChange: vi.fn(),
          pageStatus: <>Step 2 of 3</>,
        }}
      />,
    );

    expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
  });

  test('can fix the first and last columns', () => {
    render(<Table columns={columns} data={rows} stickyFirstColumn stickyLastColumn />);

    expect(screen.getByRole('table')).toHaveClass('w-max');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('sticky');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('left-0');
    expect(screen.getAllByRole('cell', { name: 'Ada Lovelace' })[0]).toHaveClass('font-semibold');
    expect(screen.getAllByRole('cell', { name: 'Ada Lovelace' })[0]).toHaveClass('sticky');
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveClass('sticky');
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveClass('right-0');
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('sticky');
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('right-0');
  });

  test('disables sticky edges at the mobile breakpoint', () => {
    render(<Table columns={columns} data={rows} breakpoint="mobile" stickyFirstColumn stickyLastColumn />);

    expect(screen.getByRole('columnheader', { name: 'Name' })).not.toHaveClass('sticky');
    expect(screen.getByRole('columnheader', { name: 'Status' })).not.toHaveClass('sticky');
    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).not.toHaveClass('sticky');
    expect(screen.getByRole('columnheader', { name: 'Name' }).style.backgroundImage).toBe('');
  });

  test('replaces the first sticky column divider with a right-side shadow', () => {
    const { rerender } = render(
      <Table columns={columns} data={rows} variant="label" stickyFirstColumn showColumnBorders />,
    );
    for (const cell of [
      screen.getByRole('columnheader', { name: 'Name' }),
      screen.getByRole('cell', { name: 'Ada Lovelace' }),
    ]) {
      expect(cell).toHaveClass('after:-right-1.5', 'after:w-1.5', 'after:from-action-focus', 'after:to-transparent');
    }
    expect(screen.getByRole('columnheader', { name: 'Status' })).not.toHaveClass('border-l');
    expect(screen.getByRole('cell', { name: 'Active' })).not.toHaveClass('border-l');

    rerender(
      <Table columns={columns} data={rows} variant="label" stickyFirstColumn showColumnBorders breakpoint="mobile" />,
    );
    expect(screen.getByRole('columnheader', { name: 'Name' })).not.toHaveClass('after:from-action-focus');
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('border-l');
  });

  test('replaces the last sticky column left border with a soft left-side shadow', () => {
    const { rerender } = render(
      <Table columns={columns} data={rows} variant="label" stickyLastColumn showColumnBorders />,
    );
    for (const cell of [
      screen.getByRole('columnheader', { name: 'Status' }),
      screen.getByRole('cell', { name: 'Active' }),
    ]) {
      expect(cell).toHaveClass(
        'before:-left-1.5',
        'before:w-1.5',
        'before:bg-gradient-to-l',
        'before:from-action-focus',
        'before:to-transparent',
      );
      expect(cell).not.toHaveClass('border-l');
    }
    rerender(
      <Table columns={columns} data={rows} variant="label" stickyLastColumn showColumnBorders breakpoint="mobile" />,
    );
    expect(screen.getByRole('columnheader', { name: 'Status' })).not.toHaveClass('before:from-action-focus');
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('border-l');
  });

  test.each(['primary', 'secondary', 'info'] as const)(
    'keeps sticky %s headers opaque behind their tone and borders',
    (tone) => {
      render(
        <Table columns={columns} data={rows} variant="label" tone={tone} stickyFirstColumn stickyLastColumn striped />,
      );
      for (const header of screen.getAllByRole('columnheader')) {
        expect(header).toHaveClass('z-20');
        expect(header.style.backgroundColor).toBe('var(--background-surface)');
        expect(header.style.backgroundImage).toContain(`var(--palette-${tone}-opacity-light)`);
      }
      const stripedCell = screen.getByRole('cell', { name: 'Grace Hopper' });
      expect(stripedCell.style.backgroundColor).toBe('var(--background-surface)');
      expect(stripedCell.style.backgroundImage).toContain('var(--action-hover)');
      expect(stripedCell).toHaveClass('group-hover:[--table-cell-overlay:var(--action-hover)]');
    },
  );

  test('supports semibold text on any column', () => {
    render(<Table columns={[{ ...columns[0], fontWeight: 'semiBold' }, columns[1]]} data={rows} />);

    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toHaveClass('font-semibold');
  });

  test('conditionally renders column borders', () => {
    render(<Table columns={columns} data={rows} variant="label" showColumnBorders />);

    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('border-l', 'border-divider');
  });

  test('conditionally renders striped rows', () => {
    render(<Table columns={columns} data={rows} striped />);

    expect(screen.getAllByRole('row')[2].querySelector('td')).toHaveClass('bg-action-hover');
  });

  test('highlights the full row on hover', () => {
    render(<Table columns={columns} data={rows} />);

    const rowCells = screen.getAllByRole('row')[1].querySelectorAll('td');
    rowCells.forEach((cell) => expect(cell).toHaveClass('group-hover:bg-action-hover'));
  });

  test('uses the secondary surface color for secondary striped rows', () => {
    render(<Table columns={columns} data={rows} variant="secondary" striped />);

    expect(screen.getAllByRole('row')[2].querySelector('td')).toHaveClass('bg-action-hover');
  });

  test('conditionally renders custom pagination icons on the correct side of the button label', () => {
    render(
      <Table
        columns={columns}
        data={rows}
        pagination={{
          page: 1,
          pageSize: 2,
          total: 5,
          onPageChange: vi.fn(),
          previousIcon: <span data-testid="previous-icon">Previous icon</span>,
          nextIcon: <span data-testid="next-icon">Next icon</span>,
        }}
      />,
    );

    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(screen.getByTestId('previous-icon')).toBeInTheDocument();
    expect(screen.getByTestId('next-icon')).toBeInTheDocument();
    expect(previousButton.firstElementChild).toHaveTextContent('Previous icon');
    expect(previousButton.lastElementChild).toHaveTextContent('Previous');
    expect(nextButton.firstElementChild).toHaveTextContent('Next');
    expect(nextButton.lastElementChild).toHaveTextContent('Next icon');
  });

  test('conditionally renders column sort icons and forwards click handlers', () => {
    const onSort = vi.fn();

    render(
      <Table
        columns={[
          {
            ...columns[0],
            sortIcon: (
              <button type="button" data-testid="sort-icon" onClick={onSort}>
                Sort
              </button>
            ),
          },
          columns[1],
        ]}
        data={rows}
      />,
    );

    fireEvent.click(screen.getByTestId('sort-icon'));

    expect(screen.getByTestId('sort-icon')).toBeInTheDocument();
    expect(onSort).toHaveBeenCalledTimes(1);
  });
});
