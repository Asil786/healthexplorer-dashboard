
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NetworkGraph from '@/components/dashboard/NetworkGraph';
import NetworkMetrics from '@/components/dashboard/NetworkMetrics';
import NetworkTimeline from '@/components/dashboard/NetworkTimeline';
import NetworkTopology from '@/components/dashboard/NetworkTopology';
import { 
  networkData, 
  institutions, 
  systemHealth,
  networkMetricsData
} from '@/lib/data';
import { Network, Activity, LineChart, GitBranch } from 'lucide-react';

const NetworkPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <DashboardLayout 
      title="Federation Network" 
      description="Monitor and analyze your federated learning network"
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
              <Network className="mr-2 h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="topology" className="flex-1 data-[state=active]:bg-indigo-600">
              <GitBranch className="mr-2 h-4 w-4" />
              Topology
            </TabsTrigger>
            <TabsTrigger value="metrics" className="flex-1 data-[state=active]:bg-indigo-600">
              <LineChart className="mr-2 h-4 w-4" />
              Metrics
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex-1 data-[state=active]:bg-indigo-600">
              <Activity className="mr-2 h-4 w-4" />
              Timeline
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <NetworkGraph data={networkData} />
            <NetworkMetrics data={networkMetricsData} />
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={18} className="text-indigo-400" />
                Network Activity Summary
              </CardTitle>
              <CardDescription>Recent activity and health metrics across the federation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-200">Active Institutions</h3>
                  <div className="space-y-2">
                    {institutions
                      .filter(i => i.status === 'active')
                      .slice(0, 5)
                      .map(institution => (
                        <div key={institution.id} className="flex justify-between items-center p-2 bg-slate-800/70 rounded-md border border-slate-700">
                          <span className="font-medium text-sm text-slate-200">{institution.name}</span>
                          <span className="text-xs text-slate-400">{new Date(institution.lastSync).toLocaleTimeString()}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-slate-200">System Health</h3>
                  <div className="space-y-2">
                    {systemHealth.slice(-5).map((metric, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-slate-800/70 rounded-md border border-slate-700">
                        <span className="font-medium text-sm text-slate-200">{metric.timestamp}</span>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-1 bg-indigo-900/60 text-indigo-200 rounded-full text-xs">CPU: {metric.cpuUsage}%</span>
                          <span className="px-2 py-1 bg-emerald-900/60 text-emerald-200 rounded-full text-xs">Mem: {metric.memoryUsage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="topology" className="space-y-6">
          <NetworkTopology data={networkData} />
        </TabsContent>
        
        <TabsContent value="metrics" className="space-y-6">
          <NetworkMetrics data={networkMetricsData} fullView={true} />
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-6">
          <NetworkTimeline />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default NetworkPage;
