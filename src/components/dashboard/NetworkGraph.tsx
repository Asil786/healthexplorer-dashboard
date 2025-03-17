
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Network, Server, Lock, Activity } from 'lucide-react';
import * as d3 from 'd3';

interface CustomNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  type: string;
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
}

interface CustomLink extends d3.SimulationLinkDatum<CustomNode> {
  source: number | CustomNode;
  target: number | CustomNode;
  value: number;
}

interface NetworkGraphProps {
  data: {
    nodes: CustomNode[];
    links: CustomLink[];
  };
  className?: string;
}

const NetworkGraph = ({ data, className }: NetworkGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [linkDistance, setLinkDistance] = useState(100);
  const [layoutType, setLayoutType] = useState('radial');
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 400;
    
    svg.selectAll("*").remove();
    
    // Create a simulation with several forces
    const simulation = d3.forceSimulation(data.nodes as CustomNode[])
      .force("link", d3.forceLink(data.links).id((d: any) => d.id).distance(linkDistance))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", layoutType === 'radial' 
        ? d3.forceRadial(width / 3, width / 2, height / 2) 
        : d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40));
      
    // Create links
    const link = svg.append("g")
      .attr("stroke", "rgba(99, 102, 241, 0.4)")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) / 10);
      
    // Create node groups
    const node = svg.append("g")
      .selectAll(".node")
      .data(data.nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag<SVGGElement, CustomNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );
      
    // Add circle for each node
    node.append("circle")
      .attr("r", (d: CustomNode) => d.type === 'server' ? 20 : 15)
      .attr("fill", (d: CustomNode) => d.type === 'server' ? "#6366f1" : "#10b981")
      .attr("stroke", "#1e293b")
      .attr("stroke-width", 2);
      
    // Add icon for each node
    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("fill", "#fff")
      .text((d: CustomNode) => d.type === 'server' ? "S" : "H");
      
    // Add label for each node
    node.append("text")
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .attr("font-size", "10px")
      .attr("fill", "#cbd5e1")
      .text((d: CustomNode) => d.name);
      
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
        
      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });
    
    // Drag functions
    function dragstarted(event: any, d: CustomNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: any, d: CustomNode) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: any, d: CustomNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return () => {
      simulation.stop();
    };
  }, [data, linkDistance, layoutType]);
  
  const handleLinkDistanceChange = (value: number[]) => {
    setLinkDistance(value[0]);
  };
  
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Network size={18} className="text-indigo-400" />
              Federation Network
            </CardTitle>
            <CardDescription>Visual representation of the federated learning network</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-full sm:w-40">
              <Select 
                value={layoutType} 
                onValueChange={setLayoutType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radial">Radial</SelectItem>
                  <SelectItem value="forceDirect">Force Directed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 items-center space-x-2">
              <span className="text-xs text-muted-foreground">Link Distance:</span>
              <Slider
                defaultValue={[100]}
                max={200}
                min={50}
                step={10}
                value={[linkDistance]}
                onValueChange={handleLinkDistanceChange}
                className="w-24 sm:w-32"
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="mt-4 h-[400px] w-full border rounded-md p-1 relative overflow-hidden bg-slate-900/50 dark:border-slate-700">
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs bg-slate-800/80 p-1 rounded shadow-sm text-slate-200">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span>Central Server</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-slate-800/80 p-1 rounded shadow-sm text-slate-200">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Hospital/Institution</span>
            </div>
          </div>
          <svg ref={svgRef} width="100%" height="100%"></svg>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <div className="flex items-center justify-center p-2 rounded-md border border-slate-700 bg-slate-800/50">
            <Server size={14} className="mr-2 text-indigo-400" />
            <span className="text-xs font-medium text-slate-200">1 Server</span>
          </div>
          <div className="flex items-center justify-center p-2 rounded-md border border-slate-700 bg-slate-800/50">
            <Activity size={14} className="mr-2 text-indigo-400" />
            <span className="text-xs font-medium text-slate-200">7 Institutions</span>
          </div>
          <div className="flex items-center justify-center p-2 rounded-md border border-slate-700 bg-slate-800/50">
            <Lock size={14} className="mr-2 text-indigo-400" />
            <span className="text-xs font-medium text-slate-200">Secure Channels</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkGraph;
