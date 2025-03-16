
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MLPredictionSystem } from '@/components/predictions/MLPredictionSystem';

const Predictions = () => {
  return (
    <DashboardLayout
      title="ML Predictions"
      description="Predict & visualize using machine learning models"
    >
      <div className="container mx-auto p-4">
        <MLPredictionSystem />
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
