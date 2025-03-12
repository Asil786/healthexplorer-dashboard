
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ModelTrainingChartProps {
  data: Array<{
    epoch: number;
    accuracy: number;
    loss: number;
    privacyBudget: number;
  }>;
  className?: string;
}

const ModelTrainingChart = ({ data, className }: ModelTrainingChartProps) => {
  const [activeMetric, setActiveMetric] = useState<'accuracy' | 'loss' | 'both'>('both');

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <CardTitle>Model Training Progress</CardTitle>
            <CardDescription>Performance metrics over training epochs</CardDescription>
          </div>
          <Tabs defaultValue="both" className="w-full sm:w-auto" onValueChange={(value) => setActiveMetric(value as any)}>
            <TabsList className="grid w-full sm:w-auto grid-cols-3">
              <TabsTrigger value="accuracy">Accuracy</TabsTrigger>
              <TabsTrigger value="loss">Loss</TabsTrigger>
              <TabsTrigger value="both">Combined</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="epoch" 
              label={{ 
                value: 'Epoch', 
                position: 'insideBottomRight', 
                offset: -5 
              }} 
            />
            <YAxis 
              yAxisId="left" 
              domain={[0, 1]} 
              tickFormatter={formatPercent} 
              label={{ 
                value: activeMetric !== 'loss' ? 'Accuracy' : 'Privacy Budget', 
                angle: -90, 
                position: 'insideLeft' 
              }} 
            />
            {(activeMetric === 'loss' || activeMetric === 'both') && (
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                domain={[0, 1]} 
                label={{ 
                  value: 'Loss', 
                  angle: -90, 
                  position: 'insideRight' 
                }} 
              />
            )}
            <Tooltip 
              formatter={(value: number) => [
                `${(value * 100).toFixed(2)}%`, 
                activeMetric === 'both' 
                  ? value === data[0].loss 
                    ? 'Loss' 
                    : value === data[0].privacyBudget 
                      ? 'Privacy Budget' 
                      : 'Accuracy'
                  : activeMetric === 'loss' 
                    ? value === data[0].loss 
                      ? 'Loss' 
                      : 'Privacy Budget'
                    : 'Accuracy'
              ]}
            />
            <Legend />
            {(activeMetric === 'accuracy' || activeMetric === 'both') && (
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#4f46e5" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                dot={{ strokeWidth: 2 }}
              />
            )}
            {(activeMetric === 'accuracy' || activeMetric === 'both') && (
              <Line 
                yAxisId="left" 
                type="monotone" 
                dataKey="privacyBudget" 
                stroke="#06b6d4" 
                strokeWidth={2} 
                activeDot={{ r: 8 }}
                dot={{ strokeWidth: 2 }}
              />
            )}
            {(activeMetric === 'loss' || activeMetric === 'both') && (
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="loss" 
                stroke="#f97316" 
                strokeWidth={2} 
                activeDot={{ r: 8 }} 
                dot={{ strokeWidth: 2 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ModelTrainingChart;
