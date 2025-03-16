
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataUploader } from './DataUploader';
import { ModelSelection } from './ModelSelection';
import { PredictionPanel } from './PredictionPanel';
import { ModelEvaluation } from './ModelEvaluation';
import { DataVisualization } from './DataVisualization';
import { FeatureImportance } from './FeatureImportance';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export interface Dataset {
  data: any[];
  columns: string[];
  targetColumn?: string;
  filename: string;
}

export interface ModelConfig {
  name: string;
  type: 'knn' | 'decision_tree' | 'random_forest' | 'xgboost' | 'linear_regression';
  hyperparameters: Record<string, any>;
}

export interface ModelResult {
  model: ModelConfig;
  metrics: {
    rmse: number;
    mae: number;
    r2: number;
    accuracy?: number;
  };
  predictions: any[];
  featureImportance?: Record<string, number>;
}

export const MLPredictionSystem = () => {
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [models, setModels] = useState<ModelConfig[]>([]);
  const [results, setResults] = useState<ModelResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('upload');
  const { toast } = useToast();

  const handleDatasetUploaded = (newDataset: Dataset) => {
    setDataset(newDataset);
    toast({
      title: "Dataset uploaded successfully",
      description: `${newDataset.filename} with ${newDataset.data.length} rows and ${newDataset.columns.length} columns`,
    });
    setActiveTab('models');
  };

  const handleModelsConfigured = (selectedModels: ModelConfig[]) => {
    setModels(selectedModels);
    setLoading(true);
    
    // Simulate model training - in a real app, this would call a backend service
    setTimeout(() => {
      const mockResults: ModelResult[] = selectedModels.map(model => ({
        model,
        metrics: {
          rmse: Math.random() * 5,
          mae: Math.random() * 3,
          r2: Math.random() * 0.5 + 0.5,
          accuracy: Math.random() * 0.2 + 0.7,
        },
        predictions: [],
        featureImportance: dataset?.columns.reduce((acc, col) => {
          if (col !== dataset.targetColumn) {
            acc[col] = Math.random();
          }
          return acc;
        }, {} as Record<string, number>),
      }));
      
      setResults(mockResults);
      setLoading(false);
      toast({
        title: "Models trained successfully",
        description: `${selectedModels.length} models trained and evaluated`,
      });
      setActiveTab('evaluation');
    }, 2000);
  };

  const generatePrediction = (inputValues: Record<string, any>, modelType: string) => {
    // Mock prediction - this would call a trained model in a real app
    return {
      predictedValue: Math.round(Math.random() * 100) / 10,
      confidence: Math.random() * 0.3 + 0.7,
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Machine Learning Prediction System</CardTitle>
          <CardDescription>
            Upload your dataset, train models, visualize data, and make predictions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
              <TabsTrigger value="upload">Upload Data</TabsTrigger>
              <TabsTrigger value="models" disabled={!dataset}>Models</TabsTrigger>
              <TabsTrigger value="evaluation" disabled={results.length === 0}>Evaluation</TabsTrigger>
              <TabsTrigger value="visualization" disabled={!dataset}>Visualization</TabsTrigger>
              <TabsTrigger value="importance" disabled={results.length === 0}>Feature Importance</TabsTrigger>
              <TabsTrigger value="prediction" disabled={results.length === 0}>Predict</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="pt-4">
              <DataUploader onDatasetUploaded={handleDatasetUploaded} />
            </TabsContent>
            
            <TabsContent value="models" className="pt-4">
              {dataset && (
                <ModelSelection 
                  dataset={dataset} 
                  onModelsConfigured={handleModelsConfigured}
                  loading={loading}
                />
              )}
            </TabsContent>
            
            <TabsContent value="evaluation" className="pt-4">
              {results.length > 0 && (
                <ModelEvaluation results={results} />
              )}
            </TabsContent>
            
            <TabsContent value="visualization" className="pt-4">
              {dataset && (
                <DataVisualization dataset={dataset} />
              )}
            </TabsContent>
            
            <TabsContent value="importance" className="pt-4">
              {results.length > 0 && dataset && (
                <FeatureImportance results={results} dataset={dataset} />
              )}
            </TabsContent>
            
            <TabsContent value="prediction" className="pt-4">
              {results.length > 0 && dataset && (
                <PredictionPanel 
                  dataset={dataset} 
                  models={models}
                  onPredict={generatePrediction}
                />
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
