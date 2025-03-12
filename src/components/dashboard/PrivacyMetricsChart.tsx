
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Shield, AlertTriangle, Eye, PieChart } from 'lucide-react';

interface PrivacyMetricsChartProps {
  data: Array<{
    date: string;
    differentialPrivacy: number;
    informationLeakage: number;
    modelConfusion: number;
    membershipInference: number;
  }>;
  className?: string;
}

const PrivacyMetricsChart = ({ data, className }: PrivacyMetricsChartProps) => {
  const [chartType, setChartType] = useState<'line' | 'area' | 'radar'>('area');

  const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
  
  const radarData = [
    { subject: 'Differential Privacy', A: data[data.length - 1].differentialPrivacy, fullMark: 1 },
    { subject: 'Model Confusion', A: data[data.length - 1].modelConfusion, fullMark: 1 },
    { subject: 'Info Leakage (inv)', A: 1 - data[data.length - 1].informationLeakage, fullMark: 1 },
    { subject: 'Membership Inf (inv)', A: 1 - data[data.length - 1].membershipInference, fullMark: 1 },
  ];

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            <div>
              <CardTitle>Privacy Metrics</CardTitle>
              <CardDescription>Monitoring privacy preservation effectiveness</CardDescription>
            </div>
          </div>
          <ToggleGroup type="single" value={chartType} onValueChange={(value) => value && setChartType(value as any)} className="justify-start">
            <ToggleGroupItem value="line" aria-label="Line chart">
              <PieChart className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="area" aria-label="Area chart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 20H22V4H2V20ZM4 18V6H20V18H4Z" fill="currentColor"/>
                <path d="M4 18L8 14L12 16L16 10L20 12V18H4Z" fill="currentColor" fillOpacity="0.5"/>
              </svg>
            </ToggleGroupItem>
            <ToggleGroupItem value="radar" aria-label="Radar chart">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L22 12L12 22L2 12L12 2Z" stroke="currentColor" fill="none"/>
                <path d="M12 6L18 12L12 18L6 12L12 6Z" stroke="currentColor" fill="currentColor" fillOpacity="0.5"/>
              </svg>
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {chartType === 'line' && (
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
              <XAxis dataKey="date" />
              <YAxis domain={[0, 1]} tickFormatter={formatPercent} />
              <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(2)}%`]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="differentialPrivacy"
                name="Differential Privacy"
                stroke="#3b82f6"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="modelConfusion"
                name="Model Confusion"
                stroke="#10b981"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="informationLeakage"
                name="Information Leakage"
                stroke="#f97316"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="membershipInference"
                name="Membership Inference"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
        
        {chartType === 'area' && (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 5,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 1]} tickFormatter={formatPercent} />
              <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(2)}%`]} />
              <Legend />
              <Area
                type="monotone"
                dataKey="differentialPrivacy"
                name="Differential Privacy"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="modelConfusion"
                name="Model Confusion"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="informationLeakage"
                name="Information Leakage"
                stroke="#f97316"
                fill="#f97316"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="membershipInference"
                name="Membership Inference"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        
        {chartType === 'radar' && (
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
              <PolarRadiusAxis domain={[0, 1]} tickFormatter={formatPercent} />
              <Radar
                name="Current Metrics"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )}
        
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-3 rounded-md border border-slate-100 bg-slate-50/50">
            <Shield size={18} className="mb-1 text-blue-500" />
            <span className="text-xs font-medium">Differential Privacy</span>
            <span className="text-sm font-bold text-blue-600">{formatPercent(data[data.length - 1].differentialPrivacy)}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-md border border-slate-100 bg-slate-50/50">
            <AlertTriangle size={18} className="mb-1 text-orange-500" />
            <span className="text-xs font-medium">Information Leakage</span>
            <span className="text-sm font-bold text-orange-600">{formatPercent(data[data.length - 1].informationLeakage)}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-md border border-slate-100 bg-slate-50/50">
            <PieChart size={18} className="mb-1 text-green-500" />
            <span className="text-xs font-medium">Model Confusion</span>
            <span className="text-sm font-bold text-green-600">{formatPercent(data[data.length - 1].modelConfusion)}</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-md border border-slate-100 bg-slate-50/50">
            <Eye size={18} className="mb-1 text-purple-500" />
            <span className="text-xs font-medium">Membership Inference</span>
            <span className="text-sm font-bold text-purple-600">{formatPercent(data[data.length - 1].membershipInference)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyMetricsChart;
