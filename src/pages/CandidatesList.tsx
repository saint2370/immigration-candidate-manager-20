import { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Download, 
  Plus, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import AddCandidateForm from '@/components/candidates/AddCandidateForm';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { Link, useNavigate } from 'react-router-dom';

// Types based on our database schema
interface Candidate {
  id: string;
  nom: string;
  prenom: string;
  nationalite: string;
  visa_type: 'Visiteur' | 'Travail' | 'Résidence Permanente';
  date_soumission: string;
  status: 'En cours' | 'Approuvé' | 'En attente' | 'Rejeté' | 'Complété' | 'Expiré';
  bureau: string;
  identification_number?: string; // Ajout de l'identifiant unique
}

// Format candidate data for display
const formatCandidateForDisplay = (candidate: any): Candidate => {
  // Parse date_soumission from database format to display format
  const formattedDate = candidate.date_soumission 
    ? format(new Date(candidate.date_soumission), 'dd MMMM yyyy', { locale: fr }) 
    : '';
  
  return {
    id: candidate.id,
    nom: candidate.nom,
    prenom: candidate.prenom,
    nationalite: candidate.nationalite,
    visa_type: candidate.visa_type,
    date_soumission: formattedDate,
    status: candidate.status,
    bureau: candidate.bureau,
    identification_number: candidate.identification_number // Ajout de l'identifiant unique
  };
};

// Fetch candidates from Supabase
const fetchCandidates = async () => {
  const { data, error } = await supabase
    .from('candidates')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching candidates:', error);
    throw error;
  }
  
  return data.map(formatCandidateForDisplay);
};

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

