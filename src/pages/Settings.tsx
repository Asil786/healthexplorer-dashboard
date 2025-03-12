
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { 
  Settings as SettingsIcon, 
  UserCircle, 
  Bell, 
  Shield, 
  KeyRound, 
  Lock,
  LogOut, 
  Upload,
  Save,
  ClipboardCheck,
  BrainCircuit,
  Database
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isEmailDigestEnabled, setIsEmailDigestEnabled] = useState(true);
  const [isDPEnabled, setIsDPEnabled] = useState(true);
  const [epsilonValue, setEpsilonValue] = useState(0.8);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your changes have been saved successfully.",
    });
  };
  
  return (
    <DashboardLayout 
      title="Settings" 
      description="Configure application preferences and account settings"
    >
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="account" className="flex-1">
            <UserCircle size={16} className="mr-2" /> Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-1">
            <Shield size={16} className="mr-2" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">
            <Bell size={16} className="mr-2" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="federation" className="flex-1">
            <BrainCircuit size={16} className="mr-2" /> Federation
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile details here</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>RL</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-2">
                    <Upload size={14} className="mr-2" /> Change Photo
                  </Button>
                </div>
                
                <div className="space-y-4 flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" defaultValue="Rebecca" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" defaultValue="Lee" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Email" defaultValue="rebecca.lee@research.org" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select defaultValue="admin">
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="researcher">Lead Researcher</SelectItem>
                        <SelectItem value="developer">ML Engineer</SelectItem>
                        <SelectItem value="privacy">Privacy Officer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="institution">Primary Institution</Label>
                    <Select defaultValue="central">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an institution" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="central">Central Research Hospital</SelectItem>
                        <SelectItem value="university">University Medical Center</SelectItem>
                        <SelectItem value="general">General Hospital</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="••••••••" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" />
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable 2FA for your account</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                  </div>
                  <Button variant="outline">
                    <KeyRound size={16} className="mr-2" /> Configure 2FA
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">
                <LogOut size={16} className="mr-2" /> Sign Out of All Devices
              </Button>
              <Button onClick={handleSaveSettings}>
                <Save size={16} className="mr-2" /> Update Security
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Differential Privacy Settings</CardTitle>
              <CardDescription>Configure privacy-preserving learning parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Enable Differential Privacy</div>
                  <div className="text-sm text-muted-foreground">
                    Apply differential privacy techniques to protect sensitive data during training
                  </div>
                </div>
                <Switch checked={isDPEnabled} onCheckedChange={setIsDPEnabled} />
              </div>
              
              <div className={!isDPEnabled ? "opacity-50 pointer-events-none" : ""}>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between">
                      <Label htmlFor="epsilon-value">Privacy Budget (ε)</Label>
                      <span className="text-sm font-medium">{epsilonValue.toFixed(1)}</span>
                    </div>
                    <Slider
                      id="epsilon-value"
                      min={0.1}
                      max={5}
                      step={0.1}
                      value={[epsilonValue]}
                      onValueChange={(values) => setEpsilonValue(values[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>More Privacy</span>
                      <span>More Accuracy</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="noise-mechanism">Noise Mechanism</Label>
                    <Select defaultValue="gaussian">
                      <SelectTrigger id="noise-mechanism">
                        <SelectValue placeholder="Select a noise mechanism" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gaussian">Gaussian</SelectItem>
                        <SelectItem value="laplacian">Laplacian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clipping-threshold">Gradient Clipping Threshold</Label>
                    <Select defaultValue="3.0">
                      <SelectTrigger id="clipping-threshold">
                        <SelectValue placeholder="Select a clipping threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.0">1.0</SelectItem>
                        <SelectItem value="2.0">2.0</SelectItem>
                        <SelectItem value="3.0">3.0</SelectItem>
                        <SelectItem value="4.0">4.0</SelectItem>
                        <SelectItem value="5.0">5.0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} disabled={!isDPEnabled}>
                <Save size={16} className="mr-2" /> Save Privacy Settings
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Sharing Preferences</CardTitle>
              <CardDescription>Control how your data is shared with the network</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Share Anonymized Metrics</div>
                    <div className="text-sm text-muted-foreground">
                      Share anonymized model performance metrics with the network
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Enable Data Minimization</div>
                    <div className="text-sm text-muted-foreground">
                      Only share essential information required for model training
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Allow Model Inspection</div>
                    <div className="text-sm text-muted-foreground">
                      Allow authorized administrators to inspect model behavior
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Data Categories for Training</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>Demographics</span>
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    </div>
                    <Switch defaultChecked disabled />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Imaging Data</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Lab Results</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Clinical Notes</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Medication History</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save size={16} className="mr-2" /> Save Sharing Preferences
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Enable Notifications</div>
                  <div className="text-sm text-muted-foreground">
                    Receive in-app notifications for important events
                  </div>
                </div>
                <Switch 
                  checked={isNotificationsEnabled} 
                  onCheckedChange={setIsNotificationsEnabled} 
                />
              </div>
              
              <div className={!isNotificationsEnabled ? "opacity-50 pointer-events-none" : ""}>
                <h3 className="text-sm font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Training cycle completed</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Model performance updates</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>New institution joined</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Privacy metrics alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>System maintenance</span>
                    <Switch />
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-medium">Email Digest</div>
                  <div className="text-sm text-muted-foreground">
                    Receive email summaries of important events
                  </div>
                </div>
                <Switch 
                  checked={isEmailDigestEnabled} 
                  onCheckedChange={setIsEmailDigestEnabled} 
                />
              </div>
              
              <div className={!isEmailDigestEnabled ? "opacity-50 pointer-events-none" : ""}>
                <div className="space-y-2">
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="digest-frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save size={16} className="mr-2" /> Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="federation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Federation Settings</CardTitle>
              <CardDescription>Configure federated learning parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Auto-Synchronization</div>
                    <div className="text-sm text-muted-foreground">
                      Automatically sync with the network on a schedule
                    </div>
                  </div>
                  <Switch 
                    checked={autoSyncEnabled} 
                    onCheckedChange={setAutoSyncEnabled} 
                  />
                </div>
                
                <div className={!autoSyncEnabled ? "opacity-50 pointer-events-none" : ""}>
                  <div className="space-y-2">
                    <Label htmlFor="sync-frequency">Synchronization Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger id="sync-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Federated Learning Configuration</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="aggregation-method">Aggregation Method</Label>
                  <Select defaultValue="fedavg">
                    <SelectTrigger id="aggregation-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fedavg">FedAvg</SelectItem>
                      <SelectItem value="fedprox">FedProx</SelectItem>
                      <SelectItem value="scaffold">SCAFFOLD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="local-epochs">Local Training Epochs</Label>
                  <Select defaultValue="5">
                    <SelectTrigger id="local-epochs">
                      <SelectValue placeholder="Select epochs" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="client-fraction">Client Participation Fraction</Label>
                  <div className="flex justify-between items-center">
                    <Slider
                      id="client-fraction"
                      min={0.1}
                      max={1}
                      step={0.1}
                      defaultValue={[0.8]}
                      className="flex-1 mr-4"
                    />
                    <span className="w-12 text-right font-medium">80%</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Model Distribution</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Encrypted Model Transfer</div>
                    <div className="text-sm text-muted-foreground">
                      Encrypt model weights during transfer between nodes
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Secure Aggregation</div>
                    <div className="text-sm text-muted-foreground">
                      Use secure aggregation protocol for privacy
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Compression</div>
                    <div className="text-sm text-muted-foreground">
                      Compress model updates to reduce bandwidth
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings}>
                <Save size={16} className="mr-2" /> Save Federation Settings
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Compliance Settings</CardTitle>
              <CardDescription>Configure regulatory compliance options</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">HIPAA Compliance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable strict HIPAA compliance features
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">GDPR Compliance Mode</div>
                    <div className="text-sm text-muted-foreground">
                      Enable GDPR compliance features
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="font-medium">Automated Compliance Reporting</div>
                    <div className="text-sm text-muted-foreground">
                      Generate automated compliance reports
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="flex items-center gap-2" onClick={handleSaveSettings}>
                <ClipboardCheck size={16} className="mr-2" /> Save Compliance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Settings;
