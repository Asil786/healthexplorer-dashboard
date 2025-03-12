
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ModelTrainingChart from '@/components/dashboard/ModelTrainingChart';
import PrivacyMetricsChart from '@/components/dashboard/PrivacyMetricsChart';
import InstitutionsList from '@/components/dashboard/InstitutionsList';
import NetworkGraph from '@/components/dashboard/NetworkGraph';
import PerformanceGrid from '@/components/dashboard/PerformanceGrid';
import { 
  Server, 
  Users, 
  Shield, 
  BrainCircuit, 
  Activity 
} from 'lucide-react';
import { 
  institutions, 
  trainingProgress, 
  privacyMetrics, 
  modelComparison, 
  diagnosticMetrics,
  networkData,
  dataDistribution
} from '@/lib/data';

const Index = () => {
  // Calculate summary statistics
  const totalInstitutions = institutions.length;
  const activeInstitutions = institutions.filter(i => i.status === 'active').length;
  const totalDataPoints = institutions.reduce((sum, i) => sum + i.dataPoints, 0);
  const avgAccuracy = institutions.reduce((sum, i) => sum + i.accuracy, 0) / institutions.length;
  const avgPrivacy = institutions.reduce((sum, i) => sum + i.privacyScore, 0) / institutions.length;
  
  // Get latest metrics
  const latestPrivacyMetrics = privacyMetrics[privacyMetrics.length - 1];
  const latestTrainingProgress = trainingProgress[trainingProgress.length - 1];
  
  return (
    <DashboardLayout 
      title="Privacy-Preserving Healthcare Dashboard" 
      description="Federated Learning Analytics & Monitoring"
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Participating Institutions"
          value={totalInstitutions}
          description={`${activeInstitutions} currently active`}
          icon={<Hospital size={18} className="text-blue-500" />}
          variant="glass"
        />
        <StatCard
          title="Total Data Points"
          value={totalDataPoints.toLocaleString()}
          description="Distributed across network"
          icon={<Database size={18} className="text-purple-500" />}
          variant="glass"
        />
        <StatCard
          title="Model Accuracy"
          value={`${(latestTrainingProgress.accuracy * 100).toFixed(1)}%`}
          trend={{ value: 2.3, isPositive: true }}
          description="Last training cycle"
          icon={<BrainCircuit size={18} className="text-green-500" />}
          variant="glass"
        />
        <StatCard
          title="Privacy Guarantee"
          value={`${(latestPrivacyMetrics.differentialPrivacy * 100).toFixed(1)}%`}
          trend={{ value: 0.8, isPositive: true }}
          description="Differential privacy score"
          icon={<Shield size={18} className="text-orange-500" />}
          variant="glass"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <NetworkGraph data={networkData} className="md:col-span-1" />
        <ModelTrainingChart data={trainingProgress} className="md:col-span-1" />
      </div>
      
      <div className="mt-6">
        <PrivacyMetricsChart data={privacyMetrics} />
      </div>
      
      <div className="mt-6">
        <InstitutionsList institutions={institutions} />
      </div>
      
      <div className="mt-6">
        <PerformanceGrid 
          diagnosticMetrics={diagnosticMetrics}
          dataDistribution={dataDistribution}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;
