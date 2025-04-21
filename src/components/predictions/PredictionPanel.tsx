
import React, { useState } from 'react';
import { Dataset, ModelConfig } from './MLPredictionSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, BarChart2, Database, LineChart, Calendar } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface PredictionPanelProps {
  dataset: Dataset;
  models: ModelConfig[];
  onPredict: (inputValues: Record<string, any>, modelType: string) => {
    predictedValue: number;
    confidence: number;
    featureImportance?: Record<string, number>;
  };
}

export const PredictionPanel = ({ dataset, models, onPredict }: PredictionPanelProps) => {
  const { toast } = useToast();
  
  // Identify time-based features
  const timeFeatures = dataset.columns.filter(
    col =>
      col.toLowerCase().includes('year') ||
      col.toLowerCase().includes('date') ||
      col.toLowerCase().includes('time') ||
      col.toLowerCase().includes('month') ||
      col.toLowerCase().includes('day')
  );
  
  // Identify the main feature for prediction (time-based or fallback)
  const nonTimeFeatures = dataset.columns.filter(
    col => 
      col !== dataset.targetColumn && 
      !timeFeatures.includes(col)
  ).slice(0, 3); // Limit to 3 additional features for simplicity
  
  // All features we'll use for prediction input
  const predictionFeatures = [...timeFeatures, ...nonTimeFeatures].slice(0, 5);
  
  const [selectedModel, setSelectedModel] = useState<string>(models[0]?.type || '');
  const [featureValues, setFeatureValues] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<{
    value: number;
    confidence: number;
    featureImportance?: Record<string, number>;
    detail?: string;
  } | null>(null);

  const handleFeatureValueChange = (feature: string, value: string) => {
    setFeatureValues(prev => ({
      ...prev,
      [feature]: value
    }));
  };

  const handlePredict = () => {
    if (predictionFeatures.length === 0) {
      toast({
        title: "Prediction Error",
        description: "No features available for prediction",
        variant: "destructive"
      });
      return;
    }
    
    // Convert input values to appropriate types
    const inputObj: Record<string, any> = {};
    
    predictionFeatures.forEach(feature => {
      const value = featureValues[feature];
      if (value !== undefined && value !== '') {
        // Convert to number if possible
        inputObj[feature] = isNaN(Number(value)) ? value : Number(value);
      }
    });
    
    // Check if we have at least one feature value
    if (Object.keys(inputObj).length === 0) {
      toast({
        title: "Missing Input",
        description: "Please provide at least one feature value for prediction",
        variant: "destructive"
      });
      return;
    }

    let detail = '';
    if (dataset.targetColumn) {
      const mainFeature = Object.keys(inputObj)[0] || '';
      detail = mainFeature ? 
        `Predicted ${dataset.targetColumn} for ${mainFeature} "${featureValues[mainFeature]}"` :
        `Predicted ${dataset.targetColumn}`;
      
      if (Object.keys(inputObj).length > 1) {
        detail += " with multiple features";
      }
    }
    
    const result = onPredict(inputObj, selectedModel);
    setPrediction({
      value: result.predictedValue,
      confidence: result.confidence,
      featureImportance: result.featureImportance,
      detail,
    });
    
    toast({
      title: "Prediction Generated",
      description: `${selectedModel} model prediction complete`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Make Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="model-select">Select Model</Label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger id="model-select">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {models.map(model => (
                    <SelectItem key={model.type} value={model.type}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Feature inputs */}
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                Time Features & Parameters
              </h3>
              <div className="space-y-3">
                {timeFeatures.map(feature => (
                  <div key={feature} className="space-y-1">
                    <Label htmlFor={`input-${feature}`}>
                      {feature}
                    </Label>
                    <Input
                      id={`input-${feature}`}
                      placeholder={`Enter ${feature}`}
                      value={featureValues[feature] || ''}
                      onChange={e => handleFeatureValueChange(feature, e.target.value)}
                    />
                  </div>
                ))}
                
                {timeFeatures.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No time-based features detected in dataset
                  </p>
                )}
              </div>
            </div>
            
            <div className="pt-2">
              <h3 className="text-sm font-medium mb-2 flex items-center">
                <Database className="mr-1 h-4 w-4" />
                Other Features
              </h3>
              <div className="space-y-3">
                {nonTimeFeatures.slice(0, 3).map(feature => (
                  <div key={feature} className="space-y-1">
                    <Label htmlFor={`input-${feature}`}>
                      {feature}
                    </Label>
                    <Input
                      id={`input-${feature}`}
                      placeholder={`Enter ${feature}`}
                      value={featureValues[feature] || ''}
                      onChange={e => handleFeatureValueChange(feature, e.target.value)}
                    />
                  </div>
                ))}
                
                {nonTimeFeatures.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    No additional features available
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handlePredict}
              className="w-full mt-4"
              disabled={Object.keys(featureValues).length === 0}
            >
              Predict <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Prediction Results</CardTitle>
        </CardHeader>
        <CardContent>
          {prediction ? (
            <div className="space-y-6">
              <div className="text-center p-6 border rounded-lg bg-muted/50">
                <h3 className="text-lg font-medium mb-2">
                  {prediction.detail || `Predicted ${dataset.targetColumn}`}
                </h3>
                <div className="text-4xl font-bold text-primary">
                  {prediction.value.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  Confidence: {(prediction.confidence * 100).toFixed(1)}%
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <BarChart2 className="h-8 w-8 text-blue-500 mb-2" />
                  <div className="text-sm font-medium">Accuracy</div>
                  <div className="text-lg font-bold">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 text-green-500 mb-2" />
                  <div className="text-sm font-medium">Data Points</div>
                  <div className="text-lg font-bold">
                    {dataset.data.length}
                  </div>
                </div>
                
                <div className="flex flex-col items-center p-4 border rounded-lg">
                  <LineChart className="h-8 w-8 text-purple-500 mb-2" />
                  <div className="text-sm font-medium">Features Used</div>
                  <div className="text-lg font-bold">
                    {Object.keys(featureValues).filter(k => featureValues[k] !== '').length}
                  </div>
                </div>
              </div>
              
              {/* Feature Importance */}
              {prediction.featureImportance && (
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Feature Importance</h4>
                  <div className="space-y-2">
                    {Object.entries(prediction.featureImportance)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 5)
                      .map(([feature, importance]) => (
                        <div key={feature} className="flex items-center">
                          <div className="text-xs w-24 truncate">{feature}</div>
                          <div className="flex-1 mx-2">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${Math.max(importance * 100, 5)}%` }} 
                              />
                            </div>
                          </div>
                          <div className="text-xs font-medium w-12 text-right">
                            {(importance * 100).toFixed(1)}%
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">About this prediction</h4>
                <p className="text-sm text-muted-foreground">
                  This prediction was made using the {models.find(m => m.type === selectedModel)?.name} model.
                  The confidence score indicates the model's certainty in this prediction based on time series analysis and feature engineering.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
              <LineChart className="h-16 w-16 mb-4 text-muted" />
              <h3 className="text-lg font-medium mb-2">No Prediction Yet</h3>
              <p className="max-w-md">
                Enter feature values and click Predict to see the result.
                Including time-based features will improve accuracy.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
