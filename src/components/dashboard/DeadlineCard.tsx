
import { CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DeadlineItem {
  id: string;
  candidateName: string;
  document: string;
  dueDate: string;
  daysLeft: number;
}

interface DeadlineCardProps {
  deadlines: DeadlineItem[];
}

const DeadlineCard = ({ deadlines }: DeadlineCardProps) => {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-slide-up">
      <div className="p-5 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Échéances à venir</h3>
        <CalendarClock size={20} className="text-gray-400" />
      </div>
      
      <div className="divide-y divide-gray-100">
        {deadlines.map((item) => (
          <div 
            key={item.id} 
            className="p-4 transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-gray-900">{item.candidateName}</span>
              <div 
                className={cn(
                  "text-xs font-medium rounded-full px-2 py-1",
                  item.daysLeft <= 3 
                    ? "bg-red-100 text-red-800" 
                    : item.daysLeft <= 7 
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                )}
              >
                {item.daysLeft} jour{item.daysLeft > 1 ? 's' : ''}
              </div>
            </div>
            <p className="text-sm text-gray-500">{item.document}</p>
            <p className="text-xs text-gray-400 mt-1">Échéance: {item.dueDate}</p>
          </div>
        ))}
      </div>
      
      {deadlines.length > 0 && (
        <div className="p-3 bg-gray-50 border-t border-gray-100">
          <button className="text-sm text-ircc-blue hover:underline w-full text-center">
            Voir toutes les échéances
          </button>
        </div>
      )}
      
      {deadlines.length === 0 && (
        <div className="p-8 text-center">
          <p className="text-gray-500">Aucune échéance à venir</p>
        </div>
      )}
    </div>
  );
};

export default DeadlineCard;
