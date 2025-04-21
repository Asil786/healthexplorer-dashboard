import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  Server, 
  HardDrive, 
  Cpu, 
  Gauge, 
  HardDriveDownload,
  ArrowUpDown,
  Zap,
  Activity,
  CircleDot,
  RefreshCw,
  Layers
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, BarChart as RechartsBarChart, Bar, Legend, Cell } from 'recharts';

const serverMetrics = [
  { timestamp: '00:00', cpu: 12, memory: 28, network: 10, disk: 9 },
  { timestamp: '06:00', cpu: 18, memory: 33, network: 13, disk: 10 },
  { timestamp: '12:00', cpu: 20, memory: 35, network: 17, disk: 12 },
  { timestamp: '18:00', cpu: 15, memory: 30, network: 16, disk: 11 },
  { timestamp: '23:00', cpu: 16, memory: 31, network: 14, disk: 10 }
];

const networkStats = [
  { name: 'Inbound', value: 1.2, unit: 'GB' },
  { name: 'Outbound', value: 0.9, unit: 'GB' },
  { name: 'Packets', value: 23000, unit: '' },
  { name: 'Latency', value: 8, unit: 'ms' }
];

const storageStats = [
  { name: 'Total', value: 0.5, unit: 'TB', color: '#6366f1' },
  { name: 'Used', value: 0.19, unit: 'TB', color: '#a855f7' },
  { name: 'Available', value: 0.31, unit: 'TB', color: '#22c55e' }
];

const serversList = [
  { 
    id: 1, 
    name: 'Local Model Server', 
    ip: '127.0.0.1', 
    status: 'online', 
    uptime: '100%', 
    location: 'On-premise', 
    cpu: 17, 
    memory: 32, 
    disk: 10 
  }
];

const bandwidthData = [
  { name: 'Mon', inbound: 2.1, outbound: 1.7 },
  { name: 'Tue', inbound: 2.3, outbound: 1.8 },
  { name: 'Wed', inbound: 2.0, outbound: 1.3 },
  { name: 'Thu', inbound: 2.2, outbound: 1.6 },
  { name: 'Fri', inbound: 2.4, outbound: 1.9 },
  { name: 'Sat', inbound: 1.5, outbound: 1.1 },
  { name: 'Sun', inbound: 1.2, outbound: 1.0 }
];

