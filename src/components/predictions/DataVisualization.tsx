
import React, { useState, useMemo } from 'react';
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
  const [xAxis, setXAxis] = useState<string>(() => {
    // Initialize to the first column or empty if no columns
    return dataset.columns.length > 0 ? dataset.columns[0] : '';
  });
  
  const [yAxis, setYAxis] = useState<string>(() => {
    // Initialize to the target column or second column or first column if only one column
    return dataset.targetColumn || 
           (dataset.columns.length > 1 ? dataset.columns[1] : dataset.columns[0] || '');
  });
  
  // Process data for visualizations
  const numericalColumns = useMemo(() => {
    return dataset.columns.filter(col => {
      // Check if any values for this column are numbers
      return dataset.data.some(row => typeof row[col] === 'number');
    });
  }, [dataset.columns, dataset.data]);
  
  // Fix the histogram data calculation function
  const calculateHistogramData = (columnName: string, data: any[]) => {
    if (!columnName || !data || data.length === 0) return [];
    
    // Extract all numeric values for the column
    const values = data
      .map(row => row[columnName])
      .filter((val): val is number => typeof val === 'number' && !isNaN(val));
    
    if (values.length === 0) return [];
    
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min;
    
    // Handle edge case where all values are the same
    if (range === 0) {
      return [{ bin: min.toFixed(1), count: values.length, binStart: min, binEnd: min }];
    }
    
    const binCount = Math.min(10, Math.ceil(Math.sqrt(values.length)));
    const binWidth = range / binCount;
    
    // Create the bins
    const bins = Array(binCount).fill(0).map((_, i) => ({
      bin: `${(min + i * binWidth).toFixed(1)}-${(min + (i + 1) * binWidth).toFixed(1)}`,
      count: 0,
      binStart: min + i * binWidth,
      binEnd: min + (i + 1) * binWidth,
    }));
    
    // Count values in each bin
    values.forEach(value => {
      const binIndex = Math.min(binCount - 1, Math.floor((value - min) / binWidth));
      bins[binIndex].count++;
    });
    
    return bins;
  };
  
  // Use useMemo to calculate histogram data only when xAxis or dataset changes
  const histogramData = useMemo(() => {
    return calculateHistogramData(xAxis, dataset.data);
  }, [xAxis, dataset.data]);
  
  // Scatter plot data
  const scatterData = useMemo(() => {
    if (!xAxis || !yAxis) return [];
    
    return dataset.data
      .filter(row => 
        row[xAxis] !== undefined && 
        row[yAxis] !== undefined && 
        typeof row[xAxis] === 'number' && 
        typeof row[yAxis] === 'number'
      )
      .map(row => ({
        x: row[xAxis],
        y: row[yAxis],
      }));
  }, [xAxis, yAxis, dataset.data]);
  
  // Line chart data (for trend analysis)
  const lineChartData = useMemo(() => {
    if (!xAxis || !yAxis) return [];
    
    // Sort by x-axis value for a proper line chart
    return [...dataset.data]
      .filter(row => 
        row[xAxis] !== undefined && 
        row[yAxis] !== undefined && 
        typeof row[xAxis] === 'number' && 
        typeof row[yAxis] === 'number'
      )
      .sort((a, b) => a[xAxis] - b[xAxis])
      .map(row => ({
        x: row[xAxis],
        y: row[yAxis],
      }));
  }, [xAxis, yAxis, dataset.data]);
  
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
                {histogramData.length > 0 ? (
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
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No numerical data available for histogram</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Distribution of {xAxis}
              </p>
            </TabsContent>
            
            <TabsContent value="scatter">
              <div className="h-80">
                {scatterData.length > 0 ? (
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
                          data={scatterData} 
                          fill="var(--color-data)" 
                        />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No numerical data available for scatter plot</p>
                  </div>
                )}
              </div>
              <p className="text-sm text-center mt-2 text-muted-foreground">
                Relationship between {xAxis} and {yAxis}
              </p>
            </TabsContent>
            
            <TabsContent value="trend">
              <div className="h-80">
                {lineChartData.length > 0 ? (
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
                        data={lineChartData}
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
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">No numerical data available for trend analysis</p>
                  </div>
                )}
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
