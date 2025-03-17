
import { useState } from 'react';
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

// Mocked data
const candidates = [
  {
    id: '1',
    photo: '',
    name: 'Sophie Martin',
    nationality: 'France',
    visaType: 'Travail',
    submissionDate: '12 avril 2023',
    status: 'En cours',
    bureau: 'Paris'
  },
  {
    id: '2',
    photo: '',
    name: 'Mohamed Ali',
    nationality: 'Maroc',
    visaType: 'Visiteur',
    submissionDate: '5 avril 2023',
    status: 'En attente',
    bureau: 'Rabat'
  },
  {
    id: '3',
    photo: '',
    name: 'John Smith',
    nationality: 'USA',
    visaType: 'Résidence Permanente',
    submissionDate: '2 avril 2023',
    status: 'Approuvé',
    bureau: 'New York'
  },
  {
    id: '4',
    photo: '',
    name: 'Aisha Patel',
    nationality: 'Inde',
    visaType: 'Travail',
    submissionDate: '28 mars 2023',
    status: 'En cours',
    bureau: 'Mumbai'
  },
  {
    id: '5',
    photo: '',
    name: 'Carlos Rodriguez',
    nationality: 'Mexique',
    visaType: 'Résidence Permanente',
    submissionDate: '25 mars 2023',
    status: 'Rejeté',
    bureau: 'Mexico'
  },
  {
    id: '6',
    photo: '',
    name: 'Yuki Tanaka',
    nationality: 'Japon',
    visaType: 'Visiteur',
    submissionDate: '20 mars 2023',
    status: 'Complété',
    bureau: 'Tokyo'
  },
  {
    id: '7',
    photo: '',
    name: 'Elena Petrova',
    nationality: 'Russie',
    visaType: 'Travail',
    submissionDate: '15 mars 2023',
    status: 'En attente',
    bureau: 'Moscou'
  },
  {
    id: '8',
    photo: '',
    name: 'Luis Gonzalez',
    nationality: 'Espagne',
    visaType: 'Visiteur',
    submissionDate: '10 mars 2023',
    status: 'Approuvé',
    bureau: 'Madrid'
  },
  {
    id: '9',
    photo: '',
    name: 'Kim Min-ji',
    nationality: 'Corée du Sud',
    visaType: 'Résidence Permanente',
    submissionDate: '5 mars 2023',
    status: 'En cours',
    bureau: 'Séoul'
  },
  {
    id: '10',
    photo: '',
    name: 'Ahmed Hassan',
    nationality: 'Égypte',
    visaType: 'Travail',
    submissionDate: '28 février 2023',
    status: 'En attente',
    bureau: 'Le Caire'
  }
];

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
  const [page, setPage] = useState(1);
  const pageSize = 7;
  const totalCandidates = candidates.length;
  const totalPages = Math.ceil(totalCandidates / pageSize);
  
  const paginatedCandidates = candidates.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

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
                      <DropdownMenuItem className="cursor-pointer">En cours</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Approuvé</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">En attente</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Rejeté</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Complété</DropdownMenuItem>
                    </div>
                  </div>
                  <div className="p-2 border-t">
                    <p className="text-sm font-medium mb-2">Type de visa</p>
                    <div className="space-y-1">
                      <DropdownMenuItem className="cursor-pointer">Travail</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Visiteur</DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">Résidence Permanente</DropdownMenuItem>
                    </div>
                  </div>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="outline" className="px-3">
              <Download size={18} className="mr-2" />
              Exporter
            </Button>
            
            <Button className="bg-ircc-blue hover:bg-ircc-dark-blue btn-hover">
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
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 mr-3">
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
                        <Eye size={18} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100 text-gray-500 transition-colors">
                        <Edit size={18} />
                      </button>
                      <button className="p-1 rounded-md hover:bg-gray-100 text-red-500 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Affichage de {(page - 1) * pageSize + 1} à {Math.min(page * pageSize, totalCandidates)} sur {totalCandidates} candidats
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className={cn(
                "p-2 rounded-md transition-colors",
                page === 1 
                  ? "text-gray-300 cursor-not-allowed" 
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm text-gray-600">{page} / {totalPages}</span>
            <button 
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={cn(
                "p-2 rounded-md transition-colors",
                page === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-500 hover:bg-gray-100"
              )}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesList;
