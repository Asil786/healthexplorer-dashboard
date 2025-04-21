
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { MLPredictionSystem } from '@/components/predictions/MLPredictionSystem';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, LineChart, Cpu } from 'lucide-react';

const Predictions = () => {
  return (
    <DashboardLayout
      title="ML Predictions"
      description="Predict & visualize using advanced machine learning models"
    >
      <div className="container mx-auto p-2 sm:p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Time-Series Analysis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms for analyzing data with years, months, days as inputs, 
                detecting seasonality and trends.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <LineChart className="mr-2 h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Accurate Predictions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Models including ARIMA, LSTM, and XGBoost with automatic feature engineering
                for high-accuracy forecasting.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Cpu className="mr-2 h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-medium">Model Evaluation</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Compare performance metrics across models and visualize feature importance
                to understand prediction drivers.
              </p>
            </CardContent>
          </Card>
        </div>
      
        <Card className="border bg-card/60 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-800/60">
          <CardHeader>
            <CardTitle>Advanced ML Prediction System</CardTitle>
            <CardDescription>
              Upload datasets with time-based features to leverage state-of-the-art forecasting capabilities
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 sm:p-2 md:p-4">
            <MLPredictionSystem />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Predictions;
