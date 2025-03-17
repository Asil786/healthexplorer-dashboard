
import React from 'react';
import { Network } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, showText = true, size = 'md' }: LogoProps) => {
  const iconSize = size === 'sm' ? 20 : size === 'md' ? 24 : 32;
  const textSize = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg';
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative">
        <Network size={iconSize} className="text-indigo-500" />
        <div className="absolute inset-0 bg-indigo-500/20 blur-sm rounded-full animate-pulse-slow" />
      </div>
      
    </div>
  );
};

export default Logo;
