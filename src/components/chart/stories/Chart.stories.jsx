import React from 'react';
import { paletteTones } from '../../../themes/paletteTones';
import Chart from '../Chart';

const tones = paletteTones;
const Frame = ({ children }) => <div className="grid w-full min-w-0 gap-6">{children}</div>;
const renderChart = (args) => (
  <Frame>
    <Chart {...args} />
  </Frame>
);

const sampleData = [
  { name: 'Jan', Sales: 4000, Revenue: 2400, Profit: 1600 },
  { name: 'Feb', Sales: 3000, Revenue: 1398, Profit: 1200 },
  { name: 'Mar', Sales: 2000, Revenue: 9800, Profit: 3400 },
  { name: 'Apr', Sales: 2780, Revenue: 3908, Profit: 2000 },
  { name: 'May', Sales: 1890, Revenue: 4800, Profit: 2180 },
  { name: 'Jun', Sales: 2390, Revenue: 3800, Profit: 2500 },
  { name: 'Jul', Sales: 3490, Revenue: 4300, Profit: 2100 },
];

const sampleSeries = [
  { dataKey: 'Sales', name: 'Sales ($)' },
  { dataKey: 'Revenue', name: 'Revenue ($)' },
  { dataKey: 'Profit', name: 'Profit ($)' },
];

const pieData = [
  { name: 'Direct', value: 400 },
  { name: 'Organic Search', value: 300 },
  { name: 'Paid Ads', value: 300 },
  { name: 'Referral', value: 200 },
];

const meta = {
  title: 'Data Display/Chart',
  component: Chart,
  tags: ['autodocs'],
  render: renderChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A responsive chart with a neutral surface and six tones. Tone sets the leading series color; custom palettes and series colors take precedence. Supports line, bar, area, and pie charts.',
      },
    },
  },
  args: {
    className: 'border-0 bg-transparent',
    title: 'Financial Overview',
    description: 'Monthly breakdown of sales, revenue, and profit',
    tone: 'primary',
    data: sampleData,
    series: sampleSeries,
    xAxisKey: 'name',
    height: 320,
    showGrid: true,
    showTooltip: true,
    showLegend: true,
    isAnimationActive: false,
  },
  argTypes: {
    isAnimationActive: {
      control: 'boolean',
      description: 'Animate chart series and tooltips. Disabled in stories for stable visual snapshots.',
      table: { category: 'Display', defaultValue: { summary: true } },
    },
    type: {
      control: { type: 'select' },
      options: ['line', 'bar', 'area', 'pie'],
      description: 'The visual type of chart to display.',
      table: { category: 'Chart Type' },
    },
    tone: {
      control: 'select',
      options: tones,
      description: 'Sets the leading color of the default series palette.',
      table: { category: 'Appearance' },
    },
    title: {
      control: 'text',
      description: 'Title header displayed above the chart.',
      table: { category: 'Content' },
    },
    description: {
      control: 'text',
      description: 'Subtitle/description text displayed below the title.',
      table: { category: 'Content' },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible ARIA label for screen readers.',
      table: { category: 'Accessibility' },
    },
    height: {
      control: 'number',
      description: 'Height of the chart container in pixels.',
      table: { category: 'Layout' },
    },
    className: {
      control: 'text',
      description: 'Optional custom CSS class name applied to the container.',
      table: { category: 'Layout' },
    },
    showGrid: {
      control: 'boolean',
      description: 'Show grid lines on the chart background.',
      table: { category: 'Display' },
    },
    showTooltip: {
      control: 'boolean',
      description: 'Show interactive hover tooltip.',
      table: { category: 'Display' },
    },
    showLegend: {
      control: 'boolean',
      description: 'Show series legend.',
      table: { category: 'Display' },
    },
    colors: {
      control: 'object',
      description: 'Custom series and pie-slice color palette (overrides the tone palette).',
      table: { category: 'Colors' },
    },
    gridColor: {
      control: 'color',
      description: 'Custom stroke color for grid lines (overrides theme border).',
      table: { category: 'Colors' },
    },
    textColor: {
      control: 'color',
      description: 'Custom text color for axes and legend (overrides theme muted text).',
      table: { category: 'Colors' },
    },
    tooltipBgColor: {
      control: 'color',
      description: 'Custom background color for tooltips (overrides theme surface).',
      table: { category: 'Colors' },
    },
    tooltipBorderColor: {
      control: 'color',
      description: 'Custom border color for tooltips (overrides theme border).',
      table: { category: 'Colors' },
    },
    strokeWidth: {
      control: 'number',
      description: 'Stroke width for lines and area borders.',
      table: { category: 'Styles' },
    },
    dot: {
      control: 'boolean',
      description: 'Show or configure data point dots on line charts.',
      table: { category: 'Styles' },
    },
    activeDot: {
      control: 'boolean',
      description: 'Show or configure active hover dots on line charts.',
      table: { category: 'Styles' },
    },
    fillOpacity: {
      control: { type: 'number', min: 0, max: 1, step: 0.05 },
      description: 'Fill opacity for area charts, from 0 (transparent) to 1 (opaque).',
      table: { category: 'Styles' },
    },
    barRadius: {
      description: 'Bar corner radius as a number or [top-left, top-right, bottom-right, bottom-left].',
      table: { category: 'Styles' },
    },
    outerRadius: {
      description: 'Pie outer radius in pixels or as a percentage (for example, "80%").',
      table: { category: 'Styles' },
    },
    innerRadius: {
      description: 'Pie inner radius in pixels or as a percentage; use a nonzero value for a donut chart.',
      table: { category: 'Styles' },
    },
    data: { table: { category: 'Data' } },
    series: { table: { category: 'Data' } },
    xAxisKey: { table: { category: 'Data' } },
  },
};

export default meta;

export const Playground = {};

export const Types = {
  render: (args) => (
    <Frame>
      {['line', 'bar', 'area', 'pie'].map((type) => (
        <Chart
          {...args}
          key={type}
          type={type}
          title={`${args.title} - ${type}`}
          data={type === 'pie' ? pieData : args.data}
          series={type === 'pie' ? [{ dataKey: 'value', name: 'Visitors' }] : args.series}
        />
      ))}
      <Chart
        {...args}
        type="pie"
        title={`${args.title} - donut`}
        data={pieData}
        series={[{ dataKey: 'value', name: 'Visitors' }]}
        xAxisKey="name"
        innerRadius={50}
      />
    </Frame>
  ),
};

export const Tones = {
  render: (args) => (
    <Frame>
      {tones.map((tone) => (
        <section key={tone} className="min-w-0">
          <h2 className="mb-2 text-18 font-semibold text-text-primary">{tone}</h2>
          <Chart {...args} tone={tone} title={`${args.title} - ${tone}`} />
        </section>
      ))}
    </Frame>
  ),
};

export const States = {
  render: (args) => (
    <Frame>
      <Chart {...args} title={`${args.title} - Single series`} series={args.series.slice(0, 1)} />
      <Chart {...args} title={`${args.title} - Without grid`} showGrid={false} />
      <Chart {...args} title={`${args.title} - Without legend`} showLegend={false} />
      <Chart {...args} title={`${args.title} - Without tooltip`} showTooltip={false} />
    </Frame>
  ),
};
