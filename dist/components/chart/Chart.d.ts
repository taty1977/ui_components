import React from 'react';
import { type PaletteTone } from '../../themes/paletteTones';
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
export declare const Chart: React.FC<ChartProps>;
export default Chart;
