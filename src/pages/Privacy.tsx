
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Lock, RefreshCw } from 'lucide-react';

const privacyData = {
  metrics: [
    { timestamp: '2024-01', privacy: 95, risk: 12 },
    { timestamp: '2024-02', privacy: 92, risk: 15 },
    { timestamp: '2024-03', privacy: 97, risk: 8 },
    { timestamp: '2024-04', privacy: 94, risk: 11 },
    { timestamp: '2024-05', privacy: 96, risk: 9 },
  ],
  currentSettings: {
    epsilon: 0.8,
    noiseScale: 1.2,
    clippingThreshold: 3.0,
  }
};

const Privacy = () => {
  return (
    <DashboardLayout 
      title="Privacy Controls" 
      description="Manage privacy settings and monitor metrics"
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Differential Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Enable Differential Privacy</span>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Privacy Budget (ε)</span>
                  <span className="text-sm font-medium">{privacyData.currentSettings.epsilon}</span>
                </div>
                <Slider
                  defaultValue={[privacyData.currentSettings.epsilon * 10]}
                  max={20}
                  step={1}
                  className="w-full"
                />
              </div>
              <Button className="w-full">
                <Shield className="w-4 h-4 mr-2" />
                Update Privacy Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Encryption Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Data Encryption</span>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Encryption Strength</span>
                  <span className="font-medium">256-bit AES</span>
                </div>
                <Progress value={100} className="w-full" />
              </div>
              <Button className="w-full" variant="outline">
                <Lock className="w-4 h-4 mr-2" />
                Rotate Encryption Keys
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Current Privacy Score</span>
                <span className="text-2xl font-bold text-green-600">96%</span>
              </div>
              <Button className="w-full" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Run Privacy Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Privacy Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={privacyData.metrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="privacy" stroke="#10b981" name="Privacy Score" />
              <Line type="monotone" dataKey="risk" stroke="#ef4444" name="Risk Level" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Privacy;
