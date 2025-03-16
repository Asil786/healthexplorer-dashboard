
import React, { useState } from 'react';
import { Dataset, ModelConfig } from './MLPredictionSystem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Grid, LineChart, BrainCircuit, GitFork, ArrowUpRight } from 'lucide-react';

interface ModelSelectionProps {
  dataset: Dataset;
  onModelsConfigured: (models: ModelConfig[]) => void;
  loading: boolean;
}

export const ModelSelection = ({ dataset, onModelsConfigured, loading }: ModelSelectionProps) => {
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({
    knn: true,
    decision_tree: true,
    random_forest: true,
    xgboost: false,
    linear_regression: true,
  });
  
  const [hyperparameters, setHyperparameters] = useState({
    knn: { k: 5 },
    decision_tree: { max_depth: 5 },
    random_forest: { n_estimators: 100, max_depth: 10 },
    xgboost: { n_estimators: 100, learning_rate: 0.1 },
    linear_regression: {},
  });

  const handleModelToggle = (modelName: string, checked: boolean) => {
    setSelectedModels({
      ...selectedModels,
      [modelName]: checked,
    });
  };

  const handleHyperparamChange = (
    modelName: string, 
    paramName: string, 
    value: string
  ) => {
    setHyperparameters({
      ...hyperparameters,
      [modelName]: {
        ...hyperparameters[modelName as keyof typeof hyperparameters],
        [paramName]: isNaN(Number(value)) ? value : Number(value),
      },
    });
  };

  const handleTrainModels = () => {
    const models: ModelConfig[] = [];
    
    if (selectedModels.knn) {
      models.push({
        name: 'K-Nearest Neighbors',
        type: 'knn',
        hyperparameters: hyperparameters.knn,
      });
    }
    
    if (selectedModels.decision_tree) {
      models.push({
        name: 'Decision Tree',
        type: 'decision_tree',
        hyperparameters: hyperparameters.decision_tree,
      });
    }
    
    if (selectedModels.random_forest) {
      models.push({
        name: 'Random Forest',
        type: 'random_forest',
        hyperparameters: hyperparameters.random_forest,
      });
    }
    
    if (selectedModels.xgboost) {
      models.push({
        name: 'XGBoost',
        type: 'xgboost',
        hyperparameters: hyperparameters.xgboost,
      });
    }
    
    if (selectedModels.linear_regression) {
      models.push({
        name: 'Linear Regression',
        type: 'linear_regression',
        hyperparameters: hyperparameters.linear_regression,
      });
    }
    
    onModelsConfigured(models);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <Grid className="w-8 h-8 text-blue-500" />
              <div>
                <h3 className="font-medium">K-Nearest Neighbors</h3>
                <p className="text-sm text-muted-foreground">Distance-based classification/regression</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="knn-select" 
                  checked={selectedModels.knn}
                  onCheckedChange={(checked) => 
                    handleModelToggle('knn', checked as boolean)
                  }
                />
                <Label htmlFor="knn-select">Use this model</Label>
              </div>
              
              {selectedModels.knn && (
                <div className="space-y-2 pl-6 pt-2">
                  <div>
                    <Label htmlFor="knn-k">k (neighbors)</Label>
                    <Input 
                      id="knn-k"
                      type="number" 
                      value={hyperparameters.knn.k} 
                      onChange={(e) => handleHyperparamChange('knn', 'k', e.target.value)}
                      min={1}
                      max={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <LineChart className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-medium">Decision Tree</h3>
                <p className="text-sm text-muted-foreground">Tree-based decision rules</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dt-select" 
                  checked={selectedModels.decision_tree}
                  onCheckedChange={(checked) => 
                    handleModelToggle('decision_tree', checked as boolean)
                  }
                />
                <Label htmlFor="dt-select">Use this model</Label>
              </div>
              
              {selectedModels.decision_tree && (
                <div className="space-y-2 pl-6 pt-2">
                  <div>
                    <Label htmlFor="dt-depth">Max Depth</Label>
                    <Input 
                      id="dt-depth"
                      type="number" 
                      value={hyperparameters.decision_tree.max_depth} 
                      onChange={(e) => handleHyperparamChange('decision_tree', 'max_depth', e.target.value)}
                      min={1}
                      max={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <GitFork className="w-8 h-8 text-purple-500" />
              <div>
                <h3 className="font-medium">Random Forest</h3>
                <p className="text-sm text-muted-foreground">Ensemble of decision trees</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rf-select" 
                  checked={selectedModels.random_forest}
                  onCheckedChange={(checked) => 
                    handleModelToggle('random_forest', checked as boolean)
                  }
                />
                <Label htmlFor="rf-select">Use this model</Label>
              </div>
              
              {selectedModels.random_forest && (
                <div className="space-y-2 pl-6 pt-2">
                  <div>
                    <Label htmlFor="rf-estimators">N Estimators</Label>
                    <Input 
                      id="rf-estimators"
                      type="number" 
                      value={hyperparameters.random_forest.n_estimators} 
                      onChange={(e) => handleHyperparamChange('random_forest', 'n_estimators', e.target.value)}
                      min={10}
                      max={500}
                    />
                  </div>
                  <div>
                    <Label htmlFor="rf-depth">Max Depth</Label>
                    <Input 
                      id="rf-depth"
                      type="number" 
                      value={hyperparameters.random_forest.max_depth} 
                      onChange={(e) => handleHyperparamChange('random_forest', 'max_depth', e.target.value)}
                      min={1}
                      max={30}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <BrainCircuit className="w-8 h-8 text-yellow-500" />
              <div>
                <h3 className="font-medium">XGBoost</h3>
                <p className="text-sm text-muted-foreground">Gradient boosting algorithm</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="xgb-select" 
                  checked={selectedModels.xgboost}
                  onCheckedChange={(checked) => 
                    handleModelToggle('xgboost', checked as boolean)
                  }
                />
                <Label htmlFor="xgb-select">Use this model</Label>
              </div>
              
              {selectedModels.xgboost && (
                <div className="space-y-2 pl-6 pt-2">
                  <div>
                    <Label htmlFor="xgb-estimators">N Estimators</Label>
                    <Input 
                      id="xgb-estimators"
                      type="number" 
                      value={hyperparameters.xgboost.n_estimators} 
                      onChange={(e) => handleHyperparamChange('xgboost', 'n_estimators', e.target.value)}
                      min={10}
                      max={500}
                    />
                  </div>
                  <div>
                    <Label htmlFor="xgb-lr">Learning Rate</Label>
                    <Input 
                      id="xgb-lr"
                      type="number" 
                      value={hyperparameters.xgboost.learning_rate} 
                      onChange={(e) => handleHyperparamChange('xgboost', 'learning_rate', e.target.value)}
                      min={0.01}
                      max={1}
                      step={0.01}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <ArrowUpRight className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="font-medium">Linear Regression</h3>
                <p className="text-sm text-muted-foreground">Simple linear model</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="lr-select" 
                  checked={selectedModels.linear_regression}
                  onCheckedChange={(checked) => 
                    handleModelToggle('linear_regression', checked as boolean)
                  }
                />
                <Label htmlFor="lr-select">Use this model</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center pt-4">
        <Button 
          onClick={handleTrainModels} 
          disabled={loading || !Object.values(selectedModels).some(v => v)}
          className="w-full sm:w-auto"
        >
          {loading ? 'Training Models...' : 'Train Selected Models'}
        </Button>
      </div>
    </div>
  );
};
