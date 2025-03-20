import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import type { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

// Define the correct types from our Database type
type Candidate = Database['public']['Tables']['candidates']['Row'];
type VisaType = Database['public']['Enums']['visa_type'];
type StatusType = Database['public']['Enums']['status_type'];

const CandidatesList = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedVisa, setSelectedVisa] = useState<VisaType>('Résidence Permanente');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, [selectedVisa]);

  const visaTypes: VisaType[] = ['Visiteur', 'Travail', 'Résidence Permanente'];

  const fetchCandidates = async () => {
    let query = supabase
      .from('candidates')
      .select('*')
      .order('date_soumission', { ascending: false });
    
    if (selectedVisa) {
      query = query.eq('visa_type', selectedVisa);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching candidates:', error);
      return;
    }
    
    if (data) {
      setCandidates(data);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Approuvé':
        return 'bg-green-100 text-green-800';
      case 'En cours':
        return 'bg-blue-100 text-blue-800';
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejeté':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <h1 className="text-2xl font-bold">Liste des candidats</h1>
          <div className="w-full sm:w-auto">
            <Select value={selectedVisa} onValueChange={(value: VisaType) => setSelectedVisa(value)}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sélectionner le type de visa" />
              </SelectTrigger>
              <SelectContent>
                {visaTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={() => navigate('/tableaudebord/candidates/new')} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nouveau candidat
        </Button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Nom complet</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Type de visa</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Date de soumission</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Statut</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Bureau</th>
                <th className="px-6 py-3 text-center font-medium text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div>
                        <div className="font-medium">{candidate.prenom} {candidate.nom}</div>
                        <div className="text-gray-500">{candidate.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{candidate.visa_type}</td>
                  <td className="px-6 py-4">
                    {format(new Date(candidate.date_soumission), 'dd MMMM yyyy', { locale: fr })}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusClass(candidate.status)}`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{candidate.bureau}</td>
                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/candidate/${candidate.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Voir
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CandidatesList;
