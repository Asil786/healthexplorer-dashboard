
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Hospital, Search, ArrowUpDown, Download, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface InstitutionsListProps {
  institutions: Institution[];
  className?: string;
  onSelectInstitution?: (id: number) => void;
}

const InstitutionsList = ({ institutions, className, onSelectInstitution }: InstitutionsListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<{
    column: keyof Institution | '';
    direction: 'asc' | 'desc';
  }>({ column: '', direction: 'asc' });
  
  const handleSort = (column: keyof Institution) => {
    if (sortBy.column === column) {
      setSortBy({
        column,
        direction: sortBy.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortBy({ column, direction: 'asc' });
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const filteredData = institutions.filter(institution =>
    institution.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    institution.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy.column === '') return 0;
    
    const aValue = a[sortBy.column];
    const bValue = b[sortBy.column];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortBy.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortBy.direction === 'asc'
        ? aValue - bValue
        : bValue - aValue;
    }
    
    return 0;
  });

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center gap-2">
            <Hospital size={18} className="text-primary" />
            <div>
              <CardTitle>Participating Institutions</CardTitle>
              <CardDescription>Healthcare organizations in the federation</CardDescription>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search institutions..."
                className="w-full sm:w-[200px] pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download size={16} className="mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Institution</TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort('dataPoints')}
                  >
                    Data Points
                    {sortBy.column === 'dataPoints' && (
                      <ArrowUpDown size={14} className={cn("ml-1", sortBy.direction === 'desc' && "rotate-180")} />
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort('accuracy')}
                  >
                    Accuracy
                    {sortBy.column === 'accuracy' && (
                      <ArrowUpDown size={14} className={cn("ml-1", sortBy.direction === 'desc' && "rotate-180")} />
                    )}
                  </div>
                </TableHead>
                <TableHead>
                  <div 
                    className="flex items-center cursor-pointer"
                    onClick={() => handleSort('privacyScore')}
                  >
                    Privacy Score
                    {sortBy.column === 'privacyScore' && (
                      <ArrowUpDown size={14} className={cn("ml-1", sortBy.direction === 'desc' && "rotate-180")} />
                    )}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center">
                    No institutions found
                  </TableCell>
                </TableRow>
              ) : (
                sortedData.map((institution) => (
                  <TableRow 
                    key={institution.id} 
                    className="hover:bg-slate-50 cursor-pointer"
                    onClick={() => onSelectInstitution && onSelectInstitution(institution.id)}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-primary/10">
                          <AvatarFallback className="text-xs">
                            {institution.name.split(' ').map(word => word[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{institution.name}</div>
                          <div className="text-xs text-muted-foreground">{institution.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{institution.dataPoints.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-16 rounded-full bg-slate-200 mr-2">
                          <div 
                            className="h-full rounded-full bg-blue-500" 
                            style={{ width: `${institution.accuracy * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{(institution.accuracy * 100).toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="h-2 w-16 rounded-full bg-slate-200 mr-2">
                          <div 
                            className="h-full rounded-full bg-green-500" 
                            style={{ width: `${institution.privacyScore * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">{(institution.privacyScore * 100).toFixed(1)}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={institution.status === 'active' ? 'default' : 'secondary'} className={institution.status === 'active' ? 'bg-green-500' : 'bg-slate-400'}>
                        {institution.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{formatDate(institution.lastSync)}</span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InstitutionsList;
