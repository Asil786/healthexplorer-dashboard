
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

interface PerformanceGridProps {
  diagnosticMetrics: Array<{
    name: string;
    accuracy: number;
    precision: number;
    recall: number;
    specificity: number;
  }>;
  dataDistribution: Array<{
    category: string;
    count: number;
  }>;
  className?: string;
}

const PerformanceGrid = ({ diagnosticMetrics, dataDistribution, className }: PerformanceGridProps) => {
  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899', '#0ea5e9', '#14b8a6'];
  
  const radarData = diagnosticMetrics.map(metric => ({
    subject: metric.name,
    accuracy: metric.accuracy,
    precision: metric.precision,
    recall: metric.recall,
    specificity: metric.specificity,
  }));
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle>Diagnostic Performance</CardTitle>
        <CardDescription>Performance metrics across medical conditions</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="bar" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
            <TabsTrigger value="pie">Distribution</TabsTrigger>
            <TabsTrigger value="radar">Radar Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="space-y-4">
            <div className="rounded-md border p-4">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={diagnosticMetrics}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 1]} tickFormatter={formatPercent} />
                  <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(2)}%`]} />
                  <Legend />
                  <Bar dataKey="accuracy" name="Accuracy" fill="#3b82f6" />
                  <Bar dataKey="precision" name="Precision" fill="#10b981" />
                  <Bar dataKey="recall" name="Recall" fill="#f97316" />
                  <Bar dataKey="specificity" name="Specificity" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="pie">
            <div className="rounded-md border p-4">
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={dataDistribution}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    fill="#8884d8"
                    label={({ category, count, percent }) => 
                      `${category}: ${count.toLocaleString()} (${(percent * 100).toFixed(1)}%)`
                    }
                  >
                    {dataDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value.toLocaleString(), 'Data Points']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="radar">
            <div className="rounded-md border p-4">
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart outerRadius={130} data={diagnosticMetrics}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 1]} tickFormatter={formatPercent} />
                  <Radar
                    name="Accuracy"
                    dataKey="accuracy"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Precision"
                    dataKey="precision"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                  />
                  <Radar
                    name="Recall"
                    dataKey="recall"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.2}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceGrid;
