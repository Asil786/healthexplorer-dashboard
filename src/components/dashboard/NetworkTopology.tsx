
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { GitBranch, Plus, Minus, GitFork, GitMerge, Download } from 'lucide-react';

interface NetworkTopologyProps {
  data: {
    nodes: {
      id: number;
      name: string;
      type: string;
    }[];
    links: {
      source: number;
      target: number;
      value: number;
    }[];
  };
}

const NetworkTopology = ({ data }: NetworkTopologyProps) => {
  const [viewMode, setViewMode] = useState('hierarchical');
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 10, 150));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 10, 50));
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <GitBranch size={18} className="text-indigo-400" />
              Network Topology
            </CardTitle>
            <CardDescription>Visualize the structure and connections of your federated learning network</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="View Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hierarchical">Hierarchical</SelectItem>
                <SelectItem value="circular">Circular</SelectItem>
                <SelectItem value="force">Force-Directed</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center border rounded-md border-slate-700">
              <Button variant="ghost" size="icon" onClick={handleZoomOut}>
                <Minus size={16} />
              </Button>
              <span className="px-2 text-sm text-slate-300">{zoomLevel}%</span>
              <Button variant="ghost" size="icon" onClick={handleZoomIn}>
                <Plus size={16} />
              </Button>
            </div>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="h-[500px] w-full border rounded-md p-4 flex flex-col items-center justify-center bg-slate-900/40 border-slate-700 relative"
          style={{ transform: `scale(${zoomLevel / 100})`, transition: 'transform 0.3s' }}
        >
          <div className="relative w-full h-full">
            {/* This would be replaced with an actual visualization library implementation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-900/30">
                Server
              </div>
              <div className="flex gap-8 mt-20">
                {data.nodes.filter(node => node.type === 'institution').slice(0, 3).map(node => (
                  <div key={node.id} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm shadow-lg shadow-emerald-900/30">
                      H{node.id}
                    </div>
                    <div className="mt-2 text-xs font-medium text-slate-300">{node.name}</div>
                  </div>
                ))}
              </div>
              {viewMode === 'hierarchical' && (
                <div className="flex gap-8 mt-16">
                  {data.nodes.filter(node => node.type === 'institution').slice(3, 6).map(node => (
                    <div key={node.id} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm shadow-lg shadow-emerald-900/30">
                        H{node.id}
                      </div>
                      <div className="mt-2 text-xs font-medium text-slate-300">{node.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border rounded-md p-3 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <GitFork size={16} className="text-indigo-400" />
              <span className="text-sm font-medium text-slate-200">Network Type</span>
            </div>
            <div className="text-2xl font-semibold text-slate-100">Star Topology</div>
            <div className="text-xs text-slate-400 mt-1">Central server with institution nodes</div>
          </div>
          <div className="border rounded-md p-3 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <GitMerge size={16} className="text-emerald-400" />
              <span className="text-sm font-medium text-slate-200">Connection Paths</span>
            </div>
            <div className="text-2xl font-semibold text-slate-100">{data.links.length}</div>
            <div className="text-xs text-slate-400 mt-1">Direct connections between nodes</div>
          </div>
          <div className="border rounded-md p-3 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Plus size={16} className="text-purple-400" />
              <span className="text-sm font-medium text-slate-200">Nodes</span>
            </div>
            <div className="text-2xl font-semibold text-slate-100">{data.nodes.length}</div>
            <div className="text-xs text-slate-400 mt-1">Total participants in network</div>
          </div>
          <div className="border rounded-md p-3 bg-slate-800/50 border-slate-700">
            <div className="flex items-center gap-2 mb-2">
              <Download size={16} className="text-amber-400" />
              <span className="text-sm font-medium text-slate-200">Data Flow</span>
            </div>
            <div className="text-2xl font-semibold text-slate-100">Bidirectional</div>
            <div className="text-xs text-slate-400 mt-1">Model weights & updates exchange</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkTopology;
