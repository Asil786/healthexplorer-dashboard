
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
  variant?: 'default' | 'glass' | 'outlined';
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  className,
  valueClassName,
  variant = 'default'
}: StatCardProps) => {
  const cardClasses = cn(
    "transition-all duration-300 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20",
    {
      'glass-card dark:bg-slate-800/50 dark:backdrop-blur-lg dark:border-slate-700': variant === 'glass',
      'border shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700': variant === 'default',
      'border-2 bg-white/50 dark:bg-slate-800/70 dark:border-slate-700': variant === 'outlined',
    },
    className
  );

  return (
    <Card className={cardClasses}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <h2 className={cn("text-3xl font-semibold tracking-tight text-foreground", valueClassName)}>
                {value}
              </h2>
              {trend && (
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
                    trend.isPositive 
                      ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-900/50" 
                      : "text-rose-700 bg-rose-50 dark:text-rose-400 dark:bg-rose-900/50"
                  )}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          {icon && (
            <div className="p-2 rounded-full bg-primary/10 dark:bg-primary/20">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
