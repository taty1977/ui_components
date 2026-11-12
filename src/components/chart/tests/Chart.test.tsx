import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { paletteTones } from '../../../themes/paletteTones';
import Chart from '../Chart';

const captureChart = vi.hoisted(() => vi.fn());

// Mock recharts ResponsiveContainer so it renders children in JSDOM where dimensions are 0
vi.mock('recharts', async () => {
  const original = await vi.importActual<typeof import('recharts')>('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => {
      captureChart(children);
      return (
        <div data-testid="responsive-container" style={{ width: 500, height: 300 }}>
          {React.isValidElement<{ width?: number; height?: number }>(children)
            ? React.cloneElement(children, { width: 500, height: 300 })
            : children}
        </div>
      );
    },
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
  const labelObservers: ((entries: { contentRect: { width: number; height: number } }[]) => void)[] = [];

  beforeEach(() => {
    labelObservers.length = 0;
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: (entries: { contentRect: { width: number; height: number } }[]) => void) {
          labelObservers.push(callback);
        }
        observe() {}
        disconnect() {}
      },
    );
  });

  afterEach(() => vi.unstubAllGlobals());

  test('sizes SVG label boxes to their text and preserves alignment when text resizes', () => {
    vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(36);
    vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(20);
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(new DOMRect(0, 0, 28.8, 16));
    const { container } = render(<Chart data={sampleData} series={sampleSeries} isAnimationActive={false} />);
    const label = Array.from(container.querySelectorAll('foreignObject > div')).find(
      (element) => element.textContent === 'Jan',
    );
    const box = label?.parentElement;
    expect(box).toHaveAttribute('width', '36');
    expect(box).toHaveAttribute('height', '20');
    expect(label).not.toHaveStyle({ transform: 'translateX(-50%)' });
    const center = Number(box?.getAttribute('x')) + 36 / 2;

    act(() => labelObservers.forEach((resize) => resize([{ contentRect: { width: 60.25, height: 20 } }])));
    expect(box).toHaveAttribute('width', '63');
    expect(box).toHaveAttribute('height', '22');
    expect(label).toHaveClass('p-px');
    expect(Number(box?.getAttribute('x')) + 63 / 2).toBe(center);
  });

  test.each(['line', 'bar', 'area', 'pie'] as const)(
    'can disable %s series and tooltip animations while preserving the animated default',
    (type) => {
      const { rerender } = render(
        <Chart data={sampleData} series={sampleSeries} type={type} isAnimationActive={false} />,
      );
      const animationValues = () => {
        const chart = captureChart.mock.lastCall?.[0];
        if (!React.isValidElement<{ children: React.ReactNode }>(chart)) {
          throw new Error('Expected a chart element');
        }
        return React.Children.toArray(chart.props.children)
          .filter(
            (child): child is React.ReactElement<{ isAnimationActive: boolean }> =>
              React.isValidElement<{ isAnimationActive?: boolean }>(child) &&
              child.props.isAnimationActive !== undefined,
          )
          .map((child) => child.props.isAnimationActive);
      };
      expect(animationValues()).toEqual(type === 'pie' ? [false, false] : [false, false, false]);
      rerender(<Chart data={sampleData} series={sampleSeries} type={type} />);
      expect(animationValues()).toEqual(type === 'pie' ? [true, true] : [true, true, true]);
    },
  );

  test.each(paletteTones)('supports the %s tone', (tone) => {
    const { container } = render(<Chart data={sampleData} series={sampleSeries} tone={tone} />);
    expect(screen.getByRole('region')).toHaveClass('border-border-subtle', 'bg-background-surface');
    expect(screen.getByRole('region')).toHaveAttribute('data-tone', tone);
    expect(screen.getByRole('region')).not.toHaveAttribute('data-variant');
    expect(container.querySelector(`[stroke="var(--palette-${tone}-graphic)"]`)).toBeInTheDocument();
  });

  test('uses tone for the series palette while preserving custom palette and per-series overrides', () => {
    const { container, rerender } = render(<Chart data={sampleData} series={sampleSeries} tone="success" />);
    expect(container.querySelector('[stroke="var(--palette-success-graphic)"]')).toBeInTheDocument();
    const chart = captureChart.mock.lastCall?.[0];
    if (!React.isValidElement<{ children: React.ReactNode }>(chart)) {
      throw new Error('Expected a chart element');
    }
    const tooltip = React.Children.toArray(chart.props.children).find(
      (child): child is React.ReactElement<{ labelStyle?: { color?: string } }> =>
        React.isValidElement<{ labelStyle?: { color?: string } }>(child) && 'labelStyle' in child.props,
    );
    expect(tooltip?.props.labelStyle?.color).toBe('var(--palette-success-text)');
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
    expect(container.querySelector('[stroke="var(--palette-success-graphic)"]')).not.toBeInTheDocument();
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
    render(
      <Chart data={sampleData} series={[{ dataKey: 'sales', name: 'Sales' }]} type="pie" isAnimationActive={false} />,
    );

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    const chart = captureChart.mock.lastCall?.[0];
    if (!React.isValidElement<{ children: React.ReactNode }>(chart)) {
      throw new Error('Expected a chart element');
    }
    const pie = React.Children.toArray(chart.props.children).find(
      (child): child is React.ReactElement<{ label?: unknown }> =>
        React.isValidElement<{ label?: unknown }>(child) && 'label' in child.props,
    );
    expect(pie?.props.label).toBeTypeOf('function');
    const pieLabels = document.querySelectorAll('foreignObject > div');
    expect(pieLabels.length).toBeGreaterThan(0);
    for (const label of pieLabels) {
      expect(label).toHaveClass('text-text-primary', 'bg-background-surface', 'font-sans', 'text-13', 'leading-20');
    }
  });

  test.each(['line', 'bar', 'area'] as const)('renders %s axis and legend text on opaque theme surfaces', (type) => {
    const { container } = render(
      <Chart data={sampleData} series={sampleSeries} type={type} isAnimationActive={false} />,
    );
    const labels = container.querySelectorAll('foreignObject > div');
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label).toHaveClass(
        'text-text-primary', 'bg-background-surface', 'font-sans', 'text-13', 'leading-20',
        'p-px', 'w-max', 'whitespace-nowrap',
      );
      expect(label).not.toHaveAttribute('style');
    }
    const legendLabels = container.querySelectorAll('.recharts-legend-item-text > span');
    expect(legendLabels).toHaveLength(sampleSeries.length);
    for (const label of legendLabels) {
      expect(label).toHaveStyle({ color: 'var(--text-primary)', backgroundColor: 'var(--background-surface)' });
    }
    expect(container.querySelector('foreignObject')).toHaveTextContent('Jan');
    expect(screen.getByRole('table', { name: 'Chart data' })).toBeInTheDocument();
  });

  test('accepts custom color props to override theme palette', () => {
    const { container } = render(
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
    const labels = container.querySelectorAll('foreignObject > div');
    expect(labels.length).toBeGreaterThan(0);
    for (const label of labels) {
      expect(label).toHaveClass('text-text-primary', 'bg-background-surface');
      expect(label).toHaveStyle({ color: '#333333' });
      expect(label.getAttribute('style')).toBe('color: rgb(51, 51, 51);');
    }
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
