
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  className 
}: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 ease-in-out animate-slide-up",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-900">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span className={cn(
                "text-xs font-medium",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                {trend.isPositive ? "+" : ""}{trend.value}
              </span>
              {description && (
                <span className="text-xs text-gray-500 ml-1">{description}</span>
              )}
            </div>
          )}
          
          {!trend && description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
