
import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/layouts/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ModelTrainingChart from '@/components/dashboard/ModelTrainingChart';
import NetworkTopology from '@/components/dashboard/NetworkTopology';
import PerformanceGrid from '@/components/dashboard/PerformanceGrid';
import NetworkTimeline from '@/components/dashboard/NetworkTimeline';
import NetworkMetrics from '@/components/dashboard/NetworkMetrics';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, BarChart2, Network, Globe, LineChart, ArrowRight } from 'lucide-react';
import { trainingProgress, networkData, diagnosticMetrics, dataDistribution } from '@/lib/data';

const Index = () => {
  // Mock data for network metrics
  const networkMetricsData = {
    packetLoss: Array.from({ length: 10 }, (_, i) => ({
      timestamp: `2023-10-${15 + i}`,
      value: Math.random() * 2,
    })),
    latency: Array.from({ length: 10 }, (_, i) => ({
      timestamp: `2023-10-${15 + i}`,
      value: Math.random() * 50 + 10,
    })),
    bandwidth: Array.from({ length: 10 }, (_, i) => ({
      timestamp: `2023-10-${15 + i}`,
      value: Math.random() * 500 + 100,
    })),
    messageCount: [
      { category: 'Updates', count: Math.floor(Math.random() * 100) + 50 },
      { category: 'Queries', count: Math.floor(Math.random() * 80) + 40 },
      { category: 'Errors', count: Math.floor(Math.random() * 20) + 5 },
      { category: 'Warnings', count: Math.floor(Math.random() * 30) + 10 },
    ],
  };

  return (
    <DashboardLayout
      title="Federated Learning Dashboard"
      description="Monitor and manage your federated learning networks"
    >
      <div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-4 md:mb-6">
        <StatCard
          title="Active Models"
          value="7"
          description="+2 from last month"
          icon={<Brain className="h-4 w-4 text-blue-500 dark:text-blue-400" />}
          trend={{ value: 2, isPositive: true }}
          className="border-blue-100 dark:border-blue-900/30"
          valueClassName="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Active Nodes"
          value="28"
          description="+5 from last month"
          icon={<Network className="h-4 w-4 text-green-500 dark:text-green-400" />}
          trend={{ value: 5, isPositive: true }}
          className="border-green-100 dark:border-green-900/30"
          valueClassName="text-green-600 dark:text-green-400"
        />
        <StatCard
          title="Data Privacy Score"
          value="92%"
          description="+3% from last month"
          icon={<Globe className="h-4 w-4 text-purple-500 dark:text-purple-400" />}
          trend={{ value: 3, isPositive: true }}
          className="border-purple-100 dark:border-purple-900/30"
          valueClassName="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Model Accuracy"
          value="89.7%"
          description="+1.2% from last month"
          icon={<BarChart2 className="h-4 w-4 text-amber-500 dark:text-amber-400" />}
          trend={{ value: 1.2, isPositive: true }}
          className="border-amber-100 dark:border-amber-900/30"
          valueClassName="text-amber-600 dark:text-amber-400"
        />
      </div>

      <div className="grid gap-3 md:gap-4 lg:gap-6 mb-4 md:mb-6">
        {/* Featured ML Predictions Card */}
        <Card className="bg-gradient-to-br from-blue-50/90 to-indigo-50/90 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-900/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Brain className="h-5 w-5 text-blue-500 dark:text-blue-400" />
              ML Prediction System
            </CardTitle>
            <CardDescription className="dark:text-blue-300/80">
              Upload datasets, train models, and generate predictions with our advanced ML system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="space-y-2 flex-1">
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Our new machine learning prediction system allows you to:
                </p>
                <ul className="list-disc pl-5 text-sm text-slate-700 dark:text-slate-300 space-y-1">
                  <li>Upload and analyze custom datasets</li>
                  <li>Train multiple model types (KNN, Decision Trees, Random Forest, etc.)</li>
                  <li>Evaluate model performance with metrics like RMSE, MAE, R²</li>
                  <li>Visualize data relationships and feature importance</li>
                  <li>Generate real-time predictions with your chosen model</li>
                </ul>
                <div className="pt-4">
                  <Button asChild>
                    <Link to="/predictions">
                      Try ML Predictions <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-blue-500 dark:text-blue-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <BarChart2 className="h-6 w-6 text-green-500 dark:text-green-400" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <Network className="h-6 w-6 text-purple-500 dark:text-purple-400" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-3 md:gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-3 mb-4 md:mb-6">
        <ModelTrainingChart data={trainingProgress} />
        <NetworkTopology data={networkData} />
        <PerformanceGrid diagnosticMetrics={diagnosticMetrics} dataDistribution={dataDistribution} />
      </div>

      <Tabs defaultValue="timeline" className="mb-4 md:mb-6">
        <TabsList className="mb-4 dark:bg-slate-800">
          <TabsTrigger value="timeline">Network Timeline</TabsTrigger>
          <TabsTrigger value="metrics">Network Metrics</TabsTrigger>
        </TabsList>
        <TabsContent value="timeline">
          <NetworkTimeline />
        </TabsContent>
        <TabsContent value="metrics">
          <NetworkMetrics data={networkMetricsData} fullView={true} />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Index;
