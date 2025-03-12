
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { analyticsData } from '@/lib/data';
import { 
  LineChart as LineChartIcon, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  Users, 
  Activity 
} from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Analytics = () => {
  const { performanceMetrics, computationalResources, userActivity, institutionContributions } = analyticsData;
  
  return (
    <DashboardLayout 
      title="Analytics Dashboard" 
      description="Comprehensive analytics and insights for federated learning"
    >
      <Tabs defaultValue="performance" className="w-full space-y-6">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="performance" className="flex-1">
            <LineChartIcon className="mr-2 h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex-1">
            <BarChartIcon className="mr-2 h-4 w-4" />
            Resources
          </TabsTrigger>
          <TabsTrigger value="users" className="flex-1">
            <Users className="mr-2 h-4 w-4" />
            User Activity
          </TabsTrigger>
          <TabsTrigger value="institutions" className="flex-1">
            <PieChartIcon className="mr-2 h-4 w-4" />
            Institutions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Over Time</CardTitle>
              <CardDescription>Tracking key performance metrics across all models</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0.75, 1]} />
                    <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="accuracy" stroke="#0088FE" name="Accuracy" strokeWidth={2} />
                    <Line type="monotone" dataKey="precision" stroke="#00C49F" name="Precision" strokeWidth={2} />
                    <Line type="monotone" dataKey="recall" stroke="#FFBB28" name="Recall" strokeWidth={2} />
                    <Line type="monotone" dataKey="f1Score" stroke="#FF8042" name="F1 Score" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Performance Summary</CardTitle>
                <CardDescription>Latest metrics from most recent evaluation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(performanceMetrics[performanceMetrics.length - 1])
                  .filter(([key]) => key !== 'date')
                  .map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium capitalize">{key}</span>
                        <span className="text-sm font-medium">{(Number(value) * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={Number(value) * 100} className="h-2" />
                    </div>
                  ))
                }
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performance Improvements</CardTitle>
                <CardDescription>Week-over-week performance changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={performanceMetrics.map((current, index, array) => {
                        if (index === 0) return { ...current, change: 0 };
                        const previous = array[index - 1];
                        return {
                          date: current.date,
                          change: (current.accuracy - previous.accuracy) * 100
                        };
                      }).filter((_, index) => index > 0)}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis label={{ value: 'Change (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip formatter={(value) => `${value.toFixed(2)}%`} />
                      <Bar dataKey="change" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="resources" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Computational Resource Usage</CardTitle>
              <CardDescription>Resource consumption for federated learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={computationalResources}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gpuHours" stroke="#8884d8" name="GPU Hours" strokeWidth={2} />
                    <Line type="monotone" dataKey="cpuHours" stroke="#82ca9d" name="CPU Hours" strokeWidth={2} />
                    <Line type="monotone" dataKey="memory" stroke="#ffc658" name="Memory (GB)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">GPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {computationalResources[computationalResources.length - 1].gpuHours}
                </div>
                <p className="text-xs text-muted-foreground">Hours this week</p>
                <div className="mt-4">
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">78% of allocated quota</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">CPU Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {computationalResources[computationalResources.length - 1].cpuHours}
                </div>
                <p className="text-xs text-muted-foreground">Hours this week</p>
                <div className="mt-4">
                  <Progress value={62} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">62% of allocated quota</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Memory Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {computationalResources[computationalResources.length - 1].memory}
                </div>
                <p className="text-xs text-muted-foreground">GB this week</p>
                <div className="mt-4">
                  <Progress value={54} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">54% of allocated quota</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity By Role</CardTitle>
                <CardDescription>Active users and session information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={userActivity}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="role" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" name="Total Users" />
                      <Bar dataKey="activeUsers" fill="#82ca9d" name="Active Users" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Average Session Duration</CardTitle>
                <CardDescription>Minutes spent per session by role</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={userActivity}
                        dataKey="avgSessionTime"
                        nameKey="role"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, value }) => `${name}: ${value} min`}
                      >
                        {userActivity.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} minutes`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>Detailed breakdown of active users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Role</th>
                      <th className="text-left py-3 px-2">Total Users</th>
                      <th className="text-left py-3 px-2">Active Users</th>
                      <th className="text-left py-3 px-2">Engagement</th>
                      <th className="text-left py-3 px-2">Avg. Session</th>
                      <th className="text-left py-3 px-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userActivity.map((role, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-3 px-2 font-medium">{role.role}</td>
                        <td className="py-3 px-2">{role.count}</td>
                        <td className="py-3 px-2">{role.activeUsers}</td>
                        <td className="py-3 px-2">
                          <div className="flex items-center">
                            <Progress value={(role.activeUsers / role.count) * 100} className="h-2 w-24 mr-2" />
                            <span>{Math.round((role.activeUsers / role.count) * 100)}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-2">{role.avgSessionTime} min</td>
                        <td className="py-3 px-2">
                          <Badge variant={(role.activeUsers / role.count) > 0.8 ? "success" : "warning"} className="px-2 py-0.5 text-xs rounded-full">
                            {(role.activeUsers / role.count) > 0.8 ? 'High' : 'Medium'}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="institutions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Institution Contributions</CardTitle>
              <CardDescription>Data points and model quality by institution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={institutionContributions}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                    <Tooltip formatter={(value, name) => [
                      name === 'dataPoints' ? value.toLocaleString() : name === 'accuracy' ? `${(value * 100).toFixed(1)}%` : value,
                      name === 'dataPoints' ? 'Data Points' : name === 'accuracy' ? 'Accuracy' : 'Models'
                    ]} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="dataPoints" fill="#8884d8" name="Data Points" />
                    <Bar yAxisId="right" dataKey="models" fill="#82ca9d" name="Models" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Institution Accuracy Comparison</CardTitle>
                <CardDescription>Model accuracy by contributing institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={institutionContributions}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0.8, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                      <Bar dataKey="accuracy" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Data Contribution Distribution</CardTitle>
                <CardDescription>Proportion of data points by institution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={institutionContributions}
                        dataKey="dataPoints"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {institutionContributions.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => value.toLocaleString()} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Analytics;
