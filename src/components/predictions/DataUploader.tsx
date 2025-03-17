
import React, { useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dataset } from './MLPredictionSystem';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataUploaderProps {
  onDatasetUploaded: (dataset: Dataset) => void;
}

export const DataUploader = ({ onDatasetUploaded }: DataUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[] | null>(null);
  const [fullData, setFullData] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [targetColumn, setTargetColumn] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setError(null);
    
    // Check if it's a CSV file
    if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
      setError('Please upload a CSV file');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const csvData = event.target?.result as string;
        const lines = csvData.split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        // Process all data rows
        const allData = [];
        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === '') continue;
          
          const values = lines[i].split(',').map(val => val.trim());
          const row: Record<string, any> = {};
          
          headers.forEach((header, index) => {
            // Try to convert to number if possible
            const value = values[index];
            row[header] = isNaN(Number(value)) ? value : Number(value);
          });
          
          allData.push(row);
        }
        
        // Get preview data (first 5 rows only for display)
        const previewData = allData.slice(0, 5);
        
        setColumns(headers);
        setPreview(previewData);
        setFullData(allData);
        
        if (headers.length > 0) {
          setTargetColumn(headers[headers.length - 1]);
        }
        
      } catch (err) {
        console.error('Error parsing CSV:', err);
        setError('Error parsing CSV file. Please check format.');
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to parse CSV file. Please check the format.",
        });
      }
    };
    
    reader.readAsText(selectedFile);
  };

  const handleUpload = () => {
    if (!file || !fullData || !targetColumn) return;
    
    // Use the full dataset instead of just the preview
    const dataset: Dataset = {
      data: fullData,
      columns: columns,
      targetColumn: targetColumn,
      filename: file.name
    };
    
    onDatasetUploaded(dataset);
    toast({
      title: "Dataset uploaded successfully",
      description: `${dataset.filename} with ${dataset.data.length} rows and ${dataset.columns.length} columns`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div 
              className="border-2 border-dashed rounded-lg p-12 text-center hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Upload Dataset</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to upload a CSV file
              </p>
              <input
                id="file-upload"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button variant="outline" className="mx-auto">
                <FileText className="w-4 h-4 mr-2" />
                Select CSV File
              </Button>
              {file && (
                <p className="mt-4 text-sm font-medium">{file.name}</p>
              )}
              {error && (
                <div className="mt-4 p-2 bg-destructive/10 text-destructive rounded flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {preview && columns.length > 0 && (
          <Card className="col-span-1">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Dataset Preview</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Target Variable
                </label>
                <Select value={targetColumn} onValueChange={setTargetColumn}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target column" />
                  </SelectTrigger>
                  <SelectContent>
                    {columns.map(column => (
                      <SelectItem key={column} value={column}>
                        {column}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="max-h-60 overflow-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0">
                    <tr>
                      {columns.map(column => (
                        <th key={column} className="text-left p-2 border-b">
                          {column}
                          {column === targetColumn && 
                            <span className="ml-1 text-primary text-xs">(target)</span>
                          }
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index}>
                        {columns.map(column => (
                          <td key={`${index}-${column}`} className="p-2 border-b">
                            {row[column] !== undefined ? String(row[column]) : 'N/A'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing preview ({preview.length} of {fullData?.length || 0} rows)
                </p>
                <Button 
                  onClick={handleUpload}
                  disabled={!targetColumn}
                >
                  Use Dataset
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
