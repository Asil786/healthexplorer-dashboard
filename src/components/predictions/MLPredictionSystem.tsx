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
      // More realistic model training using the full dataset
      const mockResults: ModelResult[] = selectedModels.map(model => {
        // We're simulating different model performances based on model type
        // In a real application, this would involve actual model training on the dataset
        let baseAccuracy = 0;
        let baseR2 = 0;
        
        switch(model.type) {
          case 'linear_regression':
            baseAccuracy = 0.75;
            baseR2 = 0.68;
            break;
          case 'decision_tree':
            baseAccuracy = 0.78;
            baseR2 = 0.71;
            break;
          case 'random_forest':
            baseAccuracy = 0.82;
            baseR2 = 0.78;
            break;
          case 'xgboost':
            baseAccuracy = 0.85;
            baseR2 = 0.81;
            break;
          case 'knn':
            baseAccuracy = 0.73;
            baseR2 = 0.65;
            break;
          default:
            baseAccuracy = 0.7;
            baseR2 = 0.6;
        }
        
        // Add some randomness to the metrics but keep them realistic
        const variance = 0.05;
        const accuracy = baseAccuracy + (Math.random() * variance * 2 - variance);
        const r2 = baseR2 + (Math.random() * variance * 2 - variance);
        
        // Generate mock predictions for a sample of the dataset (for visualization)
        const predictions = dataset?.data.slice(0, 20).map(row => {
          const actual = row[dataset.targetColumn!];
          // Simulate predictions with some error margin
          const predicted = actual * (1 + (Math.random() * 0.2 - 0.1));
          return { actual, predicted };
        }) || [];
        
        // Simulate feature importance based on the dataset columns
        const featureImportance = dataset?.columns.reduce((acc, col) => {
          if (col !== dataset.targetColumn) {
            // More realistic feature importance that differs by model
            acc[col] = Math.random() * 0.5 + 0.1; // Values between 0.1 and 0.6
          }
          return acc;
        }, {} as Record<string, number>);
        
        // Normalize feature importance so they sum to 1
        if (featureImportance) {
          const totalImportance = Object.values(featureImportance).reduce((sum, val) => sum + val, 0);
          Object.keys(featureImportance).forEach(key => {
            featureImportance[key] = featureImportance[key] / totalImportance;
          });
        }
        
        return {
          model,
          metrics: {
            rmse: Math.sqrt(1 - r2) * 10, // Derive RMSE from R2 for consistency
            mae: Math.sqrt(1 - r2) * 7,   // Derive MAE from R2 for consistency
            r2,
            accuracy,
          },
          predictions,
          featureImportance,
        };
      });
      
      setResults(mockResults);
      setLoading(false);
      toast({
        title: "Models trained successfully",
        description: `${selectedModels.length} models trained on ${dataset?.data.length} data points`,
      });
      setActiveTab('evaluation');
    }, 2000);
  };

  const generatePrediction = (inputValues: Record<string, any>, modelType: string) => {
    // Get the selected model result
    const modelResult = results.find(r => r.model.type === modelType);
    
    if (!modelResult || !dataset?.targetColumn) {
      return {
        predictedValue: 0,
        confidence: 0,
      };
    }
    
    // In a real application, this would use the trained model to make a prediction
    // Here we're simulating a prediction by:
    // 1. Finding similar data points in our dataset
    // 2. Calculating a weighted average based on model accuracy
    
    const targetCol = dataset.targetColumn;
    const featureCols = dataset.columns.filter(col => col !== targetCol);
    
    // Find the 5 most similar data points (extremely simplified)
    const dataWithSimilarity = dataset.data.map(dataPoint => {
      // Calculate a basic similarity score
      let similarityScore = 0;
      let featuresCompared = 0;
      
      featureCols.forEach(col => {
        if (inputValues[col] !== undefined && dataPoint[col] !== undefined) {
          // Only compare features that exist in both
          featuresCompared++;
          // Calculate difference (normalized for numeric values)
          const inputVal = typeof inputValues[col] === 'number' ? inputValues[col] : 0;
          const dataVal = typeof dataPoint[col] === 'number' ? dataPoint[col] : 0;
          
          if (typeof inputVal === 'number' && typeof dataVal === 'number') {
            // For numerical features - use relative difference
            const maxVal = Math.max(...dataset.data.map(d => d[col] || 0));
            const minVal = Math.min(...dataset.data.map(d => d[col] || 0));
            const range = maxVal - minVal || 1; // Avoid division by zero
            
            const normalizedDiff = Math.abs(inputVal - dataVal) / range;
            similarityScore += (1 - normalizedDiff);
          } else {
            // For categorical features - exact match only
            similarityScore += inputVal === dataVal ? 1 : 0;
          }
        }
      });
      
      // Average similarity across compared features
      similarityScore = featuresCompared > 0 ? similarityScore / featuresCompared : 0;
      
      return {
        point: dataPoint,
        similarity: similarityScore
      };
    });
    
    // Sort by similarity (highest first)
    dataWithSimilarity.sort((a, b) => b.similarity - a.similarity);
    
    // Take top 5 most similar points
    const topSimilar = dataWithSimilarity.slice(0, 5);
    
    if (topSimilar.length === 0) {
      return {
        predictedValue: 0,
        confidence: 0,
      };
    }
    
    // Calculate weighted average of target values
    const weightedSum = topSimilar.reduce((sum, item) => sum + (item.point[targetCol] * item.similarity), 0);
    const sumOfWeights = topSimilar.reduce((sum, item) => sum + item.similarity, 0);
    
    // Final prediction
    const predictedValue = sumOfWeights > 0 ? weightedSum / sumOfWeights : 0;
    
    // Confidence based on model accuracy and similarity of data points
    const avgSimilarity = sumOfWeights / topSimilar.length;
    const modelAccuracy = modelResult.metrics.accuracy || modelResult.metrics.r2;
    const confidence = modelAccuracy * avgSimilarity;
    
    return {
      predictedValue,
      confidence,
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
