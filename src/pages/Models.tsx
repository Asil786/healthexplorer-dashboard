
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BrainCircuit, 
  Plus, 
  RefreshCw, 
  ArrowUpRight, 
  Shield, 
  BarChart3,
  BookOpen,
  Check,
  Clock,
  LayoutGrid,
  ListFilter,
  Eye
} from 'lucide-react';
import { modelsData, modelTrainingHistory } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'deployed':
      return 'bg-green-100 text-green-800';
    case 'training':
      return 'bg-blue-100 text-blue-800';
    case 'testing':
      return 'bg-amber-100 text-amber-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'deployed':
      return <Check className="h-4 w-4" />;
    case 'training':
      return <RefreshCw className="h-4 w-4" />;
    case 'testing':
      return <Eye className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const Models = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { toast } = useToast();
  
  const handleTrainModel = () => {
    toast({
      title: "Training started",
      description: "Model training has been queued and will begin shortly.",
    });
  };
  
  return (
    <DashboardLayout 
      title="Model Management" 
      description="Manage and monitor federated learning models"
    >
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Models</h2>
          <p className="text-muted-foreground">
            Manage all machine learning models in your federated learning system
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={18} />
          New Model
        </Button>
      </div>
      
      <Tabs defaultValue="models" className="w-full space-y-6">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="models" className="flex-1">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Models
          </TabsTrigger>
          <TabsTrigger value="training" className="flex-1">
            <BarChart3 className="mr-2 h-4 w-4" />
            Training History
          </TabsTrigger>
          <TabsTrigger value="documentation" className="flex-1">
            <BookOpen className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models" className="space-y-6">
          <div className="flex justify-between mb-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-muted' : ''}>
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-muted' : ''}>
                <ListFilter className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modelsData.map((model) => (
                <Card key={model.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{model.name}</CardTitle>
                        <CardDescription>{model.type}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(model.status)} variant="outline">
                        <span className="flex items-center">
                          {getStatusIcon(model.status)}
                          <span className="ml-1 capitalize">{model.status}</span>
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Version</span>
                      <span className="font-medium">{model.version}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Accuracy</span>
                        <span className="font-medium">{(model.accuracy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.accuracy * 100} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Privacy Score</span>
                        <span className="font-medium">{(model.privacy * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={model.privacy * 100} className="h-1.5" />
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Institutions</span>
                      <span className="font-medium">{model.institutions}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Trained</span>
                      <span className="font-medium">{model.lastTrained}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <div className="flex justify-between w-full">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" onClick={handleTrainModel}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Retrain
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Version</th>
                        <th className="text-left py-3 px-4">Accuracy</th>
                        <th className="text-left py-3 px-4">Last Trained</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelsData.map((model) => (
                        <tr key={model.id} className="border-b hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium">{model.name}</td>
                          <td className="py-3 px-4">{model.type}</td>
                          <td className="py-3 px-4">{model.version}</td>
                          <td className="py-3 px-4">{(model.accuracy * 100).toFixed(1)}%</td>
                          <td className="py-3 px-4">{model.lastTrained}</td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(model.status)} variant="outline">
                              <span className="flex items-center">
                                {getStatusIcon(model.status)}
                                <span className="ml-1 capitalize">{model.status}</span>
                              </span>
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                              <Button size="sm" onClick={handleTrainModel}>
                                <RefreshCw className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Training History</CardTitle>
              <CardDescription>Historical training performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={modelTrainingHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" domain={[0.7, 1]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 0.5]} />
                    <Tooltip formatter={(value, name) => [
                      name === 'loss' ? value.toFixed(2) : `${(value * 100).toFixed(1)}%`,
                      name === 'loss' ? 'Loss' : name === 'accuracy' ? 'Accuracy' : 'Privacy Score'
                    ]} />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#0088FE" name="Accuracy" strokeWidth={2} />
                    <Line yAxisId="right" type="monotone" dataKey="loss" stroke="#FF8042" name="Loss" strokeWidth={2} />
                    <Line yAxisId="left" type="monotone" dataKey="privacyScore" stroke="#00C49F" name="Privacy Score" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(modelTrainingHistory[modelTrainingHistory.length - 1].accuracy * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500 mr-1" /> 
                  +{((modelTrainingHistory[modelTrainingHistory.length - 1].accuracy - modelTrainingHistory[0].accuracy) * 100).toFixed(1)}% since start
                </div>
                <div className="mt-4">
                  <Progress value={modelTrainingHistory[modelTrainingHistory.length - 1].accuracy * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {modelTrainingHistory[modelTrainingHistory.length - 1].loss.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500 mr-1 rotate-180" /> 
                  -{(modelTrainingHistory[0].loss - modelTrainingHistory[modelTrainingHistory.length - 1].loss).toFixed(2)} since start
                </div>
                <div className="mt-4">
                  <Progress value={(1 - modelTrainingHistory[modelTrainingHistory.length - 1].loss) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Privacy Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(modelTrainingHistory[modelTrainingHistory.length - 1].privacyScore * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500 mr-1" /> 
                  +{((modelTrainingHistory[modelTrainingHistory.length - 1].privacyScore - modelTrainingHistory[0].privacyScore) * 100).toFixed(1)}% since start
                </div>
                <div className="mt-4">
                  <Progress value={modelTrainingHistory[modelTrainingHistory.length - 1].privacyScore * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="documentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Documentation</CardTitle>
              <CardDescription>Documentation and implementation details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Implementation Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Our federated learning models follow a strict implementation protocol to ensure privacy preservation and optimal performance.
                </p>
                <div className="bg-slate-50 p-4 rounded-md mt-2">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>All models must implement differential privacy with configurable epsilon values</li>
                    <li>Models should support secure aggregation for enhanced privacy</li>
                    <li>Gradient clipping and noise addition must be properly configured</li>
                    <li>Performance validation should use standardized metrics across institutions</li>
                    <li>All models must pass a privacy audit before deployment</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Supported Model Architectures</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="font-medium">CNN</div>
                    <div className="text-xs text-muted-foreground">For imaging</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="font-medium">Random Forest</div>
                    <div className="text-xs text-muted-foreground">For tabular data</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="font-medium">Gradient Boosting</div>
                    <div className="text-xs text-muted-foreground">For risk prediction</div>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-md">
                    <div className="font-medium">U-Net</div>
                    <div className="text-xs text-muted-foreground">For segmentation</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Privacy-Preserving Techniques</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-blue-600" />
                        <CardTitle className="text-md">Differential Privacy</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        Ensures that model outputs do not reveal information about individual training samples by adding calibrated noise during training.
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-2 text-green-600" />
                        <CardTitle className="text-md">Secure Aggregation</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">
                        Allows the aggregation of model updates from multiple institutions without revealing individual updates.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Models;
