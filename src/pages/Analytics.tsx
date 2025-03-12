
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';

const analyticsData = {
  weeklyMetrics: [
    { day: 'Mon', training: 65, validation: 45, test: 30 },
    { day: 'Tue', training: 59, validation: 48, test: 35 },
    { day: 'Wed', training: 80, validation: 55, test: 42 },
    { day: 'Thu', training: 81, validation: 60, test: 48 },
    { day: 'Fri', training: 56, validation: 45, test: 40 },
    { day: 'Sat', training: 55, validation: 42, test: 38 },
    { day: 'Sun', training: 40, validation: 35, test: 30 },
  ],
  performanceOverTime: [
    { month: 'Jan', accuracy: 0.82, loss: 0.24 },
    { month: 'Feb', accuracy: 0.85, loss: 0.21 },
    { month: 'Mar', accuracy: 0.87, loss: 0.19 },
    { month: 'Apr', accuracy: 0.89, loss: 0.17 },
    { month: 'May', accuracy: 0.91, loss: 0.15 },
    { month: 'Jun', accuracy: 0.92, loss: 0.14 },
  ],
  modelMetrics: [
    { name: 'Model A', accuracy: 92, performance: 88, robustness: 85 },
    { name: 'Model B', accuracy: 88, performance: 85, robustness: 82 },
    { name: 'Model C', accuracy: 85, performance: 82, robustness: 80 },
  ]
};

const Analytics = () => {
  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      description="Model performance and training analytics"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Training Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analyticsData.performanceOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => value.toFixed(2)}
                />
                <Area type="monotone" dataKey="accuracy" stroke="#8884d8" fill="#8884d8" />
                <Area type="monotone" dataKey="loss" stroke="#82ca9d" fill="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Training Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analyticsData.weeklyMetrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="training" fill="#8884d8" />
                <Bar dataKey="validation" fill="#82ca9d" />
                <Bar dataKey="test" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.modelMetrics.map((model) => (
                <div key={model.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{model.name}</span>
                    <Badge variant="outline">
                      {model.accuracy}% Accuracy
                    </Badge>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ width: `${model.performance}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