const StorageUsageChart = () => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <HardDrive size={18} className="text-indigo-400" />
        Storage Allocation & Usage
      </CardTitle>
      <CardDescription>Total storage capacity and current usage across your local server</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={storageStats}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                color: '#f8fafc'
              }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend />
            <Bar dataKey="value" name="Storage (TB)" radius={[4, 4, 4, 4]}>
              {storageStats.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {storageStats.map((stat) => (
          <div key={stat.name} className="border rounded-lg p-3 bg-slate-800/50 border-slate-700">
            <div className="text-sm text-slate-400 mb-1">{stat.name}</div>
            <div className="text-2xl font-semibold text-slate-100">
              {stat.value} <span className="text-sm text-slate-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const BandwidthUsageChart = () => (
  <Card className="col-span-1 lg:col-span-2">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <ArrowUpDown size={18} className="text-indigo-400" />
        Network Bandwidth
      </CardTitle>
      <CardDescription>Inbound and outbound data transfer (local only)</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={bandwidthData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                color: '#f8fafc'
              }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Legend />
            <Line type="monotone" dataKey="inbound" name="Inbound (GB)" stroke="#6366f1" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="outbound" name="Outbound (GB)" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-6">
        {networkStats.map((stat) => (
          <div key={stat.name} className="border rounded-lg p-3 bg-slate-800/50 border-slate-700">
            <div className="text-sm text-slate-400 mb-1">{stat.name}</div>
            <div className="text-xl lg:text-2xl font-semibold text-slate-100">
              {stat.value} <span className="text-sm text-slate-400">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const ResourceUsageChart = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Gauge size={18} className="text-indigo-400" />
        System Resource Usage
      </CardTitle>
      <CardDescription>Local server CPU, memory and network utilization</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={serverMetrics}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="timestamp" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1e293b', 
                borderColor: '#334155',
                color: '#f8fafc'
              }}
              labelStyle={{ color: '#f8fafc' }}
            />
            <Area type="monotone" dataKey="cpu" stackId="1" name="CPU %" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
            <Area type="monotone" dataKey="memory" stackId="2" name="Memory %" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            <Area type="monotone" dataKey="network" stackId="3" name="Network %" stroke="#22c55e" fill="#22c55e" fillOpacity={0.6} />
            <Area type="monotone" dataKey="disk" stackId="4" name="Disk I/O %" stroke="#eab308" fill="#eab308" fillOpacity={0.6} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContent>
  </Card>
);

const ServerStatusTable = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-emerald-400';
      case 'warning': return 'text-amber-400';
      case 'offline': return 'text-rose-400';
      default: return 'text-slate-400';
    }
  };

  const getResourceColor = (value: number) => {
    if (value >= 90) return 'bg-rose-500';
    if (value >= 75) return 'bg-amber-500';
    if (value >= 50) return 'bg-emerald-500';
    return 'bg-indigo-500';
  };

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Server size={18} className="text-indigo-400" />
              Server Status
            </CardTitle>
            <CardDescription>Current status of your local server</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <RefreshCw size={14} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left p-2 text-slate-400 font-medium">Server</th>
                <th className="text-left p-2 text-slate-400 font-medium">IP Address</th>
                <th className="text-left p-2 text-slate-400 font-medium">Status</th>
                <th className="text-left p-2 text-slate-400 font-medium">Uptime</th>
                <th className="text-left p-2 text-slate-400 font-medium">Location</th>
                <th className="text-left p-2 text-slate-400 font-medium">Resources</th>
              </tr>
            </thead>
            <tbody>
              {serversList.map((server) => (
                <tr key={server.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                  <td className="p-2 text-slate-200 font-medium">{server.name}</td>
                  <td className="p-2 text-slate-300 font-mono text-sm">{server.ip}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <CircleDot size={12} className={getStatusColor(server.status)} />
                      <span className="capitalize text-slate-300">{server.status}</span>
                    </div>
                  </td>
                  <td className="p-2 text-slate-300">{server.uptime}</td>
                  <td className="p-2 text-slate-300">{server.location}</td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col w-full gap-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">CPU</span>
                          <span className="text-slate-300">{server.cpu}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${getResourceColor(server.cpu)}`} style={{ width: `${server.cpu}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-xs mt-1">
                          <span className="text-slate-400">RAM</span>
                          <span className="text-slate-300">{server.memory}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-1.5">
                          <div className={`h-1.5 rounded-full ${getResourceColor(server.memory)}`} style={{ width: `${server.memory}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

const InfrastructurePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <DashboardLayout 
      title="Infrastructure" 
      description="Monitor your local federated learning server"
    >
      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex justify-between items-center mb-6">
          <TabsList className="w-full max-w-md bg-slate-800/70">
            <TabsTrigger value="overview" className="flex-1 data-[state=active]:bg-indigo-600">
              <Layers className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="servers" className="flex-1 data-[state=active]:bg-indigo-600">
              <Server className="mr-2 h-4 w-4" />
              Servers
            </TabsTrigger>
            <TabsTrigger value="storage" className="flex-1 data-[state=active]:bg-indigo-600">
              <HardDrive className="mr-2 h-4 w-4" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="network" className="flex-1 data-[state=active]:bg-indigo-600">
              <Activity className="mr-2 h-4 w-4" />
              Network
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Total Servers</p>
                    <p className="text-3xl font-bold text-slate-200">{serversList.length}</p>
                  </div>
                  <div className="p-3 bg-indigo-900/60 rounded-full">
                    <Server className="h-6 w-6 text-indigo-300" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-400">
                  <div className="flex items-center text-emerald-400">
                    <span className="flex items-center font-medium">
                      {serversList.filter(s => s.status === 'online').length} Online
                    </span>
                  </div>
                  <span className="mx-2">•</span>
                  <div className="flex items-center text-amber-400">
                    <span className="flex items-center font-medium">
                      {serversList.filter(s => s.status === 'warning').length} Warning
                    </span>
                  </div>
                  <span className="mx-2">•</span>
                  <div className="flex items-center text-rose-400">
                    <span className="flex items-center font-medium">
                      {serversList.filter(s => s.status === 'offline').length} Offline
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Average CPU</p>
                    <p className="text-3xl font-bold text-slate-200">
                      {Math.round(serversList.reduce((acc, server) => acc + server.cpu, 0) / serversList.length)}%
                    </p>
                  </div>
                  <div className="p-3 bg-purple-900/60 rounded-full">
                    <Cpu className="h-6 w-6 text-purple-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ 
                      width: `${Math.round(serversList.reduce((acc, server) => acc + server.cpu, 0) / serversList.length)}%` 
                    }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Storage Used</p>
                    <p className="text-3xl font-bold text-slate-200">
                      {storageStats.find(s => s.name === 'Used')?.value} <span className="text-lg">TB</span>
                    </p>
                  </div>
                  <div className="p-3 bg-emerald-900/60 rounded-full">
                    <HardDriveDownload className="h-6 w-6 text-emerald-300" />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>
                      {Math.round((storageStats.find(s => s.name === 'Used')?.value || 0) / 
                      (storageStats.find(s => s.name === 'Total')?.value || 1) * 100)}% of {storageStats.find(s => s.name === 'Total')?.value} TB
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ 
                      width: `${Math.round((storageStats.find(s => s.name === 'Used')?.value || 0) / 
                      (storageStats.find(s => s.name === 'Total')?.value || 1) * 100)}%` 
                    }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Network Traffic</p>
                    <p className="text-3xl font-bold text-slate-200">
                      {networkStats.find(s => s.name === 'Inbound')?.value} <span className="text-lg">GB</span>
                    </p>
                  </div>
                  <div className="p-3 bg-blue-900/60 rounded-full">
                    <Zap className="h-6 w-6 text-blue-300" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-slate-400">
                  <div className="flex items-center">
                    <span className="mr-1">↑</span>
                    <span className="flex items-center font-medium text-blue-400">
                      {networkStats.find(s => s.name === 'Outbound')?.value} {networkStats.find(s => s.name === 'Outbound')?.unit}
                    </span>
                  </div>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    <span className="mr-1">↓</span>
                    <span className="flex items-center font-medium text-green-400">
                      {networkStats.find(s => s.name === 'Inbound')?.value} {networkStats.find(s => s.name === 'Inbound')?.unit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <ResourceUsageChart />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <ServerStatusTable />
            <BandwidthUsageChart />
          </div>
        </TabsContent>
        
        <TabsContent value="servers" className="space-y-6">
          <ServerStatusTable />
          <ResourceUsageChart />
        </TabsContent>
        
        <TabsContent value="storage" className="space-y-6">
          <StorageUsageChart />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HardDrive size={18} className="text-indigo-400" />
                Storage Distribution
              </CardTitle>
              <CardDescription>Storage allocation breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="mb-4">
                    <HardDrive className="h-12 w-12 mx-auto text-slate-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-300">Detailed Storage (Local Server)</h3>
                  <p className="max-w-md mx-auto mt-2">
                    Detailed storage data and type breakdown can be implemented once more nodes are added to your system.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="network" className="space-y-6">
          <BandwidthUsageChart />
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={18} className="text-indigo-400" />
                Network Performance
              </CardTitle>
              <CardDescription>Latency and metrics for your single server</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="mb-4">
                    <Activity className="h-12 w-12 mx-auto text-slate-500" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-300">Network Performance (Local Setup)</h3>
                  <p className="max-w-md mx-auto mt-2">
                    More detailed metrics will be available as soon as a distributed/server cluster is set up.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default InfrastructurePage;
