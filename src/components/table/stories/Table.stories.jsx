import React from 'react';
import { fn } from 'storybook/test';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { paletteTones } from '../../../themes/paletteTones';
import Table from '../Table';

// Shared fixture data keeps every story deterministic and lightweight.
const rows = [
  { id: 1, name: 'Ada Lovelace', role: 'Principal Engineer', team: 'Platform', status: 'Active' },
  { id: 2, name: 'Grace Hopper', role: 'Engineering Manager', team: 'Applications', status: 'Pending' },
  { id: 3, name: 'Katherine Johnson', role: 'Data Scientist', team: 'Insights', status: 'Active' },
  { id: 4, name: 'Evelyn Boyd Granville', role: 'Staff Engineer', team: 'Platform', status: 'Inactive' },
];

const statusStyles = {
  Active: 'bg-palette-success-opacity-light text-palette-success-main',
  Inactive: 'bg-palette-secondary-opacity-light text-palette-secondary-main',
  Pending: 'bg-palette-warning-opacity-light text-palette-warning-main',
};
const appearances = ['label', 'outline', 'text'];
const tones = paletteTones;
const Frame = ({ children }) => <div className="grid w-full min-w-0 gap-6">{children}</div>;

const Status = ({ value }) => (
  <span className={`inline-flex rounded-full px-2 py-1 text-12 font-semibold ${statusStyles[value]}`}>{value}</span>
);

// Headered and headerless column definitions cover the two table modes.
const headerColumns = [
  { key: 'name', header: 'Name', fontWeight: 'semiBold' },
  { key: 'role', header: 'Role' },
  { key: 'team', header: 'Team' },
  { key: 'status', header: 'Status', render: (row) => <Status value={row.status} /> },
];

const headerlessColumns = headerColumns.map(({ header: _header, ...column }) => column);

const renderTable = (args, columns = headerColumns, data = rows) => (
  <Table {...args} columns={columns} data={data} getRowKey={(row) => row.id} />
);

// Storybook metadata and controls.
const meta = {
  title: 'Data Display/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A responsive, Material UI-inspired data table with label (tinted), outline, and text header variants. Outline is the initial variant. Six tones style the table headers. Stories hide the outer card border, background, and shadow to showcase the table itself. Legacy outlined, filled, and standard values remain supported.',
      },
    },
  },
  args: {
    className: 'border-0 bg-transparent shadow-none',
    variant: 'outline',
    tone: 'primary',
    size: 'normal',
    breakpoint: 'desktop',
    stickyFirstColumn: false,
    stickyLastColumn: false,
    stickyHeader: false,
    showColumnBorders: false,
    striped: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: appearances,
      description: 'Tinted label, outline (initial variant), or text.',
      table: { category: 'Appearance' },
    },
    tone: { control: 'select', options: tones, table: { category: 'Appearance' } },
    size: { control: 'select', options: ['small', 'normal'], table: { category: 'Layout' } },
    breakpoint: {
      control: 'select',
      options: ['mobile', 'tablet', 'desktop'],
      table: { category: 'Responsive' },
    },
    stickyFirstColumn: { control: 'boolean', table: { category: 'Layout' } },
    stickyLastColumn: { control: 'boolean', table: { category: 'Layout' } },
    stickyHeader: {
      control: 'boolean',
      description: 'Keeps headers visible in a 320px-high scrolling region with a soft bottom shadow.',
      table: { category: 'Layout' },
    },
    showColumnBorders: { control: 'boolean', table: { category: 'Appearance' } },
    striped: { control: 'boolean', table: { category: 'Appearance' } },
    className: { control: 'text', table: { category: 'Layout' } },
    columns: { table: { disable: true } },
    data: { table: { disable: true } },
    getRowKey: { table: { disable: true } },
    pagination: { table: { disable: true } },
    emptyMessage: { control: 'text', table: { category: 'Content' } },
  },
};

export default meta;

// Core appearance and tone matrices.
export const Playground = {
  render: (args) => renderTable(args),
};

export const Variants = {
  render: (args) => (
    <Frame>
      {appearances.map((variant) => (
        <Table
          key={variant}
          {...args}
          variant={variant}
          columns={headerColumns}
          data={rows}
          getRowKey={(row) => row.id}
        />
      ))}
    </Frame>
  ),
};

export const Tones = {
  args: { variant: 'label' },
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <Table key={tone} {...args} tone={tone} columns={headerColumns} data={rows} getRowKey={(row) => row.id} />
      ))}
    </Frame>
  ),
};

export const Sizes = {
  render: (args) => (
    <Frame>
      {['small', 'normal'].map((size) => (
        <Table key={size} {...args} size={size} columns={headerColumns} data={rows} getRowKey={(row) => row.id} />
      ))}
    </Frame>
  ),
};

export const States = {
  render: (args) => (
    <Frame>
      <section>
        <h2 className="mb-2 text-18 font-semibold text-text-primary">Striped rows</h2>
        {renderTable({ ...args, striped: true })}
      </section>
      <section>
        <h2 className="mb-2 text-18 font-semibold text-text-primary">Column borders</h2>
        {renderTable({ ...args, showColumnBorders: true })}
      </section>
      <section>
        <h2 className="mb-2 text-18 font-semibold text-text-primary">Empty</h2>
        {renderTable(args, headerColumns, [])}
      </section>
    </Frame>
  ),
  args: { emptyMessage: 'No team members found.' },
};

export const Headerless = {
  render: (args) => renderTable(args, headerlessColumns),
  name: 'Without column headers',
  args: { variant: 'label' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['label'],
      description: 'Headerless tables always use label styling for the first column.',
      table: { category: 'Appearance' },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'The first column becomes a semibold row header and receives the selected variant and tone.',
      },
    },
  },
};

export const StickyHeader = {
  render: (args) =>
    renderTable(
      args,
      headerColumns,
      Array.from({ length: 5 }, (_, index) => rows.map((row) => ({ ...row, id: index * rows.length + row.id }))).flat(),
    ),
  args: { stickyHeader: true, stickyFirstColumn: true, stickyLastColumn: true },
};

// Interaction and empty states.
export const Paginated = {
  render: (args) => renderTable(args),
  args: {
    pagination: {
      page: 2,
      pageSize: 4,
      total: 12,
      pageStatus: <>Page 2 of 3</>,
      previousIcon: <ChevronLeftIcon width="1rem" height="1rem" aria-hidden="true" />,
      nextIcon: <ChevronRightIcon width="1rem" height="1rem" aria-hidden="true" />,
      onPageChange: fn(),
    },
  },
};
