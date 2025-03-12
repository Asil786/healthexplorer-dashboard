
import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Lock, 
  FileText, 
  Clock, 
  ArrowUpRight,
  Search
} from 'lucide-react';
import { privacyData } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

const Privacy = () => {
  const { toast } = useToast();
  const { privacyScores, privacyAudits, epsilonValues, complianceStatus } = privacyData;
  
  const handleRunAudit = () => {
    toast({
      title: "Privacy audit started",
      description: "A new privacy audit has been initiated and will complete shortly.",
    });
  };
  
  return (
    <DashboardLayout 
      title="Privacy Controls" 
      description="Monitor and manage privacy guarantees for federated learning"
    >
      <div className="flex justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Privacy Controls</h2>
          <p className="text-muted-foreground">
            Monitor and enforce privacy guarantees for all sensitive healthcare data
          </p>
        </div>
        <Button onClick={handleRunAudit} className="flex items-center gap-2">
          <Shield size={18} />
          Run Privacy Audit
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="w-full space-y-6">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="overview" className="flex-1">
            <Shield className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="audits" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            Audit History
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex-1">
            <CheckCircle className="mr-2 h-4 w-4" />
            Compliance
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Privacy Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {(privacyScores[privacyScores.length - 1].score * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <ArrowUpRight className="h-3.5 w-3.5 text-green-500 mr-1" /> 
                  +{((privacyScores[privacyScores.length - 1].score - privacyScores[0].score) * 100).toFixed(1)}% improvement
                </div>
                <div className="mt-4">
                  <Progress 
                    value={privacyScores[privacyScores.length - 1].score * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Last Audit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold flex items-center">
                  {privacyAudits[0].status === 'passed' ? (
                    <CheckCircle className="h-7 w-7 text-green-500 mr-2" />
                  ) : privacyAudits[0].status === 'warning' ? (
                    <AlertTriangle className="h-7 w-7 text-amber-500 mr-2" />
                  ) : (
                    <AlertTriangle className="h-7 w-7 text-red-500 mr-2" />
                  )}
                  <span className="capitalize">{privacyAudits[0].status}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {privacyAudits[0].date} · {privacyAudits[0].issues} issues found
                </div>
                <div className="mt-4">
                  <Progress 
                    value={privacyAudits[0].score * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {complianceStatus.filter(c => c.status === 'compliant').length}/{complianceStatus.length}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Regulations in full compliance
                </div>
                <div className="mt-4">
                  <Progress 
                    value={(complianceStatus.filter(c => c.status === 'compliant').length / complianceStatus.length) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Privacy Score Trend</CardTitle>
              <CardDescription>Historical privacy preservation metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={privacyScores}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0.7, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                    <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#0088FE" name="Privacy Score" strokeWidth={2} />
                    <Line type="monotone" dataKey="threshold" stroke="#FF8042" name="Threshold" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Differential Privacy Settings</CardTitle>
                <CardDescription>Epsilon values by model (lower is more private)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={epsilonValues}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 1]} />
                      <YAxis dataKey="model" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="epsilon" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Privacy Protection Measures</CardTitle>
                <CardDescription>Active protection mechanisms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Differential Privacy</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Adds calibrated noise to data to ensure individual privacy while maintaining accuracy.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Secure Aggregation</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Combines model updates without revealing individual institution contributions.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Homomorphic Encryption</span>
                    </div>
                    <Badge variant="outline" className="bg-amber-100 text-amber-800">Partial</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Performs computations on encrypted data without decryption for sensitive operations.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium">Gradient Clipping</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Limits the influence of any single training example on the model.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Audit History</CardTitle>
              <CardDescription>Historical privacy audits and findings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Score</th>
                      <th className="text-left py-3 px-4">Issues</th>
                      <th className="text-left py-3 px-4">Auditor</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {privacyAudits.map((audit, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium">{audit.date}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={
                            audit.status === 'passed' 
                              ? 'bg-green-100 text-green-800' 
                              : audit.status === 'warning'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-red-100 text-red-800'
                          }>
                            <span className="flex items-center">
                              {audit.status === 'passed' 
                                ? <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                : <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                              }
                              <span className="capitalize">{audit.status}</span>
                            </span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{(audit.score * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4">{audit.issues}</td>
                        <td className="py-3 px-4">{audit.auditor}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            <Search className="h-3.5 w-3.5 mr-1" />
                            View Report
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Audit Score Trends</CardTitle>
                <CardDescription>Historical audit scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={privacyAudits.slice().reverse()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0.7, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                      <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                      <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Issue Tracking</CardTitle>
                <CardDescription>Privacy-related issues over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={privacyAudits.slice().reverse()}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="issues" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Latest Audit Findings</CardTitle>
              <CardDescription>Key findings from the most recent privacy audit</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Summary</h3>
                <p className="text-sm text-muted-foreground">
                  The most recent audit conducted on {privacyAudits[0].date} found {privacyAudits[0].issues} issues,
                  resulting in an overall privacy score of {(privacyAudits[0].score * 100).toFixed(1)}%.
                  This audit was conducted by {privacyAudits[0].auditor}.
                </p>
              </div>
              
              {privacyAudits[0].issues > 0 ? (
                <div className="space-y-2">
                  <h3 className="font-medium">Issues Found</h3>
                  <div className="space-y-2">
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                      <div className="flex items-center text-amber-800 font-medium">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Epsilon value too high in Diabetes Prediction model
                      </div>
                      <p className="text-sm text-amber-700 mt-1">
                        The differential privacy epsilon value (0.8) exceeds the recommended threshold (0.5) for highly sensitive healthcare data.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-md p-3">
                  <div className="flex items-center text-green-800 font-medium">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    No issues found
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    All privacy controls are properly implemented and functioning as expected.
                  </p>
                </div>
              )}
              
              <div className="space-y-2">
                <h3 className="font-medium">Recommendations</h3>
                <div className="bg-slate-50 p-4 rounded-md">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Reduce epsilon values for models handling particularly sensitive diagnostic data</li>
                    <li>Implement homomorphic encryption for all data transfers between institutions</li>
                    <li>Increase the frequency of automatic privacy audits to weekly</li>
                    <li>Update the privacy policy documentation to reflect recent changes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleRunAudit}>Schedule Next Audit</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Status</CardTitle>
              <CardDescription>Status for key healthcare data regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Regulation</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Score</th>
                      <th className="text-left py-3 px-4">Last Verified</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceStatus.map((compliance, index) => (
                      <tr key={index} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium">{compliance.regulation}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline" className={
                            compliance.status === 'compliant' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-amber-100 text-amber-800'
                          }>
                            <span className="flex items-center">
                              {compliance.status === 'compliant' 
                                ? <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                : <Clock className="h-3.5 w-3.5 mr-1" />
                              }
                              <span className="capitalize">{compliance.status}</span>
                            </span>
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{(compliance.score * 100).toFixed(1)}%</td>
                        <td className="py-3 px-4">{compliance.lastVerified}</td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            <FileText className="h-3.5 w-3.5 mr-1" />
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {complianceStatus.slice(0, 3).map((compliance, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{compliance.regulation}</CardTitle>
                    <Badge variant="outline" className={
                      compliance.status === 'compliant' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-amber-100 text-amber-800'
                    }>
                      <span className="capitalize">{compliance.status}</span>
                    </Badge>
                  </div>
                  <CardDescription>Last verified: {compliance.lastVerified}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Compliance Score</span>
                      <span className="text-sm font-medium">{(compliance.score * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={compliance.score * 100} className="h-2" />
                  </div>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Data minimization</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Consent management</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Right to be forgotten</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span>Breach notification</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    <Lock className="h-4 w-4 mr-2" />
                    View Compliance Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Documentation</CardTitle>
              <CardDescription>Required documentation for regulatory compliance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Document</th>
                      <th className="text-left py-3 px-4">Last Updated</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">Privacy Policy</td>
                      <td className="py-3 px-4">2023-10-05</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Current</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">Data Processing Agreement</td>
                      <td className="py-3 px-4">2023-09-22</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Current</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">Data Impact Assessment</td>
                      <td className="py-3 px-4">2023-10-05</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-800">Current</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-slate-50">
                      <td className="py-3 px-4 font-medium">Breach Response Plan</td>
                      <td className="py-3 px-4">2023-08-15</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-amber-100 text-amber-800">Review needed</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3.5 w-3.5 mr-1" />
                          View
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Privacy;
