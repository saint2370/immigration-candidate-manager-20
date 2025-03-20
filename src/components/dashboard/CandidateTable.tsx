
import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Eye, Edit, Trash2, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export interface ResidenceDetails {
  id?: string;
  candidate_id?: string;
  immigration_program?: string;
  nombre_personnes?: number;
  conjoint_nom?: string;
  conjoint_prenom?: string;
  conjoint_passport?: string;
}

export interface Candidate {
  id: string;
  name?: string;
  nom?: string;
  prenom?: string;
  nationality?: string;
  nationalite?: string;
  visaType?: string;
  visa_type?: string;
  submissionDate?: string;
  date_soumission?: string;
  status?: string;
  bureau?: string;
  bureau_traitement?: string;
  identificationNumber?: string;
  identifiant?: string;
  permanent_residence_details?: ResidenceDetails | null;
}

interface CandidateTableProps {
  candidates: Candidate[];
  title?: string;
  showPagination?: boolean;
  onViewCandidate?: (id: string) => void;
  onEditCandidate?: (id: string) => void;
  onDeleteCandidate?: (id: string) => void;
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

const CandidateTable = ({ 
  candidates, 
  title = "Candidats", 
  showPagination = true,
  onViewCandidate,
  onEditCandidate,
  onDeleteCandidate
}: CandidateTableProps) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(candidates.length / pageSize);
  const navigate = useNavigate();
  
  const paginatedCandidates = candidates.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Helper functions to get display values
  // Helper function to get the display name from either format
  const getDisplayName = (candidate: Candidate): string => {
    if (candidate.name) return candidate.name;
    if (candidate.prenom && candidate.nom) return `${candidate.prenom} ${candidate.nom}`;
    if (candidate.prenom) return candidate.prenom;
    if (candidate.nom) return candidate.nom;
    return "Nom inconnu";
  };

  // Helper function to get the first character for avatar
  const getAvatarInitial = (candidate: Candidate): string => {
    if (candidate.name) return candidate.name.charAt(0);
    if (candidate.prenom) return candidate.prenom.charAt(0);
    if (candidate.nom) return candidate.nom.charAt(0);
    return "?";
  };

  // Helper function to get nationanlity from either format
  const getNationality = (candidate: Candidate): string => {
    return candidate.nationality || candidate.nationalite || "-";
  };

  // Helper function to get visa type from either format
  const getVisaType = (candidate: Candidate): string => {
    return candidate.visaType || candidate.visa_type || "-";
  };

  // Helper function to get submission date from either format
  const getSubmissionDate = (candidate: Candidate): string => {
    return candidate.submissionDate || candidate.date_soumission || "-";
  };

  // Helper function to get status
  const getStatus = (candidate: Candidate): string => {
    return candidate.status || "En attente";
  };

  // Helper function to get bureau from either format
  const getBureau = (candidate: Candidate): string => {
    return candidate.bureau || candidate.bureau_traitement || "-";
  };

  // Helper function to get ID number from either format
  const getIdNumber = (candidate: Candidate): string => {
    return candidate.identificationNumber || candidate.identifiant || "-";
  };

  // Helper function to get residence details badge
  const getResidenceBadge = (candidate: Candidate): JSX.Element | null => {
    const residenceDetails = candidate.permanent_residence_details;
    if (!residenceDetails || !candidate.visa_type || candidate.visa_type !== 'Résidence Permanente') {
      return null;
    }

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 cursor-help">
              <Users size={14} />
              <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-md">
                {residenceDetails.immigration_program || 'RP'} ({residenceDetails.nombre_personnes || 1})
              </span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">
              Programme: {residenceDetails.immigration_program || 'Non spécifié'}<br />
              {residenceDetails.conjoint_nom && residenceDetails.conjoint_prenom && (
                <>Conjoint: {residenceDetails.conjoint_prenom} {residenceDetails.conjoint_nom}<br /></>
              )}
              Nombre de personnes: {residenceDetails.nombre_personnes || 1}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };
  
  const handleViewClick = (id: string) => {
    if (onViewCandidate) {
      // If it's a function that returns a path, navigate to that path
      const result = onViewCandidate(id);
      if (typeof result === 'string') {
        navigate(result);
      }
      // Otherwise assume it's a callback that handles navigation itself
    }
  };

  const handleEditClick = (id: string) => {
    if (onEditCandidate) {
      const result = onEditCandidate(id);
      if (typeof result === 'string') {
        navigate(result);
      }
    }
  };

  const handleDeleteClick = (id: string) => {
    if (onDeleteCandidate) {
      onDeleteCandidate(id);
    }
  };
  
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-slide-up">
      {title && (
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Nom</TableHead>
              <TableHead>ID</TableHead>
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
                      {getAvatarInitial(candidate)}
                    </div>
                    <div className="flex flex-col">
                      {getDisplayName(candidate)}
                      {getResidenceBadge(candidate)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono">
                    {getIdNumber(candidate)}
                  </span>
                </TableCell>
                <TableCell>{getNationality(candidate)}</TableCell>
                <TableCell>{getVisaType(candidate)}</TableCell>
                <TableCell>{getSubmissionDate(candidate)}</TableCell>
                <TableCell>{getStatusBadge(getStatus(candidate))}</TableCell>
                <TableCell>{getBureau(candidate)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                      onClick={() => handleViewClick(candidate.id)}
                    >
                      <Eye size={16} />
                    </button>
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                      onClick={() => handleEditClick(candidate.id)}
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      className="p-1 rounded-md hover:bg-gray-100 text-red-500 transition-colors"
                      onClick={() => handleDeleteClick(candidate.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {showPagination && candidates.length > 0 && (
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
      )}
    </div>
  );
};

export default CandidateTable;
