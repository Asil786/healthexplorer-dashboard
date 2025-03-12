
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Network, TrendingUp, Clock, BarChart2 } from 'lucide-react';

interface NetworkMetricsProps {
  data: {
    packetLoss: { timestamp: string; value: number }[];
    latency: { timestamp: string; value: number }[];
    bandwidth: { timestamp: string; value: number }[];
    messageCount: { category: string; count: number }[];
  };
  fullView?: boolean;
}

const NetworkMetrics = ({ data, fullView = false }: NetworkMetricsProps) => {
  return (
    <Card className={fullView ? "col-span-2" : ""}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          Network Performance Metrics
        </CardTitle>
        <CardDescription>Key performance indicators for your federated learning network</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`grid ${fullView ? 'grid-cols-2' : 'grid-cols-1'} gap-6`}>
          {/* Latency Chart */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-orange-500" />
              <span className="font-medium text-sm">Network Latency (ms)</span>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.latency}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={{ stroke: '#f97316', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#f97316', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Packet Loss Chart */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Network size={16} className="text-red-500" />
              <span className="font-medium text-sm">Packet Loss (%)</span>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.packetLoss}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="timestamp" 
                    tick={{ fontSize: 12 }} 
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={{ stroke: '#e2e8f0' }}
                    tickLine={{ stroke: '#e2e8f0' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '6px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    dot={{ stroke: '#ef4444', strokeWidth: 2, r: 4 }}
                    activeDot={{ stroke: '#ef4444', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {fullView && (
            <>
              {/* Bandwidth Chart */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-500" />
                  <span className="font-medium text-sm">Bandwidth Usage (Mbps)</span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.bandwidth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="timestamp" 
                        tick={{ fontSize: 12 }} 
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        dot={{ stroke: '#10b981', strokeWidth: 2, r: 4 }}
                        activeDot={{ stroke: '#10b981', strokeWidth: 2, r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Message Counts Chart */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BarChart2 size={16} className="text-blue-500" />
                  <span className="font-medium text-sm">Message Distribution</span>
                </div>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.messageCount}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="category" 
                        tick={{ fontSize: 12 }} 
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        axisLine={{ stroke: '#e2e8f0' }}
                        tickLine={{ stroke: '#e2e8f0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          fontSize: '12px'
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkMetrics;
