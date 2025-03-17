
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Candidate {
  id: string;
  name: string;
  nationality: string;
  visaType: string;
  submissionDate: string;
  status: string;
  bureau: string;
}

interface CandidateTableProps {
  candidates: Candidate[];
  title: string;
}

const getStatusBadge = (status: string) => {
  const statusMap: Record<string, { variant: string; label: string }> = {
    'En cours': { variant: 'badge-blue', label: 'En cours' },
    'Approuvé': { variant: 'badge-green', label: 'Approuvé' },
    'En attente': { variant: 'badge-yellow', label: 'En attente' },
    'Rejeté': { variant: 'badge-red', label: 'Rejeté' },
    'Complété': { variant: 'badge-purple', label: 'Complété' },
    'Expiré': { variant: 'badge-gray', label: 'Expiré' }
  };

  const statusInfo = statusMap[status] || { variant: 'badge-gray', label: status };
  
  return (
    <div className={cn("badge", statusInfo.variant)}>
      {statusInfo.label}
    </div>
  );
};

const CandidateTable = ({ candidates, title }: CandidateTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(candidates.length / pageSize);
  
  const paginatedCandidates = candidates.slice(
    (page - 1) * pageSize,
    page * pageSize
  );
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-slide-up">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nom</TableHead>
              <TableHead>Nationalité</TableHead>
              <TableHead>Type de visa</TableHead>
              <TableHead>Date de soumission</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Bureau</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCandidates.map((candidate) => (
              <TableRow 
                key={candidate.id}
                className="transition-colors hover:bg-gray-50"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-2">
                      {candidate.name.charAt(0)}
                    </div>
                    {candidate.name}
                  </div>
                </TableCell>
                <TableCell>{candidate.nationality}</TableCell>
                <TableCell>{candidate.visaType}</TableCell>
                <TableCell>{candidate.submissionDate}</TableCell>
                <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                <TableCell>{candidate.bureau}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100 text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="p-4 border-t border-gray-100 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Affichage de {(page - 1) * pageSize + 1} à {Math.min(page * pageSize, candidates.length)} sur {candidates.length} candidats
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className={cn(
              "p-1 rounded-md transition-colors",
              page === 1 
                ? "text-gray-300 cursor-not-allowed" 
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-gray-600">{page} / {totalPages}</span>
          <button 
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className={cn(
              "p-1 rounded-md transition-colors",
              page === totalPages
                ? "text-gray-300 cursor-not-allowed"
                : "text-gray-500 hover:bg-gray-100"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateTable;
