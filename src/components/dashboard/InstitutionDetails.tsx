
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building, 
  MapPin, 
  Users, 
  Shield, 
  FileText, 
  Database, 
  ClipboardCheck, 
  Settings, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Clock
} from 'lucide-react';

interface Institution {
  id: number;
  name: string;
  location: string;
  dataPoints: number;
  status: string;
  lastSync: string;
  accuracy: number;
  privacyScore: number;
}

interface InstitutionDetailsProps {
  institution: Institution;
}

const InstitutionDetails = ({ institution }: InstitutionDetailsProps) => {
  const [isActive, setIsActive] = useState(institution.status === 'active');
  
  const handleToggleStatus = () => {
    setIsActive(!isActive);
  };
  
  const recentEvents = [
    { id: 1, event: 'Model weights updated', time: '2 hours ago', status: 'success' },
    { id: 2, event: 'Privacy audit completed', time: '1 day ago', status: 'success' },
    { id: 3, event: 'Connection timeout', time: '3 days ago', status: 'error' },
    { id: 4, event: 'Data validation pending', time: '5 days ago', status: 'warning' },
  ];
  
  const dataCategories = [
    { category: 'Patient Demographics', count: 12500, approved: true },
    { category: 'Medical Imaging', count: 3200, approved: true },
    { category: 'Lab Results', count: 8700, approved: true },
    { category: 'Medication History', count: 6300, approved: false },
    { category: 'Clinical Notes', count: 4100, approved: false },
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'error':
        return <XCircle size={16} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={16} className="text-amber-500" />;
      default:
        return <Clock size={16} className="text-blue-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="h-16 w-16 bg-primary/10">
                <AvatarFallback className="text-xl">
                  {institution.name.split(' ').map(word => word[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle>{institution.name}</CardTitle>
                  <Badge variant={isActive ? 'default' : 'secondary'} className={isActive ? 'bg-green-500' : 'bg-slate-400'}>
                    {isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <CardDescription className="flex items-center mt-1">
                  <MapPin size={14} className="mr-1" /> {institution.location}
                </CardDescription>
                <div className="flex items-center gap-4 mt-2">
                  <span className="flex items-center text-sm">
                    <Database size={14} className="mr-1 text-blue-500" /> {institution.dataPoints.toLocaleString()} data points
                  </span>
                  <span className="flex items-center text-sm">
                    <Users size={14} className="mr-1 text-purple-500" /> 23 researchers
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit Details</Button>
              <Button 
                variant={isActive ? "destructive" : "default"} 
                size="sm"
                onClick={handleToggleStatus}
              >
                {isActive ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="overview" className="flex-1">
            <Building size={16} className="mr-2" /> Overview
          </TabsTrigger>
          <TabsTrigger value="data" className="flex-1">
            <Database size={16} className="mr-2" /> Data
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1">
            <Shield size={16} className="mr-2" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex-1">
            <FileText size={16} className="mr-2" /> Logs
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <ClipboardCheck size={16} className="text-primary" /> Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Model Accuracy</span>
                      <span className="font-medium">{(institution.accuracy * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={institution.accuracy * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Data Quality</span>
                      <span className="font-medium">87.2%</span>
                    </div>
                    <Progress value={87.2} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1 text-sm">
                      <span>Training Participation</span>
                      <span className="font-medium">94.5%</span>
                    </div>
                    <Progress value={94.5} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock size={16} className="text-primary" /> Recent Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-2 py-1">
                      {getStatusIcon(event.status)}
                      <div className="flex-1">
                        <div className="text-sm font-medium">{event.event}</div>
                        <div className="text-xs text-muted-foreground">{event.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="link" size="sm" className="ml-auto">View all events</Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Settings size={16} className="text-primary" /> Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium text-sm mb-2">Network Settings</h4>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex justify-between py-1 border-b">
                      <span>Connection Type:</span> 
                      <span className="font-medium text-foreground">Secure SSL</span>
                    </p>
                    <p className="flex justify-between py-1 border-b">
                      <span>Bandwidth Limit:</span> 
                      <span className="font-medium text-foreground">100 Mbps</span>
                    </p>
                    <p className="flex justify-between py-1 border-b">
                      <span>Protocol:</span> 
                      <span className="font-medium text-foreground">HTTPS</span>
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm mb-2">Learning Settings</h4>
                  <div className="text-sm text-muted-foreground">
                    <p className="flex justify-between py-1 border-b">
                      <span>Batch Size:</span> 
                      <span className="font-medium text-foreground">128</span>
                    </p>
                    <p className="flex justify-between py-1 border-b">
                      <span>Learning Rate:</span> 
                      <span className="font-medium text-foreground">0.001</span>
                    </p>
                    <p className="flex justify-between py-1 border-b">
                      <span>Training Schedule:</span> 
                      <span className="font-medium text-foreground">Daily at 02:00 UTC</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Edit Configuration</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Data Categories</CardTitle>
              <CardDescription>Data categories shared by this institution</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Data Points</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dataCategories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{category.category}</TableCell>
                      <TableCell>{category.count.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={category.approved ? 'default' : 'secondary'} className={category.approved ? 'bg-green-500' : 'bg-amber-500'}>
                          {category.approved ? 'Approved' : 'Pending Review'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Privacy Controls</CardTitle>
              <CardDescription>Privacy settings and differential privacy configurations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Privacy Score</span>
                    <span className="font-medium">{(institution.privacyScore * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={institution.privacyScore * 100} className="h-2" />
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 mt-6">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Privacy Settings</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex justify-between py-1 border-b">
                        <span>Differential Privacy:</span> 
                        <span className="font-medium text-foreground">Enabled</span>
                      </p>
                      <p className="flex justify-between py-1 border-b">
                        <span>Noise Level (ε):</span> 
                        <span className="font-medium text-foreground">0.8</span>
                      </p>
                      <p className="flex justify-between py-1 border-b">
                        <span>Clipping Threshold:</span> 
                        <span className="font-medium text-foreground">3.0</span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm mb-2">Compliance Status</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="flex justify-between py-1 border-b">
                        <span>HIPAA Compliance:</span> 
                        <span className="font-medium text-green-500">Verified</span>
                      </p>
                      <p className="flex justify-between py-1 border-b">
                        <span>GDPR Compliance:</span> 
                        <span className="font-medium text-green-500">Verified</span>
                      </p>
                      <p className="flex justify-between py-1 border-b">
                        <span>Last Audit:</span> 
                        <span className="font-medium text-foreground">Jun 15, 2023</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">Adjust Privacy Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="logs" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Logs</CardTitle>
              <CardDescription>Detailed logs of institution activity and model interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    {getStatusIcon(index % 3 === 0 ? 'error' : index % 2 === 0 ? 'warning' : 'success')}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                        <span className="font-medium">
                          {index % 3 === 0 
                            ? 'Connection timeout during model weight upload' 
                            : index % 2 === 0 
                              ? 'High latency detected during synchronization' 
                              : 'Model weights updated successfully'}
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(Date.now() - index * 3600000).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {index % 3 === 0 
                          ? 'Connection failed after 30s timeout. Retry scheduled in 5 minutes.' 
                          : index % 2 === 0 
                            ? 'Latency spike to 1200ms detected. Performance optimization recommended.' 
                            : 'Round 12 completed. New global model integration successful.'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" size="sm">Export Logs</Button>
              <Button variant="outline" size="sm">Load More</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InstitutionDetails;
