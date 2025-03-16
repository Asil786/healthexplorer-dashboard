
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MLPredictionSystem } from '@/components/predictions/MLPredictionSystem';
import { Card, CardContent } from '@/components/ui/card';

const Predictions = () => {
  return (
    <DashboardLayout
      title="ML Predictions"
      description="Predict & visualize using machine learning models"
    >
      <div className="container mx-auto p-2 sm:p-4">
        <Card className="border bg-card/60 backdrop-blur-sm">
          <CardContent className="p-0 sm:p-2 md:p-4">
            <MLPredictionSystem />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
