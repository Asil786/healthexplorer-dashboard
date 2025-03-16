
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Play, Pause, RefreshCw, Download } from 'lucide-react';

const modelData = {
  trainingProgress: [
    { epoch: 1, accuracy: 0.75, loss: 0.42 },
    { epoch: 2, accuracy: 0.82, loss: 0.35 },
    { epoch: 3, accuracy: 0.87, loss: 0.28 },
    { epoch: 4, accuracy: 0.90, loss: 0.22 },
    { epoch: 5, accuracy: 0.92, loss: 0.18 },
  ],
  models: [
    { id: 1, name: 'Clinical Prediction Model', status: 'training', progress: 75 },
    { id: 2, name: 'Diagnostic Classifier', status: 'ready', progress: 100 },
    { id: 3, name: 'Patient Risk Assessment', status: 'paused', progress: 45 },
  ]
};

const Models = () => {
  return (
    <DashboardLayout 
      title="Model Management" 
      description="Monitor and manage your machine learning models"
    >
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {modelData.models.map((model) => (
          <Card key={model.id} className="h-full">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <CardTitle className="text-lg">{model.name}</CardTitle>
                <Badge 
                  variant={
                    model.status === 'ready' ? 'outline' :
                    model.status === 'training' ? 'default' :
                    'secondary'
                  }
                  className="self-start"
                >
                  {model.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={model.progress} className="w-full" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Progress: {model.progress}%</span>
                  <span>ETA: 2h 15m</span>
                </div>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  {model.status === 'training' ? (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Play className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retrain
                  </Button>
                  {model.status === 'ready' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Training Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={modelData.trainingProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="epoch" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => value.toFixed(3)}
                />
                <Line type="monotone" dataKey="accuracy" stroke="#8884d8" />
                <Line type="monotone" dataKey="loss" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Models;
