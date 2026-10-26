import React, { useCallback, useId, useMemo } from 'react';
import { cn } from '../../utils/cn';
import { a11yProps } from '../../utils/a11yProps';
import { paletteTones, toneVar, type PaletteTone } from '../../themes/paletteTones';
import Heading from '../heading/Heading';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

export interface ChartSeries {
  dataKey: string;
  name?: string;
  color?: string;
  strokeWidth?: number;
  dot?: boolean | object;
  activeDot?: boolean | object;
  fillOpacity?: number;
  radius?: [number, number, number, number] | number;
}

export interface ChartDataItem {
  [key: string]: unknown;
}

export interface ChartProps {
  type?: 'line' | 'bar' | 'area' | 'pie';
  /** Leading default series color */
  tone?: PaletteTone;
  data: ChartDataItem[];
  /** Series configuration for lines/bars/areas or pie dataKey */
  series: ChartSeries[];
  /** Custom color palette for series/slices (overrides theme palette) */
  colors?: string[];
  gridColor?: string;
  textColor?: string;
  tooltipBgColor?: string;
  tooltipBorderColor?: string;
  /** Key for the X-axis (category axis) */
  xAxisKey?: string;
  title?: string;
  description?: string;
  ariaLabel?: string;
  /** Height of the chart container (e.g., 300 or "100%") */
  height?: number | string;
  strokeWidth?: number;
  /** Dot config or boolean for line chart data points */
  dot?: boolean | object;
  /** Active dot config or boolean for hovered line data points */
  activeDot?: boolean | object;
  fillOpacity?: number;
  barRadius?: [number, number, number, number] | number;
  outerRadius?: number | string;
  /** Inner radius for pie chart (e.g. for donut charts) */
  innerRadius?: number | string;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  isAnimationActive?: boolean;
  className?: string;
}

const getTonePalette = (tone: PaletteTone) =>
  [tone, ...paletteTones.filter((entry) => entry !== tone)].map((entry) => toneVar(entry));

