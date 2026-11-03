import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { paletteTones } from '../../../themes/paletteTones';
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
  test('uses normal spacing for omitted and explicit default sizes, including pagination and empty rows', () => {
    const pagination = { page: 1, pageSize: 2, total: 4, onPageChange: vi.fn() };
    const { container, rerender } = render(<Table columns={columns} data={rows} pagination={pagination} />);
    expect(container.firstChild).toHaveAttribute('data-size', 'default');
    const headerClasses = screen.getByRole('columnheader', { name: 'Name' }).className;
    const cellClasses = screen.getByRole('cell', { name: 'Ada Lovelace' }).className;
    const paginationClasses = screen.getByRole('navigation').className;
    for (const size of ['default', 'normal'] as const) {
      rerender(<Table columns={columns} data={rows} pagination={pagination} size={size} />);
      expect(screen.getByRole('columnheader', { name: 'Name' }).className).toBe(headerClasses);
      expect(screen.getByRole('cell', { name: 'Ada Lovelace' }).className).toBe(cellClasses);
      expect(screen.getByRole('navigation').className).toBe(paginationClasses);
    }
    rerender(<Table columns={columns} data={[]} size="default" />);
    const emptyClasses = screen.getByRole('cell').className;
    rerender(<Table columns={columns} data={[]} size="normal" />);
    expect(screen.getByRole('cell').className).toBe(emptyClasses);
  });

  test.each([
    ['default', 'filled'],
    ['outlined', 'outline'],
    ['standard', 'text'],
    ['primary', 'filled'],
    ['secondary', 'filled'],
  ] as const)('preserves %s header styling as %s', (legacyVariant, variant) => {
    const tone = legacyVariant === 'primary' || legacyVariant === 'secondary' ? legacyVariant : 'info';
    const { rerender } = render(<Table columns={columns} data={rows} variant={legacyVariant} tone="info" />);
    const headerClasses = screen.getAllByRole('columnheader').map((header) => header.className);
    const frameClasses = screen.getByRole('region').className;

    rerender(<Table columns={columns} data={rows} variant={variant} tone={tone} />);
    expect(screen.getAllByRole('columnheader').map((header) => header.className)).toEqual(headerClasses);
    expect(screen.getByRole('region').className).toBe(frameClasses);
  });

  test.each(['default', 'label', 'outline', 'text', 'outlined', 'filled', 'standard', 'primary', 'secondary'] as const)(
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
        `text-palette-${variant === 'secondary' ? 'secondary' : 'primary'}-text`,
      );
      expect(region.parentElement?.parentElement).toHaveAttribute('data-variant', 'label');
      expect(screen.getByRole('rowheader', { name: 'Ada Lovelace' })).toHaveClass('border-r');
      rerender(<Table columns={columns} data={rows} variant="outline" />);
      expect(region).toHaveClass('border');
      expect(region.nextElementSibling).toBeNull();
    },
  );

  test.each(paletteTones)('draws the %s outline without an overlay covering table text', (tone) => {
    render(<Table columns={columns} data={rows} variant="outline" tone={tone} />);

    const region = screen.getByRole('region');
    expect(region).toHaveClass('rounded-md', 'border', `border-palette-${tone}-graphic`);
    expect(region.parentElement?.children).toHaveLength(1);
    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toBeVisible();
  });

  test.each(paletteTones)('uses the accessible foreground for %s solid header separators', (tone) => {
    render(<Table columns={columns} data={rows} variant="filled" tone={tone} showColumnBorders />);

    for (const header of screen.getAllByRole('columnheader')) {
      expect(header).toHaveClass(`text-palette-${tone}-contrast`);
      expect(header.style.borderColor).toBe(`var(--palette-${tone}-contrast)`);
    }
  });

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
    expect(first).toHaveClass('border-r', 'border-table-divider');
    expect(first.style.boxShadow).toBe('');
    expect(screen.getByRole('cell', { name: 'Active' })).not.toHaveClass('border-l');
    fireEvent.scroll(region, { target: { scrollTop: 50, scrollLeft: 0 } });
    expect(first.style.boxShadow).toBe('');
    fireEvent.scroll(region, { target: { scrollLeft: 100 } });
    expect(first.style.boxShadow).toBe('6px 0 6px -6px var(--action-focus)');
    expect(first).not.toHaveClass('border-r');
    fireEvent.scroll(region, { target: { scrollLeft: 0 } });
    expect(first).toHaveClass('border-r');
    expect(first.style.boxShadow).toBe('');
    rerender(
      <Table
        columns={columns.map((column) => ({ ...column, header: null }))}
        data={rows}
        stickyFirstColumn
        breakpoint="mobile"
      />,
    );
    expect(first).not.toHaveClass('border-r', 'sticky');
    expect(first.style.boxShadow).toBe('');
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
      expect(header).toHaveClass('border-b', 'border-table-divider');
      expect(header).not.toHaveClass('border-b-0');
      expect(header.style.backgroundColor).toBe('var(--table-cell-overlay, var(--palette-info-surface))');
      expect(header.style.backgroundImage).toBe('');
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

  test.each(['primary', 'secondary', 'info'] as const)('keeps the rounded %s outline around sticky cells', (tone) => {
    render(<Table columns={columns} data={rows} tone={tone} stickyFirstColumn stickyLastColumn />);
    const region = screen.getByRole('region', { name: /^Scrollable Data table/ });
    expect(region.parentElement).toHaveClass('relative', 'isolate');
    expect(region).toHaveClass('rounded-md', 'border', `border-palette-${tone}-graphic`);
    expect(region.nextElementSibling).toBeNull();
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('sticky', 'left-0');
    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('sticky', 'right-0');
  });

  test.each(['outline', 'outlined'] as const)('keeps only the header bottom divider for %s', (variant) => {
    render(<Table columns={columns} data={rows} variant={variant} showColumnBorders />);

    screen.getAllByRole('columnheader').forEach((header) => {
      expect(header).toHaveClass('border-x-0', 'border-t-0', 'border-b');
      expect(header).not.toHaveClass('border', 'border-0', 'border-l');
    });
    expect(screen.getByRole('cell', { name: 'Active' })).toHaveClass('border-l');
    expect(screen.getByRole('region', { name: /^Scrollable Data table/ })).toHaveClass('border');
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
      'text-palette-primary-text',
    );
    expect(screen.getAllByRole('rowheader', { name: 'Ada Lovelace' })[0]).toHaveClass('rounded-tl-md');
    expect(screen.getAllByRole('cell', { name: 'Active' })[0]).toHaveClass('rounded-tr-md');
    expect(screen.getByRole('rowheader', { name: 'Grace Hopper' })).toHaveClass('rounded-bl-md');
  });

  test('renders pagination only when configured and changes pages', () => {
    const onPageChange = vi.fn();
    render(<Table columns={columns} data={rows} pagination={{ page: 2, pageSize: 2, total: 5, onPageChange }} />);

    expect(screen.getByRole('navigation', { name: /^Pagination for Data table/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
    expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
  });

  test('gives each table landmark and pagination navigation a unique name', () => {
    const pagination = { page: 1, pageSize: 2, total: 5, onPageChange: vi.fn() };
    render(
      <>
        <Table columns={columns} data={rows} pagination={pagination} aria-label="Orders" />
        <Table columns={columns} data={rows} pagination={pagination} aria-label="Orders" />
      </>,
    );

    const regionNames = screen.getAllByRole('region').map((region) => region.getAttribute('aria-label'));
    const navigationNames = screen
      .getAllByRole('navigation')
      .map((navigation) => navigation.getAttribute('aria-label'));
    expect(new Set(regionNames).size).toBe(2);
    expect(new Set(navigationNames).size).toBe(2);
    expect(regionNames.every((name) => name?.startsWith('Scrollable Orders'))).toBe(true);
    expect(navigationNames.every((name) => name?.startsWith('Pagination for Orders'))).toBe(true);
  });

  test.each([
    [1, 5, true, false],
    [3, 5, false, true],
    [99, 5, false, true],
    [-1, 5, true, false],
    [1, 0, true, true],
  ] as const)(
    'preserves pagination boundaries for page %s and total %s',
    (page, total, previousDisabled, nextDisabled) => {
      render(<Table columns={columns} data={rows} pagination={{ page, total, pageSize: 2, onPageChange: vi.fn() }} />);
      expect(screen.getByRole('button', { name: 'Previous' }).hasAttribute('disabled')).toBe(previousDisabled);
      expect(screen.getByRole('button', { name: 'Next' }).hasAttribute('disabled')).toBe(nextDisabled);
    },
  );

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
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('text-palette-primary-text');
    expect(screen.getByRole('button', { name: 'Previous' })).not.toHaveClass('border');
    expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass('font-semibold');
  });

  test('supports button appearances, tones, and sizes with legacy input aliases', () => {
    const { container, rerender } = render(<Table columns={columns} data={rows} />);

    expect(container.firstChild).toHaveAttribute('data-variant', 'outline');
    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-transparent',
      'text-palette-primary-outline-text',
    );
    expect(container.firstChild).toHaveClass('rounded-lg', 'border-table-divider', 'p-4', 'shadow-sm');
    expect(screen.getByRole('region')).toHaveClass('border-palette-primary-graphic');
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
      'text-palette-success-contrast',
      'px-4',
      'py-3',
      'text-13',
    );

    rerender(<Table columns={columns} data={rows} variant="standard" tone="warning" />);
    expect(screen.getByRole('region')).toHaveClass('rounded-md');
    expect(container.firstChild).toHaveAttribute('data-tone', 'warning');
  });

  test('keeps primary and secondary variants as legacy tone aliases', () => {
    const { container, rerender } = render(<Table columns={columns} data={rows} variant="primary" />);

    expect(container.firstChild).toHaveAttribute('data-tone', 'primary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-palette-primary-main',
      'text-palette-primary-contrast',
    );
    expect(screen.getByRole('region')).toHaveClass('border-palette-primary-graphic');

    rerender(<Table columns={columns} data={rows} variant="secondary" />);
    expect(container.firstChild).toHaveAttribute('data-tone', 'secondary');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(
      'bg-palette-secondary-main',
      'text-palette-secondary-contrast',
    );
    expect(screen.getByRole('region')).toHaveClass('border-palette-secondary-graphic');
  });

  test.each([
    [
      'primary',
      'border-palette-primary-graphic',
      'bg-palette-primary-main',
      'text-palette-primary-contrast',
      'text-palette-primary-text',
    ],
    [
      'secondary',
      'border-palette-secondary-graphic',
      'bg-palette-secondary-main',
      'text-palette-secondary-contrast',
      'text-palette-secondary-text',
    ],
    [
      'info',
      'border-palette-info-graphic',
      'bg-palette-info-main',
      'text-palette-info-contrast',
      'text-palette-info-main',
    ],
  ] as const)(
    'applies the %s tone to the table frame, header, and pagination controls',
    (tone, borderClass, surfaceClass, contrastClass, textClass) => {
      const pagination = { page: 2, pageSize: 1, total: 2, onPageChange: vi.fn() };
      const { container } = render(
        <Table columns={columns} data={rows} variant="filled" tone={tone} pagination={pagination} />,
      );

      expect(container.firstChild).toHaveClass('border-table-divider');
      expect(screen.getByRole('region')).toHaveClass(borderClass);
      expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(surfaceClass, contrastClass);
      expect(screen.getByRole('columnheader', { name: 'Name' }).style.borderColor).toBe(
        `var(--palette-${tone}-contrast)`,
      );
      expect(screen.getByRole('button', { name: 'Previous' })).toHaveClass(textClass);
    },
  );

  test.each([
    ['default', 'bg-palette-info-main', 'text-palette-info-contrast'],
    ['label', 'bg-palette-info-opacity-light', 'text-palette-info-main'],
    ['outline', 'bg-transparent', 'text-palette-info-outline-text'],
    ['text', 'bg-transparent', 'text-palette-info-button-text'],
  ] as const)('matches the Button %s header treatment', (variant, background, text) => {
    render(<Table columns={columns} data={rows} variant={variant} tone="info" />);
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass(background, text);
    expect(screen.getByRole('region')).toHaveClass('rounded-md');
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveClass('first:rounded-tl-md', 'last:rounded-tr-md');
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
      expect(cell.style.boxShadow).toBe('6px 0 6px -6px var(--action-focus)');
    }
    expect(screen.getByRole('columnheader', { name: 'Status' })).not.toHaveClass('border-l');
    expect(screen.getByRole('cell', { name: 'Active' })).not.toHaveClass('border-l');

    rerender(
      <Table columns={columns} data={rows} variant="label" stickyFirstColumn showColumnBorders breakpoint="mobile" />,
    );
    expect(screen.getByRole('columnheader', { name: 'Name' }).style.boxShadow).toBe('');
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
      expect(cell.style.boxShadow).toBe('-6px 0 6px -6px var(--action-focus)');
      expect(cell).not.toHaveClass('border-l');
    }
    rerender(
      <Table columns={columns} data={rows} variant="label" stickyLastColumn showColumnBorders breakpoint="mobile" />,
    );
    expect(screen.getByRole('columnheader', { name: 'Status' }).style.boxShadow).toBe('');
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
        expect(header.style.backgroundColor).toBe(`var(--table-cell-overlay, var(--palette-${tone}-surface))`);
        expect(header.style.backgroundImage).toBe('');
      }
      const stripedCell = screen.getByRole('cell', { name: 'Grace Hopper' });
      expect(stripedCell.style.backgroundColor).toBe('var(--table-cell-overlay, var(--action-hover-surface))');
      expect(stripedCell.style.backgroundImage).toBe('');
      expect(stripedCell).toHaveClass('group-hover:[--table-cell-overlay:var(--action-hover-surface)]');
    },
  );

  test('supports semibold text on any column', () => {
    render(<Table columns={[{ ...columns[0], fontWeight: 'semiBold' }, columns[1]]} data={rows} />);

    expect(screen.getByRole('cell', { name: 'Ada Lovelace' })).toHaveClass('font-semibold');
  });

  test('conditionally renders column borders', () => {
    render(<Table columns={columns} data={rows} variant="label" showColumnBorders />);

    expect(screen.getByRole('columnheader', { name: 'Status' })).toHaveClass('border-l', 'border-table-divider');
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