const CandidatesList = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    status: string[];
    visaType: string[];
  }>({
    status: [],
    visaType: []
  });
  
  // Use React Query to fetch candidates
  const { data: candidates = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['candidates'],
    queryFn: fetchCandidates
  });

  const pageSize = 7;
  
  // Filter candidates based on search and filters
  const filteredCandidates = candidates.filter(candidate => {
    const fullName = `${candidate.prenom} ${candidate.nom}`.toLowerCase();
    
    const matchesSearch = searchTerm === '' || 
      fullName.includes(searchTerm.toLowerCase()) ||
      candidate.nationalite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.bureau.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedFilters.status.length === 0 || 
      selectedFilters.status.includes(candidate.status);
    
    const matchesVisaType = selectedFilters.visaType.length === 0 || 
      selectedFilters.visaType.includes(candidate.visa_type);
    
    return matchesSearch && matchesStatus && matchesVisaType;
  });
  
  const totalCandidates = filteredCandidates.length;
  const totalPages = Math.ceil(totalCandidates / pageSize);
  
  const paginatedCandidates = filteredCandidates.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // Add a new candidate to the database
  const handleAddCandidate = async (candidateData: any) => {
    try {
      // Call refetch after successfully adding a candidate
      await refetch();
      
      // Show success toast
      toast({
        title: "Candidat ajouté",
        description: `${candidateData.prenom} ${candidateData.nom} a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error('Error in handleAddCandidate:', error);
      
      // Show error toast
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de l'ajout du candidat.",
        variant: "destructive"
      });
    }
  };

  // View candidate details
  const handleViewCandidate = (candidateId: string) => {
    navigate(`/tableaudebord/candidate/${candidateId}`);
  };

  // Edit candidate
  const handleEditCandidate = (candidateId: string) => {
    navigate(`/tableaudebord/candidates/edit/${candidateId}`);
  };

  // Delete candidate
  const handleDeleteCandidate = async (candidateId: string) => {
    // Implement confirmation dialog and deletion logic here
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
      try {
        const { error } = await supabase
          .from('candidates')
          .delete()
          .eq('id', candidateId as string);
        
        if (error) throw error;
        
        await refetch();
        
        toast({
          title: "Candidat supprimé",
          description: "Le candidat a été supprimé avec succès.",
        });
      } catch (error) {
        console.error('Error deleting candidate:', error);
        toast({
          title: "Erreur",
          description: "Une erreur s'est produite lors de la suppression du candidat.",
          variant: "destructive"
        });
      }
    }
  };

  // Toggle filter function
  const toggleFilter = (type: 'status' | 'visaType', value: string) => {
    setSelectedFilters(prev => {
      const current = [...prev[type]];
      const index = current.indexOf(value);
      
      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        [type]: current
      };
    });
    
    // Reset to first page when filtering
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users size={24} className="mr-2 text-ircc-blue" />
            Liste des Candidats
          </h2>
          <p className="text-gray-500 mt-1">Gérez et suivez tous vos candidats</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Rechercher un candidat..." 
              className="pl-10 pr-4 h-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page when searching
              }}
            />
          </div>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="px-3">
                  <Filter size={18} className="mr-2" />
                  Filtres
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 p-2">
                <DropdownMenuGroup>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-2">Statut</p>
                    <div className="space-y-1">
                      {['En cours', 'Approuvé', 'En attente', 'Rejeté', 'Complété', 'Expiré'].map(status => (
                        <DropdownMenuItem 
                          key={status}
                          className={cn(
                            "cursor-pointer flex items-center",
                            selectedFilters.status.includes(status) && "bg-muted"
                          )}
                          onClick={() => toggleFilter('status', status)}
                        >
                          <div className="w-4 h-4 mr-2 flex items-center justify-center">
                            {selectedFilters.status.includes(status) && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          {status}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <p className="text-sm font-medium mb-2">Type de visa</p>
                    <div className="space-y-1">
                      {['Travail', 'Visiteur', 'Résidence Permanente'].map(type => (
                        <DropdownMenuItem 
                          key={type}
                          className={cn(
                            "cursor-pointer flex items-center",
                            selectedFilters.visaType.includes(type) && "bg-muted"
                          )}
                          onClick={() => toggleFilter('visaType', type)}
                        >
                          <div className="w-4 h-4 mr-2 flex items-center justify-center">
                            {selectedFilters.visaType.includes(type) && (
                              <div className="w-2 h-2 rounded-full bg-primary" />
                            )}
                          </div>
                          {type}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="px-3">
              <Download size={18} className="mr-2" />
              Exporter
            </Button>
            
            <Button 
              className="bg-ircc-blue hover:bg-ircc-dark-blue btn-hover"
              onClick={() => setIsAddFormOpen(true)}
            >
              <Plus size={18} className="mr-2" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-slide-up">
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
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <div className="flex flex-col items-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ircc-blue"></div>
                      <p className="mt-2 text-gray-500">Chargement des candidats...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    <div className="flex flex-col items-center py-4">
                      <p className="text-red-500">Erreur lors du chargement des candidats</p>
                      <Button 
                        variant="outline" 
                        className="mt-2"
                        onClick={() => refetch()}
                      >
                        Réessayer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : paginatedCandidates.length > 0 ? (
                paginatedCandidates.map((candidate) => (
                  <TableRow 
                    key={candidate.id}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
                          {candidate.prenom.charAt(0)}
                        </div>
                        {candidate.prenom} {candidate.nom}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-md font-mono">
                        {candidate.identification_number || '-'}
                      </span>
                    </TableCell>
                    <TableCell>{candidate.nationalite}</TableCell>
                    <TableCell>{candidate.visa_type}</TableCell>
                    <TableCell>{candidate.date_soumission}</TableCell>
                    <TableCell>{getStatusBadge(candidate.status)}</TableCell>
                    <TableCell>{candidate.bureau}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                          onClick={() => handleViewCandidate(candidate.id)}
                          title="Voir le candidat"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                          onClick={() => handleEditCandidate(candidate.id)}
                          title="Modifier le candidat"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          className="p-1 rounded-md hover:bg-gray-100 text-red-500 transition-colors"
                          onClick={() => handleDeleteCandidate(candidate.id)}
                          title="Supprimer le candidat"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    {searchTerm || selectedFilters.status.length > 0 || selectedFilters.visaType.length > 0 ? (
                      <div className="flex flex-col items-center py-4">
                        <p className="text-gray-500">Aucun candidat ne correspond à votre recherche</p>
                        <Button 
                          variant="outline" 
                          className="mt-2"
                          onClick={() => {
                            setSearchTerm('');
                            setSelectedFilters({ status: [], visaType: [] });
                          }}
                        >
                          Réinitialiser les filtres
                        </Button>
                      </div>
                    ) : (
                      <p className="text-gray-500">Aucun candidat trouvé</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {totalCandidates > 0 ? (
              <>Affichage de {(page - 1) * pageSize + 1} à {Math.min(page * pageSize, totalCandidates)} sur {totalCandidates} candidats</>
            ) : (
              <>0 candidat</>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1 || totalCandidates === 0}
              className={cn(
                "p-2 rounded-md transition-colors",
                (page === 1 || totalCandidates === 0)
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600">{totalPages > 0 ? `${page} / ${totalPages}` : '0 / 0'}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages || totalCandidates === 0}
              className={cn(
                "p-2 rounded-md transition-colors",
                (page === totalPages || totalCandidates === 0)
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Modal de formulaire d'ajout */}
      <AddCandidateForm 
        isOpen={isAddFormOpen}
        onClose={() => setIsAddFormOpen(false)}
        onAddCandidate={handleAddCandidate}
      />
    </div>
  );
};

export default CandidatesList;