export const Chart: React.FC<ChartProps> = ({
  type = 'line',
  tone = 'primary',
  data,
  series,
  colors,
  gridColor: customGridColor,
  textColor: customTextColor,
  tooltipBgColor: customTooltipBgColor,
  tooltipBorderColor: customTooltipBorderColor,
  xAxisKey = 'name',
  title,
  description,
  ariaLabel,
  height = 300,
  strokeWidth = 2,
  dot = { r: 4 },
  activeDot = { r: 6 },
  fillOpacity = 0.2,
  barRadius = [4, 4, 0, 0],
  outerRadius = 80,
  innerRadius,
  showGrid = true,
  showTooltip = true,
  showLegend = true,
  isAnimationActive = true,
  className,
}) => {
  const chartId = useId();
  const titleId = `${chartId}-title`;
  const descriptionId = `${chartId}-desc`;
  const palette = useMemo(() => {
    if (colors && colors.length > 0) {
      return colors;
    }
    return getTonePalette(tone);
  }, [colors, tone]);

  const getColor = useCallback(
    (seriesItem: ChartSeries, index: number) => {
      return seriesItem.color || palette[index % palette.length];
    },
    [palette],
  );

  const { gridColor, textColor, customTooltipStyle, tooltipItemStyle, tooltipLabelStyle, axisTickStyle, legendStyle } =
    useMemo(() => {
      const grid = customGridColor || 'var(--border-subtle)';
      const text = customTextColor || 'var(--text-primary)';
      const bg = customTooltipBgColor || 'var(--background-surface)';
      const border = customTooltipBorderColor || 'var(--border-subtle)';
      const fontFamily = 'var(--font-family)';
      const fontSize = 'var(--font-size-13)';

      return {
        gridColor: grid,
        textColor: text,
        customTooltipStyle: {
          backgroundColor: bg,
          borderColor: border,
          borderRadius: 'var(--radius-md)',
          color: text,
          fontSize,
          fontFamily,
        },
        tooltipItemStyle: {
          color: text,
          fontSize,
          fontFamily,
        },
        tooltipLabelStyle: {
          color: toneVar(tone),
          fontSize,
          fontFamily,
          fontWeight: 600,
        },
        axisTickStyle: {
          fill: text,
          fontSize,
          fontFamily,
        },
        legendStyle: {
          color: text,
          fontSize,
          fontFamily,
        },
      };
    }, [customGridColor, customTextColor, customTooltipBgColor, customTooltipBorderColor, tone]);

  const renderLegendFormatter = useCallback(
    (value: string) => <span style={{ color: textColor }}>{value}</span>,
    [textColor],
  );

  const renderCartesianElements = () => [
    showGrid ? <CartesianGrid key="grid" strokeDasharray="3 3" stroke={gridColor} /> : null,
    <XAxis key="xaxis" dataKey={xAxisKey} stroke={textColor} tick={axisTickStyle} />,
    <YAxis key="yaxis" stroke={textColor} tick={axisTickStyle} />,
    showTooltip ? (
      <Tooltip
        isAnimationActive={isAnimationActive}
        key="tooltip"
        contentStyle={customTooltipStyle}
        itemStyle={tooltipItemStyle}
        labelStyle={tooltipLabelStyle}
      />
    ) : null,
    showLegend ? <Legend key="legend" wrapperStyle={legendStyle} formatter={renderLegendFormatter} /> : null,
  ];

  const renderChartContent = () => {
    switch (type) {
      case 'pie': {
        const primarySeries = series[0];
        const dataKey = primarySeries?.dataKey || 'value';
        const nameKey = xAxisKey || 'name';

        const pieData = data.map((item, index) => ({
          ...item,
          fill: item.fill || item.color || series[index]?.color || palette[index % palette.length],
        }));

        return (
          <PieChart>
            {showTooltip && (
              <Tooltip
                isAnimationActive={isAnimationActive}
                contentStyle={customTooltipStyle}
                itemStyle={tooltipItemStyle}
                labelStyle={tooltipLabelStyle}
              />
            )}
            {showLegend && <Legend wrapperStyle={legendStyle} formatter={renderLegendFormatter} />}
            <Pie
              isAnimationActive={isAnimationActive}
              data={pieData}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              label
            />
          </PieChart>
        );
      }

      case 'bar':
        return (
          <BarChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => (
              <Bar
                isAnimationActive={isAnimationActive}
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                fill={getColor(s, i)}
                radius={s.radius ?? barRadius}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => {
              const color = getColor(s, i);
              return (
                <Area
                  isAnimationActive={isAnimationActive}
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name || s.dataKey}
                  stroke={color}
                  strokeWidth={s.strokeWidth ?? strokeWidth}
                  fill={color}
                  fillOpacity={s.fillOpacity ?? fillOpacity}
                />
              );
            })}
          </AreaChart>
        );

      case 'line':
      default:
        return (
          <LineChart data={data}>
            {renderCartesianElements()}
            {series.map((s, i) => (
              <Line
                isAnimationActive={isAnimationActive}
                key={s.dataKey}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name || s.dataKey}
                stroke={getColor(s, i)}
                strokeWidth={s.strokeWidth ?? strokeWidth}
                dot={s.dot ?? dot}
                activeDot={s.activeDot ?? activeDot}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div
      className={cn(
        'w-full rounded-md border border-border-subtle bg-background-surface p-6 font-sans text-text-primary',
        className,
      )}
      data-tone={tone}
      role="region"
      aria-label={title ? undefined : ariaLabel || 'Chart'}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      {(title || description) && (
        <div className="mb-4">
          {title && (
            <Heading id={titleId} level="h3" weight="semiBold">
              {title}
            </Heading>
          )}
          {description && (
            <p className="mt-1 text-13 text-text-secondary" id={descriptionId}>
              {description}
            </p>
          )}
        </div>
      )}
      <div className="sr-only">
        <table aria-label={title ? `${title} data` : ariaLabel || 'Chart data'}>
          <thead>
            <tr>
              <th scope="col">{xAxisKey}</th>
              {series.map((s) => (
                <th key={s.dataKey} scope="col">
                  {s.name || s.dataKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{String(item[xAxisKey] ?? '')}</td>
                {series.map((s) => (
                  <td key={s.dataKey}>{String(item[s.dataKey] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div
        className="min-h-48 w-full rounded-md bg-background-surface text-text-primary"
        style={{ height }}
        {...a11yProps(false, `${title || ariaLabel || 'Chart'} visualization`)}
      >
        <ResponsiveContainer width="100%" height="100%">
          {renderChartContent()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
