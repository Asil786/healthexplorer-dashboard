
import React, { useState } from 'react';
import { Dataset } from './MLPredictionSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  Line
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface DataVisualizationProps {
  dataset: Dataset;
}

export const DataVisualization = ({ dataset }: DataVisualizationProps) => {
  const [xAxis, setXAxis] = useState<string>(dataset.columns[0] || '');
  const [yAxis, setYAxis] = useState<string>(dataset.targetColumn || dataset.columns[1] || '');
  
  // Process data for visualizations
  const numericalColumns = dataset.columns.filter(col => {
    const firstValue = dataset.data[0]?.[col];
    return typeof firstValue === 'number';
  });
  
  // Calculate histogram data - Fixed the infinite recursion issue
  const getHistogramData = (columnName: string) => {
    if (!columnName) return [];
    
    const values = dataset.data.map(row => row[columnName]).filter(val => val !== undefined);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    const binCount = Math.min(10, Math.ceil(Math.sqrt(values.length)));
    const binWidth = range / binCount;
    
    const bins = Array(binCount).fill(0).map((_, i) => ({
      bin: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
      count: 0,
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
    }));
    
    values.forEach(value => {
      const binIndex = Math.min(
        binCount - 1, 
        Math.floor((value - min) / binWidth)
      );
      bins[binIndex].count++;
    });
    
    return bins;
  };
  
  // Scatter plot data
  const getScatterData = () => {
    if (!xAxis || !yAxis) return [];
    
    return dataset.data.map(row => ({
      x: row[xAxis],
      y: row[yAxis],
    })).filter(point => point.x !== undefined && point.y !== undefined);
  };
  
  // Line chart data (for trend analysis)
  const getLineChartData = () => {
    if (!xAxis || !yAxis) return [];
    
    // Sort by x-axis value for a proper line chart
    return [...dataset.data]
      .filter(row => row[xAxis] !== undefined && row[yAxis] !== undefined)
      .sort((a, b) => a[xAxis] - b[xAxis])
      .map(row => ({
        x: row[xAxis],
        y: row[yAxis],
      }));
  };
  
  // Get histogram data for the selected column - not calling the function recursively
  const histogramData = xAxis ? getHistogramData(xAxis) : [];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="histogram" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="histogram">Histogram</TabsTrigger>
              <TabsTrigger value="scatter">Scatter Plot</TabsTrigger>
              <TabsTrigger value="trend">Trend Analysis</TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">X-Axis</label>
                <Select value={xAxis} onValueChange={setXAxis}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select X-Axis" />
                  </SelectTrigger>
                  <SelectContent>
                    {numericalColumns.map(column => (
                      <SelectItem key={column} value={column}>
                        {column}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Y-Axis</label>
                <Select value={yAxis} onValueChange={setYAxis}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Y-Axis" />
                  </SelectTrigger>
                  <SelectContent>
                    {numericalColumns.map(column => (
                      <SelectItem key={column} value={column}>
                        {column}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <TabsContent value="histogram">
              <div className="h-80">
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa",
                      },
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={histogramData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="bin" 
                        angle={-45} 
                        textAnchor="end" 
                        height={60}
                      />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Bar 
                        dataKey="count" 
                        fill="var(--color-count)" 
                        name="Count" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Distribution of {xAxis}
              </p>
            </TabsContent>
            
            <TabsContent value="scatter">
              <div className="h-80">
                <ChartContainer
                  config={{
                    data: {
                      label: "Data Points",
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa",
                      },
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="x" 
                        name={xAxis} 
                        label={{ value: xAxis, position: 'bottom' }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="y" 
                        name={yAxis}
                        label={{ value: yAxis, angle: -90, position: 'left' }}
                      />
                      <ZAxis range={[50, 50]} />
                      <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name) => [value, name === 'x' ? xAxis : yAxis]}
                      />
                      <Scatter 
                        name="Data" 
                        data={getScatterData()} 
                        fill="var(--color-data)" 
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Relationship between {xAxis} and {yAxis}
              </p>
            </TabsContent>
            
            <TabsContent value="trend">
              <div className="h-80">
                <ChartContainer
                  config={{
                    value: {
                      label: yAxis,
                      theme: {
                        light: "#3b82f6",
                        dark: "#60a5fa",
                      },
                    }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getLineChartData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="x" 
                        name={xAxis}
                        label={{ value: xAxis, position: 'bottom' }}
                      />
                      <YAxis 
                        name={yAxis}
                        label={{ value: yAxis, angle: -90, position: 'left' }}
                      />
                      <Tooltip 
                        formatter={(value, name) => [value, name === 'y' ? yAxis : xAxis]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="y" 
                        name={yAxis}
                        stroke="var(--color-value)" 
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Trend of {yAxis} with respect to {xAxis}
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
