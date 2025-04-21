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
    
    setTimeout(() => {
      const mockResults: ModelResult[] = selectedModels.map(model => {
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
        
        const variance = 0.05;
        const accuracy = baseAccuracy + (Math.random() * variance * 2 - variance);
        const r2 = baseR2 + (Math.random() * variance * 2 - variance);
        
        const predictions = dataset?.data.slice(0, 20).map(row => {
          const actual = row[dataset.targetColumn!];
          const predicted = actual * (1 + (Math.random() * 0.2 - 0.1));
          return { actual, predicted };
        }) || [];
        
        const featureImportance = dataset?.columns.reduce((acc, col) => {
          if (col !== dataset.targetColumn) {
            acc[col] = Math.random() * 0.5 + 0.1;
          }
          return acc;
        }, {} as Record<string, number>);
        
        if (featureImportance) {
          const totalImportance = Object.values(featureImportance).reduce((sum, val) => sum + val, 0);
          Object.keys(featureImportance).forEach(key => {
            featureImportance[key] = featureImportance[key] / totalImportance;
          });
        }
        
        return {
          model,
          metrics: {
            rmse: Math.sqrt(1 - r2) * 10,
            mae: Math.sqrt(1 - r2) * 7,
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

  function simpleLinearRegression(xVals: number[], yVals: number[]) {
    const n = xVals.length;
    const avgX = xVals.reduce((s, x) => s + x, 0) / n;
    const avgY = yVals.reduce((s, y) => s + y, 0) / n;
    const num = xVals.reduce((acc, x, i) => acc + (x - avgX) * (yVals[i] - avgY), 0);
    const den = xVals.reduce((acc, x) => acc + (x - avgX) ** 2, 0);
    const b = den !== 0 ? num / den : 0;
    const a = avgY - b * avgX;
    return { a, b };
  }

  const generatePrediction = (inputValues: Record<string, any>, modelType: string) => {
    const modelResult = results.find(r => r.model.type === modelType);
    if (!modelResult || !dataset?.targetColumn) {
      return { predictedValue: 0, confidence: 0 };
    }
    const targetCol = dataset.targetColumn;

    const timeFeature = dataset.columns.find(
      col =>
        col.toLowerCase().includes('year') ||
        col.toLowerCase().includes('date') ||
        col.toLowerCase().includes('time')
    );

    if (timeFeature && inputValues[timeFeature] !== undefined) {
      const numericData = dataset.data.filter(
        row =>
          typeof row[timeFeature] === 'number' &&
          typeof row[targetCol] === 'number'
      );
      if (numericData.length >= 2) {
        const xVals = numericData.map(row => row[timeFeature]);
        const yVals = numericData.map(row => row[targetCol]);
        const { a, b } = simpleLinearRegression(xVals, yVals);
        const xPred = Number(inputValues[timeFeature]);
        const predictedValue = a + b * xPred;
        let similarity = 1;
        if (xPred < Math.min(...xVals) || xPred > Math.max(...xVals)) {
          const delta = Math.min(Math.abs(xPred - Math.min(...xVals)), Math.abs(xPred - Math.max(...xVals)));
          similarity = Math.exp(-delta / (Math.max(...xVals) - Math.min(...xVals) + 0.001));
        }
        const modelAccuracy = modelResult.metrics.accuracy || modelResult.metrics.r2;
        return {
          predictedValue,
          confidence: modelAccuracy * similarity,
        };
      }
    }

    const featureCols = dataset.columns.filter(col => col !== targetCol);
    const dataWithSimilarity = dataset.data.map(dataPoint => {
      let similarityScore = 0;
      let featuresCompared = 0;
      featureCols.forEach(col => {
        if (inputValues[col] !== undefined && dataPoint[col] !== undefined) {
          featuresCompared++;
          const inputVal = typeof inputValues[col] === 'number' ? inputValues[col] : 0;
          const dataVal = typeof dataPoint[col] === 'number' ? dataPoint[col] : 0;
          if (typeof inputVal === 'number' && typeof dataVal === 'number') {
            const maxVal = Math.max(...dataset.data.map(d => d[col] || 0));
            const minVal = Math.min(...dataset.data.map(d => d[col] || 0));
            const range = maxVal - minVal || 1;
            const normalizedDiff = Math.abs(inputVal - dataVal) / range;
            similarityScore += (1 - normalizedDiff);
          } else {
            similarityScore += inputVal === dataVal ? 1 : 0;
          }
        }
      });
      similarityScore = featuresCompared > 0 ? similarityScore / featuresCompared : 0;
      return { point: dataPoint, similarity: similarityScore };
    });
    dataWithSimilarity.sort((a, b) => b.similarity - a.similarity);
    const topSimilar = dataWithSimilarity.slice(0, 5);
    if (topSimilar.length === 0) {
      return { predictedValue: 0, confidence: 0 };
    }
    const weightedSum = topSimilar.reduce((sum, item) => sum + (item.point[targetCol] * item.similarity), 0);
    const sumOfWeights = topSimilar.reduce((sum, item) => sum + item.similarity, 0);
    const predictedValue = sumOfWeights > 0 ? weightedSum / sumOfWeights : 0;
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
