
import React, { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InstitutionsList from '@/components/dashboard/InstitutionsList';
import InstitutionDetails from '@/components/dashboard/InstitutionDetails';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Settings, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { institutionsData } from '@/lib/data';

const Institutions = () => {
  const [selectedInstitution, setSelectedInstitution] = useState<number | null>(null);
  
  return (
    <DashboardLayout 
      title="Institutions Management" 
      description="Manage healthcare organizations participating in federated learning"
    >
      <div className="flex justify-between mb-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Institutions</h2>
          <p className="text-muted-foreground">
            Manage all participating healthcare organizations in your federated learning network
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle size={18} />
          Add Institution
        </Button>
      </div>
      
      <Tabs defaultValue="institutions" className="w-full space-y-6">
        <TabsList className="w-full max-w-md mb-2">
          <TabsTrigger value="institutions" className="flex-1">
            <FileText size={16} className="mr-2" /> Institutions
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex-1">
            <Shield size={16} className="mr-2" /> Permissions
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-1">
            <Settings size={16} className="mr-2" /> Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="institutions" className="space-y-6">
          {selectedInstitution === null ? (
            <InstitutionsList 
              institutions={institutionsData} 
              onSelectInstitution={(id) => setSelectedInstitution(id)}
            />
          ) : (
            <div className="space-y-4">
              <Button 
                variant="outline" 
                onClick={() => setSelectedInstitution(null)}
                className="mb-4"
              >
                Back to all institutions
              </Button>
              <InstitutionDetails 
                institution={institutionsData.find(i => i.id === selectedInstitution)!} 
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Access Permissions</CardTitle>
              <CardDescription>Configure which institutions can access specific data categories</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure institution-specific access controls and data sharing policies here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institution Network Settings</CardTitle>
              <CardDescription>Configure global settings for all participating institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure global institution settings, onboarding processes, and verification requirements here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Institutions;
