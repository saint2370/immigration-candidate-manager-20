
import React from 'react';
import { formatDistance, format, isAfter, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';

export interface DeadlineCardProps {
  candidateName: string;
  deadline: string;
  description: string;
  daysLeft: number;
  type: string;
}

const DeadlineCard: React.FC<DeadlineCardProps> = ({
  candidateName,
  deadline,
  description,
  daysLeft,
  type
}) => {
  // Determine if the deadline is past due
  const isPastDue = daysLeft < 0;
  
  // Format deadline
  const formattedDate = format(parseISO(deadline), 'dd MMM yyyy', { locale: fr });
  
  // Get status color based on visa type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Travail':
        return 'bg-blue-100 text-blue-800';
      case 'Visiteur':
        return 'bg-orange-100 text-orange-800';
      case 'Résidence Permanente':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={cn(
      "p-3 rounded-lg border border-gray-200",
      isPastDue ? "bg-red-50" : "bg-white"
    )}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="font-medium">{candidateName}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
        <div className={cn(
          "text-xs px-2 py-1 rounded-full",
          getTypeColor(type)
        )}>
          {type}
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
          <span>{formattedDate}</span>
        </div>
        
        <div className={cn(
          "text-xs px-2 py-1 rounded-full",
          isPastDue 
            ? "bg-red-100 text-red-800" 
            : daysLeft <= 7 
              ? "bg-amber-100 text-amber-800" 
              : "bg-green-100 text-green-800"
        )}>
          {isPastDue 
            ? `En retard de ${Math.abs(daysLeft)} jour${Math.abs(daysLeft) > 1 ? 's' : ''}` 
            : `${daysLeft} jour${daysLeft > 1 ? 's' : ''} restant${daysLeft > 1 ? 's' : ''}`}
        </div>
      </div>
    </div>
  );
};

export default DeadlineCard;
