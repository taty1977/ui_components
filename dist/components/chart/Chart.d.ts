import React from 'react';
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
export type ChartVariant = 'primary' | 'secondary';
export interface ChartProps {
    /** Chart type to display */
    type?: 'line' | 'bar' | 'area' | 'pie';
    /** Theme color treatment for the default series palette */
    variant?: ChartVariant;
    /** Data points for the chart */
    data: ChartDataItem[];
    /** Series configuration for lines/bars/areas or pie dataKey */
    series: ChartSeries[];
    /** Custom color palette for series/slices (overrides theme palette) */
    colors?: string[];
    /** Custom stroke color for grid lines (overrides theme border color) */
    gridColor?: string;
    /** Custom text color for axes and legend (overrides theme mutedText color) */
    textColor?: string;
    /** Custom background color for tooltips (overrides theme surface color) */
    tooltipBgColor?: string;
    /** Custom border color for tooltips (overrides theme border color) */
    tooltipBorderColor?: string;
    /** Key for the X-axis (category axis) */
    xAxisKey?: string;
    /** Title shown above the chart */
    title?: string;
    /** Short description shown below the title */
    description?: string;
    /** Accessible ARIA label for screen readers */
    ariaLabel?: string;
    /** Height of the chart container (e.g., 300 or "100%") */
    height?: number | string;
    /** Stroke width for lines and area borders */
    strokeWidth?: number;
    /** Dot config or boolean for line chart data points */
    dot?: boolean | object;
    /** Active dot config or boolean for hovered line data points */
    activeDot?: boolean | object;
    /** Fill opacity for area chart areas */
    fillOpacity?: number;
    /** Border radius for bar chart bars */
    barRadius?: [number, number, number, number] | number;
    /** Outer radius for pie chart */
    outerRadius?: number | string;
    /** Inner radius for pie chart (e.g. for donut charts) */
    innerRadius?: number | string;
    /** Show background grid lines */
    showGrid?: boolean;
    /** Show hover tooltip */
    showTooltip?: boolean;
    /** Show series legend */
    showLegend?: boolean;
    /** Optional custom CSS class name */
    className?: string;
}
export declare const Chart: React.FC<ChartProps>;
export default Chart;
