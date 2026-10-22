import React from 'react';
import { render, screen } from '@testing-library/react';
import Chart from '../Chart';

// Mock recharts ResponsiveContainer so it renders children in JSDOM where dimensions are 0
vi.mock('recharts', async () => {
  const original = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container" style={{ width: 500, height: 300 }}>
        {React.isValidElement<{ width?: number; height?: number }>(children)
          ? React.cloneElement(children, { width: 500, height: 300 })
          : children}
      </div>
    ),
  };
});

const sampleData = [
  { name: 'Jan', sales: 4000, profit: 2400 },
  { name: 'Feb', sales: 3000, profit: 1398 },
  { name: 'Mar', sales: 2000, profit: 9800 },
];

const sampleSeries = [
  { dataKey: 'sales', name: 'Sales' },
  { dataKey: 'profit', name: 'Profit' },
];

describe('Chart', () => {
  test.each(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const)(
    'supports the %s tone',
    (tone) => {
      const { container } = render(<Chart data={sampleData} series={sampleSeries} tone={tone} />);
      expect(screen.getByRole('region')).toHaveClass('border-border-subtle', 'bg-background-surface');
      expect(screen.getByRole('region')).toHaveAttribute('data-tone', tone);
      expect(screen.getByRole('region')).not.toHaveAttribute('data-variant');
      expect(container.querySelector(`[stroke="var(--palette-${tone}-main)"]`)).toBeInTheDocument();
    },
  );

  test('uses tone for the series palette while preserving custom palette and per-series overrides', () => {
    const { container, rerender } = render(<Chart data={sampleData} series={sampleSeries} tone="success" />);
    expect(container.querySelector('[stroke="var(--palette-success-main)"]')).toBeInTheDocument();
    rerender(
      <Chart
        data={sampleData}
        series={[{ ...sampleSeries[0], color: '#123456' }, sampleSeries[1]]}
        tone="success"
        colors={['#ff0000', '#00ff00']}
      />,
    );
    expect(container.querySelector('[stroke="#123456"]')).toBeInTheDocument();
    expect(container.querySelector('[stroke="#00ff00"]')).toBeInTheDocument();
    expect(container.querySelector('[stroke="var(--palette-success-main)"]')).not.toBeInTheDocument();
  });

  test('renders title and description when provided', () => {
    render(
      <Chart
        data={sampleData}
        series={sampleSeries}
        title="Monthly Performance"
        description="Sales and profit trends for Q1"
      />,
    );

    expect(screen.getByText('Monthly Performance')).toBeInTheDocument();
    expect(screen.getByText('Sales and profit trends for Q1')).toBeInTheDocument();
  });

  test('renders responsive container and chart wrapper', () => {
    render(<Chart data={sampleData} series={sampleSeries} type="line" />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('renders bar chart type', () => {
    render(<Chart data={sampleData} series={sampleSeries} type="bar" />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('renders area chart type', () => {
    render(<Chart data={sampleData} series={sampleSeries} type="area" />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('renders pie chart type', () => {
    render(<Chart data={sampleData} series={[{ dataKey: 'sales', name: 'Sales' }]} type="pie" />);

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('accepts custom color props to override theme palette', () => {
    render(
      <Chart
        colors={['#ff0000', '#00ff00']}
        gridColor="#cccccc"
        textColor="#333333"
        tooltipBgColor="#ffffff"
        tooltipBorderColor="#aaaaaa"
        data={sampleData}
        series={sampleSeries}
        type="bar"
      />,
    );

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  test('applies accessible ARIA region roles and labelling', () => {
    render(<Chart data={sampleData} series={sampleSeries} title="Sales Chart" description="Quarterly sales data" />);

    const region = screen.getByRole('region', { name: 'Sales Chart' });
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-describedby');
  });

  test('provides an accessible data table for screen readers', () => {
    render(<Chart data={sampleData} series={sampleSeries} title="Accessible Chart" />);

    const table = screen.getByRole('table', { name: 'Accessible Chart data' });
    expect(table).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Sales' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Profit' })).toBeInTheDocument();
  });

  test('labels the visual chart separately from its data table', () => {
    render(<Chart data={sampleData} series={sampleSeries} title="Accessible Chart" />);

    expect(screen.getByRole('img', { name: 'Accessible Chart visualization' })).toBeInTheDocument();
  });
});
