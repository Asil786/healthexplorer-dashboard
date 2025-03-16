
import React from 'react';
import { Link } from 'react-router-dom';
import { ScanSearch, Bell, Settings, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  title: string;
  description?: string;
  className?: string;
  onMenuToggle?: () => void;
}

const DashboardHeader = ({
  title,
  description,
  className,
  onMenuToggle
}: DashboardHeaderProps) => {
  return (
    <header className={cn("w-full flex flex-col md:flex-row md:items-center justify-between border-b px-4 sm:px-6 py-3 sm:py-4 bg-white/70 backdrop-blur-sm sticky top-0 z-10", className)}>
      <div className="flex items-center space-x-3 sm:space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onMenuToggle}
          className="md:hidden" 
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-slate-600" />
        </Button>
        
        <div className="flex flex-col">
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight animate-fade-in truncate">
            {title}
          </h1>
          {description && (
            <p className="text-muted-foreground text-xs sm:text-sm truncate max-w-[250px] sm:max-w-none">
              {description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2 mt-3 md:mt-0">
        <div className="relative">
          <Button variant="ghost" size="icon" className="hover:bg-slate-100">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
        </div>
        
        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
          <ScanSearch className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
        </Button>
        
        <Button variant="ghost" size="icon" className="hover:bg-slate-100">
          <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-slate-600" />
        </Button>
        
        <div className="flex items-center space-x-2 ml-1 sm:ml-2 p-1 rounded-full hover:bg-slate-100">
          <Avatar className="h-7 w-7 sm:h-9 sm:w-9 transition border">
            <AvatarImage src="" alt="User" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs sm:text-sm">HC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
