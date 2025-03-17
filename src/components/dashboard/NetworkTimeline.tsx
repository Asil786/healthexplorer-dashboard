
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Filter, Download, CheckCircle2, XCircle, AlertTriangle, BrainCircuit } from 'lucide-react';

const NetworkTimeline = () => {
  const timelineEvents = [
    {
      id: 1,
      timestamp: '2023-10-15 14:30:25',
      type: 'model_update',
      institution: 'General Hospital',
      status: 'success',
      details: 'Model weights updated successfully, round 10 completed'
    },
    {
      id: 2,
      timestamp: '2023-10-15 14:25:18',
      type: 'model_update',
      institution: 'University Medical Center',
      status: 'success',
      details: 'Model weights updated successfully, round 10 completed'
    },
    {
      id: 3,
      timestamp: '2023-10-15 14:15:02',
      type: 'error',
      institution: 'Central Health Clinic',
      status: 'error',
      details: 'Connection timeout during model weight upload'
    },
    {
      id: 4,
      timestamp: '2023-10-15 14:10:47',
      type: 'model_update',
      institution: 'Pacific Research Institute',
      status: 'success',
      details: 'Model weights updated successfully, round 10 completed'
    },
    {
      id: 5,
      timestamp: '2023-10-15 14:05:33',
      type: 'system',
      institution: 'Central Server',
      status: 'warning',
      details: 'High CPU utilization detected (85%), performance may be affected'
    },
    {
      id: 6,
      timestamp: '2023-10-15 14:00:00',
      type: 'round_start',
      institution: 'Central Server',
      status: 'info',
      details: 'Started training round 10, broadcasting model weights to 7 institutions'
    },
    {
      id: 7,
      timestamp: '2023-10-15 13:45:12',
      type: 'model_update',
      institution: 'Mountain View Health',
      status: 'success',
      details: 'Model weights updated successfully, round 9 completed'
    },
    {
      id: 8,
      timestamp: '2023-10-15 13:30:59',
      type: 'model_update',
      institution: 'Atlantic Research Center',
      status: 'success',
      details: 'Model weights updated successfully, round 9 completed'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'error':
        return <XCircle size={16} className="text-rose-500" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-500" />;
      case 'info':
        return <BrainCircuit size={16} className="text-indigo-400" />;
      default:
        return <Clock size={16} className="text-slate-400" />;
    }
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Clock size={18} className="text-indigo-400" />
              Network Timeline
            </CardTitle>
            <CardDescription>Chronological events across the federated learning network</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event) => (
            <div key={event.id} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <div className="mt-0.5">
                {getStatusIcon(event.status)}
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <span className="font-medium text-slate-200">{event.institution}</span>
                  <span className="text-xs text-slate-400">{event.timestamp}</span>
                </div>
                <p className="text-sm mt-1 text-slate-300">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button variant="outline">Load More Events</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTimeline;
