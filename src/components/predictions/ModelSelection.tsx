
import React, { useState } from 'react';
import { Dataset, ModelConfig } from './MLPredictionSystem';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Grid, LineChart, BrainCircuit, GitFork, ArrowUpRight, Clock, BarChart4 } from 'lucide-react';

interface ModelSelectionProps {
  dataset: Dataset;
  onModelsConfigured: (models: ModelConfig[]) => void;
  loading: boolean;
}

export const ModelSelection = ({ dataset, onModelsConfigured, loading }: ModelSelectionProps) => {
  // Check if dataset has time features
  const hasTimeFeatures = dataset.columns.some(col => 
    col.toLowerCase().includes('year') ||
    col.toLowerCase().includes('date') ||
    col.toLowerCase().includes('time') ||
    col.toLowerCase().includes('month') ||
    col.toLowerCase().includes('day')
  );

  // Define available models
  const [selectedModels, setSelectedModels] = useState<Record<string, boolean>>({
    knn: true,
    decision_tree: true,
    random_forest: true,
    xgboost: false,
    linear_regression: true,
    // Time series models
    lstm: hasTimeFeatures,
    arima: hasTimeFeatures,
    prophet: false,
  });
  
  const [hyperparameters, setHyperparameters] = useState({
    knn: { k: 5 },
    decision_tree: { max_depth: 5 },
    random_forest: { n_estimators: 100, max_depth: 10 },
    xgboost: { n_estimators: 100, learning_rate: 0.1 },
    linear_regression: {},
    // Time series hyperparameters
    lstm: { units: 64, epochs: 100, batch_size: 32 },
    arima: { p: 2, d: 1, q: 2 },
    prophet: { seasonality_mode: 'multiplicative', changepoint_prior_scale: 0.05 },
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
    
    // Traditional models
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
    
    // Time series models
    if (selectedModels.lstm) {
      models.push({
        name: 'LSTM Neural Network',
        type: 'lstm',
        hyperparameters: hyperparameters.lstm,
      });
    }
    
    if (selectedModels.arima) {
      models.push({
        name: 'ARIMA',
        type: 'arima',
        hyperparameters: hyperparameters.arima,
      });
    }
    
    if (selectedModels.prophet) {
      models.push({
        name: 'Prophet',
        type: 'prophet',
        hyperparameters: hyperparameters.prophet,
      });
    }
    
    onModelsConfigured(models);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Standard ML Models */}
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
        
        {/* Advanced Time Series Models */}
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
        
        {/* Time Series Models - Only show if dataset has time features */}
        {hasTimeFeatures && (
          <>
            <Card className={`col-span-1 ${!hasTimeFeatures ? 'opacity-50' : ''}`}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <BrainCircuit className="w-8 h-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium">LSTM Neural Network</h3>
                    <p className="text-sm text-muted-foreground">Deep learning for time series</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="lstm-select" 
                      checked={selectedModels.lstm}
                      onCheckedChange={(checked) => 
                        handleModelToggle('lstm', checked as boolean)
                      }
                      disabled={!hasTimeFeatures}
                    />
                    <Label htmlFor="lstm-select">Use this model</Label>
                  </div>
                  
                  {selectedModels.lstm && (
                    <div className="space-y-2 pl-6 pt-2">
                      <div>
                        <Label htmlFor="lstm-units">LSTM Units</Label>
                        <Input 
                          id="lstm-units"
                          type="number" 
                          value={hyperparameters.lstm.units} 
                          onChange={(e) => handleHyperparamChange('lstm', 'units', e.target.value)}
                          min={16}
                          max={256}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lstm-epochs">Epochs</Label>
                        <Input 
                          id="lstm-epochs"
                          type="number" 
                          value={hyperparameters.lstm.epochs} 
                          onChange={(e) => handleHyperparamChange('lstm', 'epochs', e.target.value)}
                          min={10}
                          max={500}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className={`col-span-1 ${!hasTimeFeatures ? 'opacity-50' : ''}`}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <Clock className="w-8 h-8 text-indigo-500" />
                  <div>
                    <h3 className="font-medium">ARIMA</h3>
                    <p className="text-sm text-muted-foreground">Statistical time series forecasting</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="arima-select" 
                      checked={selectedModels.arima}
                      onCheckedChange={(checked) => 
                        handleModelToggle('arima', checked as boolean)
                      }
                      disabled={!hasTimeFeatures}
                    />
                    <Label htmlFor="arima-select">Use this model</Label>
                  </div>
                  
                  {selectedModels.arima && (
                    <div className="space-y-2 pl-6 pt-2">
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <Label htmlFor="arima-p">p (AR)</Label>
                          <Input 
                            id="arima-p"
                            type="number" 
                            value={hyperparameters.arima.p} 
                            onChange={(e) => handleHyperparamChange('arima', 'p', e.target.value)}
                            min={0}
                            max={10}
                          />
                        </div>
                        <div>
                          <Label htmlFor="arima-d">d (I)</Label>
                          <Input 
                            id="arima-d"
                            type="number" 
                            value={hyperparameters.arima.d} 
                            onChange={(e) => handleHyperparamChange('arima', 'd', e.target.value)}
                            min={0}
                            max={2}
                          />
                        </div>
                        <div>
                          <Label htmlFor="arima-q">q (MA)</Label>
                          <Input 
                            id="arima-q"
                            type="number" 
                            value={hyperparameters.arima.q} 
                            onChange={(e) => handleHyperparamChange('arima', 'q', e.target.value)}
                            min={0}
                            max={10}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            <Card className={`col-span-1 ${!hasTimeFeatures ? 'opacity-50' : ''}`}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  <BarChart4 className="w-8 h-8 text-teal-500" />
                  <div>
                    <h3 className="font-medium">Prophet</h3>
                    <p className="text-sm text-muted-foreground">Facebook's forecasting tool</p>
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="prophet-select" 
                      checked={selectedModels.prophet}
                      onCheckedChange={(checked) => 
                        handleModelToggle('prophet', checked as boolean)
                      }
                      disabled={!hasTimeFeatures}
                    />
                    <Label htmlFor="prophet-select">Use this model</Label>
                  </div>
                  
                  {selectedModels.prophet && (
                    <div className="space-y-2 pl-6 pt-2">
                      <div>
                        <Label htmlFor="prophet-seasonality">Seasonality Mode</Label>
                        <Input 
                          id="prophet-seasonality"
                          type="text" 
                          value={hyperparameters.prophet.seasonality_mode as string} 
                          onChange={(e) => handleHyperparamChange('prophet', 'seasonality_mode', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="prophet-changepoint">Changepoint Prior Scale</Label>
                        <Input 
                          id="prophet-changepoint"
                          type="number" 
                          value={hyperparameters.prophet.changepoint_prior_scale} 
                          onChange={(e) => handleHyperparamChange('prophet', 'changepoint_prior_scale', e.target.value)}
                          min={0.001}
                          max={0.5}
                          step={0.001}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
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
      
      {/* Information note about time series models */}
      {hasTimeFeatures && (
        <div className="bg-muted rounded-lg p-4 text-sm">
          <h4 className="font-medium flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Time Series Features Detected
          </h4>
          <p className="mt-1">
            Your dataset contains time-related columns. Advanced time series models (LSTM, ARIMA, Prophet) 
            are now available and will take into account seasonality, trends and temporal patterns.
          </p>
        </div>
      )}
    </div>
  );
};
