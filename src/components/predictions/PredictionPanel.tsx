import React, { useState } from 'react';
import { Dataset, ModelConfig } from './MLPredictionSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronRight, BarChart2, Database, LineChart } from 'lucide-react';

interface PredictionPanelProps {
  dataset: Dataset;
  models: ModelConfig[];
  onPredict: (inputValues: Record<string, any>, modelType: string) => {
    predictedValue: number;
    confidence: number;
  };
}

export const PredictionPanel = ({ dataset, models, onPredict }: PredictionPanelProps) => {
  const [selectedModel, setSelectedModel] = useState<string>(models[0]?.type || '');
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<{
    value: number;
    confidence: number;
    detail?: string;
  } | null>(null);

  const timeFeature = dataset.columns.find(
    col =>
      col.toLowerCase().includes('year') ||
      col.toLowerCase().includes('date') ||
      col.toLowerCase().includes('time')
  );

  const featureColumns = dataset.columns.filter(col => col !== dataset.targetColumn);

  const activeFeatureColumns = timeFeature ? [timeFeature] : featureColumns;

  const handleInputChange = (column: string, value: string) => {
    setInputValues({
      ...inputValues,
      [column]: value,
    });
  };

  const handlePredict = () => {
    const numericInputs: Record<string, any> = {};
    for (const [key, value] of Object.entries(inputValues)) {
      numericInputs[key] = isNaN(Number(value)) ? value : Number(value);
    }

    let detail = "";
    if (timeFeature && dataset.targetColumn) {
      detail = `Predicted value for ${dataset.targetColumn} in ${inputValues[timeFeature]}`;
    } else if (dataset.targetColumn) {
      detail = `Predicted ${dataset.targetColumn}`;
    }
    const result = onPredict(numericInputs, selectedModel);
    setPrediction({
      value: result.predictedValue,
      confidence: result.confidence,
      detail,
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

            <div className="space-y-4 pt-2">
              <h3 className="text-sm font-medium">
                {activeFeatureColumns.length === 1
                  ? `Enter ${activeFeatureColumns[0]}`
                  : "Enter Feature Values"}
              </h3>

              {activeFeatureColumns.map(column => (
                <div key={column}>
                  <Label htmlFor={`input-${column}`}>{column}</Label>
                  <Input
                    id={`input-${column}`}
                    placeholder={`Enter ${column}`}
                    value={inputValues[column] || ''}
                    onChange={(e) => handleInputChange(column, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handlePredict}
              className="w-full mt-4"
              disabled={activeFeatureColumns.some(col => !inputValues[col])}
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
                  <div className="text-sm font-medium">Features</div>
                  <div className="text-lg font-bold">
                    {featureColumns.length}
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-2">About this prediction</h4>
                <p className="text-sm text-muted-foreground">
                  This prediction was made using the {models.find(m => m.type === selectedModel)?.name} model. 
                  The confidence score indicates the model's certainty in this prediction.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center text-muted-foreground">
              <LineChart className="h-16 w-16 mb-4 text-muted" />
              <h3 className="text-lg font-medium mb-2">No Prediction Yet</h3>
              <p className="max-w-md">
                Enter your feature values and click the Predict button to see results.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
