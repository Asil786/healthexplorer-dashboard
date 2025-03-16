
import React from 'react';
import { Dataset, ModelResult } from './MLPredictionSystem';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface FeatureImportanceProps {
  results: ModelResult[];
  dataset: Dataset;
}

export const FeatureImportance = ({ results, dataset }: FeatureImportanceProps) => {
  const [selectedModel, setSelectedModel] = useState<string>(results[0]?.model.type || '');
  
  // Get the selected model result
  const modelResult = results.find(r => r.model.type === selectedModel);
  
  // Prepare feature importance data for visualization
  const getFeatureImportanceData = () => {
    if (!modelResult?.featureImportance) return [];
    
    return Object.entries(modelResult.featureImportance)
      .map(([feature, importance]) => ({
        feature,
        importance: Number(importance),
      }))
      .sort((a, b) => b.importance - a.importance);
  };
  
  const featureImportanceData = getFeatureImportanceData();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Feature Importance</CardTitle>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {results.map((result) => (
                <SelectItem key={result.model.type} value={result.model.type}>
                  {result.model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer
              config={{
                importance: {
                  label: "Feature Importance",
                  theme: {
                    light: "#3b82f6",
                    dark: "#60a5fa",
                  },
                }
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featureImportanceData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 120, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis 
                    type="category" 
                    dataKey="feature" 
                    width={100}
                  />
                  <Tooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="importance" 
                    fill="var(--color-importance)" 
                    name="Importance" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          
          <div className="mt-6 bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Top Features</h4>
            <ul className="space-y-1">
              {featureImportanceData.slice(0, 3).map((item, i) => (
                <li key={item.feature} className="flex items-center">
                  <span className="font-mono bg-primary/10 text-primary px-2 py-0.5 rounded mr-2">
                    #{i + 1}
                  </span>
                  <span className="font-medium">{item.feature}:</span>
                  <span className="ml-2 text-muted-foreground">
                    {(item.importance * 100).toFixed(2)}% relative importance
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Features are ranked by their predictive power. Higher values indicate 
                stronger influence on the predictions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
