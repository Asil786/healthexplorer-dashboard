
import React from 'react';
import { ModelResult } from './MLPredictionSystem';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface ModelEvaluationProps {
  results: ModelResult[];
}

export const ModelEvaluation = ({ results }: ModelEvaluationProps) => {
  // Sort models by R² (best first)
  const sortedResults = [...results].sort((a, b) => b.metrics.r2 - a.metrics.r2);
  
  // Format metrics data for the bar chart
  const metricsChartData = results.map(result => ({
    name: result.model.name,
    RMSE: result.metrics.rmse,
    MAE: result.metrics.mae,
    R2: result.metrics.r2,
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={metricsChartData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="RMSE" fill="#8884d8" name="RMSE (lower is better)" />
                  <Bar dataKey="MAE" fill="#82ca9d" name="MAE (lower is better)" />
                  <Bar dataKey="R2" fill="#ffc658" name="R² (higher is better)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Model Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model</TableHead>
                  <TableHead>RMSE</TableHead>
                  <TableHead>MAE</TableHead>
                  <TableHead>R²</TableHead>
                  <TableHead>Rank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedResults.map((result, index) => (
                  <TableRow key={result.model.type}>
                    <TableCell className="font-medium">{result.model.name}</TableCell>
                    <TableCell>{result.metrics.rmse.toFixed(4)}</TableCell>
                    <TableCell>{result.metrics.mae.toFixed(4)}</TableCell>
                    <TableCell>{result.metrics.r2.toFixed(4)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={index === 0 ? "default" : index < 2 ? "secondary" : "outline"}
                      >
                        {index + 1}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Best Model</h4>
              <div className="bg-muted p-3 rounded-md">
                <p className="font-medium">{sortedResults[0]?.model.name}</p>
                <p className="text-sm text-muted-foreground">
                  {Object.entries(sortedResults[0]?.model.hyperparameters || {}).map(([key, value]) => (
                    <span key={key} className="mr-3">{key}: {value}</span>
                  ))}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
